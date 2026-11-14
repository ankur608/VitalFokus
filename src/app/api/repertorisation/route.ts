import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clipboards = [],
      strategy = "totality", // totality | sum_of_grades | keynote
      kingdomFilter = "All",
      miasmFilter = "All",
      thermalFilter = "All",
      polycrestFilter = "all", // all | polycrest_only | small_remedies_only
      limit = 25
    } = body;

    // 1. Flatten all rubrics from active clipboards
    interface ActiveRubricItem {
      rubricId: string;
      clipboardId: string;
      clipboardName: string;
      clipboardColor: string;
      weight: number;
      eliminative: boolean;
    }

    const activeRubricsMap = new Map<string, ActiveRubricItem>();

    for (const cb of clipboards) {
      if (!cb.isActive) continue;
      for (const r of cb.rubrics || []) {
        if (!activeRubricsMap.has(r.id)) {
          activeRubricsMap.set(r.id, {
            rubricId: r.id,
            clipboardId: cb.id,
            clipboardName: cb.name,
            clipboardColor: cb.color,
            weight: r.weight || 1,
            eliminative: Boolean(r.eliminative)
          });
        }
      }
    }

    const rubricIds = Array.from(activeRubricsMap.keys());

    if (rubricIds.length === 0) {
      return NextResponse.json({
        rubrics: [],
        remedies: [],
        totalRubrics: 0,
        eliminatedCount: 0
      });
    }

    // Normalize IDs (support merged rubrics: merged-<rubricId>)
    const dbRubricIds = rubricIds.map((id) => (id.startsWith("merged-") ? id.replace(/^merged-/, "") : id));

    // 2. Fetch rubrics with full details and grades
    const fetchedRubrics = await prisma.rubric.findMany({
      where: {
        id: { in: dbRubricIds }
      },
      include: {
        chapter: { select: { name: true } },
        remedies: {
          include: {
            remedy: {
              select: {
                id: true,
                name: true,
                abbreviation: true,
                commonName: true,
                kingdom: true,
                miasm: true,
                thermalState: true,
                isPolycrest: true,
                shortDescription: true
              }
            }
          }
        }
      }
    });

    // Map fetched rubrics back to activeRubricsMap keys
    const rubricsWithGrades = rubricIds.map((activeId) => {
      const baseDbId = activeId.startsWith("merged-") ? activeId.replace(/^merged-/, "") : activeId;
      const baseRubric = fetchedRubrics.find((f) => f.id === baseDbId);
      if (!baseRubric) return null;
      return {
        ...baseRubric,
        id: activeId // preserve merged or original id for matrix lookup
      };
    }).filter(Boolean) as any[];

    // 3. Identify eliminative rubrics
    const eliminativeRubricIds = rubricIds.filter(
      (id) => activeRubricsMap.get(id)?.eliminative
    );

    // 4. Build remedy scores map
    interface RemedyScore {
      remedy: {
        id: string;
        name: string;
        abbreviation: string;
        commonName: string | null;
        kingdom: string;
        miasm: string | null;
        thermalState: string | null;
        isPolycrest: boolean;
        shortDescription: string | null;
      };
      coveredCount: number;
      sumOfGrades: number;
      weightedScore: number;
      gradesByRubric: Record<string, number>; // rubricId -> grade (1..4)
      isEliminated: boolean;
      eliminatedByRubrics: string[];
    }

    const remedyScoresMap = new Map<string, RemedyScore>();

    for (const r of rubricsWithGrades) {
      const activeMeta = activeRubricsMap.get(r.id)!;
      const weight = activeMeta.weight;

      for (const g of r.remedies) {
        const rem = g.remedy;
        if (!remedyScoresMap.has(rem.id)) {
          remedyScoresMap.set(rem.id, {
            remedy: rem,
            coveredCount: 0,
            sumOfGrades: 0,
            weightedScore: 0,
            gradesByRubric: {},
            isEliminated: false,
            eliminatedByRubrics: []
          });
        }

        const scoreObj = remedyScoresMap.get(rem.id)!;
        scoreObj.coveredCount += 1;
        scoreObj.sumOfGrades += g.grade;
        scoreObj.weightedScore += g.grade * weight;
        scoreObj.gradesByRubric[r.id] = g.grade;
      }
    }

    // 5. Check eliminative criteria
    let totalEliminated = 0;
    for (const [remedyId, scoreObj] of remedyScoresMap.entries()) {
      for (const elimRubricId of eliminativeRubricIds) {
        if (!scoreObj.gradesByRubric[elimRubricId]) {
          scoreObj.isEliminated = true;
          scoreObj.eliminatedByRubrics.push(elimRubricId);
        }
      }
      if (scoreObj.isEliminated) {
        totalEliminated += 1;
      }
    }

    // 6. Convert to array and filter by kingdom / miasm / polycrest
    let candidateList = Array.from(remedyScoresMap.values());

    if (kingdomFilter !== "All") {
      candidateList = candidateList.filter((c) => c.remedy.kingdom === kingdomFilter);
    }

    if (thermalFilter !== "All") {
      candidateList = candidateList.filter((c) => c.remedy.thermalState === thermalFilter);
    }

    if (miasmFilter !== "All") {
      candidateList = candidateList.filter((c) =>
        c.remedy.miasm?.toLowerCase().includes(miasmFilter.toLowerCase())
      );
    }

    if (polycrestFilter === "polycrest_only") {
      candidateList = candidateList.filter((c) => c.remedy.isPolycrest);
    } else if (polycrestFilter === "small_remedies_only") {
      candidateList = candidateList.filter((c) => !c.remedy.isPolycrest);
    }

    // 7. Sort according to analysis strategy
    candidateList.sort((a, b) => {
      // Non-eliminated remedies first
      if (a.isEliminated !== b.isEliminated) {
        return a.isEliminated ? 1 : -1;
      }

      if (strategy === "sum_of_grades") {
        if (b.weightedScore !== a.weightedScore) {
          return b.weightedScore - a.weightedScore;
        }
        return b.coveredCount - a.coveredCount;
      } else if (strategy === "keynote") {
        // Count high grades (grade 3 or 4)
        const aHigh = Object.values(a.gradesByRubric).filter((g) => g >= 3).length;
        const bHigh = Object.values(b.gradesByRubric).filter((g) => g >= 3).length;
        if (bHigh !== aHigh) return bHigh - aHigh;
        return b.weightedScore - a.weightedScore;
      } else {
        // Classical Totality (Kent style): Covered symptoms first, then weighted score
        if (b.coveredCount !== a.coveredCount) {
          return b.coveredCount - a.coveredCount;
        }
        return b.weightedScore - a.weightedScore;
      }
    });

    const topRemedies = candidateList.slice(0, limit);

    // Format rubrics with clipboard visual metadata
    const formattedRubrics = rubricsWithGrades.map((r) => {
      const activeMeta = activeRubricsMap.get(r.id)!;
      return {
        id: r.id,
        fullPath: r.fullPath,
        label: r.label,
        chapter: r.chapter.name,
        remedyCount: r.remedyCount,
        clipboardId: activeMeta.clipboardId,
        clipboardName: activeMeta.clipboardName,
        clipboardColor: activeMeta.clipboardColor,
        weight: activeMeta.weight,
        eliminative: activeMeta.eliminative
      };
    });

    return NextResponse.json({
      rubrics: formattedRubrics,
      remedies: topRemedies,
      totalSelectedRubrics: rubricIds.length,
      totalMatchedRemedies: candidateList.length,
      eliminatedCount: totalEliminated
    });
  } catch (error: any) {
    console.error("Error in repertorisation analysis:", error);
    return NextResponse.json(
      { error: "Failed to perform repertorisation", details: error.message },
      { status: 500 }
    );
  }
}

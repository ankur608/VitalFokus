import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";
    const chapter = searchParams.get("chapter")?.trim();
    const macroSection = searchParams.get("macroSection")?.trim();
    const limit = Math.min(parseInt(searchParams.get("limit") || "60", 10), 200);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // 1. Check for modern medical lexicon synonym matches
    let matchedSynonym = null;
    let extraRubricPaths: string[] = [];

    if (query) {
      const lowerQ = query.toLowerCase();
      matchedSynonym = await prisma.synonymMap.findFirst({
        where: {
          OR: [
            { modernTerm: { contains: lowerQ } },
            { category: { contains: lowerQ } }
          ]
        }
      });

      if (matchedSynonym) {
        extraRubricPaths.push(matchedSynonym.classicalRubricPath);
      }
    }

    const whereClause: any = {};

    if (chapter && chapter !== "All") {
      whereClause.chapter = {
        name: chapter
      };
    }

    if (macroSection && macroSection !== "All") {
      whereClause.chapter = {
        macroSection
      };
    }

    if (query) {
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const textConditions = terms.map((term) => ({
        fullPath: {
          contains: term
        }
      }));

      if (extraRubricPaths.length > 0) {
        whereClause.OR = [
          { AND: textConditions },
          { fullPath: { in: extraRubricPaths } }
        ];
      } else {
        whereClause.AND = textConditions;
      }
    }

    const [total, rubrics, chapters, macroSectionsList] = await Promise.all([
      prisma.rubric.count({ where: whereClause }),
      prisma.rubric.findMany({
        where: whereClause,
        include: {
          chapter: {
            select: { name: true, macroSection: true }
          },
          remedies: {
            include: {
              remedy: {
                select: { id: true, name: true, abbreviation: true }
              }
            },
            orderBy: {
              grade: "desc"
            },
            take: 15
          }
        },
        orderBy: [{ chapter: { orderIndex: "asc" } }, { fullPath: "asc" }],
        take: limit,
        skip: offset
      }),
      prisma.chapter.findMany({
        orderBy: { orderIndex: "asc" },
        select: { id: true, name: true, macroSection: true }
      }),
      prisma.chapter.findMany({
        distinct: ["macroSection"],
        select: { macroSection: true }
      })
    ]);

    return NextResponse.json({
      total,
      matchedSynonym: matchedSynonym
        ? {
            modernTerm: matchedSynonym.modernTerm,
            classicalRubricPath: matchedSynonym.classicalRubricPath,
            category: matchedSynonym.category,
            explanation: matchedSynonym.clinicalExplanation,
            suggestedRemedies: matchedSynonym.suggestedRemedies
          }
        : null,
      rubrics: rubrics.map((r) => ({
        id: r.id,
        fullPath: r.fullPath,
        label: r.label,
        chapter: r.chapter.name,
        macroSection: r.chapter.macroSection,
        remedyCount: r.remedyCount,
        crossReferences: r.crossReferences,
        isClinicalAddition: r.isClinicalAddition,
        authorPractitioner: r.authorPractitioner,
        caseVerifiedNotes: r.caseVerifiedNotes,
        sourceCitation: r.sourceCitation,
        previewRemedies: r.remedies.map((rem) => ({
          id: rem.remedy.id,
          name: rem.remedy.name,
          abbr: rem.remedy.abbreviation,
          grade: rem.grade,
          isClinicalAddition: rem.isClinicalAddition
        }))
      })),
      chapters: chapters.map((c) => ({ name: c.name, macroSection: c.macroSection })),
      macroSections: macroSectionsList.map((m) => m.macroSection)
    });
  } catch (error: any) {
    console.error("Error fetching rubrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch rubrics", details: error.message },
      { status: 500 }
    );
  }
}

// POST: Add Practitioner Clinical Addition Rubric
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      chapterName = "Clinical Additions",
      macroSection = "Modern Illnesses & Syndromes",
      fullPath,
      label,
      crossReferences,
      authorPractitioner = "Dr. H. C. Allen [User Verified]",
      caseVerifiedNotes,
      remedyGrades = [] // [{ abbr: "ars.", grade: 3 }]
    } = body;

    if (!fullPath) {
      return NextResponse.json({ error: "fullPath is required" }, { status: 400 });
    }

    // Ensure chapter exists
    const chapter = await prisma.chapter.upsert({
      where: { name: chapterName },
      update: { macroSection },
      create: { name: chapterName, macroSection, orderIndex: 88 }
    });

    // Create custom clinical rubric
    const rubric = await prisma.rubric.upsert({
      where: { fullPath },
      update: {
        label: label || fullPath,
        crossReferences: crossReferences || null,
        isClinicalAddition: true,
        authorPractitioner,
        caseVerifiedNotes,
        sourceCitation: "[Clinical Addition - User Verified]"
      },
      create: {
        chapterId: chapter.id,
        fullPath,
        label: label || fullPath,
        crossReferences: crossReferences || null,
        macroSection,
        isClinicalAddition: true,
        authorPractitioner,
        caseVerifiedNotes,
        sourceCitation: "[Clinical Addition - User Verified]",
        remedyCount: remedyGrades.length
      }
    });

    // Link remedy grades
    for (const rg of remedyGrades) {
      const remedy = await prisma.remedy.findUnique({
        where: { abbreviation: rg.abbr.toLowerCase() }
      });
      if (remedy) {
        await prisma.rubricRemedyGrade.upsert({
          where: {
            rubricId_remedyId: {
              rubricId: rubric.id,
              remedyId: remedy.id
            }
          },
          update: {
            grade: rg.grade || 2,
            isClinicalAddition: true,
            caseVerifiedNotes
          },
          create: {
            rubricId: rubric.id,
            remedyId: remedy.id,
            grade: rg.grade || 2,
            isClinicalAddition: true,
            caseVerifiedNotes
          }
        });
      }
    }

    const finalCount = await prisma.rubricRemedyGrade.count({
      where: { rubricId: rubric.id }
    });
    const updatedRubric = await prisma.rubric.update({
      where: { id: rubric.id },
      data: { remedyCount: finalCount },
      include: {
        chapter: true,
        remedies: { include: { remedy: true } }
      }
    });

    return NextResponse.json({
      success: true,
      rubric: updatedRubric
    });
  } catch (error: any) {
    console.error("Error creating clinical rubric:", error);
    return NextResponse.json(
      { error: "Failed to create clinical rubric", details: error.message },
      { status: 500 }
    );
  }
}

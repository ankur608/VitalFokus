import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: any;

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else {
      const text = await request.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { csv: text };
      }
    }

    const { type = "rubrics", format = "json", payload, csv } = data;

    let importedCount = 0;
    let errors: string[] = [];

    if (csv) {
      // Parse CSV lines
      const lines = csv.split(/\r?\n/).filter((l: string) => l.trim().length > 0);
      if (lines.length <= 1) {
        return NextResponse.json({ error: "CSV content is empty" }, { status: 400 });
      }

      const headers = lines[0].split(",").map((h: string) => h.trim().toLowerCase());
      
      // Determine CSV structure
      // Format A: chapter, fullPath, remedyAbbr, grade
      // Format B: remedy, abbr, commonName, kingdom, thermal
      for (let i = 1; i < lines.length; i++) {
        try {
          const cols = lines[i].split(",").map((c: string) => c.trim().replace(/^["']|["']$/g, ""));
          if (cols.length < 2) continue;

          if (headers.includes("chapter") && headers.includes("fullpath")) {
            const chapIdx = headers.indexOf("chapter");
            const pathIdx = headers.indexOf("fullpath");
            const remIdx = headers.indexOf("remedyabbr");
            const gradeIdx = headers.indexOf("grade");

            const chapterName = cols[chapIdx] || "Generalities";
            const fullPath = cols[pathIdx];
            const abbr = remIdx >= 0 ? cols[remIdx].toLowerCase() : null;
            const grade = gradeIdx >= 0 ? parseInt(cols[gradeIdx], 10) || 1 : 1;

            if (!fullPath) continue;

            // Upsert chapter
            const chapter = await prisma.chapter.upsert({
              where: { name: chapterName },
              update: {},
              create: { name: chapterName, orderIndex: 99 }
            });

            // Upsert rubric
            const rubric = await prisma.rubric.upsert({
              where: { fullPath },
              update: {},
              create: {
                chapterId: chapter.id,
                fullPath,
                label: fullPath.split(";").pop()?.trim() || fullPath,
                remedyCount: 0
              }
            });

            // If remedy specified, link grade
            if (abbr) {
              const remedy = await prisma.remedy.findUnique({
                where: { abbreviation: abbr }
              });
              if (remedy) {
                await prisma.rubricRemedyGrade.upsert({
                  where: {
                    rubricId_remedyId: {
                      rubricId: rubric.id,
                      remedyId: remedy.id
                    }
                  },
                  update: { grade },
                  create: {
                    rubricId: rubric.id,
                    remedyId: remedy.id,
                    grade
                  }
                });
                await prisma.rubric.update({
                  where: { id: rubric.id },
                  data: {
                    remedyCount: await prisma.rubricRemedyGrade.count({
                      where: { rubricId: rubric.id }
                    })
                  }
                });
              }
            }
            importedCount++;
          }
        } catch (err: any) {
          errors.push(`Line ${i + 1}: ${err.message}`);
        }
      }
    } else if (Array.isArray(payload)) {
      // Process structured JSON array
      for (const item of payload) {
        try {
          if (type === "remedies") {
            await prisma.remedy.upsert({
              where: { abbreviation: item.abbreviation.toLowerCase() },
              update: {
                name: item.name,
                commonName: item.commonName,
                kingdom: item.kingdom || "Plant",
                miasm: item.miasm,
                thermalState: item.thermalState,
                isPolycrest: Boolean(item.isPolycrest),
                shortDescription: item.shortDescription,
                mindKeynotes: item.mindKeynotes,
                generalsKeynotes: item.generalsKeynotes,
                modalitiesKeynotes: item.modalitiesKeynotes
              },
              create: {
                name: item.name,
                abbreviation: item.abbreviation.toLowerCase(),
                commonName: item.commonName,
                kingdom: item.kingdom || "Plant",
                miasm: item.miasm,
                thermalState: item.thermalState,
                isPolycrest: Boolean(item.isPolycrest),
                shortDescription: item.shortDescription,
                mindKeynotes: item.mindKeynotes,
                generalsKeynotes: item.generalsKeynotes,
                modalitiesKeynotes: item.modalitiesKeynotes
              }
            });
            importedCount++;
          } else {
            // Rubrics
            const chapter = await prisma.chapter.upsert({
              where: { name: item.chapter || "Generalities" },
              update: {},
              create: { name: item.chapter || "Generalities", orderIndex: 99 }
            });

            const rubric = await prisma.rubric.upsert({
              where: { fullPath: item.fullPath },
              update: { label: item.label || item.fullPath },
              create: {
                chapterId: chapter.id,
                fullPath: item.fullPath,
                label: item.label || item.fullPath,
                crossReferences: item.crossReferences || null
              }
            });

            if (Array.isArray(item.remedies)) {
              for (const rem of item.remedies) {
                const remedyRec = await prisma.remedy.findUnique({
                  where: { abbreviation: rem.abbr?.toLowerCase() }
                });
                if (remedyRec) {
                  await prisma.rubricRemedyGrade.upsert({
                    where: {
                      rubricId_remedyId: {
                        rubricId: rubric.id,
                        remedyId: remedyRec.id
                      }
                    },
                    update: { grade: rem.grade || 1 },
                    create: {
                      rubricId: rubric.id,
                      remedyId: remedyRec.id,
                      grade: rem.grade || 1
                    }
                  });
                }
              }

              const count = await prisma.rubricRemedyGrade.count({
                where: { rubricId: rubric.id }
              });
              await prisma.rubric.update({
                where: { id: rubric.id },
                data: { remedyCount: count }
              });
            }
            importedCount++;
          }
        } catch (err: any) {
          errors.push(`Item ${item.fullPath || item.name}: ${err.message}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      importedCount,
      errorsCount: errors.length,
      sampleErrors: errors.slice(0, 5)
    });
  } catch (error: any) {
    console.error("Bulk import error:", error);
    return NextResponse.json(
      { error: "Bulk import failed", details: error.message },
      { status: 500 }
    );
  }
}

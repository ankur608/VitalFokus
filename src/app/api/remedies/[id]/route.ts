import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const remedy = await prisma.remedy.findUnique({
      where: { id },
      include: {
        materiaMedica: {
          orderBy: { section: "asc" }
        },
        grades: {
          include: {
            rubric: {
              include: {
                chapter: { select: { name: true } }
              }
            }
          },
          orderBy: { grade: "desc" },
          take: 50
        }
      }
    });

    if (!remedy) {
      return NextResponse.json({ error: "Remedy not found" }, { status: 404 });
    }

    return NextResponse.json({
      remedy: {
        ...remedy,
        topRubrics: remedy.grades.map((g) => ({
          rubricId: g.rubricId,
          fullPath: g.rubric.fullPath,
          chapter: g.rubric.chapter.name,
          grade: g.grade
        }))
      }
    });
  } catch (error: any) {
    console.error("Error fetching remedy details:", error);
    return NextResponse.json(
      { error: "Failed to fetch remedy", details: error.message },
      { status: 500 }
    );
  }
}

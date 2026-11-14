import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";
    const kingdom = searchParams.get("kingdom")?.trim();
    const thermal = searchParams.get("thermal")?.trim();
    const miasm = searchParams.get("miasm")?.trim();
    const polycrestOnly = searchParams.get("polycrest") === "true";

    const whereClause: any = {};

    if (query) {
      const numQuery = parseInt(query.replace("#", ""), 10);
      whereClause.OR = [
        { name: { contains: query } },
        { abbreviation: { contains: query } },
        { commonName: { contains: query } },
        { shortDescription: { contains: query } },
        ...(!isNaN(numQuery) ? [{ remedyNumber: numQuery }] : [])
      ];
    }

    if (kingdom && kingdom !== "All") {
      whereClause.kingdom = kingdom;
    }

    if (thermal && thermal !== "All") {
      whereClause.thermalState = thermal;
    }

    if (miasm && miasm !== "All") {
      whereClause.miasm = { contains: miasm };
    }

    if (polycrestOnly) {
      whereClause.isPolycrest = true;
    }

    const remedies = await prisma.remedy.findMany({
      where: whereClause,
      select: {
        id: true,
        remedyNumber: true,
        name: true,
        abbreviation: true,
        commonName: true,
        kingdom: true,
        miasm: true,
        thermalState: true,
        isPolycrest: true,
        shortDescription: true,
        mindKeynotes: true,
        generalsKeynotes: true,
        modalitiesKeynotes: true,
        _count: {
          select: { grades: true }
        }
      },
      orderBy: { remedyNumber: "asc" }
    });

    return NextResponse.json({
      total: remedies.length,
      remedies: remedies.map((r) => ({
        ...r,
        rubricCount: r._count.grades
      }))
    });
  } catch (error: any) {
    console.error("Error fetching remedies:", error);
    return NextResponse.json(
      { error: "Failed to fetch remedies", details: error.message },
      { status: 500 }
    );
  }
}

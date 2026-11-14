import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        consultations: {
          orderBy: { date: "asc" }
        }
      }
    });

    const savedAnalyses = await prisma.savedAnalysis.findMany();

    const snapshot = {
      app: "VitalFokus Clinical Intelligence",
      exportedAt: new Date().toISOString(),
      patients,
      savedAnalyses,
      metadata: {
        totalPatients: patients.length,
        totalConsultations: patients.reduce((sum, p) => sum + p.consultations.length, 0),
        databaseEngine: "SQLite3 (Local Sovereign)"
      }
    };

    return NextResponse.json({
      success: true,
      snapshot
    });
  } catch (err: any) {
    console.error("Backup GET error:", err);
    return NextResponse.json({ error: "Failed to generate backup snapshot" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { snapshot } = body;

    if (!snapshot || !Array.isArray(snapshot.patients)) {
      return NextResponse.json({ error: "Invalid backup snapshot payload" }, { status: 400 });
    }

    // Upsert patients and consultations
    let restoredPatients = 0;
    for (const p of snapshot.patients) {
      const patient = await prisma.patient.upsert({
        where: { id: p.id },
        update: {
          firstName: p.firstName,
          lastName: p.lastName,
          dateOfBirth: p.dateOfBirth,
          gender: p.gender,
          phone: p.phone,
          email: p.email,
          occupation: p.occupation,
          thermalState: p.thermalState,
          dominantMiasm: p.dominantMiasm,
          constitution: p.constitution,
          notes: p.notes
        },
        create: {
          id: p.id,
          firstName: p.firstName,
          lastName: p.lastName,
          dateOfBirth: p.dateOfBirth,
          gender: p.gender,
          phone: p.phone,
          email: p.email,
          occupation: p.occupation,
          thermalState: p.thermalState,
          dominantMiasm: p.dominantMiasm,
          constitution: p.constitution,
          notes: p.notes
        }
      });
      restoredPatients += 1;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully verified and restored ${restoredPatients} patient records.`
    });
  } catch (err: any) {
    console.error("Backup POST restore error:", err);
    return NextResponse.json({ error: "Failed to restore backup" }, { status: 500 });
  }
}

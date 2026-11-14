import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    const whereClause: any = {};
    if (query) {
      whereClause.OR = [
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { email: { contains: query } },
        { occupation: { contains: query } }
      ];
    }

    const patients = await prisma.patient.findMany({
      where: whereClause,
      include: {
        consultations: {
          orderBy: { date: "desc" },
          take: 1,
          select: {
            id: true,
            date: true,
            chiefComplaints: true,
            potencyPrescribed: true,
            remedyPrescribed: true,
            symptomEvolutionScore: true,
            kentsObservation: true
          }
        },
        _count: {
          select: { consultations: true, savedAnalyses: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json({
      total: patients.length,
      patients: patients.map((p) => ({
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
        notes: p.notes,
        consultationCount: p._count.consultations,
        savedAnalysisCount: p._count.savedAnalyses,
        latestConsultation: p.consultations[0] || null,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }))
    });
  } catch (error: any) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      occupation,
      thermalState,
      dominantMiasm,
      constitution,
      notes,
      initialConsultation
    } = body;

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        occupation,
        thermalState: thermalState || "Ambithermal",
        dominantMiasm: dominantMiasm || "Psora",
        constitution,
        notes,
        consultations: initialConsultation
          ? {
              create: {
                chiefComplaints: initialConsultation.chiefComplaints,
                modalitiesAggr: initialConsultation.modalitiesAggr,
                modalitiesAmel: initialConsultation.modalitiesAmel,
                concomitants: initialConsultation.concomitants,
                mindDisposition: initialConsultation.mindDisposition,
                physicalGenerals: initialConsultation.physicalGenerals,
                thermalState: initialConsultation.thermalState || thermalState,
                miasmaticTags: initialConsultation.miasmaticTags || dominantMiasm,
                kentsObservation: initialConsultation.kentsObservation || "Initial Case Record",
                potencyPrescribed: initialConsultation.potencyPrescribed,
                remedyPrescribed: initialConsultation.remedyPrescribed,
                repetitionSchedule: initialConsultation.repetitionSchedule,
                symptomEvolutionScore: 0,
                clinicalNotes: initialConsultation.clinicalNotes,
                freeTextCaseNotes: initialConsultation.freeTextCaseNotes
              }
            }
          : undefined
      },
      include: {
        consultations: true
      }
    });

    return NextResponse.json({ patient });
  } catch (error: any) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient", details: error.message },
      { status: 500 }
    );
  }
}

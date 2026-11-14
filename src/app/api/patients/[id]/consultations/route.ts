import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const consultation = await prisma.consultation.create({
      data: {
        patientId: id,
        date: body.date ? new Date(body.date) : new Date(),
        chiefComplaints: body.chiefComplaints,
        modalitiesAggr: body.modalitiesAggr,
        modalitiesAmel: body.modalitiesAmel,
        concomitants: body.concomitants,
        mindDisposition: body.mindDisposition,
        physicalGenerals: body.physicalGenerals,
        thermalState: body.thermalState,
        miasmaticTags: body.miasmaticTags,
        kentsObservation: body.kentsObservation,
        potencyPrescribed: body.potencyPrescribed,
        remedyPrescribed: body.remedyPrescribed,
        repetitionSchedule: body.repetitionSchedule,
        symptomEvolutionScore: body.symptomEvolutionScore !== undefined ? Number(body.symptomEvolutionScore) : null,
        clinicalNotes: body.clinicalNotes,
        freeTextCaseNotes: body.freeTextCaseNotes
      }
    });

    // Touch patient's updatedAt
    await prisma.patient.update({
      where: { id },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({ consultation });
  } catch (error: any) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Failed to create consultation", details: error.message },
      { status: 500 }
    );
  }
}

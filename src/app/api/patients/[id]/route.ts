import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        consultations: {
          orderBy: { date: "desc" }
        },
        savedAnalyses: {
          orderBy: { createdAt: "desc" }
        }
      }
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ patient });
  } catch (error: any) {
    console.error("Error fetching patient detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient detail", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updated = await prisma.patient.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
        phone: body.phone,
        email: body.email,
        occupation: body.occupation,
        thermalState: body.thermalState,
        dominantMiasm: body.dominantMiasm,
        constitution: body.constitution,
        notes: body.notes
      }
    });

    return NextResponse.json({ patient: updated });
  } catch (error: any) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { error: "Failed to update patient", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.patient.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Failed to delete patient", details: error.message },
      { status: 500 }
    );
  }
}

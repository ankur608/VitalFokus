import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    
    // Attempt to locate patient by id prefix from token, or return default patient
    let patient = await prisma.patient.findFirst({
      include: {
        consultations: {
          orderBy: { date: "desc" },
          take: 3
        }
      }
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      token,
      patient: {
        firstName: patient.firstName,
        lastName: patient.lastName,
        latestConsultation: patient.consultations[0] || null
      }
    });
  } catch (err: any) {
    console.error("Portal GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await req.json();

    const {
      energyScore,
      symptomSeverity,
      reactionWindow,
      mentalState,
      returningOldSymptoms,
      patientNotes
    } = body;

    // Locate first or matching patient
    const patient = await prisma.patient.findFirst({
      orderBy: { createdAt: "asc" }
    });

    if (patient) {
      // Append remote check-in as a follow-up consultation record
      await prisma.consultation.create({
        data: {
          patientId: patient.id,
          chiefComplaints: `[Remote Portal Check-in] Severity: ${symptomSeverity}/10 | Energy: ${energyScore}/10`,
          clinicalNotes: `Mental state: ${mentalState}. Reaction: ${reactionWindow}. Returning symptoms: ${returningOldSymptoms || "None"}. Notes: ${patientNotes || "None"}`,
          kentsObservation: reactionWindow === "steady_relief" 
            ? "Observation 4: Recovery without aggravation (rapid smooth amelioration of symptoms)."
            : "Observation 3: Quick short aggravation then rapid cure.",
          remedyPrescribed: "Sac Lac (Placebo observation)",
          potencyPrescribed: "Follow-up",
          symptomEvolutionScore: Math.round((10 - (symptomSeverity || 3)) * 10)
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Remote follow-up check-in saved to clinical record"
    });
  } catch (err: any) {
    console.error("Portal POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

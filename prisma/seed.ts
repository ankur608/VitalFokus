import { PrismaClient } from "@prisma/client";
import { remediesData } from "./remediesData";
import { rubricsData } from "./rubricsData";
import { macroSectionsData } from "./macroSectionsData";
import { synonymsData } from "./synonymsData";
import { samplePatients } from "./samplePatients";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting VitalFokus Database Seeding with Suggesta Enhancements...");

  // 1. Clean existing records in sequence
  await prisma.rubricRemedyGrade.deleteMany();
  await prisma.materiaMedicaEntry.deleteMany();
  await prisma.savedAnalysis.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.synonymMap.deleteMany();
  await prisma.rubric.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.remedy.deleteMany();

  console.log("🧹 Existing database tables cleared.");

  // 2. Seed Remedies & Materia Medica
  console.log(`💊 Seeding ${remediesData.length} core polycrest and classic remedies...`);
  const remedyMap = new Map<string, string>(); // abbr -> id

  for (const rem of remediesData) {
    const created = await prisma.remedy.create({
      data: {
        remedyNumber: rem.remedyNumber,
        name: rem.name,
        abbreviation: rem.abbreviation,
        commonName: rem.commonName,
        kingdom: rem.kingdom,
        miasm: rem.miasm,
        thermalState: rem.thermalState,
        isPolycrest: rem.isPolycrest,
        shortDescription: rem.shortDescription,
        mindKeynotes: rem.mindKeynotes,
        generalsKeynotes: rem.generalsKeynotes,
        modalitiesKeynotes: rem.modalitiesKeynotes,
        complementary: rem.complementary,
        antidotes: rem.antidotes,
        followsWell: rem.followsWell,
        inimical: rem.inimical,
        materiaMedica: {
          create: rem.materiaMedica.map((mm) => ({
            section: mm.section,
            content: mm.content
          }))
        }
      }
    });
    remedyMap.set(rem.abbreviation, created.id);
  }

  // 3. Extract unique Chapters (Anatomical + Functional Macro-Sections)
  const combinedRubrics = [...rubricsData, ...macroSectionsData];
  const chapterNames = Array.from(new Set(combinedRubrics.map((r) => r.chapter)));
  console.log(`📚 Seeding ${chapterNames.length} Repertory Chapters across Functional Macro-Sections...`);
  const chapterMap = new Map<string, string>();

  for (let i = 0; i < chapterNames.length; i++) {
    const chapName = chapterNames[i];
    let macroSec = "Anatomical";
    if (chapName === "Generalities") macroSec = "Generalities";
    else if (chapName === "Felt Pain Qualities") macroSec = "Felt Pain Qualities";
    else if (chapName === "Modern Syndromes") macroSec = "Modern Illnesses & Syndromes";
    else if (chapName === "Obstetrics & Gynecology") macroSec = "Obstetrics & Gynecology";
    else if (chapName === "Life Stages & Age") macroSec = "Life Stages / Age";

    const createdChapter = await prisma.chapter.create({
      data: {
        name: chapName,
        macroSection: macroSec,
        orderIndex: i + 1
      }
    });
    chapterMap.set(chapName, createdChapter.id);
  }

  // 4. Seed Rubrics and RubricRemedyGrades
  console.log(`🔍 Seeding ${combinedRubrics.length} Rubrics (including [Clinical Addition - User Verified])...`);
  for (const r of combinedRubrics as any[]) {
    const chapterId = chapterMap.get(r.chapter);
    if (!chapterId) continue;

    const validRemedies = r.remedies.filter((rem: any) => remedyMap.has(rem.abbr));

    await prisma.rubric.create({
      data: {
        chapterId,
        fullPath: r.fullPath,
        label: r.label,
        crossReferences: r.crossReferences || null,
        macroSection: r.macroSection || "Anatomical",
        isClinicalAddition: Boolean(r.isClinicalAddition),
        authorPractitioner: r.authorPractitioner || null,
        caseVerifiedNotes: r.caseVerifiedNotes || null,
        sourceCitation: r.sourceCitation || null,
        remedyCount: validRemedies.length,
        remedies: {
          create: validRemedies.map((rem: any) => ({
            remedyId: remedyMap.get(rem.abbr)!,
            grade: rem.grade,
            isClinicalAddition: Boolean(r.isClinicalAddition),
            caseVerifiedNotes: r.caseVerifiedNotes || null
          }))
        }
      }
    });
  }

  // 5. Seed Modern Medical Synonyms
  console.log(`📖 Seeding ${synonymsData.length} Modern Medical Lexicon Synonyms...`);
  for (const syn of synonymsData) {
    await prisma.synonymMap.create({
      data: {
        modernTerm: syn.modernTerm,
        classicalRubricPath: syn.classicalRubricPath,
        category: syn.category,
        clinicalExplanation: syn.clinicalExplanation,
        suggestedRemedies: syn.suggestedRemedies
      }
    });
  }

  // 6. Seed Sample Patients & Consultations
  console.log(`👤 Seeding ${samplePatients.length} Detailed Clinical Patient Cases...`);
  for (const p of samplePatients) {
    const { consultations, ...patientData } = p;
    const createdPatient = await prisma.patient.create({
      data: {
        ...patientData,
        consultations: {
          create: consultations.map((c) => ({
            date: c.date,
            chiefComplaints: c.chiefComplaints,
            modalitiesAggr: c.modalitiesAggr,
            modalitiesAmel: c.modalitiesAmel,
            concomitants: c.concomitants,
            mindDisposition: c.mindDisposition,
            physicalGenerals: c.physicalGenerals,
            thermalState: c.thermalState,
            miasmaticTags: c.miasmaticTags,
            kentsObservation: c.kentsObservation,
            potencyPrescribed: c.potencyPrescribed,
            remedyPrescribed: c.remedyPrescribed,
            repetitionSchedule: c.repetitionSchedule,
            symptomEvolutionScore: c.symptomEvolutionScore,
            clinicalNotes: c.clinicalNotes,
            freeTextCaseNotes: c.freeTextCaseNotes
          }))
        }
      }
    });

    if (p.firstName === "Eleanor") {
      await prisma.savedAnalysis.create({
        data: {
          patientId: createdPatient.id,
          title: "Eleanor Vance - Initial Nocturnal Anxiety & Gastralgia Repertorisation",
          strategy: "totality",
          clipboards: JSON.stringify([
            {
              id: "cb-1",
              name: "Mental Generals",
              color: "#3B82F6",
              rubrics: [
                { id: "mind-anx-health", fullPath: "Mind; anxiety; health, about", weight: 2, eliminative: false },
                { id: "mind-restl", fullPath: "Mind; restlessness; nervousness", weight: 3, eliminative: false }
              ]
            }
          ]),
          topRemedies: JSON.stringify([
            { name: "Arsenicum album", abbr: "ars.", score: 32, coveredCount: 6, totalRubrics: 6 }
          ]),
          aiSynthesis: "Synthesis: Clear Arsenicum album totality matching all 6 symptoms across Mental Generals, Midnight Modalities, and Thermal State."
        }
      });
    }
  }

  console.log("✅ VitalFokus Database Seeding with Suggesta Enhancements successfully completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

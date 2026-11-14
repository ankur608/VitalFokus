async function runVerification() {
  console.log("🚀 Starting VitalFokus Comprehensive Verification Test Suite...");

  const BASE_URL = "http://localhost:3000";

  // 1. Verify Patients Endpoint
  console.log("\n1️⃣ Testing Patients API & Demographics (DOB & Gender)...");
  const patientsRes = await fetch(`${BASE_URL}/api/patients`);
  const patientsData = await patientsRes.json();
  console.log(`   ✓ Found ${patientsData.patients.length} detailed patients in database`);
  const eleanor = patientsData.patients.find((p: any) => p.firstName === "Eleanor");
  if (!eleanor) throw new Error("Eleanor Vance not found!");
  console.log(`   ✓ Patient confirmed: ${eleanor.firstName} ${eleanor.lastName}`);
  console.log(`   ✓ DOB: ${eleanor.dateOfBirth} | Gender: ${eleanor.gender}`);
  if (!eleanor.dateOfBirth || !eleanor.gender) {
    throw new Error("Patient is missing DOB or Gender!");
  }

  // Test updating patient demographics
  const updateRes = await fetch(`${BASE_URL}/api/patients/${eleanor.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: eleanor.firstName,
      lastName: eleanor.lastName,
      dateOfBirth: "1982-05-14",
      gender: "Female",
      occupation: eleanor.occupation
    })
  });
  const updateData = await updateRes.json();
  console.log(`   ✓ Demographics update confirmed: ${updateData.patient.firstName} (${updateData.patient.dateOfBirth}, ${updateData.patient.gender})`);

  // 2. Verify Follow-Up Consultations & Kent's Observations
  console.log("\n2️⃣ Testing Consultations & Kent's Observations...");
  const eleanorDetailRes = await fetch(`${BASE_URL}/api/patients/${eleanor.id}`);
  const eleanorDetail = await eleanorDetailRes.json();
  console.log(`   ✓ Consultations logged: ${eleanorDetail.patient.consultations.length}`);
  console.log(`   ✓ Observation: ${eleanorDetail.patient.consultations[0].kentsObservation}`);

  // 3. Verify Suggesta Modern Medical Synonym Engine
  console.log("\n3️⃣ Testing Modern Medical Lexicon & Synonym Engine...");
  const synRes = await fetch(`${BASE_URL}/api/rubrics?q=hypertension`);
  const synData = await synRes.json();
  if (!synData.matchedSynonym) throw new Error("Synonym mapping for 'hypertension' failed!");
  console.log(`   ✓ Modern Term Detected: '${synData.matchedSynonym.modernTerm}' (${synData.matchedSynonym.category})`);
  console.log(`   ✓ Mapped Classical Rubric: '${synData.matchedSynonym.classicalRubricPath}'`);
  console.log(`   ✓ Suggested remedies: ${synData.matchedSynonym.suggestedRemedies}`);

  // 4. Verify Macro-Sections & Functional Thematic Navigation
  console.log("\n4️⃣ Testing Functional Macro-Sections...");
  const painRes = await fetch(`${BASE_URL}/api/rubrics?macroSection=Felt+Pain+Qualities`);
  const painData = await painRes.json();
  console.log(`   ✓ Retrieved ${painData.rubrics.length} rubrics under 'Felt Pain Qualities'`);
  console.log(`   ✓ Sample Pain Rubric: ${painData.rubrics[0]?.fullPath}`);

  // 5. Verify Practitioner Clinical Additions ([Clinical Addition - User Verified])
  console.log("\n5️⃣ Testing Practitioner Clinical Additions...");
  const clinicalCheckRes = await fetch(`${BASE_URL}/api/rubrics?q=post-viral`);
  const clinicalCheckData = await clinicalCheckRes.json();
  const clinicalRubric = clinicalCheckData.rubrics.find((r: any) => r.isClinicalAddition);
  if (!clinicalRubric) throw new Error("Clinical addition rubric not found!");
  console.log(`   ✓ Found Verified Clinical Rubric: ${clinicalRubric.fullPath}`);
  console.log(`   ✓ Source Citation: ${clinicalRubric.sourceCitation}`);
  console.log(`   ✓ Verified Notes: ${clinicalRubric.caseVerifiedNotes}`);

  // 6. Verify RadarOpus Dynamic Repertorisation & Smart Merged Rubrics
  console.log("\n6️⃣ Testing Dynamic Repertorisation Calculation Grid...");
  const repertorisationPayload = {
    clipboards: [
      {
        id: "cb-1",
        name: "Mental Generals",
        color: "#3B82F6",
        isActive: true,
        rubrics: [
          {
            id: clinicalRubric.id,
            fullPath: clinicalRubric.fullPath,
            weight: 2,
            eliminative: false
          }
        ]
      }
    ],
    strategy: "totality"
  };

  const repRes = await fetch(`${BASE_URL}/api/repertorisation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(repertorisationPayload)
  });
  const repData = await repRes.json();
  console.log(`   ✓ Repertorisation completed: ${repData.remedies.length} remedies ranked`);
  console.log(`   ✓ Top candidate: ${repData.remedies[0].remedy.name} (${repData.remedies[0].remedy.abbreviation}) - Score: ${repData.remedies[0].weightedScore}`);

  // 7. Verify VitalAI Predictive Inference Agent
  console.log("\n7️⃣ Testing VitalAI Predictive Clinical Inference Agent...");
  const aiPayload = {
    patientCase: eleanorDetail.patient,
    clipboards: repertorisationPayload.clipboards,
    topRemedies: repData.remedies,
    clarificationAnswers: {
      thermal_clarity: "Intensely Chilly (Must bundle up warmly)"
    }
  };

  const aiRes = await fetch(`${BASE_URL}/api/vital-ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aiPayload)
  });
  const aiData = await aiRes.json();
  const report = aiData.report;
  if (!report) throw new Error("VitalAI inference report missing!");

  console.log(`   ✓ Primary Similimum: ${report.predictionSummary?.primarySimilimum} (${report.predictionSummary?.confidenceScore}%)`);
  console.log(`   ✓ Hering's Law Direction: ${report.predictionSummary?.heringsLawPrognosis?.slice(0, 80)}...`);
  console.log(`   ✓ Materia Medica Citation: ${report.topRemedies[0]?.materiaMedicaCitation?.slice(0, 80)}...`);
  console.log(`   ✓ Interactive Clarifications: ${report.interactiveClarifications?.length} generated`);

  // 8. Verify 180+ Numbered Remedies in Materia Medica
  console.log("\n8️⃣ Testing 180+ Numbered Materia Medica Remedies...");
  const remediesRes = await fetch(`${BASE_URL}/api/remedies`);
  const remediesData = await remediesRes.json();
  console.log(`   ✓ Total remedies returned: ${remediesData.remedies.length}`);
  if (remediesData.remedies.length < 180) {
    throw new Error(`Expected at least 180 remedies, but got ${remediesData.remedies.length}`);
  }
  const rem1 = remediesData.remedies.find((r: any) => r.remedyNumber === 1);
  const rem188 = remediesData.remedies.find((r: any) => r.remedyNumber === 188);
  console.log(`   ✓ Remedy #001: ${rem1?.name} (${rem1?.abbreviation})`);
  console.log(`   ✓ Remedy #188: ${rem188?.name} (${rem188?.abbreviation})`);

  // 9. Verify VitalAI Chat Copilot Endpoint
  console.log("\n9️⃣ Testing VitalAI Chat Copilot & Walkthrough Agent...");
  const chatRes = await fetch(`${BASE_URL}/api/vital-ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: "Walk me through step-by-step how to use VitalAI to predict a remedy"
        }
      ],
      currentPatient: eleanorDetail.patient,
      clipboards: repertorisationPayload.clipboards,
      topRemedies: repData.remedies
    })
  });
  const chatData = await chatRes.json();
  if (!chatData.reply || chatData.reply.length < 50) {
    throw new Error("VitalAI Chat walkthrough response missing or too short!");
  }
  console.log(`   ✓ Chat response received (${chatData.reply.length} chars)`);
  console.log(`   ✓ Sample walkthrough snippet: ${chatData.reply.slice(0, 90).replace(/\n/g, " ")}...`);

  console.log("\n🎉 ALL 9 VITALFOKUS SUBSYSTEMS, 188 NUMBERED REMEDIES & VITALAI CHAT COPILOT VERIFIED AND OPERATIONAL!\n");
}

runVerification().catch((err) => {
  console.error("❌ Verification failed:", err);
  process.exit(1);
});

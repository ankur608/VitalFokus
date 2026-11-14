/**
 * Hahnemannian Posology & Plussing Engine
 * Grounded in Samuel Hahnemann's Organon of Medicine (5th & 6th Editions, §§ 246–248, 270)
 * Calculates split-dose Plussing schedules and LM/Q potency dilution protocols.
 */

export type PotencyScale = "Centessimal_C" | "LM_50_Millesimal";
export type PatientVitality = "High" | "Moderate" | "Fragile" | "Exhausted";
export type DiseaseCadence = "HyperAcute" | "Acute" | "SubAcute" | "ChronicDeep";

export interface PosologyInput {
  remedyName: string;
  potencyScale: PotencyScale;
  potencyGrade: string; // e.g. "LM1", "LM2", "30C", "200C"
  vitality: PatientVitality;
  diseaseCadence: DiseaseCadence;
  pathologyDepth: "Functional" | "Mild_Tissue_Changes" | "Deep_Autoimmune" | "Irreversible_Organic";
}

export interface PosologyProtocol {
  remedyName: string;
  potencyGrade: string;
  potencyScale: PotencyScale;
  bottlePreparation: string;
  succussionCount: number;
  dilutionCupInstructions: string;
  repetitionInterval: string;
  maxDosesBeforeReview: number;
  clinicalRules: string[];
  prescriptionSummary: string;
}

export function calculatePosologyProtocol(input: PosologyInput): PosologyProtocol {
  // 1. Determine succussions based on vitality (§ 248)
  // Hypersensitive or fragile vitality needs fewer succussions (6-8) to prevent heavy dynamic aggravation.
  // Robust vitality can receive 10-12 vigorous succussions.
  let succussions = 10;
  if (input.vitality === "Fragile" || input.vitality === "Exhausted" || input.pathologyDepth === "Irreversible_Organic") {
    succussions = 6;
  } else if (input.vitality === "High") {
    succussions = 12;
  }

  // 2. Preparation details
  let bottlePrep = "";
  let dilutionCup = "";

  if (input.potencyScale === "LM_50_Millesimal") {
    bottlePrep = `Dissolve 1 poppy-seed micro-globule of ${input.remedyName} ${input.potencyGrade} in 150 ml (5 oz) of pure distilled water. Add 1 tablespoon (15 ml) of pure 90% ethanol/brandy as a preservative. Keep tightly stoppered in amber glass away from sunlight and odors.`;
    
    if (input.vitality === "Fragile" || input.pathologyDepth === "Deep_Autoimmune") {
      dilutionCup = `Second-Glass Dilution (§ 248): Before every dose, strike the bottle ${succussions} times against an elastic book. Take 1 teaspoonful (5 ml) from the bottle and stir thoroughly into a second glass containing 100 ml of pure water. Administer only 1 teaspoonful from this second glass to the patient, and discard the rest of the second glass.`;
    } else {
      dilutionCup = `Single-Glass Method: Strike the bottle ${succussions} times firmly against an elastic surface. Take 1 teaspoonful (5 ml) from the bottle, stir into 4 tablespoons of water, and administer to the patient.`;
    }
  } else {
    // Centessimal Water Dosing / Plussing
    bottlePrep = `Centessimal Plussing Method: Dissolve 2 pellets of ${input.remedyName} ${input.potencyGrade} into 120 ml (4 oz) of distilled water in a clean glass bottle.`;
    dilutionCup = `Succuss bottle ${succussions} times before administration. Take 1 teaspoonful from bottle, stir in half a glass of fresh water, and give 1 teaspoonful to patient.`;
  }

  // 3. Cadence and repetition interval (§ 246)
  let cadenceText = "";
  let maxDoses = 7;

  switch (input.diseaseCadence) {
    case "HyperAcute":
      cadenceText = "Administer every 1 to 2 hours until marked relief or primary aggravation occurs.";
      maxDoses = 4;
      break;
    case "Acute":
      cadenceText = "Administer every 4 to 6 hours for the first 24 to 48 hours.";
      maxDoses = 6;
      break;
    case "SubAcute":
      cadenceText = "Administer once daily in the morning on an empty stomach.";
      maxDoses = 10;
      break;
    case "ChronicDeep":
      if (input.potencyScale === "LM_50_Millesimal") {
        cadenceText = "Administer once every other day (or 3 times weekly: Mon, Wed, Fri), always preceded by fresh succussion.";
        maxDoses = 14;
      } else {
        cadenceText = "Single split dose over 2 consecutive mornings; then wait and observe for 4 to 6 weeks.";
        maxDoses = 2;
      }
      break;
  }

  // 4. Clinical safety rules
  const clinicalRules = [
    "Hahnemann's Law (§ 246): Stop all doses immediately upon the first signs of improvement. Allow the vital force to act undisturbed as long as progress continues.",
    "Succussion Dynamic (§ 248): Never take two consecutive doses from the medicinal liquid without succussing the bottle, so that the degree of potency is slightly raised each time, preventing medicinal aggravations.",
    "Antidote Safeguard: Avoid strong odors (camphor, menthol, peppermint, eucalyptus) and raw coffee during treatment."
  ];

  return {
    remedyName: input.remedyName,
    potencyGrade: input.potencyGrade,
    potencyScale: input.potencyScale,
    bottlePreparation: bottlePrep,
    succussionCount: succussions,
    dilutionCupInstructions: dilutionCup,
    repetitionInterval: cadenceText,
    maxDosesBeforeReview: maxDoses,
    clinicalRules,
    prescriptionSummary: `Rx: ${input.remedyName} ${input.potencyGrade} (${input.potencyScale === "LM_50_Millesimal" ? "LM Split-Dose" : "Centessimal Plussing"}) • ${cadenceText}`
  };
}

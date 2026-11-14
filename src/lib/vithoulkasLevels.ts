/**
 * Vithoulkas Expert System (VES) & Levels of Health Engine
 * Based on Prof. George Vithoulkas's "The Levels of Health"
 *
 * Classifies patients into 12 Levels across 4 Groups (A, B, C, D)
 * and predicts post-prescription reactions according to Kent's Observations.
 */

export type HealthGroup = "A" | "B" | "C" | "D";

export interface LevelOfHealthDefinition {
  level: number;
  group: HealthGroup;
  title: string;
  feverCapability: string;
  vitalityDescription: string;
  expectedReaction: string;
  kentsObservationMatch: string;
  recommendedPotencies: string[];
  repetitionWarning: string;
}

export const LEVELS_OF_HEALTH_DATA: Record<number, LevelOfHealthDefinition> = {
  1: {
    level: 1,
    group: "A",
    title: "Optimum Vitality & High Defense",
    feverCapability: "High acute fever (> 39.0°C / 102.2°F) produces rapidly and clears within 24-48 hrs.",
    vitalityDescription: "Excellent vitality, clear keynote symptoms, no hereditary burden, perfect resilience.",
    expectedReaction: "Sharp, short aggravation (hours) followed by rapid, permanent cure.",
    kentsObservationMatch: "Observation 1: Prolonged aggravation, then final cure, or Observation 3: Quick short aggravation then rapid cure.",
    recommendedPotencies: ["200C", "1M", "10M"],
    repetitionWarning: "Single dose only. Do NOT repeat while improvement is active."
  },
  2: {
    level: 2,
    group: "A",
    title: "High Vitality with Minor Functional Disturbance",
    feverCapability: "Produces acute fevers up to 38.8°C with typical infectious exposures.",
    vitalityDescription: "Strong vitality, clear emotional and physical generals, minimal allopathic suppression.",
    expectedReaction: "Brief initial aggravation (12-24 hrs) leading to smooth recovery.",
    kentsObservationMatch: "Observation 3: Aggravation is quick, short, and strong with rapid amelioration of the patient.",
    recommendedPotencies: ["200C", "1M"],
    repetitionWarning: "Wait and watch; evaluate after 4-6 weeks before repeating."
  },
  3: {
    level: 3,
    group: "A",
    title: "Robust Defense with Occasional Stress Sensitivities",
    feverCapability: "Capable of acute fever > 38.5°C once every 1-2 years.",
    vitalityDescription: "Well-defined remedy picture with slight emotional or physical fatigue.",
    expectedReaction: "Noticeable primary aggravation followed by sustained improvement.",
    kentsObservationMatch: "Observation 4: Recovery without aggravation.",
    recommendedPotencies: ["30C", "200C"],
    repetitionWarning: "Allow remedy to act completely before considering next potency."
  },
  4: {
    level: 4,
    group: "B",
    title: "Moderate Vitality with Chronic Functional Tendency",
    feverCapability: "Produces mild to moderate fever (38.0°C - 38.5°C) occasionally.",
    vitalityDescription: "Chronic symptoms emerge periodically (allergic rhinitis, migraines, mild hypertension).",
    expectedReaction: "Mild aggravation, sometimes delayed by 2-3 days, followed by gradual progress.",
    kentsObservationMatch: "Observation 4: Recovery without aggravation, or Observation 9: Action of the medicines upon provers.",
    recommendedPotencies: ["30C", "200C", "LM1 - LM3"],
    repetitionWarning: "Gentle repetition or LM split doses suitable if patient is sensitive."
  },
  5: {
    level: 5,
    group: "B",
    title: "Compromised Vitality with Multiple Allopathic Suppressions",
    feverCapability: "Fevers rarely exceed 38.0°C; illnesses linger without resolving crisply.",
    vitalityDescription: "Multiple past suppressions (antibiotics, steroids, NSAIDs). Symptom picture slightly obscured.",
    expectedReaction: "Gradual amelioration without sharp aggravation. May require sequential complimentary remedies.",
    kentsObservationMatch: "Observation 8: Some patients prove every remedy they take.",
    recommendedPotencies: ["30C", "LM1 - LM6"],
    repetitionWarning: "Avoid 1M or 10M potencies; use moderate potencies with careful observation."
  },
  6: {
    level: 6,
    group: "B",
    title: "Borderline Low Defense with Latent Miasmatic Load",
    feverCapability: "Has not produced a high fever in 3-5 years; catches mild colds that drag on.",
    vitalityDescription: "Moderate pathology (recurrent eczema, asthma, chronic digestive disorders).",
    expectedReaction: "Moderate aggravation. Return of old symptoms (e.g. old childhood skin eruption) confirms healing.",
    kentsObservationMatch: "Observation 11: When old symptoms reappear, cure is underway according to Hering's Law.",
    recommendedPotencies: ["30C", "LM1 - LM4"],
    repetitionWarning: "Never prescribe while old symptoms are reappearing."
  },
  7: {
    level: 7,
    group: "C",
    title: "Suppressed Defense with Deeper Chronic Pathology",
    feverCapability: "Incapable of producing high fever for over 5-8 years.",
    vitalityDescription: "Deep chronic illness (autoimmune disorders, severe rheumatoid arthritis, chronic colitis).",
    expectedReaction: "Prolonged aggravation. Re-emergence of an acute high fever after treatment is the breakthrough confirmation of vital force reactivation.",
    kentsObservationMatch: "Observation 1: Long aggravation, then final and slow recovery.",
    recommendedPotencies: ["12C", "30C", "LM1 - LM2"],
    repetitionWarning: "High potencies (1M+) are strictly contra-indicated; start low."
  },
  8: {
    level: 8,
    group: "C",
    title: "Deep Chronic Pathology with Suppressed Miasms",
    feverCapability: "No fevers in 8+ years. Chronic low-grade malaise.",
    vitalityDescription: "Structural tissue modifications beginning; emotional numbness or deep-seated anxiety.",
    expectedReaction: "Slow, protracted recovery requiring multiple remedy layers over months.",
    kentsObservationMatch: "Observation 2: Long aggravation; slow cure.",
    recommendedPotencies: ["6C", "12C", "30C", "LM1"],
    repetitionWarning: "Plussing method with LM potencies recommended to prevent heavy aggravations."
  },
  9: {
    level: 9,
    group: "C",
    title: "Severely Diminished Defense with Early Degeneration",
    feverCapability: "Complete absence of acute inflammatory or fever responses.",
    vitalityDescription: "Significant pathology; vital force struggling to manifest clear mental keynotes.",
    expectedReaction: "Very long, difficult aggravation. Danger of aggravating organic lesions if potency is too high.",
    kentsObservationMatch: "Observation 5: Amelioration comes first and aggravation follows (superficial remedy or incurable).",
    recommendedPotencies: ["6C", "12C", "LM1"],
    repetitionWarning: "Prescribe strictly with organ-affinity or low-potency constitutional remedy."
  },
  10: {
    level: 10,
    group: "D",
    title: "Advanced Organic Pathology & Fragile Vitality",
    feverCapability: "Immune system unable to mount fever; body is hypothermic or subnormal.",
    vitalityDescription: "Advanced degenerative changes (severe renal insufficiency, advanced cirrhosis, Parkinson's).",
    expectedReaction: "Palliation of suffering; homeopathic aggravation must be strictly avoided as it may hasten decline.",
    kentsObservationMatch: "Observation 6: Too short relief of symptoms (incurable state).",
    recommendedPotencies: ["3X", "6X", "6C", "LM1 (highly diluted)"],
    repetitionWarning: "High potencies can cause fatal homeopathic aggravations. Palliation only."
  },
  11: {
    level: 11,
    group: "D",
    title: "Terminal / Irreversible Tissue Destruction",
    feverCapability: "No inflammatory defense capability.",
    vitalityDescription: "End-stage organ failure or extensive malignancy with severe cachexia.",
    expectedReaction: "Euthanasia / pain amelioration and calming of mental distress.",
    kentsObservationMatch: "Observation 7: Full amelioration of symptoms yet no improvement in patient's vital organic state.",
    recommendedPotencies: ["6X", "12X", "6C (single liquid sip)"],
    repetitionWarning: "Gentle symptomatic relief only; avoid deep antipsoric or deep miasmatic constitutional remedies."
  },
  12: {
    level: 12,
    group: "D",
    title: "Extreme Vital Force Collapse / Moribund State",
    feverCapability: "Zero defense response.",
    vitalityDescription: "Complete organic breakdown; vital force exhausted.",
    expectedReaction: "Immediate comfort and psychological peace; gentle palliative support.",
    kentsObservationMatch: "Observation 6 & 7: Short relief, palliative transition.",
    recommendedPotencies: ["3X", "6C", "Rescue remedies / Carbo veg / Arsenicum in low potencies"],
    repetitionWarning: "Do not attempt deep constitutional cure."
  }
};

export interface VethAssessmentInput {
  feverHistory: "high_fever_recent" | "moderate_fever_occasional" | "no_fever_5_years" | "no_fever_10_plus_years";
  suppressionHistory: "none_minimal" | "moderate_antibiotics_nsaids" | "heavy_steroids_immunosuppressants" | "lifelong_polypharmacy";
  pathologyDepth: "functional_only" | "mild_tissue_changes" | "deep_chronic_autoimmune" | "irreversible_organic_degeneration";
  symptomClarity: "crisp_distinct_keynotes" | "clear_generals" | "confused_symptom_picture" | "scanty_few_symptoms";
}

export interface VethAssessmentResult {
  level: number;
  group: HealthGroup;
  definition: LevelOfHealthDefinition;
  summary: string;
  expectedKentObservation: string;
  actionProtocol: string;
}

/**
 * Calculates the Vithoulkas Level of Health based on 4 clinical parameters
 */
export function calculateVithoulkasLevel(input: VethAssessmentInput): VethAssessmentResult {
  let score = 0;

  // 1. Fever capability (0 - 4 points)
  switch (input.feverHistory) {
    case "high_fever_recent": score += 1; break;
    case "moderate_fever_occasional": score += 4; break;
    case "no_fever_5_years": score += 7; break;
    case "no_fever_10_plus_years": score += 10; break;
  }

  // 2. Suppression history (0 - 3 points adjustment)
  switch (input.suppressionHistory) {
    case "none_minimal": score += 0; break;
    case "moderate_antibiotics_nsaids": score += 1; break;
    case "heavy_steroids_immunosuppressants": score += 2; break;
    case "lifelong_polypharmacy": score += 3; break;
  }

  // 3. Pathology depth
  switch (input.pathologyDepth) {
    case "functional_only": score = Math.min(score, 4); break;
    case "mild_tissue_changes": score = Math.max(score, 4); break;
    case "deep_chronic_autoimmune": score = Math.max(score, 7); break;
    case "irreversible_organic_degeneration": score = Math.max(score, 10); break;
  }

  // 4. Symptom clarity refinement
  if (input.symptomClarity === "crisp_distinct_keynotes") {
    score -= 1;
  } else if (input.symptomClarity === "scanty_few_symptoms") {
    score += 1;
  }

  // Constrain between 1 and 12
  const level = Math.max(1, Math.min(12, Math.round(score)));
  const def = LEVELS_OF_HEALTH_DATA[level];

  return {
    level,
    group: def.group,
    definition: def,
    summary: `Group ${def.group} - Level ${level}: ${def.title}`,
    expectedKentObservation: def.kentsObservationMatch,
    actionProtocol: `Prescribe in ${def.recommendedPotencies.join(" or ")}. ${def.repetitionWarning}`
  };
}

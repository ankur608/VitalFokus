/**
 * Bönninghausen Polarity Analysis (BPA) Engine
 * Implements Heiner Frei's Polarity Difference algorithm.
 *
 * Polarity Difference (PD) = (Sum of grades of patient's polar symptoms) - (Sum of grades of opposite contra-indicated polar symptoms)
 * A high positive PD indicates strong polar concordance.
 * Contra-indications (CI) occur when a remedy has a high grade (Grade 3 or 4) in the OPPOSITE polar modality.
 */

export interface PolarPair {
  id: string;
  category: "Thermal" | "Motion" | "Air & Environment" | "Position & Pressure" | "Food & Habits" | "Time & Sleep";
  labelPositive: string;
  rubricKeywordsPositive: string[];
  labelNegative: string;
  rubricKeywordsNegative: string[];
}

export const POLAR_PAIRS: PolarPair[] = [
  {
    id: "warmth_cold",
    category: "Thermal",
    labelPositive: "< Warmth / Heat (aggravated by warmth)",
    rubricKeywordsPositive: ["warm", "heat", "sun", "warm room", "heated"],
    labelNegative: "> Warmth / Heat (ameliorated by warmth) / < Cold",
    rubricKeywordsNegative: ["cold", "chilly", "draft", "winter", "cold air", "cold drinks"]
  },
  {
    id: "cold_warm",
    category: "Thermal",
    labelPositive: "< Cold / Cold air / Uncovering",
    rubricKeywordsPositive: ["cold", "cold air", "uncovering", "draft", "cold food"],
    labelNegative: "> Cold / Cold air / < Warmth",
    rubricKeywordsNegative: ["warm", "warm room", "heat", "stove", "summer"]
  },
  {
    id: "motion_rest",
    category: "Motion",
    labelPositive: "< Motion / Walking / Exertion",
    rubricKeywordsPositive: ["motion", "walking", "exertion", "movement", "ascending"],
    labelNegative: "> Motion / Walking / < Rest",
    rubricKeywordsNegative: ["rest", "lying", "sitting", "still", "quiet"]
  },
  {
    id: "rest_motion",
    category: "Motion",
    labelPositive: "< Rest / Sitting / Lying still",
    rubricKeywordsPositive: ["rest", "sitting", "lying", "still", "inactivity"],
    labelNegative: "> Rest / Sitting / < Motion",
    rubricKeywordsNegative: ["motion", "walking", "moving", "pacing", "exercise"]
  },
  {
    id: "open_air_room",
    category: "Air & Environment",
    labelPositive: "< Open air / Wind",
    rubricKeywordsPositive: ["open air", "wind", "outdoors", "breeze"],
    labelNegative: "> Open air / Desires open air / < Room",
    rubricKeywordsNegative: ["warm room", "indoors", "close room", "stuffy"]
  },
  {
    id: "room_open_air",
    category: "Air & Environment",
    labelPositive: "< Warm stuffy room / Indoors",
    rubricKeywordsPositive: ["warm room", "indoors", "room", "enclosed"],
    labelNegative: "> Warm stuffy room / < Open air",
    rubricKeywordsNegative: ["open air", "outdoors", "fresh air"]
  },
  {
    id: "pressure_touch",
    category: "Position & Pressure",
    labelPositive: "> Pressure / Hard pressure / Lying on affected side",
    rubricKeywordsPositive: ["pressure, hard", "pressure, ameliorates", "lying on painful side"],
    labelNegative: "< Touch / Light touch / Pressure",
    rubricKeywordsNegative: ["touch", "light touch", "contact", "pressure, aggravates"]
  },
  {
    id: "eating_fasting",
    category: "Food & Habits",
    labelPositive: "< After eating / Full stomach",
    rubricKeywordsPositive: ["eating, after", "eating, while", "full stomach"],
    labelNegative: "> After eating / < Empty stomach / Fasting",
    rubricKeywordsNegative: ["fasting", "empty stomach", "eating, ameliorates"]
  },
  {
    id: "sleep_waking",
    category: "Time & Sleep",
    labelPositive: "< After sleep / On waking",
    rubricKeywordsPositive: ["sleep, after", "waking, on", "morning, waking"],
    labelNegative: "> After sleep / Restful sleep",
    rubricKeywordsNegative: ["sleep, after ameliorates", "sleep, improves"]
  }
];

export interface RemedyPolarityScore {
  remedyId: string;
  remedyName: string;
  remedyAbbr: string;
  remedyNumber: number;
  kingdom: string;
  polarRubricCount: number;
  patientPolarScore: number;
  oppositeContraScore: number;
  polarityDifference: number; // P - CI
  contraIndications: Array<{
    pairId: string;
    patientModality: string;
    contraModality: string;
    contraGrade: number;
    severity: "Mild" | "Moderate" | "Severe";
  }>;
}

/**
 * Detects if a rubric name matches a known polar pair
 */
export function identifyPolarPair(rubricName: string): { pair: PolarPair; isPositive: boolean } | null {
  const lower = rubricName.toLowerCase();
  for (const pair of POLAR_PAIRS) {
    if (pair.rubricKeywordsPositive.some(k => lower.includes(k))) {
      return { pair, isPositive: true };
    }
    if (pair.rubricKeywordsNegative.some(k => lower.includes(k))) {
      return { pair, isPositive: false };
    }
  }
  return null;
}

/**
 * Computes Frei's Polarity Difference score for a set of selected rubrics and remedies
 */
export function calculatePolarityAnalysis(
  selectedRubrics: Array<{ id: string; name: string; chapter: string; intensityWeight?: number }>,
  remedyGrades: Array<{ remedyId: string; remedyName: string; remedyAbbr: string; remedyNumber?: number; kingdom?: string; rubricId: string; grade: number }>
): RemedyPolarityScore[] {
  // 1. Group rubrics by polar association
  const analyzedRubrics = selectedRubrics.map(r => {
    const polarityMatch = identifyPolarPair(r.name);
    return {
      ...r,
      polarityMatch
    };
  });

  const remediesMap = new Map<string, RemedyPolarityScore>();

  // Initialize remedies
  remedyGrades.forEach(rg => {
    if (!remediesMap.has(rg.remedyId)) {
      remediesMap.set(rg.remedyId, {
        remedyId: rg.remedyId,
        remedyName: rg.remedyName,
        remedyAbbr: rg.remedyAbbr,
        remedyNumber: rg.remedyNumber || 0,
        kingdom: rg.kingdom || "Unknown",
        polarRubricCount: 0,
        patientPolarScore: 0,
        oppositeContraScore: 0,
        polarityDifference: 0,
        contraIndications: []
      });
    }
  });

  // Calculate scores
  analyzedRubrics.forEach(rubric => {
    const weight = rubric.intensityWeight || 1;
    if (!rubric.polarityMatch) return;

    const { pair, isPositive } = rubric.polarityMatch;

    remedyGrades
      .filter(rg => rg.rubricId === rubric.id)
      .forEach(rg => {
        const item = remediesMap.get(rg.remedyId);
        if (!item) return;

        item.polarRubricCount += 1;
        item.patientPolarScore += rg.grade * weight;

        // Estimate synthetic contra-indication score based on remedy polarity modalities
        // In classical Boenninghausen repertory, opposite modalities are looked up.
        // If remedy is prominent in opposite polar pole, contra-indication is logged.
        const remedyLower = rg.remedyName.toLowerCase();

        // Specific classic polarity contra-indication rules (Boenninghausen / Frei):
        // E.g. Bryonia: extremely < motion, so > motion is strongly contra-indicated
        // Rhus tox: < rest, > motion, so < motion is contra-indicated
        // Arsenicum: intensely chilly (< cold), so < warmth is contra-indicated
        // Apis: intensely hot (< warmth), so < cold is contra-indicated
        let contraGrade = 0;
        if (pair.id === "motion_rest") {
          if (isPositive && (remedyLower.includes("rhus") || remedyLower.includes("ferr"))) {
            contraGrade = 3;
          } else if (!isPositive && (remedyLower.includes("bry") || remedyLower.includes("kali-c"))) {
            contraGrade = 3;
          }
        } else if (pair.id === "warmth_cold" || pair.id === "cold_warm") {
          if (isPositive && (remedyLower.includes("ars") || remedyLower.includes("hepar") || remedyLower.includes("psor"))) {
            contraGrade = 3; // Naturally chilly remedy contra-indicated if aggravated by cold
          } else if (!isPositive && (remedyLower.includes("apis") || remedyLower.includes("puls") || remedyLower.includes("iod"))) {
            contraGrade = 4; // Hot remedy contra-indicated if chilled
          }
        }

        if (contraGrade > 0) {
          item.oppositeContraScore += contraGrade * weight;
          item.contraIndications.push({
            pairId: pair.id,
            patientModality: isPositive ? pair.labelPositive : pair.labelNegative,
            contraModality: isPositive ? pair.labelNegative : pair.labelPositive,
            contraGrade,
            severity: contraGrade >= 3 ? "Severe" : "Moderate"
          });
        }
      });
  });

  // Calculate final Polarity Difference (PD)
  const results = Array.from(remediesMap.values()).map(r => {
    r.polarityDifference = r.patientPolarScore - r.oppositeContraScore;
    return r;
  });

  // Sort descending by Polarity Difference score, then by patientPolarScore
  return results.sort((a, b) => b.polarityDifference - a.polarityDifference || b.patientPolarScore - a.patientPolarScore);
}

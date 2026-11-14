/**
 * Ambient Speech & Real-Time LSMC Entity Extraction Engine
 * Parses consultation speech into:
 * - Location (Anatomical site)
 * - Sensation (Pain character & physical feeling)
 * - Modality (Aggravation < and Amelioration >)
 * - Concomitant (Accompanying symptoms & thermal/mental dynamic)
 * and matches classical Kentian rubrics.
 */

export interface LSMCEntities {
  locations: string[];
  sensations: string[];
  modalitiesAggr: string[];
  modalitiesAmel: string[];
  concomitants: string[];
  suggestedRubrics: Array<{
    fullPath: string;
    chapter: string;
    label: string;
    matchedKeywords: string[];
    remedyCount: number;
    recommendedClipboard: string;
  }>;
}

const LOCATION_KEYWORDS: Record<string, string[]> = {
  Head: ["head", "forehead", "temple", "temples", "occiput", "vertex", "scalp", "carotid"],
  Mind: ["anxiety", "fear", "restless", "panic", "weeping", "anger", "fastidious", "hurry", "delirium", "sadness", "grief"],
  Stomach: ["stomach", "epigastrium", "pit of stomach", "appetite", "nausea", "vomiting", "eructations", "heartburn"],
  Abdomen: ["abdomen", "belly", "liver", "hypochondria", "umbilicus", "groin", "ileocecal"],
  Throat: ["throat", "tonsil", "tonsils", "pharynx", "larynx", "uvula", "swallowing"],
  Chest: ["chest", "lungs", "sternum", "heart", "palpitation", "cough", "breathing", "respiration"],
  Extremities: ["joints", "knees", "ankles", "wrists", "fingers", "soles", "feet", "legs", "arms", "shoulders", "calves"],
  Skin: ["skin", "eruption", "eczema", "urticaria", "itching", "boils", "warts", "ulcer"],
  Sleep: ["sleep", "insomnia", "waking", "nightmares", "dreams", "drowsiness"]
};

const SENSATION_KEYWORDS = [
  "burning", "throbbing", "pulsating", "stitching", "cutting", "cramping", 
  "spasmodic", "numbness", "tingling", "bruised", "sore", "raw", "shooting", 
  "aching", "wandering", "band-like", "constriction", "plug-like", "splinter-like"
];

const MODALITY_AGGR_KEYWORDS = [
  "cold", "cold air", "draft", "winter", "motion", "walking", "exertion", 
  "ascending", "warmth", "warm room", "heat", "sun", "midnight", "night", 
  "morning", "waking", "touch", "light touch", "eating", "full stomach", 
  "lying down", "standing", "noise", "light"
];

const MODALITY_AMEL_KEYWORDS = [
  "warm drinks", "warm application", "heat", "hot bath", "rest", "lying still", 
  "continued motion", "pacing", "open air", "fresh air", "hard pressure", 
  "lying on painful side", "uncovering", "fasting", "sleep", "dark room"
];

const CONCOMITANT_KEYWORDS = [
  "thirst for small sips", "unquenchable thirst", "thirstless", "cold sweat on forehead", 
  "sour sweat", "profuse perspiration", "restlessness", "palpitations", "prostration", 
  "faintness", "trembling", "sighing", "chilliness", "heat in palms and soles"
];

/**
 * Parses free speech consultation transcript into structured LSMC entities
 */
export function extractLSMCEntities(transcript: string): LSMCEntities {
  const lower = transcript.toLowerCase();

  const locations: string[] = [];
  const sensations: string[] = [];
  const modalitiesAggr: string[] = [];
  const modalitiesAmel: string[] = [];
  const concomitants: string[] = [];

  // Extract Locations
  for (const [loc, words] of Object.entries(LOCATION_KEYWORDS)) {
    if (words.some(w => lower.includes(w))) {
      locations.push(loc);
    }
  }

  // Extract Sensations
  for (const sens of SENSATION_KEYWORDS) {
    if (lower.includes(sens)) {
      sensations.push(sens);
    }
  }

  // Extract Modalities Aggravation (<)
  for (const aggr of MODALITY_AGGR_KEYWORDS) {
    if (
      lower.includes(`< ${aggr}`) || 
      lower.includes(`worse ${aggr}`) || 
      lower.includes(`aggravated by ${aggr}`) ||
      lower.includes(`worse from ${aggr}`) ||
      lower.includes(`cannot bear ${aggr}`)
    ) {
      modalitiesAggr.push(`< ${aggr}`);
    } else if (lower.includes(aggr) && (lower.includes("worse") || lower.includes("aggravat"))) {
      if (!modalitiesAggr.includes(`< ${aggr}`)) {
        modalitiesAggr.push(`< ${aggr}`);
      }
    }
  }

  // Extract Modalities Amelioration (>)
  for (const amel of MODALITY_AMEL_KEYWORDS) {
    if (
      lower.includes(`> ${amel}`) || 
      lower.includes(`better ${amel}`) || 
      lower.includes(`relieved by ${amel}`) ||
      lower.includes(`ameliorated by ${amel}`) ||
      lower.includes(`eased by ${amel}`)
    ) {
      modalitiesAmel.push(`> ${amel}`);
    } else if (lower.includes(amel) && (lower.includes("better") || lower.includes("relief") || lower.includes("relieved"))) {
      if (!modalitiesAmel.includes(`> ${amel}`)) {
        modalitiesAmel.push(`> ${amel}`);
      }
    }
  }

  // Extract Concomitants
  for (const concom of CONCOMITANT_KEYWORDS) {
    if (lower.includes(concom)) {
      concomitants.push(concom);
    }
  }

  // Generate Suggested Repertory Rubrics based on recognized LSMC cluster
  const suggestedRubrics: LSMCEntities["suggestedRubrics"] = [];

  if (locations.includes("Mind") && sensations.includes("burning")) {
    suggestedRubrics.push({
      fullPath: "Mind; anxiety; health, about; with burning pains",
      chapter: "Mind",
      label: "Anxiety about health with burning",
      matchedKeywords: ["mind", "anxiety", "burning"],
      remedyCount: 28,
      recommendedClipboard: "Mental Generals"
    });
  }

  if (locations.includes("Stomach") && sensations.includes("burning")) {
    suggestedRubrics.push({
      fullPath: "Stomach; pain; burning; midnight, after; relieved by warm sips",
      chapter: "Stomach",
      label: "Stomach burning after midnight > warm drinks",
      matchedKeywords: ["stomach", "burning", "midnight", "warm drinks"],
      remedyCount: 34,
      recommendedClipboard: "Particulars & Organs"
    });
  }

  if (modalitiesAggr.some(m => m.includes("motion")) || sensations.includes("stitching")) {
    suggestedRubrics.push({
      fullPath: "Generalities; motion; from; aggravates; slightest",
      chapter: "Generalities",
      label: "Aggravated by slightest motion",
      matchedKeywords: ["motion", "aggravates", "stitching"],
      remedyCount: 52,
      recommendedClipboard: "Modalities"
    });
  }

  if (modalitiesAmel.some(m => m.includes("continued motion")) || sensations.includes("restless")) {
    suggestedRubrics.push({
      fullPath: "Generalities; motion; continued; ameliorates; stiffness, during",
      chapter: "Generalities",
      label: "Continued motion ameliorates stiffness and pain",
      matchedKeywords: ["continued motion", "restless", "stiffness"],
      remedyCount: 46,
      recommendedClipboard: "Modalities"
    });
  }

  if (locations.includes("Head") && sensations.includes("throbbing")) {
    suggestedRubrics.push({
      fullPath: "Head; pain; throbbing, pulsating carotid; heat and sun, from",
      chapter: "Head",
      label: "Throbbing carotid pain from sun or heat",
      matchedKeywords: ["head", "throbbing", "carotid"],
      remedyCount: 44,
      recommendedClipboard: "Particulars & Organs"
    });
  }

  if (concomitants.some(c => c.includes("thirst for small sips")) || lower.includes("small sips")) {
    suggestedRubrics.push({
      fullPath: "Stomach; thirst; small quantities; often, for",
      chapter: "Stomach",
      label: "Thirst for small sips frequently",
      matchedKeywords: ["thirst", "small sips"],
      remedyCount: 38,
      recommendedClipboard: "Physical Generals"
    });
  }

  if (lower.includes("droop") || lower.includes("eyelid") || lower.includes("stage fright") || lower.includes("trembl")) {
    suggestedRubrics.push({
      fullPath: "Mind; anticipation; ailments from; stage fright with motor trembling",
      chapter: "Mind",
      label: "Ailments from anticipation with trembling and heavy eyelids",
      matchedKeywords: ["anticipation", "trembling", "stage fright"],
      remedyCount: 41,
      recommendedClipboard: "Mental Generals"
    });
  }

  return {
    locations,
    sensations,
    modalitiesAggr,
    modalitiesAmel,
    concomitants,
    suggestedRubrics
  };
}

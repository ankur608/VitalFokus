/**
 * VitalFokus Next-Gen Search Engine Core
 * Advanced clinical query lexer, normalizer, and parser for Homeopathic Repertory & Materia Medica.
 * Supports:
 * - US <-> UK Homeopathic Orthography Normalization
 * - Modality Operator Recognition (<, >, agg., amel., time keynotes)
 * - Reverse Remedy Filtering (@remedy, @remedy:grade, remedy:abbr, remedy:abbr:grade)
 * - Clinical Synonym and Modern Medical Lexicon Expansion
 * - Cross-Reference Keyword Intersections
 */

export interface RemedyFilter {
  token: string;          // e.g. "ars", "lyc", "sulph", "nat-m", "kali-p"
  cleanName: string;      // Normalized remedy token for prefix or exact match
  minGrade: number;       // Default is 2 (Grade >= 2)
}

export interface ModalityFilter {
  aggravations: string[]; // From "< cold", "agg motion", "worse walking"
  ameliorations: string[]; // From "> heat", "amel rest", "better warmth"
  timeKeynotes: string[]; // From "3 am", "midnight", "morning", "night"
}

export interface ParsedSearchQuery {
  rawQuery: string;
  cleanTextQuery: string;
  tokens: string[];
  expandedTerms: string[][]; // Array of OR-groups, e.g. [["diarrhea", "diarrhoea"]]
  remedyFilter: RemedyFilter | null;
  modalities: ModalityFilter;
  clinicalSynonymCandidates: Array<{
    term: string;
    targetRubric: string;
    category: string;
  }>;
}

// 1. Bi-directional US <-> UK and Classical Homeopathic Orthography Mapping
export const ORTHOGRAPHY_MAP: Record<string, string[]> = {
  diarrhea: ["diarrhea", "diarrhoea"],
  diarrhoea: ["diarrhea", "diarrhoea"],
  hemorrhage: ["hemorrhage", "haemorrhage"],
  haemorrhage: ["hemorrhage", "haemorrhage"],
  hemorrhoids: ["hemorrhoids", "haemorrhoids", "piles"],
  haemorrhoids: ["hemorrhoids", "haemorrhoids", "piles"],
  piles: ["piles", "hemorrhoids", "haemorrhoids"],
  edema: ["edema", "oedema", "dropsy"],
  oedema: ["edema", "oedema", "dropsy"],
  dropsy: ["edema", "oedema", "dropsy"],
  fetid: ["fetid", "foetid"],
  foetid: ["fetid", "foetid"],
  leucorrhea: ["leucorrhea", "leucorrhoea", "whites"],
  leucorrhoea: ["leucorrhea", "leucorrhoea", "whites"],
  whites: ["whites", "leucorrhea", "leucorrhoea"],
  dysmenorrhea: ["dysmenorrhea", "dysmenorrhoea"],
  dysmenorrhoea: ["dysmenorrhea", "dysmenorrhoea"],
  amenorrhea: ["amenorrhea", "amenorrhoea"],
  amenorrhoea: ["amenorrhea", "amenorrhoea"],
  gonorrhea: ["gonorrhea", "gonorrhoea"],
  gonorrhoea: ["gonorrhea", "gonorrhoea"],
  anemia: ["anemia", "anaemia"],
  anaemia: ["anemia", "anaemia"],
  color: ["color", "colour"],
  colour: ["color", "colour"],
  gray: ["gray", "grey"],
  grey: ["gray", "grey"],
  chilly: ["chilly", "chilliness", "chill"],
  chilliness: ["chilly", "chilliness", "chill"],
  chill: ["chilly", "chilliness", "chill"],
  labor: ["labor", "labour", "parturition"],
  labour: ["labor", "labour", "parturition"],
  parturition: ["labor", "labour", "parturition"],
  flavor: ["flavor", "flavour"],
  flavour: ["flavor", "flavour"],
  tumor: ["tumor", "tumour"],
  tumour: ["tumor", "tumour"],
  esophagus: ["esophagus", "oesophagus"],
  oesophagus: ["esophagus", "oesophagus"],
  paralysis: ["paralysis", "paralysed", "paralyzed", "paralytic"],
  paralyzed: ["paralysis", "paralysed", "paralyzed", "paralytic"],
  paralysed: ["paralysis", "paralysed", "paralyzed", "paralytic"],
  paralytic: ["paralysis", "paralysed", "paralyzed", "paralytic"],
  coryza: ["coryza", "catarrh"],
  catarrh: ["coryza", "catarrh"],
  suppuration: ["suppuration", "festering", "abscess", "pus"],
  abscess: ["suppuration", "festering", "abscess", "pus"],
  ulcer: ["ulcer", "ulceration"],
  ulceration: ["ulcer", "ulceration"],
  dyspnea: ["dyspnea", "dyspnoea", "breathlessness", "difficult"],
  dyspnoea: ["dyspnea", "dyspnoea", "breathlessness", "difficult"],
  vertigo: ["vertigo", "dizziness", "giddiness"],
  dizziness: ["vertigo", "dizziness", "giddiness"],
  giddiness: ["vertigo", "dizziness", "giddiness"]
};

// 2. High-Yield Modern Medical Terminology -> Classical Kentian Rubric Paths
export const CLINICAL_SYNONYMS: Record<string, { targetRubric: string; category: string }> = {
  headache: { targetRubric: "Head; pain", category: "Neurological" },
  migraine: { targetRubric: "Head; pain; throbbing, pulsating", category: "Neurological" },
  cephalalgia: { targetRubric: "Head; pain", category: "Neurological" },
  breathlessness: { targetRubric: "Respiration; difficult", category: "Respiratory" },
  dyspnea: { targetRubric: "Respiration; difficult", category: "Respiratory" },
  dyspnoea: { targetRubric: "Respiration; difficult", category: "Respiratory" },
  asthma: { targetRubric: "Respiration; asthmatic", category: "Respiratory" },
  hypertension: { targetRubric: "Heart; hypertension", category: "Cardiovascular" },
  insomnia: { targetRubric: "Sleep; sleeplessness", category: "Sleep & Circadian" },
  sleeplessness: { targetRubric: "Sleep; sleeplessness", category: "Sleep & Circadian" },
  fever: { targetRubric: "Fever; heat", category: "Generalities" },
  pyrexia: { targetRubric: "Fever; heat", category: "Generalities" },
  vomiting: { targetRubric: "Stomach; vomiting", category: "Gastrointestinal" },
  nausea: { targetRubric: "Stomach; nausea", category: "Gastrointestinal" },
  "morning sickness": { targetRubric: "Stomach; nausea; pregnancy, during", category: "Gastrointestinal" },
  itching: { targetRubric: "Skin; itching", category: "Dermatological" },
  pruritus: { targetRubric: "Skin; itching", category: "Dermatological" },
  eczema: { targetRubric: "Skin; eruptions, eczema", category: "Dermatological" },
  vertigo: { targetRubric: "Vertigo; dizziness", category: "Neurological" },
  dizziness: { targetRubric: "Vertigo; dizziness", category: "Neurological" },
  gastralgia: { targetRubric: "Stomach; pain", category: "Gastrointestinal" },
  anxiety: { targetRubric: "Mind; anxiety", category: "Psychiatric & Mind" },
  "panic attack": { targetRubric: "Mind; fear, panic", category: "Psychiatric & Mind" },
  cough: { targetRubric: "Cough; dry / loose", category: "Respiratory" },
  bronchitis: { targetRubric: "Chest; inflammation, bronchial tubes", category: "Respiratory" },
  constipation: { targetRubric: "Rectum; constipation", category: "Gastrointestinal" },
  palpitation: { targetRubric: "Chest; palpitation heart", category: "Cardiovascular" },
  tachycardia: { targetRubric: "Chest; palpitation heart, rapid", category: "Cardiovascular" }
};

// 3. Clinical Token Semantic Expansion into Classical Vocabulary
export const CLINICAL_TOKEN_EXPANSIONS: Record<string, string[]> = {
  headache: ["headache", "pain"],
  migraine: ["migraine", "pulsating", "throbbing"],
  breathlessness: ["breathlessness", "difficult", "dyspnoea", "dyspnea", "asthmatic"],
  insomnia: ["insomnia", "sleeplessness", "sleepless"],
  fever: ["fever", "heat"],
  vomiting: ["vomiting", "nausea"],
  dizziness: ["dizziness", "vertigo", "giddiness"],
  itching: ["itching", "pruritus"],
  anxiety: ["anxiety", "fear"],
  cold: ["cold", "chilly", "chill"]
};

// 4. Time Modalities Pattern
const TIME_KEYNOTE_REGEX = /\b(\d{1,2}\s*(?:am|pm)|midnight|forenoon|afternoon|evening|night|morning|dawn|twilight)\b/gi;

/**
 * Main query parser function.
 */
export function parseClinicalQuery(rawQuery: string): ParsedSearchQuery {
  if (!rawQuery || !rawQuery.trim()) {
    return {
      rawQuery: "",
      cleanTextQuery: "",
      tokens: [],
      expandedTerms: [],
      remedyFilter: null,
      modalities: { aggravations: [], ameliorations: [], timeKeynotes: [] },
      clinicalSynonymCandidates: []
    };
  }

  let working = rawQuery.trim();
  let remedyFilter: RemedyFilter | null = null;
  const aggravations: string[] = [];
  const ameliorations: string[] = [];
  const timeKeynotes: string[] = [];

  // A. Extract Reverse Remedy Token: e.g. @ars, @ars:3, remedy:lyc, remedy:kali-p:3, @nat-m
  const remedyRegex = /(?:@|remedy:)([a-zA-Z0-9_-]+)(?::([1-4]))?/i;
  const remedyMatch = working.match(remedyRegex);
  if (remedyMatch) {
    const rawToken = remedyMatch[1].toLowerCase().replace(/\.$/, "");
    const minGrade = remedyMatch[2] ? parseInt(remedyMatch[2], 10) : 2; // Default to Grade >= 2
    remedyFilter = {
      token: rawToken,
      cleanName: rawToken,
      minGrade
    };
    // Remove remedy token from working string
    working = working.replace(remedyMatch[0], " ").trim();
  }

  // B. Extract Time Keynotes
  let timeMatch;
  while ((timeMatch = TIME_KEYNOTE_REGEX.exec(working)) !== null) {
    timeKeynotes.push(timeMatch[1].toLowerCase());
  }

  // C. Extract Modality Operators:
  // Aggravation: "< cold", "< motion", "agg. cold", "worse cold"
  const aggRegex = /(?:<|agg\.?|worse\s+)\s*([a-zA-Z]+)/gi;
  let m;
  while ((m = aggRegex.exec(working)) !== null) {
    aggravations.push(m[1].toLowerCase());
  }
  working = working.replace(/(?:<|agg\.?|worse\s+)\s*([a-zA-Z]+)/gi, " $1 ");

  // Amelioration: "> heat", "> rest", "amel. motion", "better warmth"
  const amelRegex = /(?:>|amel\.?|better\s+)\s*([a-zA-Z]+)/gi;
  while ((m = amelRegex.exec(working)) !== null) {
    ameliorations.push(m[1].toLowerCase());
  }
  working = working.replace(/(?:>|amel\.?|better\s+)\s*([a-zA-Z]+)/gi, " $1 ");

  // D. Tokenize remaining words
  const cleanTokens = working
    .toLowerCase()
    .replace(/[^\w\s;-]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // E. Orthography and semantic expansion for each clean token
  const expandedTerms: string[][] = cleanTokens.map((token) => {
    const variants = new Set<string>([token]);
    if (ORTHOGRAPHY_MAP[token]) {
      ORTHOGRAPHY_MAP[token].forEach((v) => variants.add(v));
    }
    if (CLINICAL_TOKEN_EXPANSIONS[token]) {
      CLINICAL_TOKEN_EXPANSIONS[token].forEach((v) => variants.add(v));
    }
    return Array.from(variants);
  });

  // F. Identify Modern Clinical Synonyms
  const clinicalSynonymCandidates: Array<{
    term: string;
    targetRubric: string;
    category: string;
  }> = [];

  const lowerRaw = rawQuery.toLowerCase();
  for (const [key, mapping] of Object.entries(CLINICAL_SYNONYMS)) {
    if (lowerRaw.includes(key)) {
      clinicalSynonymCandidates.push({
        term: key,
        targetRubric: mapping.targetRubric,
        category: mapping.category
      });
    }
  }

  return {
    rawQuery,
    cleanTextQuery: cleanTokens.join(" "),
    tokens: cleanTokens,
    expandedTerms,
    remedyFilter,
    modalities: {
      aggravations: Array.from(new Set(aggravations)),
      ameliorations: Array.from(new Set(ameliorations)),
      timeKeynotes: Array.from(new Set(timeKeynotes))
    },
    clinicalSynonymCandidates
  };
}

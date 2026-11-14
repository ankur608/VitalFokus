/**
 * Multi-Language Classical Repertory & Materia Medica Translation Engine
 * Supports real-time translation between:
 * - English (en)
 * - German (de) - Original Hahnemannian classical terminology
 * - French (fr) - Kent & Charette French classical terminology
 * - Spanish (es) - Paschero & Vijnovsky classical terminology
 * - Hindi (hi) - Classical vernacular terminology
 */

export type LanguageCode = "en" | "de" | "fr" | "es" | "hi";

export interface SupportedLanguage {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  historicalContext: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
    historicalContext: "Standard Kentian Repertory & British Homeopathic Library"
  },
  {
    code: "de",
    label: "German",
    nativeLabel: "Deutsch",
    flag: "🇩🇪",
    historicalContext: "Original Hahnemannian & Boenninghausen Provenance (Organon 6. Auflage)"
  },
  {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
    flag: "🇫🇷",
    historicalContext: "Tradition classique de Kent, Gallavardin et Charette"
  },
  {
    code: "es",
    label: "Spanish",
    nativeLabel: "Español",
    flag: "🇪🇸",
    historicalContext: "Escuela clásica de Paschero, Vijnovsky y Ortega"
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
    flag: "🇮🇳",
    historicalContext: "शास्त्रीय होम्योपैथिक नैदानिक शब्दावली (Classical Clinical Vernacular)"
  }
];

// Repertory Chapters Lexicon across 5 Languages
const CHAPTER_LEXICON: Record<string, Record<LanguageCode, string>> = {
  Mind: {
    en: "Mind",
    de: "Gemüt (Mind)",
    fr: "Esprit / Mental",
    es: "Mente / Psiquismo",
    hi: "मन / मानसिक लक्षण (Mind)"
  },
  Head: {
    en: "Head",
    de: "Kopf",
    fr: "Tête",
    es: "Cabeza",
    hi: "सिर (Head)"
  },
  Eye: {
    en: "Eye",
    de: "Auge",
    fr: "Yeux",
    es: "Ojos",
    hi: "आँखें (Eye)"
  },
  Ear: {
    en: "Ear",
    de: "Ohr",
    fr: "Oreilles",
    es: "Oídos",
    hi: "कान (Ear)"
  },
  Nose: {
    en: "Nose",
    de: "Nase",
    fr: "Nez",
    es: "Nariz",
    hi: "नाक (Nose)"
  },
  Face: {
    en: "Face",
    de: "Gesicht",
    fr: "Visage",
    es: "Cara / Rostro",
    hi: "चेहरा (Face)"
  },
  Mouth: {
    en: "Mouth",
    de: "Mund",
    fr: "Bouche",
    es: "Boca",
    hi: "मुख / मुँह (Mouth)"
  },
  Throat: {
    en: "Throat",
    de: "Hals",
    fr: "Gorge",
    es: "Garganta",
    hi: "गला (Throat)"
  },
  Stomach: {
    en: "Stomach",
    de: "Magen",
    fr: "Estomac",
    es: "Estómago",
    hi: "पेट / आमाशय (Stomach)"
  },
  Abdomen: {
    en: "Abdomen",
    de: "Bauch / Abdomen",
    fr: "Abdomen / Ventre",
    es: "Abdomen / Vientre",
    hi: "उदर / पेट का निचला भाग (Abdomen)"
  },
  Rectum: {
    en: "Rectum",
    de: "Mastdarm (Rectum)",
    fr: "Rectum",
    es: "Recto",
    hi: "मलाशय (Rectum)"
  },
  Stool: {
    en: "Stool",
    de: "Stuhl",
    fr: "Selles",
    es: "Heces / Deposición",
    hi: "मल (Stool)"
  },
  Chest: {
    en: "Chest",
    de: "Brust",
    fr: "Poitrine",
    es: "Pecho / Tórax",
    hi: "छाती / वक्ष (Chest)"
  },
  Respiration: {
    en: "Respiration",
    de: "Atmung",
    fr: "Respiration",
    es: "Respiración",
    hi: "श्वास / सांस (Respiration)"
  },
  Cough: {
    en: "Cough",
    de: "Husten",
    fr: "Toux",
    es: "Tos",
    hi: "खांसी (Cough)"
  },
  Extremities: {
    en: "Extremities",
    de: "Glieder / Extremitäten",
    fr: "Membres / Extrémités",
    es: "Extremidades / Miembros",
    hi: "हाथ-पैर / अंग (Extremities)"
  },
  Sleep: {
    en: "Sleep",
    de: "Schlaf",
    fr: "Sommeil",
    es: "Sueño",
    hi: "नींद / शयन (Sleep)"
  },
  Fever: {
    en: "Fever",
    de: "Fieber",
    fr: "Fièvre",
    es: "Fiebre",
    hi: "बुखार / ज्वर (Fever)"
  },
  Skin: {
    en: "Skin",
    de: "Haut",
    fr: "Peau",
    es: "Piel",
    hi: "त्वचा / चमड़ी (Skin)"
  },
  Generalities: {
    en: "Generalities",
    de: "Allgemeines (Generals)",
    fr: "Généralités",
    es: "Generalidades",
    hi: "सामान्य लक्षण (Generalities)"
  }
};

// Modalities & Thermals Lexicon
const TERM_LEXICON: Record<string, Record<LanguageCode, string>> = {
  Chilly: {
    en: "Chilly",
    de: "Frostig (Kälteempfindlich)",
    fr: "Frileux",
    es: "Friolento",
    hi: "शीतल / ठंडक-संवेदनशील"
  },
  Hot: {
    en: "Hot",
    de: "Warmblütig (Wärmeempfindlich)",
    fr: "Chaud (Sensible à la chaleur)",
    es: "Caluroso",
    hi: "गर्म प्रकृति / उष्ण"
  },
  Ambithermal: {
    en: "Ambithermal",
    de: "Ambithermal",
    fr: "Ambithermique",
    es: "Ambitérmico",
    hi: "सम-शीतोष्ण (Ambithermal)"
  },
  Aggravation: {
    en: "< Aggravation",
    de: "< Verschlimmerung (Verschl.)",
    fr: "< Aggravation",
    es: "< Agravación",
    hi: "< वृद्धि / रोग का बढ़ना"
  },
  Amelioration: {
    en: "> Amelioration",
    de: "> Besserung (Bess.)",
    fr: "> Amélioration",
    es: "> Mejoría",
    hi: "> कमी / राहत"
  },
  Psora: {
    en: "Psora",
    de: "Psora (Hahnemannsche Grundurübel)",
    fr: "Psore",
    es: "Psora",
    hi: "सोरा (Psora)"
  },
  Sycosis: {
    en: "Sycosis",
    de: "Sykose",
    fr: "Sycose",
    es: "Sicosis",
    hi: "साइकोसिस (Sycosis)"
  },
  Syphilis: {
    en: "Syphilis",
    de: "Syphilis / Luetismus",
    fr: "Syphilis / Lutéisme",
    es: "Sífilis",
    hi: "सिफलिस (Syphilis)"
  },
  Tubercular: {
    en: "Tubercular",
    de: "Tuberkulinie",
    fr: "Tuberculinisme",
    es: "Tubercular",
    hi: "ट्यूबरक्युलर (Tubercular)"
  }
};

// Common Rubric Modifiers & Keywords
const COMMON_RUBRIC_KEYWORDS: Record<string, Record<LanguageCode, string>> = {
  anxiety: { en: "anxiety", de: "Angst", fr: "anxiété", es: "ansiedad", hi: "चिंता" },
  restlessness: { en: "restlessness", de: "Unruhe", fr: "agitation", es: "inquietud", hi: "बेचैनी" },
  burning: { en: "burning", de: "brennend", fr: "brûlant", es: "ardiente", hi: "जलन" },
  throbbing: { en: "throbbing", de: "klopfend / pulsierend", fr: "pulsatif", es: "pulsátil", hi: "धड़कन / टीस" },
  cold: { en: "cold", de: "Kälte", fr: "froid", es: "frío", hi: "ठंड" },
  warmth: { en: "warmth", de: "Wärme", fr: "chaleur", es: "calor", hi: "गर्मी / उष्णता" },
  motion: { en: "motion", de: "Bewegung", fr: "mouvement", es: "movimiento", hi: "गति / चलना" },
  rest: { en: "rest", de: "Ruhe", fr: "repos", es: "reposo", hi: "आराम / स्थिरता" },
  midnight: { en: "midnight", de: "Mitternacht", fr: "minuit", es: "medianoche", hi: "मध्यरात्रि" },
  morning: { en: "morning", de: "Morgen", fr: "matin", es: "mañana", hi: "प्रातःकाल / सुबह" }
};

export function translateChapter(chapter: string, lang: LanguageCode): string {
  if (lang === "en" || !CHAPTER_LEXICON[chapter]) return chapter;
  return CHAPTER_LEXICON[chapter][lang] || chapter;
}

export function translateThermal(thermal: string, lang: LanguageCode): string {
  if (lang === "en" || !TERM_LEXICON[thermal]) return thermal;
  return TERM_LEXICON[thermal][lang] || thermal;
}

export function translateMiasm(miasm: string, lang: LanguageCode): string {
  if (lang === "en" || !TERM_LEXICON[miasm]) return miasm;
  return TERM_LEXICON[miasm][lang] || miasm;
}

export function translateModality(type: "aggr" | "amel", lang: LanguageCode): string {
  const key = type === "aggr" ? "Aggravation" : "Amelioration";
  return TERM_LEXICON[key]?.[lang] || (type === "aggr" ? "< Aggravation" : "> Amelioration");
}

export function translateRubricPath(fullPath: string, lang: LanguageCode): string {
  if (lang === "en") return fullPath;

  const parts = fullPath.split(";").map((p) => p.trim());
  if (parts.length === 0) return fullPath;

  // Translate Chapter (First segment)
  const translatedChapter = translateChapter(parts[0], lang);

  // Translate subsequent keywords if matches exist
  const translatedParts = parts.slice(1).map((part) => {
    let translated = part;
    for (const [kw, map] of Object.entries(COMMON_RUBRIC_KEYWORDS)) {
      if (part.toLowerCase().includes(kw)) {
        const replacement = map[lang];
        if (replacement) {
          translated = translated.replace(new RegExp(kw, "gi"), replacement);
        }
      }
    }
    return translated;
  });

  return [translatedChapter, ...translatedParts].join("; ");
}

export function getUITranslations(lang: LanguageCode): Record<string, string> {
  const translations: Record<LanguageCode, Record<string, string>> = {
    en: {
      searchPlaceholder: "Search classical Materia Medica or Allen's keynotes...",
      allAuthors: "All Authors",
      repertoryExplorer: "Repertory Explorer",
      repertorisationGrid: "Repertorisation Grid",
      materiaMedica: "Materia Medica Library",
      patientEHR: "Patient EHR & Practice",
      cloudBackup: "Cloud Backup & HIPAA",
      similimumPrediction: "Similimum Prediction",
      levelsOfHealth: "Levels of Health"
    },
    de: {
      searchPlaceholder: "Klassische Materia Medica oder Allens Leitsymptome durchsuchen...",
      allAuthors: "Alle Autoren",
      repertoryExplorer: "Repertorium Explorer",
      repertorisationGrid: "Repertorisations-Matrix",
      materiaMedica: "Materia Medica Bibliothek",
      patientEHR: "Patientenakte & Praxis",
      cloudBackup: "Datensicherung & DSGVO",
      similimumPrediction: "Simile-Vorhersage",
      levelsOfHealth: "Gesundheitsebenen (VES)"
    },
    fr: {
      searchPlaceholder: "Rechercher dans la Matière Médicale ou les symptômes clés d'Allen...",
      allAuthors: "Tous les Auteurs",
      repertoryExplorer: "Explorateur de Répertoire",
      repertorisationGrid: "Grille de Répertorisation",
      materiaMedica: "Bibliothèque de Matière Médicale",
      patientEHR: "Dossier Médical & Pratique",
      cloudBackup: "Sauvegarde & RGPD",
      similimumPrediction: "Prédiction du Similimum",
      levelsOfHealth: "Niveaux de Santé (VES)"
    },
    es: {
      searchPlaceholder: "Buscar en Materia Médica clásica o síntomas clave de Allen...",
      allAuthors: "Todos los Autores",
      repertoryExplorer: "Explorador de Repertorio",
      repertorisationGrid: "Matriz de Repertorización",
      materiaMedica: "Biblioteca de Materia Médica",
      patientEHR: "Historia Clínica y Práctica",
      cloudBackup: "Respaldo y Cumplimiento",
      similimumPrediction: "Predicción del Similimum",
      levelsOfHealth: "Niveles de Salud (VES)"
    },
    hi: {
      searchPlaceholder: "शास्त्रीय मटेरिया मेडिका या एलन के कीनोट्स खोजें...",
      allAuthors: "सभी लेखक",
      repertoryExplorer: "रेपर्टरी अन्वेषक (Repertory)",
      repertorisationGrid: "रेपर्टराइजेशन ग्रिड (Matrix)",
      materiaMedica: "मटेरिया मेडिका पुस्तकालय",
      patientEHR: "रोगी ईएचआर और क्लिनिक",
      cloudBackup: "क्लाउड बैकअप व डेटा सुरक्षा",
      similimumPrediction: "सिमिलिमम पूर्वसूचना",
      levelsOfHealth: "स्वास्थ्य के स्तर (VES)"
    }
  };

  return translations[lang] || translations.en;
}

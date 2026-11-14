/**
 * Kingdom & Taxonomy Explorer Engine
 * Comprehensive classification according to:
 * - Jan Scholten (Element Theory: Series 1-7, Stages 1-18 for Minerals)
 * - Rajan Sankaran / Michal Yakir (Plant Families APG IV & Evolutionary Table)
 * - Animal Taxonomy (Ophidia, Arachnida, Mollusca, Mammalia, Insecta)
 * - Classical Nosodes
 */

export type KingdomType = "Mineral" | "Plant" | "Animal" | "Nosode" | "Sarcode";

export interface TaxonomyEntry {
  remedyNumber: number;
  name: string;
  abbr: string;
  kingdom: KingdomType;
  subGroup: string; // e.g. "Solanaceae", "Ferrum Series", "Ophidia", "Psoric Nosode"
  series?: number; // 1 to 7 for minerals
  stage?: number; // 1 to 18 for minerals
  coreTheme: string;
  keySensations: string[];
}

export const TAXONOMY_DATABASE: TaxonomyEntry[] = [
  // --- MINERAL KINGDOM (Scholten Element Theory) ---
  {
    remedyNumber: 1,
    name: "Arsenicum album",
    abbr: "ars.",
    kingdom: "Mineral",
    subGroup: "Ferrum Series (Stage 15)",
    series: 4,
    stage: 15,
    coreTheme: "Loss of control in security, health, and work; fastidious panic; terror of death and financial ruin.",
    keySensations: ["Burning relieved by heat", "Midnight restlessness (1-2 AM)", "Thirst for sips of warm water"]
  },
  {
    remedyNumber: 9,
    name: "Natrum muriaticum",
    abbr: "nat-m.",
    kingdom: "Mineral",
    subGroup: "Silica Series (Stage 1 & 17)",
    series: 3,
    stage: 1,
    coreTheme: "Vulnerability in one-to-one relationships; silent grief; fear of being hurt; closed heart.",
    keySensations: ["Aggravated by consolation", "Craves salt", "Throbbing frontal headache < sun"]
  },
  {
    remedyNumber: 13,
    name: "Calcarea carbonica",
    abbr: "calc.",
    kingdom: "Mineral",
    subGroup: "Ferrum Series (Stage 2)",
    series: 4,
    stage: 2,
    coreTheme: "Need for protection and stability; fear of insanity or people observing their weakness.",
    keySensations: ["Chilly, cold sour perspiration on head", "Sluggish metabolism", "Craves eggs"]
  },
  {
    remedyNumber: 14,
    name: "Phosphorus",
    abbr: "phos.",
    kingdom: "Mineral",
    subGroup: "Silica Series (Stage 15)",
    series: 3,
    stage: 15,
    coreTheme: "Open boundary, diffusion, thirst for connection, impressionability, fear of dark and thunderstorms.",
    keySensations: ["Craves ice-cold drinks (vomited when warm)", "Hemorrhagic diathesis", "Burning palms and spine"]
  },
  {
    remedyNumber: 15,
    name: "Sulphur",
    abbr: "sulph.",
    kingdom: "Mineral",
    subGroup: "Silica Series (Stage 16)",
    series: 3,
    stage: 16,
    coreTheme: "Ego, self-worth, intellectual philosophizing, feeling unappreciated or superior; slovenly.",
    keySensations: ["Burning soles of feet at night", "Aggravated by standing and bathing", "Empty 11 AM hunger"]
  },
  {
    remedyNumber: 27,
    name: "Silicea",
    abbr: "sil.",
    kingdom: "Mineral",
    subGroup: "Silica Series (Stage 10)",
    series: 3,
    stage: 10,
    coreTheme: "Fixed image, yielding disposition yet obstinate spine, dread of failure, lack of grit.",
    keySensations: ["Offensive foot sweat", "Splinter sensations", "Extreme chilliness, needs warm wraps"]
  },
  {
    remedyNumber: 28,
    name: "Kali carbonicum",
    abbr: "kali-c.",
    kingdom: "Mineral",
    subGroup: "Ferrum Series (Stage 1)",
    series: 4,
    stage: 1,
    coreTheme: "Rigid duty, moral structure, routine, fear of losing control or being alone.",
    keySensations: ["Stitching pains", "Aggravation at 2-4 AM", "Bag-like swelling of upper eyelids"]
  },
  {
    remedyNumber: 37,
    name: "Aurum metallicum",
    abbr: "aur.",
    kingdom: "Mineral",
    subGroup: "Gold Series (Stage 11)",
    series: 6,
    stage: 11,
    coreTheme: "Absolute responsibility, leadership, fallen from grace, deep melancholic suicidal despair.",
    keySensations: ["Deep bone pains < night", "High blood pressure", "Relieved by classical music"]
  },
  {
    remedyNumber: 38,
    name: "Platina",
    abbr: "plat.",
    kingdom: "Mineral",
    subGroup: "Gold Series (Stage 10)",
    series: 6,
    stage: 10,
    coreTheme: "Superiority, haughtiness, contempt for others, feeling elevated above mortal plane.",
    keySensations: ["Numbness with cramping pains", "Hyperesthesia of female genitalia", "Optical illusion of smallness"]
  },
  {
    remedyNumber: 39,
    name: "Mercurius solubilis",
    abbr: "merc.",
    kingdom: "Mineral",
    subGroup: "Gold Series (Stage 12)",
    series: 6,
    stage: 12,
    coreTheme: "Instability, paranoia, suspicion, inner tremor, chemical civil war; ambithermal.",
    keySensations: ["Offensive breath and salivation", "Aggravated by both heat and cold", "Night sweat without relief"]
  },
  {
    remedyNumber: 42,
    name: "Cuprum metallicum",
    abbr: "cupr.",
    kingdom: "Mineral",
    subGroup: "Ferrum Series (Stage 11)",
    series: 4,
    stage: 11,
    coreTheme: "Clenched control, maintaining order against sudden invasion; violent convulsions and cramps.",
    keySensations: ["Violent cramps in calves and soles", "Gurgling drink in esophagus", "Spasms starting in thumbs"]
  },
  {
    remedyNumber: 43,
    name: "Zincum metallicum",
    abbr: "zinc.",
    kingdom: "Mineral",
    subGroup: "Ferrum Series (Stage 12)",
    series: 4,
    stage: 12,
    coreTheme: "Restless overwork, brain exhaustion, suppression of nervous energy.",
    keySensations: ["Continuous fidgety restless feet", "Brain fog ameliorated by eruptions or menses"]
  },
  {
    remedyNumber: 44,
    name: "Plumbum metallicum",
    abbr: "plb.",
    kingdom: "Mineral",
    subGroup: "Gold Series (Stage 14)",
    series: 6,
    stage: 14,
    coreTheme: "Progressive sclerotic decay of power, slow paralysis, emotional isolation.",
    keySensations: ["Abdominal wall retracted towards spine", "Wrist drop", "Obstinate constipation"]
  },

  // --- PLANT KINGDOM (APG IV Families) ---
  {
    remedyNumber: 2,
    name: "Belladonna",
    abbr: "bell.",
    kingdom: "Plant",
    subGroup: "Solanaceae",
    coreTheme: "Sudden violent fury, intense congestion, scarlet redness, throbbing carotids, photophobia.",
    keySensations: ["Violent sudden onset", "Hot head with cold extremities", "Worse right side, jarring, light"]
  },
  {
    remedyNumber: 17,
    name: "Stramonium",
    abbr: "stram.",
    kingdom: "Plant",
    subGroup: "Solanaceae",
    coreTheme: "Terror of dark, violence, wild delirium, water dread, feeling of being in wilderness.",
    keySensations: ["Desires bright light and company", "Convulsive grimaces", "Stammering speech"]
  },
  {
    remedyNumber: 18,
    name: "Hyoscyamus niger",
    abbr: "hyos.",
    kingdom: "Plant",
    subGroup: "Solanaceae",
    coreTheme: "Suspicion, jealousy, erotic exhibitionism, fear of being poisoned.",
    keySensations: ["Picks at bedclothes", "Involuntary twitching", "Laughs at everything"]
  },
  {
    remedyNumber: 4,
    name: "Aconitum napellus",
    abbr: "acon.",
    kingdom: "Plant",
    subGroup: "Ranunculaceae",
    coreTheme: "Sudden panicky shock after dry cold wind; predicts hour of death; restlessness.",
    keySensations: ["Sudden fever with dry hot skin", "Tossing restlessness", "Intense unquenchable thirst"]
  },
  {
    remedyNumber: 8,
    name: "Pulsatilla pratensis",
    abbr: "puls.",
    kingdom: "Plant",
    subGroup: "Ranunculaceae",
    coreTheme: "Yielding, weeping disposition, desires open air and gentle consolation; thirstless.",
    keySensations: ["Wandering pains", "Aggravated in warm room", "Changeable symptoms"]
  },
  {
    remedyNumber: 30,
    name: "Staphysagria",
    abbr: "staph.",
    kingdom: "Plant",
    subGroup: "Ranunculaceae",
    coreTheme: "Suppressed anger, mortification, indignation, trembling from restrained rage.",
    keySensations: ["Burning in urethra when not urinating", "Styes on eyelids", "Clean cut incision pains"]
  },
  {
    remedyNumber: 3,
    name: "Bryonia alba",
    abbr: "bry.",
    kingdom: "Plant",
    subGroup: "Cucurbitaceae",
    coreTheme: "Business anxiety, irritability, desires quiet; extreme aggravation from slightest motion.",
    keySensations: ["Dry mucous membranes", "Ameliorated by lying on painful side", "Excessive thirst for large draughts"]
  },
  {
    remedyNumber: 7,
    name: "Rhus toxicodendron",
    abbr: "rhus-t.",
    kingdom: "Plant",
    subGroup: "Anacardiaceae",
    coreTheme: "Extreme physical restlessness; stiffness on beginning motion, relieved by continued motion.",
    keySensations: ["Triangular red tip of tongue", "Worse cold damp weather", "Restlessness in bed"]
  },
  {
    remedyNumber: 10,
    name: "Arnica montana",
    abbr: "arn.",
    kingdom: "Plant",
    subGroup: "Compositae / Asteraceae",
    coreTheme: "Trauma, bruising, says 'I am well, leave me alone', bed feels too hard.",
    keySensations: ["Sore, bruised feeling throughout body", "Head hot with cold body", "Ecchymosis"]
  },
  {
    remedyNumber: 20,
    name: "Chamomilla",
    abbr: "cham.",
    kingdom: "Plant",
    subGroup: "Compositae / Asteraceae",
    coreTheme: "Unendurable pain, angry snappish behavior, demands things and throws them away.",
    keySensations: ["One cheek red, other pale", "Hot sweaty head", "Ameliorated by being carried"]
  },
  {
    remedyNumber: 5,
    name: "Gelsemium sempervirens",
    abbr: "gels.",
    kingdom: "Plant",
    subGroup: "Loganiaceae",
    coreTheme: "Anticipatory dread, paralyzing stage fright, heavy droopy eyelids, motor weakness.",
    keySensations: ["Trembling with motor weakness", "Occipital headache relieved by urination", "Thirstless"]
  },
  {
    remedyNumber: 6,
    name: "Nux vomica",
    abbr: "nux-v.",
    kingdom: "Plant",
    subGroup: "Loganiaceae",
    coreTheme: "Type-A driver, impatient, hypersensitive to noise and odor, addicted to stimulants.",
    keySensations: ["Chilly, cannot uncover", "Constant ineffectual urging for stool", "Morning irritability"]
  },
  {
    remedyNumber: 11,
    name: "Ignatia amara",
    abbr: "ign.",
    kingdom: "Plant",
    subGroup: "Loganiaceae",
    coreTheme: "Acute silent grief, emotional hysteria, paradoxes, frequent deep sighing.",
    keySensations: ["Lump in throat (globus hystericus)", "Sighing", "Contradictory symptoms"]
  },

  // --- ANIMAL KINGDOM ---
  {
    remedyNumber: 12,
    name: "Lachesis muta",
    abbr: "lach.",
    kingdom: "Animal",
    subGroup: "Ophidia (Viperidae)",
    coreTheme: "Loquacity, intense suspicion, jealousy, dark hemorrhagic blood, intolerance of neck constriction.",
    keySensations: ["Aggravated after sleep", "Left to right progression", "Ameliorated by discharges"]
  },
  {
    remedyNumber: 45,
    name: "Crotalus horridus",
    abbr: "crot-h.",
    kingdom: "Animal",
    subGroup: "Ophidia (Crotalinae)",
    coreTheme: "Decomposition of blood, sepsis, purpura, malignant jaundice, hemorrhagic shock.",
    keySensations: ["Dark fluid non-coagulable hemorrhage", "Tongue swollen and protruding", "Right-sided"]
  },
  {
    remedyNumber: 16,
    name: "Sepia officinalis",
    abbr: "sep.",
    kingdom: "Animal",
    subGroup: "Mollusca (Cephalopoda)",
    coreTheme: "Indifference to loved ones, exhaustion, pelvic stasis, must cross legs to prevent prolapse.",
    keySensations: ["Bearing down pelvic sensation", "Ameliorated by vigorous exercise", "Yellow saddle over nose"]
  },
  {
    remedyNumber: 46,
    name: "Tarentula hispanica",
    abbr: "tarent.",
    kingdom: "Animal",
    subGroup: "Arachnida",
    coreTheme: "Destructive haste, rolling on floor, sudden rage, hysterical restlessness relieved by music.",
    keySensations: ["Choreic twitches", "Hyperactive movements", "Sensory hypersensitivity to music"]
  },
  {
    remedyNumber: 47,
    name: "Apis mellifica",
    abbr: "apis",
    kingdom: "Animal",
    subGroup: "Insecta (Hymenoptera)",
    coreTheme: "Jealousy, busy restless clumsiness, sudden acute stinging swelling, absolute thirstlessness.",
    keySensations: ["Stinging, burning, prickling pains", "Rosy red edema", "Aggravated by heat, ameliorated by cold"]
  },
  {
    remedyNumber: 48,
    name: "Cantharis vesicatoria",
    abbr: "canth.",
    kingdom: "Animal",
    subGroup: "Insecta (Coleoptera)",
    coreTheme: "Violent destructive inflammation, furious sexual mania, cutting burning tenesmus.",
    keySensations: ["Intolerable burning urging drop-by-drop", "Blisters with raw surfaces", "Hydrophobia"]
  },

  // --- NOSODES ---
  {
    remedyNumber: 49,
    name: "Psorinum",
    abbr: "psor.",
    kingdom: "Nosode",
    subGroup: "Psoric Miasm",
    coreTheme: "Extreme poverty consciousness, hopeless despair, offensive discharges, intense chilliness.",
    keySensations: ["Wears fur cap in summer", "Offensive perspiration and stool", "Ravenous hunger at night"]
  },
  {
    remedyNumber: 50,
    name: "Medorrhinum",
    abbr: "med.",
    kingdom: "Nosode",
    subGroup: "Sycotic Miasm",
    coreTheme: "Hurry, wild behavior at night, forgets names, guilt, history of gonorrheal suppression.",
    keySensations: ["Ameliorated at seashore", "Sleeps in knee-chest position", "Burning hands and feet"]
  },
  {
    remedyNumber: 51,
    name: "Syphilinum",
    abbr: "syph.",
    kingdom: "Nosode",
    subGroup: "Syphilitic Miasm",
    coreTheme: "Compulsive hand washing, despair of recovery, linear ulcerations, dread of night.",
    keySensations: ["Pains begin at sunset and end at sunrise", "Copious salivation", "Bone pains"]
  },
  {
    remedyNumber: 52,
    name: "Tuberculinum",
    abbr: "tub.",
    kingdom: "Nosode",
    subGroup: "Tubercular Miasm",
    coreTheme: "Cosmopolitan desire to travel and wander, dissatisfaction, destructive rage, chest colds.",
    keySensations: ["Catches cold from slightest draft", "Rapid emaciation despite ravenous appetite", "Desires cold milk"]
  },
  {
    remedyNumber: 53,
    name: "Carcinosinum",
    abbr: "carc.",
    kingdom: "Nosode",
    subGroup: "Carcinogenic Miasm",
    coreTheme: "Perfectionism, over-responsibility, fastidious guilt, love of storms and rhythm; history of prolonged suppression.",
    keySensations: ["Blue sclera", "Café-au-lait spots", "Ameliorated at the sea coast"]
  }
];

export interface PeriodicElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  series: number; // 1 to 7
  stage: number; // 1 to 18
  homeopathicName?: string;
  seriesTheme: string;
  stageTheme: string;
}

export const PERIODIC_ELEMENTS_SCHOLTEN: PeriodicElement[] = [
  // Series 1: Hydrogen
  { atomicNumber: 1, symbol: "H", name: "Hydrogen", series: 1, stage: 1, homeopathicName: "Hydrogenium", seriesTheme: "Being vs Non-being, Incarnation", stageTheme: "Initial impulsive beginning" },
  { atomicNumber: 2, symbol: "He", name: "Helium", series: 1, stage: 18, homeopathicName: "Helium", seriesTheme: "Being vs Non-being, Incarnation", stageTheme: "Complete, sealed off, rest" },

  // Series 2: Carbon
  { atomicNumber: 3, symbol: "Li", name: "Lithium", series: 2, stage: 1, homeopathicName: "Lithium carbonicum", seriesTheme: "Self, Ego, Body, Value", stageTheme: "Impulsive, weak self-worth" },
  { atomicNumber: 6, symbol: "C", name: "Carbon", series: 2, stage: 10, homeopathicName: "Carbo vegetabilis", seriesTheme: "Self, Ego, Body, Value", stageTheme: "Definite self, stability" },
  { atomicNumber: 8, symbol: "O", name: "Oxygen", series: 2, stage: 16, homeopathicName: "Oxygenium", seriesTheme: "Self, Ego, Body, Value", stageTheme: "Using up, decay, waste" },
  { atomicNumber: 9, symbol: "F", name: "Fluorine", series: 2, stage: 17, homeopathicName: "Fluoricum acidum", seriesTheme: "Self, Ego, Body, Value", stageTheme: "Outcast, breaking bonds" },

  // Series 3: Silica
  { atomicNumber: 11, symbol: "Na", name: "Sodium", series: 3, stage: 1, homeopathicName: "Natrum muriaticum", seriesTheme: "Family, Home, Relationships", stageTheme: "Beginning of relationship, vulnerable" },
  { atomicNumber: 12, symbol: "Mg", name: "Magnesium", series: 3, stage: 2, homeopathicName: "Magnesium carbonicum", seriesTheme: "Family, Home, Relationships", stageTheme: "Finding security, doubt" },
  { atomicNumber: 13, symbol: "Al", name: "Aluminium", series: 3, stage: 13, homeopathicName: "Alumina", seriesTheme: "Family, Home, Relationships", stageTheme: "Withdrawal, losing grip, confusion" },
  { atomicNumber: 14, symbol: "Si", name: "Silicon", series: 3, stage: 10, homeopathicName: "Silicea", seriesTheme: "Family, Home, Relationships", stageTheme: "Perfect image, firm spine" },
  { atomicNumber: 15, symbol: "P", name: "Phosphorus", series: 3, stage: 15, homeopathicName: "Phosphorus", seriesTheme: "Family, Home, Relationships", stageTheme: "Diffusing, loss, letting go" },
  { atomicNumber: 16, symbol: "S", name: "Sulfur", series: 3, stage: 16, homeopathicName: "Sulphur", seriesTheme: "Family, Home, Relationships", stageTheme: "Ego, pride, decay of honor" },
  { atomicNumber: 17, symbol: "Cl", name: "Chlorine", series: 3, stage: 17, homeopathicName: "Chlorum", seriesTheme: "Family, Home, Relationships", stageTheme: "Abandoned, alone, exiled" },

  // Series 4: Ferrum
  { atomicNumber: 19, symbol: "K", name: "Potassium", series: 4, stage: 1, homeopathicName: "Kali carbonicum", seriesTheme: "Work, Duty, Routine, Security", stageTheme: "Beginning duty, rigid structure" },
  { atomicNumber: 20, symbol: "Ca", name: "Calcium", series: 4, stage: 2, homeopathicName: "Calcarea carbonica", seriesTheme: "Work, Duty, Routine, Security", stageTheme: "Needing protection, passive stability" },
  { atomicNumber: 26, symbol: "Fe", name: "Iron", series: 4, stage: 8, homeopathicName: "Ferrum metallicum", seriesTheme: "Work, Duty, Routine, Security", stageTheme: "Pushing through, discipline, fight" },
  { atomicNumber: 29, symbol: "Cu", name: "Copper", series: 4, stage: 11, homeopathicName: "Cuprum metallicum", seriesTheme: "Work, Duty, Routine, Security", stageTheme: "Preserving control, cramp, guard" },
  { atomicNumber: 30, symbol: "Zn", name: "Zinc", series: 4, stage: 12, homeopathicName: "Zincum metallicum", seriesTheme: "Work, Duty, Routine, Security", stageTheme: "Overworking, defending, exhaustion" },
  { atomicNumber: 33, symbol: "As", name: "Arsenic", series: 4, stage: 15, homeopathicName: "Arsenicum album", seriesTheme: "Work, Duty, Routine, Security", stageTheme: "Loss of health/wealth, panic" },

  // Series 5: Silver
  { atomicNumber: 47, symbol: "Ag", name: "Silver", series: 5, stage: 11, homeopathicName: "Argentum nitricum", seriesTheme: "Creativity, Art, Performance, Intellect", stageTheme: "Performance anxiety, holding show" },
  { atomicNumber: 50, symbol: "Sn", name: "Tin", series: 5, stage: 14, homeopathicName: "Stannum metallicum", seriesTheme: "Creativity, Art, Performance, Intellect", stageTheme: "Formal empty shell, chest weakness" },
  { atomicNumber: 51, symbol: "Sb", name: "Antimony", series: 5, stage: 15, homeopathicName: "Antimonium crudum", seriesTheme: "Creativity, Art, Performance, Intellect", stageTheme: "Rejection of art, irritable" },
  { atomicNumber: 53, symbol: "I", name: "Iodine", series: 5, stage: 17, homeopathicName: "Iodum", seriesTheme: "Creativity, Art, Performance, Intellect", stageTheme: "Exile, hyperactive, starvation" },

  // Series 6: Gold
  { atomicNumber: 56, symbol: "Ba", name: "Barium", series: 6, stage: 2, homeopathicName: "Baryta carbonica", seriesTheme: "Leadership, Power, Royalty, Weight", stageTheme: "Inability to lead, childish timidity" },
  { atomicNumber: 78, symbol: "Pt", name: "Platinum", series: 6, stage: 10, homeopathicName: "Platina", seriesTheme: "Leadership, Power, Royalty, Weight", stageTheme: "Peak royalty, haughtiness" },
  { atomicNumber: 79, symbol: "Au", name: "Gold", series: 6, stage: 11, homeopathicName: "Aurum metallicum", seriesTheme: "Leadership, Power, Royalty, Weight", stageTheme: "High duty of king, suicidal drop" },
  { atomicNumber: 80, symbol: "Hg", name: "Mercury", series: 6, stage: 12, homeopathicName: "Mercurius solubilis", seriesTheme: "Leadership, Power, Royalty, Weight", stageTheme: "Tyranny, instability, betrayal" },
  { atomicNumber: 82, symbol: "Pb", name: "Lead", series: 6, stage: 14, homeopathicName: "Plumbum metallicum", seriesTheme: "Leadership, Power, Royalty, Weight", stageTheme: "Sclerosis, loss of kingdom" }
];

export function getTaxonomyByRemedyName(name: string): TaxonomyEntry | undefined {
  const lower = name.toLowerCase();
  return TAXONOMY_DATABASE.find(t => t.name.toLowerCase().includes(lower) || lower.includes(t.name.toLowerCase()));
}

export function filterTaxonomyByKingdom(kingdom: KingdomType | "All"): TaxonomyEntry[] {
  if (kingdom === "All") return TAXONOMY_DATABASE;
  return TAXONOMY_DATABASE.filter(t => t.kingdom === kingdom);
}

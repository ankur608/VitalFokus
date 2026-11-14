export interface RubricSeed {
  chapter: string;
  fullPath: string;
  label: string;
  crossReferences?: string;
  remedies: {
    abbr: string;
    grade: number; // 1 = plain, 2 = italic, 3 = bold, 4 = bold caps
  }[];
}

export const rubricsData: RubricSeed[] = [
  // ==================== MIND ====================
  {
    chapter: "Mind",
    fullPath: "Mind; anxiety; general",
    label: "anxiety; general",
    crossReferences: "See also: Mind - Fear",
    remedies: [
      { abbr: "acon.", grade: 4 }, { abbr: "ars.", grade: 4 }, { abbr: "phos.", grade: 3 },
      { abbr: "rhus-t.", grade: 3 }, { abbr: "calc.", grade: 3 }, { abbr: "puls.", grade: 2 },
      { abbr: "bell.", grade: 2 }, { abbr: "nux-v.", grade: 2 }, { abbr: "ign.", grade: 2 },
      { abbr: "lyc.", grade: 2 }, { abbr: "sil.", grade: 1 }, { abbr: "sulph.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; anxiety; health, about",
    label: "anxiety; health, about",
    crossReferences: "See also: Mind - Fear - disease of",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "calc.", grade: 4 }, { abbr: "phos.", grade: 3 },
      { abbr: "kali-c.", grade: 3 }, { abbr: "nit-ac.", grade: 3 }, { abbr: "nux-v.", grade: 2 },
      { abbr: "puls.", grade: 2 }, { abbr: "sep.", grade: 1 }, { abbr: "sulph.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; anxiety; anticipation, from",
    label: "anxiety; anticipation, from",
    crossReferences: "See also: Mind - Fear - stage fright",
    remedies: [
      { abbr: "gels.", grade: 4 }, { abbr: "lyc.", grade: 4 }, { abbr: "sil.", grade: 3 },
      { abbr: "ars.", grade: 2 }, { abbr: "med.", grade: 2 }, { abbr: "phos.", grade: 2 },
      { abbr: "ign.", grade: 1 }, { abbr: "thuj.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; restlessness; nervousness",
    label: "restlessness; nervousness",
    remedies: [
      { abbr: "acon.", grade: 4 }, { abbr: "ars.", grade: 4 }, { abbr: "rhus-t.", grade: 4 },
      { abbr: "bell.", grade: 3 }, { abbr: "cham.", grade: 3 }, { abbr: "hyos.", grade: 2 },
      { abbr: "phos.", grade: 2 }, { abbr: "sil.", grade: 1 }, { abbr: "tub.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; fear; death, of",
    label: "fear; death, of",
    remedies: [
      { abbr: "acon.", grade: 4 }, { abbr: "ars.", grade: 4 }, { abbr: "calc.", grade: 3 },
      { abbr: "phos.", grade: 3 }, { abbr: "bell.", grade: 2 }, { abbr: "gels.", grade: 2 },
      { abbr: "nit-ac.", grade: 2 }, { abbr: "plat.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; fear; dark, of the",
    label: "fear; dark, of the",
    remedies: [
      { abbr: "phos.", grade: 4 }, { abbr: "stram.", grade: 4 }, { abbr: "calc.", grade: 3 },
      { abbr: "carb-v.", grade: 2 }, { abbr: "lyc.", grade: 2 }, { abbr: "puls.", grade: 2 },
      { abbr: "bell.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; fear; alone, of being",
    label: "fear; alone, of being",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "kali-c.", grade: 4 }, { abbr: "phos.", grade: 4 },
      { abbr: "lyc.", grade: 3 }, { abbr: "hyos.", grade: 2 }, { abbr: "stram.", grade: 2 },
      { abbr: "puls.", grade: 2 }, { abbr: "sep.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; fastidious; order, mania for",
    label: "fastidious; order, mania for",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "nux-v.", grade: 3 }, { abbr: "sil.", grade: 2 },
      { abbr: "graph.", grade: 1 }, { abbr: "kali-c.", grade: 2 }, { abbr: "thuj.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; grief; silent, involuntary sighing",
    label: "grief; silent, involuntary sighing",
    crossReferences: "See also: Mind - Sighing",
    remedies: [
      { abbr: "ign.", grade: 4 }, { abbr: "nat-m.", grade: 4 }, { abbr: "ph-ac.", grade: 3 },
      { abbr: "puls.", grade: 2 }, { abbr: "caust.", grade: 2 }, { abbr: "aur.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; consolation; aggravates",
    label: "consolation; aggravates",
    remedies: [
      { abbr: "nat-m.", grade: 4 }, { abbr: "sep.", grade: 3 }, { abbr: "sil.", grade: 2 },
      { abbr: "bell.", grade: 1 }, { abbr: "cham.", grade: 2 }, { abbr: "ign.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; weeping; easily, tearful mood",
    label: "weeping; easily, tearful mood",
    remedies: [
      { abbr: "puls.", grade: 4 }, { abbr: "sep.", grade: 3 }, { abbr: "calc.", grade: 2 },
      { abbr: "ign.", grade: 3 }, { abbr: "lyc.", grade: 2 }, { abbr: "nat-m.", grade: 2 },
      { abbr: "caust.", grade: 2 }, { abbr: "sil.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; irritability; snappish, uncivil",
    label: "irritability; snappish, uncivil",
    remedies: [
      { abbr: "cham.", grade: 4 }, { abbr: "nux-v.", grade: 4 }, { abbr: "bry.", grade: 3 },
      { abbr: "hep.", grade: 3 }, { abbr: "sep.", grade: 2 }, { abbr: "sulph.", grade: 2 },
      { abbr: "lyc.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; hurry; time passes too slowly",
    label: "hurry; time passes too slowly",
    remedies: [
      { abbr: "med.", grade: 4 }, { abbr: "nux-v.", grade: 3 }, { abbr: "sulph.", grade: 2 },
      { abbr: "bell.", grade: 1 }, { abbr: "thuj.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; indifference; apathy to loved ones",
    label: "indifference; apathy to loved ones",
    remedies: [
      { abbr: "sep.", grade: 4 }, { abbr: "ph-ac.", grade: 3 }, { abbr: "phos.", grade: 2 },
      { abbr: "calc.", grade: 1 }, { abbr: "lyc.", grade: 1 }, { abbr: "nat-m.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; suicidal disposition; thoughts of jumping",
    label: "suicidal disposition; thoughts of jumping",
    remedies: [
      { abbr: "aur.", grade: 4 }, { abbr: "bell.", grade: 2 }, { abbr: "ars.", grade: 2 },
      { abbr: "nux-v.", grade: 2 }, { abbr: "psor.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; anger; suppressed, ailments from",
    label: "anger; suppressed, ailments from",
    remedies: [
      { abbr: "staph.", grade: 4 }, { abbr: "cham.", grade: 3 }, { abbr: "ign.", grade: 2 },
      { abbr: "coloc.", grade: 3 }, { abbr: "lyc.", grade: 1 }, { abbr: "nux-v.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; loquacity; rapidly changing subjects",
    label: "loquacity; rapidly changing subjects",
    remedies: [
      { abbr: "lach.", grade: 4 }, { abbr: "stram.", grade: 3 }, { abbr: "hyos.", grade: 2 },
      { abbr: "bell.", grade: 2 }, { abbr: "verat.", grade: 2 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; jealousy; foolish, suspicious",
    label: "jealousy; foolish, suspicious",
    remedies: [
      { abbr: "lach.", grade: 4 }, { abbr: "hyos.", grade: 3 }, { abbr: "apis", grade: 2 },
      { abbr: "nux-v.", grade: 2 }, { abbr: "puls.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; delusions; body made of glass",
    label: "delusions; body made of glass",
    remedies: [
      { abbr: "thuj.", grade: 4 }, { abbr: "bar-c.", grade: 1 }
    ]
  },
  {
    chapter: "Mind",
    fullPath: "Mind; haughty; looks down on others",
    label: "haughty; looks down on others",
    remedies: [
      { abbr: "plat.", grade: 4 }, { abbr: "lyc.", grade: 3 }, { abbr: "sulph.", grade: 2 },
      { abbr: "lach.", grade: 2 }, { abbr: "verat.", grade: 1 }
    ]
  },

  // ==================== VERTIGO ====================
  {
    chapter: "Vertigo",
    fullPath: "Vertigo; rising from sitting, on",
    label: "rising from sitting, on",
    remedies: [
      { abbr: "bry.", grade: 4 }, { abbr: "acon.", grade: 3 }, { abbr: "puls.", grade: 2 },
      { abbr: "bell.", grade: 2 }, { abbr: "rhus-t.", grade: 2 }, { abbr: "phos.", grade: 1 }
    ]
  },
  {
    chapter: "Vertigo",
    fullPath: "Vertigo; closing eyes, on",
    label: "closing eyes, on",
    remedies: [
      { abbr: "lach.", grade: 4 }, { abbr: "ther.", grade: 3 }, { abbr: "sep.", grade: 2 },
      { abbr: "sil.", grade: 2 }, { abbr: "arn.", grade: 1 }
    ]
  },
  {
    chapter: "Vertigo",
    fullPath: "Vertigo; drowsiness, with dullness and heaviness",
    label: "drowsiness, with dullness and heaviness",
    remedies: [
      { abbr: "gels.", grade: 4 }, { abbr: "nux-m.", grade: 3 }, { abbr: "phos.", grade: 2 },
      { abbr: "bry.", grade: 1 }
    ]
  },

  // ==================== HEAD ====================
  {
    chapter: "Head",
    fullPath: "Head; pain; throbbing, pulsating carotid",
    label: "pain; throbbing, pulsating carotid",
    remedies: [
      { abbr: "bell.", grade: 4 }, { abbr: "glon.", grade: 4 }, { abbr: "nat-m.", grade: 3 },
      { abbr: "phos.", grade: 2 }, { abbr: "bry.", grade: 2 }, { abbr: "sep.", grade: 1 }
    ]
  },
  {
    chapter: "Head",
    fullPath: "Head; pain; motion, slightest agg",
    label: "pain; motion, slightest agg",
    remedies: [
      { abbr: "bry.", grade: 4 }, { abbr: "bell.", grade: 3 }, { abbr: "sil.", grade: 2 },
      { abbr: "nux-v.", grade: 2 }, { abbr: "chin.", grade: 2 }, { abbr: "spig.", grade: 1 }
    ]
  },
  {
    chapter: "Head",
    fullPath: "Head; pain; right-sided",
    label: "pain; right-sided",
    remedies: [
      { abbr: "bell.", grade: 4 }, { abbr: "sang.", grade: 4 }, { abbr: "lyc.", grade: 3 },
      { abbr: "sil.", grade: 3 }, { abbr: "bry.", grade: 2 }, { abbr: "sep.", grade: 1 }
    ]
  },
  {
    chapter: "Head",
    fullPath: "Head; pain; left-sided",
    label: "pain; left-sided",
    remedies: [
      { abbr: "spig.", grade: 4 }, { abbr: "lach.", grade: 3 }, { abbr: "sep.", grade: 2 },
      { abbr: "thuj.", grade: 2 }, { abbr: "phos.", grade: 1 }
    ]
  },
  {
    chapter: "Head",
    fullPath: "Head; pain; 10 AM to sunset, with sun",
    label: "pain; 10 AM to sunset, with sun",
    remedies: [
      { abbr: "nat-m.", grade: 4 }, { abbr: "glon.", grade: 3 }, { abbr: "sang.", grade: 3 },
      { abbr: "spig.", grade: 2 }, { abbr: "gels.", grade: 2 }
    ]
  },
  {
    chapter: "Head",
    fullPath: "Head; pain; tight bandage or pressure amel",
    label: "pain; tight bandage or pressure amel",
    remedies: [
      { abbr: "bry.", grade: 4 }, { abbr: "sil.", grade: 3 }, { abbr: "arg-n.", grade: 3 },
      { abbr: "puls.", grade: 2 }, { abbr: "bell.", grade: 2 }, { abbr: "calc.", grade: 1 }
    ]
  },
  {
    chapter: "Head",
    fullPath: "Head; perspiration; profuse, wetting pillow during sleep",
    label: "perspiration; profuse, wetting pillow during sleep",
    remedies: [
      { abbr: "calc.", grade: 4 }, { abbr: "cham.", grade: 3 }, { abbr: "sil.", grade: 3 },
      { abbr: "sanic.", grade: 2 }, { abbr: "merc.", grade: 1 }
    ]
  },
  {
    chapter: "Head",
    fullPath: "Head; pain; occiput to vertex, settling over eye",
    label: "pain; occiput to vertex, settling over eye",
    remedies: [
      { abbr: "gels.", grade: 4 }, { abbr: "sil.", grade: 4 }, { abbr: "sang.", grade: 3 },
      { abbr: "spig.", grade: 2 }, { abbr: "bry.", grade: 1 }
    ]
  },

  // ==================== EYES ====================
  {
    chapter: "Eyes",
    fullPath: "Eyes; swelling; lower eyelids, bag-like",
    label: "swelling; lower eyelids, bag-like",
    remedies: [
      { abbr: "apis", grade: 4 }, { abbr: "phos.", grade: 3 }, { abbr: "kali-c.", grade: 1 }
    ]
  },
  {
    chapter: "Eyes",
    fullPath: "Eyes; swelling; upper eyelids, inner canthi sacculated",
    label: "swelling; upper eyelids, inner canthi sacculated",
    remedies: [
      { abbr: "kali-c.", grade: 4 }, { abbr: "apis", grade: 2 }, { abbr: "phos.", grade: 1 }
    ]
  },
  {
    chapter: "Eyes",
    fullPath: "Eyes; ptosis; eyelids heavy, drooping, cannot open",
    label: "ptosis; eyelids heavy, drooping, cannot open",
    remedies: [
      { abbr: "gels.", grade: 4 }, { abbr: "caust.", grade: 3 }, { abbr: "sep.", grade: 2 },
      { abbr: "con.", grade: 2 }, { abbr: "rhus-t.", grade: 1 }
    ]
  },
  {
    chapter: "Eyes",
    fullPath: "Eyes; chalazion; recurrent, hard nodules",
    label: "chalazion; recurrent, hard nodules",
    remedies: [
      { abbr: "staph.", grade: 4 }, { abbr: "thuj.", grade: 3 }, { abbr: "con.", grade: 2 },
      { abbr: "sil.", grade: 2 }, { abbr: "puls.", grade: 1 }
    ]
  },

  // ==================== NOSE ====================
  {
    chapter: "Nose",
    fullPath: "Nose; discharge; stringy, ropy, tough elastic",
    label: "discharge; stringy, ropy, tough elastic",
    remedies: [
      { abbr: "kali-bi.", grade: 4 }, { abbr: "hydr.", grade: 3 }, { abbr: "kali-i.", grade: 2 }
    ]
  },
  {
    chapter: "Nose",
    fullPath: "Nose; coryza; bland nasal with acrid lachrymation",
    label: "coryza; bland nasal with acrid lachrymation",
    remedies: [
      { abbr: "euphr.", grade: 4 }, { abbr: "all-c.", grade: 1 }
    ]
  },
  {
    chapter: "Nose",
    fullPath: "Nose; coryza; acrid nasal with bland lachrymation",
    label: "coryza; acrid nasal with bland lachrymation",
    remedies: [
      { abbr: "all-c.", grade: 4 }, { abbr: "ars.", grade: 3 }, { abbr: "merc.", grade: 2 }
    ]
  },

  // ==================== FACE ====================
  {
    chapter: "Face",
    fullPath: "Face; discoloration; saddle yellow-brown across nose",
    label: "discoloration; saddle yellow-brown across nose",
    remedies: [
      { abbr: "sep.", grade: 4 }, { abbr: "sulph.", grade: 1 }
    ]
  },
  {
    chapter: "Face",
    fullPath: "Face; redness; one cheek red, other pale",
    label: "redness; one cheek red, other pale",
    remedies: [
      { abbr: "cham.", grade: 4 }, { abbr: "acon.", grade: 3 }, { abbr: "ipec.", grade: 1 }
    ]
  },
  {
    chapter: "Face",
    fullPath: "Face; cracked; lower lip in center",
    label: "cracked; lower lip in center",
    remedies: [
      { abbr: "nat-m.", grade: 4 }, { abbr: "cham.", grade: 1 }, { abbr: "puls.", grade: 1 }
    ]
  },

  // ==================== MOUTH & THROAT ====================
  {
    chapter: "Mouth",
    fullPath: "Mouth; tongue; clean, red triangular tip",
    label: "tongue; clean, red triangular tip",
    remedies: [
      { abbr: "rhus-t.", grade: 4 }, { abbr: "sulph.", grade: 1 }
    ]
  },
  {
    chapter: "Mouth",
    fullPath: "Mouth; tongue; flabby, indented with teeth marks",
    label: "tongue; flabby, indented with teeth marks",
    remedies: [
      { abbr: "merc.", grade: 4 }, { abbr: "chel.", grade: 2 }, { abbr: "pod.", grade: 2 },
      { abbr: "rhus-t.", grade: 1 }
    ]
  },
  {
    chapter: "Mouth",
    fullPath: "Mouth; salivation; profuse in sleep, wetting pillow",
    label: "salivation; profuse in sleep, wetting pillow",
    remedies: [
      { abbr: "merc.", grade: 4 }, { abbr: "syph.", grade: 2 }, { abbr: "ipec.", grade: 2 }
    ]
  },
  {
    chapter: "Mouth",
    fullPath: "Mouth; tongue; clean with persistent continuous nausea",
    label: "tongue; clean with persistent continuous nausea",
    remedies: [
      { abbr: "ip.", grade: 4 }, { abbr: "puls.", grade: 1 }
    ]
  },
  {
    chapter: "Throat",
    fullPath: "Throat; pain; splinter-like sticking, as if fishbone",
    label: "pain; splinter-like sticking, as if fishbone",
    remedies: [
      { abbr: "hep.", grade: 4 }, { abbr: "nit-ac.", grade: 4 }, { abbr: "arg-n.", grade: 3 },
      { abbr: "sil.", grade: 2 }
    ]
  },
  {
    chapter: "Throat",
    fullPath: "Throat; pain; left to right, worse touch of collar",
    label: "pain; left to right, worse touch of collar",
    remedies: [
      { abbr: "lach.", grade: 4 }, { abbr: "phos.", grade: 1 }, { abbr: "sep.", grade: 1 }
    ]
  },
  {
    chapter: "Throat",
    fullPath: "Throat; constriction; globus hystericus, swallowing solids amel",
    label: "constriction; globus hystericus, swallowing solids amel",
    remedies: [
      { abbr: "ign.", grade: 4 }, { abbr: "lach.", grade: 2 }, { abbr: "nat-m.", grade: 1 }
    ]
  },

  // ==================== STOMACH ====================
  {
    chapter: "Stomach",
    fullPath: "Stomach; thirst; small quantities, frequent sips",
    label: "thirst; small quantities, frequent sips",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "chin.", grade: 2 }, { abbr: "bell.", grade: 1 },
      { abbr: "hyos.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; thirst; large quantities, long intervals",
    label: "thirst; large quantities, long intervals",
    remedies: [
      { abbr: "bry.", grade: 4 }, { abbr: "acon.", grade: 3 }, { abbr: "sulph.", grade: 2 },
      { abbr: "nat-m.", grade: 2 }, { abbr: "verat.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; thirstlessness; fever or complaints, with",
    label: "thirstlessness; fever or complaints, with",
    remedies: [
      { abbr: "puls.", grade: 4 }, { abbr: "apis", grade: 4 }, { abbr: "gels.", grade: 4 },
      { abbr: "chin.", grade: 1 }, { abbr: "ipec.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; desires; ice-cold drinks, cold water",
    label: "desires; ice-cold drinks, cold water",
    remedies: [
      { abbr: "phos.", grade: 4 }, { abbr: "verat.", grade: 3 }, { abbr: "acon.", grade: 2 },
      { abbr: "ars.", grade: 2 }, { abbr: "bry.", grade: 2 }, { abbr: "merc.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; desires; warm drinks, hot water",
    label: "desires; warm drinks, hot water",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "lyc.", grade: 4 }, { abbr: "chel.", grade: 2 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; desires; salt and salty food",
    label: "desires; salt and salty food",
    remedies: [
      { abbr: "nat-m.", grade: 4 }, { abbr: "phos.", grade: 3 }, { abbr: "carb-v.", grade: 2 },
      { abbr: "verat.", grade: 2 }, { abbr: "caust.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; desires; eggs, soft-boiled",
    label: "desires; eggs, soft-boiled",
    remedies: [
      { abbr: "calc.", grade: 4 }, { abbr: "hydr.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; desires; sweets and sugar",
    label: "desires; sweets and sugar",
    remedies: [
      { abbr: "lyc.", grade: 4 }, { abbr: "sulph.", grade: 4 }, { abbr: "arg-n.", grade: 3 },
      { abbr: "calc.", grade: 2 }, { abbr: "chin.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; aversion; fat food, pork, butter",
    label: "aversion; fat food, pork, butter",
    remedies: [
      { abbr: "puls.", grade: 4 }, { abbr: "carb-v.", grade: 3 }, { abbr: "petr.", grade: 2 },
      { abbr: "sep.", grade: 2 }, { abbr: "nat-m.", grade: 1 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; vomiting; water vomited as soon as warm in stomach",
    label: "vomiting; water vomited as soon as warm in stomach",
    remedies: [
      { abbr: "phos.", grade: 4 }, { abbr: "ars.", grade: 3 }, { abbr: "bism.", grade: 2 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; fullness; after eating a few mouthfuls",
    label: "fullness; after eating a few mouthfuls",
    remedies: [
      { abbr: "lyc.", grade: 4 }, { abbr: "chin.", grade: 2 }, { abbr: "nux-v.", grade: 2 }
    ]
  },
  {
    chapter: "Stomach",
    fullPath: "Stomach; emptiness; sinking sensation at 11 AM",
    label: "emptiness; sinking sensation at 11 AM",
    remedies: [
      { abbr: "sulph.", grade: 4 }, { abbr: "sep.", grade: 3 }, { abbr: "ign.", grade: 2 },
      { abbr: "nat-m.", grade: 2 }, { abbr: "phos.", grade: 2 }
    ]
  },

  // ==================== ABDOMEN & RECTUM ====================
  {
    chapter: "Abdomen",
    fullPath: "Abdomen; flatulence; distension upper abdomen, eructations amel",
    label: "flatulence; distension upper abdomen, eructations amel",
    remedies: [
      { abbr: "carb-v.", grade: 4 }, { abbr: "chin.", grade: 3 }, { abbr: "nux-v.", grade: 2 }
    ]
  },
  {
    chapter: "Abdomen",
    fullPath: "Abdomen; flatulence; lower abdomen, fermentation",
    label: "flatulence; lower abdomen, fermentation",
    remedies: [
      { abbr: "lyc.", grade: 4 }, { abbr: "carb-v.", grade: 2 }, { abbr: "chin.", grade: 2 }
    ]
  },
  {
    chapter: "Abdomen",
    fullPath: "Abdomen; tympanitic; whole abdomen, no relief from eructations",
    label: "tympanitic; whole abdomen, no relief from eructations",
    remedies: [
      { abbr: "chin.", grade: 4 }, { abbr: "carb-v.", grade: 2 }, { abbr: "lyc.", grade: 2 }
    ]
  },
  {
    chapter: "Rectum",
    fullPath: "Rectum; diarrhea; morning, driving out of bed at 5 AM",
    label: "diarrhea; morning, driving out of bed at 5 AM",
    remedies: [
      { abbr: "sulph.", grade: 4 }, { abbr: "aloe", grade: 4 }, { abbr: "psor.", grade: 3 },
      { abbr: "pod.", grade: 3 }, { abbr: "nat-s.", grade: 2 }
    ]
  },
  {
    chapter: "Rectum",
    fullPath: "Rectum; constipation; ineffectual urging, frequent incomplete stool",
    label: "constipation; ineffectual urging, frequent incomplete stool",
    remedies: [
      { abbr: "nux-v.", grade: 4 }, { abbr: "anac.", grade: 2 }, { abbr: "lyc.", grade: 2 },
      { abbr: "ign.", grade: 1 }, { abbr: "sulph.", grade: 1 }
    ]
  },
  {
    chapter: "Rectum",
    fullPath: "Rectum; stool; involuntary with cold sweat on forehead",
    label: "stool; involuntary with cold sweat on forehead",
    remedies: [
      { abbr: "verat.", grade: 4 }, { abbr: "ars.", grade: 2 }
    ]
  },

  // ==================== URINARY & GENITALIA ====================
  {
    chapter: "Urinary",
    fullPath: "Urinary; urination; involuntary, coughing or sneezing, on",
    label: "urination; involuntary, coughing or sneezing, on",
    remedies: [
      { abbr: "caust.", grade: 4 }, { abbr: "puls.", grade: 3 }, { abbr: "squil.", grade: 3 },
      { abbr: "nat-m.", grade: 2 }, { abbr: "sep.", grade: 2 }, { abbr: "phos.", grade: 1 }
    ]
  },
  {
    chapter: "Urinary",
    fullPath: "Urinary; burning; urethra, when not urinating",
    label: "burning; urethra, when not urinating",
    remedies: [
      { abbr: "staph.", grade: 4 }, { abbr: "cann-s.", grade: 1 }
    ]
  },
  {
    chapter: "Urinary",
    fullPath: "Urinary; sediment; red sand, lithic acid",
    label: "sediment; red sand, lithic acid",
    remedies: [
      { abbr: "lyc.", grade: 4 }, { abbr: "sep.", grade: 2 }, { abbr: "phos.", grade: 1 }
    ]
  },
  {
    chapter: "Female",
    fullPath: "Female; bearing down; pelvic organs, must cross legs",
    label: "bearing down; pelvic organs, must cross legs",
    remedies: [
      { abbr: "sep.", grade: 4 }, { abbr: "lil-t.", grade: 3 }, { abbr: "bell.", grade: 2 },
      { abbr: "plat.", grade: 2 }, { abbr: "murex", grade: 2 }
    ]
  },

  // ==================== RESPIRATION & CHEST ====================
  {
    chapter: "Respiration",
    fullPath: "Respiration; asthmatic; midnight to 2 AM agg",
    label: "asthmatic; midnight to 2 AM agg",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "samb.", grade: 2 }, { abbr: "kali-c.", grade: 1 }
    ]
  },
  {
    chapter: "Respiration",
    fullPath: "Respiration; asthmatic; 2 AM to 4 AM, bends forward with elbows on knees",
    label: "asthmatic; 2 AM to 4 AM, bends forward with elbows on knees",
    remedies: [
      { abbr: "kali-c.", grade: 4 }, { abbr: "ars.", grade: 2 }
    ]
  },
  {
    chapter: "Respiration",
    fullPath: "Respiration; air hunger; fan, demands to be fanned rapidly close to face",
    label: "air hunger; fan, demands to be fanned rapidly close to face",
    remedies: [
      { abbr: "carb-v.", grade: 4 }, { abbr: "med.", grade: 2 }, { abbr: "chin.", grade: 1 }
    ]
  },
  {
    chapter: "Cough",
    fullPath: "Cough; dry; holding chest with hands, must support chest",
    label: "dry; holding chest with hands, must support chest",
    remedies: [
      { abbr: "bry.", grade: 4 }, { abbr: "dros.", grade: 3 }, { abbr: "phos.", grade: 2 },
      { abbr: "sep.", grade: 1 }
    ]
  },
  {
    chapter: "Cough",
    fullPath: "Cough; dry; spasmodic, worse lying flat, disappearing on sitting up",
    label: "dry; spasmodic, worse lying flat, disappearing on sitting up",
    remedies: [
      { abbr: "hyos.", grade: 4 }, { abbr: "con.", grade: 3 }, { abbr: "puls.", grade: 2 }
    ]
  },

  // ==================== EXTREMITIES & BACK ====================
  {
    chapter: "Extremities",
    fullPath: "Extremities; stiffness; beginning motion agg, continued motion amel",
    label: "stiffness; beginning motion agg, continued motion amel",
    remedies: [
      { abbr: "rhus-t.", grade: 4 }, { abbr: "calc-f.", grade: 2 }, { abbr: "lyc.", grade: 2 },
      { abbr: "con.", grade: 1 }
    ]
  },
  {
    chapter: "Extremities",
    fullPath: "Extremities; feet; burning, sticks feet out from covers at night",
    label: "feet; burning, sticks feet out from covers at night",
    remedies: [
      { abbr: "sulph.", grade: 4 }, { abbr: "med.", grade: 4 }, { abbr: "cham.", grade: 3 },
      { abbr: "sang.", grade: 2 }, { abbr: "puls.", grade: 2 }, { abbr: "sil.", grade: 1 }
    ]
  },
  {
    chapter: "Extremities",
    fullPath: "Extremities; feet; cold and damp as if wet stockings",
    label: "feet; cold and damp as if wet stockings",
    remedies: [
      { abbr: "calc.", grade: 4 }, { abbr: "sil.", grade: 3 }, { abbr: "sep.", grade: 2 }
    ]
  },
  {
    chapter: "Extremities",
    fullPath: "Extremities; perspiration; feet, offensive, acrid, excoriating",
    label: "perspiration; feet, offensive, acrid, excoriating",
    remedies: [
      { abbr: "sil.", grade: 4 }, { abbr: "bar-c.", grade: 2 }, { abbr: "graph.", grade: 2 },
      { abbr: "nit-ac.", grade: 2 }, { abbr: "thuj.", grade: 1 }
    ]
  },
  {
    chapter: "Extremities",
    fullPath: "Extremities; puncture wounds; cold to touch, ice-cold water amel",
    label: "puncture wounds; cold to touch, ice-cold water amel",
    remedies: [
      { abbr: "led.", grade: 4 }, { abbr: "hyper.", grade: 2 }
    ]
  },

  // ==================== SLEEP & DREAMS ====================
  {
    chapter: "Sleep",
    fullPath: "Sleep; waking; 3 AM to 4 AM, rush of thoughts",
    label: "waking; 3 AM to 4 AM, rush of thoughts",
    remedies: [
      { abbr: "nux-v.", grade: 4 }, { abbr: "kali-c.", grade: 3 }, { abbr: "ars.", grade: 2 },
      { abbr: "calc.", grade: 2 }, { abbr: "sep.", grade: 1 }
    ]
  },
  {
    chapter: "Sleep",
    fullPath: "Sleep; position; knee-chest position, on abdomen",
    label: "position; knee-chest position, on abdomen",
    remedies: [
      { abbr: "med.", grade: 4 }, { abbr: "calc-p.", grade: 2 }, { abbr: "tub.", grade: 2 }
    ]
  },
  {
    chapter: "Sleep",
    fullPath: "Sleep; nightmares; screams, terrified of dark on waking",
    label: "nightmares; screams, terrified of dark on waking",
    remedies: [
      { abbr: "stram.", grade: 4 }, { abbr: "bell.", grade: 3 }, { abbr: "hyos.", grade: 2 },
      { abbr: "calc.", grade: 2 }, { abbr: "puls.", grade: 1 }
    ]
  },

  // ==================== CHILL, FEVER & SWEAT ====================
  {
    chapter: "Fever",
    fullPath: "Fever; dry intense heat, skin burning hot, no sweat",
    label: "dry intense heat, skin burning hot, no sweat",
    remedies: [
      { abbr: "acon.", grade: 4 }, { abbr: "bell.", grade: 4 }, { abbr: "ars.", grade: 2 },
      { abbr: "bry.", grade: 2 }
    ]
  },
  {
    chapter: "Perspiration",
    fullPath: "Perspiration; profuse, no relief whatever, weakens patient",
    label: "profuse, no relief whatever, weakens patient",
    remedies: [
      { abbr: "merc.", grade: 4 }, { abbr: "chin.", grade: 3 }, { abbr: "sep.", grade: 2 },
      { abbr: "ars.", grade: 1 }
    ]
  },
  {
    chapter: "Perspiration",
    fullPath: "Perspiration; forehead, cold sweat during collapse or pain",
    label: "forehead, cold sweat during collapse or pain",
    remedies: [
      { abbr: "verat.", grade: 4 }, { abbr: "carb-v.", grade: 2 }, { abbr: "camph.", grade: 2 }
    ]
  },

  // ==================== SKIN ====================
  {
    chapter: "Skin",
    fullPath: "Skin; itching; voluptuous, scratching feels good, then burns",
    label: "itching; voluptuous, scratching feels good, then burns",
    remedies: [
      { abbr: "sulph.", grade: 4 }, { abbr: "psor.", grade: 3 }, { abbr: "ars.", grade: 2 }
    ]
  },
  {
    chapter: "Skin",
    fullPath: "Skin; eruptions; honey-like thick sticky gluey fluid",
    label: "eruptions; honey-like thick sticky gluey fluid",
    remedies: [
      { abbr: "graph.", grade: 4 }, { abbr: "mez.", grade: 2 }
    ]
  },
  {
    chapter: "Skin",
    fullPath: "Skin; warts; cauliflower, pedunculated, bleeding easily",
    label: "warts; cauliflower, pedunculated, bleeding easily",
    remedies: [
      { abbr: "thuj.", grade: 4 }, { abbr: "nit-ac.", grade: 3 }, { abbr: "staph.", grade: 2 },
      { abbr: "caust.", grade: 2 }
    ]
  },

  // ==================== GENERALITIES ====================
  {
    chapter: "Generalities",
    fullPath: "Generalities; chilly; lacks vital heat, extreme sensitivity to cold",
    label: "chilly; lacks vital heat, extreme sensitivity to cold",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "calc.", grade: 4 }, { abbr: "hep.", grade: 4 },
      { abbr: "nux-v.", grade: 4 }, { abbr: "psor.", grade: 4 }, { abbr: "sil.", grade: 4 },
      { abbr: "sep.", grade: 3 }, { abbr: "lyc.", grade: 3 }, { abbr: "rhus-t.", grade: 3 },
      { abbr: "thuj.", grade: 2 }, { abbr: "chin.", grade: 2 }, { abbr: "aur.", grade: 2 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; warm; intolerant of warmth, seeks cold open air",
    label: "warm; intolerant of warmth, seeks cold open air",
    remedies: [
      { abbr: "apis", grade: 4 }, { abbr: "puls.", grade: 4 }, { abbr: "sulph.", grade: 4 },
      { abbr: "med.", grade: 3 }, { abbr: "nat-m.", grade: 3 }, { abbr: "bry.", grade: 2 },
      { abbr: "lach.", grade: 2 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; periodicity; midnight, 1 AM to 2 AM agg",
    label: "periodicity; midnight, 1 AM to 2 AM agg",
    remedies: [
      { abbr: "ars.", grade: 4 }, { abbr: "rhus-t.", grade: 2 }, { abbr: "acon.", grade: 2 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; periodicity; 4 PM to 8 PM agg",
    label: "periodicity; 4 PM to 8 PM agg",
    remedies: [
      { abbr: "lyc.", grade: 4 }, { abbr: "coloc.", grade: 2 }, { abbr: "hell.", grade: 1 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; physical exertion; vigorous, dancing amel",
    label: "physical exertion; vigorous, dancing amel",
    remedies: [
      { abbr: "sep.", grade: 4 }, { abbr: "rhus-t.", grade: 2 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; trauma; blunt contusion, sprains, bed feels hard",
    label: "trauma; blunt contusion, sprains, bed feels hard",
    remedies: [
      { abbr: "arn.", grade: 4 }, { abbr: "rhus-t.", grade: 3 }, { abbr: "hyper.", grade: 2 },
      { abbr: "ruta", grade: 2 }, { abbr: "bell-p.", grade: 1 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; right side; complaints mostly right-sided",
    label: "right side; complaints mostly right-sided",
    remedies: [
      { abbr: "lyc.", grade: 4 }, { abbr: "bell.", grade: 4 }, { abbr: "bry.", grade: 3 },
      { abbr: "apis", grade: 2 }, { abbr: "sang.", grade: 2 }, { abbr: "calc.", grade: 2 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; left side; complaints mostly left-sided",
    label: "left side; complaints mostly left-sided",
    remedies: [
      { abbr: "lach.", grade: 4 }, { abbr: "spig.", grade: 3 }, { abbr: "phos.", grade: 2 },
      { abbr: "thuj.", grade: 2 }, { abbr: "sep.", grade: 2 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; open air; amelioration in cool fresh breeze",
    label: "open air; amelioration in cool fresh breeze",
    remedies: [
      { abbr: "puls.", grade: 4 }, { abbr: "apis", grade: 3 }, { abbr: "sulph.", grade: 2 },
      { abbr: "med.", grade: 2 }, { abbr: "nat-m.", grade: 2 }, { abbr: "acon.", grade: 1 }
    ]
  },
  {
    chapter: "Generalities",
    fullPath: "Generalities; seashore; at the, amelioration",
    label: "seashore; at the, amelioration",
    remedies: [
      { abbr: "med.", grade: 4 }, { abbr: "brom.", grade: 2 }, { abbr: "nat-s.", grade: 1 }
    ]
  }
];

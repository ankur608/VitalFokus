/**
 * Remedy Relationship & Family Graph Network
 * Models:
 * - Complementary pairs
 * - Antidote relationships
 * - Acute-to-Chronic progression chains (Classic Trios)
 * - Inimical / Incompatible pairings
 */

export interface RemedyGraphNode {
  id: string;
  name: string;
  abbr: string;
  remedyNumber: number;
  kingdom: "Plant" | "Mineral" | "Animal" | "Nosode";
  miasm: "Psora" | "Sycosis" | "Syphilis" | "Tubercular" | "Cancer";
  thermalState: "Chilly" | "Hot" | "Ambithermal";
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export type RelationType = "Complementary" | "Antidote" | "AcuteChronic" | "Inimical";

export interface RemedyGraphLink {
  source: string;
  target: string;
  type: RelationType;
  label: string;
  notes: string;
}

export const GRAPH_NODES: RemedyGraphNode[] = [
  { id: "ars", name: "Arsenicum album", abbr: "ars.", remedyNumber: 1, kingdom: "Mineral", miasm: "Psora", thermalState: "Chilly" },
  { id: "bell", name: "Belladonna", abbr: "bell.", remedyNumber: 2, kingdom: "Plant", miasm: "Psora", thermalState: "Hot" },
  { id: "bry", name: "Bryonia alba", abbr: "bry.", remedyNumber: 3, kingdom: "Plant", miasm: "Psora", thermalState: "Hot" },
  { id: "acon", name: "Aconitum napellus", abbr: "acon.", remedyNumber: 4, kingdom: "Plant", miasm: "Psora", thermalState: "Hot" },
  { id: "gels", name: "Gelsemium sempervirens", abbr: "gels.", remedyNumber: 5, kingdom: "Plant", miasm: "Psora", thermalState: "Chilly" },
  { id: "nux", name: "Nux vomica", abbr: "nux-v.", remedyNumber: 6, kingdom: "Plant", miasm: "Psora", thermalState: "Chilly" },
  { id: "rhus", name: "Rhus toxicodendron", abbr: "rhus-t.", remedyNumber: 7, kingdom: "Plant", miasm: "Psora", thermalState: "Chilly" },
  { id: "puls", name: "Pulsatilla pratensis", abbr: "puls.", remedyNumber: 8, kingdom: "Plant", miasm: "Sycosis", thermalState: "Hot" },
  { id: "nat-m", name: "Natrum muriaticum", abbr: "nat-m.", remedyNumber: 9, kingdom: "Mineral", miasm: "Psora", thermalState: "Hot" },
  { id: "arn", name: "Arnica montana", abbr: "arn.", remedyNumber: 10, kingdom: "Plant", miasm: "Psora", thermalState: "Ambithermal" },
  { id: "ign", name: "Ignatia amara", abbr: "ign.", remedyNumber: 11, kingdom: "Plant", miasm: "Psora", thermalState: "Ambithermal" },
  { id: "lach", name: "Lachesis muta", abbr: "lach.", remedyNumber: 12, kingdom: "Animal", miasm: "Syphilis", thermalState: "Hot" },
  { id: "calc", name: "Calcarea carbonica", abbr: "calc.", remedyNumber: 13, kingdom: "Mineral", miasm: "Psora", thermalState: "Chilly" },
  { id: "phos", name: "Phosphorus", abbr: "phos.", remedyNumber: 14, kingdom: "Mineral", miasm: "Tubercular", thermalState: "Chilly" },
  { id: "sulph", name: "Sulphur", abbr: "sulph.", remedyNumber: 15, kingdom: "Mineral", miasm: "Psora", thermalState: "Hot" },
  { id: "sep", name: "Sepia officinalis", abbr: "sep.", remedyNumber: 16, kingdom: "Animal", miasm: "Sycosis", thermalState: "Chilly" },
  { id: "spong", name: "Spongia tosta", abbr: "spong.", remedyNumber: 21, kingdom: "Animal", miasm: "Tubercular", thermalState: "Chilly" },
  { id: "hep", name: "Hepar sulphuris", abbr: "hep.", remedyNumber: 22, kingdom: "Mineral", miasm: "Syphilis", thermalState: "Chilly" },
  { id: "sil", name: "Silicea", abbr: "sil.", remedyNumber: 27, kingdom: "Mineral", miasm: "Sycosis", thermalState: "Chilly" },
  { id: "carb-v", name: "Carbo vegetabilis", abbr: "carb-v.", remedyNumber: 25, kingdom: "Plant", miasm: "Psora", thermalState: "Chilly" },
  { id: "chin", name: "China officinalis", abbr: "chin.", remedyNumber: 26, kingdom: "Plant", miasm: "Psora", thermalState: "Chilly" },
  { id: "apis", name: "Apis mellifica", abbr: "apis", remedyNumber: 47, kingdom: "Animal", miasm: "Sycosis", thermalState: "Hot" },
  { id: "thuja", name: "Thuja occidentalis", abbr: "thuj.", remedyNumber: 23, kingdom: "Plant", miasm: "Sycosis", thermalState: "Chilly" },
  { id: "merc", name: "Mercurius solubilis", abbr: "merc.", remedyNumber: 39, kingdom: "Mineral", miasm: "Syphilis", thermalState: "Ambithermal" }
];

export const GRAPH_LINKS: RemedyGraphLink[] = [
  // --- Acute-to-Chronic Chains (Classic Trios) ---
  {
    source: "acon",
    target: "spong",
    type: "AcuteChronic",
    label: "Croup Chain 1",
    notes: "Aconite (sudden dry heat/croup) is followed seamlessly by Spongia (dry barking croup)."
  },
  {
    source: "spong",
    target: "hep",
    type: "AcuteChronic",
    label: "Croup Chain 2",
    notes: "Spongia is followed by Hepar sulph when moisture or rattling mucus develops."
  },
  {
    source: "arn",
    target: "rhus",
    type: "AcuteChronic",
    label: "Trauma Chain 1",
    notes: "Arnica addresses initial contusion/hematoma; Rhus tox addresses ligament/tendon strain."
  },
  {
    source: "rhus",
    target: "calc",
    type: "AcuteChronic",
    label: "Trauma Chain 2",
    notes: "Calcarea carbonica completes the cure for chronic joint weakness and relapses."
  },
  {
    source: "ign",
    target: "nat-m",
    type: "AcuteChronic",
    label: "Grief Chain",
    notes: "Ignatia is the acute remedy for recent grief/shock; Natrum mur is the deep chronic remedy for retained silent grief."
  },
  {
    source: "bell",
    target: "calc",
    type: "AcuteChronic",
    label: "Acute-Chronic Polar",
    notes: "Belladonna is the acute manifestation; Calcarea carbonica is the deep constitutional counterpart."
  },
  {
    source: "ars",
    target: "carb-v",
    type: "AcuteChronic",
    label: "Vital Collapse Trio 1",
    notes: "Arsenicum handles restless prostration; Carbo veg revives the collapsed organism needing air fanned."
  },
  {
    source: "carb-v",
    target: "chin",
    type: "AcuteChronic",
    label: "Vital Collapse Trio 2",
    notes: "China completes restoration after debilitating vital fluid losses and hemorrhage."
  },

  // --- Complementary Relationships ---
  {
    source: "bell",
    target: "calc",
    type: "Complementary",
    label: "Complementary",
    notes: "Calcarea carbonica completes the action of Belladonna in scrofulous or plethoric constitutions."
  },
  {
    source: "puls",
    target: "sil",
    type: "Complementary",
    label: "Complementary",
    notes: "Silicea is the chronic complementary to Pulsatilla for sluggish suppurations and ear discharges."
  },
  {
    source: "puls",
    target: "kali-s",
    type: "Complementary",
    label: "Complementary",
    notes: "Kali sulph acts as a chemical and clinical complementary to Pulsatilla."
  },
  {
    source: "sep",
    target: "nat-m",
    type: "Complementary",
    label: "Complementary",
    notes: "Natrum mur and Sepia frequently follow each other in female endocrine and pelvic stasis cases."
  },
  {
    source: "sulph",
    target: "nux",
    type: "Complementary",
    label: "Complementary",
    notes: "Sulphur frequently unblocks cases that have stalled on Nux vomica, clearing toxic miasmatic debris."
  },
  {
    source: "ars",
    target: "thuja",
    type: "Complementary",
    label: "Complementary",
    notes: "Thuja acts as deep sycotic complementary following Arsenicum album in chronic asthma and nevi."
  },
  {
    source: "phos",
    target: "ars",
    type: "Complementary",
    label: "Complementary",
    notes: "Arsenicum and Phosphorus follow each other closely in destructive gastro-pulmonary pathologies."
  },

  // --- Antidotes ---
  {
    source: "nux",
    target: "ign",
    type: "Antidote",
    label: "Antidote",
    notes: "Nux vomica antidotes emotional over-sensitivity and hysterical spasms from Ignatia."
  },
  {
    source: "puls",
    target: "cham",
    type: "Antidote",
    label: "Antidote",
    notes: "Pulsatilla antidotes Chamomilla's angry hypersensitivity and earache overreactions."
  },
  {
    source: "hep",
    target: "merc",
    type: "Antidote",
    label: "Antidote",
    notes: "Hepar sulph is the premier antidote for chronic mercurial poisonings and salivations."
  },

  // --- Inimical (Incompatible) ---
  {
    source: "apis",
    target: "rhus",
    type: "Inimical",
    label: "Inimical / Incompatible",
    notes: "Apis and Rhus tox are inimical and should never follow each other immediately; they disturb the vital force."
  },
  {
    source: "phos",
    target: "caust",
    type: "Inimical",
    label: "Inimical / Incompatible",
    notes: "Phosphorus and Causticum are traditional inimicals; avoid sequential administration."
  }
];

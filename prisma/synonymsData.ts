export interface SynonymSeed {
  modernTerm: string;
  classicalRubricPath: string;
  category: string;
  clinicalExplanation: string;
  suggestedRemedies: string;
}

export const synonymsData: SynonymSeed[] = [
  {
    modernTerm: "hypertension",
    classicalRubricPath: "Head; pain; throbbing, pulsating carotid",
    category: "Cardiovascular",
    clinicalExplanation: "Vascular surges and throbbing arterial hypertension correspond classically to congestive, bounding carotid rubrics.",
    suggestedRemedies: "bell., glon., nat-m., aur., phos."
  },
  {
    modernTerm: "panic attack",
    classicalRubricPath: "Mind; fear; death, of",
    category: "Psychiatry",
    clinicalExplanation: "Sudden acute panicky terror with impending sense of doom and physical restlessness.",
    suggestedRemedies: "acon., ars., phos., gels."
  },
  {
    modernTerm: "insomnia",
    classicalRubricPath: "Sleep; waking; 3 AM to 4 AM, rush of thoughts",
    category: "Neurology",
    clinicalExplanation: "Nocturnal awakening from active mental rush and work obsessiveness.",
    suggestedRemedies: "nux-v., kali-c., ars., coff."
  },
  {
    modernTerm: "gastritis",
    classicalRubricPath: "Stomach; thirst; small quantities, frequent sips",
    category: "Gastroenterology",
    clinicalExplanation: "Burning gastralgia and mucosal inflammation relieved by hot drinks and sipping water.",
    suggestedRemedies: "ars., phos., nux-v., lyc."
  },
  {
    modernTerm: "irritable bowel syndrome",
    classicalRubricPath: "Rectum; constipation; ineffectual urging, frequent incomplete stool",
    category: "Gastroenterology",
    clinicalExplanation: "Dyssynergic spastic defecation with frequent ineffectual urging and incomplete evacuation.",
    suggestedRemedies: "nux-v., aloe, pod., lyc., sulph."
  },
  {
    modernTerm: "osteoarthritis",
    classicalRubricPath: "Extremities; stiffness; beginning motion agg, continued motion amel",
    category: "Rheumatology",
    clinicalExplanation: "Joint gel phenomenon: morning stiffness easing with continuous gentle mobilization.",
    suggestedRemedies: "rhus-t., bry., calc., caust."
  },
  {
    modernTerm: "fibromyalgia",
    classicalRubricPath: "Generalities; trauma; blunt contusion, sprains, bed feels hard",
    category: "Rheumatology",
    clinicalExplanation: "Widespread musculo-skeletal bruised tenderness where even the bed feels excessively hard.",
    suggestedRemedies: "arn., rhus-t., ruta, kali-c."
  },
  {
    modernTerm: "asthma",
    classicalRubricPath: "Respiration; asthmatic; midnight to 2 AM agg",
    category: "Pulmonology",
    clinicalExplanation: "Nocturnal bronchospasm peaking between midnight and 2:00 AM.",
    suggestedRemedies: "ars., kali-c., carb-v., ip."
  },
  {
    modernTerm: "uterine prolapse",
    classicalRubricPath: "Female; bearing down; pelvic organs, must cross legs",
    category: "Obstetrics & Gynecology",
    clinicalExplanation: "Pelvic floor laxity with bearing down sensation forcing patient to cross limbs tightly.",
    suggestedRemedies: "sep., lil-t., plat., bell."
  },
  {
    modernTerm: "cystitis",
    classicalRubricPath: "Urinary; burning; urethra, when not urinating",
    category: "Urology",
    clinicalExplanation: "Urethral dysuria and tenesmus, notably burning persisting even between micturition.",
    suggestedRemedies: "staph., canth., apis, sars."
  },
  {
    modernTerm: "eczema",
    classicalRubricPath: "Skin; itching; voluptuous, scratching feels good, then burns",
    category: "Dermatology",
    clinicalExplanation: "Pruritic erythematous dermatosis worse from water and warmth of bed.",
    suggestedRemedies: "sulph., graph., psor., ars."
  },
  {
    modernTerm: "grief reaction",
    classicalRubricPath: "Mind; grief; silent, involuntary sighing",
    category: "Psychiatry",
    clinicalExplanation: "Acute bereavement shock with silent weeping, lump in throat, and involuntary sighing.",
    suggestedRemedies: "ign., nat-m., ph-ac., aur."
  },
  {
    modernTerm: "stage fright",
    classicalRubricPath: "Mind; anxiety; anticipation, from",
    category: "Psychiatry",
    clinicalExplanation: "Anticipatory anxiety and motor trembling before public appearances or examinations.",
    suggestedRemedies: "gels., lyc., sil., arg-n."
  },
  {
    modernTerm: "chronic fatigue syndrome",
    classicalRubricPath: "Generalities; chilly; lacks vital heat, extreme sensitivity to cold",
    category: "Immunology",
    clinicalExplanation: "Post-exertional neuro-immune exhaustion with lack of vital calorific heat.",
    suggestedRemedies: "ars., ph-ac., kali-p., psor., chin."
  }
];

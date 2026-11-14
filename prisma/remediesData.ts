export interface RemedySeed {
  remedyNumber: number;
  name: string;
  abbreviation: string;
  commonName: string;
  kingdom: string;
  miasm: string;
  thermalState: string;
  isPolycrest: boolean;
  shortDescription: string;
  mindKeynotes: string;
  generalsKeynotes: string;
  modalitiesKeynotes: string;
  complementary: string;
  antidotes: string;
  followsWell: string;
  inimical: string;
  materiaMedica: {
    section: string;
    content: string;
  }[];
}

export const remediesData: RemedySeed[] = [
  {
    "remedyNumber": 1,
    "name": "Arsenicum album",
    "abbreviation": "ars.",
    "commonName": "White Arsenic / Arsenious Trioxide",
    "kingdom": "Mineral",
    "miasm": "Syphilitic / Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Extreme restlessness with prostration, midnight aggravation, burning pains relieved by heat, deathly anxiety, and meticulous fastidiousness.",
    "mindKeynotes": "Anguish, despair of recovery, fear of death, fear of being left alone. Extremely fastidious, wants everything neat and tidy in precise order. Restless: moves from bed to chair, cannot stay in one place despite extreme physical weakness.",
    "generalsKeynotes": "Chilly patient; great exhaustion out of proportion to disease. Burning pains felt internally, yet ameliorated by external warmth. Thirst for small sips of water at frequent intervals.",
    "modalitiesKeynotes": "Aggravation: 1 AM to 2 AM; cold air, cold drinks, wet weather, sea bathing. Amelioration: Warmth in general, hot drinks, elevated head, moving about.",
    "complementary": "All-c., Carb-v., Phos., Pyrog., Rhus-t., Thuj.",
    "antidotes": "Camph., Chin., Ferr., Hep., Ipec., Nux-v., Tab.",
    "followsWell": "Bell., Calc., Lyc., Nux-v., Phos., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "Sec.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Profound mental anguish with pacing or tossing. Great fear of death; believes medicine is useless and that demise is imminent. Fastidious to the highest degree; pictures crooked on the wall disturb the patient."
      },
      {
        "section": "Generals",
        "content": "Rapid sinking of vital force; prostration out of all proportion to symptoms. Burning pains relieved by heat (except head which is relieved by cold air/applications). Periodic complaints, especially every year or midnight."
      },
      {
        "section": "Stomach",
        "content": "Intense burning gastralgia. Cannot tolerate the smell or sight of food. Thirst unquenchable for sips of warm or cold water, but cold water is immediately vomited as soon as it reaches the stomach."
      },
      {
        "section": "Modalities",
        "content": "Worse midnight (12-2 AM), cold drinks, cold air, decaying food. Better from warm applications, heat of stove, hot drinks, sweet consoling company."
      }
    ]
  },
  {
    "remedyNumber": 2,
    "name": "Aconitum napellus",
    "abbreviation": "acon.",
    "commonName": "Monk's Hood",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Sudden violent storm of acute illness from dry cold wind, intense panicky fear of death, high fever, flushed face turning pale on rising.",
    "mindKeynotes": "Sudden intense fear; predicts the very day and hour of death. Frantic tossing about with anxiety. Panicked restless agony. Music is unbearable.",
    "generalsKeynotes": "Sudden onset within hours of exposure to dry cold wind. High inflammatory fever with hot, dry skin. Thirst for large quantities of cold water. Burning heat in internal parts.",
    "modalitiesKeynotes": "Aggravation: Evening and night; warm room, rising from bed (faints/dizzy), lying on affected side, dry cold wind. Amelioration: Open fresh air, repose.",
    "complementary": "Arn., Coff., Sulph.",
    "antidotes": "Acet-ac., Bell., Cham., Coff., Nux-v., Vinum.",
    "followsWell": "Bell., Bry., Hep., Ipec., Merc., Puls., Rhus-t., Sep., Spong., Sulph.",
    "inimical": "None marked.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Great fear and anxiety of mind, with great nervous excitability. Predicts the day and hour of death. Restless agony, tosses about in bed. Phobia of crowds, crossing streets."
      },
      {
        "section": "Fever",
        "content": "First stage of acute inflammatory fevers. Skin dry and burning hot. Face red, or one cheek red and the other pale; on sitting up, the red face becomes deathly pale."
      },
      {
        "section": "Modalities",
        "content": "Worse warm room, evening and around midnight, lying on left side. Better in open air and quiet rest."
      }
    ]
  },
  {
    "remedyNumber": 3,
    "name": "Belladonna",
    "abbreviation": "bell.",
    "commonName": "Deadly Nightshade",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Violent vascular surges, throbbing carotid arteries, fiery redness, dilated pupils, delirium with biting and striking, right-sided acute attacks.",
    "mindKeynotes": "Wild furious delirium; bites, strikes, tears clothes. Hallucinations of black dogs, spectres, monsters. Sensitive to slightest light, noise, touch, or jar.",
    "generalsKeynotes": "Sudden violent onset and sudden departure. Radiant burning heat emanating from the body. Throbbing carotids. Marked right-sided affinity.",
    "modalitiesKeynotes": "Aggravation: 3 PM; jarring, light, noise, motion, drafts, cold hair-cutting, lying down. Amelioration: Semi-erect posture, bending backward, quiet warm room.",
    "complementary": "Calc., Calc-p.",
    "antidotes": "Camph., Coff., Hep., Hyos., Op., Puls., Vinum.",
    "followsWell": "Calc., Chin., Con., Dulc., Hep., Hyos., Lach., Rhus-t., Seneg., Stram., Valer.",
    "inimical": "Acet-ac., Dulc.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Acute mania with furious delirium; patient screams, bites, spits, strikes out. Fear of imaginary things, sees ghosts and strange beasts on closing eyes."
      },
      {
        "section": "Head",
        "content": "Throbbing violent congestive headache, temporal arteries visibly pulsation. Pain worse from walking, stooping, light, noise, jarring of bed."
      },
      {
        "section": "Throat",
        "content": "Fauces fiery red, swollen, glazed, dry. Sensation of constriction; difficult swallowing, especially liquids which regurgitate through the nose."
      }
    ]
  },
  {
    "remedyNumber": 4,
    "name": "Bryonia alba",
    "abbreviation": "bry.",
    "commonName": "Wild Hops / White Bryony",
    "kingdom": "Plant",
    "miasm": "Psora / Sycosis",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Extreme aggravation from slightest motion, amelioration from firm pressure and lying on painful side, profound dryness of mucous membranes with thirst for large gulps.",
    "mindKeynotes": "Irritable, wants to be left completely alone. Desires things which are rejected when offered. Business delirium: talks incessantly of business matters, desires to go home.",
    "generalsKeynotes": "Affection of serous membranes and joints. Stitching, sharp tearing pains worse from slightest movement, even breathing. Dryness everywhere: lips parched, stool dry hard burnt.",
    "modalitiesKeynotes": "Aggravation: 9 PM; any motion whatsoever, exertion, warm room, rising up. Amelioration: Absolute rest, firm pressure, lying on painful side, cold things.",
    "complementary": "Alum., Rhus-t.",
    "antidotes": "Acon., Alum., Camph., Cham., Clem., Coff., Ign., Mur-ac., Nux-v., Puls., Rhus-t., Seneg.",
    "followsWell": "Alum., Bell., Calc., Con., Hyos., Kali-c., Lyc., Merc., Nux-v., Phos., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Extremely taciturn, morose, irritable. Delirium: constantly busy with day's work, worries about financial solvency and wants to go home even when in bed."
      },
      {
        "section": "Chest & Cough",
        "content": "Dry hacking painful cough. Must hold chest with both hands to prevent motion while coughing. Stitching pleural pains worse on inspiration."
      },
      {
        "section": "Modalities",
        "content": "Worse motion, touch, warmth, morning on first moving. Better lying completely still on the painful side, pressure, bandage."
      }
    ]
  },
  {
    "remedyNumber": 5,
    "name": "Calcarea carbonica",
    "abbreviation": "calc.",
    "commonName": "Calcium Carbonate / Oyster Shell",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Cold, damp, fair, flabby constitution; sour profuse head sweat soaking pillow; craves boiled eggs; fears insanity and infectious diseases.",
    "mindKeynotes": "Fears others will notice their mental confusion or insanity. Fear of darkness, high places, mice, contagious infections. Sluggish, easily fatigued mentally.",
    "generalsKeynotes": "Chilly, damp cold feet as if wearing wet stockings. Profuse sweat on head, particularly occiput during sleep. Tendency to obesity and glandular enlargement.",
    "modalitiesKeynotes": "Aggravation: Cold, damp air; ascending stairs, physical exertion, full moon, milk. Amelioration: Dry weather, lying on painful side, constipation (feels better when constipated).",
    "complementary": "Bell., Cupr., Rhus-t.",
    "antidotes": "Camph., Nit-ac., Nux-v., Sulph.",
    "followsWell": "Bell., Lyc., Nux-v., Phos., Puls., Sil., Sulph.",
    "inimical": "Bry.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Anxious anticipation; apprehension that something dreadful will happen. Despair of health, fears losing reason or being judged insane."
      },
      {
        "section": "Generals",
        "content": "Leucophlegmatic temperament. Coldness of single parts. Cold damp feet. Cravings for soft boiled eggs, indigestible things like chalk, earth, pencils."
      },
      {
        "section": "Head & Sleep",
        "content": "Profuse perspiration of the head, especially nape of neck and scalp in sleep, wetting pillow all around. Fontanelles open long."
      }
    ]
  },
  {
    "remedyNumber": 6,
    "name": "Chamomilla",
    "abbreviation": "cham.",
    "commonName": "German Chamomile",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Unbearable hyperesthetic pain driving patient frantic, irritable angry child demanding to be carried constantly, one cheek red and hot, the other pale and cold.",
    "mindKeynotes": "Extreme irritability, uncivil, snappish. Demands something and throws it away angrily when given. Child is only quieted when carried around continuously.",
    "generalsKeynotes": "Oversensitiveness to pain, which seems utterly out of proportion. Warm sweat on head during sleep. One cheek red and hot, the other pale and cold.",
    "modalitiesKeynotes": "Aggravation: 9 PM to midnight; anger, open air, wind, coffee, narcotics. Amelioration: Being carried, warm wet weather, fasting.",
    "complementary": "Bell., Mag-c.",
    "antidotes": "Acon., Alum., Bor., Camph., Cocc., Coff., Coloc., Con., Ign., Nux-v., Puls.",
    "followsWell": "Bell., Bry., Cact., Calc., Merc., Nux-v., Puls., Rhus-t., Sep., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Whining restlessness; child wants this and that, but when offered, refuses or pushes it away violently. Spiteful, snappish, impatient with agony."
      },
      {
        "section": "Stool & Dentition",
        "content": "Difficult dentition with diarrhea resembling chopped spinach or rotten eggs. Green watery stool with colic."
      }
    ]
  },
  {
    "remedyNumber": 7,
    "name": "Cinchona officinalis",
    "abbreviation": "chin.",
    "commonName": "Peruvian Bark / Quinine",
    "kingdom": "Plant",
    "miasm": "Psora / Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Debility from loss of vital fluids (hemorrhage, diarrhea, lactation), tympanitic abdominal distension not relieved by eructations, periodic fevers.",
    "mindKeynotes": "Apathetic, indifferent, taciturn. Builds air castles in mind at night. Irritable, hypersensitive to noise and light.",
    "generalsKeynotes": "Profound exhaustion from loss of blood, seminal fluid, or prolonged diarrhea. Hyperesthesia: touch of skin is excruciating, but firm hard pressure relieves.",
    "modalitiesKeynotes": "Aggravation: Slightest touch, draft of air, loss of fluids, every other day. Amelioration: Hard pressure, bending double, warmth.",
    "complementary": "Ferr., Calc-p.",
    "antidotes": "Arn., Ars., Bell., Calc., Carb-v., Ferr., Hep., Ipec., Laches., Nat-m., Nux-v., Puls., Sep., Sulph.",
    "followsWell": "Ars., Bell., Calc., Carb-v., Ferr., Phos., Puls., Sep., Sulph.",
    "inimical": "Dig., Led.",
    "materiaMedica": [
      {
        "section": "Abdomen",
        "content": "Tympanitic bloated abdomen; sensation as if abdomen were packed full. Eructations give no relief. Gallstone colic, flatulent dyspepsia."
      },
      {
        "section": "Fever & Periodicity",
        "content": "Intermittent fevers with clockwork regularity. Drenching debilitating perspiration following heat. Thirst during sweat, but thirstless during chill."
      }
    ]
  },
  {
    "remedyNumber": 8,
    "name": "Gelsemium sempervirens",
    "abbreviation": "gels.",
    "commonName": "Yellow Jasmine",
    "kingdom": "Plant",
    "miasm": "Psora / Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "The 4 D's: Dizziness, Drowsiness, Dullness, Drooping eyelids. Anticipatory diarrhea before examinations, motor paralysis, absence of thirst with fever.",
    "mindKeynotes": "Anticipatory anxiety: diarrhea from bad news, stage fright, or upcoming exams. Mental sluggishness, wants to lie down and be quiet.",
    "generalsKeynotes": "Heavy drooping eyelids, heavy head, heavy trembling limbs. Muscular weakness and lack of coordination. Total thirstlessness during fever.",
    "modalitiesKeynotes": "Aggravation: Damp weather, fog, before a thunderstorm, emotions, anticipation. Amelioration: Profuse urination, bending forward, open air, continuous motion.",
    "complementary": "Bapt., Sep.",
    "antidotes": "Atrop., Chin., Coff., Dig., Nux-v., Salt.",
    "followsWell": "Bapt., Cact., Caul., Ipec., Nux-v., Rhus-t., Sep.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Head & Eyes",
        "content": "Occipital headache extending over vertex to forehead and settling in eyeballs. Ptosis: heavy eyelids droop so patient cannot keep them open. Vision blurred or double."
      },
      {
        "section": "Generals",
        "content": "Trembling of limbs and whole body from nervous weakness. Deep exhaustion, pulse soft and slow. Copious clear urination relieves the headache."
      }
    ]
  },
  {
    "remedyNumber": 9,
    "name": "Hepar sulphuris calcareum",
    "abbreviation": "hep.",
    "commonName": "Hahnemann's Calcium Sulphide",
    "kingdom": "Mineral",
    "miasm": "Syphilitic / Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Hypersensitive to cold drafts and pain, violent impulses, splinter-like sticking pains, tendency to suppuration with foul cheese-like odor.",
    "mindKeynotes": "Violent, abusive, enraged by minor contradictions; impulse to set fire to things or stab. Hyper-irritable.",
    "generalsKeynotes": "Extremely chilly, sensitive to open air; cannot uncover even a hand or foot without catching cold or coughing. Splinter-like stitching pains.",
    "modalitiesKeynotes": "Aggravation: Cold dry wind, drafts, touching parts, uncovering. Amelioration: Warmth in general, wrapping head warmly, damp weather.",
    "complementary": "Calend., Sil.",
    "antidotes": "Ars., Bell., Cham., Sil.",
    "followsWell": "Bell., Bry., Lach., Nit-ac., Rhus-t., Sil., Spong., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Throat & Skin",
        "content": "Sticking pain in throat like a fishbone or splinter, extending to ears on swallowing. Tendency to form pus everywhere; offensive odor like old cheese."
      },
      {
        "section": "Respiratory",
        "content": "Croupy barking cough from uncovering or exposure to cold dry north wind. Rattling suffocative cough with hoarseness."
      }
    ]
  },
  {
    "remedyNumber": 10,
    "name": "Ignatia amara",
    "abbreviation": "ign.",
    "commonName": "St. Ignatius Bean",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": true,
    "shortDescription": "Acute grief, silent brooding with involuntary deep sighing, globus hystericus, paradoxical and contradictory clinical symptoms.",
    "mindKeynotes": "Silent grief, weeping in secret, sighing deeply and repeatedly. Mood swings between laughter and sobbing. Intolerant of consolation.",
    "generalsKeynotes": "Contradictory symptoms: sore throat better swallowing solids, headache relieved by bending head down, cough worse the more one coughs.",
    "modalitiesKeynotes": "Aggravation: Emotional upset, grief, tobacco smoke, coffee, consolation. Amelioration: Changing position, eating solid foods, swallowing.",
    "complementary": "Nat-m., Ph-ac.",
    "antidotes": "Arn., Camph., Cham., Cocc., Coff., Nux-v., Puls., Zinc.",
    "followsWell": "Bell., Calc., Chin., Lyc., Nat-m., Nux-v., Puls., Rhus-t., Sep., Sulph., Zinc.",
    "inimical": "Coff., Nux-v., Tab.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Ailments from disappointed love, sudden bereavement, or mortification. Involuntary spasmodic sighing, globus hystericus in throat."
      },
      {
        "section": "Modalities",
        "content": "Worse contact, coffee, tobacco, 11 AM. Better lying on the painful side, swallowing hard food, deep inspiration."
      }
    ]
  },
  {
    "remedyNumber": 11,
    "name": "Lachesis muta",
    "abbreviation": "lach.",
    "commonName": "Bushmaster Snake Venom",
    "kingdom": "Animal",
    "miasm": "Syphilis / Psora",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Left-sided complaints progressing to right, extreme intolerance to tight neckbands/waistbands, sleeps into aggravation, suspicious jealousy, loquacity.",
    "mindKeynotes": "Extreme loquacity, jumps rapidly from topic to topic. Pathological jealousy and suspicion. Religious melancholy with fear of damnation.",
    "generalsKeynotes": "Aggravation after sleep: 'sleeps into an aggravation'. Cannot bear anything tight around neck, waist, or wrists. Bluish-purplish congested skin and lesions.",
    "modalitiesKeynotes": "Aggravation: After sleep, morning, touch, pressure, left side, warm bath, spring, suppressed discharges. Amelioration: Appearance of discharges (menstrual flow, nosebleed), cold drinks.",
    "complementary": "Hep., Lyc., Nit-ac.",
    "antidotes": "Alum., Ars., Bell., Camph., Cham., Coff., Hep., Merc., Nit-ac., Nux-v., Phos.",
    "followsWell": "Ars., Bell., Carb-v., Graph., Hep., Hyos., Kali-bi., Lyc., Nit-ac., Phos., Puls., Sil., Sulph.",
    "inimical": "Am-c., Dulc., Nit-ac., Psor., Sep.",
    "materiaMedica": [
      {
        "section": "Mind & Sleep",
        "content": "Rapid, hurried speech with changing themes. Jealousy without foundation. Awakens suffocating or terrified; dreads going to sleep."
      },
      {
        "section": "Throat & Neck",
        "content": "Left tonsil swollen, purplish, spreading to right. Extreme hypersensitivity to neck touch; cannot tolerate a collar or scarf."
      }
    ]
  },
  {
    "remedyNumber": 12,
    "name": "Lycopodium clavatum",
    "abbreviation": "lyc.",
    "commonName": "Club Moss",
    "kingdom": "Plant",
    "miasm": "Psora / Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Right-sided complaints extending to left, 4 PM to 8 PM aggravation, deep bloating after a few mouthfuls, craving for warm drinks and sweets, anticipatory anxiety with secret cowardice.",
    "mindKeynotes": "Lack of self-confidence yet tyrannical at home and servile to superiors. Dread of undertaking tasks or public speaking, yet performs well once begun.",
    "generalsKeynotes": "Right to left direction of symptoms. Aggravation strictly from 4 PM to 8 PM. Gas and flatulence: hungry, but full after two bites. Fan-like flapping of alae nasi in pneumonia.",
    "modalitiesKeynotes": "Aggravation: 4 PM to 8 PM; right side, cold food and drinks, warmth of bed, tight clothes. Amelioration: Warm drinks, open air, motion, unfastening garments.",
    "complementary": "Iod., Chel., Ign., Puls.",
    "antidotes": "Acon., Camph., Caust., Cham., Chin., Coff., Graph., Nux-v., Puls.",
    "followsWell": "Bell., Bry., Calc., Carb-v., Graph., Hep., Hyos., Ign., Lach., Led., Merc., Nux-v., Phos., Puls., Rhus-t., Sep., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Gastrointestinal",
        "content": "Excessive flatulence, bloating of lower abdomen immediately after eating; fermentation with rumbling. Craves warm drinks, sweets, and pastries."
      },
      {
        "section": "Urinary",
        "content": "Red sand in urine (lithic acid crystals). Child cries before urinating due to gravel pain. Right renal colic."
      }
    ]
  },
  {
    "remedyNumber": 13,
    "name": "Mercurius solubilis",
    "abbreviation": "merc.",
    "commonName": "Quicksilver / Hahnemann's Soluble Mercury",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Ambithermal",
    "isPolycrest": true,
    "shortDescription": "Human thermometer (aggravated by both heat and cold), profuse night sweats that give no relief, flabby indented tongue, metallic taste, offensive breath.",
    "mindKeynotes": "Hurried in speech and actions, restless, suspicious. Loss of memory, stammering. Trembling of hands and tongue under observation.",
    "generalsKeynotes": "Sensitive to both cold and heat. Nightly aggravation of bone and joint pains. Copious foul secretions: saliva, sweat, stool with tenesmus ('never-get-done' sensation).",
    "modalitiesKeynotes": "Aggravation: Night, warmth of bed, cold damp weather, drafts, sweating. Amelioration: Moderate temperature, rest, morning.",
    "complementary": "Bad., Bell., Hep., Sil.",
    "antidotes": "Asaf., Aur., Bell., Calc., Carb-v., Chin., Ferr., Guai., Hep., Iod., Kali-i., Lach., Mez., Nit-ac., Phyt., Sars., Staph., Sulph.",
    "followsWell": "Bell., Bry., Calc., Chin., Dulc., Hep., Lach., Lyc., Nit-ac., Phos., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "Sil.",
    "materiaMedica": [
      {
        "section": "Mouth & Saliva",
        "content": "Heavy, swollen, flabby tongue showing imprint of teeth along edges. Profuse drooling in sleep wetting pillow. Metallic coppery taste, fetid breath."
      },
      {
        "section": "Generals",
        "content": "Profuse perspiration accompanying all complaints, which brings no relief whatever but weakens the patient. Trembling of extremities."
      }
    ]
  },
  {
    "remedyNumber": 14,
    "name": "Natrum muriaticum",
    "abbreviation": "nat-m.",
    "commonName": "Sodium Chloride / Common Salt",
    "kingdom": "Mineral",
    "miasm": "Sycosis / Psora",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Silent grief with resentment, dwelling on past disagreeable events, aggravation from sun and 10 AM, consolation agg, cracked lower lip, salt craving.",
    "mindKeynotes": "Brooding over past grievances; cannot cry before others. Consolation aggravates, making patient furious. Aversion to company yet afraid in crowd.",
    "generalsKeynotes": "Worse 10 AM to 11 AM; worse sun and heat. Craving for salt and salty foods. Emaciation, especially noticeable around the neck and throat. Geographic tongue.",
    "modalitiesKeynotes": "Aggravation: 10 AM; sun exposure, seashore, mental exertion, consolation, lying down. Amelioration: Open air, cold bathing, fasting, lying on right side.",
    "complementary": "Apis, Ign., Sep.",
    "antidotes": "Ars., Camph., Nit-s-d., Phos., Spig.",
    "followsWell": "Apis, Bell., Bry., Calc., Ferr-p., Hep., Kali-m., Kali-p., Lyc., Nux-v., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Weeps bitterly when alone, but if anyone attempts consolation, becomes enraged. Reserved, dignified, harbors deep grudge for years."
      },
      {
        "section": "Head",
        "content": "Throbbing blinding burst headache, starts in morning, peaks around noon with sun, subsides at sunset. Sensation of tiny hammers beating in forehead."
      },
      {
        "section": "Face & Lips",
        "content": "Deep crack in the middle of lower lip. Herpetic eruptions around mouth and wings of nose. Oily greasy skin."
      }
    ]
  },
  {
    "remedyNumber": 15,
    "name": "Nux vomica",
    "abbreviation": "nux-v.",
    "commonName": "Poison Nut",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Sedentary, ambitious, hyper-irritable workaholic addicted to stimulants; ineffectual urging for stool; intensely chilly, cannot uncover in the slightest.",
    "mindKeynotes": "Fiery, choleric, impatient, fault-finding, quarrelsome. Can bear neither noise, odors, light, nor contradiction. Workaholic driven by ambition.",
    "generalsKeynotes": "Extreme chilliness: drafts make skin crawl with gooseflesh. Ineffectual urging to stool ('passes a little, wants to pass more, feels unfinished').",
    "modalitiesKeynotes": "Aggravation: Morning (wakes at 3-4 AM brooding); cold open air, drafts, stimulants, high-seasoned food, overeating. Amelioration: Free bowel movement, warmth, damp wet weather, short nap.",
    "complementary": "Kali-c., Phos., Sep.",
    "antidotes": "Acon., Bell., Camph., Cham., Cocc., Coff., Ign., Op., Puls., Stram.",
    "followsWell": "Bry., Calc., Carb-v., Kali-c., Lyc., Phos., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "Zinc.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Intolerant of the slightest delay or opposition. High-strung nervous temperament, abuses coffee, alcohol, sedatives, and rich spices."
      },
      {
        "section": "Gastrointestinal",
        "content": "Dyspepsia from sedentary habits. Constant ineffectual desire for stool; feels relieved temporarily after passing small amount."
      },
      {
        "section": "Sleep",
        "content": "Falls asleep early on sofa, awakens at 3 AM with active rush of work thoughts, falls asleep again around daybreak and awakens tired and unrefreshed."
      }
    ]
  },
  {
    "remedyNumber": 16,
    "name": "Phosphorus",
    "abbreviation": "phos.",
    "commonName": "Elemental Phosphorus",
    "kingdom": "Mineral",
    "miasm": "Tubercular / Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Tall, slender, open, clairvoyant, affectionate; fears thunderstorm, dark, illness; craves ice-cold drinks; tendency to painless hemorrhages.",
    "mindKeynotes": "Affectionate, sympathetic, needs human warmth and reassurance. Fear of dark, being alone, twilight, ghosts, thunderstorms. Easily hypnotized.",
    "generalsKeynotes": "Desire for ice-cold water, ice cream, spicy and salty food. Cold water warms up in stomach and is vomited 15-20 minutes later. Bright red hemorrhages from mucous membranes.",
    "modalitiesKeynotes": "Aggravation: Twilight, lying on left side, thunderstorms, physical/mental exertion. Amelioration: Cold food and drinks, sleep, rubbing, being magnetized.",
    "complementary": "Ars., Cepa, Lyc., Sep.",
    "antidotes": "Camph., Coff., Nux-v., Ter.",
    "followsWell": "Ars., Bell., Bry., Calc., Carb-v., Chin., Kali-c., Lyc., Nux-v., Puls., Rhus-t., Sep., Sil., Sulph.",
    "inimical": "Caust.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Magnetic personality, exuberant, open-hearted, easily frightened in the dark. Clairvoyant states, fear when alone in twilight."
      },
      {
        "section": "Respiratory",
        "content": "Oppression of chest with burning sensation behind sternum. Larynx painful, hoarseness worse evening. Cannot speak due to violent tickling."
      },
      {
        "section": "Hemorrhages",
        "content": "Small wounds bleed profusely. Epistaxis instead of menses; petechiae and purpuric spots."
      }
    ]
  },
  {
    "remedyNumber": 17,
    "name": "Pulsatilla pratensis",
    "abbreviation": "puls.",
    "commonName": "Wind Flower / Pasque Flower",
    "kingdom": "Plant",
    "miasm": "Psora / Sycosis",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Gentle, yielding, weeping disposition craving consolation; warm blooded, thrives in cool open air; total thirstlessness with dry mouth; shifting wandering pains.",
    "mindKeynotes": "Mild, tearful, easily weeps while recounting symptoms. Desires sympathy, consolation, and affection. Easily influenced by others.",
    "generalsKeynotes": "Warm patient, intolerant of warm stuffy rooms. Symptoms constantly changing and shifting from joint to joint. Absence of thirst in nearly all complaints.",
    "modalitiesKeynotes": "Aggravation: Warm room, rich greasy foods, evening, twilight, resting. Amelioration: Open fresh cool air, walking slowly, cold applications, consolation.",
    "complementary": "Arg-n., Kali-m., Kali-s., Lyc., Sil., Sulph.",
    "antidotes": "Cham., Coff., Ign., Nux-v.",
    "followsWell": "Ars., Bell., Bry., Calc., Ign., Kali-bi., Lyc., Nux-v., Phos., Rhus-t., Sep., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Weeps easily and seeks comfort. Yielding, gentle, changeable emotional temperament. Dread of opposite sex, religious scruples."
      },
      {
        "section": "Discharges",
        "content": "Bland, thick, yellowish-green mucus discharges from nose, eyes, vagina, and bronchi without excoriation."
      },
      {
        "section": "Stomach",
        "content": "Aversion to fatty foods, butter, pork; complete thirstlessness even with high fever and parched dry lips."
      }
    ]
  },
  {
    "remedyNumber": 18,
    "name": "Rhus toxicodendron",
    "abbreviation": "rhus-t.",
    "commonName": "Poison Ivy",
    "kingdom": "Plant",
    "miasm": "Psora / Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Restlessness with physical stiffness; worse on beginning motion, better with continued motion and heat; red triangular tip of tongue; skin vesicles.",
    "mindKeynotes": "Anxious, depressed, restless; must constantly shift position in bed to find ease. Apprehension worse at night, thoughts of suicide by drowning.",
    "generalsKeynotes": "Ailments from sprains, over-lifting, getting wet while overheated. Lameness and stiffness: worse first motion, ameliorated by continuous movement and heat.",
    "modalitiesKeynotes": "Aggravation: First motion, cold damp weather, resting, night. Amelioration: Continued motion, walking about, warm dry weather, hot bathing, massage.",
    "complementary": "Bry., Calc-f., Med., Phos.",
    "antidotes": "Anac., Bell., Bry., Camph., Croton., Graph., Grind., Kali-p., Ran-b., Sang., Sulph.",
    "followsWell": "Ars., Bell., Bry., Calc., Cact., Con., Merc., Nux-v., Phos., Puls., Sep., Sulph.",
    "inimical": "Apis.",
    "materiaMedica": [
      {
        "section": "Extremities & Back",
        "content": "Lumbago and stiffness of joints. Patient gets out of chair with great difficulty and pain, but after walking a few paces, moves freely and easily."
      },
      {
        "section": "Tongue & Skin",
        "content": "Tongue coated white with a clean, red triangular tip. Vesicular eruptions with burning, itching, and red swollen base."
      }
    ]
  },
  {
    "remedyNumber": 19,
    "name": "Sepia officinalis",
    "abbreviation": "sep.",
    "commonName": "Cuttlefish Inky Juice",
    "kingdom": "Animal",
    "miasm": "Sycosis / Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Indifference to loved ones and occupations, bearing-down pelvic sensation, yellow saddle across nose, amelioration from vigorous exertion/aerobics.",
    "mindKeynotes": "Indifference to family, children, and dearest friends. Aversion to sympathy. Irritable, easily offended, seeks solitude to weep.",
    "generalsKeynotes": "Bearing-down sensation in pelvic organs as if contents would protrude from vagina; crosses legs tightly to prevent prolapse. Chilly, poor venous circulation.",
    "modalitiesKeynotes": "Aggravation: Morning, evening, cold air, laundry work, before thunderstorms. Amelioration: Violent exercise, dancing, running, warm bed, crossing legs.",
    "complementary": "Nat-m., Phos., Sabin.",
    "antidotes": "Acon., Ant-c., Ant-t., Bell., Bov., Calc., Chin., Merc., Rhus-t., Sulph., Tart-e.",
    "followsWell": "Bell., Bry., Calc., Caust., Graph., Lyc., Nat-m., Nux-v., Phos., Puls., Rhus-t., Sil., Sulph.",
    "inimical": "Bry., Lach.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Profound emotional burnout and apathy toward spouse and children. Depressed, weeps when asked about illness, desires solitude."
      },
      {
        "section": "Pelvis & Face",
        "content": "Prolapse sensation, must sit with legs crossed. Yellow-brown chloasma across bridge of nose and cheeks forming a distinct 'saddle'."
      }
    ]
  },
  {
    "remedyNumber": 20,
    "name": "Silicea",
    "abbreviation": "sil.",
    "commonName": "Pure Flint / Silica",
    "kingdom": "Mineral",
    "miasm": "Syphilitic / Tubercular",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Grit lacking in mind and spine; yielding yet obstinate; chilly, wrapping up warmly; offensive foot sweat; expels foreign bodies; suppurations.",
    "mindKeynotes": "Lack of confidence, stage fright, fear of pins and sharp needles. Yielding and gentle, yet holds obstinately to fixed opinions.",
    "generalsKeynotes": "Extreme chilliness: hugs the radiator, must wrap head warmly even in summer. Offensive sour sweat on feet. Glands enlarged and indurated.",
    "modalitiesKeynotes": "Aggravation: Cold, drafts, uncovering head, damp weather, new moon. Amelioration: Warm wraps around head, heat, summer.",
    "complementary": "Fl-ac., Puls., Thuj.",
    "antidotes": "Camph., Fl-ac., Hep.",
    "followsWell": "Bell., Calc., Fl-ac., Hep., Lach., Lyc., Nux-v., Phos., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "Merc.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Promotes expulsion of foreign splinters, needles, and fishbones from tissues. Chronic suppurations that refuse to heal."
      },
      {
        "section": "Feet & Head",
        "content": "Offensive, excoriating foot perspiration; suppression of foot sweat causes headaches. Headache begins in nape of neck and ascends over vertex to right eye."
      }
    ]
  },
  {
    "remedyNumber": 21,
    "name": "Sulphur",
    "abbreviation": "sulph.",
    "commonName": "Brimstone / Sublimed Sulphur",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "The ragged philosopher; burning hot feet sticking out of bed at night; 11 AM emptiness in stomach; aversion to bathing; itching worse heat.",
    "mindKeynotes": "Intellectual, philosophical, theorizes constantly; untidy, ragged clothes seem beautiful to him. Selfish, lazy, critical of others.",
    "generalsKeynotes": "Hot patient: burns everywhere (palms, soles, vertex). Sticks feet out of bedclothes at night to cool them. Sinking faint empty sensation in epigastrium at 11 AM.",
    "modalitiesKeynotes": "Aggravation: 11 AM, warmth of bed, bathing, standing still, wool clothing. Amelioration: Dry warm weather, open air, moving.",
    "complementary": "Acon., Aloe, Nux-v., Psor., Pyrog.",
    "antidotes": "Acon., Camph., Cham., Chin., Merc., Nux-v., Puls., Rhus-t., Sep.",
    "followsWell": "Acon., Bell., Bry., Calc., Lyc., Merc., Nux-v., Phos., Puls., Rhus-t., Sars., Sep., Sil.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Skin",
        "content": "Voluptuous itching: scratching feels delicious, followed by burning and soreness. Worse from heat of bed and washing. Eczema, psoriasis."
      },
      {
        "section": "Stomach & Rectum",
        "content": "Weak sinking feeling at 11 AM, cannot wait for lunch. Early morning diarrhea driving out of bed at 5 AM with hurry."
      }
    ]
  },
  {
    "remedyNumber": 22,
    "name": "Thuja occidentalis",
    "abbreviation": "thuj.",
    "commonName": "Arbor Vitae / Tree of Life",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "King of sycosis; warts, condylomata, and fig-warts; fixed ideas (body is made of glass, living animal in abdomen); ill effects of vaccination.",
    "mindKeynotes": "Fixed delusions: limbs are made of glass and will break, something alive in abdomen, someone walks beside them. Emotional sensitivity to music.",
    "generalsKeynotes": "Proliferation of skin tags, cauliflower warts, condylomata. Greasy shiny skin on face. Perspiration smells sweet like honey or burnt horn.",
    "modalitiesKeynotes": "Aggravation: 3 AM and 3 PM; cold damp weather, vaccination, tea, onions. Amelioration: Warmth, open air, drawing up limbs.",
    "complementary": "Med., Nat-s., Sil.",
    "antidotes": "Cham., Cocc., Merc., Puls., Sulph.",
    "followsWell": "Calc., Ign., Kali-c., Lyc., Merc., Nat-s., Nit-ac., Phos., Puls., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Delusion that body is fragile and brittle as glass, or that soul is separated from body. Secretive, feels under superhuman control."
      },
      {
        "section": "Skin & Warts",
        "content": "Warty excrescences, peduncular, spongy, bleeding easily. Warts on hands, eyelids, genitals. Brown spots on abdomen."
      }
    ]
  },
  {
    "remedyNumber": 23,
    "name": "Apis mellifica",
    "abbreviation": "apis",
    "commonName": "Honey Bee",
    "kingdom": "Animal",
    "miasm": "Psora / Sycosis",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Stinging, burning pains like bee stings; bag-like puffy edema under lower eyelids; extreme thirstlessness; aggravated by heat, relieved by cold applications.",
    "mindKeynotes": "Restless, jealous, irritable; drops things from hands due to awkwardness. Whining, crying out suddenly in sleep (cri hydrocephalique).",
    "generalsKeynotes": "Dropsical swelling with pinkish-red hue. Burning, stinging pains that make patient cry out. Thirstless in almost all complaints.",
    "modalitiesKeynotes": "Aggravation: Heat, warm room, hot bath, 3 PM to 5 PM, touch. Amelioration: Cold water, cold bathing, uncovering, open air.",
    "complementary": "Nat-m.",
    "antidotes": "Canth., Carb-ac., Chin., Dig., Ip., Lach., Led., Nat-m.",
    "followsWell": "Graph., Hep., Kali-bi., Lyc., Merc., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "Rhus-t.",
    "materiaMedica": [
      {
        "section": "Eyes & Face",
        "content": "Edema of lower eyelids hanging like transparent water bags. Chemosis of conjunctiva. Face swollen, hot, red."
      },
      {
        "section": "Urinary",
        "content": "Urine scanty, high-colored, burning and stinging on passage. Incontinence with sudden urge."
      }
    ]
  },
  {
    "remedyNumber": 24,
    "name": "Arnica montana",
    "abbreviation": "arn.",
    "commonName": "Leopard's Bane / Mountain Arnica",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Sore bruised feeling all over, bed feels too hard, claims 'nothing is wrong with me' when gravely injured, ecchymoses from trauma.",
    "mindKeynotes": "Claims she is well and sends doctor away despite critical injury. Fear of being approached or touched because parts are so tender.",
    "generalsKeynotes": "Trauma, contusions, extravasation of blood. Sensation as if bruised and beaten. Head hot with body and limbs cold.",
    "modalitiesKeynotes": "Aggravation: Touch, motion, damp cold, rest. Amelioration: Lying down with head low, outstretching limbs.",
    "complementary": "Acon., Hyper., Rhus-t., Sul-ac.",
    "antidotes": "Camph., Ign., Ipec.",
    "followsWell": "Acon., Bell., Bry., Calc., Con., Hep., Hyper., Ipec., Rhus-t., Ruta, Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Indispensable in physical trauma, shock, sprains, concussion, and muscular soreness after strenuous physical exertion."
      },
      {
        "section": "Bed Sensation",
        "content": "The bed feels too hard no matter how soft; patient shifts from side to side seeking a comfortable spot."
      }
    ]
  },
  {
    "remedyNumber": 25,
    "name": "Aurum metallicum",
    "abbreviation": "aur.",
    "commonName": "Metallic Gold",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Profound suicidal melancholia with relief from thoughts of jumping from a height; deep bone pains worse at night; high blood pressure.",
    "mindKeynotes": "Deep depression, disgust of life; suicidal impulses, wants to jump from high windows. High sense of duty, guilt over neglected obligations.",
    "generalsKeynotes": "Boring nocturnal bone pains, especially cranial and nasal bones. Arterial hypertension with vascular fullness.",
    "modalitiesKeynotes": "Aggravation: Night (sunset to sunrise), cold winter weather, mental exertion. Amelioration: Music, warmth, open air, walking outdoors.",
    "complementary": "Syph.",
    "antidotes": "Bell., Chin., Cocc., Coff., Cupr., Merc., Sol-n., Spig.",
    "followsWell": "Bell., Calc., Chin., Lyc., Merc., Nit-ac., Phos., Puls., Sep., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Relentless self-condemnation and despair. Yearns for death as a release; thoughts of suicide by jumping. Ameliorated by listening to classical music."
      },
      {
        "section": "Cardiovascular",
        "content": "Violent palpitation with feeling as if heart had stopped beating, then suddenly gave a tremendous thump."
      }
    ]
  },
  {
    "remedyNumber": 26,
    "name": "Causticum",
    "abbreviation": "caust.",
    "commonName": "Hahnemann's Tinctura Acris Sine Kali",
    "kingdom": "Mineral",
    "miasm": "Sycosis / Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Intense sympathy for others' suffering; progressive paralysis of vocal cords and bladder; involuntary urination when coughing; better in damp wet weather.",
    "mindKeynotes": "Deeply compassionate, champion of social justice, cannot bear to see injustice or cruelty. Weeps over misfortune of others.",
    "generalsKeynotes": "Local paralyses (ptosises, facial Bell's palsy, vocal cords, urinary sphincter). Better in rainy, damp weather, worse in dry cold wind.",
    "modalitiesKeynotes": "Aggravation: Clear fine dry cold weather, cold wind. Amelioration: Damp wet rainy weather, warmth of bed, cold drinks.",
    "complementary": "Carb-v., Petros.",
    "antidotes": "Asaf., Coloc., Dulc., Euphr., Guai., Nit-s-d., Nux-v.",
    "followsWell": "Calc., Guai., Lyc., Nux-v., Puls., Rhus-t., Ruta, Sep., Sil., Sulph.",
    "inimical": "Phos.",
    "materiaMedica": [
      {
        "section": "Respiratory & Throat",
        "content": "Aphonia and raw burning hoarseness in public speakers and singers. Cough with inability to expectorate deep enough."
      },
      {
        "section": "Urinary",
        "content": "Involuntary spurting of urine when coughing, sneezing, laughing, or blowing nose. Paralytic weakness of bladder."
      }
    ]
  },
  {
    "remedyNumber": 27,
    "name": "Carbo vegetabilis",
    "abbreviation": "carb-v.",
    "commonName": "Vegetable Charcoal",
    "kingdom": "Plant / Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "The great reviver; collapse with cold breath and cold sweat, yet demands to be fanned rapidly; extreme flatulence in upper abdomen with frequent belching.",
    "mindKeynotes": "Apathetic, sluggish, stupor with fear of darkness and ghosts.",
    "generalsKeynotes": "State of collapse, venous stasis, coldness of knees and nose. Air hunger: calls to 'fan me, fan me vigorously close to face!'.",
    "modalitiesKeynotes": "Aggravation: Overeating, fat foods, lying flat, warmth of room. Amelioration: Eructations, being fanned rapidly, cold fresh air.",
    "complementary": "Kali-c., Phos.",
    "antidotes": "Am-c., Camph., Coff., Ferr., Lach., Nit-s-d., Spig.",
    "followsWell": "Ars., Chin., Dros., Kali-c., Lach., Lyc., Phos., Puls., Sep., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Gastrointestinal",
        "content": "Enormous distension of upper abdomen; epigastrium sensitive to touch. Frequent loud eructations provide temporary relief."
      },
      {
        "section": "Cardiorespiratory",
        "content": "Air hunger, dyspnea with cyanosis, cold tongue, cold breath. Patient feels on the verge of dying and craves fresh breeze."
      }
    ]
  },
  {
    "remedyNumber": 28,
    "name": "Graphites",
    "abbreviation": "graph.",
    "commonName": "Black Lead / Plumbago",
    "kingdom": "Mineral",
    "miasm": "Psora / Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Skin eruptions oozing thick honey-like sticky fluid; fissures behind ears and in skin folds; tendency to obesity; timid and indecisive.",
    "mindKeynotes": "Timid, hesitating, indecisive; wept when hearing music. Apprehensive disposition.",
    "generalsKeynotes": "Skin eruptions discharge a transparent, sticky, honey-colored watery moisture. Cracks at angle of mouth, nipples, and behind ears.",
    "modalitiesKeynotes": "Aggravation: Warmth, during and after menses, night. Amelioration: Walking in open air, dark room.",
    "complementary": "Arg-n., Caust., Hep., Tub.",
    "antidotes": "Acon., Ars., Nux-v.",
    "followsWell": "Bell., Calc., Lyc., Puls., Sep., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Skin",
        "content": "Unhealthy skin where every little injury suppurates. Fissures behind auricles oozing sticky fluid that stiffens linen like glue."
      },
      {
        "section": "Gastrointestinal",
        "content": "Constipation with large, knotty stools united by shreds of mucus. Aversion to sweets and cooked food."
      }
    ]
  },
  {
    "remedyNumber": 29,
    "name": "Hyoscyamus niger",
    "abbreviation": "hyos.",
    "commonName": "Henbane",
    "kingdom": "Plant",
    "miasm": "Psora / Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Erotomania, shamelessly uncovering body, foolish delirium with suspicious jealousy, spasmodic dry night cough relieved by sitting up.",
    "mindKeynotes": "Suspicious, fears poisoning, refuses medicine and drink. Lewd, uncovers sexual organs, talks lasciviously, foolish laughing.",
    "generalsKeynotes": "Spasms, muscular twitchings, subsultus tendinum. Dry spasmodic cough worse lying down, better sitting up.",
    "modalitiesKeynotes": "Aggravation: Night, lying down, cold air. Amelioration: Sitting up, warmth.",
    "complementary": "Bell., Stram.",
    "antidotes": "Bell., Camph., Chin., Stram.",
    "followsWell": "Bell., Bry., Lyc., Nux-v., Op., Phos., Puls., Rhus-t., Stram., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Shameless exhibitionism; tears off clothing because of hyperesthesia or mania. Suspicious that attendants are trying to poison him."
      },
      {
        "section": "Cough",
        "content": "Dry, nocturnal spasmodic cough triggered on lying flat; disappears immediately on sitting upright in bed."
      }
    ]
  },
  {
    "remedyNumber": 30,
    "name": "Kali bichromicum",
    "abbreviation": "kali-bi.",
    "commonName": "Potassium Bichromate",
    "kingdom": "Mineral",
    "miasm": "Sycosis / Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Ropy, stringy, tough gelatinous discharges that can be drawn into long elastic threads; punched-out round ulcers; wandering pains.",
    "mindKeynotes": "Rigid, orderly, routine-bound, dislikes changes.",
    "generalsKeynotes": "Tenacious, stringy mucus that adheres to throat and nostrils. Pains shift rapidly from one small spot to another (can cover painful spot with tip of finger).",
    "modalitiesKeynotes": "Aggravation: 2 AM to 3 AM, cold beer, morning, hot weather. Amelioration: Heat, motion, eating.",
    "complementary": "Ars., Phos.",
    "antidotes": "Ars., Lach., Puls.",
    "followsWell": "Ant-t., Berb., Canth., Hep., Nit-ac., Phos., Puls., Spong.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Nose & Sinuses",
        "content": "Sinusitis with severe pain at root of nose. Thick, yellow-green elastic plugs ('clinkers') blown from nose; stringy mucus drawn out in feet-long threads."
      },
      {
        "section": "Throat & Stomach",
        "content": "Punched-out round ulcers in mouth, throat, and duodenum with regular borders. Aversion to water; beer causes vomiting."
      }
    ]
  },
  {
    "remedyNumber": 31,
    "name": "Kali carbonicum",
    "abbreviation": "kali-c.",
    "commonName": "Potassium Carbonate",
    "kingdom": "Mineral",
    "miasm": "Psora / Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Aggravation at 2 AM to 4 AM; bagging edema of upper eyelids; stitching pains in back and chest; rigid, dogmatic, terrified of being alone.",
    "mindKeynotes": "Proper, conservative, rigid, rule-following, intolerant of chaos. Starts violently when touched unexpectedly, especially on soles of feet.",
    "generalsKeynotes": "Worse 2 AM to 4 AM (asthma, cough, heart attacks). Stitching, sharp pains irrespective of motion. Bag-like swelling of upper eyelids.",
    "modalitiesKeynotes": "Aggravation: 2 AM to 4 AM, cold air, drafts, lying on painful side. Amelioration: Warmth, sitting upright with elbows on knees.",
    "complementary": "Carb-v., Nit-ac., Phos.",
    "antidotes": "Camph., Coff., Nit-s-d.",
    "followsWell": "Ars., Bell., Bry., Calc., Carb-v., Fl-ac., Lyc., Nit-ac., Nux-v., Phos., Puls., Rhus-t., Sep., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Eyes & Face",
        "content": "Characteristic sacculated puffy swelling of inner angle of upper eyelids like little water bags."
      },
      {
        "section": "Respiratory & Back",
        "content": "Asthma awakens patient at 3 AM; must get out of bed and sit bent forward with elbows on knees to breathe. Severe low back pain during menses."
      }
    ]
  },
  {
    "remedyNumber": 32,
    "name": "Medorrhinum",
    "abbreviation": "med.",
    "commonName": "Gonorrheal Virus Nosode",
    "kingdom": "Nosode",
    "miasm": "Sycosis",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Hurried feeling that time moves too slowly; fiery burning of feet; sleeps in knee-chest position; craving for ice and green oranges; better at seashore.",
    "mindKeynotes": "Wild hurried feeling; time passes too slowly. Weak memory for recent events, cannot complete sentences. Passionate, impulsive.",
    "generalsKeynotes": "Hot patient, feet burn, uncovers them. Relief of asthma and respiratory complaints at the seashore. Sleeps in knee-chest or stomach position.",
    "modalitiesKeynotes": "Aggravation: Daylight (sunrise to sunset), thinking of complaints. Amelioration: At seashore, lying on abdomen or knee-chest, damp weather.",
    "complementary": "Syc-co., Thuj.",
    "antidotes": "Ip., Thuj.",
    "followsWell": "Puls., Sulph., Thuj.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Constant feeling of hurry, as if everything had to be done right now. Fears going insane; sensation that someone is behind them."
      },
      {
        "section": "Generals",
        "content": "Chronic pelvic inflammation following suppressed gonorrhea. Burning palms and soles. Craves sour foods, green fruit, ice."
      }
    ]
  },
  {
    "remedyNumber": 33,
    "name": "Psorinum",
    "abbreviation": "psor.",
    "commonName": "Scabies Vesicle Nosode",
    "kingdom": "Nosode",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Extreme chilliness, wears fur cap in summer; foul cadaveric odor of discharges; despair of recovery; feels unusually well before an acute attack.",
    "mindKeynotes": "Profound hopelessness, despair of salvation and financial ruin. Melancholic, believes he is doomed.",
    "generalsKeynotes": "Tremendously chilly: cannot get warm, wears heavy winter overcoat in heat of summer. Discharges smell carrion-like and offensive. Ravenous hunger at night.",
    "modalitiesKeynotes": "Aggravation: Cold, drafts, before thunderstorms, wool, washing. Amelioration: Heat, warm clothes, nosebleed, lying flat with arms outspread.",
    "complementary": "Sulph., Tub.",
    "antidotes": "Coff.",
    "followsWell": "Alum., Bac., Calc., Carb-v., Hep., Lyc., Puls., Rhus-t., Sep., Sil., Sulph.",
    "inimical": "Lach., Sep.",
    "materiaMedica": [
      {
        "section": "Mind & Generals",
        "content": "Hopeless despair of recovery; feels bankrupt even when affluent. Paradoxical keynote: feels unusually well, happy, and buoyant 24 hours prior to acute illness."
      },
      {
        "section": "Skin",
        "content": "Dirty, dingy appearance of skin as if unwashed. Intolerable itching worse from warmth of bed; crusty eczematous eruptions behind ears."
      }
    ]
  },
  {
    "remedyNumber": 34,
    "name": "Tuberculinum",
    "abbreviation": "tub.",
    "commonName": "Tuberculous Sputum Nosode",
    "kingdom": "Nosode",
    "miasm": "Tubercular",
    "thermalState": "Ambithermal",
    "isPolycrest": true,
    "shortDescription": "Cosmopolitan desire to travel and wander; chronic dissatisfaction; catches cold from slightest draft; rapid emaciation despite ravenous appetite.",
    "mindKeynotes": "Restless wanderlust, constantly changing plans, jobs, residences, or physicians. Malicious, destructive, throws things at people.",
    "generalsKeynotes": "Catches cold repeatedly from every slight draft of wind. Rapid loss of flesh while eating voraciously. Family history of tuberculosis.",
    "modalitiesKeynotes": "Aggravation: Closed room, damp cold, standing. Amelioration: Cool open air, wind blowing on face, traveling.",
    "complementary": "Calc., Phos., Psor., Sep.",
    "antidotes": "None marked.",
    "followsWell": "Calc., Hydr., Kali-c., Puls., Sep., Sil., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Deep, incurable restlessness; must travel, move, see new sights. Tantrums in children with head-banging and biting."
      },
      {
        "section": "Chest",
        "content": "Incipient phthisis, recurring bronchitis and pneumonia. Dry hacking cough with aching between scapulae."
      }
    ]
  },
  {
    "remedyNumber": 35,
    "name": "Stramonium",
    "abbreviation": "stram.",
    "commonName": "Thorn Apple / Jimson Weed",
    "kingdom": "Plant",
    "miasm": "Psora / Syphilitic",
    "thermalState": "Ambithermal",
    "isPolycrest": true,
    "shortDescription": "Terror of the dark and water; desires light and company; stammering speech; violent convulsions with hallucinations of wild animals.",
    "mindKeynotes": "Violent terror upon awakening in the dark; clings frantically to nearest person. Sees ghosts, devils, dogs, and bugs crawling.",
    "generalsKeynotes": "Convulsions triggered by bright shining objects, water, or mirrors. Complete absence of pain with serious organic pathology.",
    "modalitiesKeynotes": "Aggravation: Darkness, solitude, glistening objects, sight of water. Amelioration: Bright light, company, warmth.",
    "complementary": "Bell., Hyos.",
    "antidotes": "Bell., Camph., Cham., Cit-ac., Hyos., Nux-v., Tab.",
    "followsWell": "Bell., Bry., Cupr., Hyos., Zinc.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Night terrors in children who awaken screaming and don't recognize their parents. Wants bedroom brilliantly lit with multiple lamps."
      },
      {
        "section": "Neurological",
        "content": "Spasmodic contractions of muscles; stammering speech; hydro-phobia with violent laryngeal spasms upon seeing water."
      }
    ]
  },
  {
    "remedyNumber": 36,
    "name": "Staphysagria",
    "abbreviation": "staph.",
    "commonName": "Stavesacre",
    "kingdom": "Plant",
    "miasm": "Sycosis / Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Ailments from suppressed anger, indignity, and humiliation; honey-moon cystitis with burning when not urinating; chalazions on eyelids.",
    "mindKeynotes": "Suppresses anger, trembles with suppressed indignation, throws objects across room when finally pushed beyond limit. Hypersensitive to insults.",
    "generalsKeynotes": "Clean surgical incisions or lacerated wounds. Recurrent chalazions and styes leaving hard nodules on eyelids. Tooth decay at margins.",
    "modalitiesKeynotes": "Aggravation: Anger, mortification, masturbation, sexual excesses, touch. Amelioration: Warmth, rest, night.",
    "complementary": "Caust., Coloc.",
    "antidotes": "Ambr., Camph.",
    "followsWell": "Bell., Calc., Caust., Coloc., Ign., Lyc., Nux-v., Ph-ac., Puls., Sep., Sulph.",
    "inimical": "Ran-b.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Ailments from indignation, repressed wrath, or wounded pride. Trembles with rage after an argument and loses speech."
      },
      {
        "section": "Urinary",
        "content": "Burning in urethra when not urinating (keynote). Honeymoon cystitis in newly married women after coition."
      }
    ]
  },
  {
    "remedyNumber": 37,
    "name": "Veratrum album",
    "abbreviation": "verat.",
    "commonName": "White Hellebore",
    "kingdom": "Plant",
    "miasm": "Psora / Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Cold sweat on forehead; collapse with violent simultaneous vomiting and purging; craving for sour acidic fruits and ice; religious mania.",
    "mindKeynotes": "Religious mania, prays, sings, preaches, kisses everybody. Delusion of being of noble or Christ-like origin. Aimless wandering.",
    "generalsKeynotes": "Cold sweat on forehead during pain or stool. Severe collapse with ice-cold skin and blue nails. Copious projectile rice-water stools.",
    "modalitiesKeynotes": "Aggravation: Cold, during stool, motion. Amelioration: Walking about, lying down, warmth.",
    "complementary": "Carb-v.",
    "antidotes": "Acon., Camph., Chin., Coff.",
    "followsWell": "Ars., Bov., Carb-v., Cupr., Ipec., Nux-v., Phos., Puls., Sep., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Gastrointestinal",
        "content": "Violent choleraic state: simultaneous projectile vomiting and profuse watery purging with severe cramping colic and cold sweat on forehead."
      },
      {
        "section": "Mind",
        "content": "Amorous religious frenzy: tears clothes, kisses strangers, boasts of immense wealth and power."
      }
    ]
  },
  {
    "remedyNumber": 38,
    "name": "Ipecacuanha",
    "abbreviation": "ip.",
    "commonName": "Ipecac Root",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Persistent nausea not relieved by vomiting; clean, uncoated tongue with constant salivation; spasmodic suffocative asthma.",
    "mindKeynotes": "Morose, contemptuous, impatient, desires a variety of things without knowing what.",
    "generalsKeynotes": "Persistent unrelenting nausea accompanied by copious salivation and totally clean tongue. Bright red profuse hemorrhages with nausea.",
    "modalitiesKeynotes": "Aggravation: Warm moist winds, overeating, veal, movement. Amelioration: Open air, rest.",
    "complementary": "Cupr.",
    "antidotes": "Arn., Ars., Chin., Tab.",
    "followsWell": "Ant-t., Arn., Ars., Bell., Bry., Calc., Cham., Cupr., Ign., Nux-v., Puls., Sep., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Nausea continuous and intolerable; vomiting does not relieve the sickening disgust. Clean tongue with abundant clear saliva."
      },
      {
        "section": "Respiratory",
        "content": "Spasmodic constriction of chest; rattling mucus in bronchi with each breath, yet cannot expectorate; face turns blue."
      }
    ]
  },
  {
    "remedyNumber": 39,
    "name": "Platina",
    "abbreviation": "plat.",
    "commonName": "Platinum",
    "kingdom": "Mineral",
    "miasm": "Syphilitic / Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Arrogance and haughtiness, looks down on everything; objects appear physically smaller than they are; numbness and constriction; sexual nymphomania.",
    "mindKeynotes": "Supreme arrogance: looks down upon others as mentally and physically inferior. Delusion that people and surroundings are physically diminutive.",
    "generalsKeynotes": "Numbness, coldness, and cramping constriction (like iron bands). Hypersensitive genitalia, vaginismus preventing examination.",
    "modalitiesKeynotes": "Aggravation: Sitting and standing, evening, touch. Amelioration: Walking in open air, sunshine.",
    "complementary": "Pall.",
    "antidotes": "Puls.",
    "followsWell": "Bell., Ign., Lyc., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "None.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Supercilious contempt; patient feels she belongs to royalty and everyone else is unworthy. Mood alternates between cheerful and deeply depressed."
      },
      {
        "section": "Female Genitalia",
        "content": "Extreme hyperesthesia of sexual organs: touch of clothes causes intense sexual excitation. Ovarian neuralgia with numbness."
      }
    ]
  },
  {
    "remedyNumber": 40,
    "name": "Ledum palustre",
    "abbreviation": "led.",
    "commonName": "Marsh Tea / Wild Rosemary",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Punctured wounds from nails, stings, or bites; parts feel ice-cold to touch yet relieved by ice-cold water; ascending rheumatism.",
    "mindKeynotes": "Morose, discontented, avoids society.",
    "generalsKeynotes": "Puncture wounds from sharp objects. Affected part is objectively cold to touch, yet patient cannot tolerate heat and demands ice packs.",
    "modalitiesKeynotes": "Aggravation: Heat of bed, warmth, night, alcohol. Amelioration: Ice-cold water applications, immersing feet in ice water.",
    "complementary": "None marked.",
    "antidotes": "Camph.",
    "followsWell": "Acon., Bell., Bry., Chin., Hyper., Puls., Rhus-t., Sep., Sulph.",
    "inimical": "Chin.",
    "materiaMedica": [
      {
        "section": "Injuries & Stings",
        "content": "Stepping on rusty nail; rat bites, mosquito and bee stings. Swelling remains pale and cold to touch."
      },
      {
        "section": "Extremities",
        "content": "Gout and rheumatism beginning in feet and traveling upwards. Pains in ankles and heels relieved only by ice-cold footbaths."
      }
    ]
  },
  {
    "remedyNumber": 41,
    "name": "Cantharis vesicatoria",
    "abbreviation": "canth.",
    "commonName": "Spanish Fly",
    "kingdom": "Animal",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent destructive inflammation of urinary mucous membranes; intolerable constant urging with burning cutting pains; severe scalds and burns.",
    "mindKeynotes": "Furious delirium with sexual excitement and barking mania; sudden paroxysms of rage provoked by touching larynx or sight of water.",
    "generalsKeynotes": "Constant burning in whole body with tenesmus of urinary passages. Raw burning pains throughout mucous tracts.",
    "modalitiesKeynotes": "Aggravation: Urinating, drinking cold water or coffee, touch. Amelioration: Rubbing, warmth, rest.",
    "complementary": "Bell., Merc., Phos.",
    "antidotes": "Acon., Camph., Puls.",
    "followsWell": "Bell., Merc., Sulph.",
    "inimical": "Coffee.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Intolerable urging and tenesmus; urine passes drop by drop with burning sensation as of molten lead. Severe strangury."
      },
      {
        "section": "Skin",
        "content": "Vesicular erysipelas with large blebs; burns and scalds with vesicle formation before blisters break. Burning relieved by cold applications."
      }
    ]
  },
  {
    "remedyNumber": 42,
    "name": "Drosera rotundifolia",
    "abbreviation": "dros.",
    "commonName": "Round-leaved Sundew",
    "kingdom": "Plant",
    "miasm": "Tubercular",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Spasmodic paroxysmal dry barking cough worse after midnight; whooping cough; laryngeal constriction with vomiting of retched mucus.",
    "mindKeynotes": "Restless, obstinate, suspicious of friends, easily angered by trifles.",
    "generalsKeynotes": "Attacks of cough follow each other in rapid succession; patient cannot catch breath; paroxysms end in retching and vomiting.",
    "modalitiesKeynotes": "Aggravation: After midnight, lying down in bed, warmth of bed, singing, talking. Amelioration: Walking slowly, sitting up.",
    "complementary": "Nux-v., Sulph.",
    "antidotes": "Camph.",
    "followsWell": "Calc., Puls., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Violent paroxysms of spasmodic coughing; whooping cough; cough sounds like barking, followed by retching and vomiting."
      },
      {
        "section": "Larynx",
        "content": "Sensation as of a feather or crumb in larynx; hoarseness and deep bass voice; chest constriction."
      }
    ]
  },
  {
    "remedyNumber": 43,
    "name": "Hypericum perforatum",
    "abbreviation": "hyper.",
    "commonName": "St. John's Wort",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Arnica of the nerves; mechanical injuries to parts rich in sentient nerves, crushed fingertips, fall on coccyx, excruciating shooting pains.",
    "mindKeynotes": "Spasms after fright or mechanical injuries; melancholy and brain fog after head concussion.",
    "generalsKeynotes": "Punctured, incised or crushed wounds with intolerable shooting pains radiating centripetally along nerve trunks.",
    "modalitiesKeynotes": "Aggravation: Cold damp weather, motion, touch, fog. Amelioration: Bending head backward, quiet warmth.",
    "complementary": "Arn., Calend., Staph.",
    "antidotes": "Ars., Cham.",
    "followsWell": "Arn., Bell., Bry.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Injuries to parts rich in sentient nerves: crushed tips of fingers, toes, nails. Puncture wounds from nails, animal bites."
      },
      {
        "section": "Spine",
        "content": "Injuries to coccyx from fall on buttocks with severe neuralgic shooting pains radiating upward."
      }
    ]
  },
  {
    "remedyNumber": 44,
    "name": "Syphilinum",
    "abbreviation": "syph.",
    "commonName": "Syphilitic Virus / Lueticum",
    "kingdom": "Nosode",
    "miasm": "Syphilis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Terrible nocturnal bone pains from sunset to sunrise; linear ulcerations; compulsive hand-washing; syphilitic bone destruction.",
    "mindKeynotes": "Loss of memory; washing hands constantly with morbid fear of contamination; hopeless melancholy; feels uncleansed.",
    "generalsKeynotes": "All symptoms aggravate relentlessly at night: pains begin at twilight (sunset) and cease with sunrise. Linear ulcers with defined edges.",
    "modalitiesKeynotes": "Aggravation: At night from sunset to sunrise, heat of bed, coastal air, thunderstorm. Amelioration: Inland mountains, cold washing.",
    "complementary": "Aur., Merc., Nit-ac., Thuj.",
    "antidotes": "None recorded.",
    "followsWell": "Aur., Kali-bi., Nit-ac.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Compulsive hand washing; terrifying anxiety at nightfall; despairs of recovery."
      },
      {
        "section": "Extremities",
        "content": "Severe tearing nocturnal bone pains in tibiae and cranial bones; worse heat of bed, driven to pace the floor."
      }
    ]
  },
  {
    "remedyNumber": 45,
    "name": "Carcinosinum",
    "abbreviation": "carc.",
    "commonName": "Carcinoma Nosode",
    "kingdom": "Nosode",
    "miasm": "Cancerous Diathesis",
    "thermalState": "Ambithermal",
    "isPolycrest": true,
    "shortDescription": "Fastidious, artistic, dance-loving, highly sensitive to reprimand; history of prolonged mental control or parental suppression; insomnia.",
    "mindKeynotes": "Deep sympathetic sensitivity; passionate love for music, dancing, thunderstorms; perfectionism; excessive sense of duty.",
    "generalsKeynotes": "Family history of malignancy, diabetes, or tuberculosis; blue sclera; cafe-au-lait complexion with multiple pigmented moles.",
    "modalitiesKeynotes": "Aggravation: Physical and mental reprimand, sea air (in some), 1 to 6 PM. Amelioration: Dancing, rhythmic music, seaside, evening.",
    "complementary": "Nat-m., Phos., Psor., Sep., Tub.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Lyc., Med., Sep., Tub.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Fastidious perfectionist; passionate response to art and music; weeping from slightest reprimand; deeply caring for animals."
      },
      {
        "section": "Sleep",
        "content": "Obstinate insomnia from childhood; mind racing with thoughts of responsibility; sleeps in knee-chest position."
      }
    ]
  },
  {
    "remedyNumber": 46,
    "name": "Baryta carbonica",
    "abbreviation": "bar-c.",
    "commonName": "Barium Carbonate",
    "kingdom": "Mineral",
    "miasm": "Psora / Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Dwarfishness of mind and body; enlarged scrofulous tonsils; bashful timidity; premature senility and arteriosclerosis.",
    "mindKeynotes": "Loss of memory; bashful, hides behind furniture when strangers enter; lack of self-confidence; childish behavior in elderly.",
    "generalsKeynotes": "Takes cold easily, always ending in tonsillitis (quinsy) with suppuration. Swollen indurated cervical and inguinal glands.",
    "modalitiesKeynotes": "Aggravation: Cold damp air, thinking of symptoms, washing head. Amelioration: Walking in open air, warm wraps.",
    "complementary": "Dulc., Sil., Psor.",
    "antidotes": "Ant-t., Bell., Camph.",
    "followsWell": "Ant-t., Calc., Con., Lyc., Merc., Puls., Rhus-t., Sil.",
    "inimical": "Calc.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Mentally backward children; slow to grasp ideas; distrustful; childish senility in aged people."
      },
      {
        "section": "Throat",
        "content": "Submaxillary and tonsillar hypertrophy; quinsy prone to suppurate; swallowing painful, can swallow only liquids."
      }
    ]
  },
  {
    "remedyNumber": 47,
    "name": "Baryta muriatica",
    "abbreviation": "bar-m.",
    "commonName": "Barium Chloride",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Aneurysms, cerebral arteriosclerosis with vertigo, glandular indurations, hypertension in elderly with high systolic pressure.",
    "mindKeynotes": "Mania with increased sexual desire; idiocy; mental weakness and loss of memory.",
    "generalsKeynotes": "Arteriosclerosis with vascular degeneration and calcification. Indurated stony hard glands.",
    "modalitiesKeynotes": "Aggravation: Cold damp weather, motion. Amelioration: Warmth, rest.",
    "complementary": "Con., Plb.",
    "antidotes": "None recorded.",
    "followsWell": "Aur., Con., Plb.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Cardiovascular",
        "content": "Hypertension with vascular tension; thoracic and abdominal aneurysms; cerebral apoplexy."
      },
      {
        "section": "Head",
        "content": "Severe occipital heaviness and vertigo; ringing in ears with hardness of hearing in elderly."
      }
    ]
  },
  {
    "remedyNumber": 48,
    "name": "Calcarea fluorica",
    "abbreviation": "calc-f.",
    "commonName": "Fluoride of Lime / Calcium Fluoride",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Hard, stony indurations of glands and bone spurs; varicose veins; malnutrition of bones and tooth enamel; relaxed elastic fibers.",
    "mindKeynotes": "Chronic anxiety about money and financial ruin; depression with groundless fears.",
    "generalsKeynotes": "Stony hardness of tissues, osteomata, exostoses, indurated glands. Dilated varicose veins with ulceration.",
    "modalitiesKeynotes": "Aggravation: Beginning motion, cold damp weather. Amelioration: Continued motion, heat, warm fomentations.",
    "complementary": "Sil., Calc-p.",
    "antidotes": "Camph.",
    "followsWell": "Rhus-t., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Bones",
        "content": "Bone spurs, exostoses, hard osseous nodes on jaw and long bones; delayed bone healing."
      },
      {
        "section": "Vascular",
        "content": "Severe varicose veins and hemorrhoids; relaxed vascular walls with painful aching and congestion."
      }
    ]
  },
  {
    "remedyNumber": 49,
    "name": "Calcarea phosphorica",
    "abbreviation": "calc-p.",
    "commonName": "Phosphate of Lime",
    "kingdom": "Mineral",
    "miasm": "Tubercular",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Slender, tall, rapidly growing children; slow closure of fontanelles; growing pains; craving for smoked bacon and salty meats.",
    "mindKeynotes": "Restless, discontented, always wants to go somewhere else; peevish and fretful.",
    "generalsKeynotes": "Defective bone development, non-union of fractured bones, slow dentition, chronic fatigue after school or mental work.",
    "modalitiesKeynotes": "Aggravation: Cold, damp weather, melting snow, mental exertion, draft. Amelioration: Warm, dry weather, lying down.",
    "complementary": "Ruta, Sil., Sulph.",
    "antidotes": "Camph.",
    "followsWell": "Calc., Chin., Ferr., Lyc., Ruta, Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Tardy dentition and walking; cranial bones soft and thin; fontanelles remain open too long."
      },
      {
        "section": "Stomach",
        "content": "Craving for bacon, ham, salted and smoked meats; distress and colic from slightest food."
      }
    ]
  },
  {
    "remedyNumber": 50,
    "name": "Calcarea sulphurica",
    "abbreviation": "calc-s.",
    "commonName": "Plaster of Paris / Calcium Sulphate",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Suppurative processes with thick lumpy yellow pus; cystic acne; boils and carbuncles that do not heal; catarrhal discharges.",
    "mindKeynotes": "Obstinate, irritable, anxious about health, hurried in movements.",
    "generalsKeynotes": "Purulent discharges that are thick, lumpy, and blood-streaked. Cuts and wounds heal slowly and tend to suppurate.",
    "modalitiesKeynotes": "Aggravation: Warmth of room, drafts, getting wet. Amelioration: Cool open air, bathing in cold water.",
    "complementary": "Sil., Hep.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Hep., Sil., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Skin",
        "content": "Cystic acne on face and back; purulent boils and abscesses with thick yellow discharge."
      },
      {
        "section": "Respiratory",
        "content": "Cough with purulent sanious expectoration; catarrhal bronchitis with yellow lumpy sputum."
      }
    ]
  },
  {
    "remedyNumber": 51,
    "name": "Kali muriaticum",
    "abbreviation": "kali-m.",
    "commonName": "Chloride of Potassium",
    "kingdom": "Mineral",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Second stage of inflammations; thick white fibrinous discharges; white or gray coating at base of tongue; eustachian catarrh.",
    "mindKeynotes": "Patient is quiet, sits in silence, does not want to talk; depressed and sluggish.",
    "generalsKeynotes": "Fibrinous plastic exudations; white thick discharges from eyes, ears, nose, and bronchi. Chronic catarrh.",
    "modalitiesKeynotes": "Aggravation: Rich fatty foods, pastry, motion, cold. Amelioration: Cold drinks, resting, rubbing.",
    "complementary": "Bell., Calc-s., Puls.",
    "antidotes": "Bell., Puls., Hydr.",
    "followsWell": "Bell., Merc., Puls., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Ears",
        "content": "Chronic catarrhal otitis media with closed eustachian tube; crackling noise in ear when blowing nose or swallowing."
      },
      {
        "section": "Mouth",
        "content": "Thick milky white or grayish coating on base of tongue; aphthous ulcerations with white false membranes."
      }
    ]
  },
  {
    "remedyNumber": 52,
    "name": "Kali phosphoricum",
    "abbreviation": "kali-p.",
    "commonName": "Phosphate of Potassium",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Nerve nutrient; prostration from mental strain and overwork; neurasthenia; golden yellow discharges; sympathetic nervous breakdown.",
    "mindKeynotes": "Anxiety, nervous dread, lethargy, mental breakdown from grief or overwork; night terrors in children.",
    "generalsKeynotes": "Exhaustion, loss of nerve power, physical and mental weakness; offensive golden yellow discharges.",
    "modalitiesKeynotes": "Aggravation: Mental and physical exertion, cold, early morning. Amelioration: Warmth, rest, eating, gentle motion.",
    "complementary": "Anac., Ign., Phos.",
    "antidotes": "None recorded.",
    "followsWell": "Calc-p., Mag-p., Phos.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Brain fag from study or business stress; memory fails, irritable, despondent, fears death and disease."
      },
      {
        "section": "Nervous",
        "content": "Neuralgia with extreme prostration; trembling of hands; paralytic weakness and insomnia."
      }
    ]
  },
  {
    "remedyNumber": 53,
    "name": "Kali sulphuricum",
    "abbreviation": "kali-s.",
    "commonName": "Sulphate of Potassium",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Third stage of inflammations; profuse yellow slimy watery discharges; shifting wandering joint pains; worse warm room.",
    "mindKeynotes": "Irritable, timid, obstinate, anxious in evening and warm room.",
    "generalsKeynotes": "Yellow slimy secretions from mucous membranes; shifting rheumatic pains; desquamation of skin after exanthemata.",
    "modalitiesKeynotes": "Aggravation: Warm room, evening, heated air. Amelioration: Cool open fresh air, walking outdoors.",
    "complementary": "Puls., Sulph.",
    "antidotes": "None recorded.",
    "followsWell": "Calc., Hep., Puls., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Rattling of mucus in chest with yellow slimy expectoration; bronchial asthma worse in warm room."
      },
      {
        "section": "Skin",
        "content": "Seborrhea, dry eczema, psoriasis with profuse yellow scales; epithelial desquamation."
      }
    ]
  },
  {
    "remedyNumber": 54,
    "name": "Magnesia carbonica",
    "abbreviation": "mag-c.",
    "commonName": "Carbonate of Magnesia",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sour smelling baby; green frothy stools resembling pond scum; severe facial neuralgias worse at night during rest.",
    "mindKeynotes": "Anxious, uneasy, easily frightened, irritable, weeping mood in children.",
    "generalsKeynotes": "Entire body smells sour; sour perspiration, sour vomiting, sour stool. Pains lightning-like and driving patient out of bed.",
    "modalitiesKeynotes": "Aggravation: Night, rest, warmth of bed, milk, change of temperature. Amelioration: Walking about, fresh warm air.",
    "complementary": "Cham., Rheum.",
    "antidotes": "Ars., Cham., Merc.",
    "followsWell": "Calc., Cham., Lyc., Nux-v., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Craving for meat; aversion to milk which causes diarrhea and colic; sour eructations and vomit."
      },
      {
        "section": "Stool",
        "content": "Green, watery, frothy stool like the scum of a frog pond, smelling sour, followed by burning."
      }
    ]
  },
  {
    "remedyNumber": 55,
    "name": "Magnesia muriatica",
    "abbreviation": "mag-m.",
    "commonName": "Muriate of Magnesia / Magnesium Chloride",
    "kingdom": "Mineral",
    "miasm": "Psora / Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Chronic constipation with knotty sheep-dung stools that crumble; liver enlargement and induration; worse lying on right side.",
    "mindKeynotes": "Great anxiety, sadness, hysterical manifestations; cannot bear to see others quarrel.",
    "generalsKeynotes": "Liver congestion with enlarged liver; knotty hard dry stools that crumble at the margin of the anus. Palpitation worse sitting.",
    "modalitiesKeynotes": "Aggravation: Lying on right side, after eating, salt food, noise. Amelioration: Open air, gentle walking, pressure.",
    "complementary": "Nat-m., Sep.",
    "antidotes": "Camph., Cham.",
    "followsWell": "Bell., Nux-v., Puls., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stool",
        "content": "Obstinate constipation; stools hard, scanty, knotty like sheep's dung, crumbling at anus verge."
      },
      {
        "section": "Abdomen",
        "content": "Enlarged hard liver with tenderness, worse lying on right side; jaundice with knotty stools."
      }
    ]
  },
  {
    "remedyNumber": 56,
    "name": "Magnesia phosphorica",
    "abbreviation": "mag-p.",
    "commonName": "Phosphate of Magnesia",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Great antispasmodic remedy; lightning-like cramping pains rapidly relieved by warmth, hot applications, and hard pressure.",
    "mindKeynotes": "Nervous, easily agitated, lamenting all the time about the pain; dull mental condition.",
    "generalsKeynotes": "Spasms, cramps, neuralgias; shooting pains along nerves; right-sided affections. Rapid relief from heat and pressure.",
    "modalitiesKeynotes": "Aggravation: Cold air, drafts, cold washing, touch, right side. Amelioration: Heat, hot water, firm pressure, bending double.",
    "complementary": "Calc-p., Kali-p.",
    "antidotes": "Bell., Gels., Lach.",
    "followsWell": "Bell., Cham., Coloc., Lyc.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Abdomen",
        "content": "Violent enteralgia and flatulent colic forcing patient to bend double, completely relieved by heat and pressure."
      },
      {
        "section": "Female",
        "content": "Menstrual colic with severe cramping pains preceding flow, relieved by hot baths and warm compresses."
      }
    ]
  },
  {
    "remedyNumber": 57,
    "name": "Natrum carbonicum",
    "abbreviation": "nat-c.",
    "commonName": "Carbonate of Sodium",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Debility from heat of sun; chronic indigestion from milk; weak ankles turning easily; melancholy from music.",
    "mindKeynotes": "Depression, aversion to society, sadness during music; mental breakdown from sun exposure.",
    "generalsKeynotes": "Great prostration from hot weather, sun, gaslight; weak ankles that sprain or turn outward easily; milk intolerance.",
    "modalitiesKeynotes": "Aggravation: Sun, hot summer, music, milk, mental exertion, thunderstorms. Amelioration: Moving about, pressure, wiping.",
    "complementary": "Sep., Sulph.",
    "antidotes": "Camph., Nit-s-d.",
    "followsWell": "Calc., Lyc., Nux-v., Puls., Sep., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Ill-effects of sunstroke, heat exhaustion; chronic headache returning every summer under the hot sun."
      },
      {
        "section": "Stomach",
        "content": "Dyspepsia from milk, which produces sour eructations and diarrhea; constant hunger with gastric sinking."
      }
    ]
  },
  {
    "remedyNumber": 58,
    "name": "Natrum phosphoricum",
    "abbreviation": "nat-p.",
    "commonName": "Phosphate of Sodium",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Acid diathesis; creamy golden-yellow coating at base of tongue and palate; sour eructations; intestinal parasites.",
    "mindKeynotes": "Anxious, fearful in evening; fear of darkness, imaginary things, impending misfortune.",
    "generalsKeynotes": "Symptoms of excess acidity: sour vomiting, sour belching, sour diarrhea. Golden yellow creamy exudations.",
    "modalitiesKeynotes": "Aggravation: Sugar, fats, sour foods, thunderstorm. Amelioration: Cold water, pressure.",
    "complementary": "Kali-p., Nat-s.",
    "antidotes": "None recorded.",
    "followsWell": "Calc-p., Nat-m., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mouth",
        "content": "Thick golden yellow creamy coating on back part of tongue and roof of mouth; sour taste."
      },
      {
        "section": "Stomach",
        "content": "Hyperacidity; sour eructations and vomiting of curdled sour masses; heartburn and dyspepsia."
      }
    ]
  },
  {
    "remedyNumber": 59,
    "name": "Natrum sulphuricum",
    "abbreviation": "nat-s.",
    "commonName": "Sulphate of Sodium / Glauber's Salt",
    "kingdom": "Mineral",
    "miasm": "Sycosis",
    "thermalState": "Warm",
    "isPolycrest": true,
    "shortDescription": "Hydrogenoid constitution; complaints worse living in damp basements or wet weather; morning diarrhea with rumbling flatus; asthma.",
    "mindKeynotes": "Profound melancholy with suicidal impulses; must exert self-control to prevent shooting himself; worse music.",
    "generalsKeynotes": "Watery retention, sycotic dyscrasia; cannot bear to live near water or in basements. Loose morning stool.",
    "modalitiesKeynotes": "Aggravation: Dampness, rain, living in basements, lying on left side, morning. Amelioration: Dry warm weather, open air.",
    "complementary": "Ars., Thuj.",
    "antidotes": "Bell., Camph.",
    "followsWell": "Bell., Bry., Lyc., Thuj.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Humid asthma in children; loose rattling cough with pain in lower left chest; patient must hold chest with hands."
      },
      {
        "section": "Stool",
        "content": "Sudden morning diarrhea on rising or after breakfast; copious watery stool accompanied by noisy gushing flatus."
      }
    ]
  },
  {
    "remedyNumber": 60,
    "name": "Ferrum metallicum",
    "abbreviation": "ferr.",
    "commonName": "Iron",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Pseudo-plethora; flushing of face from slightest emotion or exertion; chlorosis and anemia; better gentle walking slowly.",
    "mindKeynotes": "Irritable, intolerant of least contradiction; excited from small noises like rolling of paper.",
    "generalsKeynotes": "Extreme pallor of mucous membranes alternating with sudden fiery red flushes of cheeks. Regurgitation of undigested food.",
    "modalitiesKeynotes": "Aggravation: At rest, midnight, sweating, cold washing. Amelioration: Walking slowly about, gentle motion.",
    "complementary": "Alum., Chin.",
    "antidotes": "Ars., Chin., Hep., Puls.",
    "followsWell": "Acon., Bell., Chin., Con., Lyc., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Severe anemia and chlorosis; circulation easily excited; throbbing in all blood vessels with false plethora."
      },
      {
        "section": "Stomach",
        "content": "Spits up mouthfuls of food after eating without nausea; canine hunger alternating with complete anorexia."
      }
    ]
  },
  {
    "remedyNumber": 61,
    "name": "Ferrum phosphoricum",
    "abbreviation": "ferr-p.",
    "commonName": "Phosphate of Iron",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "First stage of all inflammatory and febrile disturbances before exudation; soft full compressible pulse; epistaxis.",
    "mindKeynotes": "Talkative, cheerful, excited in evening, anxious at night.",
    "generalsKeynotes": "First stage of congestion and inflammation: bronchitis, pneumonia, otitis, catarrh. Epistaxis of bright red blood.",
    "modalitiesKeynotes": "Aggravation: 4 to 6 AM, motion, touch, right side. Amelioration: Cold applications, resting, gentle walking.",
    "complementary": "Kali-m.",
    "antidotes": "None recorded.",
    "followsWell": "Acon., Bell., Bry., Kali-m.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Early stage of acute bronchitis and pneumonia; congestive cough with blood-streaked expectoration."
      },
      {
        "section": "Ears",
        "content": "Acute otitis media in early stage; throbbing earache with fever and redness of tympanic membrane."
      }
    ]
  },
  {
    "remedyNumber": 62,
    "name": "Plumbum metallicum",
    "abbreviation": "plb.",
    "commonName": "Lead",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Severe abdominal colic with sensation of navel retracted to spine; wrist drop and extensor paralysis; obstinate constipation with sheep-dung stools.",
    "mindKeynotes": "Loss of memory, mental apathy, hallucinations, melancholia, paresis of intellect.",
    "generalsKeynotes": "Violent abdominal cramps; extreme emaciation; paralysis of extensor muscles (wrist-drop); blue line on gums.",
    "modalitiesKeynotes": "Aggravation: Night, motion, cold. Amelioration: Hard pressure, bending double, rubbing.",
    "complementary": "Pod., Thuj.",
    "antidotes": "Alum., Bell., Nux-v., Plat.",
    "followsWell": "Bell., Op., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Abdomen",
        "content": "Excruciating painter's colic; sensation as if navel were violently drawn backward to the vertebral column by a string."
      },
      {
        "section": "Extremities",
        "content": "Paralysis of extensor muscles of forearm; wrist-drop; trembling and emaciation of limbs."
      }
    ]
  },
  {
    "remedyNumber": 63,
    "name": "Alumina",
    "abbreviation": "alum.",
    "commonName": "Oxide of Aluminium / Pure Clay",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Extreme dryness of all mucous membranes; sluggish paretic rectum (even soft stool requires straining); confusion of personal identity.",
    "mindKeynotes": "Mistakes in time: minutes seem like hours; confusion of personal identity, feels someone else is talking through him; hurriedness.",
    "generalsKeynotes": "Dry, scaly, withered skin without perspiration. Extreme paresis of rectum and bladder; potato intolerance.",
    "modalitiesKeynotes": "Aggravation: Warm room, winter, dry cold weather, potatoes, morning on waking. Amelioration: Open cold air, damp weather, warm drinks.",
    "complementary": "Bry., Ferr.",
    "antidotes": "Bry., Cham., Ipec.",
    "followsWell": "Bry., Calc., Ferr., Puls., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Rectum",
        "content": "Sluggishness of rectum; inactive bowels; even a soft clayey stool requires great straining to evacuate."
      },
      {
        "section": "Mind",
        "content": "Time passes too slowly; cannot bear the sight of knives or blood; depraved appetite for chalk, charcoal, dry tea."
      }
    ]
  },
  {
    "remedyNumber": 64,
    "name": "Argentum metallicum",
    "abbreviation": "arg-met.",
    "commonName": "Metallic Silver",
    "kingdom": "Mineral",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Catarrhal laryngitis of public speakers and professional singers; cartilaginous affections; gelatinous viscid expectoration.",
    "mindKeynotes": "Anxiety with rapid talkativeness; restlessness and mental exhaustion.",
    "generalsKeynotes": "Affections of cartilages, joints, larynx, and ovaries; viscid gray jelly-like expectoration; hoarseness of singers.",
    "modalitiesKeynotes": "Aggravation: Speaking, singing, touch, midday, lying on back. Amelioration: Open fresh air, coffee.",
    "complementary": "Calc., Puls.",
    "antidotes": "Merc., Puls.",
    "followsWell": "Calc., Puls., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Larynx",
        "content": "Chronic hoarseness and loss of voice in public speakers and singers; larynx feels raw and sore on coughing."
      },
      {
        "section": "Respiratory",
        "content": "Cough excited by laughing, talking; profuse easy expectoration looking like boiled starch or gray jelly."
      }
    ]
  },
  {
    "remedyNumber": 65,
    "name": "Argentum nitricum",
    "abbreviation": "arg-n.",
    "commonName": "Nitrate of Silver",
    "kingdom": "Mineral",
    "miasm": "Sycosis",
    "thermalState": "Warm",
    "isPolycrest": true,
    "shortDescription": "Anticipatory performance anxiety; impulsive hurry; sensation of splinters in throat; craving for sweets which aggravate; warm patient.",
    "mindKeynotes": "Anticipation causes diarrhea; impulsive: must walk fast; claustrophobia; agoraphobia; fear of heights and impending panic.",
    "generalsKeynotes": "Warm-blooded patient wanting cool fresh air; splinter-like sticking pains in mucous membranes; craving for sugar and sweets.",
    "modalitiesKeynotes": "Aggravation: Warmth, sugar, mental exertion, closed rooms, riding in carriage. Amelioration: Cold fresh air, cold bathing, pressure.",
    "complementary": "Nat-m., Puls.",
    "antidotes": "Ars., Nat-m.",
    "followsWell": "Bry., Calc., Lyc., Puls., Sep.",
    "inimical": "Coffee.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Fear of heights; fear of corners of high buildings collapsing; stage fright and diarrhea before appearing in public."
      },
      {
        "section": "Throat",
        "content": "Sensation as if a fish-bone or splinter were sticking in throat when swallowing; purulent ophthalmia with swollen lids."
      }
    ]
  },
  {
    "remedyNumber": 66,
    "name": "Aurum muriaticum",
    "abbreviation": "aur-m.",
    "commonName": "Chloride of Gold",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Uterine induration, fibroids, syphilitic glandular enlargement, pelvic chronic inflammation with melancholy.",
    "mindKeynotes": "Sadness, melancholy, constant dread, self-reproach, irritable.",
    "generalsKeynotes": "Chronic induration of glandular organs; fibroid tumors; syphilitic caries of nasal bones.",
    "modalitiesKeynotes": "Aggravation: Cold, rest, morning. Amelioration: Warmth, motion.",
    "complementary": "Aur., Merc.",
    "antidotes": "Bell., Merc.",
    "followsWell": "Aur., Con., Merc.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Chronic metritis, fibroid tumors of uterus; induration of cervix with heavy dragging sensation in pelvis."
      },
      {
        "section": "Nose",
        "content": "Ozena with deep ulceration; caries of nasal bones; foul offensive discharge."
      }
    ]
  },
  {
    "remedyNumber": 67,
    "name": "Cuprum metallicum",
    "abbreviation": "cupr.",
    "commonName": "Copper",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent spasmodic convulsions beginning in fingers and toes with clenched thumbs; choleraic cramps; whooping cough with suffocation.",
    "mindKeynotes": "Loss of memory; delirium with malicious screams; bite others; frightened easily.",
    "generalsKeynotes": "Violent cramps and spasms: cramps in calves, abdomen, fingers; thumbs clenched tight into fists; cyanosis.",
    "modalitiesKeynotes": "Aggravation: Cold air, touch, suppressed eruptions, night. Amelioration: Drinking cold water, sweating, vomiting.",
    "complementary": "Calc., Kali-c.",
    "antidotes": "Bell., Camph., Chin., Hep.",
    "followsWell": "Calc., Verat.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nervous",
        "content": "Epileptic seizures beginning with violent contraction of thumbs; chorea from fright; spasms of calves."
      },
      {
        "section": "Respiratory",
        "content": "Suffocative whooping cough with blue face, clenched fists, and vomiting after paroxysm; relieved by drinking cold water."
      }
    ]
  },
  {
    "remedyNumber": 68,
    "name": "Zincum metallicum",
    "abbreviation": "zinc.",
    "commonName": "Zinc",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Continuous fidgety restless feet; nervous exhaustion from suppressed eruptions; defective vitality; worse wine and stimulants.",
    "mindKeynotes": "Brain exhaustion; lethargic; repeats questions before answering; melancholia; somnambulism.",
    "generalsKeynotes": "Constant restless motion of feet and lower limbs in bed; convulsions from suppressed rashes; intolerance of wine.",
    "modalitiesKeynotes": "Aggravation: Wine, stimulants, suppressed eruptions, evening. Amelioration: Menstrual flow, open air, discharges.",
    "complementary": "Puls., Sep.",
    "antidotes": "Camph., Hep., Ign.",
    "followsWell": "Calc., Puls., Sep., Sulph.",
    "inimical": "Cham., Nux-v.",
    "materiaMedica": [
      {
        "section": "Extremities",
        "content": "Cannot keep feet still; fidgety restless legs and feet in bed or while sitting; twitching of muscles."
      },
      {
        "section": "Nervous",
        "content": "Chronic brain fatigue; cerebral depression following suppressed measles or scarlet fever; rolls head from side to side."
      }
    ]
  },
  {
    "remedyNumber": 69,
    "name": "Stannum metallicum",
    "abbreviation": "stann.",
    "commonName": "Tin",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Profound chest weakness (patient cannot talk because chest feels empty); sweetish profuse expectoration; neuralgia increasing and decreasing gradually.",
    "mindKeynotes": "Sadness, tearful, hopeless about recovery; dreads meeting people.",
    "generalsKeynotes": "Extreme debility centering in chest; sweetish expectoration; neuralgic pains that come gradually, peak, and fade gradually.",
    "modalitiesKeynotes": "Aggravation: Talking, laughing, singing, lying on right side, warm drinks. Amelioration: Coughing up sputum, hard pressure.",
    "complementary": "Puls.",
    "antidotes": "Puls.",
    "followsWell": "Calc., Phos., Puls., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Extreme weakness of chest; patient is too weak to speak or answer questions; copious sweetish green sputum."
      },
      {
        "section": "Nervous",
        "content": "Neuralgia which begins slowly, increases gradually to immense intensity, and then subsides with equal slowness."
      }
    ]
  },
  {
    "remedyNumber": 70,
    "name": "Antimonium crudum",
    "abbreviation": "ant-c.",
    "commonName": "Black Sulphide of Antimony",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Thick milky white coating on tongue; sentimental mood in moonlight; gastric derangement from overeating; worse heat of sun.",
    "mindKeynotes": "Cross, peevish, cannot bear to be looked at or touched; sentimental romantic mood in moonlight.",
    "generalsKeynotes": "Thick milky white fur on tongue; corns and callosities on soles; gastric symptoms after cold bathing or sour wine.",
    "modalitiesKeynotes": "Aggravation: Heat of sun, hot radiated fire, cold bathing, overeating, sour wine. Amelioration: Open air, rest, moist warm air.",
    "complementary": "Squil., Sulph.",
    "antidotes": "Calc., Hep., Merc.",
    "followsWell": "Puls., Squil., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Tongue heavily coated with thick milky white fur; nausea and vomiting after dietary indiscretion, bread, or pastry."
      },
      {
        "section": "Skin",
        "content": "Thick horny callosities and corns on soles of feet, so sensitive that patient can walk only with difficulty."
      }
    ]
  },
  {
    "remedyNumber": 71,
    "name": "Antimonium tartaricum",
    "abbreviation": "ant-t.",
    "commonName": "Tartar Emetic",
    "kingdom": "Mineral",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Rattling of mucus in chest with inability to raise sputum; impending asphyxia; cyanosis, drowsiness, and cold clammy sweat.",
    "mindKeynotes": "Child clings to attendants, screams if touched; peevish, whiny, wants to be left alone.",
    "generalsKeynotes": "Lungs full of rattling mucus, but patient is too feeble to expectorate; blue face and lips; cold sweat; vomiting with relief.",
    "modalitiesKeynotes": "Aggravation: Lying down, warm room, damp cold, milk. Amelioration: Sitting erect, expectoration, cold open air.",
    "complementary": "Bar-c., Ipec.",
    "antidotes": "Chin., Con., Ipec., Puls.",
    "followsWell": "Bar-c., Bell., Ipec., Puls., Tereb.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Loud bubbling rattling in bronchial tubes; dyspnea with cyanosis; suffocative cough in elderly and small infants."
      },
      {
        "section": "Generals",
        "content": "Great drowsiness, prostration, and cold clammy sweat; nausea followed by exhaustion and relief after vomiting."
      }
    ]
  },
  {
    "remedyNumber": 72,
    "name": "Bismuthum subnitricum",
    "abbreviation": "bism.",
    "commonName": "Precipitated Subnitrate of Bismuth",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Gastric distress; vomits water the moment it reaches the stomach; anguish, cannot bear to be alone; gastric cancer palliative.",
    "mindKeynotes": "Solitude is intolerable; patient clings to company; restless pacing with anguish.",
    "generalsKeynotes": "Water is retained until stomach becomes full, then vomited in enormous quantities; burning cardialgia.",
    "modalitiesKeynotes": "Aggravation: Solitude, eating. Amelioration: Cold drinks, company, moving about.",
    "complementary": "Calc., Puls.",
    "antidotes": "Calc., Caps., Nux-v.",
    "followsWell": "Bell., Calc., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Intense burning gastralgia radiating to spine; vomits everything fluid immediately upon swallowing."
      },
      {
        "section": "Mind",
        "content": "Cannot stay alone for a single moment; walks up and down in room clutching someone's hand."
      }
    ]
  },
  {
    "remedyNumber": 73,
    "name": "Cadmium metallicum",
    "abbreviation": "cadm-met.",
    "commonName": "Metallic Cadmium",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Severe prostration with icy coldness; black coffee-ground vomiting; carcinoma of stomach; facial paralysis from draft.",
    "mindKeynotes": "Hopelessness, indifference, aversion to work and talking.",
    "generalsKeynotes": "Exhaustion resembling Arsenicum but worse from slightest motion; coffee-ground hematemesis.",
    "modalitiesKeynotes": "Aggravation: Motion, cold air, walking. Amelioration: Rest, eating, quiet warmth.",
    "complementary": "Ars., Carbo-v.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Bell., Bry.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Severe gastralgia; black vomiting resembling coffee grounds; carcinoma ventriculi with prostration."
      },
      {
        "section": "Face",
        "content": "Facial paralysis caused by riding in a cold carriage with wind blowing on face."
      }
    ]
  },
  {
    "remedyNumber": 74,
    "name": "Camphora",
    "abbreviation": "camph.",
    "commonName": "Camphor",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly yet uncovers",
    "isPolycrest": false,
    "shortDescription": "Sudden collapse with icy coldness of entire body yet cannot tolerate being covered; Asiatic cholera in initial stage.",
    "mindKeynotes": "Frenzied delirium with anxiety; fear of darkness and strange apparitions; mania to tear clothes.",
    "generalsKeynotes": "Icy coldness of surface of body, yet throws off all blankets and coverings; universal antidote to many remedies.",
    "modalitiesKeynotes": "Aggravation: Cold air, motion, night. Amelioration: Warm air, sweat, thinking of symptoms.",
    "complementary": "Canth.",
    "antidotes": "Op., Spig.",
    "followsWell": "Canth., Verat.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "State of sudden collapse: skin cold as ice, face pale and blue, cold breath; yet rejects all bedcovers."
      },
      {
        "section": "Gastrointestinal",
        "content": "First stage of cholera: sudden icy chill, prostration, hoarse voice, dry retching without stool."
      }
    ]
  },
  {
    "remedyNumber": 75,
    "name": "Cannabis indica",
    "abbreviation": "cann-i.",
    "commonName": "Indian Hemp / Hashish",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Exaggeration of time and space; rapid flow of vivid ideas; laughing uncontrollably at trifles; dual consciousness.",
    "mindKeynotes": "Time seems terribly long: a few seconds seem like centuries; distance seems immense; ecstatic visions and clairvoyance.",
    "generalsKeynotes": "Catalepsy; sensation as if top of head were opening and shutting; intense throbbing in cardiac region.",
    "modalitiesKeynotes": "Aggravation: Morning, coffee, tobacco, touch. Amelioration: Fresh air, cold water, resting.",
    "complementary": "Bell.",
    "antidotes": "Camph., Lemon juice.",
    "followsWell": "Bell., Hyos., Stram.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Exaggeration of duration of time and extent of space; senses exquisitely sharp; uncontrollable giggling; forgetting thoughts mid-sentence."
      },
      {
        "section": "Head",
        "content": "Sensation of heavy weight on vertex; throbbing of temples; piercing pain across forehead."
      }
    ]
  },
  {
    "remedyNumber": 76,
    "name": "Cannabis sativa",
    "abbreviation": "cann-s.",
    "commonName": "Hemp",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Acute urethral gonorrhea with burning and scalding during micturition; sensation of drops of water falling on head or heart.",
    "mindKeynotes": "Confusion, forgets what he is saying, anxious with palpitation.",
    "generalsKeynotes": "Sensation as of cold drops falling on various parts; burning along urethra extending backwards into bladder.",
    "modalitiesKeynotes": "Aggravation: Urinating, walking, touch, morning. Amelioration: Standing still, cool air.",
    "complementary": "Canth.",
    "antidotes": "Camph.",
    "followsWell": "Canth., Merc., Thuj.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Acute urethritis; burning scalding during and after micturition; urethra sensitive to touch; yellow purulent discharge."
      },
      {
        "section": "Chest",
        "content": "Sensation as if drops of cold water were falling from the heart or upon the chest; dyspnea."
      }
    ]
  },
  {
    "remedyNumber": 77,
    "name": "Capsicum annuum",
    "abbreviation": "caps.",
    "commonName": "Cayenne Pepper / Chili",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Homesickness with red flushed cheeks and sleeplessness; mastoiditis; burning pains not relieved by heat; flabby phlegmatic constitution.",
    "mindKeynotes": "Homesickness with tearfulness; obstinate, easily offended; nostalgia accompanied by sleeplessness.",
    "generalsKeynotes": "Burning sensations in mucous tracts; pain in mastoid bone behind ear; chill begins in back and relieved by hot stove.",
    "modalitiesKeynotes": "Aggravation: Cold draft, open air, dampness, beginning to move. Amelioration: Continued walking, heat.",
    "complementary": "Nat-m.",
    "antidotes": "Calad., Camph., Cina.",
    "followsWell": "Bell., Lyc., Puls., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Ears",
        "content": "Acute mastoiditis; swelling and tenderness of bone behind ear; purulent discharge with burning."
      },
      {
        "section": "Throat",
        "content": "Hot burning in throat of smokers and drinkers; relaxed uvula with sensation of constriction."
      }
    ]
  },
  {
    "remedyNumber": 78,
    "name": "Caulophyllum thalictroides",
    "abbreviation": "caul.",
    "commonName": "Blue Cohosh",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Uterine inertia with rigid os during labor; spasmodic erratic pains shooting in all directions; small joint rheumatism in women.",
    "mindKeynotes": "Apprehensive, fretful, irritable, nervous exhaustion during pregnancy and labor.",
    "generalsKeynotes": "Spasmodic labor pains that produce no dilatation of the os; shifting pains in fingers and small joints; habitual abortion.",
    "modalitiesKeynotes": "Aggravation: Open air, coffee, motion. Amelioration: Warmth, rest.",
    "complementary": "Puls., Sec.",
    "antidotes": "None recorded.",
    "followsWell": "Cimic., Puls., Sec.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Labor pains become weak, irregular, and spasmodic; rigid os uteri; severe shivering during labor without coldness."
      },
      {
        "section": "Extremities",
        "content": "Severe rheumatic aching in small joints of fingers and toes; cutting pains when closing hands."
      }
    ]
  },
  {
    "remedyNumber": 79,
    "name": "Chelidonium majus",
    "abbreviation": "chel.",
    "commonName": "Greater Celandine",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Constant fixed pain under the inferior angle of right scapula; hepatomegaly, jaundice, gallstones; relieved by very hot drinks.",
    "mindKeynotes": "Depression, irritable, domineering, weeping without cause.",
    "generalsKeynotes": "Right-sided remedy; liver disorders with yellow discoloration of skin, sclera, and urine; desire for very hot drinks.",
    "modalitiesKeynotes": "Aggravation: 4 AM and 4 PM, right side, motion, touch, weather change. Amelioration: Hot drinks, eating, pressure on right side.",
    "complementary": "Bry., Lyc.",
    "antidotes": "Acon., Camph.",
    "followsWell": "Bry., Lyc., Nux-v.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Liver",
        "content": "Hepatomegaly with constant fixed pain under lower angle of right shoulder blade; jaundice, clay-colored stool."
      },
      {
        "section": "Stomach",
        "content": "Gastric pains completely ameliorated by drinking very hot water or hot tea; craving for milk."
      }
    ]
  },
  {
    "remedyNumber": 80,
    "name": "Cicuta virosa",
    "abbreviation": "cic.",
    "commonName": "Water Hemlock",
    "kingdom": "Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent convulsions with opisthotonos; head turned backwards; puerile childish behavior; craving for indigestible things like chalk.",
    "mindKeynotes": "Childish childishness: plays with toys like an infant; mistrustful; shuns society; delirium.",
    "generalsKeynotes": "Spasms of back and neck; opisthotonos where body is arched backward like a bow; convulsions triggered by touch.",
    "modalitiesKeynotes": "Aggravation: Touch, cold air, jar, noise. Amelioration: Warmth, emission of flatus.",
    "complementary": "None recorded.",
    "antidotes": "Arn., Camph., Op.",
    "followsWell": "Bell., Cupr., Stram.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nervous",
        "content": "Violent epileptic and choreic convulsions; sudden shocks in head; pupils dilated and insensible; opisthotonos."
      },
      {
        "section": "Skin",
        "content": "Thick yellow honey-like crusts on chin and scalp (impetigo) with burning itching."
      }
    ]
  },
  {
    "remedyNumber": 81,
    "name": "Cimicifuga racemosa",
    "abbreviation": "cimic.",
    "commonName": "Black Cohosh / Actaea racemosa",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sensation of heavy black cloud settling over head; uterine and ovarian pains shooting across hips; chorea; puerperal mania.",
    "mindKeynotes": "Deep dark melancholy, fears insanity; feels as if wrapped in a heavy gloomy cloud; suspicious and talkative.",
    "generalsKeynotes": "Mental symptoms alternate with physical complaints; reflex uterine neuralgias; heart feels gripped in iron vise.",
    "modalitiesKeynotes": "Aggravation: During menses, cold damp air, motion. Amelioration: Warmth, eating, pressure.",
    "complementary": "Caul., Puls.",
    "antidotes": "Acon., Bapt., Camph.",
    "followsWell": "Bell., Bry., Caul., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Puerperal mania: sleepless, suspicious, incessant talking about impending doom; dread of insanity."
      },
      {
        "section": "Female",
        "content": "Sharp lancinating pains darting from hip to hip across pelvic region; dysmenorrhea with dark coagulated flow."
      }
    ]
  },
  {
    "remedyNumber": 82,
    "name": "Cina maritima",
    "abbreviation": "cina",
    "commonName": "Wormseed",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Constant boring and picking at nose; cross, peevish child who screams when approached; grinding of teeth in sleep; intestinal worms.",
    "mindKeynotes": "Cannot bear to be looked at or touched; desires many things but rejects them when offered; cross and touchy.",
    "generalsKeynotes": "Dark rings around eyes; boring of fingers into nose; grinding teeth during sleep; canine hunger immediately after meal.",
    "modalitiesKeynotes": "Aggravation: Looking at, touching, worms, evening. Amelioration: Lying on abdomen.",
    "complementary": "Dros.",
    "antidotes": "Camph., Caps.",
    "followsWell": "Bell., Calc., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Ill-tempered screaming child; refuses to be carried or stroked; asks for toys only to throw them away."
      },
      {
        "section": "Gastrointestinal",
        "content": "Canine hunger; child cries for food immediately after eating; picking nose; white turbid urine."
      }
    ]
  },
  {
    "remedyNumber": 83,
    "name": "Clematis erecta",
    "abbreviation": "clem.",
    "commonName": "Virgin's Bower",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Stricture of urethra with interrupted flow; testicles indurated and heavy; vesicular eczema on back of head and neck.",
    "mindKeynotes": "Memory impaired; indifferent, low-spirited, taciturn.",
    "generalsKeynotes": "Sycotic glandular indurations; urethral narrowing; urine flows in drops or in an interrupted intermittent stream.",
    "modalitiesKeynotes": "Aggravation: Night, warmth of bed, washing in cold water, new moon. Amelioration: Open air, sweating.",
    "complementary": "Merc., Thuj.",
    "antidotes": "Bry., Camph.",
    "followsWell": "Merc., Puls., Rhus-t., Thuj.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Interrupted stream of urine: stops and starts; burning in orifice of urethra during micturition."
      },
      {
        "section": "Male",
        "content": "Orchitis; testicles hard, swollen, sensitive to touch; pain along spermatic cord."
      }
    ]
  },
  {
    "remedyNumber": 84,
    "name": "Cocculus indicus",
    "abbreviation": "cocc.",
    "commonName": "Indian Cockle",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Ill-effects of night-watching, nursing the sick, and loss of sleep; motion sickness in car, train, or boat; vertigo and nausea.",
    "mindKeynotes": "Profound sadness from nursing sick relatives; slow of comprehension; cannot bear least contradiction.",
    "generalsKeynotes": "Paralytic weakness and numbness; motion sickness with nausea and faintness; hollow empty sensation in head and abdomen.",
    "modalitiesKeynotes": "Aggravation: Motion of boat or car, loss of sleep, eating, talking. Amelioration: Lying quietly in warm room.",
    "complementary": "Petr.",
    "antidotes": "Camph., Cham., Nux-v.",
    "followsWell": "Bell., Ign., Nux-v.",
    "inimical": "Coffee.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Exhaustion after nursing a sick relative; great muscular weakness, limbs tremble; vertigo on rising."
      },
      {
        "section": "Stomach",
        "content": "Nausea from riding in a carriage or watching moving objects; sea-sickness with cold perspiration."
      }
    ]
  },
  {
    "remedyNumber": 85,
    "name": "Coffea cruda",
    "abbreviation": "coff.",
    "commonName": "Unroasted Coffee",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Unusual activity of mind and body; wide awake at night with flow of vivid ideas; hypersensitive to all pain; ill-effects of joyful surprise.",
    "mindKeynotes": "Ecstasy, full of plans; mind racing with rapid thoughts; wide awake in bed after joyful excitement.",
    "generalsKeynotes": "Exquisite sensitivity to impressions: noises, touch, odors; pains seem intolerable and drive patient to despair.",
    "modalitiesKeynotes": "Aggravation: Over-excitement, sudden joy, night, cold air. Amelioration: Warmth, lying down, holding ice in mouth.",
    "complementary": "Acon.",
    "antidotes": "Acon., Cham., Nux-v.",
    "followsWell": "Acon., Bell., Ign., Puls.",
    "inimical": "Canth., Caust., Cocc., Ign.",
    "materiaMedica": [
      {
        "section": "Sleep",
        "content": "Total sleeplessness from mental exhilaration; patient is wide awake; ideas flow with rapid speed."
      },
      {
        "section": "Teeth",
        "content": "Toothache completely and rapidly relieved by holding cold water or ice in mouth, returning when warm."
      }
    ]
  },
  {
    "remedyNumber": 86,
    "name": "Colchicum autumnale",
    "abbreviation": "colch.",
    "commonName": "Meadow Saffron",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Intense nausea and faintness from the smell or sight of cooking food; acute gout in great toe; abdominal distension.",
    "mindKeynotes": "Aversion to hearing others talk; external impressions annoy; weeping mood.",
    "generalsKeynotes": "The smell of food cooking excites violent nausea and gagging; acute gouty paroxysms in small joints, especially great toe.",
    "modalitiesKeynotes": "Aggravation: Smell of cooking food, motion, touch, damp cold. Amelioration: Stooping forward, warmth, rest.",
    "complementary": "Spig.",
    "antidotes": "Bell., Camph., Cocc., Spig.",
    "followsWell": "Bell., Bry., Nux-v., Spig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Extreme disgust and fainting at the smell of broth, fish, or meat cooking; burning coldness in stomach."
      },
      {
        "section": "Extremities",
        "content": "Acute gouty inflammation of the big toe; joint swollen, red, hot, exquisitely sensitive to slightest jar."
      }
    ]
  },
  {
    "remedyNumber": 87,
    "name": "Colocynthis",
    "abbreviation": "coloc.",
    "commonName": "Bitter Apple",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Agonizing cramping abdominal colic forcing patient to bend double and press hard into abdomen; anger with indignation; sciatica.",
    "mindKeynotes": "Extremely irritable; offended easily; ailments from anger, indignation, and mortification.",
    "generalsKeynotes": "Violent neuralgic and muscular cramps; sciatic nerve pain running down right thigh relieved by hard pressure and heat.",
    "modalitiesKeynotes": "Aggravation: Anger, mortification, cold, gentle touch. Amelioration: Bending double, hard pressure, heat, passing gas.",
    "complementary": "Mag-p., Staph.",
    "antidotes": "Camph., Cham., Coff., Staph.",
    "followsWell": "Bell., Bry., Cham., Nux-v., Staph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Abdomen",
        "content": "Terrible cutting cramping colic; patient screams and bends double over the edge of a chair or presses fists into abdomen."
      },
      {
        "section": "Nervous",
        "content": "Right-sided sciatica: sharp shooting pains from hip to knee, relieved by lying on painful side and hard pressure."
      }
    ]
  },
  {
    "remedyNumber": 88,
    "name": "Conium maculatum",
    "abbreviation": "con.",
    "commonName": "Poison Hemlock",
    "kingdom": "Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Progressive ascending motor paralysis; stony hard induration of glands and breasts; vertigo turning head or rolling over in bed.",
    "mindKeynotes": "Inability to sustain mental effort; loss of memory; sluggishness; indifference to surroundings.",
    "generalsKeynotes": "Stony hardness of lymph nodes, testes, and mammary glands; ascending motor paralysis from feet upward; vertigo on turning in bed.",
    "modalitiesKeynotes": "Aggravation: Turning in bed, lying down, cold, tight clothing. Amelioration: Dark room, letting limbs hang down, motion.",
    "complementary": "Sil.",
    "antidotes": "Nit-ac., Coff.",
    "followsWell": "Bell., Calc., Dros., Lyc., Nux-v., Puls., Rhus-t., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Glandular",
        "content": "Stony hard lumps in breasts following a contusion; enlargement of axillary and cervical lymph glands."
      },
      {
        "section": "Head",
        "content": "Vertigo on turning head or rolling over in bed; objects seem to swim around him; worse closing eyes."
      }
    ]
  },
  {
    "remedyNumber": 89,
    "name": "Crotalus horridus",
    "abbreviation": "crot-h.",
    "commonName": "Rattlesnake Venom",
    "kingdom": "Animal",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Decomposed dark fluid non-coagulable hemorrhages from all body orifices; septic states; profound jaundice with hemorrhage.",
    "mindKeynotes": "Delirium with muttering; loquacious; hallucinations; fear of being alone.",
    "generalsKeynotes": "Dark fluid non-coagulating blood oozes from nose, mouth, ears, rectum, vagina; malignant septic infections; jaundice.",
    "modalitiesKeynotes": "Aggravation: Right side, sleep, dampness, spring, warm weather. Amelioration: Open fresh air, light.",
    "complementary": "Lach.",
    "antidotes": "Camph., Lach.",
    "followsWell": "Ars., Bell., Lach.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Blood",
        "content": "Complete decomposition of blood; dark thin non-coagulable hemorrhage from mucous membranes; purpura hemorrhagica."
      },
      {
        "section": "Liver",
        "content": "Malignant jaundice with hematuria and bleeding from gastrointestinal tract; septic toxemia."
      }
    ]
  },
  {
    "remedyNumber": 90,
    "name": "Croton tiglium",
    "abbreviation": "crot-t.",
    "commonName": "Croton Oil",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sudden watery diarrhea evacuated in one forceful gush as from a hydrant; intensely itchy vesicular eczema with extreme burning.",
    "mindKeynotes": "Anxious, depressed, morose, irritable.",
    "generalsKeynotes": "Watery stool coming out with enormous pressure; pain in nipples radiating to back when child nurses; painful eczema.",
    "modalitiesKeynotes": "Aggravation: Drinking, eating, nursing, touch. Amelioration: Gentle rubbing, sleep.",
    "complementary": "None recorded.",
    "antidotes": "Ant-t.",
    "followsWell": "Ant-t., Rhus-t., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stool",
        "content": "Copious yellow watery stool coming out in one sudden forceful shot like water from a high-pressure hose, immediately after eating."
      },
      {
        "section": "Skin",
        "content": "Pustular eczema on scrotum and face; vesicles with fiery red base and unbearable itching relieved by gentle rubbing."
      }
    ]
  },
  {
    "remedyNumber": 91,
    "name": "Cyclamen europaeum",
    "abbreviation": "cycl.",
    "commonName": "Sowbread",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Flickering blinding sparkles before eyes during headache; suppressed menses from getting feet wet; guilt and self-reproach.",
    "mindKeynotes": "Delusion of having committed a crime; neglected duty; weeping silently; conscientious scrupulosity.",
    "generalsKeynotes": "Visual disturbances preceding migraine: flickering, fiery sparks, halo; menses black, clotted, flow only when sitting.",
    "modalitiesKeynotes": "Aggravation: Open air, fat food, rest. Amelioration: Warm room, gentle walking, menses flow.",
    "complementary": "Puls.",
    "antidotes": "Camph., Coff., Puls.",
    "followsWell": "Bell., Puls., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Eyes",
        "content": "Flickering before eyes; glittering needle points or stars of light preceding one-sided hemicrania."
      },
      {
        "section": "Female",
        "content": "Menses black, clotted, profuse; flow ceases while moving about and flows only when resting or sitting."
      }
    ]
  },
  {
    "remedyNumber": 92,
    "name": "Digitalis purpurea",
    "abbreviation": "dig.",
    "commonName": "Foxglove",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Slow, intermittent, irregular pulse; sensation that heart will stop beating if patient makes the least movement; cardiac dropsy.",
    "mindKeynotes": "Great anxiety, fear of future, melancholy; fear of suffocation at night.",
    "generalsKeynotes": "Heart beats very slowly (bradycardia: 30 to 40 bpm) with sudden surges; sensation that heart will cease if moved.",
    "modalitiesKeynotes": "Aggravation: Movement, sitting erect, cold drinks, after eating. Amelioration: Lying flat on back, rest in bed.",
    "complementary": "Bell.",
    "antidotes": "Camph., Spig.",
    "followsWell": "Bell., Bry., Lyc., Spig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Heart",
        "content": "Extremely slow pulse, irregular and intermittent; sudden sensation that heart will stop beating if he moves."
      },
      {
        "section": "Dropsy",
        "content": "Cardiac dropsy with scanty dark suppressed urine and pale clay-colored stool; cyanosis of lips and tongue."
      }
    ]
  },
  {
    "remedyNumber": 93,
    "name": "Dioscorea villosa",
    "abbreviation": "dios.",
    "commonName": "Wild Yam",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent twisting flatulent colic where patient is relieved by stretching out and bending backwards (opposite of Colocynthis).",
    "mindKeynotes": "Callous, irritable, feels tired of life.",
    "generalsKeynotes": "Severe twisting griping pains radiating to chest, back, and arms; compelling the patient to hyperextend spine and bend backwards.",
    "modalitiesKeynotes": "Aggravation: Bending forward, lying down, morning. Amelioration: Standing erect, stretching backward, walking.",
    "complementary": "None recorded.",
    "antidotes": "Cham.",
    "followsWell": "Coloc., Mag-p., Nux-v.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Abdomen",
        "content": "Violent twisting colic radiating from abdomen into back and extremities; patient stands up and bends backward for relief."
      },
      {
        "section": "Stomach",
        "content": "Sinking empty feeling in epigastrium; eructations of large volumes of tasteless gas."
      }
    ]
  },
  {
    "remedyNumber": 94,
    "name": "Dulcamara",
    "abbreviation": "dulc.",
    "commonName": "Bittersweet / Woody Nightshade",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "All complaints triggered by a sudden transition from warm dry weather to cold damp air; autumn catarrh; hives after getting wet.",
    "mindKeynotes": "Domineering, impatient, irritable, quarrelsome.",
    "generalsKeynotes": "Ailments from chilling when heated, sitting on damp ground, or sudden autumn temperature drops. Catarrh, diarrhea, rheumatism.",
    "modalitiesKeynotes": "Aggravation: Cold damp weather, getting chilled, autumn, rest. Amelioration: Warm dry weather, moving about.",
    "complementary": "Bar-c., Kali-s.",
    "antidotes": "Camph., Cupr., Ipec.",
    "followsWell": "Bell., Bry., Calc., Lyc., Rhus-t., Sep.",
    "inimical": "Bell., Lachesis.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Rheumatic and catarrhal symptoms induced by sudden damp cold; diarrhea from walking barefoot in wet grass."
      },
      {
        "section": "Skin",
        "content": "Urticaria and thick crusty eczema provoked by cold rain or damp air; large smooth flat warts on hands."
      }
    ]
  },
  {
    "remedyNumber": 95,
    "name": "Echinacea angustifolia",
    "abbreviation": "echi.",
    "commonName": "Purple Coneflower",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Septic conditions; blood poisoning; foul gangrenous ulcerations; bites and stings of venomous insects; adynamic low fevers.",
    "mindKeynotes": "Confused, depressed, cannot exert mind; feels weary and drowsy.",
    "generalsKeynotes": "Septicemia, carbuncles, gangrene, foul discharges; tongue dry with brown coat; tingling in lips and tongue.",
    "modalitiesKeynotes": "Aggravation: Motion, after eating. Amelioration: Rest, lying down.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Bapt., Crot-h., Pyrog.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Septic poisoning, puerperal fever; carbuncles with foul necrotic center; bites of venomous spiders and snakes."
      },
      {
        "section": "Mouth",
        "content": "Numb tingling sensation of tongue and fauces; canker sores and foul stomatitis with bleeding gums."
      }
    ]
  },
  {
    "remedyNumber": 96,
    "name": "Equisetum hyemale",
    "abbreviation": "equis.",
    "commonName": "Scouring Rush / Horsetail",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Severe dull pain and constant fullness in bladder not relieved by micturition; nocturnal enuresis in children with vivid nightmares.",
    "mindKeynotes": "Irritable, fatigue on waking.",
    "generalsKeynotes": "Affection of urinary bladder: constant fullness, aching pain; urine clear or contains excess mucus; nocturnal bed-wetting.",
    "modalitiesKeynotes": "Aggravation: Right side, motion, pressure. Amelioration: Afternoon, lying down.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Canth., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Bladder",
        "content": "Severe dull pain and distress in bladder as if distended, which is not relieved after urinating."
      },
      {
        "section": "Urinary",
        "content": "Incontinence of urine in children; wets bed at night during vivid nightmares or dreams."
      }
    ]
  },
  {
    "remedyNumber": 97,
    "name": "Eupatorium perfoliatum",
    "abbreviation": "eup-per.",
    "commonName": "Boneset / Thoroughwort",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Intense deep aching in bones as if broken; influenza and dengue; great thirst for cold water before and during the chill.",
    "mindKeynotes": "Anxious, groaning with pain, restless from aching bones.",
    "generalsKeynotes": "Bruised soreness of whole body with deep bone pains; chills begin between 7 and 9 AM; vomiting of bile as chill passes off.",
    "modalitiesKeynotes": "Aggravation: Periodically (7-9 AM), cold air, motion. Amelioration: Perspiration, conversation, hands and knees.",
    "complementary": "Nat-m.",
    "antidotes": "None recorded.",
    "followsWell": "Bry., Gels., Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Influenza with agonizing bone ache as if bones would snap; eyeballs sore and painful on movement."
      },
      {
        "section": "Fever",
        "content": "Chill preceded by intense thirst for cold water; vomiting of bitter yellow bile at close of chill."
      }
    ]
  },
  {
    "remedyNumber": 98,
    "name": "Euphrasia officinalis",
    "abbreviation": "euphr.",
    "commonName": "Eyebright",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Profuse acrid burning lachrymation with bland profuse nasal coryza (opposite of Allium cepa); conjunctivitis and photophobia.",
    "mindKeynotes": "Indolent, disinclined to mental exertion, taciturn.",
    "generalsKeynotes": "Violent irritation of eyes and respiratory tract; tears burn and excoriate the cheeks; fluent bland nasal discharge.",
    "modalitiesKeynotes": "Aggravation: Sunlight, wind, warmth, evening. Amelioration: In dark, coffee.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Puls.",
    "followsWell": "Acon., Bell., Merc., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Eyes",
        "content": "Catarrhal conjunctivitis; profuse burning acrid tears making cheeks raw and red; intense photophobia."
      },
      {
        "section": "Nose",
        "content": "Profuse bland non-irritating coryza; coughing during daytime only, not at night."
      }
    ]
  },
  {
    "remedyNumber": 99,
    "name": "Fluoricum acidum",
    "abbreviation": "fl-ac.",
    "commonName": "Hydrofluoric Acid",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Great heat of body; wants cool bathing; destructive ulcerations; fistula lachrymalis; dental fistulae; increased buoyancy.",
    "mindKeynotes": "Extraordinary buoyant feeling; indifference to loved ones; cheerful and energetic.",
    "generalsKeynotes": "Deep tissue destruction: bone caries, necrosis, fistulae; intense bodily heat; craving for cold water bathing.",
    "modalitiesKeynotes": "Aggravation: Warmth, morning, warm drinks. Amelioration: Cold water, cold air, walking briskly.",
    "complementary": "Sil.",
    "antidotes": "None recorded.",
    "followsWell": "Calc-f., Kali-c., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Bones",
        "content": "Dental fistulae, necrosis of jawbone, fistula lachrymalis; rapid ulceration with copious foul discharge."
      },
      {
        "section": "Generals",
        "content": "Patient cannot bear warm covering; walks about barefoot; relieved by bathing in cold water."
      }
    ]
  },
  {
    "remedyNumber": 100,
    "name": "Glonoinum",
    "abbreviation": "glon.",
    "commonName": "Nitroglycerine",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Violent throbbing pulsating congestive headache from sun exposure or radiant heat; surges of blood to head; loses orientation in streets.",
    "mindKeynotes": "Loses orientation in well-known streets; confusion of location; terror of apoplexy.",
    "generalsKeynotes": "Sudden upward rush of blood to head; carotid arteries throb visibly; headache synchronous with each heartbeat.",
    "modalitiesKeynotes": "Aggravation: Sun, jar, motion, bending head backward, wine. Amelioration: Cold applications, pressure, lying still.",
    "complementary": "Bell.",
    "antidotes": "Acon., Camph., Coff.",
    "followsWell": "Bell., Gels.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Throbbing bursting headache as if skull would crack open; carotid pulsations visible across room; sunstroke."
      },
      {
        "section": "Cardiovascular",
        "content": "Violent action of heart with pulsating throbbing felt across chest and neck."
      }
    ]
  },
  {
    "remedyNumber": 101,
    "name": "Hamamelis virginiana",
    "abbreviation": "ham.",
    "commonName": "Witch Hazel",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Passive dark venous hemorrhages; bruised soreness of affected vessels and veins; large bleeding hemorrhoids and varices.",
    "mindKeynotes": "Depressed, irritable, quiet, dislikes sympathy.",
    "generalsKeynotes": "Venous stasis and engorgement; dark, sluggish, oozing venous blood; bruised sore aching in muscles and veins.",
    "modalitiesKeynotes": "Aggravation: Warm moist air, touch, motion. Amelioration: Rest, cool air, bending backward.",
    "complementary": "Ferr.",
    "antidotes": "Arn., Camph.",
    "followsWell": "Bell., Puls., Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Vascular",
        "content": "Varicose veins; veins dilated, sensitive, hard, and knotty; passive dark venous oozing from nose or uterus."
      },
      {
        "section": "Rectum",
        "content": "Hemorrhoids bleed profusely with burning soreness in anus; backache as if back would break."
      }
    ]
  },
  {
    "remedyNumber": 102,
    "name": "Helleborus niger",
    "abbreviation": "hell.",
    "commonName": "Christmas Rose / Black Hellebore",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Stupefaction and sensorial apathy; staring vacantly with dilated pupils; hydrocephalus with rolling of head on pillow; dropsy.",
    "mindKeynotes": "Complete sensory stupor: sees nothing, hears nothing, tastes nothing; stares vacantly; involuntary sighing.",
    "generalsKeynotes": "Dropsical effusions following scarlet fever; rolling head on pillow day and night; automatic motion of one arm and leg.",
    "modalitiesKeynotes": "Aggravation: 4 to 8 PM, cold air, exertion. Amelioration: Warmth, lying quiet in dark.",
    "complementary": "Zinc.",
    "antidotes": "Camph., Chin.",
    "followsWell": "Bell., Bry., Zinc.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Sensorial blunting; answers questions slowly or not at all; memory completely abolished in acute encephalitis."
      },
      {
        "section": "Head",
        "content": "Hydrocephalus: rolls head from side to side boring occiput into pillow; screams out suddenly; squinting."
      }
    ]
  },
  {
    "remedyNumber": 103,
    "name": "Helonias dioica",
    "abbreviation": "helon.",
    "commonName": "False Unicorn / Blazing Star",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Consciousness of the womb (uterus feels heavy and dragged down); profound physical fatigue ameliorated by mental occupation; anemia.",
    "mindKeynotes": "Deep melancholy; irritable, fault-finding; cheered up and improved by keeping busy and occupied.",
    "generalsKeynotes": "Tired, dragging-down sensation in sacral region and pelvis; patient is constantly conscious of uterus; chlorosis.",
    "modalitiesKeynotes": "Aggravation: Fatigue, thinking of symptoms, touch. Amelioration: Mental occupation, diversion.",
    "complementary": "Sep.",
    "antidotes": "None recorded.",
    "followsWell": "Aletr., Puls., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Uterus feels dragged down and heavy; patient is intensely conscious of the womb; prolapse; leukorrhea like curdled milk."
      },
      {
        "section": "Back",
        "content": "Aching and burning across kidneys and sacrum, completely relieved when mind is engaged in active work."
      }
    ]
  },
  {
    "remedyNumber": 104,
    "name": "Hydrastis canadensis",
    "abbreviation": "hydr.",
    "commonName": "Golden Seal",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Thick, yellow, tenacious, ropy mucous discharges from all mucous membranes; faint empty sinking at epigastrium; constipation.",
    "mindKeynotes": "Gloomy, taciturn, despondent, forgetful, dislikes mental work.",
    "generalsKeynotes": "Profuse yellow ropy secretions that can be drawn into long strings; empty goneness at stomach; cachectic states.",
    "modalitiesKeynotes": "Aggravation: Inhaling cold air, warmth of bed, eating. Amelioration: Resting, pressure.",
    "complementary": "Kali-bi.",
    "antidotes": "None recorded.",
    "followsWell": "Kali-bi., Nux-v., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Weak sinking gone feeling at the pit of stomach, not relieved by eating; chronic atonic dyspepsia."
      },
      {
        "section": "Mucous",
        "content": "Thick yellow ropy secretions from nose, throat, vagina, and bowels that hang down in long tenacious strings."
      }
    ]
  },
  {
    "remedyNumber": 105,
    "name": "Iris versicolor",
    "abbreviation": "iris",
    "commonName": "Blue Flag",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Periodic Sunday or weekly sick migraines preceded by visual blurring; burning sensation throughout entire alimentary canal.",
    "mindKeynotes": "Low-spirited, despondent, irritable before headache.",
    "generalsKeynotes": "Burning from mouth to anus: sour burning vomiting, burning in pancreas and esophagus, burning watery diarrhea.",
    "modalitiesKeynotes": "Aggravation: Periodically (every Sunday), sweets, evening. Amelioration: Continuous gentle motion.",
    "complementary": "None recorded.",
    "antidotes": "Nux-v.",
    "followsWell": "Bell., Nux-v., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Frontal sick headache with nausea, preceded by visual blurring; vomiting of sour fiery fluid that burns throat."
      },
      {
        "section": "Gastrointestinal",
        "content": "Burning sensation throughout gastrointestinal tract; acute pancreatitis with fatty watery stools."
      }
    ]
  },
  {
    "remedyNumber": 106,
    "name": "Kalmia latifolia",
    "abbreviation": "kalm.",
    "commonName": "Mountain Laurel",
    "kingdom": "Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Rheumatic and neuralgic pains shooting downwards from above; cardiac hypertrophy and endocarditis secondary to suppressed rheumatism.",
    "mindKeynotes": "Anxious about health, depressed, irritable.",
    "generalsKeynotes": "Pains travel downwards (hips to feet, shoulders to hands); violent tachycardia and pain around heart with rheumatism.",
    "modalitiesKeynotes": "Aggravation: Motion, turning, sun, night. Amelioration: Lying on back, resting.",
    "complementary": "Spig.",
    "antidotes": "Bell.",
    "followsWell": "Bell., Calc., Spig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Heart",
        "content": "Severe carditis with rapid fluttering pulse; rheumatic metastasis to heart valves with sharp shooting pains."
      },
      {
        "section": "Extremities",
        "content": "Rheumatic neuralgic pains that shoot rapidly from above downward into legs and fingers."
      }
    ]
  },
  {
    "remedyNumber": 107,
    "name": "Kreosotum",
    "abbreviation": "kreos.",
    "commonName": "Beechwood Creosote",
    "kingdom": "Mineral/Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Rapid decay and black crumbling teeth in children; acrid excoriating discharges; offensive putrid odors; vomiting in pregnancy.",
    "mindKeynotes": "Cross, willful, wants everything and refuses it when given (like Cina); weeping.",
    "generalsKeynotes": "Discharges are dark, putrid, acrid, excoriating the parts they touch; teeth erupt already dark and decay rapidly.",
    "modalitiesKeynotes": "Aggravation: Cold, rest, after menstruation, lying on back. Amelioration: Warmth, hot drinks, motion.",
    "complementary": "Sulph.",
    "antidotes": "Acon., Chin., Nux-v.",
    "followsWell": "Ars., Bell., Sulph.",
    "inimical": "Carb-v.",
    "materiaMedica": [
      {
        "section": "Teeth",
        "content": "Teeth decay as rapidly as they erupt; gums spongy, dark red, and bleed easily; foul breath."
      },
      {
        "section": "Female",
        "content": "Yellow acrid excoriating leukorrhea smelling like green corn; persistent vomiting in pregnancy."
      }
    ]
  },
  {
    "remedyNumber": 108,
    "name": "Lac caninum",
    "abbreviation": "lac-c.",
    "commonName": "Bitch's Milk",
    "kingdom": "Animal",
    "miasm": "Tubercular",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Symptoms alternate sides (left to right, right to left); delusions of snakes and dirty body; mastitis and painful breast engorgement.",
    "mindKeynotes": "Despondent; delusion that she is dirty, despised; dread of snakes; thinks she is looking at a corpse in the mirror.",
    "generalsKeynotes": "Erratic alternation of symptoms from one side of body to the other; shiny glistening throat membrane; painful engorged breasts.",
    "modalitiesKeynotes": "Aggravation: Morning, touch, jar, cold air. Amelioration: Open air, cold applications.",
    "complementary": "Con.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Con., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Throat",
        "content": "Diphtheritic ulceration alternating repeatedly from left tonsil to right and back; glistening pearl-like exudate."
      },
      {
        "section": "Breasts",
        "content": "Breasts swollen, painful, sensitive to jar before menses; useful for drying up milk in weaning."
      }
    ]
  },
  {
    "remedyNumber": 109,
    "name": "Lac defloratum",
    "abbreviation": "lac-d.",
    "commonName": "Skimmed Cow's Milk",
    "kingdom": "Animal",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sick migraine headache preceded by temporary blindness; obstinate chronic constipation with large hard stools; chilly patient.",
    "mindKeynotes": "Depression, feels everyone is better than herself; aversion to work.",
    "generalsKeynotes": "Severe sick headache with nausea and profuse pale urination as headache subsides; intense chilliness; aversion to milk.",
    "modalitiesKeynotes": "Aggravation: Cold air, drafts, periodic. Amelioration: Pressure, warm wraps.",
    "complementary": "Nat-m.",
    "antidotes": "None recorded.",
    "followsWell": "Nat-m., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Sick headache: begins with dimness of vision or complete blindness; vertex throbs; followed by copious urination."
      },
      {
        "section": "Stool",
        "content": "Obstinate constipation; stool hard, large, dry, requiring mechanical extraction."
      }
    ]
  },
  {
    "remedyNumber": 110,
    "name": "Lilium tigrinum",
    "abbreviation": "lil-t.",
    "commonName": "Tiger Lily",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Bearing down sensation in pelvis as if all pelvic organs would issue through vulva; hurriedness; religious mania and sexual agitation.",
    "mindKeynotes": "Tormented about salvation; sexual excitement with religious remorse; must hurry, cannot walk slow.",
    "generalsKeynotes": "Bearing-down sensation in pelvis compelling patient to press hand firmly against vulva or cross legs; palpitation.",
    "modalitiesKeynotes": "Aggravation: Warm room, standing, consolation. Amelioration: Fresh cool air, crossing legs, busy work.",
    "complementary": "Helon., Sep.",
    "antidotes": "Puls.",
    "followsWell": "Bell., Helon., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Intense bearing-down as if everything would protrude from vagina; must cross limbs or press hand against vulva."
      },
      {
        "section": "Heart",
        "content": "Sensation as if heart were grasped in a vise or alternately grasped and released; fluttering pulse."
      }
    ]
  },
  {
    "remedyNumber": 111,
    "name": "Lobelia inflata",
    "abbreviation": "lob.",
    "commonName": "Indian Tobacco",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Extreme nausea with profuse salivation and muscular relaxation; asthmatic dyspnea relieved by walking rapidly; faintness.",
    "mindKeynotes": "Despondent, fears death, weeping, apprehensive.",
    "generalsKeynotes": "Deathly nausea with cold clammy sweat; profound relaxation of all muscular tissues; dyspnea better by walking fast.",
    "modalitiesKeynotes": "Aggravation: Morning on waking, cold drinks, tobacco. Amelioration: Walking briskly, warm food.",
    "complementary": "None recorded.",
    "antidotes": "Ipec.",
    "followsWell": "Ant-t., Ipec.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Deathly sickness and nausea with gushing watery salivation and faint sinking in epigastrium."
      },
      {
        "section": "Respiratory",
        "content": "Spasmodic asthma with constriction of chest; remarkably relieved by walking rapidly in open air."
      }
    ]
  },
  {
    "remedyNumber": 112,
    "name": "Lycopus virginicus",
    "abbreviation": "lycps-v.",
    "commonName": "Bugleweed",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Hyperthyroidism with exophthalmos; violent rapid bounding tumultuous heartbeat; pulmonary hemorrhages; pericarditis.",
    "mindKeynotes": "Stupor, indifference to surroundings, mental restlessness.",
    "generalsKeynotes": "Violent tachycardia: cardiac action so rapid and tumultuous it shakes the chest; exophthalmic goiter; hemoptysis.",
    "modalitiesKeynotes": "Aggravation: Ascending, exercise, lying on left side. Amelioration: Warm room, resting.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Dig., Spig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Heart",
        "content": "Tumultuous cardiac palpitation; exophthalmos; pulse quick, irregular, feeble; cardiac asthma."
      },
      {
        "section": "Chest",
        "content": "Hemoptysis with rapid pulse; cough with bright red blood-spitting in heart conditions."
      }
    ]
  },
  {
    "remedyNumber": 113,
    "name": "Melilotus officinalis",
    "abbreviation": "meli.",
    "commonName": "Sweet Clover",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Engorged pulsating congestive headache promptly relieved by a profuse nosebleed; fiery red flushed face.",
    "mindKeynotes": "Delusions of persecution, fears insanity, shy, weeping mood.",
    "generalsKeynotes": "Intense arterial engorgement of head with dark red face; headache completely ameliorated by epistaxis or menstrual flow.",
    "modalitiesKeynotes": "Aggravation: 4 PM, approach of storm, motion. Amelioration: Epistaxis, hemorrhage, open air.",
    "complementary": "Bell.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Glon.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Throbbing congestive headache; face purplish red; bursting fullness relieved immediately by a profuse nosebleed."
      },
      {
        "section": "Nose",
        "content": "Profuse bright red epistaxis which instantly clears all head congestion and vertigo."
      }
    ]
  },
  {
    "remedyNumber": 114,
    "name": "Menyanthes trifoliata",
    "abbreviation": "menyan.",
    "commonName": "Buckbean",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Icy coldness of hands and feet with burning head; heavy pressure on vertex relieved by heavy hand pressure; intermittent fever.",
    "mindKeynotes": "Anxious about health, weeping, taciturn, sadness.",
    "generalsKeynotes": "Icy coldness of extremities while face and head are hot; pressure on top of head ameliorated by hard manual compression.",
    "modalitiesKeynotes": "Aggravation: Rest, ascending, evening. Amelioration: Hard pressure on vertex, stooping.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Chin., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Weight on vertex as if several pounds were pressing on top of head, relieved by pressing hard with hand."
      },
      {
        "section": "Extremities",
        "content": "Icy coldness of fingers and toes; feet cold as marble even in a warm room."
      }
    ]
  },
  {
    "remedyNumber": 115,
    "name": "Mephitis mephitica",
    "abbreviation": "meph.",
    "commonName": "Skunk Secretion",
    "kingdom": "Animal",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent whooping cough where patient cannot exhale; sudden spasm of glottis with blue face and impending suffocation.",
    "mindKeynotes": "Excited, talkative, cannot sleep from rush of ideas.",
    "generalsKeynotes": "Spasmodic cough: paroxysms so violent child cannot breathe out; vomiting of food; asthmatic suffocation.",
    "modalitiesKeynotes": "Aggravation: Night, lying down, talking. Amelioration: Cold water washing, ice.",
    "complementary": "Dros.",
    "antidotes": "None recorded.",
    "followsWell": "Dros., Ipec.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Whooping cough: child convulses, turns cyanotic, cannot exhale; vomiting of food after cough."
      },
      {
        "section": "Larynx",
        "content": "Spasm of glottis: sudden suffocative choking on drinking or talking."
      }
    ]
  },
  {
    "remedyNumber": 116,
    "name": "Mercurius corrosivus",
    "abbreviation": "merc-c.",
    "commonName": "Corrosive Sublimate",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Continuous intolerable tenesmus of bladder and rectum: 'never-get-done' sensation; destructive dysentery with shreddy bloody stool.",
    "mindKeynotes": "Stupor, delirium, anxiety, great restlessness.",
    "generalsKeynotes": "Violent destructive ulcerations; tenesmus vesicae et recti; stools consist of bloody shreds and mucous scrapings.",
    "modalitiesKeynotes": "Aggravation: Evening, night, cold damp, swallowing. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "Calc., Sil.",
    "followsWell": "Acon., Bell., Canth.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stool",
        "content": "Dysentery with extreme tenesmus; patient cannot leave the commode; shreddy mucus and blood."
      },
      {
        "section": "Urinary",
        "content": "Violent burning and tenesmus in bladder; urine passed drop by drop with excruciating burning."
      }
    ]
  },
  {
    "remedyNumber": 117,
    "name": "Mercurius cyanatus",
    "abbreviation": "merc-cy.",
    "commonName": "Cyanide of Mercury",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Malignant diphtheria with necrotic gray membrane; profound cardiac exhaustion, coldness, and collapse.",
    "mindKeynotes": "Great apathy, prostration, despair.",
    "generalsKeynotes": "Rapidly spreading necrotic diphtheritic exudations; gangrene; pulse becomes quick, weak, and thready.",
    "modalitiesKeynotes": "Aggravation: Swallowing, speaking, cold air. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Apis, Bell., Merc.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Throat",
        "content": "Diphtheria with extensive necrotic membrane covering fauces and palate; fetid breath; profound weakness."
      },
      {
        "section": "Generals",
        "content": "Collapse in malignant septic states; pulse scarcely perceptible; icy cold sweat."
      }
    ]
  },
  {
    "remedyNumber": 118,
    "name": "Mercurius dulcis",
    "abbreviation": "merc-d.",
    "commonName": "Calomel",
    "kingdom": "Mineral",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Catarrhal inflammation of middle ear and eustachian tube; pale clay-colored stool in children; hepatic sluggishness.",
    "mindKeynotes": "Sluggish, irritable, depressed.",
    "generalsKeynotes": "Catarrhal deafness; pallor; liver enlargement; pale acholic stool with dark concentrated urine.",
    "modalitiesKeynotes": "Aggravation: Night, cold damp. Amelioration: Warmth.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Merc., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Ears",
        "content": "Eustachian catarrh causing deafness in children; membrane retracted; crackling in ear when blowing nose."
      },
      {
        "section": "Stool",
        "content": "Pale clay-colored or dark green slimy stools with tenesmus; infantile diarrhea."
      }
    ]
  },
  {
    "remedyNumber": 119,
    "name": "Mercurius iodatus flavus",
    "abbreviation": "merc-i-f.",
    "commonName": "Yellow Iodide of Mercury / Proto-iodide",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Right-sided throat ulceration; thick bright yellow coating at the base of tongue; cervical lymphadenopathy.",
    "mindKeynotes": "Ill-tempered, anxious, tearful.",
    "generalsKeynotes": "Right tonsil affected first; bright golden yellow fur on base of tongue while tip and edges are red; glandular swelling.",
    "modalitiesKeynotes": "Aggravation: Night, warm drinks, right side. Amelioration: Cold drinks, open air.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Merc., Phyt.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Throat",
        "content": "Right tonsil swollen and ulcerated; painful swallowing shooting into right ear; cervical glands enlarged."
      },
      {
        "section": "Mouth",
        "content": "Tongue coated with thick bright golden-yellow fur on the posterior half; profuse salivation."
      }
    ]
  },
  {
    "remedyNumber": 120,
    "name": "Mercurius iodatus ruber",
    "abbreviation": "merc-i-r.",
    "commonName": "Red Iodide of Mercury / Biniodide",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Left-sided tonsillar and throat ulceration; painful swallowing shooting to left ear; dark red fauces with indurated glands.",
    "mindKeynotes": "Depression, fretful, anxious.",
    "generalsKeynotes": "Left-sided affections; tonsils dark red with follicular ulceration; glandular induration; syphilitic nodes.",
    "modalitiesKeynotes": "Aggravation: Swallowing, left side, empty swallowing. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Lachesis, Phyt.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Throat",
        "content": "Ulceration of left tonsil and fauces; sharp pain darting into left ear on swallowing."
      },
      {
        "section": "Glandular",
        "content": "Hard stony swelling of cervical and submaxillary glands with cellular infiltration."
      }
    ]
  },
  {
    "remedyNumber": 121,
    "name": "Mezereum",
    "abbreviation": "mez.",
    "commonName": "Spurge Olive",
    "kingdom": "Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Intolerable burning itching vesicular eruptions beneath thick chalky crusts with oozing pus; nocturnal bone periostitis.",
    "mindKeynotes": "Apprehensive, memory weak, distracted, easily vexed.",
    "generalsKeynotes": "Thick whitish crusts with yellow pus underneath; violent bone pains in shinbones (tibiae) worse at night in bed.",
    "modalitiesKeynotes": "Aggravation: Cold air, night, heat of bed, touch. Amelioration: Wrapping up warmly, open air.",
    "complementary": "Merc.",
    "antidotes": "Calc., Kali-i., Merc.",
    "followsWell": "Merc., Nit-ac., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Skin",
        "content": "Eczema with thick chalk-like leathery crusts under which thick yellow purulent matter collects; violent itching."
      },
      {
        "section": "Bones",
        "content": "Periostitis and bone pains in tibiae; bones feel sore, swollen, worse at night in warmth of bed."
      }
    ]
  },
  {
    "remedyNumber": 122,
    "name": "Millefolium",
    "abbreviation": "mill.",
    "commonName": "Yarrow",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Painless active arterial hemorrhages of bright red blood without fever or anxiety (distinguished from Aconite); epistaxis; hemoptysis.",
    "mindKeynotes": "Quiet, calm, absence of fear (unlike Aconite).",
    "generalsKeynotes": "Profuse flow of thin bright red active blood from lungs, nose, bowels, or bladder after falls or sprains.",
    "modalitiesKeynotes": "Aggravation: Exertion, fall, coffee. Amelioration: Cold water, rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Arn., Ham.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Hemorrhage",
        "content": "Active bright red arterial hemorrhage from nose, stomach, lungs, or uterus, entirely free from mental anxiety."
      },
      {
        "section": "Chest",
        "content": "Hemoptysis in phthisis; blood raised with easy loose hacking cough."
      }
    ]
  },
  {
    "remedyNumber": 123,
    "name": "Moschus",
    "abbreviation": "mosch.",
    "commonName": "Musk",
    "kingdom": "Animal",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Hysterical spasms with sudden fainting; globus hystericus; uncontrollable laughter alternating with weeping; cold skin.",
    "mindKeynotes": "Hysterical paroxysms: screams, faints, uncontrollable fits of laughing followed by weeping; delirium.",
    "generalsKeynotes": "Sudden nervous syncope; globus sensation in throat; violent palpitation of heart with sensation of trembling.",
    "modalitiesKeynotes": "Aggravation: Cold air, pressure. Amelioration: Open fresh air, rubbing.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Coff.",
    "followsWell": "Bell., Ign., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nervous",
        "content": "Hysterical attacks of syncope and fainting; tetanic spasms with coldness of skin and imperceptible pulse."
      },
      {
        "section": "Chest",
        "content": "Spasmodic nervous suffocative asthma with constriction in larynx."
      }
    ]
  },
  {
    "remedyNumber": 124,
    "name": "Muriaticum acidum",
    "abbreviation": "mur-ac.",
    "commonName": "Hydrochloric Acid",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Typhoid prostration where patient slides down in bed; involuntary stool when passing urine; inflamed bluish hemorrhoids.",
    "mindKeynotes": "Apathy, quiet, low muttering delirium, unconsciousness.",
    "generalsKeynotes": "Extreme muscular prostration: lower jaw drops, slides down toward foot of bed; involuntary evacuation while urinating.",
    "modalitiesKeynotes": "Aggravation: Sitting, touch, cold, sea-bathing. Amelioration: Motion, warmth.",
    "complementary": "None recorded.",
    "antidotes": "Bry., Camph.",
    "followsWell": "Bell., Bry., Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Low adynamic typhoid states: patient slides down in bed from sheer weakness; tongue dry like leather."
      },
      {
        "section": "Rectum",
        "content": "Extremely sensitive bluish purple hemorrhoids; involuntary stool while voiding urine."
      }
    ]
  },
  {
    "remedyNumber": 125,
    "name": "Naja tripudians",
    "abbreviation": "naja",
    "commonName": "Cobra Venom",
    "kingdom": "Animal",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Valvular heart lesions; choking constriction in throat; irritating cardiac cough; left ovarian neuralgias.",
    "mindKeynotes": "Melancholy, suicidal brooding, feels injured by friends.",
    "generalsKeynotes": "Hypertrophy of heart, damaged valves; dry hacking sympathetic cough from cardiac hypertrophy; throat constriction.",
    "modalitiesKeynotes": "Aggravation: Lying on left side, sleep, carriage riding. Amelioration: Lying on right side, walking in open air.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Lachesis, Spig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Heart",
        "content": "Valvular heart murmurs; angina pectoris radiating to left arm and neck; pulse weak and irregular."
      },
      {
        "section": "Throat",
        "content": "Choking sensation in throat as of a collar or plug; sympathetic cardiac dry cough."
      }
    ]
  },
  {
    "remedyNumber": 126,
    "name": "Nitricum acidum",
    "abbreviation": "nit-ac.",
    "commonName": "Nitric Acid",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Splinter-like sticking pains in throat and rectum; pungent offensive urine smelling like horse urine; condylomata and fissures.",
    "mindKeynotes": "Vindictive, unforgiving, holds grudges; anxious about health; despair of recovery.",
    "generalsKeynotes": "Ulcers with splinter-like sticking pains; jagged condylomata; offensive pungent urine like horse urine; fissure in ano.",
    "modalitiesKeynotes": "Aggravation: Evening, night, cold air, weather change, noise. Amelioration: Riding in carriage, gentle warmth.",
    "complementary": "Calad., Thuj.",
    "antidotes": "Calc., Hep., Merc.",
    "followsWell": "Calc., Hep., Kali-c., Puls., Sulph., Thuj.",
    "inimical": "Lachesis.",
    "materiaMedica": [
      {
        "section": "Rectum",
        "content": "Fissure in ano; violent cutting sticking splinter pains lasting for hours after each stool."
      },
      {
        "section": "Throat",
        "content": "Ulcerated throat with sharp sticking sensation as from a splinter or needle when swallowing."
      }
    ]
  },
  {
    "remedyNumber": 127,
    "name": "Nuphar luteum",
    "abbreviation": "nuph.",
    "commonName": "Yellow Pond Lily",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Complete loss of sexual power with relaxed organs; morning painless exhausting diarrhea; chronic enteritis.",
    "mindKeynotes": "Mental indifference, dullness, memory weak.",
    "generalsKeynotes": "Early morning diarrhea driving patient from bed; complete male impotence with absence of desire and retracted organs.",
    "modalitiesKeynotes": "Aggravation: Morning (4-5 AM), motion. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Agnum, Lyc.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Male",
        "content": "Complete impotence; organs flaccid, cold, retracted; involuntary emissions during stool or urination."
      },
      {
        "section": "Stool",
        "content": "Painless yellow watery diarrhea between 4 and 6 AM, followed by extreme exhaustion."
      }
    ]
  },
  {
    "remedyNumber": 128,
    "name": "Nux moschata",
    "abbreviation": "nux-m.",
    "commonName": "Nutmeg",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Overpowering drowsiness and sleepiness; extreme dryness of mouth without thirst; hysterical laughter and clairvoyance.",
    "mindKeynotes": "Unconquerable sleepiness; changing moods: laughing one minute, crying the next; loss of memory.",
    "generalsKeynotes": "Mouth dry as paper, yet patient is completely devoid of thirst; fainting easily; extreme flatulent distension.",
    "modalitiesKeynotes": "Aggravation: Cold damp air, draft, washing, pregnancy. Amelioration: Warm room, dry weather.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Bell., Nux-v., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Sleep",
        "content": "Irresistible sleepiness: falls asleep during conversation, work, or while eating; stupor."
      },
      {
        "section": "Mouth",
        "content": "Intense dryness of tongue and mouth; tongue adheres to roof of mouth, yet absolutely no thirst."
      }
    ]
  },
  {
    "remedyNumber": 129,
    "name": "Oenanthe crocata",
    "abbreviation": "oena.",
    "commonName": "Water Dropwort",
    "kingdom": "Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sudden violent epileptiform convulsions with frothing at mouth, locked jaws, and cyanosis; coma following attack.",
    "mindKeynotes": "Furious delirium; sudden stupor; complete loss of consciousness.",
    "generalsKeynotes": "Epileptic seizures without warning: falls unconscious, opisthotonos, foaming at lips with bloody froth; dilated pupils.",
    "modalitiesKeynotes": "Aggravation: Touch, cold air. Amelioration: None recorded.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Cic., Cupr.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nervous",
        "content": "Epilepsy with sudden fall and terrible convulsions; jaws firmly clenched, bites tongue, face dark purple."
      },
      {
        "section": "Head",
        "content": "Giddiness followed by unconsciousness; apoplectic congestion."
      }
    ]
  },
  {
    "remedyNumber": 130,
    "name": "Oleander",
    "abbreviation": "olean.",
    "commonName": "Rose Laurel",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Paralytic weakness of lower limbs; painless involuntary stool while emitting flatus; weeping crusty eczema on scalp.",
    "mindKeynotes": "Slow of comprehension; difficult to understand ideas; indolent.",
    "generalsKeynotes": "Involuntary stool when passing flatus; weakness of limbs with trembling; oozing crusts on scalp behind ears.",
    "modalitiesKeynotes": "Aggravation: Friction, undressing, rest. Amelioration: Moving about.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Con., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stool",
        "content": "Painless involuntary passage of thin stool or undigested food while passing flatus or laughing."
      },
      {
        "section": "Skin",
        "content": "Oozing eczema on scalp and retroauricular region with thick crusts and sensitive itching."
      }
    ]
  },
  {
    "remedyNumber": 131,
    "name": "Opium",
    "abbreviation": "op.",
    "commonName": "Poppy / Papaver somniferum",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Hot",
    "isPolycrest": true,
    "shortDescription": "Heavy comatose stupor with stertorous snoring breathing; painless complaints; complete lack of reaction; bed feels too hot.",
    "mindKeynotes": "Unconsciousness, stupor; delirium with phantom figures; fear remains after fright; painless complaints.",
    "generalsKeynotes": "Complete lack of vital reaction; stertorous snoring breathing; hot perspiration over entire body; bed feels too hot.",
    "modalitiesKeynotes": "Aggravation: Heat, warmth of room, during and after sleep. Amelioration: Cold water, walking in cold air.",
    "complementary": "Bar-c., Phos.",
    "antidotes": "Bell., Camph., Coff., Nux-v.",
    "followsWell": "Acon., Bell., Bry., Hyos., Nux-v.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Sleep",
        "content": "Heavy comatose sleep with stertorous snoring breathing; jaws drop; eyes half open; apoplexy."
      },
      {
        "section": "Generals",
        "content": "Complete absence of pain and total paralysis of intestines; obstinate fecal impaction with round black balls."
      }
    ]
  },
  {
    "remedyNumber": 132,
    "name": "Oxalicum acidum",
    "abbreviation": "ox-ac.",
    "commonName": "Oxalic Acid",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Symptoms aggravated whenever the patient thinks about them; sharp lancinating pains in small spots; angina and backache.",
    "mindKeynotes": "Ailments worsen as soon as he thinks about them; despairing melancholy.",
    "generalsKeynotes": "Pains in small circumscribed spots; numbness and coldness of extremities; angina pectoris radiating to shoulder.",
    "modalitiesKeynotes": "Aggravation: Thinking of symptoms, coffee, sweets, shaving. Amelioration: Rest, warm room.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Phos.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Pains return or worsen immediately when thinking of them; lancinating pains in small circumscribed points."
      },
      {
        "section": "Cardiovascular",
        "content": "Angina pectoris: sharp lancinating pain from heart down left arm, worse thinking about it."
      }
    ]
  },
  {
    "remedyNumber": 133,
    "name": "Petroleum",
    "abbreviation": "petr.",
    "commonName": "Crude Rock Oil / Kerosene",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Deep painful bleeding cracks and fissures on fingertips in winter; motion sickness in car, train, and boat; eczema.",
    "mindKeynotes": "Dual consciousness: delusion that another person is lying in bed beside him; loses way in well-known streets.",
    "generalsKeynotes": "Skin symptoms markedly aggravate in winter; deep bleeding fissures on hands and heels; motion sickness.",
    "modalitiesKeynotes": "Aggravation: Winter, cold air, riding in carriage or boat, eating cabbage. Amelioration: Warm air, eating.",
    "complementary": "Sep.",
    "antidotes": "Nux-v.",
    "followsWell": "Bry., Calc., Lyc., Puls., Sep., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Skin",
        "content": "Deep painful bleeding rhagades and fissures on fingertips and palms in cold winter weather; raw eczema."
      },
      {
        "section": "Stomach",
        "content": "Car and boat motion sickness with nausea and occipital headache; relieved by eating."
      }
    ]
  },
  {
    "remedyNumber": 134,
    "name": "Petroselinum sativum",
    "abbreviation": "petros.",
    "commonName": "Parsley",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sudden irresistible desire to urinate; child dances with agony from intense urethral itching and burning; gonorrhea.",
    "mindKeynotes": "Restless, excited when desire to urinate comes.",
    "generalsKeynotes": "Sudden violent call to urinate: cannot wait a second without passing it; intense tickling in fossa navicularis.",
    "modalitiesKeynotes": "Aggravation: Urinating. Amelioration: Passing urine.",
    "complementary": "Canth.",
    "antidotes": "None recorded.",
    "followsWell": "Canth., Merc.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Sudden irresistible urge to void urine; child jumps up and down dancing with distress from urethral tickling."
      },
      {
        "section": "Male",
        "content": "Chronic gonorrhea with milky white discharge and drawing pain in perineum."
      }
    ]
  },
  {
    "remedyNumber": 135,
    "name": "Phosphoricum acidum",
    "abbreviation": "ph-ac.",
    "commonName": "Phosphoric Acid",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": true,
    "shortDescription": "Apathetic indifference following grief, homesickness, or loss of vital fluids; painless non-debilitating diarrhea; diabetes.",
    "mindKeynotes": "Apathetic, indifferent to everything; answers slowly or in monosyllables; grief and mental exhaustion.",
    "generalsKeynotes": "Physical and mental debility; painless copious diarrhea that does not exhaust the patient; milky urine.",
    "modalitiesKeynotes": "Aggravation: Loss of fluids, grief, mental exertion, draft. Amelioration: Warmth, short sleep.",
    "complementary": "Chin.",
    "antidotes": "Camph., Coff.",
    "followsWell": "Chin., Ferr., Rhus-t., Verat.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Profound mental apathy: cannot think, cares for nothing; history of severe grief, sorrow, or disappointment in love."
      },
      {
        "section": "Stool",
        "content": "Painless copious watery diarrhea; remarkably, the patient does not feel exhausted by the profuse evacuation."
      }
    ]
  },
  {
    "remedyNumber": 136,
    "name": "Phytolacca decandra",
    "abbreviation": "phyt.",
    "commonName": "Poke Root",
    "kingdom": "Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Stony hard mammary glands with pain radiating throughout body when infant nurses; dark purple throat with tonsillar follicular plugs.",
    "mindKeynotes": "Indifference to life, disgust with everything, delirium with groaning.",
    "generalsKeynotes": "Aching, soreness, and restlessness of whole body; glandular induration; dark red throat; shooting pain to ears on swallowing.",
    "modalitiesKeynotes": "Aggravation: Cold damp weather, swallowing hot drinks, night. Amelioration: Warm dry weather, rest.",
    "complementary": "Sil.",
    "antidotes": "Bell., Ign., Mez.",
    "followsWell": "Bell., Bry., Merc., Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Breasts",
        "content": "Mastitis: breasts stony hard, painful, purplish; pain radiates from nipple all over body when baby nurses."
      },
      {
        "section": "Throat",
        "content": "Dark purple tonsils; severe shooting pain into both ears on attempting to swallow hot drinks."
      }
    ]
  },
  {
    "remedyNumber": 137,
    "name": "Picricum acidum",
    "abbreviation": "pic-ac.",
    "commonName": "Picric Acid",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Brain fag of students and business men; slightest mental exertion causes intense occipital headache and burning along spine.",
    "mindKeynotes": "Lack of willpower; profound mental fatigue from small exertion; brain fag.",
    "generalsKeynotes": "Severe occipito-cervical headache; burning along vertebral column; heavy numb legs; priapism.",
    "modalitiesKeynotes": "Aggravation: Mental exertion, heat, walking. Amelioration: Cold water washing, resting in dark.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Gels., Kali-p., Ph-ac.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Brain fag: intense occipital throbbing headache extending down spine after minimal reading or study."
      },
      {
        "section": "Nervous",
        "content": "Burning sensation along whole spinal cord; legs feel heavy like lead with muscular debility."
      }
    ]
  },
  {
    "remedyNumber": 138,
    "name": "Podophyllum peltatum",
    "abbreviation": "pod.",
    "commonName": "May Apple / Mandrake",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Profuse, painless, fetid, gushing morning diarrhea; prolapse of rectum before or during stool; liver torpor.",
    "mindKeynotes": "Depression, imagines he is going to die or be very ill.",
    "generalsKeynotes": "Enormous quantity of watery yellow stool coming out with a gush; diarrhea in hot weather and dentition; prolapsus ani.",
    "modalitiesKeynotes": "Aggravation: Early morning (4-9 AM), hot weather, dentition. Amelioration: Lying on abdomen, rubbing liver.",
    "complementary": "Calc., Sulph.",
    "antidotes": "Coloc., Nux-v.",
    "followsWell": "Calc., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stool",
        "content": "Copious painless gushing morning diarrhea; stool yellow, watery, fetid, pouring out of rectum like a cataract."
      },
      {
        "section": "Rectum",
        "content": "Prolapse of rectum before, during, or after stool; diarrhea during summer dentition in infants."
      }
    ]
  },
  {
    "remedyNumber": 139,
    "name": "Prunus spinosa",
    "abbreviation": "prun.",
    "commonName": "Blackthorn",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent ciliary neuralgia through eyeball backwards into head as if eye would burst; strangury with urinary spasm.",
    "mindKeynotes": "Restless, weeping, irritable.",
    "generalsKeynotes": "Shooting neuralgic pain starting in eye and piercing backward into occiput; painful urinary tenesmus.",
    "modalitiesKeynotes": "Aggravation: Touch, motion, night. Amelioration: Warmth.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Spig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Eyes",
        "content": "Ciliary neuralgia: excruciating pain in right eyeball shooting straight backward into brain as if eye would explode."
      },
      {
        "section": "Urinary",
        "content": "Tenesmus of bladder: urine seems to reach glans penis and then spasms back into bladder."
      }
    ]
  },
  {
    "remedyNumber": 140,
    "name": "Ptelea trifoliata",
    "abbreviation": "ptel.",
    "commonName": "Wafer Ash",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Hepatic congestion with heavy aching in right hypochondrium relieved only by lying on right side; bilious gastric attacks.",
    "mindKeynotes": "Gloomy, irritable, dull, confused.",
    "generalsKeynotes": "Liver heavy and sensitive; dragging sensation in liver when lying on left side; completely relieved by lying on right side.",
    "modalitiesKeynotes": "Aggravation: Lying on left side, morning, eating. Amelioration: Lying on right side, acid foods.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Bry., Chel., Nux-v.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Liver",
        "content": "Severe hepatic congestion with aching distress; pain when turning to left side, completely relieved lying on right side."
      },
      {
        "section": "Stomach",
        "content": "Bilious vomiting, bitter taste, yellow tongue with prominent red papillae."
      }
    ]
  },
  {
    "remedyNumber": 141,
    "name": "Pyrogenium",
    "abbreviation": "pyrog.",
    "commonName": "Artificial Sepsine / Decomposed Meat",
    "kingdom": "Nosode",
    "miasm": "Septic Dyscrasia",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Septic fevers; disparity between pulse and temperature (high pulse with normal temp, or vice versa); bed feels too hard.",
    "mindKeynotes": "Loquacity during fever; thinks he is crowded in bed or that parts of his body are scattered around him.",
    "generalsKeynotes": "Great discrepancy between pulse and temperature; all discharges are terribly offensive (carrion-like); bed feels too hard.",
    "modalitiesKeynotes": "Aggravation: Motion (momentary), cold. Amelioration: Continued gentle motion, heat.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Bapt., Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Fever",
        "content": "Septicemia and puerperal sepsis; pulse 140 with temperature 99°F, or temperature 104°F with pulse 80."
      },
      {
        "section": "Generals",
        "content": "Bed feels like stone; patient tosses constantly seeking a softer spot; all discharges smell like rotten flesh."
      }
    ]
  },
  {
    "remedyNumber": 142,
    "name": "Radium bromatum",
    "abbreviation": "rad-br.",
    "commonName": "Radium Bromide",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Severe aching in lumbosacral region and joints; dermatitis and radiation burns; chronic eczema and keloids.",
    "mindKeynotes": "Apprehensive, fearful when alone, irritable.",
    "generalsKeynotes": "Severe aching throughout whole body; deep bone pains; pruritus vulvae; radiation dermatitis and ulcers.",
    "modalitiesKeynotes": "Aggravation: Motion, night, cold. Amelioration: Hot bath, open air, pressure.",
    "complementary": "None recorded.",
    "antidotes": "Rhus-t.",
    "followsWell": "Rhus-t., Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Back",
        "content": "Severe aching in lumbar and sacral region, better after hot bath and continuous motion."
      },
      {
        "section": "Skin",
        "content": "Chronic dermatitis with intense burning itching; delayed radiation burns and keloid scars."
      }
    ]
  },
  {
    "remedyNumber": 143,
    "name": "Ranunculus bulbosus",
    "abbreviation": "ran-b.",
    "commonName": "Bulbous Buttercup",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Intercostal neuralgia and herpes zoster (shingles) with dark bluish vesicles; intense stitching chest pain on change of weather.",
    "mindKeynotes": "Irritable, quarrels with friends, fear of ghosts at night.",
    "generalsKeynotes": "Intercostal rheumatism and pleurodynia; herpes zoster with severe neuralgic burning; worse atmospheric changes.",
    "modalitiesKeynotes": "Aggravation: Weather change, cold wet air, touch, motion. Amelioration: Warm room, rest.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Rhus-t.",
    "followsWell": "Bry., Rhus-t.",
    "inimical": "Alcohol, wine.",
    "materiaMedica": [
      {
        "section": "Chest",
        "content": "Intercostal neuralgia; sharp stitching pains in chest walls, worse breathing and turning trunk."
      },
      {
        "section": "Skin",
        "content": "Herpes zoster (shingles) with bluish dark vesicles and agonizing burning neuralgic pain."
      }
    ]
  },
  {
    "remedyNumber": 144,
    "name": "Ranunculus sceleratus",
    "abbreviation": "ran-s.",
    "commonName": "Celery-leaved Buttercup",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Mapped geographic tongue with denuded raw patches; boring raw burning pain in chest walls and ribs.",
    "mindKeynotes": "Indolent, irritable, easily offended.",
    "generalsKeynotes": "Mapped tongue with sensitive raw spots; vesicles that leave thin watery yellowish corrosive discharge.",
    "modalitiesKeynotes": "Aggravation: Evening, change of weather. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Puls., Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mouth",
        "content": "Mapped geographic tongue: raw denuded red patches with burning, sensitive to all food."
      },
      {
        "section": "Chest",
        "content": "Boring pain in ribs and sternum; chest walls tender to touch."
      }
    ]
  },
  {
    "remedyNumber": 145,
    "name": "Ratanhia peruviana",
    "abbreviation": "rat.",
    "commonName": "Krameria / Mapato",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Fissures of anus with agonizing burning pain like fire lasting for hours after stool; rectum feels full of broken glass.",
    "mindKeynotes": "Irritable, depressed from severe pain.",
    "generalsKeynotes": "Rectum feels constricted; sensation as if rectum were filled with sharp splintered broken glass; burning fire in anus.",
    "modalitiesKeynotes": "Aggravation: After stool, touch. Amelioration: Cold water washing.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Nit-ac., Paeon., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Rectum",
        "content": "Anal fissure with violent burning like fire and cutting pains persisting for 3 to 4 hours after defecation."
      },
      {
        "section": "Anus",
        "content": "Spasmodic contraction of anus; burning temporarily relieved by sitting in cold water."
      }
    ]
  },
  {
    "remedyNumber": 146,
    "name": "Rheum palmatum",
    "abbreviation": "rheum",
    "commonName": "Rhubarb",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sour smelling infant: sour stool, sour vomit, sour body perspiration; child weeps and screams from colicky griping.",
    "mindKeynotes": "Screaming, capricious child; demands various toys and pushes them away; sour smelling.",
    "generalsKeynotes": "Entire child smells sour despite washing; colicky griping pains in abdomen; sour pasty green stool.",
    "modalitiesKeynotes": "Aggravation: Dentition, motion, uncovering. Amelioration: Warmth, bending double.",
    "complementary": "Mag-c.",
    "antidotes": "Camph., Cham.",
    "followsWell": "Cham., Mag-c.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stool",
        "content": "Sour smelling green brown diarrhea during dentition; colic compelling child to double up and scream."
      },
      {
        "section": "Generals",
        "content": "Child's sweat on head and whole body smells intensely sour; sour breath and vomit."
      }
    ]
  },
  {
    "remedyNumber": 147,
    "name": "Rhododendron chrysanthum",
    "abbreviation": "rhod.",
    "commonName": "Siberian Snow Rose",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Rheumatic and fibrous pains markedly aggravated before an approaching thunderstorm or electrical weather; orchitis.",
    "mindKeynotes": "Great terror of thunderstorms and electrical changes in air.",
    "generalsKeynotes": "Rheumatism and neuralgias worse before thunder and windy storms, improving once the storm breaks; orchitis.",
    "modalitiesKeynotes": "Aggravation: Approach of storm, windy weather, rest. Amelioration: Moving about, heat, storm begins.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Clematis.",
    "followsWell": "Clematis, Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Patient can anticipate the approach of a thunderstorm by violent rheumatic twinges in joints."
      },
      {
        "section": "Male",
        "content": "Swelling and induration of testicles, especially right; drawing pain into abdomen, worse stormy weather."
      }
    ]
  },
  {
    "remedyNumber": 148,
    "name": "Rumex crispus",
    "abbreviation": "rumx.",
    "commonName": "Yellow Dock",
    "kingdom": "Plant",
    "miasm": "Tubercular",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent incessant dry tickling cough provoked by inhaling the slightest breath of cold air; covers mouth with blanket in bed.",
    "mindKeynotes": "Irritable, restless, averse to mental effort.",
    "generalsKeynotes": "Extreme sensitiveness of larynx and trachea to cold air: covering mouth with bedclothes prevents coughing; morning diarrhea.",
    "modalitiesKeynotes": "Aggravation: Inhaling cold air, uncovering, 11 PM, morning. Amelioration: Covering mouth, warm air.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Bell., Calc., Phos.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Dry incessant tickling cough in suprasternal fossa provoked by breathing cold air; covers head with blanket."
      },
      {
        "section": "Stool",
        "content": "Early morning brown watery diarrhea driving patient from bed at 5 AM, with rumbling."
      }
    ]
  },
  {
    "remedyNumber": 149,
    "name": "Ruta graveolens",
    "abbreviation": "ruta",
    "commonName": "Garden Rue",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Bruised soreness of periosteum, tendons, and cartilage after sprains; eyestrain from fine sewing or reading; ganglion cysts.",
    "mindKeynotes": "Anxious, dissatisfied with himself, suspicious, melancholic.",
    "generalsKeynotes": "Injuries to fibrous tissues, ligaments, tendons, and periosteum; bruised feeling all over body; ganglion of wrist.",
    "modalitiesKeynotes": "Aggravation: Cold wet air, resting, eyestrain. Amelioration: Motion, warmth, lying on back.",
    "complementary": "Calc-p.",
    "antidotes": "Camph.",
    "followsWell": "Arn., Calc-p., Rhus-t., Symph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Extremities",
        "content": "Sprains of wrist and ankle joints with bruised periosteal pain; ganglion cysts on flexor tendons of wrists."
      },
      {
        "section": "Eyes",
        "content": "Severe asthenopia from fine embroidery, watchmaking, or close study; eyes feel like balls of fire."
      }
    ]
  },
  {
    "remedyNumber": 150,
    "name": "Sabadilla",
    "abbreviation": "sabad.",
    "commonName": "Cevadilla Seed",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent paroxysmal sneezing with profuse watery lachrymation provoked by odor of flowers; sensation of lump in throat; hay fever.",
    "mindKeynotes": "Imagines he has strange deformities: limbs crooked, pregnant, parts shrunken.",
    "generalsKeynotes": "Hay fever with intense itching in soft palate; sneezing fits with lachrymation; sensation of a skin or lump in throat.",
    "modalitiesKeynotes": "Aggravation: Odor of flowers and garlic, cold air. Amelioration: Warm drinks, swallowing, warm room.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Puls.",
    "followsWell": "Ars., Bell., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nose",
        "content": "Violent fits of sneezing shaking entire body; hay fever from flower pollen; burning watery discharge."
      },
      {
        "section": "Throat",
        "content": "Sensation of a skin hanging in throat; must swallow constantly, relieved by warm drinks."
      }
    ]
  },
  {
    "remedyNumber": 151,
    "name": "Sabina",
    "abbreviation": "sabin.",
    "commonName": "Savin",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Uterine hemorrhage with bright red blood mixed with dark coagulated clots; pain shooting from sacrum through to pubis; condylomata.",
    "mindKeynotes": "Irritable, depressed, music is unbearable.",
    "generalsKeynotes": "Metrorrhagia with blood partly liquid and partly clotted; characteristic pain darting from sacrum through pelvis to pubis.",
    "modalitiesKeynotes": "Aggravation: Warmth of bed, motion, touch. Amelioration: Cold fresh air.",
    "complementary": "Thuj.",
    "antidotes": "Camph., Puls.",
    "followsWell": "Bell., Puls., Thuj.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Profuse menorrhagia; blood partly pale bright red and partly dark clots; pain shoots from sacrum to pubic bone."
      },
      {
        "section": "Skin",
        "content": "Sycotic fig-warts and condylomata with burning and intolerable itching."
      }
    ]
  },
  {
    "remedyNumber": 152,
    "name": "Sambucus nigra",
    "abbreviation": "samb.",
    "commonName": "Elder",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sudden waking at midnight suffocating from spasm of larynx; snuffles in small infants who cannot breathe while nursing; dry heat in sleep.",
    "mindKeynotes": "Fright, anxiety, startles from sleep with choking.",
    "generalsKeynotes": "Child wakes suddenly around midnight gasping for air; profuse sweating on waking from sleep; snuffles in infants.",
    "modalitiesKeynotes": "Aggravation: Midnight, rest, lying down, cold air. Amelioration: Sitting up in bed, motion.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Bell., Op., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Sudden suffocative attack around midnight; child turns blue, gasps for breath; spasm of glottis."
      },
      {
        "section": "Nose",
        "content": "Snuffles in newborn infants; nostrils obstructed by dry mucus, preventing nursing."
      }
    ]
  },
  {
    "remedyNumber": 153,
    "name": "Sanguinaria canadensis",
    "abbreviation": "sang.",
    "commonName": "Bloodroot",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Periodic right-sided headache rising from occiput and settling over right eye; circumscribed red cheek flush; climacteric flushes.",
    "mindKeynotes": "Morose, irritable, dislikes conversation.",
    "generalsKeynotes": "Right-sided remedy; headache begins in morning, peaks at noon, and fades with sunset; circumscribed redness of cheeks.",
    "modalitiesKeynotes": "Aggravation: Sun, odors, jar, right side. Amelioration: Sleep, dark room, vomiting bile.",
    "complementary": "Ant-t.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Iris, Nux-v.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Right-sided periodic sick headache: ascends from nape of neck and settles over right eye; relieved by quiet sleep."
      },
      {
        "section": "Respiratory",
        "content": "Cough with rust-colored expectoration; circumscribed red flush on cheeks in bronchitis and pneumonia."
      }
    ]
  },
  {
    "remedyNumber": 154,
    "name": "Sanicula aqua",
    "abbreviation": "sanic.",
    "commonName": "Mineral Spring Water of Ottawa",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Progressive marasmus despite ravenous appetite; child looks like an old person; stool crumbles at verge of anus or slips back.",
    "mindKeynotes": "Obstinate, irritable, headstrong, weeping mood.",
    "generalsKeynotes": "Child emaciates from neck downwards; ravenous hunger yet wastes away; stool requires manual assistance.",
    "modalitiesKeynotes": "Aggravation: Motion, heat. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Sil., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Infantile marasmus: ravenous hunger with progressive wasting of body; old-looking wrinkled face."
      },
      {
        "section": "Stool",
        "content": "Stool large, hard, dry, crumbles at anus or slips back when partially evacuated."
      }
    ]
  },
  {
    "remedyNumber": 155,
    "name": "Sarsaparilla officinalis",
    "abbreviation": "sars.",
    "commonName": "Wild Licorice",
    "kingdom": "Plant",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Intolerable excruciating pain at the conclusion of urination; child screams before and during urination; white sandy sediment.",
    "mindKeynotes": "Despondent, sensitive, easily offended.",
    "generalsKeynotes": "Excruciating pain at the close of passing urine; white sand in urine; deep cracks and fissures on hands and feet.",
    "modalitiesKeynotes": "Aggravation: End of urination, cold wet air, sitting. Amelioration: Standing, warmth.",
    "complementary": "Merc., Sep.",
    "antidotes": "Bell.",
    "followsWell": "Bell., Merc., Sep., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Severe agonizing pain at the conclusion of micturition; child screams at end of passing water; gravel and sand in urine."
      },
      {
        "section": "Skin",
        "content": "Deep painful fissures on fingers and toes with burning cracking in hot weather."
      }
    ]
  },
  {
    "remedyNumber": 156,
    "name": "Scilla maritima",
    "abbreviation": "squil.",
    "commonName": "Sea Onion / Squilla",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Involuntary spurting of urine during violent coughing and sneezing; bronchopneumonia with watery eye coryza; cardiac dropsy.",
    "mindKeynotes": "Aversive, irritable, indifferent.",
    "generalsKeynotes": "Spurting of urine with every paroxysm of cough; rattling mucous cough with profuse watery coryza and lachrymation.",
    "modalitiesKeynotes": "Aggravation: Morning, cold drinks, motion. Amelioration: Rest, warm air.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Ant-c., Bry.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Involuntary spurting of urine whenever the patient sneezes, coughs, or blows nose."
      },
      {
        "section": "Respiratory",
        "content": "Violent coughing fits ending in involuntary micturition; loose rattling productive cough."
      }
    ]
  },
  {
    "remedyNumber": 157,
    "name": "Secale cornutum",
    "abbreviation": "sec.",
    "commonName": "Ergot of Rye",
    "kingdom": "Fungi",
    "miasm": "Syphilitic",
    "thermalState": "Hot yet icy cold to touch",
    "isPolycrest": false,
    "shortDescription": "Dry cold gangrene of extremities yet patient cannot tolerate any warm covering; wants doors and windows open; uterine hemorrhage.",
    "mindKeynotes": "Mania, wandering about naked, tears off clothes, furious delirium.",
    "generalsKeynotes": "Skin feels cold as ice to the examiner's hand, yet the patient feels burning hot internally and rejects all bedcovers.",
    "modalitiesKeynotes": "Aggravation: Heat, warmth of bed, covering. Amelioration: Cold air, uncovering, cool bathing.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Op.",
    "followsWell": "Bell., Puls.",
    "inimical": "Ars.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "Raynaud's disease and senile gangrene; extremities icy cold, yet burning sensation makes patient uncover completely."
      },
      {
        "section": "Female",
        "content": "Passive dark thin offensive continuous uterine bleeding; prolonged sluggish labor pains."
      }
    ]
  },
  {
    "remedyNumber": 158,
    "name": "Selenium metallicum",
    "abbreviation": "sel.",
    "commonName": "Selenium",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Hot",
    "isPolycrest": false,
    "shortDescription": "Profound physical and mental exhaustion after sexual emissions; hair falls out in patches; worse from hot sun and wine.",
    "mindKeynotes": "Total loss of memory for business; day-dreaming; sexual fantasies with physical impotence.",
    "generalsKeynotes": "Extreme debility from hot weather; seminal weakness; hair falls from beard, eyebrows, and genitals.",
    "modalitiesKeynotes": "Aggravation: Heat of sun, wine, drafts, after stool. Amelioration: Cold water splash on face.",
    "complementary": "None recorded.",
    "antidotes": "Ign., Puls.",
    "followsWell": "Calc., Merc., Sep.",
    "inimical": "Chin., Wine.",
    "materiaMedica": [
      {
        "section": "Male",
        "content": "Impotence with heightened lascivious desires; involuntary seminal dribbling during sleep and stool."
      },
      {
        "section": "Skin",
        "content": "Hair falls out from scalp, beard, and genitals; itching acne and tingling on fingers."
      }
    ]
  },
  {
    "remedyNumber": 159,
    "name": "Senega",
    "abbreviation": "seneg.",
    "commonName": "Snakeroot",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Enormous accumulation of tough rattling mucus in bronchial tubes of elderly patients; chest oppression; paresis of ocular muscles.",
    "mindKeynotes": "Anxious, weeping, hypochondriacal.",
    "generalsKeynotes": "Bronchial catarrh in old people with copious rattling mucus that is hard to expectorate; chest soreness.",
    "modalitiesKeynotes": "Aggravation: Cold air, walking fast, rest. Amelioration: Sweating, open air.",
    "complementary": "None recorded.",
    "antidotes": "Arn., Bell., Bry.",
    "followsWell": "Calc., Phos., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Rattling cough in aged persons; tough viscid mucus fills chest; chest feels compressed as if crushed."
      },
      {
        "section": "Eyes",
        "content": "Paresis of superior oblique muscle; diplopia relieved by tilting head backward."
      }
    ]
  },
  {
    "remedyNumber": 160,
    "name": "Spigelia anthelmia",
    "abbreviation": "spig.",
    "commonName": "Pinkroot",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Violent neuralgic stabbing pains in left eye and left side of face; visible fluttering palpitation of heart; angina pectoris.",
    "mindKeynotes": "Fear of pointed things, pins, needles; anxious anticipating heart attack.",
    "generalsKeynotes": "Left-sided remedy: left eye, left trigeminal nerve, heart; palpitations so violent they shake the chest and are visible through clothing.",
    "modalitiesKeynotes": "Aggravation: Touch, jar, motion, turning eyes, tobacco. Amelioration: Lying on right side with head high.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Puls.",
    "followsWell": "Acon., Bell., Dig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Head",
        "content": "Left-sided supraorbital neuralgia: starts in occiput, settles over left eye; begins at sunrise, peaks at noon, ends at sunset."
      },
      {
        "section": "Heart",
        "content": "Angina pectoris; violent heart beats visible through chest wall; stabbing stitch pain extending to left shoulder."
      }
    ]
  },
  {
    "remedyNumber": 161,
    "name": "Spongia tosta",
    "abbreviation": "spong.",
    "commonName": "Roasted Sponge",
    "kingdom": "Animal",
    "miasm": "Tubercular",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Dry, barking, croupy cough sounding like a saw driven through pine wood; worse waking before midnight; thyroid hypertrophy.",
    "mindKeynotes": "Anxious apprehension; fear of future and heart disease; sudden terror on waking.",
    "generalsKeynotes": "Barking hollow croupy cough; larynx sensitive to touch; thyroid enlargement; relieved by eating or warm drinks.",
    "modalitiesKeynotes": "Aggravation: Before midnight, cold dry wind, lying flat. Amelioration: Warm food or drinks, eating sweet things.",
    "complementary": "Hep.",
    "antidotes": "Camph.",
    "followsWell": "Acon., Hep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Respiratory",
        "content": "Croup: cough sounds dry, harsh, rasping like a saw driven through a pine board; suffocative waking before midnight."
      },
      {
        "section": "Thyroid",
        "content": "Goiter: thyroid gland swollen and indurated with suffocative paroxysms at night."
      }
    ]
  },
  {
    "remedyNumber": 162,
    "name": "Symphytum officinale",
    "abbreviation": "symph.",
    "commonName": "Comfrey / Knitbone",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Accelerates union of fractured bones; non-union of fractures; mechanical trauma to eyeball and orbit from blunt object.",
    "mindKeynotes": "Calm, patient, indifferent.",
    "generalsKeynotes": "Stimulates osteoblasts in fractured bones; relieves severe periosteal pricking pains after fractures; black eye from blunt trauma.",
    "modalitiesKeynotes": "Aggravation: Touch, jar, motion. Amelioration: Warmth, gentle rest.",
    "complementary": "Calc-p.",
    "antidotes": "None recorded.",
    "followsWell": "Arn., Calc-p., Ruta.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Bones",
        "content": "Fractures of bone with delayed union; irritable bone stump after amputation; periosteal soreness."
      },
      {
        "section": "Eyes",
        "content": "Mechanical trauma to eye from snowball, tennis ball, or blow from fist; bruised orbit."
      }
    ]
  },
  {
    "remedyNumber": 163,
    "name": "Tabacum",
    "abbreviation": "tab.",
    "commonName": "Tobacco",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Cold yet uncovers abdomen",
    "isPolycrest": false,
    "shortDescription": "Deathly nausea with icy cold clammy sweat; seasickness; patient uncovers abdomen to relieve vomiting; vertigo.",
    "mindKeynotes": "Terrible anxiety, fears death, melancholy, apathy.",
    "generalsKeynotes": "Deathly sinking nausea with cold body and clammy sweat on forehead; relieved by uncovering abdomen and fresh cold wind.",
    "modalitiesKeynotes": "Aggravation: Opening eyes, motion of boat, heat, smell of tobacco. Amelioration: Fresh cold air, uncovering abdomen.",
    "complementary": "None recorded.",
    "antidotes": "Ipec., Nux-v.",
    "followsWell": "Bell., Nux-v.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stomach",
        "content": "Incessant deathly nausea with cold clammy sweat; vomiting on least motion; motion sickness."
      },
      {
        "section": "Abdomen",
        "content": "Patient must uncover the abdomen to relieve nausea and cold sweat; abdominal cramps."
      }
    ]
  },
  {
    "remedyNumber": 164,
    "name": "Taraxacum officinale",
    "abbreviation": "tarax.",
    "commonName": "Dandelion",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Mapped geographic tongue with white coating cleaning off in patches leaving sensitive dark red spots; liver affections.",
    "mindKeynotes": "Loquacious, cheerful, inclined to joke and laugh.",
    "generalsKeynotes": "Mapped tongue; jaundice with enlarged indurated liver; neuralgic aching in right knee joint.",
    "modalitiesKeynotes": "Aggravation: Resting, standing, fat food. Amelioration: Walking, touch.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Chel., Nux-v.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mouth",
        "content": "Mapped tongue: white coating cleans off in circular patches leaving dark red raw sensitive spots."
      },
      {
        "section": "Liver",
        "content": "Hepatic congestion with bitter taste, yellow conjunctiva, and mapped tongue."
      }
    ]
  },
  {
    "remedyNumber": 165,
    "name": "Tarentula hispana",
    "abbreviation": "tarent.",
    "commonName": "Spanish Spider",
    "kingdom": "Animal",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Extreme motor restlessness; continuous hurried dancing; chorea; extraordinary sensitivity to rhythmic music.",
    "mindKeynotes": "Destructive mania: tears clothes to rags; cunning, feigns sickness; calmed and ameliorated by lively rhythmic music.",
    "generalsKeynotes": "Constant restless motion of limbs: patient must keep fingers and legs in perpetual motion; choreic twitches.",
    "modalitiesKeynotes": "Aggravation: Seeing others in motion, touch, noise. Amelioration: Rhythmic music, open air, rubbing.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Bell., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Sudden violent rages; cunning deceit; tears clothing and decorates herself; dance mania relieved by music."
      },
      {
        "section": "Nervous",
        "content": "Chorea: twitching of every muscle group; cannot remain quiet for a second; constant movement."
      }
    ]
  },
  {
    "remedyNumber": 166,
    "name": "Tellurium metallicum",
    "abbreviation": "tell.",
    "commonName": "Tellurium",
    "kingdom": "Mineral",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Offensive fish-brine or garlic odor of discharges; ringworm in intersecting circular rings; spinal sensitiveness.",
    "mindKeynotes": "Fear of being touched in sensitive parts, forgetful, irritable.",
    "generalsKeynotes": "Otorrhea with intense fish-brine odor; ringworm on body; extreme tenderness of upper back and cervical vertebrae.",
    "modalitiesKeynotes": "Aggravation: Touch, rest, cold weather, lying on painful side. Amelioration: Warmth.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Sep., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Ears",
        "content": "Chronic purulent otorrhea with offensive odor resembling pickled fish or garlic."
      },
      {
        "section": "Skin",
        "content": "Herpetic ringworm eruptions forming intersecting circles with severe itching."
      }
    ]
  },
  {
    "remedyNumber": 167,
    "name": "Terebinthiniae oleum",
    "abbreviation": "ter.",
    "commonName": "Oil of Turpentine",
    "kingdom": "Plant",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Hematuria with smoky, cloudy, coffee-ground sediment; violent burning and inflammation in kidneys and urinary tract.",
    "mindKeynotes": "Stupefaction, coma, convulsions from uremic poisoning.",
    "generalsKeynotes": "Acute nephritis with dark smoky blood in urine; tongue smooth, glossy, red, and clean as if denuded of papillae.",
    "modalitiesKeynotes": "Aggravation: Damp weather, lying on left side. Amelioration: Motion.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Canth., Merc.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Kidneys",
        "content": "Acute nephritis with hematuria; urine smells of violets and deposits dark smoky coffee-ground sediment."
      },
      {
        "section": "Mouth",
        "content": "Tongue completely smooth, red, and glistening as if varnished or stripped of epithelium."
      }
    ]
  },
  {
    "remedyNumber": 168,
    "name": "Teucrium marum verum",
    "abbreviation": "teucr.",
    "commonName": "Cat Thyme",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Nasal polypi with crawling and stinging in nostrils; pinworms (Oxyuris) with violent intolerable anal itching in bed.",
    "mindKeynotes": "Irritable, talkative, restless in evening.",
    "generalsKeynotes": "Nasal polypi with obstruction of nostrils; ascarides and threadworms with frantic anal itching when warm in bed.",
    "modalitiesKeynotes": "Aggravation: Warmth of bed, damp weather. Amelioration: Open fresh air.",
    "complementary": "None recorded.",
    "antidotes": "Camph.",
    "followsWell": "Calc., Puls., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nose",
        "content": "Nasal polypi: large soft polypoid growths filling nostrils; crawls and tickles in nose."
      },
      {
        "section": "Rectum",
        "content": "Pinworms causing intense crawling itching in rectum driving patient wild in bed."
      }
    ]
  },
  {
    "remedyNumber": 169,
    "name": "Theridion curassavicum",
    "abbreviation": "ther.",
    "commonName": "Orange Spider of Curacao",
    "kingdom": "Animal",
    "miasm": "Tubercular",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Extreme sensitiveness to high-pitched sounds (penetrates teeth and bones); vertigo on closing eyes and least motion; nausea.",
    "mindKeynotes": "Despondent, anxious, every shrill noise penetrates through entire body.",
    "generalsKeynotes": "Vertigo on closing eyes; hyperesthesia to high-frequency sounds; severe left chest stitch in phthisis.",
    "modalitiesKeynotes": "Aggravation: Touch, closing eyes, motion, noise, riding in boat. Amelioration: Warmth.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Calc., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nervous",
        "content": "Sounds seem to penetrate directly into teeth and vertebrae; cannot endure brushing of teeth."
      },
      {
        "section": "Head",
        "content": "Vertigo on closing eyes; motion sickness with nausea and cold sweat on least motion."
      }
    ]
  },
  {
    "remedyNumber": 170,
    "name": "Trillium pendulum",
    "abbreviation": "tril-p.",
    "commonName": "Beth Root / Birthroot",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Active profuse gushing uterine hemorrhage with sensation as if hips and back were falling to pieces, relieved by tight binder.",
    "mindKeynotes": "Anxious about bleeding, restless.",
    "generalsKeynotes": "Flooding uterine hemorrhages; sensation as if pelvic bones were separating and falling apart; tight bandage ameliorates.",
    "modalitiesKeynotes": "Aggravation: Motion, after childbirth. Amelioration: Tight binding around pelvis.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Ham., Sabin.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Menorrhagia and postpartum flooding: bright gushing blood; pelvis feels as if cracking apart, relieved by tight binder."
      },
      {
        "section": "Respiratory",
        "content": "Hemoptysis with dry hacking cough and sensation of chest suffocation."
      }
    ]
  },
  {
    "remedyNumber": 171,
    "name": "Urtica urens",
    "abbreviation": "urt-u.",
    "commonName": "Stinging Nettle",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Urticaria with violent burning and stinging itching; allergic reactions after eating shellfish; bee stings; burns.",
    "mindKeynotes": "Fretful, impatient, agitated from itching.",
    "generalsKeynotes": "Hives with elevated red wheals that sting like nettles; acute gout; insufficient secretion of milk in nursing mothers.",
    "modalitiesKeynotes": "Aggravation: Shellfish, cool moist air, touch. Amelioration: Lying down.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Apis, Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Skin",
        "content": "Urticaria nodosa; large burning stinging hives appearing after eating crab or lobster."
      },
      {
        "section": "Female",
        "content": "Galactorrhea or complete arrest of milk secretion in nursing mothers with stinging in breasts."
      }
    ]
  },
  {
    "remedyNumber": 172,
    "name": "Ustilago maydis",
    "abbreviation": "ust.",
    "commonName": "Corn Ergot",
    "kingdom": "Fungi",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Slow, persistent, dark oozing uterine hemorrhage with small black clots; flabby relaxed uterus; climacteric bleeding.",
    "mindKeynotes": "Melancholy, irritable, erotic ideas.",
    "generalsKeynotes": "Continuous oozing of dark liquid blood with small stringy clots; uterus flabby and subinvoluted; loss of hair and nails.",
    "modalitiesKeynotes": "Aggravation: Motion, touch. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Secale, Sep.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Slow protracted oozing of dark clotted blood at menopause; uterus feels soft, doughy, enlarged."
      },
      {
        "section": "Skin",
        "content": "Alopecia; shedding of hair and nails; dry crusty eczema."
      }
    ]
  },
  {
    "remedyNumber": 173,
    "name": "Valeriana officinalis",
    "abbreviation": "valer.",
    "commonName": "Valerian",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Hysterical nervous agitation; sensation as if a thread were hanging down throat; erratic capricious moods; sciatica.",
    "mindKeynotes": "Hysteria: sudden change from deepest joy to despair; feels light as if floating in air.",
    "generalsKeynotes": "Hypersensitive nervous system; neuralgic pains worse resting and relieved by walking about; sciatica worse standing.",
    "modalitiesKeynotes": "Aggravation: Evening, rest, standing still. Amelioration: Walking about, motion.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Coff.",
    "followsWell": "Bell., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Nervous",
        "content": "Hysterical spasms; sensation as if floating or walking on air; globus sensation in throat."
      },
      {
        "section": "Extremities",
        "content": "Sciatica: agonizing pain when standing or resting limb on floor, relieved by pacing room."
      }
    ]
  },
  {
    "remedyNumber": 174,
    "name": "Variolinum",
    "abbreviation": "vario.",
    "commonName": "Smallpox Nosode",
    "kingdom": "Nosode",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Severe lumbar backache as if spinal cord would snap; pustular eruptions with central depression; post-vaccinial disturbances.",
    "mindKeynotes": "Fear of death, confusion, restless anxiety.",
    "generalsKeynotes": "Intense aching in lumbar and sacral spine; pustular eruptions with central umbilication; high fever with chilliness.",
    "modalitiesKeynotes": "Aggravation: Motion. Amelioration: Warmth.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Maland., Thuj.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Back",
        "content": "Excruciating pain in small of back as if spinal column were broken in two; lumbar tenderness."
      },
      {
        "section": "Skin",
        "content": "Pustular eruption with umbilicated centers; pustules shrivel and dry up without scarring."
      }
    ]
  },
  {
    "remedyNumber": 175,
    "name": "Veratrum viride",
    "abbreviation": "verat-v.",
    "commonName": "Green Hellebore",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "High arterial excitement with cerebral congestion; full hard rapid bounding pulse; bright red stripe down center of tongue.",
    "mindKeynotes": "Furious delirium with screams; fear of being poisoned; sudden stupor.",
    "generalsKeynotes": "Intense blood congestion to head and chest; slow or bounding pulse; characteristic broad red stripe down tongue center.",
    "modalitiesKeynotes": "Aggravation: Motion, rising from bed, morning. Amelioration: Lying quiet.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Acon., Bell., Bry.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Cardiovascular",
        "content": "Arterial congestion; pulse hard, full, bounding; cardiac hypertrophy with violent palpitations."
      },
      {
        "section": "Mouth",
        "content": "Tongue white or yellow with a distinctive bright red stripe down the center."
      }
    ]
  },
  {
    "remedyNumber": 176,
    "name": "Viburnum opulus",
    "abbreviation": "vib.",
    "commonName": "High Cranberry / Cramp Bark",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Spasmodic cramping dysmenorrhea with pains radiating down anterior thighs; threatened miscarriage; bearing-down cramps.",
    "mindKeynotes": "Irritable, nervous, wishes to be alone.",
    "generalsKeynotes": "Violent uterine cramps that begin in lower back and shoot around pelvis down the front of both thighs.",
    "modalitiesKeynotes": "Aggravation: Evening, lying on affected side. Amelioration: Resting, pressure.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Caul., Cimic.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Spasmodic membranous dysmenorrhea; excruciating cramps radiating down thighs, causing patient to cry out."
      },
      {
        "section": "Pregnancy",
        "content": "Threatened abortion with severe bearing-down pains and cramps across lower abdomen."
      }
    ]
  },
  {
    "remedyNumber": 177,
    "name": "Vinca minor",
    "abbreviation": "vinc.",
    "commonName": "Lesser Periwinkle",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Crusta lactea on scalp with matted hair and offensive putrid odor; plica polonica; passive uterine hemorrhages.",
    "mindKeynotes": "Sadness, fear of death, weeping.",
    "generalsKeynotes": "Eczema of scalp: sticky offensive exudation entangling the hair; uterine bleeding in elderly women.",
    "modalitiesKeynotes": "Aggravation: Scratching, touch. Amelioration: Warmth.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Graph., Psor.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Skin",
        "content": "Crusta lactea: scalp covered with thick oozing scabs that matt the hair together; foul offensive odor."
      },
      {
        "section": "Female",
        "content": "Passive unceasing uterine hemorrhages in post-menopausal women with extreme debility."
      }
    ]
  },
  {
    "remedyNumber": 178,
    "name": "Vipera berus",
    "abbreviation": "vip.",
    "commonName": "Common Viper Venom",
    "kingdom": "Animal",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Severe phlebitis and varicose veins with sensation as if veins would burst when letting leg hang down; dark venous swelling.",
    "mindKeynotes": "Apprehensive, nervous, fears being left alone.",
    "generalsKeynotes": "Acute inflammation of veins: excruciating bursting pain in limbs when letting them hang down; must elevate legs.",
    "modalitiesKeynotes": "Aggravation: Letting limb hang down, touch, cold. Amelioration: Elevating limb, warmth.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Ham., Lachesis.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Vascular",
        "content": "Phlebitis and varices: patient cannot bear to let leg hang down for even a second due to bursting pain."
      },
      {
        "section": "Extremities",
        "content": "Limbs swollen, mottled blue, and exquisitely tender along the course of the veins."
      }
    ]
  },
  {
    "remedyNumber": 179,
    "name": "Xanthoxylum fraxineum",
    "abbreviation": "xanth.",
    "commonName": "Prickly Ash",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Agonizing neuralgic dysmenorrhea with pains extending down the anterior part of thighs; ovarian neuralgia with headache.",
    "mindKeynotes": "Nervous, frightened, depressed.",
    "generalsKeynotes": "Neuralgic pains radiating along course of crural nerves; left-sided ovarian neuralgia; dysmenorrhea with dark scanty menses.",
    "modalitiesKeynotes": "Aggravation: Before menses, morning. Amelioration: Bending forward.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Vib.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Female",
        "content": "Neuralgic dysmenorrhea: excruciating pains through pelvis extending down anterior thighs."
      },
      {
        "section": "Nervous",
        "content": "Left-sided headache accompanied by sharp stitches in left ovary and down thigh."
      }
    ]
  },
  {
    "remedyNumber": 180,
    "name": "Zingiber officinale",
    "abbreviation": "zing.",
    "commonName": "Ginger",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Complete cessation of urination after typhus or cholera; asthma of digestive origin; heartburn and colic from impure water.",
    "mindKeynotes": "Cheerful, irritable on waking, anxious.",
    "generalsKeynotes": "Suppression of urine with kidney aching; digestive asthma; diarrhea from drinking impure water or eating melons.",
    "modalitiesKeynotes": "Aggravation: Melons, impure water, morning. Amelioration: Warm drinks, resting.",
    "complementary": "None recorded.",
    "antidotes": "Nux-v.",
    "followsWell": "Nux-v., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Complete suppression of urine after acute exhausting diarrhea; dull aching in renal region."
      },
      {
        "section": "Respiratory",
        "content": "Asthma provoked by stomach derangement or eating bread; patient cannot breathe while lying down."
      }
    ]
  },
  {
    "remedyNumber": 181,
    "name": "Acidum benzoicum",
    "abbreviation": "benz-ac.",
    "commonName": "Benzoic Acid",
    "kingdom": "Mineral",
    "miasm": "Sycosis",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Deeply offensive pungent urine smelling like horse urine; wandering gout and arthritis with uric acid deposits; ganglion.",
    "mindKeynotes": "Depression, anxiety, dwells on unpleasant events.",
    "generalsKeynotes": "High colored offensive urine smelling intensely of horse urine; gouty nodes on joints; crackling in joints on motion.",
    "modalitiesKeynotes": "Aggravation: Open cold air, uncovering. Amelioration: Heat, wrapping up.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Colch., Rhus-t.",
    "inimical": "Wine.",
    "materiaMedica": [
      {
        "section": "Urinary",
        "content": "Urine dark brown, highly pungent, smelling overwhelmingly like horse urine; uric acid gravel."
      },
      {
        "section": "Joints",
        "content": "Gouty tophi in joints of fingers, knees, and big toe; tearing joint pain with crackling."
      }
    ]
  },
  {
    "remedyNumber": 182,
    "name": "Acidum hydrocyanicum",
    "abbreviation": "hydr-ac.",
    "commonName": "Prussic Acid / Hydrogen Cyanide",
    "kingdom": "Mineral",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sudden violent collapse with cyanosis, convulsions, rattling breathing, and cold extremities; tetanus; angina pectoris.",
    "mindKeynotes": "Sudden loss of consciousness; terror of death.",
    "generalsKeynotes": "Rapid paralysis of respiratory center; marbled cyanosis of skin; clonic spasms; esophageal gurgling sound.",
    "modalitiesKeynotes": "Aggravation: Night, warmth. Amelioration: Open cold air.",
    "complementary": "None recorded.",
    "antidotes": "Camph., Coff.",
    "followsWell": "Camph., Verat.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Generals",
        "content": "State of sudden asphyxia and collapse: gasping breathing, blue cold skin, imperceptible pulse, locked jaws."
      },
      {
        "section": "Chest",
        "content": "Violent angina with feeling of impending doom; water gurgles audibly down esophagus."
      }
    ]
  },
  {
    "remedyNumber": 183,
    "name": "Adonis vernalis",
    "abbreviation": "adon.",
    "commonName": "Pheasant's Eye",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Congestive heart failure; fatty degeneration of myocardium with dropsy, dyspnea, and weak irregular rapid pulse.",
    "mindKeynotes": "Apprehensive, restless, low spirits.",
    "generalsKeynotes": "Myocardial weakness, cardiac edema; scanty dark urine with albumin; precordial weight.",
    "modalitiesKeynotes": "Aggravation: Cold draft, lying on back. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Crataeg., Dig.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Heart",
        "content": "Cardiac dropsy with rapid irregular weak pulse; dyspnea on least exertion; fatty degeneration of heart."
      },
      {
        "section": "Kidneys",
        "content": "Scanty albuminous urine secondary to passive renal congestion."
      }
    ]
  },
  {
    "remedyNumber": 184,
    "name": "Allium cepa",
    "abbreviation": "all-c.",
    "commonName": "Red Onion",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Acrid excoriating nasal discharge with bland profuse lachrymation (opposite of Euphrasia); violent sneezing; phantom limb pain.",
    "mindKeynotes": "Melancholy, anxious with catarrh.",
    "generalsKeynotes": "Acute fluent coryza: burning acrid fluid drips from nose excoriating the upper lip; bland tears; traumatic neuralgia.",
    "modalitiesKeynotes": "Aggravation: Warm room, evening, wet feet. Amelioration: Open cold air, cool room.",
    "complementary": "Phos., Puls., Sars.",
    "antidotes": "Arn., Cham., Nux-v.",
    "followsWell": "Calc., Puls., Sil.",
    "inimical": "All-s., Aloe.",
    "materiaMedica": [
      {
        "section": "Nose",
        "content": "Profuse watery acrid nasal discharge that excoriates the nose and upper lip; violent sneezing fits."
      },
      {
        "section": "Eyes",
        "content": "Profuse non-irritating bland lachrymation with sensitive inflamed conjunctiva."
      }
    ]
  },
  {
    "remedyNumber": 185,
    "name": "Aloe socotrina",
    "abbreviation": "aloe",
    "commonName": "Socotrine Aloes",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Warm",
    "isPolycrest": false,
    "shortDescription": "Early morning diarrhea driving patient out of bed at 5 AM; complete insecurity of anal sphincter with passage of flatus; hemorrhoids like grapes.",
    "mindKeynotes": "Peevish, ill-humored in cloudy weather, aversion to mental exertion.",
    "generalsKeynotes": "Insecurity of rectum: does not know whether flatus or stool will pass; hemorrhoids protrude like a bunch of grapes; morning urgency.",
    "modalitiesKeynotes": "Aggravation: Early morning (5 AM), heat, after eating or drinking. Amelioration: Cold water applications, cool open air.",
    "complementary": "Sulph.",
    "antidotes": "Camph., Sulph.",
    "followsWell": "Kali-bi., Sep., Sulph.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Stool",
        "content": "Sudden urging to stool at 5 AM; complete lack of confidence in sphincter; explosive passage of yellow jelly-like mucus."
      },
      {
        "section": "Rectum",
        "content": "Hemorrhoids protrude like bunches of dark red grapes, extremely tender, relieved by bathing in cold water."
      }
    ]
  },
  {
    "remedyNumber": 186,
    "name": "Anacardium orientale",
    "abbreviation": "anac.",
    "commonName": "Marking Nut",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Sensation of a hoop or plug around parts; two opposing wills; irresistible desire to curse and swear; dyspepsia relieved by eating.",
    "mindKeynotes": "Two wills: one commanding to do what the other forbids; profane, cursing; profound loss of memory; delusion of being pursued.",
    "generalsKeynotes": "Sensation of a blunt plug pressing into various organs; internal hoop or band sensation; symptoms temporarily relieved by eating.",
    "modalitiesKeynotes": "Aggravation: Empty stomach, mental exertion. Amelioration: Eating a meal, lying on side.",
    "complementary": "Plat.",
    "antidotes": "Coff., Jug-c.",
    "followsWell": "Bell., Lyc., Puls.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Conflict of two wills; irresistible urge to blaspheme and curse; sudden loss of memory in examination hall."
      },
      {
        "section": "Stomach",
        "content": "Gastric distress, pain, and faintness completely and temporarily ameliorated while eating a meal."
      }
    ]
  },
  {
    "remedyNumber": 187,
    "name": "Asterias rubens",
    "abbreviation": "aster.",
    "commonName": "Red Starfish",
    "kingdom": "Animal",
    "miasm": "Syphilitic",
    "thermalState": "Chilly",
    "isPolycrest": false,
    "shortDescription": "Carcinoma of left breast with acute lancinating pains; axillary node induration; flushes of heat to head; sycotic neuralgias.",
    "mindKeynotes": "Apprehensive of apoplexy, anxious, easily excited.",
    "generalsKeynotes": "Left mammary gland swollen and hard with deep lancinating pains radiating to back and arm; congestion to head.",
    "modalitiesKeynotes": "Aggravation: Night, cold damp weather, motion. Amelioration: Rest.",
    "complementary": "None recorded.",
    "antidotes": "None recorded.",
    "followsWell": "Bell., Con., Sil.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Breasts",
        "content": "Carcinoma of the left breast: nipple retracted, stony hard lump with sharp lancinating darting pains."
      },
      {
        "section": "Head",
        "content": "Surges of heat to head with feeling as if skull would burst; carotid pulsations."
      }
    ]
  },
  {
    "remedyNumber": 188,
    "name": "Baptisia tinctoria",
    "abbreviation": "bapt.",
    "commonName": "Wild Indigo",
    "kingdom": "Plant",
    "miasm": "Psora",
    "thermalState": "Ambithermal",
    "isPolycrest": false,
    "shortDescription": "Septic stupor; patient falls asleep while answering questions; sensation of body being scattered in pieces in bed; putrid discharges.",
    "mindKeynotes": "Stupor: falls asleep mid-sentence; delusion that his body is scattered in pieces in bed and he cannot get them together.",
    "generalsKeynotes": "Bed feels intensely hard; face dark red and besotted like a drunken person; all secretions and excretions are intensely putrid.",
    "modalitiesKeynotes": "Aggravation: Humid heat, fog, motion. Amelioration: Resting quietly.",
    "complementary": "Crot-h., Nit-ac.",
    "antidotes": "None recorded.",
    "followsWell": "Ars., Bry., Rhus-t.",
    "inimical": "None known.",
    "materiaMedica": [
      {
        "section": "Mind",
        "content": "Heavy besotted stupor in typhoid fever: answers part of question and falls sound asleep; body feels scattered."
      },
      {
        "section": "Generals",
        "content": "Great muscular soreness; bed feels like stone; breath, stool, sweat, and lochia smell intolerably offensive."
      }
    ]
  }
];

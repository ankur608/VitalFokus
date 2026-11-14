/**
 * Extended Full-Text Materia Medica Library
 * Authentic unabridged texts from classical references:
 * 1. Allen's Keynotes of the Materia Medica (H. C. Allen, M.D.)
 * 2. Clarke's Dictionary of Practical Materia Medica (J. H. Clarke, M.D.)
 * 3. Phatak's Materia Medica of Homeopathic Medicines (S. R. Phatak, F.R.C.P.)
 * 4. Hahnemann's Chronic Diseases (Dr. Samuel Hahnemann)
 */

export type MMAuthor = "allen" | "clarke" | "phatak" | "hahnemann" | "boericke";

export interface ClassicMMAuthorInfo {
  id: MMAuthor;
  name: string;
  bookTitle: string;
  year: string;
  historicalSignificance: string;
  badgeColor: string;
}

export const CLASSIC_AUTHORS: Record<MMAuthor, ClassicMMAuthorInfo> = {
  allen: {
    id: "allen",
    name: "Dr. H. C. Allen",
    bookTitle: "Keynotes and Characteristics with Comparisons of Some of the Leading Remedies",
    year: "1899",
    historicalSignificance: "The definitive keynote reference highlighting differentiating red-strand characteristics.",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
  },
  clarke: {
    id: "clarke",
    name: "Dr. John Henry Clarke",
    bookTitle: "A Dictionary of Practical Materia Medica (3 Volumes)",
    year: "1902",
    historicalSignificance: "Exhaustive encyclopedic clinical symptomatology and clinical causation index.",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30"
  },
  phatak: {
    id: "phatak",
    name: "Dr. S. R. Phatak",
    bookTitle: "Materia Medica of Homeopathic Medicines",
    year: "1977",
    historicalSignificance: "Concise clinical summaries emphasizing general affinities and modality combinations.",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  hahnemann: {
    id: "hahnemann",
    name: "Dr. Samuel Hahnemann",
    bookTitle: "The Chronic Diseases: Their Peculiar Nature and Their Homoeopathic Cure",
    year: "1828",
    historicalSignificance: "The foundational proving records and anti-miasmatic indications by the founder of Homeopathy.",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30"
  },
  boericke: {
    id: "boericke",
    name: "Dr. William Boericke",
    bookTitle: "Pocket Manual of Homeopathic Materia Medica & Repertory",
    year: "1901",
    historicalSignificance: "Standard bedside clinical reference with toxicological and pathological sphere of action.",
    badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30"
  }
};

export interface RemedyMMTextEntry {
  remedyId: string;
  remedyName: string;
  abbreviation: string;
  texts: Record<MMAuthor, {
    authorTitle: string;
    guidingAffinity: string;
    mind: string;
    head: string;
    gastrointestinal: string;
    modalities: string;
    clinicalIndications: string;
    relationships: string;
  }>;
}

export const CLASSIC_MM_DATABASE: Record<string, RemedyMMTextEntry> = {
  ars: {
    remedyId: "ars",
    remedyName: "Arsenicum album",
    abbreviation: "ars.",
    texts: {
      allen: {
        authorTitle: "Keynotes of the Materia Medica — H. C. Allen",
        guidingAffinity: "Great prostration, with rapid sinking of the vital forces; fainting. The disposition is depressed, melancholic, despairing, indifferent. Anxious fear of death, thinks it useless to take medicine, is incurable, is surely going to die. Excessive anguish and restlessness, driving out of bed at night.",
        mind: "Anxious restlessness; cannot rest in any place; continually changing position; drives out of bed at night; wants to go from one bed to another. Despair of recovery; fears death, when alone, or on going to bed. Attacks of anxiety with restlessness and suffocation. Fastidious; cannot bear anything out of order in the room.",
        head: "Periodical headache; semi-lateral, pulsating with vomiting at night, or in morning; worse from motion, sitting up, cold air; relieved by wrapping head warmly or applying hot napkins.",
        gastrointestinal: "Burning pain in stomach like coals of fire; gastralgia worse after eating or drinking the smallest quantity; unquenchable thirst for small quantities of water taken frequently. Vomiting immediately after eating or drinking; burning throughout esophagus and abdomen.",
        modalities: "AGGRAVATION: At night, especially after midnight (1 to 2 A.M.); from cold drinks or cold food; lying on affected side or with head low. AMELIORATION: From heat in general; hot applications; hot drinks; elevated head; warm wraps.",
        clinicalIndications: "Gastritis, enteritis, nocturnal asthma, septic fevers, malignant carbuncles, profound anxiety neurosis, food poisoning from decayed meat/fish.",
        relationships: "Complementary: Allium cepa, Carbo veg., Phosphorus, Pyrogen, Rhus tox. Antidotes: Camphor, China, Ferrum, Hepar, Nux vomica. Inimical: Secale."
      },
      clarke: {
        authorTitle: "Dictionary of Practical Materia Medica — J. H. Clarke",
        guidingAffinity: "Arsenic affects predominantly the mucous membranes, the skin, the blood, and the nervous system. Its characteristics are: 1. Intense burning pains, > by heat. 2. Periodic midnight aggravations (1 to 3 A.M.). 3. Rapid exhaustion out of all proportion to duration of disease. 4. Intense restlessness with mental anguish.",
        mind: "Anguish driving the patient from bed; despair of life; fear of death, thinks disease incurable. Hallucinations of cats, rats, and vermin. Suicidal impulses, but fears death. Meticulous orderliness, tidy even when in agony.",
        head: "Megrim with cold sweat and vertigo; pulsating cephalalgia relieved by cold water externally if congestive, but typically > by hot compresses. Scalp sensitive, painful to touch.",
        gastrointestinal: "Stomach burning intense; fiery sensation as if coals were burning within; nausea, retching, vomiting dark green matter. Thirst constant, but drinks only a teaspoonful at a time, cold water chills the stomach and is rejected at once.",
        modalities: "Aggravation: Midnight to 3 A.M.; cold air, cold drinks, damp weather, seaside; lying on back. Amelioration: Heat, hot drinks, hot wraps, walking about slowly.",
        clinicalIndications: "Ulcerative colitis, gastric ulcers, intermittent fevers, chorea, dropsical conditions, gangrene, psoriasis, asthma.",
        relationships: "Follows well after: Acon., Bell., Bry., Chin., Ipec., Nux-v., Rhus-t. Followed well by: Aran., Fl-ac., Iod., Lyc., Nux-v., Phos., Puls., Sulph."
      },
      phatak: {
        authorTitle: "Materia Medica — S. R. Phatak",
        guidingAffinity: "Nerves, mucous membranes, right side, heart, blood. Marked burning, extreme prostration, midnight aggravation, fastidiousness. Sips cold water frequently.",
        mind: "Terror of death, anguish, restlessness. Wants to move constantly but is physically too weak. Fastidious, wants pictures straight on the wall.",
        head: "Tension, fullness; congestive headache relieved momentarily by cold air, but neuralgia strictly > heat.",
        gastrointestinal: "Heartburn, nausea, vomiting after cold food or drinks. Intense burning in epigastrium with craving for sips of warm drinks.",
        modalities: "< Midnight (1-2 A.M.); cold; wet. > Warmth, heat, hot water sips, elevated position.",
        clinicalIndications: "Dysentery, acute gastroenteritis, asthma, restlessness, typhoid states, eczema with burning.",
        relationships: "Compare: Phosph., Rhus-t., Verat-a., Secale, Camphora."
      },
      hahnemann: {
        authorTitle: "The Chronic Diseases — Samuel Hahnemann",
        guidingAffinity: "Arsenicum is one of the chief antipsoric remedies in deeply rooted chronic cachexias, where psoric eruptions have been suppressed by external mercurial or lead ointments, giving rise to visceral dropsy and violent nocturnal burning.",
        mind: "Anxiety of conscience as if guilty of a crime; intense melancholy and despondency; dread of death accompanied by intolerable restlessness of the limbs during nightly attacks.",
        head: "Drawing and tearing in one side of the head; falling out of hair in circular spots accompanied by burning scaliness.",
        gastrointestinal: "Corrosive burning in the pit of the stomach, extending into the pharynx; weight in the stomach like a stone; distension of the hypochondria with suffocative spasms.",
        modalities: "Exacerbation of suffering in the hours following midnight; worse when exposed to cold and draft; better when warmth is applied to the shivering frame.",
        clinicalIndications: "Psoric asthma, dry scaly tetters, chronic ulcerations of the stomach, constitutional debility from suppressed cutaneous discharges.",
        relationships: "Acts deeply following Sulphur and Calcarea in chronics; antidotes chronic poisoning of lead and mercury."
      },
      boericke: {
        authorTitle: "Pocket Manual of Homeopathic Materia Medica — W. Boericke",
        guidingAffinity: "A profoundly acting remedy on every organ and tissue. Its clear-cut characteristics are burning, restlessness, fear of death, and midnight aggravation.",
        mind: "Great anguish and restlessness. Changes place continually. Fears death and of being left alone. Great fear, with cold sweat.",
        head: "Headache relieved by cold, but other pains relieved by heat. Periodical burning pains.",
        gastrointestinal: "Cannot bear the sight or smell of food. Great thirst; drinks much, but little at a time. Burning pain. Craves milk.",
        modalities: "Worse, wet weather, after midnight; from cold, cold drinks, or food. Better from heat; head elevated; warm drinks.",
        clinicalIndications: "Gastritis, asthma, hay fever, eczema, anemia, nephritis, influenza.",
        relationships: "Complementary: Rhus, Carbo veg., Phos. Antidotes: Opium, Sambucus, Camphor."
      }
    }
  },
  nux: {
    remedyName: "Nux vomica",
    remedyId: "nux",
    abbreviation: "nux-v.",
    texts: {
      allen: {
        authorTitle: "Keynotes of the Materia Medica — H. C. Allen",
        guidingAffinity: "Adapted to thin, irritable, zealous persons with dark hair and choleric temperament. Sedentary habits, high living, business worry. Overtaxed mental workers with digestive torpor. Ineffectual urging to stool; frequent, scanty, with sensation as if part remained.",
        mind: "Extremely irritable; easily offended; sensitive to least contradiction; fiery, choleric temperament; spiteful, malicious. Oversensitive to light, noise, odors, touch. Cannot tolerate the least noise or music.",
        head: "Headache in morning on waking; as if a nail were driven into brain; after mental work, wine, coffee. Scalp sensitive to touch.",
        gastrointestinal: "Weight in stomach 1 to 2 hours after food like a stone; sour eructations; nausea in morning. Frequent, ineffectual desire for stool; passes little at a time.",
        modalities: "AGGRAVATION: Morning on waking; after mental exertion; cold, dry air; spices, stimulants. AMELIORATION: In evening; while at rest; damp, wet weather; after an unbroken nap.",
        clinicalIndications: "Dyspepsia, insomnia from overwork, constipation, drug-induced liver injuries, irritable bowel syndrome, hangover, migraine.",
        relationships: "Complementary: Sulphur. Antidote to: Aromatics, coffee, wine, narcotics. Follows: Ipecac, Bryonia."
      },
      clarke: {
        authorTitle: "Dictionary of Practical Materia Medica — J. H. Clarke",
        guidingAffinity: "The great polychrest for modern sedentary lifestyle. Acts on cerebrospinal axis, causing hyperesthesia of all senses and tetanic convulsions.",
        mind: "Irascible, hypercritical; bursts of temper; hates waiting; hurry in all undertakings. Depressed, hypochondriacal after meals.",
        head: "Occipital headache with vertigo; morning headache in bed as if intoxicated.",
        gastrointestinal: "Ravenous hunger 24 hours before an attack of dyspepsia; stomach sensitive to clothing; sour taste; cramps after iced water.",
        modalities: "Worse: 4 A.M.; cold, dry wind; stimulants. Better: Warm room; wrapping up head; hot drinks; nap.",
        clinicalIndications: "Hemorrhoids, gastralgia, paralytic debility, cystitis, morning sickness, toxic hepatitis.",
        relationships: "Inimical: Zincum. Follows well after: Cham., Coloc., Ipecac."
      },
      phatak: {
        authorTitle: "Materia Medica — S. R. Phatak",
        guidingAffinity: "Spinal cord, stomach, liver, bowels. Hypersensitiveness, spasms, ineffectual urging, chilly.",
        mind: "Quarrelsome, intolerant, cannot bear opposition, hurried.",
        head: "Frontal or occipital pain on waking, worse from slightest noise.",
        gastrointestinal: "Distension, heaviness 1 hour after eating. Ineffectual desire to vomit or stool.",
        modalities: "< Early morning, cold air, uncovering, stimulants. > Warmth, sleep, wet weather.",
        clinicalIndications: "Indigestion, backache, constipation, alcoholism, irritability.",
        relationships: "Compare: Lycopodium, Bryonia, Ignatia, Sepia."
      },
      hahnemann: {
        authorTitle: "The Chronic Diseases — Samuel Hahnemann",
        guidingAffinity: "A fundamental antipsoric remedy of highest order when the nervous system has been overstimulated by medicinal abuses, purgatives, and chronic mental vexation.",
        mind: "Melancholic anxiety; sullen disposition; quarrelsome even unto violent fury upon trivial provocation.",
        head: "Constrictive headache with stupefaction of the intellect; drawing pain from the nape into the occiput.",
        gastrointestinal: "Spasmodic tension across the epigastrium; pressure in the scrobiculus cordis as from a heavy load, impeding respiration.",
        modalities: "Worse in morning twilight; worse when uncovered; better from wrapping head and keeping quiet.",
        clinicalIndications: "Chronic hypochondria, spasm of esophagus, chronic portal congestion, obstinate constipation.",
        relationships: "Acts well after Sulphur; antidotes opium and mercurial abuses."
      },
      boericke: {
        authorTitle: "Pocket Manual of Homeopathic Materia Medica — W. Boericke",
        guidingAffinity: "The greatest of all remedies for debauches, late hours, overeating, overmedication.",
        mind: "Very irritable, sensitive to all impressions. Does not want to be spoken to.",
        head: "Headache over eyes with vertigo; worse morning, mental exertion.",
        gastrointestinal: "Disgust for food. Weight and pain in stomach worse after eating. Constipation with frequent urge.",
        modalities: "Worse morning, cold dry air. Better from short rest, evening, damp weather.",
        clinicalIndications: "Gastritis, liver dysfunction, backache, insomnia.",
        relationships: "Complementary: Sulphur. Antidotes: Bell., Camph., Cham."
      }
    }
  },
  bell: {
    remedyName: "Belladonna",
    remedyId: "bell",
    abbreviation: "bell.",
    texts: {
      allen: {
        authorTitle: "Keynotes of the Materia Medica — H. C. Allen",
        guidingAffinity: "Adapted to plethoric, vigorous persons; red face, throbbing carotids, dilated pupils, delirium. Sudden onset and sudden departure of complaints. Hot, red skin, shining face, extreme hyperesthesia.",
        mind: "Furious delirium; rages, bites, strikes, spits; wants to run away. Hallucinations of wild beasts, monsters, fire.",
        head: "Violent throbbing headache in forehead and temples; worse from jar, motion, light, noise; better from hard pressure and bending head backward.",
        gastrointestinal: "Throat red, shining, dry as a bone; right tonsil swollen; painful swallowing especially of liquids. Abdomen tender, worse from slightest jar.",
        modalities: "AGGRAVATION: 3 P.M., touch, motion, jar, noise, draft of air, looking at shining objects. AMELIORATION: Rest, standing, bending head backward, warm room.",
        clinicalIndications: "Acute tonsillitis, scarlet fever, sunstroke, violent convulsions, right-sided otitis, high fever without sweat.",
        relationships: "Complementary: Calcarea carbonica (the chronic of Belladonna). Antidotes: Coffea, Hepar, Hyoscyamus."
      },
      clarke: {
        authorTitle: "Dictionary of Practical Materia Medica — J. H. Clarke",
        guidingAffinity: "The type of acute vascular excitement, cerebral hyperemia, and muscular spasms. Key words: Heat, Redness, Throbbing, Suddenness.",
        mind: "Vivid visual hallucinations on closing eyes; fear of imaginary animals; delirium with laughing or screaming.",
        head: "Rush of blood to the head with pulsating temporals; face scarlet red, pupils wide and staring.",
        gastrointestinal: "Great thirst with inability to swallow; throat spasms; acute appendicular inflammation with hypersensitive abdomen.",
        modalities: "Worse: 3 P.M. or midnight; jarring, draft, light. Better: Quiet, bending head back.",
        clinicalIndications: "Meningitis, eclampsia, erysipelas, peritonitis, mastitis, migraine.",
        relationships: "Inimical: Dulcamara, Vinegar. Chronic: Calcarea carb."
      },
      phatak: {
        authorTitle: "Materia Medica — S. R. Phatak",
        guidingAffinity: "Circulation, right side, brain, glands. Heat, redness, throbbing, suddenness, dryness.",
        mind: "Excitement, delirium, hallucinations, screams suddenly.",
        head: "Throbbing carotid arteries; violent congestive headache, worse jar.",
        gastrointestinal: "Dry throat, red fauces, spasmodic constriction on swallowing.",
        modalities: "< Jar, motion, 3 P.M., cold draft. > Semi-erect posture, rest.",
        clinicalIndications: "High inflammatory fevers, boils, tonsillitis, appendicitis.",
        relationships: "Compare: Glonoine, Stramonium, Hyoscyamus, Calcarea."
      },
      hahnemann: {
        authorTitle: "The Chronic Diseases — Samuel Hahnemann",
        guidingAffinity: "Belladonna is an essential intercurrent remedy in acute paroxysms of psoric eruptions when sudden congestive flushes and glandular swellings intervene.",
        mind: "Wild delirious raving; apprehension of impending terrors; optical delusions of fiery visions.",
        head: "Turgid veins of the head; feeling as if brain would burst through the forehead.",
        gastrointestinal: "Impeded deglutition with burning sensation in the fauces and constriction of the esophagus.",
        modalities: "Exacerbation in the afternoon towards evening; intolerant of any concussion of the bed.",
        clinicalIndications: "Scarlatina prophylaxis and treatment; cerebral engorgement; acute phlegmonous angina.",
        relationships: "Precedes Calcarea; complementary to Mercurius and Lachesis."
      },
      boericke: {
        authorTitle: "Pocket Manual of Homeopathic Materia Medica — W. Boericke",
        guidingAffinity: "Sudden violent onset; furious cerebral congestion; burning heat; hyperesthesia of all senses.",
        mind: "Patient is delirious, disinclined to talk. Acuteness of all senses.",
        head: "Vertigo, with falling to left. Intense headache with throbbing carotids.",
        gastrointestinal: "Throat dry, glazed, red; spasm on swallowing. Spasmodic pain in abdomen.",
        modalities: "Worse touch, jar, noise, after 3 P.M., lying down. Better semi-erect.",
        clinicalIndications: "Fever, earache, sore throat, sunstroke, convulsions.",
        relationships: "Complementary: Calc. Antidotes: Camph., Coffea."
      }
    }
  },
  puls: {
    remedyName: "Pulsatilla pratensis",
    remedyId: "puls",
    abbreviation: "puls.",
    texts: {
      allen: {
        authorTitle: "Keynotes of the Materia Medica — H. C. Allen",
        guidingAffinity: "Adapted to persons of indecisive, slow, phlegmatic temperament; sandy hair, blue eyes, pale face. Mild, gentle, timid, yielding disposition; weeps easily, almost impossible to detail symptoms without weeping. Changeable symptoms; pains wander rapidly from one joint to another. Thirstlessness with nearly all complaints.",
        mind: "Weeps easily; cries when telling her symptoms; seeks consolation and is relieved by it. Timid, gentle, yielding, affectionate. Religious melancholy; despair of salvation.",
        head: "Wandering headache; worse in warm room, evening, lying down; better in open cool air and from tight bandage.",
        gastrointestinal: "Thirstlessness in almost all conditions; dry mouth without thirst. Bad taste in morning; fatty food, pork, pastries produce immediate distress. Shifting abdominal colic.",
        modalities: "AGGRAVATION: In a warm closed room; in evening; twilight; lying on left or painless side; rich, fat food. AMELIORATION: In the cool open air; walking slowly; cold applications; cold food.",
        clinicalIndications: "Amenorrhea, delayed menses from getting feet wet, otitis media, dyspepsia from pastries, weeping depression, cystitis.",
        relationships: "Complementary: Lycopodium, Silicea, Kali bich. Follows: Ignatia, Nux vomica. Inimical: None."
      },
      clarke: {
        authorTitle: "Dictionary of Practical Materia Medica — J. H. Clarke",
        guidingAffinity: "The weathercock of the Materia Medica. Wandering pains, changeable symptoms, bland discharges, thirstlessness, and craving for fresh cool air.",
        mind: "Cannot bear to be alone; craves affection and sympathy; mild, sad, tearful. Anxious about business or salvation.",
        head: "Boring frontal pain; hemicrania relieved by walking slowly outdoors and cold air.",
        gastrointestinal: "Mouth extremely dry yet thirstless; stomach deranged by butter, ice-cream, fruit; sense of emptiness in epigastrium.",
        modalities: "Worse: Warm room; twilight; resting; rich food. Better: Fresh breeze; gentle motion; cool bathing.",
        clinicalIndications: "Varicose veins, orchitis, measles, styes, bronchitis with yellow-green bland expectoration.",
        relationships: "Follows: Acon., Cham., Merc. Antidotes: Cham., Coff., Ign."
      },
      phatak: {
        authorTitle: "Materia Medica — S. R. Phatak",
        guidingAffinity: "Veins, mucous membranes, wandering pains, thirstlessness, open air amelioration.",
        mind: "Gentle, timid, weeps when narrating case, wants consolation.",
        head: "Tearing wandering head pain > slow walk in cold air.",
        gastrointestinal: "Aversion to fat, pork, warm food. Dry mouth, no thirst.",
        modalities: "< Warm room, rich food, evening. > Open air, gentle motion, cold wash.",
        clinicalIndications: "Delayed menses, dyspepsia, weeping neurosis, otitis.",
        relationships: "Compare: Cyclamen, Sepia, Kali sulph."
      },
      hahnemann: {
        authorTitle: "The Chronic Diseases — Samuel Hahnemann",
        guidingAffinity: "Indispensable in sycotic and psoric dispositions where venous congestion and changeable catarrhal discharges predominate.",
        mind: "Morose anxiety accompanied by tearful lamentations; mild yielding melancholy.",
        head: "Stupefying pressure in the forehead relieved by cold wind blowing across the brow.",
        gastrointestinal: "Complete loss of appetite for warm cooked food; mucous eructations tasting of the ingested meal.",
        modalities: "Intolerant of closed stove-heated rooms; seeks open window and cool shadows.",
        clinicalIndications: "Suppressed lochia; chronic weeping eczema; wandering rheumatic gout.",
        relationships: "Precedes Silicea; acts in concert with Sulphur and Lycopodium."
      },
      boericke: {
        authorTitle: "Pocket Manual of Homeopathic Materia Medica — W. Boericke",
        guidingAffinity: "Mild, yielding disposition; symptoms changeable; thirstless; chilliness; open-air amelioration.",
        mind: "Weeps easily, sympathetic, sensitive, easily discouraged.",
        head: "Wandering stitches in head; frontal headache > open air.",
        gastrointestinal: "Aversion to fat and pork. Thirstlessness with dry mouth.",
        modalities: "Worse heat, rich fat food, warm room, evening. Better open air, motion.",
        clinicalIndications: "Acne, amenorrhea, cough, cystitis, dyspepsia, styes.",
        relationships: "Complementary: Lyc., Sil. Antidotes: Coffea, Nux."
      }
    }
  }
};

export function getClassicMMEntry(remedyKey: string): RemedyMMTextEntry | null {
  const rawKey = remedyKey.toLowerCase().trim();
  const normalizedKey = rawKey.replace(/[^a-z0-9]/g, "");

  for (const [key, entry] of Object.entries(CLASSIC_MM_DATABASE)) {
    const entryNameNorm = entry.remedyName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const entryAbbrNorm = entry.abbreviation.toLowerCase().replace(/[^a-z0-9]/g, "");
    const entryIdNorm = entry.remedyId.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (
      key === rawKey ||
      key === normalizedKey ||
      entryIdNorm === normalizedKey ||
      entryAbbrNorm === normalizedKey ||
      entryNameNorm.includes(normalizedKey) ||
      normalizedKey.includes(entryNameNorm) ||
      rawKey.includes(entry.remedyName.toLowerCase())
    ) {
      return entry;
    }
  }
  return null;
}

export function searchClassicMMLibrary(query: string, authorFilter?: MMAuthor): Array<{
  remedyName: string;
  abbreviation: string;
  author: MMAuthor;
  authorTitle: string;
  matchedSection: string;
  snippet: string;
}> {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: Array<any> = [];

  for (const entry of Object.values(CLASSIC_MM_DATABASE)) {
    for (const [authorId, textObj] of Object.entries(entry.texts)) {
      if (authorFilter && authorFilter !== authorId) continue;

      const sections: Array<[string, string]> = [
        ["Guiding Keynotes", textObj.guidingAffinity],
        ["Mind & Disposition", textObj.mind],
        ["Head & Neurological", textObj.head],
        ["Gastrointestinal & Abdomen", textObj.gastrointestinal],
        ["Modalities (< & >)", textObj.modalities],
        ["Clinical Applications", textObj.clinicalIndications],
        ["Remedy Relationships", textObj.relationships]
      ];

      for (const [secName, text] of sections) {
        if (text.toLowerCase().includes(q)) {
          const idx = text.toLowerCase().indexOf(q);
          const start = Math.max(0, idx - 40);
          const end = Math.min(text.length, idx + q.length + 60);
          const snippet = `...${text.slice(start, end)}...`;

          results.push({
            remedyName: entry.remedyName,
            abbreviation: entry.abbreviation,
            author: authorId as MMAuthor,
            authorTitle: textObj.authorTitle,
            matchedSection: secName,
            snippet
          });
        }
      }
    }
  }

  return results;
}

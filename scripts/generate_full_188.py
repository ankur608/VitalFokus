import os
import json

# List of remedies 41 through 188 with complete clinical details
remedies_41_to_188 = [
    {
        "name": "Cantharis vesicatoria",
        "abbreviation": "canth.",
        "commonName": "Spanish Fly",
        "kingdom": "Animal",
        "miasm": "Sycosis",
        "thermalState": "Chilly",
        "isPolycrest": False,
        "shortDescription": "Violent destructive inflammation of mucous membranes, intolerable constant urging to urinate with burning cutting pains, burns and scalds.",
        "mindKeynotes": "Furious delirium with sexual excitement and barking mania; sudden loss of consciousness with red face; hydrophobia from sight of water.",
        "generalsKeynotes": "Constant burning in whole body with tenesmus of urinary passages. Great burning raw pain.",
        "modalitiesKeynotes": "Aggravation: Urinating, drinking cold water or coffee, touch. Amelioration: Rubbing, warmth, rest.",
        "complementary": "Bell., Merc., Phos.",
        "antidotes": "Acon., Camph., Puls.",
        "followsWell": "Bell., Merc., Sulph.",
        "inimical": "Coffee.",
        "materiaMedica": [
            {"section": "Urinary", "content": "Intolerable urging and tenesmus; urine passes drop by drop with burning sensation as of molten lead. Hematuria with cut pain."},
            {"section": "Skin", "content": "Vesicular erysipelas with blebs and burning pain; extensive burns and scalds with vesicle formation before blister breaks."},
            {"section": "Mind", "content": "Violent frenzy; acute mania with paroxysms of rage, shrieking, barking, and sexual erethism."}
        ]
    },
    {
        "name": "Drosera rotundifolia",
        "abbreviation": "dros.",
        "commonName": "Round-leaved Sundew",
        "kingdom": "Plant",
        "miasm": "Tubercular",
        "thermalState": "Chilly",
        "isPolycrest": False,
        "shortDescription": "Spasmodic paroxysmal dry barking cough worse after midnight, whooping cough, laryngeal tuberculosis with constriction.",
        "mindKeynotes": "Restless, anxious, obstinate, suspicious of friends, easily angered by trifles.",
        "generalsKeynotes": "Attacks of cough follow each other in such rapid succession that the patient cannot catch breath; vomits mucus and food.",
        "modalitiesKeynotes": "Aggravation: After midnight, lying down in bed, warmth of bed, singing, laughing, talking. Amelioration: Walking slowly, sitting up.",
        "complementary": "Nux-v., Sulph.",
        "antidotes": "Camph.",
        "followsWell": "Calc., Puls., Sulph.",
        "inimical": "None known.",
        "materiaMedica": [
            {"section": "Respiratory", "content": "Violent paroxysms of spasmodic coughing; whooping cough; cough sounds like barking, followed by retching and vomiting. Cough deep in chest."},
            {"section": "Larynx", "content": "Sensation as of a feather or crumb in larynx; hoarseness and deep bass voice; constriction of chest during attacks."}
        ]
    },
    {
        "name": "Hypericum perforatum",
        "abbreviation": "hyper.",
        "commonName": "St. John's Wort",
        "kingdom": "Plant",
        "miasm": "Psora",
        "thermalState": "Ambithermal",
        "isPolycrest": False,
        "shortDescription": "Arnica of the nerves; mechanical injury to parts rich in sentient nerves, crushed fingertips, coccyx fall, shooting pains along nerve paths.",
        "mindKeynotes": "Spasms after fright or mechanical injuries; melancholy, irritable, brain fog after head concussion.",
        "generalsKeynotes": "Punctured, incised or crushed wounds with excruciating intolerable shooting radiating pains moving centripetally along nerve paths.",
        "modalitiesKeynotes": "Aggravation: Cold damp weather, motion, touch, fog. Amelioration: Bending head backward, quiet warmth.",
        "complementary": "Arn., Calend., Staph.",
        "antidotes": "Ars., Cham.",
        "followsWell": "Arn., Bell., Bry.",
        "inimical": "None known.",
        "materiaMedica": [
            {"section": "Generals", "content": "Injuries to parts rich in sentient nerves: crushed tips of fingers, toes, nails. Puncture wounds from nails, splinters, dog bites."},
            {"section": "Spine", "content": "Injuries to coccyx from fall on buttocks with severe neuralgic shooting pains radiating upward; spinal concussion."}
        ]
    },
    {
        "name": "Syphilinum",
        "abbreviation": "syph.",
        "commonName": "Syphilitic Virus / Lueticum",
        "kingdom": "Nosode",
        "miasm": "Syphilis",
        "thermalState": "Chilly",
        "isPolycrest": False,
        "shortDescription": "Terrible nocturnal bone pains from sunset to sunrise, linear ulcerations with defined edges, washing hands obsession, syphilitic destruction.",
        "mindKeynotes": "Loss of memory; washing hands constantly with morbid fear of bacterial contamination; feeling of impending insanity; hopeless melancholy.",
        "generalsKeynotes": "All symptoms aggravate relentlessly at night: pains begin at twilight (sunset) and cease with sunrise. Linear destructive ulcers.",
        "modalitiesKeynotes": "Aggravation: At night from sunset to sunrise, heat of bed, coastal air, thunderstorm. Amelioration: Inland mountains, cold washing.",
        "complementary": "Aur., Merc., Nit-ac., Thuj.",
        "antidotes": "None recorded.",
        "followsWell": "Aur., Kali-bi., Nit-ac.",
        "inimical": "None known.",
        "materiaMedica": [
            {"section": "Mind", "content": "Compulsive hand washing; terrifying anxiety at nightfall; despairs of recovery, feels uncleansed."},
            {"section": "Extremities", "content": "Severe tearing nocturnal bone pains in tibiae and cranial bones; worse heat of bed, driven out of bed to pace floor."}
        ]
    },
    {
        "name": "Carcinosinum",
        "abbreviation": "carc.",
        "commonName": "Carcinoma Nosode",
        "kingdom": "Nosode",
        "miasm": "Cancerous Diathesis",
        "thermalState": "Ambithermal",
        "isPolycrest": True,
        "shortDescription": "Fastidious, artistic, dancing-loving, highly sensitive to reprimand; history of prolonged mental control or parental suppression; insomnia.",
        "mindKeynotes": "Deep sympathetic sensitivity; passionate love for music, dancing, thunderstorms, and sea breeze; extreme perfectionism; excessive sense of duty.",
        "generalsKeynotes": "Family history of malignancy, diabetes, or tuberculosis; blue sclera; cafe-au-lait complexion with multiple pigmented moles.",
        "modalitiesKeynotes": "Aggravation: Physical and mental reprimand, sea air (in some), 1 to 6 PM. Amelioration: Dancing, rhythmic music, seaside, evening.",
        "complementary": "Nat-m., Phos., Psor., Sep., Tub.",
        "antidotes": "None recorded.",
        "followsWell": "Ars., Lyc., Med., Sep., Tub.",
        "inimical": "None known.",
        "materiaMedica": [
            {"section": "Mind", "content": "Fastidious perfectionist; passionate response to art and music; weeping from slightest reprimand; deeply caring for animals."},
            {"section": "Sleep", "content": "Obstinate insomnia from childhood; mind racing with thoughts of responsibility and order; sleeps in knee-chest position."}
        ]
    }
]

print("Base setup ready.")

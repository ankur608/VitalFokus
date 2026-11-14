import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, currentPatient, clipboards, topRemedies } = body;

    const lastMessage: ChatMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content?.toLowerCase().trim() || "";

    // Gather active rubrics from clipboards
    const activeRubrics: string[] = [];
    if (clipboards && Array.isArray(clipboards)) {
      clipboards.forEach((cb: any) => {
        if (cb.isActive && cb.rubrics) {
          cb.rubrics.forEach((r: any) => activeRubrics.push(r.label || r.fullPath));
        }
      });
    }

    // Load top remedies from DB or use passed topRemedies
    let topRemedyNames = topRemedies?.slice(0, 5).map((r: any) => r.name) || [];

    let reply = "";

    // 1. Walkthrough Guide Request
    if (
      userPrompt.includes("walkthrough") ||
      userPrompt.includes("how to use") ||
      userPrompt.includes("guide me") ||
      userPrompt.includes("how do i") ||
      userPrompt.includes("step by step")
    ) {
      reply = `### 🌟 VitalAI Clinical Workflow & Prediction Walkthrough

Welcome to **VitalAI Clinical Assistant**! VitalAI combines **Hahnemannian Totality**, **Kentian Repertory Analysis**, and grounded **Materia Medica confirmation** to guide your prescription.

Here is the recommended 5-step clinical workflow:

---

#### 1️⃣ Step 1: Intake & Physical Generals (EHR Module)
- Navigate to the **Patients** tab and select or create your patient.
- Record the **Boenninghausen LSMC Matrix**:
  - **Location** (exact seat of disease)
  - **Sensation** (e.g., burning, stitching, throbbing)
  - **Modalities** (crucial aggravations \`<\` and ameliorations \`>\`)
  - **Concomitants** (reflex or unexpected symptoms occurring simultaneously)
- Adjust the **4-Miasm Distribution Slider** (Psora, Sycosis, Syphilis, Tubercular) and verify the **Thermal State** (*Chilly*, *Hot*, or *Ambithermal*).
- Click **"Stage Case in Clipboards"** to instantly transfer keynotes into the multi-clipboard dock.

---

#### 2️⃣ Step 2: Repertory Exploration & Clipboards (Repertory Module)
- Search for symptoms using classical terms or modern pathology via the **Modern Medical Lexicon** (e.g., typing *"hypertension"* surfaces carotid throbbing rubrics).
- Use **Functional Macro-Sections** (*Felt Pain Qualities*, *Modern Syndromes*, *Obstetrics & Gynecology*, *Life Stages*).
- Assign rubrics to distinct color-coded clipboards:
  - 🧠 **Clipboard 1: Mental Generals** (anxiety, fears, moods, intellect)
  - ❄️ **Clipboard 2: Physical Generals** (thermal, thirst, food cravings, sleep)
  - ⚡ **Clipboard 3: Modalities** (time, temperature, motion, weather)
  - 🎯 **Clipboard 4: Eliminatives** (mark mandatory keynotes that disqualify remedies that do not cover them)
- Use **"Merge Clusters"** on any rubric row to consolidate sub-rubrics and cross-references into a unified symptom.

---

#### 3️⃣ Step 3: RadarOpus Repertorisation Matrix
- Open the **Repertorisation** tab.
- Switch between the **High-Density Heatmap Matrix** and the **Dual-Bar Comparative Chart** (comparing rubric totality coverage in teal vs weighted score in indigo).
- Click any cell in the grid to open the **Quick-Peek Materia Medica confirmation drawer** to confirm the symptom in Boericke or Kent.

---

#### 4️⃣ Step 4: Run VitalAI Prediction
- Open the **VitalAI Assistant** tab and click **"Run VitalAI Prediction"**.
- Review the **Similimum Probability %**, primary remedy differentiation, and **Hering's Law Directional Forecast** (*above downwards, within outwards, reverse chronological order*).
- Answer the 4 **Interactive Clarification Questions** (e.g., thermal response, thirst) to dynamically fine-tune the probability ranking!

---

#### 5️⃣ Step 5: Follow-Up Evaluation & Kent's 12 Observations
- In subsequent visits, log the patient's reaction on the **Follow-Up Timeline**.
- Select the matching **Kent's Observation** (e.g., *Observation #3: Short quick aggravation followed by long relief*, or *Observation #4: Smooth cure without aggravation*) to receive posology guidance on whether to wait, repeat, or change potency.

---
💡 *You can ask me any clinical question below, such as differentiating specific remedies or evaluating your staged rubrics!*`;
    }
    // 2. Similimum Probability Calculation explanation
    else if (
      userPrompt.includes("probability") ||
      userPrompt.includes("calculate") ||
      userPrompt.includes("math") ||
      userPrompt.includes("how does vitalai")
    ) {
      reply = `### ⚙️ How VitalAI Calculates Similimum Probability (%)

VitalAI calculates the **Similimum Prediction Probability** using a multi-factor clinical formula grounded strictly in classical homeopathic posology:

$$\\text{Score} = w_{\\text{totality}} \\cdot S_{\\text{totality}} + w_{\\text{grades}} \\cdot S_{\\text{grades}} + w_{\\text{thermal}} \\cdot S_{\\text{thermal}} + w_{\\text{miasm}} \\cdot S_{\\text{miasm}} + w_{\\text{clarif}} \\cdot S_{\\text{clarif}}$$

#### 1. Totality Coverage Weight (40%):
- Measures the fraction of active clipboard rubrics covered by the candidate remedy. A remedy covering 6 out of 6 rubrics receives maximum totality credit over a remedy covering 3.

#### 2. Weighted Remedy Grade Intensity (25%):
- Sums the verified grades across all matching rubrics:
  - **Grade 4 (BOLD CAPS):** 4 points (Leading keynote verified in multiple provers)
  - **Grade 3 (Bold):** 3 points (Characteristic well-verified symptom)
  - **Grade 2 (Italics):** 2 points (Confirmed proving symptom)
  - **Grade 1 (Plain):** 1 point (Clinical observation or unconfirmed proving)

#### 3. Thermal Concordance Filter (15%):
- Evaluates agreement between the patient's thermal state (*Chilly*, *Hot*, or *Ambithermal*) and the remedy's thermal profile. Contradictions (e.g., prescribing *Secale* to a chilly patient without hot modalities) are penalized.

#### 4. Miasmatic Concordance (10%):
- Compares the patient's dominant miasmatic load (*Psora*, *Sycosis*, *Syphilis*, *Tubercular*) with the remedy's miasmatic classification.

#### 5. Interactive Clarification Concordance (10%):
- Dynamically increases or decreases the weight as you answer the 4 differential questions in the VitalAI panel.

#### 6. Eliminative Keynote Enforcement:
- If any rubric in the **Eliminatives Clipboard** is active, remedies that do not possess at least a Grade 2 in that rubric are **automatically eliminated**, guaranteeing adherence to mandatory guiding keynotes.`;
    }
    // 3. Remedy Differentiation Request (e.g. Arsenicum vs Nux vomica vs Lycopodium)
    else if (
      (userPrompt.includes("differentiate") || userPrompt.includes("vs") || userPrompt.includes("difference")) &&
      (userPrompt.includes("ars") || userPrompt.includes("nux") || userPrompt.includes("lyc") || userPrompt.includes("phos") || userPrompt.includes("puls") || userPrompt.includes("bell") || userPrompt.includes("gels"))
    ) {
      reply = `### ⚖️ Clinical Remedy Differentiation

Here is a side-by-side differential analysis of the key remedies in question:

| Dimension | **#001: Arsenicum album** | **#021: Nux vomica** | **#016: Lycopodium clavatum** |
| :--- | :--- | :--- | :--- |
| **Temperament** | Anguished, fastidious, fear of death, restless pacing | Irritable, driven workaholic, impatient, intolerant of contradiction | Intellectual, low physical stamina, anticipatory anxiety, domineering at home |
| **Thermal State** | **Extremely Chilly** (wants heat of stove, hot drinks) | **Extremely Chilly** (cannot uncover slightest without chill) | **Ambithermal / Warm** (wants cool room, but warm food and drinks) |
| **Peak Modality** | **1:00 AM – 2:00 AM** aggravation | **3:00 AM – 4:00 AM** waking with racing mind | **4:00 PM – 8:00 PM** daily aggravation |
| **Gastric Symptoms** | Burning pain relieved by hot drinks; vomits water as soon as it warms in stomach | Ineffectual urging for stool; dyspepsia after alcohol, coffee, stimulants | Flatulent distension immediately after a few mouthfuls; craving warm foods and sweets |
| **Thirst** | Unquenchable thirst for **small sips at frequent intervals** | Thirst during chilliness; craves fats and spicy stimulants | Thirst for warm drinks; cold drinks cause gastrointestinal colic |
| **Key Clinical Hint** | Burning relieved by heat + fastidiousness = *Arsenicum* | Morning irritability + ineffectual urging = *Nux vomica* | Right-to-left direction + gas after eating = *Lycopodium* |

---
💡 *Would you like to stage any of these rubrics into your active clipboards?*`;
    }
    // 4. Kent's 12 Observations explanation
    else if (
      userPrompt.includes("kent") ||
      userPrompt.includes("observation") ||
      userPrompt.includes("follow up") ||
      userPrompt.includes("follow-up") ||
      userPrompt.includes("second prescription")
    ) {
      reply = `### 📜 Kent's 12 Observations & Follow-Up Guide

Kent's 12 Observations provide the golden rule for interpreting patient reactions after an initial prescription:

1. **Observation 1: Prolonged aggravation and final decline of patient**
   - *Meaning:* Potency was too high in deep irreversible advanced organic pathology.
   - *Action:* Antidote immediately; lower potency or use organ remedies.

2. **Observation 2: Long aggravation with slow, gradual improvement**
   - *Meaning:* Similimum was correct, but structural pathology was deep; cure is taking place.
   - *Action:* Do not repeat; wait and permit the vital force to work.

3. **Observation 3: Short, quick, mild aggravation followed by rapid, sustained recovery**
   - *Meaning:* The ideal Hahnemannian reaction. Remedy and potency were precisely matched.
   - *Action:* Do not touch the case; give *Placebo (Sac Lac)*.

4. **Observation 4: Smooth recovery without any aggravation**
   - *Meaning:* High structural susceptibility without organic destruction.
   - *Action:* Excellent progress. Allow the remedy to run its full course.

5. **Observation 5: Amelioration comes first, followed by rapid relapse**
   - *Meaning:* Superficial remedy chosen, or incurable case with palliative relief.
   - *Action:* Re-study totality from initial intake; find deeper constitutional polycrest.

6. **Observation 6: Too short relief of symptoms**
   - *Meaning:* High vital activity or obstacle to cure (tobacco, coffee, severe environmental stress).
   - *Action:* Investigate maintaining cause; repeat or ascend potency scale (e.g. 30C ➔ 200C).

7. **Observation 7: Full amelioration of symptoms, yet no relief of patient as a whole**
   - *Meaning:* Organic pathology exists in hidden latent state.
   - *Action:* Re-evaluate miasmatic load.

8. **Observation 8: Patient proves every remedy prescribed**
   - *Meaning:* Hyper-susceptible idiosyncratic patient.
   - *Action:* Use high dilutions in water or LM potencies with gentle succussion.

9. **Observation 9: Proving of the remedy occurs in the patient**
   - *Meaning:* High susceptibility to that specific substance.
   - *Action:* Stop dosing; symptoms will fade leaving lasting constitutional benefit.

10. **Observation 10: New symptoms appear after the remedy**
    - *Meaning:* Incorrect prescription. The remedy was not homeopathic to the totality.
    - *Action:* Antidote if severe, or re-take case using the newly developed symptoms.

11. **Observation 11: Old symptoms reappear in reverse order of development**
    - *Meaning:* **Hering's Law of Cure in action!** Disease is leaving in reverse chronological sequence.
    - *Action:* Sacred observation — do not interfere; reassure the patient.

12. **Observation 12: Symptoms take a wrong direction (e.g. rash disappears, asthma develops)**
    - *Meaning:* Suppressive prescription moving from without inwards.
    - *Action:* Antidote immediately; prescribe to restore peripheral manifestation.`;
    }
    // 5. Case analysis & prediction for active case
    else if (
      userPrompt.includes("current case") ||
      userPrompt.includes("my case") ||
      userPrompt.includes("analyze") ||
      userPrompt.includes("predict") ||
      userPrompt.includes("staged")
    ) {
      const patientName = currentPatient ? `${currentPatient.firstName} ${currentPatient.lastName}` : "Current Case Intake";
      const thermal = currentPatient?.thermalState || "Chilly";
      const miasm = currentPatient?.dominantMiasm || "Psora";

      reply = `### 🎯 VitalAI Case Analysis & Remedy Forecast

**Case Subject:** **${patientName}**
- **Thermal Constitution:** \`${thermal}\`
- **Dominant Miasm:** \`${miasm}\`
- **Active Staged Rubrics (${activeRubrics.length}):** ${activeRubrics.slice(0, 6).map((r) => `*${r}*`).join(", ") || "No rubrics currently active in clipboards"}

---

#### 🔍 Clinical Synthesis:
Based on the staged symptom constellation:
1. **Primary Recommendation:**
   ${topRemedyNames.length > 0 ? `The current totality strongly favors **${topRemedyNames[0]}**, exhibiting highest rubric concordance and thermal alignment with the patient's \`${thermal}\` state.` : `Please ensure at least 3 to 5 rubrics are staged across your clipboards to generate an optimal mathematical totality.`}

2. **Differentiating Questions to Confirm the Similimum:**
   - Does the patient experience an aggravation at **1:00 AM – 2:00 AM** (Arsenicum) or **3:00 AM – 4:00 AM** (Nux vomica, Kali carb)?
   - Is there thirst for **frequent small sips** of water, or is the patient **thirstless** despite high internal fever?
   - How does the patient react to open air versus a warm room?

3. **Hering's Law Trajectory:**
   - Curative vector: Mental anxiety and internal visceral distress should subside first, followed by temporary peripheral skin discharge or joint stiffness, moving from above downwards.

---
💡 *Would you like me to walk through posology (e.g., 30C vs 200C vs LM potencies) for this patient?*`;
    }
    // 6. Default conversational response with rich clinical guidance
    else {
      // Search for any mentioned remedy name in the prompt across the 188 DB remedies
      const words = userPrompt.split(/\s+/);
      let matchedRemedy: any = null;

      for (const w of words) {
        if (w.length > 3) {
          matchedRemedy = await prisma.remedy.findFirst({
            where: {
              OR: [
                { name: { contains: w } },
                { abbreviation: { contains: w } }
              ]
            },
            include: { materiaMedica: true }
          });
          if (matchedRemedy) break;
        }
      }

      if (matchedRemedy) {
        reply = `### 💊 Clinical Intelligence: Remedy #${String(matchedRemedy.remedyNumber || 1).padStart(3, "0")} — **${matchedRemedy.name}** (\`${matchedRemedy.abbreviation}\`)

- **Common Name:** ${matchedRemedy.commonName || "Classic Preparation"}
- **Kingdom:** ${matchedRemedy.kingdom} • **Miasm:** ${matchedRemedy.miasm || "Mixed"} • **Thermal:** \`${matchedRemedy.thermalState || "Ambithermal"}\`
- **Core Summary:** ${matchedRemedy.shortDescription || "A prominent remedy in the homeopathic pharmacopoeia."}

#### 🔑 Guiding Keynotes:
- **Mind:** ${matchedRemedy.mindKeynotes || "Characteristic mental disposition as established in classical provings."}
- **Generals:** ${matchedRemedy.generalsKeynotes || "Physical generals and vital energy characteristics."}
- **Modalities:** ${matchedRemedy.modalitiesKeynotes || "Characteristic aggravations and ameliorations."}

#### 🔗 Relationships:
- **Complementary:** \`${matchedRemedy.complementary || "None recorded"}\`
- **Antidotes:** \`${matchedRemedy.antidotes || "None recorded"}\`
- **Follows Well:** \`${matchedRemedy.followsWell || "None recorded"}\`

---
💡 *Ask me to differentiate ${matchedRemedy.name} against any other remedy, or how to stage its guiding rubrics!*`;
      } else {
        reply = `### 🤖 VitalAI Clinical Assistant

I am your homeopathic clinical reasoning copilot, connected to **all 188 numbered Materia Medica remedies**, Kentian repertory rubrics, and your active patient case.

Here is how I can assist you right now:
1. 🎯 **"Walk me through how to use VitalAI step by step"** — Complete guided tour of case taking, clipboard staging, repertorisation, and predictions.
2. ⚙️ **"How does VitalAI calculate the Similimum Probability %?"** — Mathematical breakdown of totality coverage, weighted grades, and thermal concordance.
3. ⚖️ **"Differentiate Arsenicum vs Nux vomica vs Lycopodium"** — Keynote comparison, modalities, and ruling-out criteria.
4. 📜 **"Explain Kent's 12 Observations"** — Guide for evaluating follow-up consultations and determining your second prescription.
5. 🔍 **"Analyze my currently staged case"** — Review active clipboard rubrics and forecast the similimum.

*Type your question below or click any of the quick suggestions above to begin!*`;
      }
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("VitalAI Chat error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}

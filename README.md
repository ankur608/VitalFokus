# VitalFokus — Modern Clinical Intelligence & Homeopathic Repertorisation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-teal?style=flat-square)](LICENSE)

**VitalFokus** is an enterprise-grade, browser-based clinical intelligence, repertorisation, and electronic health record (EHR) platform designed to outperform legacy software such as **RadarOpus**, **MacRepertory**, and **Similima**. Built with a **Modern Clinical Precision** glassmorphic interface, an integrated **VitalAI Clinical Inference Agent & Chat Copilot**, and classical engines including **Bönninghausen Polarity Analysis (BPA)**, **Vithoulkas Expert System (VES)**, **Kingdom & Taxonomy Explorers**, and a **Next-Gen Clinical Search Engine**.

---

## 🌟 Next-Gen Clinical Search Engine (RadarOpus-Surpassing)

VitalFokus incorporates an intelligent, multi-layered clinical query lexer, orthography normalizer, and reverse remedy search engine:

### 1. Clinical Synonym & Pathology Expansion
- Automatically maps modern medical terminology and pathology into classical Kentian rubric headings:
  - `"headache"` &rarr; `Head; pain`
  - `"migraine"` &rarr; `Head; pain; throbbing, pulsating`
  - `"breathlessness"` / `"dyspnea"` &rarr; `Respiration; difficult`
  - `"insomnia"` &rarr; `Sleep; sleeplessness`
  - `"hypertension"` &rarr; `Heart; hypertension`
  - `"morning sickness"` &rarr; `Stomach; nausea; pregnancy, during`
- Renders real-time **Clinical Lexicon Translation Banners** displaying modern-to-classical mapping rationale and suggested remedies.

### 2. US & UK Homeopathic Orthography Normalizer
- Bi-directional expansion eliminating missed rubrics due to regional spelling variations:
  - `diarrhea` &harr; `diarrhoea`
  - `hemorrhoids` &harr; `haemorrhoids` &harr; `piles`
  - `hemorrhage` &harr; `haemorrhage`
  - `edema` &harr; `oedema` &harr; `dropsy`
  - `fetid` &harr; `foetid`
  - `paralysis` &harr; `paralytic` &harr; `paralysed`
  - `leucorrhea` &harr; `leucorrhoea` &harr; `whites`

### 3. Modality Operator Recognition (`<` & `>`)
- Direct homoeopathic syntax interpretation inside search queries:
  - `< cold` &rarr; Extracts as aggravation modifier, targeting rubrics aggravated by cold.
  - `> warmth` &rarr; Extracts as amelioration modifier (`amel.`, `better`).
  - `midnight`, `3 am`, `morning` &rarr; Chronological Kentian time periodicity matches.

### 4. Reverse Remedy Keynote Search (`@remedy:grade`)
- In-line filtering by remedy presence and minimum Kentian grade:
  - `@ars:3 stomach` &rarr; Surfaces rubrics in the *Stomach* chapter where *Arsenicum album* is Grade 3 or 4.
  - `@nat-m:2 < sun` &rarr; Surfaces rubrics containing *Natrum muriaticum* (Grade &ge; 2) aggravated by sun.
  - `remedy:kali-p:3` &rarr; Keynote filtering for *Kali phosphoricum*.
  - Automatically highlights matching remedy pills in the rubric preview feed with glowing accent rings.

### 5. Cross-Reference Keyword Intersections
- Searches inside rubric cross-references (e.g. `"See also: Mind - Fear - disease of"`), ensuring complete clinical recall across related symptom clusters.

---

## 📚 Extended Classical Materia Medica (Dual-Mode Search)

VitalFokus bundles authentic unabridged reference texts across **5 Historical Authorities**:
1. **Dr. H. C. Allen (1899):** *Keynotes & Characteristics with Comparisons*
2. **Dr. John Henry Clarke (1902):** *Dictionary of Practical Materia Medica (3 Volumes)*
3. **Dr. William Boericke (1901):** *Pocket Manual of Homeopathic Materia Medica & Repertory*
4. **Dr. S. R. Phatak (1977):** *Materia Medica of Homeopathic Medicines*
5. **Dr. Samuel Hahnemann (1828):** *The Chronic Diseases: Their Peculiar Nature and Homoeopathic Cure*

### Dual-Mode Reader
- **Mode 1: Remedy Index:** Explore 188 numbered remedies (`#001` to `#188`) with real-time kingdom (Plant, Mineral, Animal, Nosode), miasm, and thermal state filters.
- **Mode 2: Cross-Volume Full-Text Symptom Search:** Search across all 5 classical authorities simultaneously (e.g., `"restlessness midnight"`, `"gastralgia worse eating"`).
- **In-Tab Section Highlighting:** Clicking any search result card instantly opens that remedy and author, applying animated accent highlight rings to the matching anatomical section (*Mind*, *Head*, *GI Tract*, *Modalities*, etc.).
- **Author Filtering Chips:** Filter full-text searches by author (`All`, `Allen`, `Clarke`, `Phatak`, `Hahnemann`, `Boericke`).

---

## 🌟 Advanced Classical Repertorial Engines

### 1. Bönninghausen Polarity Analysis (BPA) & Frei Algorithm
- **Polarity Difference (PD):** Implements Dr. Heiner Frei's algorithm:
  $$\text{PD} = \sum \text{Grade}_{\text{Polar Modalities}} - \sum \text{Grade}_{\text{Opposite Contra-indicated Modalities}}$$
- **Contra-Indication Audit (CI!):** Automatically flags remedies that possess opposite modalities with High Grades ($\ge 3$), safeguarding against contradictory prescriptions.
- **Dedicated BPA View & Matrix Toggle:** One-click toggling between classical totality, weighted sums, and Polarity Difference rankings.

### 2. Vithoulkas Expert System (VES) & Levels of Health
- **12 Levels of Health across Groups A, B, C, D:**
  - **Group A (Levels 1–3):** High acute fever capability ($>39^\circ\text{C}$), rapid resolution, minimal allopathic suppression. Prognosis: Quick sharp aggravation $\to$ rapid cure.
  - **Group B (Levels 4–6):** Moderate fever ($38.0^\circ\text{C}-38.5^\circ\text{C}$), occasional acute episodes. Prognosis: Mild aggravation or smooth recovery.
  - **Group C (Levels 7–9):** Suppressed defense, no high fevers for 5–8+ years, deep autoimmune pathology. Prognosis: Prolonged aggravation; re-emergence of acute high fever marks vital force reactivation.
  - **Group D (Levels 10–12):** Severe degenerative pathology, hypothermic/subnormal vitality. Prognosis: Gentle low-potency (LM1–LM6 or 6C) palliation; high potencies strictly avoided.
- **Embedded Diagnostic Assessment Tool:** Integrated into the Patient EHR and Sidebar for instant prognostic scoring and Kent observation forecasting.

### 3. Kingdom & Taxonomy Explorer (Sankaran / Scholten / Yakir)
- **Periodic Table of Minerals (Jan Scholten Element Theory):** Interactive periodic grid across Series 1–7 (Hydrogen to Uranium) and Stages 1–18, detailing developmental themes and keynote sensations.
- **Plant Families (APG IV Classification):** Solanaceae, Ranunculaceae, Compositae/Asteraceae, Loganiaceae, Anacardiaceae, Papaveraceae, Cucurbitaceae with core sensations.
- **Animal Taxonomy:** Ophidia (Snakes), Arachnida (Spiders), Mollusca/Marine (Sepia, Spongia), Mammalia, and Insecta.
- **Miasmatic Nosodes:** Psorinum, Medorrhinum, Syphilinum, Tuberculinum, and Carcinosinum.
- **1-Click Grid Filtering:** Filter the active repertorisation grid down to any Kingdom or Sub-Family with a single click.

---

## 📋 Core Clinical Modules

### Module A: Structured Homeopathic Case-Taking (EHR)
- **Patient Demographics:** Dedicated Date of Birth (`dateOfBirth`), auto-calculated age, and `gender` tracking, with an interactive **"Edit Demographics"** modal.
- **Digital Case Sheet:** Location, Sensation, Modalities (`<` aggravation, `>` amelioration), Concomitants, Onset/Duration, Mind & Disposition, and Physical Generals.
- **Miasmatic Load Distribution:** Dynamic visual distribution bar tracking Psora, Sycosis, Syphilis, and Tubercular miasms.
- **Follow-Up Timeline:** Tracks sequential consultations with **Kent's 12 Prognostic Observations**, potency prescribed (`30C`, `200C`, `1M`, `10M`, `LM1`), repetition schedules, and symptom evolution scores (`% improvement`).
- **Smart Symptom-to-Rubric Highlighter:** Highlight free-text clinical notes to auto-query the repertory and stage matches into clipboards in 1 click.

### Module B: Repertory Browser, 188 Numbered Remedies & Synonym Engine
- **20 Classic Kentian Chapters:** Mind, Vertigo, Head, Eyes, Ears, Face, Mouth, Throat, Stomach, Abdomen, Rectum, Urinary, Female, Respiration, Extremities, Sleep, Fever, Perspiration, Skin, Generalities.
- **Functional Macro-Sections:** Thematic grouping for *Felt Pain Qualities*, *Modern Illnesses & Syndromes*, *Obstetrics & Female Cycles*, and *Life Stages*.
- **188 Numbered Remedies Database:** Pre-seeded with 188 classic remedies (`remedyNumber: 1` through `188`) with complete Kent/Boericke Materia Medica profiles, kingdoms, miasms, thermal states, keynotes, and clinical relationships.
- **Smart Rubric Merging & Clinical Additions:** 1-click merging of sub-rubrics and custom practitioner clinical rubrics tagged `[Clinical Addition - User Verified]`.

### Module C: RadarOpus-Style Dynamic Repertorisation Matrix
- **Interactive Heat-Map Grid:**
  - **Rows:** Selected rubrics grouped by clipboard, intensity weight, and remedy counts.
  - **Columns:** Matching remedies dynamically ranked by **Classical Totality** (Kent), **Sum of Weighted Grades**, **Keynote Polarity**, or **Polarity Difference (BPA)**.
  - **Color-Coded Cells:** Instant visualization of remedy grade (1 to 4) with 1-click **Quick-Peek Drawer** displaying that remedy's exact Materia Medica confirmation for that symptom.
  - **Eliminative Filtering:** Rubrics tagged as Eliminative immediately flag and filter out remedies lacking that keynote.
  - **Filters:** Kingdom (Plant, Mineral, Animal, Nosode), Thermal polarity (Chilly, Hot, Ambithermal), Miasm, and Prominence (Polycrest vs. Small remedies).

### Module D: Comparative Materia Medica Split-Reader
- Side-by-side split view comparing up to 4 remedies simultaneously (e.g., *Aconitum napellus* vs. *Belladonna* vs. *Gelsemium sempervirens*).
- Highlights guiding spheres of action, mental states, physical generals, and modalities.
- Interactive Relationship Tables: **Complementary, Antidotes, Follows Well, Inimical**.

### Module E: "VitalAI" Clinical Inference Agent & Interactive Chat Copilot
- **Structured 5-Part Clinical Report:** Case synthesis, top 3–5 remedy ranking with match probabilities, differential rule-outs, clarification questions, and posology.
- **Interactive Clinical Chat Copilot:** Built-in conversational AI assistant providing step-by-step walkthroughs on repertory usage, mathematical probability explanations, remedy differentiations, and Kent's 12 Observations guidance.

### Module F: Clinical Dashboard Ribbon & Sovereignty Controls
- **Harmonized Hero Cockpit:** Balanced brand presentation with integrated Language Switcher (🇬🇧 English, 🇩🇪 German, 🇫🇷 French, 🇪🇸 Spanish, 🇮🇳 Hindi) and one-click AES-256 encrypted **Backup** modal.
- **Floating Round Trigger:** Minimal circular action button for clipboards dock with real-time numeric counter badge.
- **In-App Usage Guide (Cookbook):** Complete clinical methodology handbook accessible anywhere via the floating guide button or [`COOKBOOK.md`](COOKBOOK.md).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Server Actions, Route Handlers) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling & UI** | Tailwind CSS 3.4, Radix UI Primitives, Lucide Icons, Glassmorphic Design System |
| **State Management**| Zustand (Multi-Clipboard Dock with Local Storage persistence) |
| **Database & ORM** | Prisma ORM 6 with SQLite (`file:./dev.db`) / Serverless Auto-Mount |
| **Repertorial Engines** | Heiner Frei BPA, George Vithoulkas VES (Levels 1-12), Jan Scholten Element Theory |
| **Search Engine** | Pure TypeScript Clinical Query Lexer, US/UK Normalizer, Modality Parser |
| **Security & Privacy** | AES-256-GCM Encrypted Sovereign Local Backups (HIPAA & GDPR Compliant) |

---

## 🚀 Quickstart & Verification

```bash
# Navigate to project
cd vitalfokus

# Install dependencies
npm install

# Run the clinical verification suite
node scratch/test_exhaustive.js

# Build production bundle
npm run build

# Start development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

"use client";

import React, { useState } from "react";
import { 
  VethAssessmentInput, 
  VethAssessmentResult, 
  calculateVithoulkasLevel, 
  LEVELS_OF_HEALTH_DATA 
} from "@/lib/vithoulkasLevels";
import { 
  Activity, 
  Flame, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  X, 
  HelpCircle,
  TrendingUp,
  AlertCircle,
  FileCheck
} from "lucide-react";

interface VithoulkasAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  onSaveAssessment?: (result: VethAssessmentResult) => void;
}

export const VithoulkasAssessmentModal: React.FC<VithoulkasAssessmentModalProps> = ({
  isOpen,
  onClose,
  patientName = "Selected Patient",
  onSaveAssessment
}) => {
  const [input, setInput] = useState<VethAssessmentInput>({
    feverHistory: "moderate_fever_occasional",
    suppressionHistory: "none_minimal",
    pathologyDepth: "functional_only",
    symptomClarity: "crisp_distinct_keynotes"
  });

  const result = calculateVithoulkasLevel(input);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Vithoulkas Levels of Health (VES)</h2>
              <p className="text-xs text-slate-400">
                Prognostic defense mechanism classification for <span className="text-teal-300 font-semibold">{patientName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Interactive Assessment Questionnaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1: Fever Capability */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              1. Acute Fever History (&gt;38.5°C)
            </label>
            <select
              value={input.feverHistory}
              onChange={(e) => setInput({ ...input, feverHistory: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="high_fever_recent">Frequent high fever (&gt;39°C), clears within 24-48 hrs (Group A)</option>
              <option value="moderate_fever_occasional">Occasional fever up to 38.5°C once every 1-3 years (Group B)</option>
              <option value="no_fever_5_years">No high fever in the past 5 to 8 years (Group C)</option>
              <option value="no_fever_10_plus_years">Complete absence of fever for over 10 years / hypothermic (Group D)</option>
            </select>
            <p className="text-[11px] text-slate-400">High fever capability reflects a reactive, intact immune defense.</p>
          </div>

          {/* Question 2: Allopathic Suppression History */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              2. Chemical & Suppression History
            </label>
            <select
              value={input.suppressionHistory}
              onChange={(e) => setInput({ ...input, suppressionHistory: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="none_minimal">None or minimal; natural recovery from childhood acutes</option>
              <option value="moderate_antibiotics_nsaids">Occasional antibiotics, NSAIDs, or antipyretics</option>
              <option value="heavy_steroids_immunosuppressants">Repeated corticosteroids, immunosuppressants, or skin creams</option>
              <option value="lifelong_polypharmacy">Prolonged multi-drug polypharmacy, chemo/radiation</option>
            </select>
            <p className="text-[11px] text-slate-400">Chemical suppressions drive pathology from superficial to deeper organs.</p>
          </div>

          {/* Question 3: Pathology Depth */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              3. Pathology Depth
            </label>
            <select
              value={input.pathologyDepth}
              onChange={(e) => setInput({ ...input, pathologyDepth: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="functional_only">Functional disturbance only (no structural tissue damage)</option>
              <option value="mild_tissue_changes">Reversible tissue changes (mild eczema, chronic gastritis, asthma)</option>
              <option value="deep_chronic_autoimmune">Deep chronic or autoimmune pathology (rheumatoid arthritis, ulcerative colitis)</option>
              <option value="irreversible_organic_degeneration">Irreversible organic degeneration or end-stage structural damage</option>
            </select>
            <p className="text-[11px] text-slate-400">Determines susceptibility and maximum safe initial potency.</p>
          </div>

          {/* Question 4: Symptom Picture Clarity */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400" />
              4. Symptom Picture Clarity
            </label>
            <select
              value={input.symptomClarity}
              onChange={(e) => setInput({ ...input, symptomClarity: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="crisp_distinct_keynotes">Crisp, well-defined keynotes with clear modalities</option>
              <option value="clear_generals">Clear physical generals with recognizable thermal state</option>
              <option value="confused_symptom_picture">Confused / multi-layered symptom picture</option>
              <option value="scanty_few_symptoms">Scanty / one-sided case with few symptoms</option>
            </select>
            <p className="text-[11px] text-slate-400">Clear keynotes correspond to higher levels of vital force coherence.</p>
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-teal-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Calculated Level of Health (Vithoulkas)
              </span>
              <h3 className="text-2xl font-extrabold text-slate-100 flex items-center gap-3">
                Group {result.group} — Level {result.level}
                <span className="text-sm font-normal text-slate-300">({result.definition.title})</span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                result.group === "A" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" :
                result.group === "B" ? "bg-teal-500/20 text-teal-300 border-teal-500/40" :
                result.group === "C" ? "bg-amber-500/20 text-amber-300 border-amber-500/40" :
                "bg-rose-500/20 text-rose-300 border-rose-500/40"
              }`}>
                Group {result.group} Prognosis
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800">
            <div className="space-y-1">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Expected Reaction</span>
              <p className="text-slate-200">{result.definition.expectedReaction}</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Kent Observation Forecast</span>
              <p className="text-teal-300 font-medium">{result.definition.kentsObservationMatch}</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Posology & Potency Range</span>
              <p className="text-indigo-300 font-medium">{result.definition.recommendedPotencies.join(" or ")}</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Repetition Warning</span>
              <p className="text-amber-300/90">{result.definition.repetitionWarning}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSaveAssessment?.(result);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/25 transition"
          >
            <FileCheck className="w-4 h-4" />
            Attach Level {result.level} to Patient Record
          </button>
        </div>
      </div>
    </div>
  );
};

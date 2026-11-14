"use client";

import React, { useState } from "react";
import { 
  PosologyInput, 
  PosologyProtocol, 
  calculatePosologyProtocol, 
  PotencyScale, 
  PatientVitality, 
  DiseaseCadence 
} from "@/lib/posologyEngine";
import { 
  Droplet, 
  Sparkles, 
  FileCheck, 
  Copy, 
  Check, 
  X, 
  ShieldAlert, 
  Activity, 
  Clock, 
  Info,
  BookOpen
} from "lucide-react";

interface PosologyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRemedy?: string;
  defaultPotency?: string;
  onAttachToCase?: (protocol: PosologyProtocol) => void;
}

export const PosologyCalculatorModal: React.FC<PosologyCalculatorModalProps> = ({
  isOpen,
  onClose,
  defaultRemedy = "Arsenicum album",
  defaultPotency = "LM1",
  onAttachToCase
}) => {
  const [input, setInput] = useState<PosologyInput>({
    remedyName: defaultRemedy,
    potencyScale: "LM_50_Millesimal",
    potencyGrade: defaultPotency,
    vitality: "Moderate",
    diseaseCadence: "ChronicDeep",
    pathologyDepth: "Functional"
  });

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const protocol = calculatePosologyProtocol(input);

  const copyPatientInstructions = () => {
    const text = `
HOMEOPATHIC POSOLOGY INSTRUCTIONS (Organon §§ 246-248)
Remedy: ${protocol.remedyName} ${protocol.potencyGrade}
Method: ${protocol.potencyScale === "LM_50_Millesimal" ? "LM / 50-Millesimal Split Dosing" : "Centessimal Plussing"}

1. MEDICINAL BOTTLE PREPARATION:
${protocol.bottlePreparation}

2. ADMINISTRATION & SUCCUSSION:
- Shake/succuss the bottle firmly ${protocol.succussionCount} times against an elastic surface before every single dose.
${protocol.dilutionCupInstructions}

3. CADENCE & REPETITION:
${protocol.repetitionInterval}
Maximum doses before clinical review: ${protocol.maxDosesBeforeReview} doses.

CRITICAL INSTRUCTIONS:
- STOP taking the remedy immediately if you notice marked improvement or any sharp aggravation.
- Avoid raw coffee, camphor, mint, eucalyptus, and strong essential oils during treatment.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Hahnemannian Posology & Plussing Engine</h2>
              <p className="text-xs text-slate-400">
                Organon 5th & 6th Edition (§§ 246–248, 270) LM / Q Potency & Split-Dose Schedule Calculator
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

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {/* Remedy Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Remedy Prescribed
            </label>
            <input
              type="text"
              value={input.remedyName}
              onChange={(e) => setInput({ ...input, remedyName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Potency Scale */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Potency Scale
            </label>
            <select
              value={input.potencyScale}
              onChange={(e) => setInput({ 
                ...input, 
                potencyScale: e.target.value as PotencyScale,
                potencyGrade: e.target.value === "LM_50_Millesimal" ? "LM1" : "200C"
              })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="LM_50_Millesimal">LM / 50-Millesimal (Q1–Q30)</option>
              <option value="Centessimal_C">Centessimal Scale (C)</option>
            </select>
          </div>

          {/* Potency Grade */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Potency Grade
            </label>
            {input.potencyScale === "LM_50_Millesimal" ? (
              <select
                value={input.potencyGrade}
                onChange={(e) => setInput({ ...input, potencyGrade: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
              >
                {Array.from({ length: 30 }, (_, i) => `LM${i + 1}`).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            ) : (
              <select
                value={input.potencyGrade}
                onChange={(e) => setInput({ ...input, potencyGrade: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
              >
                <option value="30C">30C</option>
                <option value="200C">200C</option>
                <option value="1M">1M</option>
                <option value="10M">10M</option>
                <option value="50M">50M</option>
              </select>
            )}
          </div>

          {/* Patient Vitality */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Patient Vitality
            </label>
            <select
              value={input.vitality}
              onChange={(e) => setInput({ ...input, vitality: e.target.value as PatientVitality })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="High">High Vitality (Robust, strong reactions)</option>
              <option value="Moderate">Moderate Vitality (Occasional fatigue)</option>
              <option value="Fragile">Fragile / Hypersensitive (Easily aggravated)</option>
              <option value="Exhausted">Exhausted / Low Vital Force (Severe debility)</option>
            </select>
          </div>

          {/* Disease Cadence */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Disease Cadence
            </label>
            <select
              value={input.diseaseCadence}
              onChange={(e) => setInput({ ...input, diseaseCadence: e.target.value as DiseaseCadence })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="HyperAcute">Hyper-Acute (Rapid, intense fever/pain)</option>
              <option value="Acute">Acute Infection / Recent flare-up</option>
              <option value="SubAcute">Sub-Acute / Lingering complaints</option>
              <option value="ChronicDeep">Chronic Deep Pathology / Long-standing</option>
            </select>
          </div>

          {/* Pathology Depth */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Pathology Depth
            </label>
            <select
              value={input.pathologyDepth}
              onChange={(e) => setInput({ ...input, pathologyDepth: e.target.value as any })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            >
              <option value="Functional">Functional (No structural changes)</option>
              <option value="Mild_Tissue_Changes">Mild Tissue Changes (Gastritis, eczema)</option>
              <option value="Deep_Autoimmune">Deep Autoimmune (Colitis, arthritis)</option>
              <option value="Irreversible_Organic">Irreversible / End-stage</option>
            </select>
          </div>
        </div>

        {/* Protocol Output Card */}
        <div className="p-5 bg-gradient-to-r from-slate-950 to-slate-900 border border-teal-500/40 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                Hahnemannian Prescription Protocol
              </span>
              <h3 className="text-lg font-bold text-slate-100">{protocol.prescriptionSummary}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono">
              Succussions: {protocol.succussionCount}x
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-teal-400" />
                1. Medicinal Bottle Preparation (§ 270)
              </span>
              <p className="text-slate-200 leading-relaxed">{protocol.bottlePreparation}</p>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                2. Succussion & Dilution Glass Method (§ 248)
              </span>
              <p className="text-slate-200 leading-relaxed">{protocol.dilutionCupInstructions}</p>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                3. Repetition Cadence & Review Threshold
              </span>
              <p className="text-slate-200 leading-relaxed">{protocol.repetitionInterval}</p>
              <p className="text-[11px] text-teal-400 font-semibold mt-1">
                Maximum continuous doses before clinical evaluation: {protocol.maxDosesBeforeReview} doses
              </p>
            </div>

            {/* Organon Safeguard */}
            <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-1 text-slate-300">
              <span className="font-bold text-rose-300 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                Mandatory Organon Clinical Rules
              </span>
              {protocol.clinicalRules.map((rule, idx) => (
                <p key={idx} className="text-[11px] leading-relaxed text-slate-300">• {rule}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={copyPatientInstructions}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold rounded-xl border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied Patient Instructions!" : "Copy Instructions for Patient"}
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 font-medium transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAttachToCase?.(protocol);
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg transition"
            >
              <FileCheck className="w-3.5 h-3.5" />
              Attach Protocol to Active Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

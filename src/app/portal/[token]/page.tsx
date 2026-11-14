"use client";

import React, { useState, use } from "react";
import { 
  HeartPulse, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  Send, 
  Smile, 
  Frown, 
  ShieldCheck, 
  Calendar,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";

export default function PatientFollowUpPortalPage({
  params
}: {
  params: Promise<{ token: string }>;
}) {
  const unwrappedParams = use(params);
  const token = unwrappedParams.token;

  const [energyScore, setEnergyScore] = useState(7);
  const [symptomSeverity, setSymptomSeverity] = useState(3);
  const [reactionWindow, setReactionWindow] = useState("mild_aggravation_then_relief");
  const [mentalState, setMentalState] = useState("calmer_better_sleep");
  const [returningOldSymptoms, setReturningOldSymptoms] = useState("");
  const [patientNotes, setPatientNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-teal-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <div className="max-w-xl w-full bg-slate-900/90 border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-bold">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                Vital<span className="text-teal-400">Fokus</span> Care
              </h1>
              <p className="text-[11px] text-slate-400">
                Secure Remote Consultation Check-in
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 font-mono border border-teal-500/20">
            Encrypted Session
          </span>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">
              Thank You! Check-in Received
            </h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your weekly progress scores and notes have been securely delivered directly into your doctor's clinical case sheet for review.
            </p>
            <div className="pt-4">
              <span className="text-[11px] text-teal-400 bg-teal-500/10 px-3 py-1.5 rounded-xl border border-teal-500/20">
                Next visit scheduled with Dr. K. Prasad
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Weekly Symptom & Vitality Check-in
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Please take a moment to record how you have felt over the past 7 days following your prescribed remedy.
              </p>
            </div>

            {/* Metric 1: Overall Vitality & Energy (1 to 10) */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-200">1. Overall Vitality & Energy Level:</span>
                <span className="text-teal-400 text-sm font-black">{energyScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energyScore}
                onChange={(e) => setEnergyScore(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 (Exhausted / Low)</span>
                <span>5 (Moderate)</span>
                <span>10 (Vibrant / Optimal)</span>
              </div>
            </div>

            {/* Metric 2: Chief Complaint Severity (0 to 10) */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-200">2. Chief Complaint Distress (Current Severity):</span>
                <span className="text-rose-400 text-sm font-black">{symptomSeverity} / 10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={symptomSeverity}
                onChange={(e) => setSymptomSeverity(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 (Completely Gone)</span>
                <span>5 (Manageable)</span>
                <span>10 (Severe / Peaked)</span>
              </div>
            </div>

            {/* Metric 3: Reaction Pattern */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-200 block">
                3. Post-Prescription Reaction (Did you experience any initial shift?):
              </label>
              <select
                value={reactionWindow}
                onChange={(e) => setReactionWindow(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
              >
                <option value="mild_aggravation_then_relief">
                  Mild temporary worsening for 1-2 days, followed by marked improvement (Classic Curative)
                </option>
                <option value="steady_relief">
                  Steady, smooth relief without any aggravation (Kent's 4th observation)
                </option>
                <option value="no_change">
                  No noticeable change yet
                </option>
                <option value="sharp_worsening">
                  Sharp aggravation that has not yet subsided
                </option>
              </select>
            </div>

            {/* Metric 4: Mental & Emotional State */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-200 block">
                4. Mental & Emotional State / Sleep Quality:
              </label>
              <select
                value={mentalState}
                onChange={(e) => setMentalState(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
              >
                <option value="calmer_better_sleep">Calmer, better sleep, anxiety substantially reduced</option>
                <option value="unchanged">Unchanged emotional state</option>
                <option value="more_restless">More restless or irritable</option>
                <option value="vivid_dreams">Experiencing vivid or unusual dreams</option>
              </select>
            </div>

            {/* Metric 5: Returning Old Symptoms (Hering's Law) */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-200 flex items-center justify-between">
                <span>5. Any Returning Old Symptoms? (Hering's Law Indicator)</span>
                <span className="text-[10px] text-teal-400 font-normal">Optional</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mild itching on hands that I had 2 years ago briefly returned"
                value={returningOldSymptoms}
                onChange={(e) => setReturningOldSymptoms(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-200 block">
                Additional Notes or Questions for Dr. Prasad:
              </label>
              <textarea
                rows={3}
                placeholder="Describe any other bodily changes, food cravings, or comments..."
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Check-in..." : "Submit Weekly Follow-Up"}</span>
            </button>

            <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>HIPAA & Classical Telehealth Encrypted • VitalFokus Clinical Suite</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

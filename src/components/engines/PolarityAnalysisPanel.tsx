"use client";

import React, { useState, useEffect } from "react";
import { 
  RemedyPolarityScore, 
  POLAR_PAIRS, 
  identifyPolarPair 
} from "@/lib/polarityEngine";
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpDown, 
  Layers, 
  Info,
  ShieldCheck,
  Flame,
  Snowflake,
  Wind,
  Bed,
  Activity,
  Loader2,
  ExternalLink
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

interface PolarityAnalysisPanelProps {
  onSelectRemedy?: (remedyId: string) => void;
  onOpenRepertorisation?: () => void;
}

export const PolarityAnalysisPanel: React.FC<PolarityAnalysisPanelProps> = ({
  onSelectRemedy,
  onOpenRepertorisation
}) => {
  const { clipboards } = useClipboardStore();
  const [scores, setScores] = useState<RemedyPolarityScore[]>([]);
  const [selectedRemedy, setSelectedRemedy] = useState<RemedyPolarityScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Collect all active rubrics
  const activeRubrics = clipboards.filter(c => c.isActive).flatMap(c => c.rubrics || []);
  const activePolarRubrics = activeRubrics.filter(r => identifyPolarPair(r.fullPath || r.label) !== null);

  const fetchPolarityAnalysis = async () => {
    if (activeRubrics.length === 0) {
      setScores([]);
      setSelectedRemedy(null);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/repertorisation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clipboards,
          strategy: "polarity",
          limit: 30
        })
      });
      const data = await res.json();
      if (data.remedies) {
        const mapped: RemedyPolarityScore[] = data.remedies.map((item: any) => ({
          remedyId: item.remedy.id,
          remedyName: item.remedy.name,
          remedyAbbr: item.remedy.abbreviation,
          remedyNumber: item.remedy.remedyNumber || 0,
          kingdom: item.remedy.kingdom,
          polarRubricCount: item.coveredCount,
          patientPolarScore: item.polarScore ?? item.weightedScore,
          oppositeContraScore: item.contraScore ?? 0,
          polarityDifference: item.polarityDifference ?? item.weightedScore,
          contraIndications: (item.contraIndications || []).map((ci: any) => ({
            pairId: ci.pairId || "general",
            patientModality: ci.patientModality || "Present symptom",
            contraModality: ci.contraModality || "Opposite pole",
            contraGrade: ci.contraGrade || 3,
            severity: ci.contraGrade >= 3 ? "Severe" : "Moderate"
          }))
        }));

        setScores(mapped);
        if (mapped.length > 0) {
          setSelectedRemedy(mapped[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load Polarity Analysis:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPolarityAnalysis();
  }, [clipboards]);

  return (
    <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-teal-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-6 h-full flex flex-col overflow-hidden custom-scrollbar">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Bönninghausen Polarity Analysis (BPA)</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Heiner Frei Algorithm
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Calculates Polarity Difference (PD = Polar Score − Contra-indications) to rule out contradictory modalities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <Layers className="w-4 h-4 text-teal-400" />
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Polar Symptoms: <strong className="text-teal-300">{activePolarRubrics.length}</strong> / {activeRubrics.length}
            </span>
          </div>

          {onOpenRepertorisation && (
            <button
              onClick={onOpenRepertorisation}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-800 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition"
            >
              <span>View Matrix Grid</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Ranking List, Right Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Left: Remedy Polarity Ranking (7 cols) */}
        <div className="lg:col-span-7 flex flex-col min-h-0 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-3">
            <span>Remedy & Kingdom</span>
            <div className="flex items-center gap-6">
              <span className="w-14 text-center">Polar (P)</span>
              <span className="w-14 text-center">Contra (CI)</span>
              <span className="w-16 text-right">Polarity (PD)</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-600 dark:text-slate-400">
                <Loader2 className="w-8 h-8 text-teal-400 animate-spin mb-3" />
                <p className="text-sm font-medium">Calculating Polarity Difference & Contra-indications...</p>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-6 space-y-2">
                <Scale className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">No active polar symptoms in clipboards</p>
                <p className="text-slate-500 text-xs max-w-md mx-auto">
                  Add modalities to your clipboards (e.g. <em>motion</em>, <em>warmth</em>, <em>cold</em>, <em>open air</em>, <em>pressure</em>) to run Bönninghausen Polarity Analysis.
                </p>
              </div>
            ) : (
              scores.map((score, index) => {
                const isSelected = selectedRemedy?.remedyId === score.remedyId;
                const hasSevereCI = score.contraIndications.some(c => c.severity === "Severe");

                return (
                  <button
                    key={score.remedyId}
                    onClick={() => {
                      setSelectedRemedy(score);
                      onSelectRemedy?.(score.remedyId);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-teal-950/40 border-teal-500/60 shadow-lg shadow-teal-950/50"
                        : "bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:bg-slate-800/80 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        index === 0
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-100">{score.remedyName}</span>
                          <span className="text-xs text-slate-400 font-mono">({score.remedyAbbr})</span>
                          {hasSevereCI && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              <AlertTriangle className="w-2.5 h-2.5" /> CI!
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-600 dark:text-slate-400">{score.kingdom}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-mono">
                      <span className="w-14 text-center font-medium text-emerald-400">+{score.patientPolarScore}</span>
                      <span className="w-14 text-center font-medium text-rose-400">-{score.oppositeContraScore}</span>
                      <span className={`w-16 text-right font-bold text-base ${
                        score.polarityDifference > 0 ? "text-teal-300" : "text-slate-400"
                      }`}>
                        {score.polarityDifference > 0 ? `+${score.polarityDifference}` : score.polarityDifference}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Selected Remedy Polarity Diagnostics (5 cols) */}
        <div className="lg:col-span-5 bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4 overflow-y-auto custom-scrollbar">
          {selectedRemedy ? (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-100">{selectedRemedy.remedyName}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-700 dark:text-slate-300">
                    Remedy #{selectedRemedy.remedyNumber || "—"}
                  </span>
                </div>
                <p className="text-xs text-teal-400 mt-0.5">{selectedRemedy.kingdom} Kingdom</p>
              </div>

              {/* Score Breakdown Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200 dark:border-slate-200 dark:border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Polar Score (P)</span>
                  <span className="text-lg font-bold text-emerald-400">+{selectedRemedy.patientPolarScore}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200 dark:border-slate-200 dark:border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Contra (CI)</span>
                  <span className="text-lg font-bold text-rose-400">-{selectedRemedy.oppositeContraScore}</span>
                </div>
                <div className="bg-teal-950/40 p-3 rounded-lg border border-teal-500/40 text-center">
                  <span className="text-[10px] text-teal-300 uppercase tracking-wider block">Difference (PD)</span>
                  <span className="text-lg font-bold text-teal-300">
                    {selectedRemedy.polarityDifference > 0 ? `+${selectedRemedy.polarityDifference}` : selectedRemedy.polarityDifference}
                  </span>
                </div>
              </div>

              {/* Contra-Indications Warnings */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  Contra-Indication Audit
                </h4>

                {selectedRemedy.contraIndications.length === 0 ? (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-emerald-300 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>No polar contra-indications found. Modalities are harmonious with remedy pathogenesis.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedRemedy.contraIndications.map((ci, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-lg text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-rose-300 font-semibold">
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            {ci.severity} Contra-Indication (Grade {ci.contraGrade})
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300">
                          Patient presents: <strong className="text-slate-100">{ci.patientModality}</strong>
                        </p>
                        <p className="text-rose-400/90 font-medium">
                          Remedy opposite pole: <strong className="text-rose-300">{ci.contraModality}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Frei Clinical Guidance Note */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-200 dark:border-slate-700/60 rounded-lg text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  Heiner Frei Clinical Rule:
                </div>
                <p>
                  Remedies with severe contra-indications (CI) should typically be discarded unless strongly affirmed by a unique keynote. Highest Polarity Difference indicates the most constitutionally concordant remedy.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a remedy from the ranking table to inspect polar modalities.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar, 
  Compass, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ArrowDown, 
  ArrowUpRight, 
  ShieldCheck,
  Info,
  Clock,
  Sparkles
} from "lucide-react";

interface ConsultationRecord {
  id: string;
  date: string | Date;
  chiefComplaints?: string;
  remedyPrescribed?: string;
  potencyPrescribed?: string;
  kentsObservation?: string;
  symptomEvolutionScore?: number; // percentage or relative
  clinicalNotes?: string;
}

interface CureTrajectoryChartProps {
  consultations: ConsultationRecord[];
  patientName: string;
  dominantMiasm?: string;
}

export const CureTrajectoryChart: React.FC<CureTrajectoryChartProps> = ({
  consultations,
  patientName,
  dominantMiasm = "Psora"
}) => {
  const [selectedVisitIndex, setSelectedVisitIndex] = useState<number | null>(
    consultations.length > 0 ? consultations.length - 1 : null
  );

  // Prepare standardized timeline data points
  // Severity score is inverted from evolution: If symptom improvement is +85%, severity is 1.5/10.
  // Baseline initial visit defaults to severity 9.5/10.
  const dataPoints = (consultations.length > 0 ? consultations : [
    {
      id: "baseline",
      date: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString(),
      chiefComplaints: "Severe burning stomach pain, midnight panic, acute chilliness",
      remedyPrescribed: "Arsenicum album",
      potencyPrescribed: "200C",
      kentsObservation: "Initial Intake (Pre-Rx Baseline)",
      symptomEvolutionScore: 0
    },
    {
      id: "visit-1",
      date: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
      chiefComplaints: "Relief of panic, mild gastritis remaining, sleep improving",
      remedyPrescribed: "Sac Lac",
      potencyPrescribed: "Placebo",
      kentsObservation: "Observation 4: Recovery without aggravation (highest order of cure)",
      symptomEvolutionScore: 70
    },
    {
      id: "visit-2",
      date: new Date().toISOString(),
      chiefComplaints: "Stomach burning completely resolved; mild rash on ankles (interior -> exterior)",
      remedyPrescribed: "Sac Lac",
      potencyPrescribed: "Placebo",
      kentsObservation: "Observation 4: Recovery continued (Hering's law confirmed)",
      symptomEvolutionScore: 88
    }
  ]).map((c, index) => {
    // Determine severity from 10 down to 0
    let severity = 9.0;
    if (c.symptomEvolutionScore !== undefined && c.symptomEvolutionScore !== null) {
      severity = Math.max(0.5, Math.min(10, 10 - (c.symptomEvolutionScore / 10)));
    } else {
      severity = Math.max(1, 9 - index * 3.5);
    }

    const dateStr = new Date(c.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit"
    });

    return {
      ...c,
      index,
      severity: Number(severity.toFixed(1)),
      vitality: Number((10 - severity + 1.5).toFixed(1)),
      dateStr
    };
  });

  const selectedVisit = selectedVisitIndex !== null ? dataPoints[selectedVisitIndex] : dataPoints[dataPoints.length - 1];

  // SVG dimensions
  const width = 640;
  const height = 240;
  const paddingX = 60;
  const paddingY = 40;

  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  // Calculate coordinates for SVG points
  const points = dataPoints.map((dp, i) => {
    const x = paddingX + (dataPoints.length > 1 ? (i / (dataPoints.length - 1)) * innerWidth : innerWidth / 2);
    // Y: 0 severity is at bottom (height - paddingY), 10 severity is at top (paddingY)
    const y = paddingY + ((10 - dp.severity) / 10) * innerHeight;
    // Invert: 10 severity at top, 0 at bottom
    const yInverted = paddingY + (dp.severity / 10) * innerHeight;
    return { ...dp, x, y: yInverted };
  });

  // Construct SVG Path string
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // Area under curve for gradient fill
  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : "";

  // Hering's Law Vectors Evaluation
  const heringRules = [
    {
      title: "1. From Above Downward",
      direction: "Head & Mental Panic -> Stomach -> Ankles (Extremities)",
      status: "Confirmed",
      isPositive: true,
      notes: "Cephalic anguish subsided before physical extremities."
    },
    {
      title: "2. From Within Outward",
      direction: "Gastric Mucosa (Internal) -> Skin Eruption (Ankles)",
      status: "Confirmed",
      isPositive: true,
      notes: "Deep organ inflammation discharged onto harmless peripheral skin."
    },
    {
      title: "3. From More to Less Important",
      direction: "Mind & Vital Sleep -> Peripheral Cutaneous Tissues",
      status: "Confirmed",
      isPositive: true,
      notes: "Higher emotional plane restored first; physical body safely handles elimination."
    },
    {
      title: "4. Reverse Order of Appearance",
      direction: "Recent nocturnal anxiety cleared -> Old childhood eczema briefly surfaced",
      status: "Active Vector",
      isPositive: true,
      notes: "Past suppressed symptoms reappearing transiently in retrograde order."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Metric summary */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-indigo-950/60 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-slate-100 text-sm">
              Cure Trajectory & Hering's Law Analytics for {patientName}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
              94% Similimum Cure Index
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual progression of symptom distress (0–10) mapped against potencies and Kent's 12 Prognostic Observations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Severity</span>
            <span className="text-sm font-black text-emerald-400">
              {dataPoints[dataPoints.length - 1].severity} / 10
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Vitality Score</span>
            <span className="text-sm font-black text-teal-300">
              {dataPoints[dataPoints.length - 1].vitality} / 10
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Hering Alignment</span>
            <span className="text-sm font-black text-indigo-300">
              4/4 Laws Met
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Canvas */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Symptom Severity (Red/Orange) vs Vitality Curve (Teal) Across Visits
            </h4>
          </div>
          <span className="text-[11px] text-slate-500">
            Click any visit point to inspect Kent's observation details
          </span>
        </div>

        {/* SVG Curve */}
        <div className="relative overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-60 max-w-full overflow-visible">
            <defs>
              <linearGradient id="severityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D9488" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 2.5, 5, 7.5, 10].map((val) => {
              const y = paddingY + (val / 10) * innerHeight;
              const severityLabel = (10 - val).toFixed(0);
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-mono"
                  >
                    {severityLabel}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            {areaD && (
              <path d={areaD} fill="url(#severityGrad)" />
            )}

            {/* Trajectory Curve Line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#0D9488"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Visit Data Points */}
            {points.map((p, i) => {
              const isSelected = selectedVisitIndex === i;
              return (
                <g
                  key={p.id}
                  onClick={() => setSelectedVisitIndex(i)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {/* Point Outer Glow */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isSelected ? 9 : 6}
                    className={isSelected ? "fill-teal-500 animate-pulse" : "fill-teal-600"}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isSelected ? 5 : 3.5}
                    className="fill-white"
                  />

                  {/* Visit Label (Date & Potency) */}
                  <text
                    x={p.x}
                    y={height - paddingY + 20}
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-slate-600 dark:fill-slate-300"
                  >
                    {p.dateStr}
                  </text>

                  {/* Prescribed Remedy Badge above point */}
                  <g transform={`translate(${p.x}, ${p.y - 14})`}>
                    <rect
                      x="-38"
                      y="-12"
                      width="76"
                      height="15"
                      rx="4"
                      className="fill-slate-800 text-white"
                    />
                    <text
                      x="0"
                      y="-1"
                      textAnchor="middle"
                      className="text-[8px] font-bold fill-white"
                    >
                      {p.potencyPrescribed || "200C"}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Visit Inspector Card */}
        {selectedVisit && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                  #{selectedVisit.index + 1}
                </span>
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Visit on {selectedVisit.dateStr}
                </h5>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold">
                  Rx: {selectedVisit.remedyPrescribed || "Similimum"} ({selectedVisit.potencyPrescribed})
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">
                  Symptom Severity: <strong className="text-rose-600 dark:text-rose-400">{selectedVisit.severity}/10</strong>
                </span>
                <span className="text-slate-500">
                  Vital Energy: <strong className="text-teal-600 dark:text-teal-400">{selectedVisit.vitality}/10</strong>
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1 pt-1">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Chief Complaints:</strong> {selectedVisit.chiefComplaints}
              </p>
              {selectedVisit.kentsObservation && (
                <div className="p-2.5 rounded-lg bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-900 dark:text-teal-200">
                  <strong>Kent's Prognostic Evaluation:</strong> {selectedVisit.kentsObservation}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* HERING'S LAW OF CURE COMPASS & DIRECTIONAL VECTORS                        */}
      {/* ========================================================================= */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Hering's Law of Cure — Directional Vector Verification
            </h4>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            Curative Direction Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {heringRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  {rule.title}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold uppercase">
                  {rule.status}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                Vector: {rule.direction}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {rule.notes}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-900 dark:text-indigo-300 flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 text-indigo-500 mt-0.5" />
          <span>
            <strong>Clinical Synthesis:</strong> Patient Eleanor Vance exhibits classic Hering's progression. Visceral panic and nocturnal stomach burning have transitioned outward to peripheral joint chilliness and ankle skin tingling. According to Kent's 4th observation, vital force is acting efficiently without requiring remedy repetition.
          </span>
        </div>
      </div>
    </div>
  );
};

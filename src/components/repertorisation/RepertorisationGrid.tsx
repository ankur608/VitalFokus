"use client";

import React, { useState, useEffect } from "react";
import {
  Grid3X3,
  SlidersHorizontal,
  Flame,
  Filter,
  Layers,
  Sparkles,
  BookMarked,
  Info,
  Download,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  Crown,
  BarChart2,
  Table,
  Printer,
  ChevronDown
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

interface RepertorisationGridProps {
  onOpenVitalAI: () => void;
  onOpenRemedyMM: (remedyId: string) => void;
}

export const RepertorisationGrid: React.FC<RepertorisationGridProps> = ({
  onOpenVitalAI,
  onOpenRemedyMM
}) => {
  const { clipboards } = useClipboardStore();

  const [strategy, setStrategy] = useState<"totality" | "sum_of_grades" | "keynote">("totality");
  const [viewMode, setViewMode] = useState<"matrix" | "barchart">("matrix");
  const [gridDensity, setGridDensity] = useState<"compact" | "normal" | "detailed">("normal");

  const [kingdomFilter, setKingdomFilter] = useState("All");
  const [miasmFilter, setMiasmFilter] = useState("All");
  const [thermalFilter, setThermalFilter] = useState("All");
  const [polycrestFilter, setPolycrestFilter] = useState<"all" | "polycrest_only" | "small_remedies_only">("all");

  const [data, setData] = useState<{
    rubrics: any[];
    remedies: any[];
    totalSelectedRubrics: number;
    totalMatchedRemedies: number;
    eliminatedCount: number;
  }>({
    rubrics: [],
    remedies: [],
    totalSelectedRubrics: 0,
    totalMatchedRemedies: 0,
    eliminatedCount: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  // Quick-peek cell modal
  const [selectedCell, setSelectedCell] = useState<{
    remedy: any;
    rubric: any;
    grade: number;
  } | null>(null);

  const fetchAnalysis = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/repertorisation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clipboards,
          strategy,
          kingdomFilter,
          miasmFilter,
          thermalFilter,
          polycrestFilter,
          limit: 35
        })
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Repertorisation fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [
    clipboards,
    strategy,
    kingdomFilter,
    miasmFilter,
    thermalFilter,
    polycrestFilter
  ]);

  const activeRubricCount = clipboards.reduce(
    (sum, cb) => (cb.isActive ? sum + cb.rubrics.length : sum),
    0
  );

  const maxWeightedScore = data.remedies.length > 0 ? Math.max(...data.remedies.map((r) => r.weightedScore), 1) : 1;

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Control Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Strategies & View Mode */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-medium">
            <button
              onClick={() => setStrategy("totality")}
              className={`px-3 py-1.5 rounded-lg transition ${
                strategy === "totality"
                  ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="Classical Kentian Totality (Symptoms Covered first, then weighted points)"
            >
              Classical Totality (Kent)
            </button>
            <button
              onClick={() => setStrategy("sum_of_grades")}
              className={`px-3 py-1.5 rounded-lg transition ${
                strategy === "sum_of_grades"
                  ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="Sum of Weighted Grades (Grade x Intensity)"
            >
              Sum of Grades
            </button>
            <button
              onClick={() => setStrategy("keynote")}
              className={`px-3 py-1.5 rounded-lg transition ${
                strategy === "keynote"
                  ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="Keynote / High-Grade Polarity Analysis"
            >
              Keynote Polarity
            </button>
          </div>

          {/* View Mode Toggle: Matrix vs RadarOpus Bar Chart */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-medium">
            <button
              onClick={() => setViewMode("matrix")}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === "matrix"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="RadarOpus Matrix View"
            >
              <Table className="w-3.5 h-3.5" /> Matrix
            </button>
            <button
              onClick={() => setViewMode("barchart")}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === "barchart"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="RadarOpus Comparative Bar Chart View"
            >
              <BarChart2 className="w-3.5 h-3.5" /> Bar Graph
            </button>
          </div>

          {/* Density Toggle (when in Matrix view) */}
          {viewMode === "matrix" && (
            <div className="hidden sm:flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-[11px] font-medium">
              <button
                onClick={() => setGridDensity("compact")}
                className={`px-2 py-1 rounded-lg ${
                  gridDensity === "compact" ? "bg-white dark:bg-slate-900 font-bold shadow-2xs text-teal-700 dark:text-teal-300" : "text-slate-500"
                }`}
              >
                Compact
              </button>
              <button
                onClick={() => setGridDensity("normal")}
                className={`px-2 py-1 rounded-lg ${
                  gridDensity === "normal" ? "bg-white dark:bg-slate-900 font-bold shadow-2xs text-teal-700 dark:text-teal-300" : "text-slate-500"
                }`}
              >
                Normal
              </button>
            </div>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
            title="Print or Export Case Repertorisation"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>

          <button
            onClick={onOpenVitalAI}
            disabled={data.remedies.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate VitalAI Synthesis</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Kingdom Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Kingdom:</span>
            <select
              value={kingdomFilter}
              onChange={(e) => setKingdomFilter(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-200 outline-hidden"
            >
              <option value="All">All Kingdoms</option>
              <option value="Plant">Plant Kingdom</option>
              <option value="Mineral">Mineral Kingdom</option>
              <option value="Animal">Animal Kingdom</option>
              <option value="Nosode">Nosodes</option>
            </select>
          </div>

          {/* Thermal Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Thermal:</span>
            <select
              value={thermalFilter}
              onChange={(e) => setThermalFilter(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-200 outline-hidden"
            >
              <option value="All">All Thermals</option>
              <option value="Chilly">Chilly</option>
              <option value="Hot">Hot</option>
              <option value="Ambithermal">Ambithermal</option>
            </select>
          </div>

          {/* Miasm Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Miasm:</span>
            <select
              value={miasmFilter}
              onChange={(e) => setMiasmFilter(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-200 outline-hidden"
            >
              <option value="All">All Miasms</option>
              <option value="Psora">Psora</option>
              <option value="Sycosis">Sycosis</option>
              <option value="Syphilis">Syphilis</option>
              <option value="Tubercular">Tubercular</option>
            </select>
          </div>

          {/* Prominence / Small Remedies Toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Prominence:</span>
            <select
              value={polycrestFilter}
              onChange={(e) => setPolycrestFilter(e.target.value as any)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-200 outline-hidden"
            >
              <option value="all">All Remedies</option>
              <option value="polycrest_only">Major Polycrests</option>
              <option value="small_remedies_only">Rare / Small Remedies</option>
            </select>
          </div>
        </div>

        {/* Totals & Eliminatives indicator */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span>
            Selected Rubrics: <strong>{data.totalSelectedRubrics}</strong>
          </span>
          <span>
            Matched Remedies: <strong>{data.totalMatchedRemedies}</strong>
          </span>
          {data.eliminatedCount > 0 && (
            <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
              <Filter className="w-3 h-3" /> {data.eliminatedCount} eliminated
            </span>
          )}
        </div>
      </div>

      {/* Main View: Matrix OR RadarOpus Bar Chart */}
      {activeRubricCount === 0 ? (
        <div className="flex-1 min-h-[400px] flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Grid3X3 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Repertorisation Matrix is Empty
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Stage rubrics from the <strong>Repertory Explorer</strong> or clinical case sheet to start live repertorisation and differential analysis.
          </p>
        </div>
      ) : viewMode === "barchart" ? (
        /* RADAROPUS COMPARATIVE BAR CHART VIEW */
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" /> RadarOpus Comparative Totality Graph
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing top remedies by Totality Coverage (dark bar) and Weighted Score (gradient bar).
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-teal-600 inline-block" /> Totality Count
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600 inline-block" /> Weighted Score
              </span>
            </div>
          </div>

          {/* Bar Chart Columns */}
          <div className="flex-1 flex items-end gap-5 py-8 min-h-[300px] overflow-x-auto px-4">
            {data.remedies.slice(0, 15).map((item, idx) => {
              const rem = item.remedy;
              const heightPercent = Math.max(12, Math.round((item.weightedScore / maxWeightedScore) * 100));
              const totalityPercent = Math.max(10, Math.round((item.coveredCount / data.totalSelectedRubrics) * 100));

              return (
                <div
                  key={rem.id}
                  onClick={() => onOpenRemedyMM(rem.id)}
                  className="flex-1 min-w-[55px] max-w-[80px] flex flex-col items-center group cursor-pointer"
                  title={`${rem.name}\nCovered: ${item.coveredCount}/${data.totalSelectedRubrics}\nScore: ${item.weightedScore}`}
                >
                  {/* Score Label above bar */}
                  <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 mb-1 group-hover:scale-110 transition">
                    {item.weightedScore}
                  </span>

                  {/* Dual Bar Graphic */}
                  <div className="w-full flex items-end justify-center gap-1 h-56 bg-slate-100/60 dark:bg-slate-800/40 rounded-xl p-1 relative">
                    {/* Totality bar */}
                    <div
                      className="w-1/2 bg-teal-500 dark:bg-teal-600 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                      style={{ height: `${totalityPercent}%` }}
                      title={`Totality: ${item.coveredCount}`}
                    />
                    {/* Weighted score bar */}
                    <div
                      className="w-1/2 bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-xs"
                      style={{ height: `${heightPercent}%` }}
                      title={`Weighted Score: ${item.weightedScore}`}
                    />
                  </div>

                  {/* Remedy Abbr Footer */}
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 truncate group-hover:text-teal-600">
                    {rem.abbreviation}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {item.coveredCount} rubrics
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between">
            <span>Showing top 15 remedies sorted by {strategy}</span>
            <span>Click any remedy column to open full Materia Medica</span>
          </div>
        </div>
      ) : (
        /* RADAROPUS MATRIX HEATMAP VIEW */
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-x-auto overflow-y-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-slate-100/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 backdrop-blur-md">
                  <th className="p-3 w-80 min-w-[320px] font-bold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 sticky left-0 bg-slate-100 dark:bg-slate-950 z-20">
                    <div className="flex items-center justify-between">
                      <span>Rubrics ({data.rubrics.length})</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        Sorted by {strategy}
                      </span>
                    </div>
                  </th>

                  {data.remedies.map((item, idx) => {
                    const rem = item.remedy;
                    const cellWidth = gridDensity === "compact" ? "min-w-[62px] max-w-[70px]" : "min-w-[76px] max-w-[84px]";
                    return (
                      <th
                        key={rem.id}
                        className={`p-2.5 ${cellWidth} text-center border-r border-slate-200 dark:border-slate-800 transition-all ${
                          item.isEliminated
                            ? "opacity-40 bg-slate-100/50 dark:bg-slate-900/50"
                            : idx === 0
                            ? "bg-teal-50/70 dark:bg-teal-950/30"
                            : "hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div
                          className="flex flex-col items-center cursor-pointer group"
                          onClick={() => onOpenRemedyMM(rem.id)}
                          title={`${rem.name} (${rem.commonName || rem.kingdom})\nClick to view Materia Medica`}
                        >
                          {idx === 0 && !item.isEliminated && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-teal-600 text-white mb-1 flex items-center gap-0.5">
                              <Crown className="w-2.5 h-2.5" /> 1st
                            </span>
                          )}

                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition truncate max-w-[70px]">
                            {rem.abbreviation}
                          </span>

                          <span className="text-[9px] text-slate-400 truncate max-w-[70px] mt-0.5">
                            {rem.kingdom[0]} • {rem.thermalState?.[0] || "A"}
                          </span>

                          <div className="flex items-center gap-1 mt-1.5">
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              title="Totality: Total rubrics covered"
                            >
                              {item.coveredCount}
                            </span>
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-black bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200"
                              title="Weighted Score"
                            >
                              {item.weightedScore}
                            </span>
                          </div>

                          {item.isEliminated && (
                            <span className="mt-1 text-[8px] font-black text-rose-500 uppercase">
                              Elim
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {data.rubrics.map((rubric) => (
                  <tr
                    key={rubric.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-2.5 font-medium border-r border-slate-200 dark:border-slate-800 sticky left-0 bg-white dark:bg-slate-900 z-10 shadow-xs">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: rubric.clipboardColor }}
                            title={`Clipboard: ${rubric.clipboardName}`}
                          />
                          <div className="flex flex-col truncate">
                            <span
                              className="text-xs text-slate-800 dark:text-slate-200 font-semibold truncate hover:text-teal-600 transition cursor-help"
                              title={rubric.fullPath}
                            >
                              {rubric.fullPath}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {rubric.chapter} • {rubric.remedyCount} remedies
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {rubric.eliminative && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                              ELIM
                            </span>
                          )}
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {rubric.weight}x
                          </span>
                        </div>
                      </div>
                    </td>

                    {data.remedies.map((item) => {
                      const rem = item.remedy;
                      const grade = item.gradesByRubric[rubric.id] || 0;

                      let gradeClass = "text-slate-300 dark:text-slate-700 font-normal";
                      let bgClass = "";
                      let displayGrade = "-";

                      if (grade === 1) {
                        displayGrade = "1";
                        gradeClass = "text-slate-700 dark:text-slate-300 font-normal";
                        bgClass = "bg-slate-50 dark:bg-slate-900/40";
                      } else if (grade === 2) {
                        displayGrade = "2";
                        gradeClass = "text-blue-600 dark:text-blue-400 italic font-semibold";
                        bgClass = "bg-blue-50/50 dark:bg-blue-950/20";
                      } else if (grade === 3) {
                        displayGrade = "3";
                        gradeClass = "text-amber-600 dark:text-amber-400 font-bold text-sm";
                        bgClass = "bg-amber-50/70 dark:bg-amber-950/30";
                      } else if (grade === 4) {
                        displayGrade = "4";
                        gradeClass = "text-rose-600 dark:text-rose-400 font-black text-sm";
                        bgClass = "bg-rose-100/60 dark:bg-rose-950/50 shadow-inner";
                      }

                      return (
                        <td
                          key={rem.id}
                          onClick={() => {
                            if (grade > 0) {
                              setSelectedCell({ remedy: rem, rubric, grade });
                            }
                          }}
                          className={`p-2 text-center border-r border-slate-200 dark:border-slate-800 transition select-none ${bgClass} ${
                            grade > 0
                              ? "cursor-pointer hover:ring-2 hover:ring-teal-500 hover:z-10"
                              : ""
                          }`}
                          title={
                            grade > 0
                              ? `${rem.name} in "${rubric.fullPath}": Grade ${grade}\nClick for Materia Medica confirmation`
                              : `Not covered by ${rem.abbreviation}`
                          }
                        >
                          <span className={gradeClass}>{displayGrade}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Legend */}
          <div className="p-3 bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Kent Grades:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-normal text-[11px] flex items-center justify-center">1</span>
                <span>Plain (1 pt)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 italic font-semibold text-[11px] flex items-center justify-center">2</span>
                <span>Italics (2 pts)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center justify-center">3</span>
                <span>Bold (3 pts)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-black text-[11px] flex items-center justify-center">4</span>
                <span>BOLD CAPS (4 pts)</span>
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              Click any colored cell for immediate Materia Medica symptom confirmation
            </div>
          </div>
        </div>
      )}

      {/* Quick-Peek Materia Medica Modal */}
      {selectedCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center text-sm font-mono">
                  {selectedCell.remedy.abbreviation}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {selectedCell.remedy.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Grade {selectedCell.grade} confirmation in Kent's Repertory
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Rubric Context:
                </span>
                <p className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                  {selectedCell.rubric.fullPath}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Materia Medica Synthesis:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedCell.remedy.shortDescription ||
                    "Deep-acting constitutional remedy with high clinical concordance for this symptom totality."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Kingdom</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedCell.remedy.kingdom}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Thermal State</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedCell.remedy.thermalState || "Ambithermal"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  const remId = selectedCell.remedy.id;
                  setSelectedCell(null);
                  onOpenRemedyMM(remId);
                }}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 transition"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>Full Materia Medica</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

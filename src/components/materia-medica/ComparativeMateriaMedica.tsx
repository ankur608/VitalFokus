"use client";

import React, { useState, useEffect } from "react";
import {
  Columns3,
  Sparkles,
  Link,
  Flame,
  Thermometer,
  ArrowRightLeft,
  X,
  Plus
} from "lucide-react";

export const ComparativeMateriaMedica: React.FC = () => {
  const [remediesList, setRemediesList] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [remediesDetails, setRemediesDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch list of available remedies
  useEffect(() => {
    fetch("/api/remedies")
      .then((res) => res.json())
      .then((data) => {
        const list = data.remedies || [];
        setRemediesList(list);
        if (list.length >= 3) {
          // Pre-select classic acute comparison: Aconite, Belladonna, Gelsemium
          const acon = list.find((r: any) => r.abbreviation === "acon.");
          const bell = list.find((r: any) => r.abbreviation === "bell.");
          const gels = list.find((r: any) => r.abbreviation === "gels.");

          const defaultSelection = [
            acon?.id || list[0]?.id,
            bell?.id || list[1]?.id,
            gels?.id || list[2]?.id
          ].filter(Boolean);

          setSelectedIds(defaultSelection);
        }
      });
  }, []);

  // Fetch details for all selected remedies
  useEffect(() => {
    if (selectedIds.length === 0) {
      setRemediesDetails([]);
      return;
    }

    setIsLoading(true);
    Promise.all(selectedIds.map((id) => fetch(`/api/remedies/${id}`).then((r) => r.json())))
      .then((results) => {
        setRemediesDetails(results.map((res) => res.remedy).filter(Boolean));
      })
      .catch((err) => console.error("Comparative fetch error:", err))
      .finally(() => setIsLoading(false));
  }, [selectedIds]);

  const handleSelectRemedy = (slotIndex: number, newId: string) => {
    const updated = [...selectedIds];
    updated[slotIndex] = newId;
    setSelectedIds(updated);
  };

  const handleAddRemedySlot = () => {
    if (selectedIds.length >= 3) return;
    const remaining = remediesList.find((r) => !selectedIds.includes(r.id));
    if (remaining) {
      setSelectedIds([...selectedIds, remaining.id]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    if (selectedIds.length <= 1) return;
    setSelectedIds(selectedIds.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Columns3 className="w-4 h-4 text-indigo-600" /> Comparative Materia Medica Split Reader
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side differential analysis of keynotes, thermal polarities, and relationship tables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length < 3 && (
            <button
              onClick={handleAddRemedySlot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            >
              <Plus className="w-3.5 h-3.5" /> Compare 3rd Remedy
            </button>
          )}
        </div>
      </div>

      {/* Comparative Columns Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {selectedIds.map((id, index) => {
          const remedy = remediesDetails[index];
          return (
            <div
              key={id || index}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden"
            >
              {/* Slot Remedy Selector Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex items-center justify-between gap-2">
                <select
                  value={id}
                  onChange={(e) => handleSelectRemedy(index, e.target.value)}
                  className="font-bold text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-800 dark:text-slate-200 outline-hidden flex-1"
                >
                  {remediesList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.remedyNumber ? `#${String(r.remedyNumber).padStart(3, "0")} ` : ""}{r.name} ({r.abbreviation})
                    </option>
                  ))}
                </select>

                {selectedIds.length > 1 && (
                  <button
                    onClick={() => handleRemoveSlot(index)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Remove column"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Remedy Comparison Body */}
              {!remedy ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Loading remedy details...
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  {/* Summary Card */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                        {remedy.abbreviation}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {remedy.kingdom}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                      {remedy.commonName || remedy.name}
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                      <span>Thermal: <strong>{remedy.thermalState || "Ambithermal"}</strong></span>
                      <span>•</span>
                      <span>Miasm: <strong>{remedy.miasm || "Mixed"}</strong></span>
                    </div>
                  </div>

                  {/* Guiding Keynotes */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                      Guiding Sphere of Action
                    </span>
                    <p className="p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-800/40 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {remedy.shortDescription}
                    </p>
                  </div>

                  {/* Mind & Disposition */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                      Mind & Disposition
                    </span>
                    <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {remedy.mindKeynotes || "Emotional symptoms correspond with general totality."}
                    </p>
                  </div>

                  {/* Physical Generals */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                      Physical Generals
                    </span>
                    <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {remedy.generalsKeynotes || "Deep systemic affinity."}
                    </p>
                  </div>

                  {/* Modalities */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                      Characteristic Modalities
                    </span>
                    <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {remedy.modalitiesKeynotes || "Standard modalities."}
                    </p>
                  </div>

                  {/* Concordances */}
                  <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 space-y-1.5 text-[11px]">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">
                      Relationships & Inimicals:
                    </span>
                    <p><strong>Comp:</strong> <span className="font-mono text-emerald-600 dark:text-emerald-400">{remedy.complementary || "None"}</span></p>
                    <p><strong>Follows:</strong> <span className="font-mono text-blue-600 dark:text-blue-400">{remedy.followsWell || "None"}</span></p>
                    <p><strong>Inimical:</strong> <span className="font-mono text-rose-600 dark:text-rose-400">{remedy.inimical || "None"}</span></p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { 
  TaxonomyEntry, 
  TAXONOMY_DATABASE, 
  PERIODIC_ELEMENTS_SCHOLTEN, 
  PeriodicElement,
  KingdomType 
} from "@/lib/taxonomyData";
import { 
  Dna, 
  Sparkles, 
  Filter, 
  Plus, 
  Search, 
  Layers, 
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

interface TaxonomyExplorerProps {
  onFilterGridByKingdom?: (subGroupOrKingdom: string) => void;
}

export const TaxonomyExplorer: React.FC<TaxonomyExplorerProps> = ({
  onFilterGridByKingdom
}) => {
  const [activeTab, setActiveTab] = useState<"PeriodicTable" | "Plants" | "Animals" | "Nosodes">("PeriodicTable");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(PERIODIC_ELEMENTS_SCHOLTEN[6] || null); // Nat-m
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<TaxonomyEntry | null>(TAXONOMY_DATABASE[0] || null);

  const { addRubricToClipboard } = useClipboardStore();

  // Filter lists based on search
  const filteredTaxonomy = TAXONOMY_DATABASE.filter(item => {
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) ||
           item.subGroup.toLowerCase().includes(q) ||
           item.coreTheme.toLowerCase().includes(q);
  });

  const plantRemedies = filteredTaxonomy.filter(t => t.kingdom === "Plant");
  const animalRemedies = filteredTaxonomy.filter(t => t.kingdom === "Animal");
  const nosodeRemedies = filteredTaxonomy.filter(t => t.kingdom === "Nosode");

  return (
    <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Dna className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-100">Kingdom & Taxonomy Explorer</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Sankaran • Scholten • Yakir
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Interactive Periodic Table of Minerals, APG IV Plant Families, and Animal Taxonomies with 1-click repertorial filtering.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search family or remedy..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("PeriodicTable")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "PeriodicTable"
              ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Mineral Periodic Table (Scholten)
        </button>

        <button
          onClick={() => setActiveTab("Plants")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "Plants"
              ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          Plant Families (APG IV)
        </button>

        <button
          onClick={() => setActiveTab("Animals")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "Animals"
              ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Animal Taxonomy
        </button>

        <button
          onClick={() => setActiveTab("Nosodes")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "Nosodes"
              ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Miasmatic Nosodes
        </button>
      </div>

      {/* Tab 1: Periodic Table View */}
      {activeTab === "PeriodicTable" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-teal-400">Jan Scholten Element Theory:</span> Mineral remedies express life themes determined by their <strong className="text-slate-100">Series</strong> (developmental domain) and <strong className="text-slate-100">Stage</strong> (success, peak, or decay).
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
              <span>Series 1–7 (Row)</span>
              <span>•</span>
              <span>Stages 1–18 (Column)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Periodic Element Grid (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {PERIODIC_ELEMENTS_SCHOLTEN.map((el) => {
                  const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
                  return (
                    <button
                      key={el.atomicNumber}
                      onClick={() => setSelectedElement(el)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-teal-950/60 border-teal-500 shadow-lg shadow-teal-950/50"
                          : "bg-slate-800/50 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">{el.atomicNumber}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-teal-300">
                          S{el.series}:St{el.stage}
                        </span>
                      </div>
                      <div className="text-xl font-extrabold text-slate-100 mt-1">{el.symbol}</div>
                      <div className="text-xs font-semibold text-slate-200 truncate">{el.name}</div>
                      <div className="text-[11px] text-indigo-400 truncate mt-0.5">
                        {el.homeopathicName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Element Deep Dive (4 cols) */}
            <div className="lg:col-span-4 bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-4">
              {selectedElement ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-slate-100">{selectedElement.symbol}</span>
                        <span className="text-base font-bold text-slate-200">{selectedElement.name}</span>
                      </div>
                      <span className="text-xs font-mono text-teal-400">
                        Atomic #{selectedElement.atomicNumber} • Series {selectedElement.series}, Stage {selectedElement.stage}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/80 space-y-1">
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        Series {selectedElement.series} Theme
                      </span>
                      <p className="text-slate-200 font-medium">{selectedElement.seriesTheme}</p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/80 space-y-1">
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        Stage {selectedElement.stage} Dynamics
                      </span>
                      <p className="text-slate-200 font-medium">{selectedElement.stageTheme}</p>
                    </div>

                    <div className="p-3 bg-teal-950/30 rounded-lg border border-teal-500/30 space-y-1">
                      <span className="font-bold text-teal-400 uppercase tracking-wider text-[10px]">
                        Classic Homeopathic Preparation
                      </span>
                      <p className="text-teal-200 font-bold text-sm">{selectedElement.homeopathicName}</p>
                    </div>
                  </div>

                  {onFilterGridByKingdom && (
                    <button
                      onClick={() => onFilterGridByKingdom(selectedElement.homeopathicName || "Mineral")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg transition"
                    >
                      <Filter className="w-3.5 h-3.5" />
                      Filter Analysis Grid by {selectedElement.symbol}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Click any element in the table to inspect Scholten series & stage dynamics.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Plant Families */}
      {activeTab === "Plants" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantRemedies.map((plant) => (
              <div
                key={plant.name}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/80 hover:border-teal-500/50 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {plant.subGroup}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">#{plant.remedyNumber}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100">{plant.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">({plant.abbr})</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{plant.coreTheme}</p>

                <div className="space-y-1 pt-2 border-t border-slate-800 text-[11px]">
                  <span className="font-semibold text-slate-400">Key Sensations:</span>
                  <div className="flex flex-wrap gap-1">
                    {plant.keySensations.map((sens, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                        {sens}
                      </span>
                    ))}
                  </div>
                </div>

                {onFilterGridByKingdom && (
                  <button
                    onClick={() => onFilterGridByKingdom(plant.subGroup)}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-700/50 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 text-xs font-semibold transition"
                  >
                    <Filter className="w-3 h-3" />
                    Filter Grid by {plant.subGroup}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Animal Taxonomy */}
      {activeTab === "Animals" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animalRemedies.map((animal) => (
              <div
                key={animal.name}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/80 hover:border-indigo-500/50 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {animal.subGroup}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">#{animal.remedyNumber}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100">{animal.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">({animal.abbr})</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{animal.coreTheme}</p>

                <div className="space-y-1 pt-2 border-t border-slate-800 text-[11px]">
                  <span className="font-semibold text-slate-400">Key Sensations:</span>
                  <div className="flex flex-wrap gap-1">
                    {animal.keySensations.map((sens, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                        {sens}
                      </span>
                    ))}
                  </div>
                </div>

                {onFilterGridByKingdom && (
                  <button
                    onClick={() => onFilterGridByKingdom(animal.subGroup)}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-700/50 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 text-xs font-semibold transition"
                  >
                    <Filter className="w-3 h-3" />
                    Filter Grid by {animal.subGroup}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Miasmatic Nosodes */}
      {activeTab === "Nosodes" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nosodeRemedies.map((nosode) => (
              <div
                key={nosode.name}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/80 hover:border-amber-500/50 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {nosode.subGroup}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">#{nosode.remedyNumber}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100">{nosode.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">({nosode.abbr})</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{nosode.coreTheme}</p>

                <div className="space-y-1 pt-2 border-t border-slate-800 text-[11px]">
                  <span className="font-semibold text-slate-400">Key Sensations:</span>
                  <div className="flex flex-wrap gap-1">
                    {nosode.keySensations.map((sens, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                        {sens}
                      </span>
                    ))}
                  </div>
                </div>

                {onFilterGridByKingdom && (
                  <button
                    onClick={() => onFilterGridByKingdom(nosode.subGroup)}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-700/50 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs font-semibold transition"
                  >
                    <Filter className="w-3 h-3" />
                    Filter Grid by {nosode.subGroup}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

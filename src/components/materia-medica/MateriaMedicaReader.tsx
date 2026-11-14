"use client";

import React, { useState, useEffect } from "react";
import {
  BookMarked,
  Search,
  Sparkles,
  Link,
  ShieldAlert,
  Flame,
  Thermometer,
  Layers,
  ChevronRight,
  BookOpen,
  Filter,
  Globe,
  Quote,
  Clock,
  Award
} from "lucide-react";
import { 
  MMAuthor, 
  CLASSIC_AUTHORS, 
  getClassicMMEntry, 
  searchClassicMMLibrary,
  RemedyMMTextEntry
} from "@/lib/classicMMLibrary";
import { useLanguageStore } from "@/lib/store/useLanguageStore";
import { 
  translateThermal, 
  translateMiasm, 
  translateChapter, 
  getUITranslations 
} from "@/lib/translationEngine";

interface MateriaMedicaReaderProps {
  initialRemedyId?: string | null;
}

export const MateriaMedicaReader: React.FC<MateriaMedicaReaderProps> = ({
  initialRemedyId
}) => {
  const { currentLanguage } = useLanguageStore();
  const ui = getUITranslations(currentLanguage);

  const [remedies, setRemedies] = useState<any[]>([]);
  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>(
    initialRemedyId || null
  );
  const [remedyDetail, setRemedyDetail] = useState<any | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<MMAuthor>("allen");
  const [searchQuery, setSearchQuery] = useState("");
  const [kingdomFilter, setKingdomFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<"remedy" | "fulltext">("remedy");
  const [mmResults, setMmResults] = useState<any[]>([]);
  const [isSearchingMM, setIsSearchingMM] = useState<boolean>(false);
  const [mmAuthorFilter, setMmAuthorFilter] = useState<string>("all");
  const [matchedSectionHighlight, setMatchedSectionHighlight] = useState<string | null>(null);

  const fetchRemedies = async () => {
    try {
      const res = await fetch("/api/remedies");
      const data = await res.json();
      setRemedies(data.remedies || []);
      if (!selectedRemedyId && data.remedies?.length > 0) {
        setSelectedRemedyId(data.remedies[0].id);
      }
    } catch (err) {
      console.error("Failed to load remedies:", err);
    }
  };

  const fetchRemedyDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/remedies/${id}`);
      const data = await res.json();
      setRemedyDetail(data.remedy);
    } catch (err) {
      console.error("Failed to load remedy detail:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRemedies();
  }, []);

  useEffect(() => {
    if (initialRemedyId) {
      setSelectedRemedyId(initialRemedyId);
    }
  }, [initialRemedyId]);

  useEffect(() => {
    if (selectedRemedyId) {
      fetchRemedyDetail(selectedRemedyId);
    }
  }, [selectedRemedyId]);

  useEffect(() => {
    if (searchMode === "fulltext" && searchQuery.trim().length > 1) {
      const timer = setTimeout(async () => {
        setIsSearchingMM(true);
        try {
          const params = new URLSearchParams({
            q: searchQuery.trim(),
            author: mmAuthorFilter
          });
          const res = await fetch(`/api/materia-medica/search?${params.toString()}`);
          const data = await res.json();
          setMmResults(data.results || []);
        } catch (e) {
          console.error("MM search failed:", e);
        } finally {
          setIsSearchingMM(false);
        }
      }, 200);
      return () => clearTimeout(timer);
    } else if (searchMode === "fulltext" && searchQuery.trim().length <= 1) {
      setMmResults([]);
    }
  }, [searchQuery, searchMode, mmAuthorFilter]);

  const filteredRemedies = remedies.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      r.name.toLowerCase().includes(q) ||
      r.abbreviation.toLowerCase().includes(q) ||
      (r.commonName && r.commonName.toLowerCase().includes(q)) ||
      (r.remedyNumber && String(r.remedyNumber).includes(q.replace("#", "")));
    const matchesKingdom = kingdomFilter === "All" || r.kingdom === kingdomFilter;
    return matchesSearch && matchesKingdom;
  });

  // Check if classic unabridged text exists for the selected remedy
  const classicEntry = remedyDetail 
    ? getClassicMMEntry(remedyDetail.abbreviation || remedyDetail.name)
    : null;

  const currentAuthorInfo = CLASSIC_AUTHORS[selectedAuthor];
  const activeAuthorText = classicEntry?.texts[selectedAuthor];

  return (
    <div className="flex h-full gap-5 overflow-hidden">
      {/* Remedy & Full-Text Materia Medica Selector Rail */}
      <aside className="w-80 sm:w-84 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xs">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2.5">
          {/* Dual Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl text-[11px] font-bold">
            <button
              onClick={() => setSearchMode("remedy")}
              className={`py-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                searchMode === "remedy"
                  ? "bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              Remedy Index ({remedies.length})
            </button>
            <button
              onClick={() => setSearchMode("fulltext")}
              className={`py-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                searchMode === "fulltext"
                  ? "bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Cross-Volume MM
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchMode === "fulltext"
                  ? "Search 5 authors ('restlessness midnight', 'gastralgia')..."
                  : "Filter remedies (#188, ars, etc.)..."
              }
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Secondary Filters */}
          {searchMode === "remedy" ? (
            <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-semibold text-slate-500">
              {["All", "Plant", "Mineral", "Animal", "Nosode"].map((k) => (
                <button
                  key={k}
                  onClick={() => setKingdomFilter(k)}
                  className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                    kingdomFilter === k
                      ? "bg-amber-600 text-white font-bold"
                      : "bg-slate-200/60 dark:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-semibold text-slate-500">
              {[
                { id: "all", label: "All Authors" },
                { id: "allen", label: "Allen" },
                { id: "clarke", label: "Clarke" },
                { id: "phatak", label: "Phatak" },
                { id: "hahnemann", label: "Hahnemann" },
                { id: "boericke", label: "Boericke" }
              ].map((a) => (
                <button
                  key={a.id}
                  onClick={() => setMmAuthorFilter(a.id)}
                  className={`px-2 py-0.5 rounded-md transition whitespace-nowrap cursor-pointer ${
                    mmAuthorFilter === a.id
                      ? "bg-amber-600 text-white font-bold"
                      : "bg-slate-200/60 dark:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List Content: Either Remedy Index OR Cross-Volume Full-Text Results */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {searchMode === "remedy" ? (
            filteredRemedies.map((r) => {
              const isSelected = selectedRemedyId === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRemedyId(r.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 shadow-xs"
                      : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 hover:border-slate-200 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-amber-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      #{String(r.remedyNumber || 0).padStart(3, "0")}
                    </span>
                    <div className="truncate">
                      <span className="font-semibold block truncate">
                        {r.name}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {r.abbreviation} • {r.kingdom}
                      </span>
                    </div>
                  </div>
                  {isSelected && <ChevronRight className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>
              );
            })
          ) : isSearchingMM ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Searching unabridged texts across 5 classical authors...
            </div>
          ) : mmResults.length === 0 ? (
            <div className="py-10 px-4 text-center text-slate-400 text-xs space-y-2">
              <Sparkles className="w-5 h-5 mx-auto text-amber-500 opacity-60" />
              <p>Type symptoms or modalities above to search across Allen, Clarke, Boericke, Phatak, and Hahnemann.</p>
              <div className="pt-2 flex flex-wrap gap-1 justify-center text-[10px]">
                <button
                  onClick={() => setSearchQuery("restlessness midnight")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 cursor-pointer"
                >
                  "restlessness midnight"
                </button>
                <button
                  onClick={() => setSearchQuery("gastralgia")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 cursor-pointer"
                >
                  "gastralgia"
                </button>
              </div>
            </div>
          ) : (
            mmResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedRemedyId(item.remedyId);
                  setSelectedAuthor(item.author);
                  setMatchedSectionHighlight(item.matchedSection);
                }}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 bg-white dark:bg-slate-900/80 cursor-pointer transition space-y-1.5 shadow-2xs group"
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate">
                      {item.remedyName}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      ({item.abbreviation})
                    </span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${item.badgeColor}`}>
                    {item.authorName.replace("Dr. ", "")}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.matchedSection}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed italic bg-slate-50 dark:bg-slate-950/40 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
                  "{item.snippet}"
                </p>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Materia Medica Reading View */}
      <main className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        {!remedyDetail ? (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a remedy to view Allen's Keynotes, Clarke, Phatak, and Hahnemann Materia Medica profiles.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Header Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg border border-amber-500/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-mono text-xl font-black">
                  {remedyDetail.abbreviation}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-bold tracking-tight">
                      {remedyDetail.name}
                    </h2>
                    {remedyDetail.remedyNumber && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                        Remedy #{String(remedyDetail.remedyNumber).padStart(3, "0")}
                      </span>
                    )}
                    {remedyDetail.isPolycrest && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                        Polycrest
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-200/80 mt-0.5">
                    Common Name: <strong>{remedyDetail.commonName || "Not listed"}</strong>
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Kingdom: <strong>{remedyDetail.kingdom}</strong> • Miasm: <strong>{translateMiasm(remedyDetail.miasm || "Psora", currentLanguage)}</strong> • Thermal: <strong>{translateThermal(remedyDetail.thermalState || "Ambithermal", currentLanguage)}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-slate-300 font-mono text-[11px]">
                  Language: <strong>{currentLanguage.toUpperCase()}</strong>
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* CLASSIC AUTHORS SELECTOR TABS                                             */}
            {/* ========================================================================= */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Select Historical Reference Library:
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentAuthorInfo.year} Edition
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(Object.keys(CLASSIC_AUTHORS) as MMAuthor[]).map((authorKey) => {
                  const auth = CLASSIC_AUTHORS[authorKey];
                  const isActive = selectedAuthor === authorKey;
                  return (
                    <button
                      key={authorKey}
                      onClick={() => setSelectedAuthor(authorKey)}
                      className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                        isActive
                          ? "bg-amber-600 text-white border-amber-600 shadow-md font-bold"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400"
                      }`}
                    >
                      <span className="block text-xs font-bold truncate">{auth.name}</span>
                      <span className={`text-[10px] block truncate ${isActive ? "text-amber-100" : "text-slate-400"}`}>
                        {auth.bookTitle.split(" ")[0]} ({auth.year})
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 italic">
                {currentAuthorInfo.historicalSignificance}
              </p>
            </div>

            {/* ========================================================================= */}
            {/* ACTIVE AUTHOR FULL-TEXT BODY                                             */}
            {/* ========================================================================= */}
            {activeAuthorText ? (
              <div className="space-y-4">
                {/* Guiding Affinity & Sphere of Action */}
                <div className={`p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-1.5 transition-all ${matchedSectionHighlight === "Guiding Keynotes" ? "ring-2 ring-amber-500 shadow-md scale-[1.01]" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5" />
                      Guiding Keynotes & Sphere of Action — {currentAuthorInfo.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                      Unabridged
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {activeAuthorText.guidingAffinity}
                  </p>
                </div>

                {/* Mind, Head, GI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5 transition-all ${matchedSectionHighlight === "Mind & Disposition" ? "ring-2 ring-indigo-500 shadow-md scale-[1.01]" : ""}`}>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block uppercase text-[10px] tracking-wider">
                      {translateChapter("Mind", currentLanguage)} {matchedSectionHighlight === "Mind & Disposition" && "• [Matched Query]"}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeAuthorText.mind}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5 transition-all ${matchedSectionHighlight === "Head & Neurological" ? "ring-2 ring-teal-500 shadow-md scale-[1.01]" : ""}`}>
                    <span className="font-bold text-teal-600 dark:text-teal-400 block uppercase text-[10px] tracking-wider">
                      {translateChapter("Head", currentLanguage)} & Sensorium {matchedSectionHighlight === "Head & Neurological" && "• [Matched Query]"}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeAuthorText.head}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5 transition-all ${matchedSectionHighlight === "Gastrointestinal & Abdomen" ? "ring-2 ring-rose-500 shadow-md scale-[1.01]" : ""}`}>
                    <span className="font-bold text-rose-600 dark:text-rose-400 block uppercase text-[10px] tracking-wider">
                      {translateChapter("Stomach", currentLanguage)} & GI Tract {matchedSectionHighlight === "Gastrointestinal & Abdomen" && "• [Matched Query]"}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeAuthorText.gastrointestinal}
                    </p>
                  </div>
                </div>

                {/* Modalities Card */}
                <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs transition-all ${matchedSectionHighlight === "Modalities (< & >)" ? "ring-2 ring-amber-500 shadow-md scale-[1.01]" : ""}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 uppercase text-[10px] tracking-wider block">
                    Modalities (&lt; Aggravation &amp; &gt; Amelioration) — {currentAuthorInfo.name}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                    {activeAuthorText.modalities}
                  </p>
                </div>

                {/* Clinical Indications & Relationships */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 space-y-1.5">
                    <span className="font-bold text-teal-800 dark:text-teal-300 text-xs block">
                      Clinical Applications & Diseases
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeAuthorText.clinicalIndications}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 space-y-1.5">
                    <span className="font-bold text-indigo-800 dark:text-indigo-300 text-xs block">
                      Remedy Concordances & Relationships
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                      {activeAuthorText.relationships}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Fallback to Default Boericke & Kent Data */
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block">
                    Guiding Keynotes & Sphere of Action (Boericke & Kent):
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {remedyDetail.shortDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block uppercase text-[10px] tracking-wider">
                      {translateChapter("Mind", currentLanguage)}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {remedyDetail.mindKeynotes || "No specific mental keynotes tagged."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                    <span className="font-bold text-teal-600 dark:text-teal-400 block uppercase text-[10px] tracking-wider">
                      Physical Generals & Thermals
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {remedyDetail.generalsKeynotes || "Deep acting systemic constitution."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                    <span className="font-bold text-rose-600 dark:text-rose-400 block uppercase text-[10px] tracking-wider">
                      Modalities (&lt; &amp; &gt;)
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {remedyDetail.modalitiesKeynotes || "Follows general Hahnemannian modalities."}
                    </p>
                  </div>
                </div>

                {/* Structured Materia Medica Sections */}
                {remedyDetail.materiaMedica?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Organ Systems & Clinical Symptomatology (Kent / Boericke)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {remedyDetail.materiaMedica.map((sec: any) => (
                        <div
                          key={sec.id}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1"
                        >
                          <span className="font-bold text-teal-700 dark:text-teal-400 block text-[11px]">
                            {translateChapter(sec.section, currentLanguage)}
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {sec.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Interactive Relationship Table */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Link className="w-4 h-4 text-indigo-500" /> Remedy Relationship & Concordances
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase">
                    Complementary
                  </span>
                  <p className="font-mono text-emerald-900 dark:text-emerald-200 mt-1">
                    {remedyDetail.complementary || "None marked"}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                  <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 block uppercase">
                    Follows Well
                  </span>
                  <p className="font-mono text-blue-900 dark:text-blue-200 mt-1">
                    {remedyDetail.followsWell || "None marked"}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 block uppercase">
                    Antidotes
                  </span>
                  <p className="font-mono text-amber-900 dark:text-amber-200 mt-1">
                    {remedyDetail.antidotes || "Camph."}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
                  <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 block uppercase">
                    Inimical (Incompatible)
                  </span>
                  <p className="font-mono text-rose-900 dark:text-rose-200 mt-1">
                    {remedyDetail.inimical || "None"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

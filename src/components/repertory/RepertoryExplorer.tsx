"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Filter,
  Plus,
  Check,
  Layers,
  ChevronRight,
  Info,
  Flame,
  ArrowRight,
  GitMerge,
  Sparkles,
  BadgeCheck,
  Stethoscope,
  Tag,
  ShieldCheck,
  BookMarked
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

export const RepertoryExplorer: React.FC = () => {
  const [chapters, setChapters] = useState<{ name: string; macroSection: string }[]>([]);
  const [macroSections, setMacroSections] = useState<string[]>([]);
  const [selectedMacroSection, setSelectedMacroSection] = useState<string>("All");
  const [selectedChapter, setSelectedChapter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rubrics, setRubrics] = useState<any[]>([]);
  const [matchedSynonym, setMatchedSynonym] = useState<any | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // New Clinical Addition Modal state
  const [isAddingClinicalRubric, setIsAddingClinicalRubric] = useState<boolean>(false);
  const [clinicalForm, setClinicalForm] = useState({
    chapterName: "Modern Syndromes",
    macroSection: "Modern Illnesses & Syndromes",
    fullPath: "",
    caseVerifiedNotes: "",
    remedyGradesInput: "gels: 4, chin: 3, kali-p: 2"
  });

  const {
    clipboards,
    activeClipboardId,
    addRubricToClipboard,
    addMergedRubricToClipboard
  } = useClipboardStore();

  const activeClipboard =
    clipboards.find((cb) => cb.id === activeClipboardId) || clipboards[0];

  const fetchRubrics = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append("q", searchQuery.trim());
      if (selectedChapter !== "All") params.append("chapter", selectedChapter);
      if (selectedMacroSection !== "All") params.append("macroSection", selectedMacroSection);
      params.append("limit", "100");

      const res = await fetch(`/api/rubrics?${params.toString()}`);
      const data = await res.json();
      setRubrics(data.rubrics || []);
      setMatchedSynonym(data.matchedSynonym || null);
      setTotal(data.total || 0);

      if (data.chapters && chapters.length === 0) {
        setChapters(data.chapters);
      }
      if (data.macroSections && macroSections.length === 0) {
        setMacroSections(["All", ...data.macroSections]);
      }
    } catch (err) {
      console.error("Failed to load rubrics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRubrics();
    }, 150);
    return () => clearTimeout(timer);
  }, [selectedChapter, selectedMacroSection, searchQuery]);

  const isRubricInClipboard = (rubricId: string) => {
    return activeClipboard.rubrics.some((r) => r.id === rubricId || r.id === `merged-${rubricId}`);
  };

  // Smart Rubric Merging handler
  const handleMergeRubric = async (baseRubric: any) => {
    // Find related rubrics sharing chapter or keywords
    const keywords = baseRubric.label.split(/[;, ]+/).filter((w: string) => w.length > 3);
    const related = rubrics
      .filter((r) => r.id !== baseRubric.id && (r.chapter === baseRubric.chapter || keywords.some((k: string) => r.label.includes(k))))
      .slice(0, 3);

    addMergedRubricToClipboard(activeClipboardId, baseRubric, related);
  };

  const handleCreateClinicalRubric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicalForm.fullPath.trim()) return;

    // Parse remedy grades input: "gels: 4, chin: 3"
    const parsedGrades = clinicalForm.remedyGradesInput
      .split(",")
      .map((item) => {
        const [abbr, gradeStr] = item.split(":").map((s) => s.trim());
        return {
          abbr: abbr || "gels.",
          grade: parseInt(gradeStr, 10) || 2
        };
      })
      .filter((g) => g.abbr);

    try {
      const res = await fetch("/api/rubrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterName: clinicalForm.chapterName,
          macroSection: clinicalForm.macroSection,
          fullPath: clinicalForm.fullPath.trim(),
          label: clinicalForm.fullPath.split(";").pop()?.trim() || clinicalForm.fullPath,
          caseVerifiedNotes: clinicalForm.caseVerifiedNotes,
          remedyGrades: parsedGrades
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsAddingClinicalRubric(false);
        setClinicalForm({
          chapterName: "Modern Syndromes",
          macroSection: "Modern Illnesses & Syndromes",
          fullPath: "",
          caseVerifiedNotes: "",
          remedyGradesInput: "gels: 4, chin: 3, kali-p: 2"
        });
        await fetchRubrics();
      }
    } catch (err) {
      console.error("Clinical rubric add error:", err);
    }
  };

  const filteredChapters =
    selectedMacroSection === "All"
      ? chapters
      : chapters.filter((c) => c.macroSection === selectedMacroSection);

  return (
    <div className="flex h-full gap-5 overflow-hidden">
      {/* Chapter & Macro-Section Left Rail */}
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xs">
        {/* Functional Macro-Section Selector */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600" /> Macro-Section
            </span>
          </div>

          <select
            value={selectedMacroSection}
            onChange={(e) => {
              setSelectedMacroSection(e.target.value);
              setSelectedChapter("All");
            }}
            className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-800 dark:text-slate-200 outline-hidden"
          >
            <option value="All">All Macro-Sections (Kent + Modern)</option>
            <option value="Anatomical">Anatomical Chapters</option>
            <option value="Felt Pain Qualities">Felt Pain Qualities</option>
            <option value="Modern Illnesses & Syndromes">Modern Illnesses & Syndromes</option>
            <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
            <option value="Life Stages / Age">Life Stages / Age</option>
            <option value="Generalities">Generalities</option>
          </select>
        </div>

        {/* Chapters list under active macro-section */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <button
            onClick={() => setSelectedChapter("All")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
              selectedChapter === "All"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span>All Chapters ({filteredChapters.length})</span>
            {selectedChapter === "All" && <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {filteredChapters.map((ch) => {
            const isSelected = selectedChapter === ch.name;
            return (
              <button
                key={ch.name}
                onClick={() => setSelectedChapter(ch.name)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  isSelected
                    ? "bg-teal-600 text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="truncate">{ch.name}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Rubrics Browser Pane */}
      <main className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        {/* Search & Actions Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60 dark:bg-slate-950/40">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classical rubrics or modern medical terms (e.g. 'hypertension', 'insomnia', 'panic attack')..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-hidden focus:border-teal-500 shadow-2xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingClinicalRubric(true)}
              className="px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition flex items-center gap-1.5 shadow-xs"
            >
              <BadgeCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>+ Add Clinical Rubric [User Verified]</span>
            </button>
          </div>
        </div>

        {/* Modern Medical Lexicon Synonym Translation Banner */}
        {matchedSynonym && (
          <div className="mx-4 mt-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800/60 text-xs flex items-start justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-950 dark:text-blue-200">
                    Modern Medical Lexicon Match: "{matchedSynonym.modernTerm}"
                  </span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-blue-200/80 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                    {matchedSynonym.category}
                  </span>
                </div>
                <p className="text-[11px] text-blue-800 dark:text-blue-300 mt-0.5">
                  Classical Repertory Mapping: <strong>{matchedSynonym.classicalRubricPath}</strong>
                </p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 italic">
                  {matchedSynonym.explanation}
                </p>
              </div>
            </div>

            <span className="text-[10px] text-blue-500 shrink-0 font-medium">
              Synonym Engine Active
            </span>
          </div>
        )}

        {/* Rubrics List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Searching Repertory & Macro-Sections...
            </div>
          ) : rubrics.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No rubrics found matching "{searchQuery}".
            </div>
          ) : (
            rubrics.map((r) => {
              const inClipboard = isRubricInClipboard(r.id);

              return (
                <div
                  key={r.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-teal-500/50 transition-all p-3.5 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {r.chapter}
                        </span>

                        {r.macroSection && r.macroSection !== "Anatomical" && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            {r.macroSection}
                          </span>
                        )}

                        {r.isClinicalAddition && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3 text-amber-600" /> [Clinical Addition - User Verified]
                          </span>
                        )}

                        <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                          {r.fullPath}
                        </h4>
                      </div>

                      {r.caseVerifiedNotes && (
                        <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1 italic">
                          Case-Verified Note: {r.caseVerifiedNotes} (by {r.authorPractitioner})
                        </p>
                      )}

                      {r.crossReferences && (
                        <p className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 italic">
                          {r.crossReferences}
                        </p>
                      )}
                    </div>

                    {/* Actions: Add to Clipboard & Smart Merge */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Smart Rubric Merging button */}
                      <button
                        onClick={() => handleMergeRubric(r)}
                        className="px-2.5 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
                        title="Merge this rubric with related cross-references and sub-rubrics into a consolidated clipboard rubric"
                      >
                        <GitMerge className="w-3.5 h-3.5" />
                        <span>Merge Clusters</span>
                      </button>

                      {/* Standard Add Rubric */}
                      <button
                        onClick={() => addRubricToClipboard(activeClipboard.id, r)}
                        disabled={inClipboard}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                          inClipboard
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 cursor-default"
                            : "bg-teal-600 hover:bg-teal-700 text-white shadow-xs cursor-pointer"
                        }`}
                      >
                        {inClipboard ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remedy Badges Preview with Kent Gradings */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-[10px] text-slate-400 mr-1 font-medium">
                      Remedies ({r.remedyCount}):
                    </span>
                    {r.previewRemedies.map((rem: any) => {
                      let gradeClass = "remedy-grade-1 bg-slate-100 dark:bg-slate-800";
                      if (rem.grade === 2)
                        gradeClass = "remedy-grade-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800";
                      else if (rem.grade === 3)
                        gradeClass = "remedy-grade-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800";
                      else if (rem.grade === 4)
                        gradeClass = "remedy-grade-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800";

                      return (
                        <span
                          key={rem.id}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-mono cursor-pointer transition hover:scale-105 ${gradeClass}`}
                          title={`${rem.name} • Grade ${rem.grade}`}
                        >
                          {rem.abbr}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>
            Total Rubrics Available: <strong>{total}</strong> across <strong>{macroSections.length} Macro-Sections</strong>
          </span>
          <span className="text-[11px] text-slate-400">
            Suggesta-Inspired Structural Repertory v2.5
          </span>
        </div>
      </main>

      {/* Practitioner Clinical Addition Modal */}
      {isAddingClinicalRubric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  New Custom Clinical Rubric [User Verified]
                </h3>
              </div>
              <button
                onClick={() => setIsAddingClinicalRubric(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateClinicalRubric} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Chapter</label>
                  <input
                    type="text"
                    required
                    value={clinicalForm.chapterName}
                    onChange={(e) =>
                      setClinicalForm({ ...clinicalForm, chapterName: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Macro-Section</label>
                  <select
                    value={clinicalForm.macroSection}
                    onChange={(e) =>
                      setClinicalForm({ ...clinicalForm, macroSection: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  >
                    <option value="Modern Illnesses & Syndromes">Modern Illnesses & Syndromes</option>
                    <option value="Felt Pain Qualities">Felt Pain Qualities</option>
                    <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                    <option value="Life Stages / Age">Life Stages / Age</option>
                    <option value="Anatomical">Anatomical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">
                  Full Rubric Hierarchy Path
                </label>
                <input
                  type="text"
                  required
                  value={clinicalForm.fullPath}
                  onChange={(e) =>
                    setClinicalForm({ ...clinicalForm, fullPath: e.target.value })
                  }
                  placeholder="e.g. Modern Syndromes; long covid; post-viral anosmia"
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">
                  Remedies and Grades (Comma-separated abbr:grade)
                </label>
                <input
                  type="text"
                  value={clinicalForm.remedyGradesInput}
                  onChange={(e) =>
                    setClinicalForm({ ...clinicalForm, remedyGradesInput: e.target.value })
                  }
                  placeholder="gels: 4, chin: 3, kali-p: 2, ars: 2"
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">
                  Case-Verified Clinical Notes
                </label>
                <textarea
                  value={clinicalForm.caseVerifiedNotes}
                  onChange={(e) =>
                    setClinicalForm({ ...clinicalForm, caseVerifiedNotes: e.target.value })
                  }
                  rows={2}
                  placeholder="Document specific clinical observations, curing records, or verifying clinical literature..."
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddingClinicalRubric(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 shadow-xs"
                >
                  Save Clinical Addition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

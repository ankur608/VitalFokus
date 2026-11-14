"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  BookMarked,
  Users,
  Plus,
  ArrowRight,
  X,
  Sparkles
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

interface CommandSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patientId: string) => void;
  onSelectRemedy: (remedyId: string) => void;
  onSelectRubric: (rubric: any) => void;
}

export const CommandSpotlight: React.FC<CommandSpotlightProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
  onSelectRemedy,
  onSelectRubric
}) => {
  const [query, setQuery] = useState("");
  const [rubrics, setRubrics] = useState<any[]>([]);
  const [remedies, setRemedies] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addRubricToClipboard, activeClipboardId } = useClipboardStore();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Live search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setRubrics([]);
      setRemedies([]);
      setPatients([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const [rubricsRes, remediesRes, patientsRes] = await Promise.all([
          fetch(`/api/rubrics?q=${encodeURIComponent(query)}&limit=5`),
          fetch(`/api/remedies?q=${encodeURIComponent(query)}`),
          fetch(`/api/patients?q=${encodeURIComponent(query)}`)
        ]);

        const [rubricsData, remediesData, patientsData] = await Promise.all([
          rubricsRes.json(),
          remediesRes.json(),
          patientsRes.json()
        ]);

        setRubrics(rubricsData.rubrics || []);
        setRemedies((remediesData.remedies || []).slice(0, 5));
        setPatients((patientsData.patients || []).slice(0, 4));
      } catch (err) {
        console.error("Spotlight search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rubrics (e.g. mind anxiety), remedies (e.g. ars), or patients..."
            className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-hidden text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-0.5 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-teal-500 opacity-60" />
              Type to instantly search across Kentian Rubrics, Materia Medica, and Clinical Records.
            </div>
          ) : null}

          {/* Rubrics Group */}
          {rubrics.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Repertory Rubrics
                </span>
                <span className="text-[10px] text-slate-400">{rubrics.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {rubrics.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      onSelectRubric(r);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {r.fullPath}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                          {r.chapter}
                        </span>
                        <span>{r.remedyCount} remedies</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addRubricToClipboard(activeClipboardId, r);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[11px] font-medium hover:bg-teal-600 hover:text-white transition flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3 h-3" /> Clipboard
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Remedies Group */}
          {remedies.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <BookMarked className="w-3.5 h-3.5 text-amber-500" /> Materia Medica Remedies
                </span>
                <span className="text-[10px] text-slate-400">{remedies.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {remedies.map((rem) => (
                  <div
                    key={rem.id}
                    onClick={() => {
                      onSelectRemedy(rem.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="w-10 h-7 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {rem.abbreviation}
                      </span>
                      <div className="flex flex-col truncate">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {rem.name}
                          </span>
                          {rem.remedyNumber && (
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">
                              #{String(rem.remedyNumber).padStart(3, "0")}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {rem.commonName || rem.kingdom} • {rem.thermalState || "Ambithermal"}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Patients Group */}
          {patients.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-500" /> Patient Cases
                </span>
                <span className="text-[10px] text-slate-400">{patients.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {patients.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectPatient(p.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {p.firstName[0]}
                        {p.lastName[0]}
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {p.firstName} {p.lastName}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate">
                          {p.thermalState || "Ambithermal"} • {p.dominantMiasm || "Psora"} • {p.consultationCount} visits
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      Open EHR
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.trim() &&
            rubrics.length === 0 &&
            remedies.length === 0 &&
            patients.length === 0 &&
            !isLoading && (
              <div className="py-8 text-center text-slate-400 text-xs">
                No matching rubrics, remedies, or patients found for "{query}".
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

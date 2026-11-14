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
  BookOpen
} from "lucide-react";

interface MateriaMedicaReaderProps {
  initialRemedyId?: string | null;
}

export const MateriaMedicaReader: React.FC<MateriaMedicaReaderProps> = ({
  initialRemedyId
}) => {
  const [remedies, setRemedies] = useState<any[]>([]);
  const [selectedRemedyId, setSelectedRemedyId] = useState<string | null>(
    initialRemedyId || null
  );
  const [remedyDetail, setRemedyDetail] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [kingdomFilter, setKingdomFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex h-full gap-5 overflow-hidden">
      {/* Remedy Selector Left Rail */}
      <aside className="w-72 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xs">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-amber-500" /> Materia Medica ({remedies.length})
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter remedies..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredRemedies.map((rem) => {
            const isSelected = selectedRemedyId === rem.id;
            return (
              <div
                key={rem.id}
                onClick={() => setSelectedRemedyId(rem.id)}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-9 h-7 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    {rem.abbreviation}
                  </span>
                  <div className="flex flex-col truncate">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                        {rem.name}
                      </span>
                      {rem.remedyNumber && (
                        <span className="text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400 shrink-0">
                          #{String(rem.remedyNumber).padStart(3, "0")}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 truncate">
                      {rem.kingdom} • {rem.thermalState || "Ambithermal"}
                    </span>
                  </div>
                </div>
                {isSelected && <ChevronRight className="w-4 h-4 text-amber-600 shrink-0" />}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Materia Medica Reading View */}
      <main className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        {!remedyDetail ? (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a remedy to view Boericke & Kent Materia Medica profile.
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
                    Kingdom: <strong>{remedyDetail.kingdom}</strong> • Miasm: <strong>{remedyDetail.miasm || "Mixed"}</strong> • Thermal: <strong>{remedyDetail.thermalState || "Ambithermal"}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Core Keynotes Card */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block">
                Guiding Keynotes & Sphere of Action:
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {remedyDetail.shortDescription}
              </p>
            </div>

            {/* Three Pillars: Mind, Generals, Modalities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block uppercase text-[10px] tracking-wider">
                  Mind & Disposition
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
                        {sec.section}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {sec.content}
                      </p>
                    </div>
                  ))}
                </div>
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

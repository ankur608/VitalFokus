"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  Grid3X3,
  Bot,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  Calendar,
  Flame,
  Thermometer,
  Send,
  Globe,
  Database
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";
import { useLanguageStore } from "@/lib/store/useLanguageStore";
import { SUPPORTED_LANGUAGES, LanguageCode } from "@/lib/translationEngine";
import { CloudBackupModal } from "@/components/compliance/CloudBackupModal";
import { ActiveTab } from "../layout/Sidebar";

interface ClinicalDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectPatient: (patientId: string) => void;
  onOpenRemotePortal?: () => void;
}

export const ClinicalDashboard: React.FC<ClinicalDashboardProps> = ({
  setActiveTab,
  onSelectPatient,
  onOpenRemotePortal
}) => {
  const [stats, setStats] = useState({
    patientsCount: 2,
    rubricsCount: 99,
    remediesCount: 40,
    recentPatients: [] as any[]
  });
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguageStore();

  const { clipboards } = useClipboardStore();
  const totalRubricsInClipboards = clipboards.reduce(
    (sum, cb) => sum + cb.rubrics.length,
    0
  );

  useEffect(() => {
    fetch("/api/patients")
      .then((r) => r.json())
      .then((d) => {
        if (d.patients) {
          setStats((prev) => ({
            ...prev,
            patientsCount: d.total || d.patients.length,
            recentPatients: d.patients.slice(0, 3)
          }));
        }
      })
      .catch((err) => console.error(err));

    fetch("/api/rubrics?limit=1")
      .then((r) => r.json())
      .then((d) => {
        if (d.total) {
          setStats((prev) => ({ ...prev, rubricsCount: d.total }));
        }
      })
      .catch((err) => console.error(err));

    fetch("/api/remedies")
      .then((r) => r.json())
      .then((d) => {
        if (d.total) {
          setStats((prev) => ({ ...prev, remediesCount: d.total }));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col h-full space-y-6 overflow-y-auto pr-1 custom-scrollbar">
      {/* Hero Welcome Banner */}
      <div className="shrink-0 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-xl border border-teal-500/30 min-h-[190px] flex flex-col justify-center">
        <div className="relative z-10 max-w-2xl xl:max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-[11px] font-semibold shadow-2xs w-fit">
            <Activity className="w-3.5 h-3.5 text-teal-400" /> VitalFokus Clinical Intelligence Platform
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Precision Homeopathic Repertorisation &amp; Inference
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl font-normal">
            RadarOpus-level repertorisation precision combined with Kentian totality analysis, multi-clipboard symptom grading, and grounded VitalAI clinical inference.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
            <button
              onClick={() => setActiveTab("repertorisation")}
              className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-md shadow-teal-500/25 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Grid3X3 className="w-3.5 h-3.5" /> Open Repertorisation Grid
            </button>
            <button
              onClick={() => setActiveTab("vital-ai")}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-400" /> VitalAI Assistant
            </button>
            {onOpenRemotePortal && (
              <button
                onClick={onOpenRemotePortal}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-indigo-500/20 hover:from-teal-500/30 hover:to-indigo-500/30 backdrop-blur-md text-teal-300 font-bold text-xs border border-teal-400/30 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-teal-300" /> Patient Follow-Up Portal
              </button>
            )}
          </div>
        </div>

        {/* Right Top Branded Asset & Action Controls on Hero Ribbon */}
        <div className="hidden lg:flex absolute top-5 right-6 xl:top-6 xl:right-8 z-10 flex-col items-end gap-2.5 select-none">
          <img
            src="/vitalfokus-logo-dark.png"
            alt="VitalFokus Clinical Intelligence Suite"
            className="h-10 xl:h-11 w-auto object-contain select-none drop-shadow-md transition-transform hover:scale-[1.02]"
          />

          {/* Language & Backup Action Pills below Logo */}
          <div className="flex items-center gap-2 pt-0.5">
            {/* Multi-Language Selector Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/15 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-xs font-semibold text-slate-200 shadow-sm transition">
              <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-bold text-slate-100 outline-none cursor-pointer pr-1"
                title="Toggle Language"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-slate-100">
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cloud Backup & HIPAA Button */}
            <button
              onClick={() => setIsBackupModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-teal-400/40 bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 hover:text-teal-200 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Open Automated Cloud Backup & HIPAA Compliance Suite"
            >
              <Database className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Backup &amp; HIPAA</span>
            </button>
          </div>
        </div>

        {/* Subtle Decorative Background Element */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-indigo-500/15 via-teal-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Cloud Backup & HIPAA Modal */}
      <CloudBackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active Cases
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-slate-100">
              {stats.patientsCount}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Indexed Rubrics
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-slate-100">
              {stats.rubricsCount}+
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Materia Polycrests
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-slate-100">
              {stats.remediesCount}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active Rubrics Staged
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-slate-100">
              {totalRubricsInClipboards}
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Patient Cases & Quick Workspaces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Patient Cases */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" /> Active Patient Cases & Prescriptions
            </h3>
            <button
              onClick={() => setActiveTab("patients")}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {stats.recentPatients.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectPatient(p.id);
                  setActiveTab("patients");
                }}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/60 hover:border-teal-500/50 cursor-pointer transition flex items-center justify-between text-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center">
                    {p.firstName[0]}
                    {p.lastName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition">
                      {p.firstName} {p.lastName}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {p.occupation || "Patient"} • {p.thermalState || "Ambithermal"} • {p.dominantMiasm || "Psora"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {p.latestConsultation?.remedyPrescribed || "Evaluation"} {p.latestConsultation?.potencyPrescribed || "30C"}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {p.consultationCount} visits logged
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Tools & Classical Principles */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Clinical Accelerators
          </h3>

          <div className="space-y-2.5 text-xs">
            <button
              onClick={() => setActiveTab("repertory")}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Repertory Explorer
                </span>
                <span className="text-[10px] text-slate-500">
                  Kent's Chapters: Mind, Generals, Modalities
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab("comparative-mm")}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Comparative Split-Reader
                </span>
                <span className="text-[10px] text-slate-500">
                  Compare Aconite vs Belladonna vs Gelsemium
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab("importer")}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Dataset Importer
                </span>
                <span className="text-[10px] text-slate-500">
                  Upload custom public-domain Boericke CSVs
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-xs space-y-1">
            <span className="font-bold text-indigo-900 dark:text-indigo-200 text-[11px] block">
              Kent's Law of Similars:
            </span>
            <p className="text-indigo-800 dark:text-indigo-300 text-[11px] leading-relaxed italic">
              "The symptoms which are peculiar and characteristic to the patient must correspond to the guiding symptoms of the remedy."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bot, Sun, Moon, Sparkles, Layers, ShieldCheck, Thermometer } from "lucide-react";
import { ChatCopilotView } from "@/components/vital-ai/ChatCopilotView";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

export default function StandaloneCopilotPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { activePatientId, clipboards } = useClipboardStore();
  const [patientData, setPatientData] = useState<any>(null);

  // Sync theme
  useEffect(() => {
    const saved = localStorage.getItem("vitalfokus_theme") as "dark" | "light" | null;
    const currentAttr = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    const initialTheme = saved || currentAttr || "dark";
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      const body = document.body;
      if (next === "dark") {
        root.classList.add("dark");
        body.classList.add("dark");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.remove("dark");
        body.classList.remove("dark");
        root.setAttribute("data-theme", "light");
      }
      try {
        localStorage.setItem("vitalfokus_theme", next);
      } catch (e) {}
      return next;
    });
  };

  // Fetch active patient
  useEffect(() => {
    if (activePatientId) {
      fetch(`/api/patients/${activePatientId}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.patient) setPatientData(d.patient);
        })
        .catch((err) => console.error("Error fetching patient in copilot window:", err));
    } else {
      setPatientData(null);
    }
  }, [activePatientId]);

  const totalRubrics = clipboards.reduce(
    (sum, cb) => (cb.isActive ? sum + cb.rubrics.length : sum),
    0
  );

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden font-sans transition-colors duration-200 ${
        theme === "dark" ? "bg-slate-950 text-slate-100 dark" : "bg-slate-100 text-slate-900 light"
      }`}
      data-theme={theme}
    >
      {/* Pop-up Window Header */}
      <header className="px-4 py-3 bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white flex items-center justify-between border-b border-indigo-500/20 shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shadow-inner">
            <Bot className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">
                VitalFokus VitalAI Copilot
              </h1>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30 uppercase tracking-wider">
                188 Remedies RAG
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              Clinical Intelligence Suite • Standalone Companion Window
            </p>
          </div>
        </div>

        {/* Theme and Context Pill */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </header>

      {/* Synchronized Case Context Ribbon */}
      <div className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-700 dark:text-slate-300 font-semibold">Active Case:</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border border-slate-200 dark:border-slate-700">
            {patientData ? `${patientData.firstName} ${patientData.lastName}` : "Staged Case Intake"}
          </span>
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-[11px]">
            <Thermometer className="w-3 h-3 text-amber-500" />
            <strong className="text-slate-800 dark:text-slate-200">{patientData?.thermalState || "Chilly"}</strong>
          </span>
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-[11px]">
            <ShieldCheck className="w-3 h-3 text-indigo-500" />
            <strong className="text-slate-800 dark:text-slate-200">{patientData?.dominantMiasm || "Psora"}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
          <Layers className="w-3 h-3 text-indigo-500" />
          <span>Rubrics: <strong>{totalRubrics}</strong></span>
        </div>
      </div>

      {/* Main Chat Body */}
      <main className="flex-1 p-3 overflow-hidden flex flex-col bg-slate-100 dark:bg-slate-950">
        <ChatCopilotView isStandalone={true} showFloatingIcon={false} className="h-full" />
      </main>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Network, Sun, Moon } from "lucide-react";
import { RemedyRelationshipGraph } from "@/components/vital-ai/RemedyRelationshipGraph";

export default function StandaloneFamilyGraphPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden font-sans transition-colors duration-200 ${
        theme === "dark" ? "bg-slate-950 text-slate-100 dark" : "bg-slate-100 text-slate-900 light"
      }`}
      data-theme={theme}
    >
      {/* Standalone Window Header */}
      <header className="px-5 py-3 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-cyan-500/20 shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
            <Network className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">
                VitalFokus Remedy Relationship & Family Graph
              </h1>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider">
                Exclusive Window
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              Clinical Intelligence Suite • Detached Dynamic Network Topology
            </p>
          </div>
        </div>

        {/* Theme and Window Controls */}
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

      {/* Main Graph Content */}
      <main className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-slate-950">
        <RemedyRelationshipGraph
          isStandalone={true}
          onSelectRemedy={(id) => {
            if (typeof window !== "undefined" && window.opener) {
              window.opener.postMessage({ type: "SELECT_REMEDY", remedyId: id }, "*");
            }
          }}
        />
      </main>
    </div>
  );
}

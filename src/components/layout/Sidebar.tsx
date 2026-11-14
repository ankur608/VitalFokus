"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Grid3X3,
  BookMarked,
  Columns3,
  Bot,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Activity,
  Layers,
  Scale,
  Dna,
  HeartPulse
} from "lucide-react";

export type ActiveTab =
  | "dashboard"
  | "patients"
  | "repertory"
  | "repertorisation"
  | "polarity"
  | "taxonomy"
  | "materia-medica"
  | "comparative-mm"
  | "vital-ai"
  | "importer";

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  patientCount: number;
  onOpenVESModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  patientCount,
  onOpenVESModal,
}) => {
  const navItems = [
    {
      id: "dashboard" as ActiveTab,
      label: "Clinical Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "patients" as ActiveTab,
      label: "Patient EHR & Cases",
      icon: Users,
      badge: patientCount > 0 ? patientCount : null
    },
    {
      id: "repertory" as ActiveTab,
      label: "Repertory Explorer",
      icon: BookOpen,
      badge: "Kent"
    },
    {
      id: "repertorisation" as ActiveTab,
      label: "Repertorisation Grid",
      icon: Grid3X3,
      badge: "Matrix"
    },
    {
      id: "polarity" as ActiveTab,
      label: "Polarity Analysis (BPA)",
      icon: Scale,
      badge: "Frei",
      highlight: true
    },
    {
      id: "taxonomy" as ActiveTab,
      label: "Kingdoms & Taxonomy",
      icon: Dna,
      badge: "Scholten"
    },
    {
      id: "materia-medica" as ActiveTab,
      label: "Materia Medica",
      icon: BookMarked,
      badge: null
    },
    {
      id: "comparative-mm" as ActiveTab,
      label: "Comparative MM",
      icon: Columns3,
      badge: "Split"
    },
    {
      id: "vital-ai" as ActiveTab,
      label: "VitalAI Clinical Agent",
      icon: Bot,
      badge: "AI",
      highlight: true
    },
    {
      id: "importer" as ActiveTab,
      label: "Dataset Importer",
      icon: UploadCloud,
      badge: "CSV/JSON"
    }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-all duration-300 z-30 select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-3.5 border-b border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center overflow-hidden text-left group cursor-pointer transition-transform active:scale-95 focus:outline-none flex-1 min-w-0 mr-1"
          title="Go to Home / Clinical Dashboard"
        >
          {!isCollapsed ? (
            <div className="flex items-center h-11">
              <img
                src="/vitalfokus-logo.png"
                alt="VitalFokus Clinical Intelligence Suite"
                className="h-10 sm:h-11 w-auto object-contain object-left block dark:hidden select-none transition-transform group-hover:scale-[1.02]"
              />
              <img
                src="/vitalfokus-logo-dark.png"
                alt="VitalFokus Clinical Intelligence Suite"
                className="h-10 sm:h-11 w-auto object-contain object-left hidden dark:block select-none transition-transform group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="w-10 h-10 shrink-0 transition-transform group-hover:scale-105 flex items-center justify-center mx-auto">
              <img
                src="/vitalfokus-icon.png"
                alt="VitalFokus Icon"
                className="w-9 h-9 object-contain"
              />
            </div>
          )}
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20 dark:bg-teal-500 dark:text-slate-950 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white dark:text-slate-950" : ""}`} />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between text-left">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950"
                          : item.highlight
                          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      

      {/* Vithoulkas VES Levels of Health Action Button */}
      {onOpenVESModal && (
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <button
            onClick={onOpenVESModal}
            className="w-full flex items-center justify-center gap-2 p-2.5 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 hover:from-teal-500/20 hover:to-indigo-500/20 border border-teal-500/30 rounded-xl text-xs font-bold text-teal-600 dark:text-teal-300 transition shadow-sm"
          >
            <HeartPulse className="w-4 h-4 text-teal-500" />
            {!isCollapsed && <span>Levels of Health (VES)</span>}
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-400 text-center">
        {!isCollapsed ? (
          <div>
            <p className="font-semibold text-slate-600 dark:text-slate-300">VitalFokus Classical Suite</p>
            <p className="text-[10px] text-slate-400">BPA • VES • 188 Remedies</p>
          </div>
        ) : (
          <span className="font-mono text-[10px]">v2.4</span>
        )}
      </div>
    </aside>
  );
};

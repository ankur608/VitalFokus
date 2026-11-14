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
  Layers
} from "lucide-react";

export type ActiveTab =
  | "dashboard"
  | "patients"
  | "repertory"
  | "repertorisation"
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  patientCount
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
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-indigo-600 text-white shadow-md shadow-teal-500/20 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                Vital<span className="text-teal-600 dark:text-teal-400">Fokus</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                Clinical Intelligence
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? item.highlight
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "bg-teal-600 text-white shadow-md shadow-teal-500/25"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-200"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive
                    ? "text-white"
                    : item.highlight
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : item.highlight
                          ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
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

      {/* Bottom Status Indicator */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="truncate">
              <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">Core DB Online</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Hahnemannian Model v2.4</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Core DB Online" />
          </div>
        )}
      </div>
    </aside>
  );
};

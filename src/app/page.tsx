"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, ActiveTab } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { CommandSpotlight } from "@/components/layout/CommandSpotlight";
import { ClipboardDock } from "@/components/clipboards/ClipboardDock";
import { ClinicalDashboard } from "@/components/dashboard/ClinicalDashboard";
import { PatientEHR } from "@/components/patients/PatientEHR";
import { RepertoryExplorer } from "@/components/repertory/RepertoryExplorer";
import { RepertorisationGrid } from "@/components/repertorisation/RepertorisationGrid";
import { MateriaMedicaReader } from "@/components/materia-medica/MateriaMedicaReader";
import { ComparativeMateriaMedica } from "@/components/materia-medica/ComparativeMateriaMedica";
import { VitalAIPanel } from "@/components/vital-ai/VitalAIPanel";
import { BulkImporter } from "@/components/importer/BulkImporter";
import { PolarityAnalysisPanel } from "@/components/engines/PolarityAnalysisPanel";
import { TaxonomyExplorer } from "@/components/engines/TaxonomyExplorer";
import { VithoulkasAssessmentModal } from "@/components/engines/VithoulkasAssessmentModal";
import { RemotePortalModal } from "@/components/patients/RemotePortalModal";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isVESModalOpen, setIsVESModalOpen] = useState(false);
  const [isRemotePortalOpen, setIsRemotePortalOpen] = useState(false);
  const [activePatient, setActivePatient] = useState<any>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [patientCount, setPatientCount] = useState(5);
  const [selectedRemedyIdForMM, setSelectedRemedyIdForMM] = useState<string | null>(null);

  const { activePatientId, setActivePatientId } = useClipboardStore();
  const [activePatientName, setActivePatientName] = useState<string | null>(null);

  // Sync activeTab from URL query params (e.g. ?tab=vital-ai)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as ActiveTab | null;
      if (tabParam) setActiveTab(tabParam);
    } catch (e) {}
  }, []);

  // Initialize theme from localStorage or document attribute
  useEffect(() => {
    const saved = localStorage.getItem("vitalfokus_theme") as "dark" | "light" | null;
    const currentAttr = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    const initialTheme = saved || currentAttr || "dark";
    setTheme(initialTheme);
    const root = document.documentElement;
    const body = document.body;
    if (initialTheme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, []);

  // Apply dark mode class to html element and persist
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    try {
      localStorage.setItem("vitalfokus_theme", theme);
    } catch (e) {
      // ignore in storage-restricted environments
    }
  }, [theme]);

  // Load active patient name when activePatientId changes
  useEffect(() => {
    if (activePatientId) {
      fetch(`/api/patients/${activePatientId}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.patient) {
            setActivePatientName(`${d.patient.firstName} ${d.patient.lastName}`);
            setActivePatient(d.patient);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setActivePatientName(null);
      setActivePatient(null);
    }
  }, [activePatientId]);

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

  const handleSelectPatient = (id: string) => {
    setActivePatientId(id);
    setActiveTab("patients");
  };

  const handleSelectRemedy = (id: string) => {
    setSelectedRemedyIdForMM(id);
    setActiveTab("materia-medica");
  };

  const handleSelectRubric = (rubric: any) => {
    setActiveTab("repertory");
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${theme === "dark" ? "dark bg-slate-950 text-slate-100" : "light bg-slate-100 text-slate-900"} font-sans antialiased`} data-theme={theme}>
      {/* Left Collapsible Rail */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        patientCount={patientCount}
        onOpenVESModal={() => setIsVESModalOpen(true)}
      />

      {/* Main Workspace View */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar with Spotlight and Theme Controls */}
        <TopNavbar
          onOpenSpotlight={() => setIsSpotlightOpen(true)}
          activePatientName={activePatientName}
          onClearPatient={() => setActivePatientId(null)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Dynamic Pane Body */}
        <main className="flex-1 p-5 overflow-hidden">
          {activeTab === "dashboard" && (
            <ClinicalDashboard
              setActiveTab={setActiveTab}
              onSelectPatient={handleSelectPatient}
              onOpenRemotePortal={() => setIsRemotePortalOpen(true)}
            />
          )}

          {activeTab === "patients" && (
            <PatientEHR onOpenRepertorisation={() => setActiveTab("repertorisation")} />
          )}

          {activeTab === "repertory" && <RepertoryExplorer />}

          {activeTab === "repertorisation" && (
            <RepertorisationGrid
              onOpenVitalAI={() => setActiveTab("vital-ai")}
              onOpenRemedyMM={handleSelectRemedy}
              onOpenPolarityPanel={() => setActiveTab("polarity")}
            />
          )}

          {activeTab === "polarity" && (
            <PolarityAnalysisPanel
              onSelectRemedy={handleSelectRemedy}
              onOpenRepertorisation={() => setActiveTab("repertorisation")}
            />
          )}

          {activeTab === "taxonomy" && (
            <TaxonomyExplorer
              onFilterGridByKingdom={(family) => {
                setActiveTab("repertorisation");
              }}
            />
          )}

          {activeTab === "materia-medica" && (
            <MateriaMedicaReader initialRemedyId={selectedRemedyIdForMM} />
          )}

          {activeTab === "comparative-mm" && <ComparativeMateriaMedica />}

          {activeTab === "vital-ai" && (
            <VitalAIPanel onOpenRemedyMM={handleSelectRemedy} />
          )}

          {activeTab === "importer" && <BulkImporter />}
        </main>

        {/* Global Floating Multi-Clipboard Dock (Bottom) */}
        <ClipboardDock
          onOpenRepertorisation={() => setActiveTab("repertorisation")}
          onNavigateTab={setActiveTab}
        />
      </div>

      {/* Command Spotlight Modal (Cmd/Ctrl + K) */}
      <CommandSpotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onSelectPatient={handleSelectPatient}
        onSelectRemedy={handleSelectRemedy}
        onSelectRubric={handleSelectRubric}
      />

      {/* Remote Follow-Up Portal Modal */}
      <RemotePortalModal
        isOpen={isRemotePortalOpen}
        onClose={() => setIsRemotePortalOpen(false)}
        patient={activePatient || {
          id: "pt-eleanor-followup",
          firstName: "Eleanor",
          lastName: "Vance",
          email: "eleanor.vance@example.com",
          phone: "+1 (555) 234-5678",
          portalToken: "pt-eleanor-followup"
        }}
      />
      {/* Vithoulkas Levels of Health (VES) Diagnostic Modal */}
      <VithoulkasAssessmentModal
        isOpen={isVESModalOpen}
        onClose={() => setIsVESModalOpen(false)}
        patientName={activePatientName || "Active Clinical Case"}
        onSaveAssessment={(result) => {
          console.log("Attached Vithoulkas Assessment:", result);
        }}
      />
    </div>
  );
}

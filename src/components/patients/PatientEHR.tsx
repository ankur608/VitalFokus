"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Calendar,
  Thermometer,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  FileText,
  AlertCircle,
  CheckCircle2,
  Search,
  Highlighter,
  Sliders,
  ShieldCheck,
  Zap,
  Activity,
  HeartPulse,
  Brain,
  Layers,
  ArrowUpRight,
  Pencil,
  Edit3
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";
import { calculateVithoulkasLevel, VethAssessmentInput } from "@/lib/vithoulkasLevels";
import { BrandedPrescriptionModal } from "./BrandedPrescriptionModal";
import { CureTrajectoryChart } from "./CureTrajectoryChart";
import { RemotePortalModal } from "./RemotePortalModal";
import { Printer, Send, TrendingDown } from "lucide-react";

interface PatientEHRProps {
  onOpenRepertorisation: () => void;
}

export const PatientEHR: React.FC<PatientEHRProps> = ({
  onOpenRepertorisation
}) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientDetail, setPatientDetail] = useState<any | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"lsmc" | "mind-generals" | "miasm" | "ves" | "followups" | "highlighter" | "trajectory">("lsmc");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isRemotePortalModalOpen, setIsRemotePortalModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [isAddingConsultation, setIsAddingConsultation] = useState(false);
  const [isEditingPatient, setIsEditingPatient] = useState(false);

  const calculateAge = (dobString?: string): string => {
    if (!dobString) return "";
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} yrs`;
  };

  // Vithoulkas VES Assessment State
  const [vesInput, setVesInput] = useState<VethAssessmentInput>({
    feverHistory: "moderate_fever_occasional",
    suppressionHistory: "none_minimal",
    pathologyDepth: "functional_only",
    symptomClarity: "crisp_distinct_keynotes"
  });
  const vesResult = calculateVithoulkasLevel(vesInput);

  // Miasmatic calculator state
  const [psoraScore, setPsoraScore] = useState(60);
  const [sycosisScore, setSycosisScore] = useState(20);
  const [syphilisScore, setSyphilisScore] = useState(15);
  const [tubercularScore, setTubercularScore] = useState(5);

  // Smart Symptom Highlighter state
  const [highlightedText, setHighlightedText] = useState("");
  const [matchingRubrics, setMatchingRubrics] = useState<any[]>([]);
  const [isSearchingRubrics, setIsSearchingRubrics] = useState(false);
  const [showHighlighterDrawer, setShowHighlighterDrawer] = useState(false);

  // New Patient Form
  const [newPatientForm, setNewPatientForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "1992-06-15",
    gender: "Female",
    phone: "",
    email: "",
    occupation: "",
    thermalState: "Chilly",
    dominantMiasm: "Psora",
    constitution: "",
    notes: ""
  });

  // Edit Patient Form State
  const [editPatientForm, setEditPatientForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "Female",
    phone: "",
    email: "",
    occupation: "",
    thermalState: "Chilly",
    dominantMiasm: "Psora",
    constitution: "",
    notes: ""
  });

  const handleOpenEditPatient = (p: any) => {
    setEditPatientForm({
      firstName: p.firstName || "",
      lastName: p.lastName || "",
      dateOfBirth: p.dateOfBirth || "1990-01-01",
      gender: p.gender || "Female",
      phone: p.phone || "",
      email: p.email || "",
      occupation: p.occupation || "",
      thermalState: p.thermalState || "Chilly",
      dominantMiasm: p.dominantMiasm || "Psora",
      constitution: p.constitution || "",
      notes: p.notes || ""
    });
    setIsEditingPatient(true);
  };

  const handleUpdatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    try {
      const res = await fetch(`/api/patients/${selectedPatientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPatientForm)
      });
      const data = await res.json();
      if (data.patient) {
        setIsEditingPatient(false);
        await fetchPatientDetail(selectedPatientId);
        await fetchPatients();
      }
    } catch (err) {
      console.error("Update patient error:", err);
    }
  };

  // New Consultation Form
  const [newConsultationForm, setNewConsultationForm] = useState({
    chiefComplaints: "",
    modalitiesAggr: "",
    modalitiesAmel: "",
    concomitants: "",
    mindDisposition: "",
    physicalGenerals: "",
    thermalState: "Chilly",
    miasmaticTags: "Psora",
    kentsObservation: "Observation 4: Recovery without aggravation (highest order of cure)",
    potencyPrescribed: "200C",
    remedyPrescribed: "Arsenicum album",
    repetitionSchedule: "Single dose at night, then Sac Lac daily for 14 days",
    symptomEvolutionScore: 80,
    clinicalNotes: "",
    freeTextCaseNotes: ""
  });

  const {
    clipboards,
    activeClipboardId,
    addRubricToClipboard,
    setActivePatientId
  } = useClipboardStore();

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/patients");
      const data = await res.json();
      setPatients(data.patients || []);
      if (!selectedPatientId && data.patients?.length > 0) {
        setSelectedPatientId(data.patients[0].id);
      }
    } catch (err) {
      console.error("Failed to load patients:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPatientDetail = async (id: string) => {
    try {
      const res = await fetch(`/api/patients/${id}`);
      const data = await res.json();
      setPatientDetail(data.patient);
      setActivePatientId(id);
    } catch (err) {
      console.error("Failed to load patient detail:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      fetchPatientDetail(selectedPatientId);
    }
  }, [selectedPatientId]);

  // Handle Free-Text Text Selection for Highlighter
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length >= 3) {
      setHighlightedText(text);
    }
  };

  const searchRubricsForHighlight = async () => {
    if (!highlightedText) return;
    setIsSearchingRubrics(true);
    setShowHighlighterDrawer(true);
    try {
      const res = await fetch(
        `/api/rubrics?q=${encodeURIComponent(highlightedText)}&limit=12`
      );
      const data = await res.json();
      setMatchingRubrics(data.rubrics || []);
    } catch (err) {
      console.error("Rubric match error:", err);
    } finally {
      setIsSearchingRubrics(false);
    }
  };

  // 1-Click "Load Case into Clipboards"
  const handleLoadCaseIntoClipboards = async () => {
    if (!patientDetail) return;

    // Search and stage relevant rubrics according to case
    try {
      const term =
        patientDetail.firstName === "Eleanor"
          ? "anxiety health"
          : patientDetail.firstName === "Marcus"
          ? "waking"
          : patientDetail.firstName === "Sophie"
          ? "weeping"
          : patientDetail.firstName === "Arthur"
          ? "stiffness"
          : "grief";

      const res = await fetch(`/api/rubrics?q=${encodeURIComponent(term)}&limit=4`);
      const data = await res.json();
      const rubrics = data.rubrics || [];

      rubrics.forEach((r: any, idx: number) => {
        const targetCb = clipboards[idx % clipboards.length];
        addRubricToClipboard(targetCb.id, r, 2, idx === 0);
      });

      onOpenRepertorisation();
    } catch (err) {
      console.error("Failed to stage case into clipboards:", err);
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatientForm)
      });
      const data = await res.json();
      if (data.patient) {
        setIsCreatingPatient(false);
        await fetchPatients();
        setSelectedPatientId(data.patient.id);
      }
    } catch (err) {
      console.error("Create patient error:", err);
    }
  };

  const handleAddConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    try {
      const res = await fetch(`/api/patients/${selectedPatientId}/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConsultationForm)
      });
      const data = await res.json();
      if (data.consultation) {
        setIsAddingConsultation(false);
        await fetchPatientDetail(selectedPatientId);
      }
    } catch (err) {
      console.error("Consultation create error:", err);
    }
  };

  const latestVisit = patientDetail?.consultations?.[0];

  return (
    <div className="flex h-full gap-5 overflow-hidden">
      {/* Patient Directory Left Rail */}
      <aside className="w-80 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xs">
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-600" /> Patient Directory ({patients.length})
          </span>
          <button
            onClick={() => setIsCreatingPatient(true)}
            className="p-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700 text-xs font-semibold flex items-center gap-1 px-2.5 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" /> New Case
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {patients.map((p) => {
            const isSelected = selectedPatientId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                  isSelected
                    ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                    {p.firstName} {p.lastName}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {p.gender || "Patient"} • {calculateAge(p.dateOfBirth) || `${p.consultationCount} visits`}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPatientId(p.id);
                        setIsRemotePortalModalOpen(true);
                      }}
                      className="p-1 rounded-md text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition cursor-pointer"
                      title={`Send Remote Follow-Up Portal to ${p.firstName}`}
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  {p.occupation || "Patient"} • {p.thermalState || "Ambithermal"}
                </p>
                {p.latestConsultation && (
                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-teal-700 dark:text-teal-400 font-bold truncate">
                      Rx: {p.latestConsultation.remedyPrescribed || "Similimum"} ({p.latestConsultation.potencyPrescribed || "200C"})
                    </span>
                    {p.latestConsultation.symptomEvolutionScore !== null && (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        +{p.latestConsultation.symptomEvolutionScore}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Digital Case Sheet & Clinical Tabs */}
      <main className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        {!patientDetail ? (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a patient case to view comprehensive EHR.
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Patient Header Banner */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 text-xl font-black shadow-inner">
                  {patientDetail.firstName[0]}
                  {patientDetail.lastName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-bold">
                      {patientDetail.firstName} {patientDetail.lastName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/30 text-teal-300 border border-teal-400/30 uppercase">
                      {patientDetail.dominantMiasm || "Psora"} Miasm
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                      {patientDetail.thermalState || "Ambithermal"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-400" />
                      DOB: {patientDetail.dateOfBirth || "N/A"} {patientDetail.dateOfBirth ? `(${calculateAge(patientDetail.dateOfBirth)})` : ""}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                      <Users className="w-3 h-3 text-teal-400" />
                      Gender: {patientDetail.gender || "Unspecified"}
                    </span>
                    <span className="text-xs text-slate-300">
                      • Profession: {patientDetail.occupation || "N/A"}
                    </span>
                    <button
                      onClick={() => handleOpenEditPatient(patientDetail)}
                      className="ml-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-[10px] font-medium border border-white/20 transition flex items-center gap-1 cursor-pointer"
                      title="Edit DOB, Gender, and Demographics"
                    >
                      <Pencil className="w-2.5 h-2.5" /> Edit Demographics
                    </button>
                  </div>
                  <p className="text-[11px] text-teal-200 mt-1 line-clamp-1">
                    <strong>Constitution:</strong> {patientDetail.constitution || "General constitutional disposition"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleLoadCaseIntoClipboards}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                  title="Stage patient's symptoms into clipboards and open Repertorisation Grid"
                >
                  <Layers className="w-3.5 h-3.5" /> Stage Case in Clipboards
                </button>
                <button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="Generate Branded PDF/Printable Prescription"
                >
                  <Printer className="w-3.5 h-3.5 text-teal-400" /> Prescription
                </button>
                <button
                  onClick={() => setIsRemotePortalModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="Generate Tokenized Remote Follow-Up Link"
                >
                  <Send className="w-3.5 h-3.5 text-indigo-400" /> Remote Portal
                </button>
                <button
                  onClick={() => setIsAddingConsultation(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Visit
                </button>
              </div>
            </div>

            {/* Sub-Tabs Navigation */}
            <div className="px-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveSubTab("lsmc")}
                className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeSubTab === "lsmc"
                    ? "border-teal-600 text-teal-700 dark:text-teal-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Activity className="w-3.5 h-3.5" /> LSMC Matrix (Complaints)
              </button>

              <button
                onClick={() => setActiveSubTab("mind-generals")}
                className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeSubTab === "mind-generals"
                    ? "border-teal-600 text-teal-700 dark:text-teal-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Brain className="w-3.5 h-3.5" /> Mind & Physical Generals
              </button>

              <button
                onClick={() => setActiveSubTab("miasm")}
                className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeSubTab === "miasm"
                    ? "border-teal-600 text-teal-700 dark:text-teal-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> Miasmatic Calculator
              </button>

              <button
                onClick={() => setActiveSubTab("ves")}
                className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeSubTab === "ves"
                    ? "border-teal-600 text-teal-700 dark:text-teal-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5 text-teal-500" /> Levels of Health (VES)
              </button>

              <button
                onClick={() => setActiveSubTab("followups")}
                className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeSubTab === "followups"
                    ? "border-teal-600 text-teal-700 dark:text-teal-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" /> Kent's Observations ({patientDetail.consultations.length})
              </button>

              <button
                onClick={() => setActiveSubTab("trajectory")}
                className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeSubTab === "trajectory"
                    ? "border-teal-600 text-teal-700 dark:text-teal-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5 text-teal-500" /> Cure Trajectory (Hering)
              </button>

              <button
                onClick={() => setActiveSubTab("highlighter")}
                className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeSubTab === "highlighter"
                    ? "border-teal-600 text-teal-700 dark:text-teal-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Highlighter className="w-3.5 h-3.5" /> Symptom Highlighter
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: LSMC MATRIX */}
              {activeSubTab === "lsmc" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Boenninghausen / Hahnemannian LSMC Matrix (Location, Sensation, Modality, Concomitant)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Location & Sensation */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <span className="font-bold text-teal-700 dark:text-teal-400 block text-[11px] uppercase">
                        Location & Primary Sensations
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {latestVisit?.chiefComplaints || "None recorded"}
                      </p>
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 text-[11px]">
                        <strong>Clinical Notes:</strong> {latestVisit?.clinicalNotes || "No specific pathological tissue damage reported."}
                      </div>
                    </div>

                    {/* Modalities (< and >) */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block text-[11px] uppercase">
                        Characteristic Modalities
                      </span>
                      {latestVisit?.modalitiesAggr && (
                        <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
                          <strong>&lt; Aggravations:</strong> {latestVisit.modalitiesAggr}
                        </div>
                      )}
                      {latestVisit?.modalitiesAmel && (
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                          <strong>&gt; Ameliorations:</strong> {latestVisit.modalitiesAmel}
                        </div>
                      )}
                    </div>

                    {/* Concomitants */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1.5 md:col-span-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px] uppercase">
                        Concomitants & Reflex Phenomena
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {latestVisit?.concomitants || "None specifically marked."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MIND & PHYSICAL GENERALS */}
              {activeSubTab === "mind-generals" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px] uppercase flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5" /> Mind, Disposition & Emotional State
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {latestVisit?.mindDisposition || "Mind stable, no prominent mental aberrations."}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block text-[11px] uppercase flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5" /> Physical Generals & Thermals
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {latestVisit?.physicalGenerals || "Thirst and appetite within normal limits."}
                      </p>
                      <div className="pt-2 text-[11px] text-slate-500">
                        Thermal Constitution: <strong>{patientDetail.thermalState}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MIASMATIC CALCULATOR */}
              {activeSubTab === "miasm" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                        Interactive Miasmatic Distribution Calculator
                      </h4>
                      <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                        Dominant: {patientDetail.dominantMiasm}
                      </span>
                    </div>

                    {/* Visual Bar */}
                    <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800 shadow-inner">
                      <div className="h-full bg-blue-500" style={{ width: `${psoraScore}%` }} title={`Psora ${psoraScore}%`} />
                      <div className="h-full bg-amber-500" style={{ width: `${sycosisScore}%` }} title={`Sycosis ${sycosisScore}%`} />
                      <div className="h-full bg-rose-500" style={{ width: `${syphilisScore}%` }} title={`Syphilis ${syphilisScore}%`} />
                      <div className="h-full bg-purple-500" style={{ width: `${tubercularScore}%` }} title={`Tubercular ${tubercularScore}%`} />
                    </div>

                    {/* Sliders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
                      <div className="space-y-1">
                        <div className="flex justify-between font-semibold text-blue-600 dark:text-blue-400">
                          <span>Psora (Functional/Itch)</span>
                          <span>{psoraScore}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={psoraScore}
                          onChange={(e) => setPsoraScore(Number(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-semibold text-amber-600 dark:text-amber-400">
                          <span>Sycosis (Proliferative)</span>
                          <span>{sycosisScore}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sycosisScore}
                          onChange={(e) => setSycosisScore(Number(e.target.value))}
                          className="w-full accent-amber-600 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-semibold text-rose-600 dark:text-rose-400">
                          <span>Syphilis (Destructive)</span>
                          <span>{syphilisScore}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={syphilisScore}
                          onChange={(e) => setSyphilisScore(Number(e.target.value))}
                          className="w-full accent-rose-600 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-semibold text-purple-600 dark:text-purple-400">
                          <span>Tubercular (Hectic)</span>
                          <span>{tubercularScore}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tubercularScore}
                          onChange={(e) => setTubercularScore(Number(e.target.value))}
                          className="w-full accent-purple-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3.5: VITHOULKAS LEVELS OF HEALTH (VES) */}
              {activeSubTab === "ves" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="p-4 bg-gradient-to-r from-teal-950/40 to-slate-900/60 border border-teal-500/30 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-100 flex items-center gap-2">
                        <HeartPulse className="w-4 h-4 text-teal-400" />
                        Vithoulkas Defense Mechanism & Levels of Health
                      </h4>
                      <p className="text-xs text-slate-400">
                        Prognostic model predicting expected homeopathic aggravation, acute fever capacity, and Kent observation vector.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Group {vesResult.group} • Level {vesResult.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        1. Acute High Fever Capacity (&gt;38.5°C)
                      </label>
                      <select
                        value={vesInput.feverHistory}
                        onChange={(e) => setVesInput({ ...vesInput, feverHistory: e.target.value as any })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-100"
                      >
                        <option value="high_fever_recent">High fever (&gt;39°C), clears within 24-48 hrs (Group A)</option>
                        <option value="moderate_fever_occasional">Occasional fever up to 38.5°C every 1-3 years (Group B)</option>
                        <option value="no_fever_5_years">No high fever in past 5 to 8 years (Group C)</option>
                        <option value="no_fever_10_plus_years">Complete absence of fever for over 10 years / hypothermic (Group D)</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        2. Chemical & Suppression History
                      </label>
                      <select
                        value={vesInput.suppressionHistory}
                        onChange={(e) => setVesInput({ ...vesInput, suppressionHistory: e.target.value as any })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-100"
                      >
                        <option value="none_minimal">None or minimal; natural recovery from childhood infections</option>
                        <option value="moderate_antibiotics_nsaids">Occasional antibiotics, NSAIDs, or antipyretics</option>
                        <option value="heavy_steroids_immunosuppressants">Repeated corticosteroids or immunosuppressants</option>
                        <option value="lifelong_polypharmacy">Prolonged multi-drug polypharmacy, chemo/radiation</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        3. Pathology Depth
                      </label>
                      <select
                        value={vesInput.pathologyDepth}
                        onChange={(e) => setVesInput({ ...vesInput, pathologyDepth: e.target.value as any })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-100"
                      >
                        <option value="functional_only">Functional disturbance only (no structural tissue damage)</option>
                        <option value="mild_tissue_changes">Mild or reversible tissue modification (eczema, gastritis, asthma)</option>
                        <option value="deep_chronic_autoimmune">Deep chronic or autoimmune pathology (rheumatoid, colitis)</option>
                        <option value="irreversible_organic_degeneration">Irreversible organic degeneration or malignancy</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        4. Keynote & General Symptom Clarity
                      </label>
                      <select
                        value={vesInput.symptomClarity}
                        onChange={(e) => setVesInput({ ...vesInput, symptomClarity: e.target.value as any })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-100"
                      >
                        <option value="crisp_distinct_keynotes">Crisp, well-defined keynotes with distinct modalities</option>
                        <option value="clear_generals">Clear physical generals with recognizable thermal state</option>
                        <option value="confused_symptom_picture">Confused / multi-layered symptom picture</option>
                        <option value="scanty_few_symptoms">Scanty / one-sided case with few symptoms</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculated Prognosis Box */}
                  <div className="p-5 rounded-xl bg-slate-900 border border-teal-500/40 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-slate-100 font-bold text-base">
                        Classification: Group {vesResult.group} — Level {vesResult.level} ({vesResult.definition.title})
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">
                        Potencies: {vesResult.definition.recommendedPotencies.join(" or ")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                      <div>
                        <strong className="text-slate-100">Expected Healing Reaction:</strong>
                        <p className="mt-0.5 text-slate-300">{vesResult.definition.expectedReaction}</p>
                      </div>
                      <div>
                        <strong className="text-slate-100">Kent Observation Forecast:</strong>
                        <p className="mt-0.5 text-teal-300">{vesResult.definition.kentsObservationMatch}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: KENT'S 12 OBSERVATIONS & FOLLOW-UPS */}
              {activeSubTab === "followups" && (
                <div className="space-y-4">
                  {patientDetail.consultations.map((c: any, idx: number) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center text-xs">
                            #{patientDetail.consultations.length - idx}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {new Date(c.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                          Rx: {c.remedyPrescribed || "Similimum"} {c.potencyPrescribed || "200C"}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60">
                        <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-[10px] uppercase">
                          Kent's 12 Observations Assessment:
                        </span>
                        <p className="text-indigo-800 dark:text-indigo-200 font-medium mt-0.5">
                          {c.kentsObservation}
                        </p>
                        {c.repetitionSchedule && (
                          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1">
                            Posology: {c.repetitionSchedule}
                          </p>
                        )}
                      </div>

                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Clinical Status:</strong> {c.chiefComplaints}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: HIGHLIGHTER */}
              {activeSubTab === "highlighter" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-teal-900 dark:text-teal-200">
                        Smart Symptom-to-Rubric Extraction
                      </h4>
                      <p className="text-[11px] text-teal-700 dark:text-teal-400">
                        Select any words below to extract and stage matching Kentian rubrics.
                      </p>
                    </div>
                    {highlightedText && (
                      <button
                        onClick={searchRubricsForHighlight}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-xs"
                      >
                        Find Rubrics for "{highlightedText.slice(0, 15)}..."
                      </button>
                    )}
                  </div>

                  <div
                    onMouseUp={handleTextSelection}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed text-slate-800 dark:text-slate-200 cursor-text selection:bg-teal-300 selection:text-teal-950 min-h-[140px]"
                  >
                    {latestVisit?.freeTextCaseNotes ||
                      "Patient intake free text notes available for rubric highlighting."}
                  </div>
                </div>
              )}

              {/* TAB 7: CURE TRAJECTORY & HERING'S LAW */}
              {activeSubTab === "trajectory" && (
                <CureTrajectoryChart
                  consultations={patientDetail?.consultations || []}
                  patientName={`${patientDetail?.firstName} ${patientDetail?.lastName}`}
                  dominantMiasm={patientDetail?.dominantMiasm || "Psora"}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Highlighter Matches Drawer */}
      {showHighlighterDrawer && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-5 flex flex-col space-y-4 animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs">
              <Highlighter className="w-4 h-4" />
              <span>Matched Kent Rubrics</span>
            </div>
            <button
              onClick={() => setShowHighlighterDrawer(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              &times;
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
            <span className="text-[10px] text-slate-400 block font-semibold">Selected Text:</span>
            "{highlightedText}"
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {isSearchingRubrics ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Searching Repertory...
              </div>
            ) : matchingRubrics.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No rubrics found. Try selecting shorter symptom keywords.
              </div>
            ) : (
              matchingRubrics.map((rubric) => (
                <div
                  key={rubric.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-teal-500 transition text-xs space-y-2"
                >
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                      {rubric.chapter}
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {rubric.fullPath}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {rubric.remedyCount} remedies
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addRubricToClipboard(activeClipboardId, rubric);
                    }}
                    className="w-full py-1.5 rounded-lg bg-teal-600 text-white font-semibold text-[11px] hover:bg-teal-700 transition flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add to Active Clipboard
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* New Patient Modal */}
      {isCreatingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                New Homeopathic Patient Case
              </h3>
              <button
                onClick={() => setIsCreatingPatient(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">First Name</label>
                  <input
                    type="text"
                    required
                    value={newPatientForm.firstName}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, firstName: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Last Name</label>
                  <input
                    type="text"
                    required
                    value={newPatientForm.lastName}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, lastName: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={newPatientForm.dateOfBirth}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, dateOfBirth: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                  {newPatientForm.dateOfBirth && (
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-0.5 block">
                      Age: {calculateAge(newPatientForm.dateOfBirth)}
                    </span>
                  )}
                </div>
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Gender</label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, gender: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Pediatric Female">Pediatric Female</option>
                    <option value="Pediatric Male">Pediatric Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Thermal State</label>
                  <select
                    value={newPatientForm.thermalState}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, thermalState: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  >
                    <option value="Chilly">Chilly</option>
                    <option value="Hot">Hot</option>
                    <option value="Ambithermal">Ambithermal</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Dominant Miasm</label>
                  <select
                    value={newPatientForm.dominantMiasm}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, dominantMiasm: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  >
                    <option value="Psora">Psora</option>
                    <option value="Sycosis">Sycosis</option>
                    <option value="Syphilis">Syphilis</option>
                    <option value="Tubercular">Tubercular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">Occupation</label>
                <input
                  type="text"
                  value={newPatientForm.occupation}
                  onChange={(e) =>
                    setNewPatientForm({ ...newPatientForm, occupation: e.target.value })
                  }
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">Constitution</label>
                <textarea
                  value={newPatientForm.constitution}
                  onChange={(e) =>
                    setNewPatientForm({ ...newPatientForm, constitution: e.target.value })
                  }
                  rows={2}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingPatient(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700"
                >
                  Create Case Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Patient Demographics & Profile Modal */}
      {isEditingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Edit Patient Demographics & Profile
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Update DOB, Gender, and constitutional baseline.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingPatient(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdatePatient} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editPatientForm.firstName}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, firstName: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editPatientForm.lastName}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, lastName: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>

              {/* DOB & Gender Fields */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40">
                <div>
                  <label className="font-bold text-teal-800 dark:text-teal-300 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Date of Birth (DOB)
                  </label>
                  <input
                    type="date"
                    required
                    value={editPatientForm.dateOfBirth}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, dateOfBirth: e.target.value })
                    }
                    className="w-full p-2 rounded-lg border border-teal-300 dark:border-teal-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden font-medium"
                  />
                  {editPatientForm.dateOfBirth && (
                    <span className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold mt-1 block">
                      Calculated Age: {calculateAge(editPatientForm.dateOfBirth)}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-bold text-teal-800 dark:text-teal-300 block mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Gender
                  </label>
                  <select
                    value={editPatientForm.gender}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, gender: e.target.value })
                    }
                    className="w-full p-2 rounded-lg border border-teal-300 dark:border-teal-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden font-medium"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Pediatric Female">Pediatric Female</option>
                    <option value="Pediatric Male">Pediatric Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editPatientForm.phone}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, phone: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editPatientForm.email}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, email: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Thermal Constitution
                  </label>
                  <select
                    value={editPatientForm.thermalState}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, thermalState: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  >
                    <option value="Chilly">Chilly</option>
                    <option value="Hot">Hot</option>
                    <option value="Ambithermal">Ambithermal</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Dominant Miasm
                  </label>
                  <select
                    value={editPatientForm.dominantMiasm}
                    onChange={(e) =>
                      setEditPatientForm({ ...editPatientForm, dominantMiasm: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  >
                    <option value="Psora">Psora</option>
                    <option value="Sycosis">Sycosis</option>
                    <option value="Syphilis">Syphilis</option>
                    <option value="Tubercular">Tubercular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Occupation / Lifestyle
                </label>
                <input
                  type="text"
                  value={editPatientForm.occupation}
                  onChange={(e) =>
                    setEditPatientForm({ ...editPatientForm, occupation: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Constitution & Temperament
                </label>
                <textarea
                  rows={2}
                  value={editPatientForm.constitution}
                  onChange={(e) =>
                    setEditPatientForm({ ...editPatientForm, constitution: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingPatient(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition shadow-sm cursor-pointer"
                >
                  Save Demographics Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Consultation Modal */}
      {isAddingConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Log Follow-up Visit for {patientDetail?.firstName}
              </h3>
              <button
                onClick={() => setIsAddingConsultation(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddConsultation} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">Chief Complaints & Modalities</label>
                <textarea
                  required
                  value={newConsultationForm.chiefComplaints}
                  onChange={(e) =>
                    setNewConsultationForm({ ...newConsultationForm, chiefComplaints: e.target.value })
                  }
                  rows={2}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">&lt; Aggravation</label>
                  <input
                    type="text"
                    value={newConsultationForm.modalitiesAggr}
                    onChange={(e) =>
                      setNewConsultationForm({ ...newConsultationForm, modalitiesAggr: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">&gt; Amelioration</label>
                  <input
                    type="text"
                    value={newConsultationForm.modalitiesAmel}
                    onChange={(e) =>
                      setNewConsultationForm({ ...newConsultationForm, modalitiesAmel: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400">Kent's 12 Observations</label>
                <select
                  value={newConsultationForm.kentsObservation}
                  onChange={(e) =>
                    setNewConsultationForm({ ...newConsultationForm, kentsObservation: e.target.value })
                  }
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                >
                  <option value="Observation 4: Recovery without aggravation (highest order of cure)">
                    Obs 4: Recovery without aggravation (Highest order of cure)
                  </option>
                  <option value="Observation 3: Aggravation is quick, short, and strong with rapid recovery">
                    Obs 3: Quick, short aggravation with rapid recovery
                  </option>
                  <option value="Observation 1: Prolonged aggravation and then slow recovery">
                    Obs 1: Prolonged aggravation, then slow recovery
                  </option>
                  <option value="Observation 5: Amelioration comes first, then aggravation later">
                    Obs 5: Amelioration first, aggravation later
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Remedy Prescribed</label>
                  <input
                    type="text"
                    required
                    value={newConsultationForm.remedyPrescribed}
                    onChange={(e) =>
                      setNewConsultationForm({ ...newConsultationForm, remedyPrescribed: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400">Potency</label>
                  <input
                    type="text"
                    required
                    value={newConsultationForm.potencyPrescribed}
                    onChange={(e) =>
                      setNewConsultationForm({ ...newConsultationForm, potencyPrescribed: e.target.value })
                    }
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddingConsultation(false)}
                  className="px-3 py-1.5 rounded-lg border text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700"
                >
                  Save Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Branded Prescription Modal */}
      {isPrescriptionModalOpen && (
        <BrandedPrescriptionModal
          isOpen={isPrescriptionModalOpen}
          onClose={() => setIsPrescriptionModalOpen(false)}
          patient={patientDetail}
          latestConsultation={patientDetail?.consultations?.[0]}
        />
      )}

      {/* Remote Follow-up Portal Modal */}
      {isRemotePortalModalOpen && (
        <RemotePortalModal
          isOpen={isRemotePortalModalOpen}
          onClose={() => setIsRemotePortalModalOpen(false)}
          patient={patientDetail}
        />
      )}
    </div>
  );
};
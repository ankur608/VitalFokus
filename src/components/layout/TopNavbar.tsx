"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Moon,
  Sun,
  Layers,
  UserCheck,
  Sparkles,
  Command,
  User,
  ShieldCheck,
  Stethoscope,
  X,
  Check,
  Building,
  Mail,
  Phone,
  Award
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";
import { useLanguageStore } from "@/lib/store/useLanguageStore";
import { SUPPORTED_LANGUAGES, LanguageCode } from "@/lib/translationEngine";
import { CloudBackupModal } from "@/components/compliance/CloudBackupModal";
import { Globe, Database } from "lucide-react";

interface TopNavbarProps {
  onOpenSpotlight: () => void;
  activePatientName?: string | null;
  onClearPatient?: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export interface PractitionerProfile {
  name: string;
  role: string;
  degrees: string;
  licenseNumber: string;
  institution: string;
  email: string;
  phone: string;
  clinicalFocus: string;
}

const DEFAULT_PRACTITIONER: PractitionerProfile = {
  name: "Dr. HC Allen",
  role: "Senior Homeopathic Clinician & Keynotes Author",
  degrees: "MD (Hom), F.H.C.A., Keynotes Specialist",
  licenseNumber: "HOM-1889-HCA",
  institution: "Allen Homeopathic Medical & Research Institute",
  email: "dr.hcallen@vitalfokus.clinic",
  phone: "+1 (555) 889-KEYNOTE",
  clinicalFocus: "Classical Kentian Totality & Keynote Prescribing"
};

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenSpotlight,
  activePatientName,
  onClearPatient,
  theme,
  toggleTheme,
}) => {
  const { clipboards, isDockOpen, toggleDock } = useClipboardStore();

  const [profile, setProfile] = useState<PractitionerProfile>(DEFAULT_PRACTITIONER);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState<PractitionerProfile>(DEFAULT_PRACTITIONER);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguageStore();

  // Load saved practitioner profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vitalfokus_practitioner_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setProfileForm(parsed);
      }
    } catch (e) {
      console.error("Error loading practitioner profile:", e);
    }
  }, []);

  const totalRubrics = clipboards.reduce(
    (sum, cb) => sum + (cb.isActive ? cb.rubrics.length : 0),
    0
  );

  // Keyboard shortcut listener for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenSpotlight();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenSpotlight]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(profileForm);
    try {
      localStorage.setItem("vitalfokus_practitioner_profile", JSON.stringify(profileForm));
    } catch (err) {
      console.error("Failed to save practitioner profile:", err);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsProfileModalOpen(false);
    }, 700);
  };

  return (
    <>
      <header className="h-16 px-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
        {/* Search / Spotlight Bar Trigger */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            onClick={onOpenSpotlight}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-teal-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all text-xs group cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition" />
              <span className="truncate">
                Spotlight search: rubrics, remedies, or patients...
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs">
              <Command className="w-3 h-3" /> K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Active Patient Pill */}
          {activePatientName ? (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/70 text-teal-800 dark:text-teal-300 text-xs font-medium">
              <UserCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Active Case: <strong>{activePatientName}</strong></span>
              {onClearPatient && (
                <button
                  onClick={onClearPatient}
                  className="ml-1 text-teal-600 hover:text-teal-900 dark:text-teal-400 dark:hover:text-white"
                  title="Deselect patient"
                >
                  &times;
                </button>
              )}
            </div>
          ) : null}

          
          {/* Clipboards Toggle Button */}
          <button
            onClick={toggleDock}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isDockOpen
                ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-xs"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            title="Toggle Symptom Clipboards Dock"
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Clipboards</span>
            <span className="px-1.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold">
              {totalRubrics}
            </span>
          </button>

          {/* Multi-Language Selector */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-teal-500" />
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer pr-1"
                title="Toggle Repertory & MM Language"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cloud Backup Button */}
          <button
            onClick={() => setIsBackupModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold transition cursor-pointer shadow-2xs"
            title="Open Automated Cloud Backup & HIPAA Compliance Suite"
          >
            <Database className="w-3.5 h-3.5 text-teal-500" />
            <span className="hidden xl:inline">Backup</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Practitioner Profile (Upper Corner Right: "Dr. HC Allen") */}
          <div
            onClick={() => {
              setProfileForm(profile);
              setIsProfileModalOpen(true);
            }}
            className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800 cursor-pointer group hover:opacity-90 transition select-none"
            title="Click to view & edit Practitioner Profile form details"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs group-hover:ring-2 group-hover:ring-teal-400 transition">
                HA
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 absolute -bottom-0.5 -right-0.5" />
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                  {profile.name}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              </div>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold leading-tight truncate max-w-[140px]">
                {profile.role}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Practitioner Profile Form Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  HA
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      Practitioner Profile & Clinical Details
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-400/30">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Clinical credentials and practitioner identity displayed across VitalFokus.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Practitioner Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    placeholder="e.g. Dr. HC Allen"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Degrees & Qualifications
                  </label>
                  <input
                    type="text"
                    value={profileForm.degrees}
                    onChange={(e) => setProfileForm({ ...profileForm, degrees: e.target.value })}
                    placeholder="e.g. MD (Hom), F.H.C.A."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Clinical Role / Designation
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  placeholder="e.g. Senior Homeopathic Clinician & Keynotes Author"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Medical Registration / License #
                  </label>
                  <input
                    type="text"
                    value={profileForm.licenseNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, licenseNumber: e.target.value })}
                    placeholder="e.g. HOM-1889-HCA"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Institution / Clinic Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.institution}
                    onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                    placeholder="e.g. Allen Homeopathic Medical Institute"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Clinical Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    placeholder="e.g. dr.hcallen@vitalfokus.clinic"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Clinical Phone Line
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="e.g. +1 (555) 889-KEYNOTE"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Clinical & Repertorial Focus
                </label>
                <textarea
                  rows={2}
                  value={profileForm.clinicalFocus}
                  onChange={(e) => setProfileForm({ ...profileForm, clinicalFocus: e.target.value })}
                  placeholder="e.g. Classical Kentian Totality & Keynote Prescribing"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500 leading-relaxed"
                />
              </div>

              {/* Form Action Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">
                  Updates reflect instantly across all case consultation records.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <span>Save Profile Details</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cloud Backup & HIPAA Sovereignty Modal */}
      <CloudBackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />

    </>
  );
};

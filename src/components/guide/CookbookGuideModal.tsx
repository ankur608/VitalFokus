"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  X, 
  Search, 
  Layers, 
  Scale, 
  Dna, 
  Mic, 
  Share2, 
  Clock, 
  FileText, 
  TrendingUp, 
  Send, 
  Library, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Command, 
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HeartPulse,
  Activity,
  Cpu
} from "lucide-react";
import { ActiveTab } from "@/components/layout/Sidebar";

interface CookbookGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: ActiveTab) => void;
}

type GuideSectionId = 
  | "quickstart"
  | "clipboards"
  | "polarity"
  | "ves"
  | "taxonomy"
  | "voice-ehr"
  | "remedy-graph"
  | "posology"
  | "prescription"
  | "cure-trajectory"
  | "remote-portal"
  | "classic-mm"
  | "translation"
  | "cloud-backup"
  | "shortcuts";

interface GuideSection {
  id: GuideSectionId;
  title: string;
  icon: React.ElementType;
  badge: string;
  targetTab?: ActiveTab;
}

const GUIDE_SECTIONS: GuideSection[] = [
  { id: "quickstart", title: "Overview & Quickstart", icon: BookOpen, badge: "Intro", targetTab: "dashboard" },
  { id: "clipboards", title: "Multi-Clipboard Repertorisation", icon: Layers, badge: "Pillar 1", targetTab: "repertorisation" },
  { id: "polarity", title: "Bönninghausen Polarity (BPA)", icon: Scale, badge: "Frei Method", targetTab: "polarity" },
  { id: "ves", title: "Vithoulkas Levels of Health", icon: HeartPulse, badge: "12 Levels", targetTab: "dashboard" },
  { id: "taxonomy", title: "Kingdom & Taxonomy Explorer", icon: Dna, badge: "Scholten/Sankaran", targetTab: "taxonomy" },
  { id: "voice-ehr", title: "Voice-to-EHR Ambient Case-Taking", icon: Mic, badge: "VitalAI 2.0", targetTab: "vital-ai" },
  { id: "remedy-graph", title: "Remedy Relationship & Family Graph", icon: Share2, badge: "Network", targetTab: "vital-ai" },
  { id: "posology", title: "Hahnemannian Posology & Plussing", icon: Clock, badge: "LM/Q", targetTab: "vital-ai" },
  { id: "prescription", title: "1-Click Branded Prescription", icon: FileText, badge: "§ 260 Directives", targetTab: "patients" },
  { id: "cure-trajectory", title: "Cure Trajectory & Hering's Law", icon: TrendingUp, badge: "Analysis", targetTab: "patients" },
  { id: "remote-portal", title: "Remote Follow-Up Patient Portal", icon: Send, badge: "Live Sync", targetTab: "patients" },
  { id: "classic-mm", title: "Extended Materia Medica Library", icon: Library, badge: "Full-Text", targetTab: "materia-medica" },
  { id: "translation", title: "Multi-Language Repertory", icon: Globe, badge: "5 Languages", targetTab: "repertory" },
  { id: "cloud-backup", title: "HIPAA/GDPR Sovereign Backup", icon: ShieldCheck, badge: "AES-256", targetTab: "dashboard" },
  { id: "shortcuts", title: "Keyboard Shortcuts & Cheat Sheet", icon: Command, badge: "Productivity", targetTab: "dashboard" }
];

export const CookbookGuideModal: React.FC<CookbookGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [activeSection, setActiveSection] = useState<GuideSectionId>("quickstart");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredSections = GUIDE_SECTIONS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLaunchTab = (tab?: ActiveTab) => {
    if (tab && onNavigateTab) {
      onNavigateTab(tab);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in select-none">
      <div 
        className="w-full max-w-6xl h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  VitalFokus Clinical Cookbook &amp; Usage Guide
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-bold border border-teal-500/20">
                  v2.4 Practice Manual
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive reference guide, Kentian repertorial rules, and advanced clinical workflows.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide & recipes..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Close Guide (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Rail + Right Article View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation Sidebar */}
          <div className="w-64 sm:w-72 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-3 space-y-1 overflow-y-auto custom-scrollbar shrink-0">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
              Cookbook Chapters ({filteredSections.length})
            </div>
            {filteredSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-teal-600 text-white shadow-sm font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider shrink-0 ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                    {sec.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
            
            {/* Quickstart View */}
            {activeSection === "quickstart" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      Executive Overview &amp; Practice Philosophy
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      RadarOpus-level precision combined with Kentian totality, Polarity analysis, and grounded VitalAI clinical inference.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchTab("dashboard")}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    Open Home Dashboard <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">1</div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Kentian Totality</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Symptom hierarchy grading where mental generals and peculiar modalities take precedence over general physical pathology.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">2</div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Polarity Difference (BPA)</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Heiner Frei’s algorithm rules out candidates that contradict patient polar modalities (e.g., warmth vs. cold, motion vs. rest).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">3</div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">VitalAI 2.0</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Voice-to-EHR ambient transcription, force-directed family graph, and Organon § 248 LM/Q posology schedules.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-teal-900 dark:text-teal-200 space-y-1">
                    <span className="font-bold block">Quick Navigation Tip</span>
                    <p>
                      Use the floating round icon at the bottom right on any page to open this cookbook at any time. Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-teal-300 dark:border-teal-700 font-mono text-[10px]">⌘K</kbd> to trigger Spotlight search across all 188 remedies and 700+ classical rubrics.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Multi-Clipboard View */}
            {activeSection === "clipboards" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-500" />
                      Dynamic Multi-Clipboard Repertorisation
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Stage rubrics across 5 dedicated clinical clipboards to prevent physical particulars from skewing constitutional totality.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchTab("repertorisation")}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    Open Repertorisation Grid <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    The 5 Classical Clipboards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs space-y-1">
                      <span className="font-bold text-blue-700 dark:text-blue-300">1. Mental Generals</span>
                      <p className="text-blue-950 dark:text-blue-200/80">Fears, night terror, fastidiousness, grief, delirium, mind disposition.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-1">
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">2. Physical Generals</span>
                      <p className="text-emerald-950 dark:text-emerald-200/80">Thermals (chilly/hot), thirst (sip-by-sip), food desires/aversions, weather.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 text-xs space-y-1">
                      <span className="font-bold text-purple-700 dark:text-purple-300">3. Particulars &amp; Organs</span>
                      <p className="text-purple-950 dark:text-purple-200/80">Local anatomical pathology (stomach burning, knee pain, palpitations).</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs space-y-1">
                      <span className="font-bold text-amber-700 dark:text-amber-300">4. Characteristic Modalities</span>
                      <p className="text-amber-950 dark:text-amber-200/80">Time aggravation (&lt; 1am-2am), warmth amelioration, motion, cold draft.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs space-y-1 col-span-1 md:col-span-2">
                      <span className="font-bold text-rose-700 dark:text-rose-300">5. Eliminative Keynotes</span>
                      <p className="text-rose-950 dark:text-rose-200/80">Rare, strange, and peculiar symptoms that eliminate remedies lacking this hallmark.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Polarity BPA View */}
            {activeSection === "polarity" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-teal-500" />
                      Bönninghausen Polarity Analysis (BPA)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Implementation of Dr. Heiner Frei’s Polarity Difference algorithm with automated contra-indication calculation.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchTab("polarity")}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    Open Polarity Engine <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">The Heiner Frei Formula:</h4>
                  <div className="p-3 rounded-xl bg-slate-900 text-teal-300 font-mono text-center text-sm">
                    Polarity Difference (PD) = Polar Score − Contra-Indications
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Polarity Analysis evaluates opposing pairs of modalities (e.g. <em>&lt; cold air</em> vs. <em>&gt; cold air</em>). If a patient has severe aggravation from cold, remedies that are predominantly ameliorated by cold are flagged with red contra-indication badges and ranked down, preventing un-homoeopathic prescriptions.
                  </p>
                </div>
              </div>
            )}

            {/* VES Levels of Health */}
            {activeSection === "ves" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-rose-500" />
                      Vithoulkas Expert System &amp; 12 Levels of Health
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Predicts the clinical reaction and curative prognosis based on high-fever capability and miasmatic depth.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">Group A (Levels 1–3)</span>
                    <p className="text-emerald-950 dark:text-emerald-200">Capable of high acute fevers. Rapid smooth cure (Kent Obs. 3 or 4).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300">Group B (Levels 4–6)</span>
                    <p className="text-blue-950 dark:text-blue-200">Moderate vitality. Initial homoeopathic aggravation followed by long relief (Kent Obs. 1).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-300">Group C (Levels 7–9)</span>
                    <p className="text-amber-950 dark:text-amber-200">Severe suppression. Danger of organ stress during aggravation (Kent Obs. 2). Use gentle LM potencies.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-1">
                    <span className="font-bold text-rose-700 dark:text-rose-300">Group D (Levels 10–12)</span>
                    <p className="text-rose-950 dark:text-rose-200">Incurable organic pathology. Palliative management without severe aggravation (Kent Obs. 10–12).</p>
                  </div>
                </div>
              </div>
            )}

            {/* Kingdom & Taxonomy */}
            {activeSection === "taxonomy" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Dna className="w-5 h-5 text-indigo-500" />
                      Kingdom &amp; Taxonomy Explorer
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Jan Scholten Periodic Table, APG IV Botanical Plant Families, Animal Taxonomy, and Nosodes.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchTab("taxonomy")}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    Open Taxonomy Tab <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs leading-relaxed">
                  <p>
                    Allows 1-click filtering of any repertorisation totality by Kingdom or botanical sub-family:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                    <li><strong>Mineral Series 1–7 &amp; Stages 1–18:</strong> Match developmental stage and constitutional theme (Carbon = Identity, Ferrum = Duty, Silver = Creativity, Gold = Leadership).</li>
                    <li><strong>APG IV Plant Taxonomy:</strong> Group by botanical sensations (Solanaceae violent panic, Compositae bruising, Papaveraceae numbness).</li>
                    <li><strong>Animal Orders:</strong> Ophidia (Vipers/Cobras), Araneae (Spiders), Marine life.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Voice-to-EHR */}
            {activeSection === "voice-ehr" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-teal-500" />
                      Voice-to-EHR Ambient Case-Taking
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Real-time audio transcription with automated LSMC entity extraction into clipboards.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchTab("vital-ai")}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    Open VitalAI Panel <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Live Speech Parsing (LSMC):</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    As the doctor and patient talk, speech is parsed into:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-bold text-blue-600 dark:text-blue-400">L: Location</div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-bold text-teal-600 dark:text-teal-400">S: Sensation</div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-bold text-amber-600 dark:text-amber-400">M: Modality</div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-bold text-purple-600 dark:text-purple-400">C: Concomitant</div>
                  </div>
                </div>
              </div>
            )}

            {/* Posology Engine */}
            {activeSection === "posology" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-500" />
                      Organon Posology &amp; Plussing Engine
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Hahnemannian 5th &amp; 6th Edition Organon posology calculator for LM / Q potencies and split-dose plussing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs leading-relaxed text-indigo-950 dark:text-indigo-200">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block text-sm">LM / Q-Potency Recipe (§ 248):</span>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Dissolve 1 micro-globule of LM potency in 150 ml distilled water with 1 tbsp alcohol.</li>
                    <li>Administer 8–12 succussions against a firm leather pad before every single dose.</li>
                    <li>Dilute 1 tsp from the stock bottle into 50 ml water, stir, and administer 1 tsp to the patient.</li>
                    <li>For sensitive patients, use the Second-Glass Dilution Method to avoid homoeopathic aggravation.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Prescription & Antidoting Directives */}
            {activeSection === "prescription" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      1-Click Branded Prescription &amp; Organon § 260
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Export clinic-ready PDF prescriptions with clinic branding, Dr. credentials, QR verification, and antidoting rules.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchTab("patients")}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    Open Patient EHR <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2 text-xs text-amber-950 dark:text-amber-200">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block text-sm">Organon § 260 Strict Restrictions:</span>
                  <p>
                    Every prescription automatically includes the Hahnemannian dietary prohibitions: strict avoidance of coffee, camphor, eucalyptus, menthol, and raw mint teas during constitutional treatment.
                  </p>
                </div>
              </div>
            )}

            {/* Cure Trajectory */}
            {activeSection === "cure-trajectory" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                      Visual Cure Trajectory &amp; Hering's Law
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Interactive severity curve across consultation visits verifying Hering’s Law of Cure.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs leading-relaxed">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">The 3 Curative Vectors:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                    <li><strong>Above Downward:</strong> Emotional anguish and head pain subside before extremities.</li>
                    <li><strong>Within Outward:</strong> Internal gastric burning transitions to benign skin eruptions.</li>
                    <li><strong>More to Less Important Organs:</strong> Vital brain and cardiac centers clear before musculoskeletal aches.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Remote Follow-Up Portal */}
            {activeSection === "remote-portal" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Send className="w-5 h-5 text-teal-500" />
                      Secure Remote Follow-Up Patient Portal
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Tokenized check-in links sent via WhatsApp, SMS, or Email that sync directly into the patient EHR.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-2 text-xs text-teal-950 dark:text-teal-200">
                  <p>
                    Click the <strong>Send</strong> paper plane icon on any patient item in the EHR left rail. The system generates an instant portal URL:
                  </p>
                  <code className="block p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                    http://localhost:3000/portal/pt-[patientId]-followup
                  </code>
                  <p>
                    When the patient submits their weekly score, it is saved directly into the clinical records under <span className="font-bold">[Remote Portal Check-in]</span> with Kent's observation tagging.
                  </p>
                </div>
              </div>
            )}

            {/* Classic MM Library */}
            {activeSection === "classic-mm" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Library className="w-5 h-5 text-indigo-500" />
                      Extended Classical Materia Medica Library
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Full searchable texts of Allen’s Keynotes, Clarke’s Dictionary, Phatak’s MM, and Hahnemann’s Chronic Diseases.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchTab("materia-medica")}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    Open Materia Medica <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-slate-100">Allen's Keynotes</span>
                    <p className="text-slate-500 dark:text-slate-400">High-yield characteristic keynotes and distinguishing modalities.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-slate-100">Clarke's Dictionary</span>
                    <p className="text-slate-500 dark:text-slate-400">Exhaustive clinical verification across organs, mind, and clinical relationships.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-slate-100">Phatak's Materia Medica</span>
                    <p className="text-slate-500 dark:text-slate-400">Crisp anatomical affinities, generalities, and fastidious prescribing keys.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-slate-100">Hahnemann's Chronic Diseases</span>
                    <p className="text-slate-500 dark:text-slate-400">The foundational proving source for the primary antipsoric remedies.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Translation */}
            {activeSection === "translation" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-teal-500" />
                      Multi-Language Classical Repertory Engine
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Real-time translation across 🇬🇧 English, 🇩🇪 German, 🇫🇷 French, 🇪🇸 Spanish, and 🇮🇳 Hindi.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
                  <p className="text-slate-600 dark:text-slate-400">
                    Click the <strong>Globe</strong> icon in the top navbar. Terminology, rubrics, and modal chapters immediately translate without page reloads.
                  </p>
                </div>
              </div>
            )}

            {/* Cloud Backup */}
            {activeSection === "cloud-backup" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      HIPAA &amp; GDPR Compliant Cloud Backup (AES-256)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Zero-knowledge client-side encryption with Google Drive sync and SHA-256 checksums.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <p>
                    All clinical notes, diagnoses, and repertorisations are protected with <strong>AES-256-GCM</strong> encryption using a 100,000-iteration PBKDF2 derived key.
                  </p>
                  <p>
                    Use the <strong>Backup &amp; HIPAA</strong> modal in the top navbar to download encrypted <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">.vfbackup</code> files or synchronize directly with Google Drive.
                  </p>
                </div>
              </div>
            )}

            {/* Shortcuts */}
            {activeSection === "shortcuts" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Command className="w-5 h-5 text-indigo-500" />
                      Master Clinical Cheat-Sheet &amp; Shortcuts
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Keyboard shortcuts for fast navigation during live patient consultations.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      <tr>
                        <th className="p-3 font-bold">Shortcut</th>
                        <th className="p-3 font-bold">Action</th>
                        <th className="p-3 font-bold">Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                      <tr>
                        <td className="p-3 font-bold text-teal-600 dark:text-teal-400">⌘K / Ctrl+K</td>
                        <td className="p-3 font-sans">Open Spotlight Search</td>
                        <td className="p-3 font-sans">Global</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-teal-600 dark:text-teal-400">Esc</td>
                        <td className="p-3 font-sans">Close Active Modal / Spotlight / Cookbook</td>
                        <td className="p-3 font-sans">Global</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-teal-600 dark:text-teal-400">Space</td>
                        <td className="p-3 font-sans">Toggle Symptom Clipboards Dock</td>
                        <td className="p-3 font-sans">Global</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-teal-600 dark:text-teal-400">Ctrl+P</td>
                        <td className="p-3 font-sans">Open Branded Prescription Generator</td>
                        <td className="p-3 font-sans">Patient EHR</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

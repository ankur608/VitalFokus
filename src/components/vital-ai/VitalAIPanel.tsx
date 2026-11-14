"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  Mic,
  Network,
  Droplet,
  Sparkles,
  Layers,
  Thermometer,
  ShieldCheck,
  HelpCircle,
  Pill,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Quote,
  Compass,
  Printer,
  FileCheck2,
  Check,
  MessageSquare,
  Send,
  RefreshCw,
  Lightbulb,
  BookOpen,
  Scale,
  BrainCircuit,
  Stethoscope
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";
import { AmbientConsultationRecorder } from "./AmbientConsultationRecorder";
import { RemedyRelationshipGraph } from "./RemedyRelationshipGraph";
import { PosologyCalculatorModal } from "./PosologyCalculatorModal";

interface VitalAIPanelProps {
  onOpenRemedyMM: (remedyId: string) => void;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const VitalAIPanel: React.FC<VitalAIPanelProps> = ({
  onOpenRemedyMM
}) => {
  const { clipboards, activePatientId } = useClipboardStore();

  const [activeSubTab, setActiveSubTab] = useState<"chat" | "report" | "ambient" | "graph" | "posology">("chat");
  const [patientData, setPatientData] = useState<any | null>(null);
  const [topRemedies, setTopRemedies] = useState<any[]>([]);
  const [report, setReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Interactive clarification answers state
  const [clarificationAnswers, setClarificationAnswers] = useState<Record<string, string>>({});

  // Chat Agent State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content: `### 👋 Welcome to the VitalAI Clinical Intelligence Copilot!

I am your clinical walkthrough and homeopathic prediction guide, powered by **188+ numbered Materia Medica remedies** and Kentian repertorisation principles.

#### 💡 How I can assist you:
- **Guided Case Walkthrough:** Learn how to stage symptoms, apply eliminative keynotes, and forecast the similimum.
- **Medicine Prediction & Differential:** Ask why a remedy is selected, compare modalities (e.g. *Arsenicum* vs *Nux vomica*), or evaluate your staged rubrics.
- **Kent's 12 Observations:** Interpret post-prescription aggravation vs amelioration for your follow-up consultations.

*Click any prompt below or type your case question to begin!*`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeSubTab === "chat") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeSubTab]);

  // Fetch patient details if active
  useEffect(() => {
    if (activePatientId) {
      fetch(`/api/patients/${activePatientId}`)
        .then((res) => res.json())
        .then((data) => setPatientData(data.patient))
        .catch((err) => console.error("Error fetching patient for AI:", err));
    }
  }, [activePatientId]);

  // Fetch current repertorisation calculation for top remedies
  useEffect(() => {
    fetch("/api/repertorisation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clipboards,
        strategy: "totality",
        limit: 15
      })
    })
      .then((res) => res.json())
      .then((data) => setTopRemedies(data.remedies || []))
      .catch((err) => console.error("Error fetching repertorisation for AI:", err));
  }, [clipboards]);

  const generateInference = async (answersOverride?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/vital-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientCase: patientData || {
            firstName: "Clinical",
            lastName: "Case",
            thermalState: "Chilly",
            dominantMiasm: "Psora",
            constitution: "Nervous reactive temperament"
          },
          clipboards,
          topRemedies,
          clarificationAnswers: answersOverride || clarificationAnswers
        })
      });

      const data = await res.json();
      if (data.report) {
        setReport(data.report);
        setActiveSubTab("report");
      } else {
        setError(data.error || "Inference failed");
      }
    } catch (err: any) {
      setError(err.message || "Failed to communicate with VitalAI");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectClarificationOption = (qId: string, option: string) => {
    const updated = { ...clarificationAnswers, [qId]: option };
    setClarificationAnswers(updated);
    generateInference(updated);
  };

  const handleSendChatMessage = async (textToSend?: string) => {
    const text = (textToSend || chatInput).trim();
    if (!text || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/vital-ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          })),
          currentPatient: patientData,
          clipboards,
          topRemedies
        })
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I am analyzing your clinical query. Please refine your symptoms or stage additional rubrics.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "⚠️ Failed to connect to VitalAI agent service. Please verify server connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const totalRubrics = clipboards.reduce(
    (sum, cb) => (cb.isActive ? sum + cb.rubrics.length : sum),
    0
  );

  const quickPrompts = [
    {
      label: "🎯 Step-by-Step Prediction Walkthrough",
      query: "Walk me through step-by-step how to use VitalAI to predict a remedy for my patient"
    },
    {
      label: "⚙️ How Probability % is Calculated",
      query: "How does VitalAI calculate the Similimum Probability % mathematically?"
    },
    {
      label: "⚖️ Differentiate Arsenicum vs Nux vomica vs Lycopodium",
      query: "Differentiate Arsenicum vs Nux vomica vs Lycopodium for gastrointestinal and anxiety complaints"
    },
    {
      label: "📜 Kent's 12 Observations Follow-up Guide",
      query: "Explain Kent's 12 Observations and how to evaluate follow-up visits"
    },
    {
      label: "🔍 Analyze Currently Staged Case",
      query: "Analyze my currently staged patient case and provide clinical synthesis"
    }
  ];

  // Simple Markdown renderer for chat responses
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith("### ")) {
            return (
              <h3 key={idx} className="font-bold text-sm text-teal-300 pt-2 pb-1 border-b border-slate-700/50">
                {line.replace("### ", "")}
              </h3>
            );
          }
          if (line.startsWith("#### ")) {
            return (
              <h4 key={idx} className="font-bold text-xs text-indigo-300 pt-1.5">
                {line.replace("#### ", "")}
              </h4>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>{renderInlineStyles(line.replace("- ", ""))}</span>
              </div>
            );
          }
          if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ") || line.startsWith("6. ") || line.startsWith("7. ") || line.startsWith("8. ") || line.startsWith("9. ") || line.startsWith("10. ") || line.startsWith("11. ") || line.startsWith("12. ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-indigo-400 font-semibold">{line.slice(0, line.indexOf(" "))}</span>
                <span>{renderInlineStyles(line.slice(line.indexOf(" ") + 1))}</span>
              </div>
            );
          }
          if (line.startsWith("|")) {
            return (
              <div key={idx} className="font-mono text-[11px] text-slate-300 overflow-x-auto py-0.5 bg-slate-900/60 px-2 rounded">
                {line}
              </div>
            );
          }
          if (line.trim() === "---") {
            return <hr key={idx} className="border-slate-800 my-2" />;
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return <p key={idx}>{renderInlineStyles(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineStyles = (text: string) => {
    // Basic bold and code tags
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-teal-200 font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 font-mono text-[10px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white flex flex-wrap items-center justify-between gap-4 border border-indigo-500/20 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
            <Bot className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold">VitalAI Clinical Assistant & Prediction Agent</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30 uppercase tracking-wider">
                188 Remedies RAG
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Interactive clinical walkthrough, medicine prediction assistant, and RadarOpus-style totality scoring.
            </p>
          </div>
        </div>

        {/* Tab Switcher & Run Prediction CTA */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab("chat")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeSubTab === "chat"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Copilot</span>
            </button>
            <button
              onClick={() => setActiveSubTab("report")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeSubTab === "report"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Inference Report</span>
            </button>
            <button
              onClick={() => setActiveSubTab("ambient")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeSubTab === "ambient"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Ambient Speech</span>
            </button>
            <button
              onClick={() => setActiveSubTab("graph")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeSubTab === "graph"
                  ? "bg-cyan-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Family Graph</span>
            </button>
            <button
              onClick={() => setActiveSubTab("posology")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeSubTab === "posology"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Droplet className="w-3.5 h-3.5" />
              <span>Posology & Plussing</span>
            </button>
          </div>

          <button
            onClick={() => generateInference()}
            disabled={isLoading || totalRubrics === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600 disabled:opacity-40 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isLoading ? "Predicting..." : "Run Prediction"}</span>
          </button>
        </div>
      </div>

      {/* Inputs Context Strip */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium">Active Case Context:</span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
            {patientData ? `${patientData.firstName} ${patientData.lastName}` : "Staged Case Intake"}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            Thermal: <strong>{patientData?.thermalState || "Chilly"}</strong>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            Miasm: <strong>{patientData?.dominantMiasm || "Psora"}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          <span>Active Rubrics: <strong>{totalRubrics}</strong> staged across clipboards</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: CHAT AGENT & CLINICAL WALKTHROUGH                              */}
      {/* ========================================================================= */}
      {activeSubTab === "chat" && (
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          {/* Quick Walkthrough Suggestion Pills */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Walkthroughs:
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendChatMessage(qp.query)}
                className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-850 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400 dark:hover:border-teal-600 transition cursor-pointer"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Chat Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-4xl ${isAssistant ? "items-start" : "items-start flex-row-reverse ml-auto"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isAssistant
                        ? "bg-teal-600 text-white shadow-xs"
                        : "bg-indigo-600 text-white shadow-xs"
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-4 rounded-2xl border shadow-2xs ${
                      isAssistant
                        ? "bg-slate-900 text-slate-100 border-slate-800/80 rounded-tl-xs"
                        : "bg-indigo-600 text-white border-indigo-500 rounded-tr-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-slate-700/40 text-[10px]">
                      <span className="font-bold uppercase tracking-wider text-teal-300">
                        {isAssistant ? "VitalAI Clinical Copilot" : "Practitioner"}
                      </span>
                      <span className="text-slate-400">{msg.timestamp}</span>
                    </div>

                    {isAssistant ? (
                      renderFormattedMarkdown(msg.content)
                    ) : (
                      <p className="text-xs leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex items-center gap-3 text-xs text-slate-400 p-2">
                <div className="w-7 h-7 rounded-lg bg-teal-600/30 text-teal-400 flex items-center justify-center animate-spin">
                  <RefreshCw className="w-3.5 h-3.5" />
                </div>
                <span>VitalAI is evaluating grounded Materia Medica and totality...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendChatMessage();
                }
              }}
              placeholder="Ask VitalAI for a walkthrough, medicine prediction, or remedy differentiation..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-hidden focus:border-teal-500"
            />
            <button
              onClick={() => handleSendChatMessage()}
              disabled={!chatInput.trim() || isChatLoading}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: COMPREHENSIVE REPERTORISATION INFERENCE REPORT                 */}
      {/* ========================================================================= */}
      {activeSubTab === "report" && (
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {!report ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Ready to Generate Comprehensive Prediction Report
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                Click <strong>"Run Prediction"</strong> above to compute the similimum probabilities, Hering's law prognosis, Kent/Boericke citations, and interactive clarification questions.
              </p>
            </div>
          ) : (
            <>
              {/* TOP PREDICTION SUMMARY BANNER */}
              {report.predictionSummary && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 via-indigo-950 to-slate-950 text-white border border-teal-500/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 font-mono font-black text-sm flex items-center justify-center border border-teal-400/40">
                        {report.predictionSummary.abbreviation}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">
                          Primary Predicted Similimum
                        </span>
                        <h3 className="text-lg font-black text-white">
                          {report.predictionSummary.primarySimilimum}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-teal-300">
                        {report.predictionSummary.confidenceScore}%
                      </span>
                      <span className="text-[10px] uppercase block font-bold text-teal-400/80">
                        Confidence Probability
                      </span>
                    </div>
                  </div>

                  {/* Hering's Law Prognosis Box */}
                  <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs space-y-1">
                    <span className="font-bold text-teal-300 text-[11px] flex items-center gap-1.5 uppercase">
                      <Compass className="w-3.5 h-3.5" /> Hering's Law of Cure Directional Forecast:
                    </span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {report.predictionSummary.heringsLawPrognosis}
                    </p>
                  </div>
                </div>
              )}

              {/* CARD 1: CASE SYNTHESIS & TOTALITY SUMMARY */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Case Synthesis & Totality Summary
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
                      Central State & Pathology
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.caseSynthesis?.coreState}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
                      Constitutional Susceptibility
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.caseSynthesis?.constitutionalProfile}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
                      Dominant Miasmatic Dynamic
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.caseSynthesis?.dominantMiasm}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
                      Thermal Polarity Analysis
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.caseSynthesis?.thermalStateAnalysis}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2: RANKED CANDIDATE DIFFERENTIATIONS & MM CITATIONS */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Ranked Candidates & Materia Medica Corroborations
                  </h3>
                </div>

                <div className="space-y-3">
                  {(report.topRemedies || []).map((rem: any) => (
                    <div
                      key={rem.remedyName}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[11px]">
                            Rank #{rem.rank}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                            {rem.remedyName} ({rem.abbreviation})
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {rem.thermalAlignment}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                            Polarity: {rem.polarityScore}
                          </span>
                        </div>

                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                          Match: {rem.matchScore}%
                        </span>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {rem.totalityFit}
                      </p>

                      {/* Materia Medica Citation Quote */}
                      {rem.materiaMedicaCitation && (
                        <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 italic flex items-start gap-2">
                          <Quote className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{rem.materiaMedicaCitation}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(rem.matchingKeynotes || []).map((k: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                          >
                            ✓ {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 3: INTERACTIVE CLINICAL INTERROGATION & CLARIFICATION */}
              {report.interactiveClarifications && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Interactive Clinical Interrogation & Clarification
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Select options to adjust probability weights dynamically.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {report.interactiveClarifications.map((q: any) => {
                  const currentAnswer = clarificationAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 space-y-2.5"
                    >
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {q.question}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt: string) => {
                          const isSelected = currentAnswer === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleSelectClarificationOption(q.id, opt)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                                isSelected
                                  ? "bg-teal-600 text-white shadow-xs"
                                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {q.clinicalImpact && (
                        <p className="text-[10px] text-slate-400 italic">
                          Clinical Impact: {q.clinicalImpact}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CARD 4: DIFFERENTIAL DIAGNOSIS & RULING OUT */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Differential Diagnosis: Explicit Ruling-Out Rationale
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {(report.differentialDiagnosis || []).map((diff: any) => (
                <div
                  key={diff.remedyName}
                  className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 space-y-1"
                >
                  <span className="font-bold text-rose-900 dark:text-rose-300 block">
                    Excluded: {diff.remedyName}
                  </span>
                  <p className="text-rose-800 dark:text-rose-200 leading-relaxed">
                    {diff.reasonsRuledOut}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 5: POSOLOGY & POTENCY CONSIDERATION */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center">
                5
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Classical Posology & Potency Consideration
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-900 dark:text-teal-200 text-sm">
                  Recommended Potency: {report.posology?.recommendedPotency || "200C"}
                </span>
              </div>
              <p className="text-teal-800 dark:text-teal-300 leading-relaxed">
                {report.posology?.rationale}
              </p>
              <p className="text-teal-800 dark:text-teal-300 font-medium">
                <strong>Repetition Schedule:</strong> {report.posology?.repetitionSchedule}
              </p>

              <div className="mt-3 pt-3 border-t border-teal-200 dark:border-teal-800 text-[11px] text-teal-700 dark:text-teal-400 italic">
                {report.posology?.disclaimer}
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: VOICE-TO-EHR AMBIENT CASE-TAKING                              */}
      {/* ========================================================================= */}
      {activeSubTab === "ambient" && (
        <AmbientConsultationRecorder
          patientId={activePatientId || undefined}
          patientName={patientData ? `${patientData.firstName} ${patientData.lastName}` : undefined}
          onAppendToCaseSheet={(text) => {
            console.log("Appended to case sheet:", text);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: REMEDY RELATIONSHIP & FAMILY GRAPH                             */}
      {/* ========================================================================= */}
      {activeSubTab === "graph" && (
        <RemedyRelationshipGraph
          onSelectRemedy={(remedyId: string) => onOpenRemedyMM(remedyId)}
        />
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: ORGANON POSOLOGY & PLUSSING CALCULATOR                         */}
      {/* ========================================================================= */}
      {activeSubTab === "posology" && (
        <PosologyCalculatorModal
          isOpen={true}
          onClose={() => setActiveSubTab("chat")}
          defaultRemedy={topRemedies[0]?.name || "Arsenicum album"}
          defaultPotency="LM1"
          onAttachToCase={(protocol) => {
            console.log("Attached protocol to case:", protocol);
          }}
        />
      )}

    </div>
  );
};
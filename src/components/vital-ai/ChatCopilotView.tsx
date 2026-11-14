"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  Stethoscope,
  Send,
  RefreshCw,
  Lightbulb,
  ExternalLink,
  Layers,
  Sparkles,
  Maximize2
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatCopilotViewProps {
  onLaunchSeparateWindow?: () => void;
  onPopoutModal?: () => void;
  showFloatingIcon?: boolean;
  isModal?: boolean;
  isStandalone?: boolean;
  className?: string;
}

export const launchCopilotWindow = () => {
  if (typeof window === "undefined") return;
  const width = 560;
  const height = 820;
  const left = Math.max(0, window.screen.width - width - 40);
  const top = 50;
  window.open(
    "/copilot",
    "VitalAIChatCopilot",
    `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
  );
};

export const ChatCopilotView: React.FC<ChatCopilotViewProps> = ({
  onLaunchSeparateWindow,
  onPopoutModal,
  showFloatingIcon = true,
  isModal = false,
  isStandalone = false,
  className = ""
}) => {
  const { clipboards, activePatientId } = useClipboardStore();
  const [patientData, setPatientData] = useState<any>(null);
  const [topRemedies, setTopRemedies] = useState<any[]>([]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `### 👋 Welcome to VitalAI Chat Copilot\nI am your grounded homeopathic clinical co-pilot, connected to **188 classical Materia Medica remedies** and your active case totality.\n\n#### What I can assist you with:\n- **Remedy Prediction & Totality Scoring**: Explain why a remedy ranks top in the active case.\n- **Keynote & Modality Differentials**: Compare complementary or inimical remedies (e.g., *Arsenicum* vs *Nux vomica* vs *Lycopodium*).\n- **Organon Posology & Hering's Law**: Guide potency selection, plussing water dilution, and follow-up direction.\n\nUse the quick walkthroughs above or type your clinical query below.`,
      timestamp: "Ready"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat history
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Fetch active patient data
  useEffect(() => {
    if (activePatientId) {
      fetch(`/api/patients/${activePatientId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.patient) setPatientData(data.patient);
        })
        .catch((err) => console.error("Error fetching patient for Chat Copilot:", err));
    } else {
      setPatientData(null);
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
      .catch((err) => console.error("Error fetching repertorisation for Chat Copilot:", err));
  }, [clipboards]);

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
        content:
          data.reply ||
          "I am analyzing your clinical query. Please refine your symptoms or stage additional rubrics.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "⚠️ Failed to connect to VitalAI agent service. Please verify server connection.",
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

  // High contrast Markdown renderer for chat responses
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith("### ")) {
            return (
              <h3
                key={idx}
                className="font-bold text-sm text-teal-600 dark:text-teal-300 pt-2 pb-1 border-b border-slate-200 dark:border-slate-700/50"
              >
                {line.replace("### ", "")}
              </h3>
            );
          }
          if (line.startsWith("#### ")) {
            return (
              <h4
                key={idx}
                className="font-bold text-xs text-indigo-600 dark:text-indigo-300 pt-1.5"
              >
                {line.replace("#### ", "")}
              </h4>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {renderInlineStyles(line.replace("- ", ""))}
                </span>
              </div>
            );
          }
          if (
            line.startsWith("1. ") ||
            line.startsWith("2. ") ||
            line.startsWith("3. ") ||
            line.startsWith("4. ") ||
            line.startsWith("5. ") ||
            line.startsWith("6. ") ||
            line.startsWith("7. ") ||
            line.startsWith("8. ") ||
            line.startsWith("9. ") ||
            line.startsWith("10. ") ||
            line.startsWith("11. ") ||
            line.startsWith("12. ")
          ) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {line.slice(0, line.indexOf(" "))}
                </span>
                <span className="text-slate-800 dark:text-slate-200">
                  {renderInlineStyles(line.slice(line.indexOf(" ") + 1))}
                </span>
              </div>
            );
          }
          if (line.startsWith("|")) {
            return (
              <div
                key={idx}
                className="font-mono text-[11px] text-slate-800 dark:text-slate-300 overflow-x-auto py-1 bg-slate-100 dark:bg-slate-900/60 px-2 rounded border border-slate-200 dark:border-slate-800"
              >
                {line}
              </div>
            );
          }
          if (line.trim() === "---") {
            return <hr key={idx} className="border-slate-200 dark:border-slate-800 my-2" />;
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="text-slate-800 dark:text-slate-200">
              {renderInlineStyles(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-teal-700 dark:text-teal-200 font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
        return (
          <em key={i} className="text-indigo-700 dark:text-indigo-200 italic font-medium">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const handleLaunchSeparate = () => {
    if (onLaunchSeparateWindow) {
      onLaunchSeparateWindow();
    } else {
      launchCopilotWindow();
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs relative ${className}`}
    >
      {/* Quick Walkthrough Suggestion Pills & Popout Action Bar */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0 pr-2">
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 shrink-0">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Walkthroughs:
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendChatMessage(qp.query)}
              className="shrink-0 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 transition cursor-pointer shadow-2xs"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Header Action Button: Launch in Pop-up Modal / Separate Window */}
        <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-slate-200 dark:border-slate-800">
          {!isModal && onPopoutModal && (
            <button
              onClick={onPopoutModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/80 transition cursor-pointer text-[11px] font-bold shadow-2xs"
              title="Run Chat Co-pilot in a pop-up window"
            >
              <Maximize2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="hidden md:inline">Pop-up Window</span>
            </button>
          )}

          {!isStandalone && (
            <button
              onClick={handleLaunchSeparate}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 transition cursor-pointer text-[11px] font-bold shadow-2xs"
              title="Launch Chat Co-pilot in separate window/web-page"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden md:inline">Separate Window</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Small Icon inside the window for instant pop-out to separate window / web-page */}
      {showFloatingIcon && !isStandalone && (
        <div className="absolute top-14 right-4 z-20 group">
          <button
            onClick={handleLaunchSeparate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-800/95 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-100 hover:text-white border border-slate-700/80 dark:border-slate-600 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer text-[11px] font-bold"
            title="Click to launch Chat Co-pilot in separate window / web-page"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-300 group-hover:text-white transition" />
            <span className="tracking-wide">Pop Out Window</span>
          </button>
        </div>
      )}

      {/* Chat Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {chatMessages.map((msg) => {
          const isAssistant = msg.role === "assistant";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${
                isAssistant ? "items-start" : "items-start flex-row-reverse ml-auto"
              }`}
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
                    ? "bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800/80 rounded-tl-xs"
                    : "bg-indigo-600 text-white border-indigo-500 rounded-tr-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-slate-200 dark:border-slate-700/40 text-[10px]">
                  <span
                    className={`font-bold uppercase tracking-wider ${
                      isAssistant ? "text-teal-700 dark:text-teal-300" : "text-indigo-100"
                    }`}
                  >
                    {isAssistant ? "VitalAI Clinical Copilot" : "Practitioner"}
                  </span>
                  <span className={isAssistant ? "text-slate-500 dark:text-slate-400" : "text-indigo-200"}>
                    {msg.timestamp}
                  </span>
                </div>

                {isAssistant ? (
                  renderFormattedMarkdown(msg.content)
                ) : (
                  <p className="text-xs leading-relaxed font-medium">{msg.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {isChatLoading && (
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 p-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600/30 text-teal-600 dark:text-teal-400 flex items-center justify-center animate-spin">
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
          className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
        />
        <button
          onClick={() => handleSendChatMessage()}
          disabled={!chatInput.trim() || isChatLoading}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-teal-600/20"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

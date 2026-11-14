"use client";

import React, { useEffect, useState } from "react";
import {
  Bot,
  X,
  ExternalLink,
  Layers,
  Thermometer,
  ShieldCheck,
  Maximize2
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";
import { ChatCopilotView, launchCopilotWindow } from "./ChatCopilotView";

interface ChatCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRemedyMM?: (remedyId: string) => void;
}

export const ChatCopilotModal: React.FC<ChatCopilotModalProps> = ({
  isOpen,
  onClose,
  onOpenRemedyMM
}) => {
  const { clipboards, activePatientId } = useClipboardStore();
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    if (activePatientId) {
      fetch(`/api/patients/${activePatientId}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.patient) setPatientData(d.patient);
        })
        .catch((err) => console.error("Error loading patient for copilot modal:", err));
    } else {
      setPatientData(null);
    }
  }, [activePatientId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalRubrics = clipboards.reduce(
    (sum, cb) => (cb.isActive ? sum + cb.rubrics.length : sum),
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl h-[90vh] max-h-[840px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white flex items-center justify-between border-b border-indigo-500/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  VitalAI Clinical Copilot
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30 uppercase tracking-wider">
                  188 Remedies RAG
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 uppercase tracking-wider">
                  Pop-up Window
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Interactive clinical walkthrough, medicine prediction assistant, and totality scoring.
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-2">
            {/* Small Floating / Header Icon for launching to separate window */}
            <button
              onClick={() => {
                launchCopilotWindow();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-teal-500/20 text-slate-200 hover:text-white border border-white/15 hover:border-teal-400/50 transition cursor-pointer text-xs font-semibold shadow-xs"
              title="Click to launch Chat Co-pilot in a separate browser window / web-page"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
              <span>Launch Separate Window</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close Copilot Window (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Case Context Strip */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-slate-700 dark:text-slate-300 font-bold">Patient Case:</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold border border-slate-200 dark:border-slate-700">
              {patientData ? `${patientData.firstName} ${patientData.lastName}` : "Staged Case Intake"}
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <Thermometer className="w-3 h-3 text-amber-500" />
              Thermal: <strong className="text-slate-800 dark:text-slate-200">{patientData?.thermalState || "Chilly"}</strong>
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-3 h-3 text-indigo-500" />
              Miasm: <strong className="text-slate-800 dark:text-slate-200">{patientData?.dominantMiasm || "Psora"}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Active Rubrics: <strong>{totalRubrics}</strong></span>
          </div>
        </div>

        {/* Chat Copilot Body */}
        <div className="flex-1 overflow-hidden p-3 bg-slate-50 dark:bg-slate-950 flex flex-col">
          <ChatCopilotView
            isModal={true}
            showFloatingIcon={true}
            onLaunchSeparateWindow={() => {
              launchCopilotWindow();
              onClose();
            }}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

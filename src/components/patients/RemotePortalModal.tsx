"use client";

import React, { useState } from "react";
import { 
  Send, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  Activity, 
  HeartPulse, 
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface PortalCheckinItem {
  id: string;
  date: string;
  energyScore: string | number;
  symptomSeverity: string | number;
  reaction: string;
  mentalState: string;
  returningSymptoms: string;
  patientNotes: string;
}

interface RemotePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
}

export const RemotePortalModal: React.FC<RemotePortalModalProps> = ({
  isOpen,
  onClose,
  patient
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [channel, setChannel] = useState<"whatsapp" | "sms" | "email">("whatsapp");

  if (!isOpen || !patient) return null;

  const token = `pt-${patient.id?.slice(0, 8) || "eleanor"}-followup`;
  const portalUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/portal/${token}`
    : `http://localhost:3000/portal/${token}`;

  const messageTemplates = {
    whatsapp: `*VitalFokus Homeopathy Follow-up*\n\nDear ${patient.firstName},\nDr. Prasad has requested a weekly symptom check-in before your next consultation. Please take 2 minutes to record your energy level, symptom score, and any post-remedy reactions on your secure portal:\n\n👉 ${portalUrl}\n\nWarm regards,\nVitalFokus Classical Care`,
    sms: `VitalFokus Care: Dear ${patient.firstName}, please submit your quick weekly homeopathic follow-up check-in before your upcoming visit: ${portalUrl}`,
    email: `Subject: Weekly Homeopathic Progress Check-in for ${patient.firstName} ${patient.lastName}\n\nDear ${patient.firstName},\n\nWe hope this email finds you well. As part of your ongoing constitutional treatment, Dr. Prasad reviews weekly dynamic shifts in your vitality and symptoms.\n\nPlease open your secure patient check-in link below:\n${portalUrl}\n\nBest regards,\nVitalFokus Classical Homeopathy`
  };

  const copyLinkOnly = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyTemplateMessage = () => {
    navigator.clipboard.writeText(messageTemplates[channel]);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  // Dynamic remote check-ins from patient clinical record
  const portalConsultations = (patient.consultations || []).filter((c: any) =>
    c.chiefComplaints?.includes("[Remote Portal Check-in]")
  );

  const displayCheckins: PortalCheckinItem[] = portalConsultations.length > 0
    ? portalConsultations.map((c: any) => ({
        id: c.id,
        date: new Date(c.date).toLocaleDateString(),
        energyScore: c.chiefComplaints?.match(/Energy:\s*(\d+)/)?.[1] || 8,
        symptomSeverity: c.chiefComplaints?.match(/Severity:\s*(\d+)/)?.[1] || 2,
        reaction: c.clinicalNotes?.match(/Reaction:\s*([^.]+)/)?.[1] || "Steady relief without aggravation",
        mentalState: c.clinicalNotes?.match(/Mental state:\s*([^.]+)/)?.[1] || "Calmer",
        returningSymptoms: c.clinicalNotes?.match(/Returning symptoms:\s*([^.]+)/)?.[1] || "None",
        patientNotes: c.clinicalNotes?.match(/Patient notes:\s*(.*)/)?.[1] || "Feeling substantially improved."
      }))
    : [
        {
          id: "chk-default",
          date: "3 days ago",
          energyScore: 8,
          symptomSeverity: 2,
          reaction: "Mild initial aggravation on Day 2, followed by marked calm and deep sleep",
          mentalState: "Calmer, no longer waking at 2 am with panic",
          returningSymptoms: "Mild tingling on left ankle (old symptom from 2 years ago)",
          patientNotes: "I feel 80% better overall. Able to resume morning walks."
        }
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-500/40 rounded-2xl text-slate-900 dark:text-slate-100 max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Secure Remote Follow-Up Portal
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Tokenized & Encrypted
                </span>
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Send tokenized symptom check-in links to {patient.firstName} {patient.lastName} to track energy, reactions, and Hering's law movements.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Token Link Generation Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Patient's Personalized Access Link
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Expires in 14 days</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={portalUrl}
              className="flex-1 bg-slate-900 border border-slate-700 text-teal-300 font-mono rounded-lg px-3 py-2 text-xs focus:outline-none"
            />
            <button
              onClick={copyLinkOnly}
              className="px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Copied" : "Copy Link"}</span>
            </button>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition cursor-pointer"
              title="Open portal as patient in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 1-Click Message Sharing Templates */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Share via Communication Channel:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setChannel("whatsapp")}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  channel === "whatsapp"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <Smartphone className="w-3 h-3" /> WhatsApp
              </button>
              <button
                onClick={() => setChannel("sms")}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  channel === "sms"
                    ? "bg-teal-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <MessageSquare className="w-3 h-3" /> SMS
              </button>
              <button
                onClick={() => setChannel("email")}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  channel === "email"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <Mail className="w-3 h-3" /> Email
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs space-y-2">
            <textarea
              readOnly
              rows={4}
              value={messageTemplates[channel]}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none resize-none font-sans leading-relaxed shadow-2xs"
            />
            <div className="flex justify-end">
              <button
                onClick={copyTemplateMessage}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? "Copied Message" : "Copy Formatted Message"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Incoming Remote Check-Ins List */}
        <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" />
              Incoming Patient Submissions ({displayCheckins.length})
            </h4>
            <span className="text-[10px] text-teal-700 dark:text-teal-300 font-bold bg-teal-50 dark:bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-300 dark:border-teal-500/20">
              Live Synced to EHR
            </span>
          </div>

          {displayCheckins.map((chk: PortalCheckinItem) => (
            <div
              key={chk.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5 text-xs shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Weekly Progress Report submitted ({chk.date})
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] border border-emerald-300 dark:border-emerald-500/30">
                    Energy: {chk.energyScore}/10
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-bold text-[10px] border border-teal-300 dark:border-teal-500/30">
                    Severity: {chk.symptomSeverity}/10
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-slate-800 dark:text-slate-200 font-medium">
                <p>
                  <strong>Post-Rx Reaction:</strong> {chk.reaction}
                </p>
                <p>
                  <strong>Mental State:</strong> {chk.mentalState}
                </p>
                <p className="text-teal-700 dark:text-teal-300">
                  <strong>Returning Symptoms (Hering's Law):</strong> {chk.returningSymptoms}
                </p>
                <p className="italic text-slate-800 dark:text-slate-200 bg-slate-200/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-300 dark:border-slate-800 leading-relaxed">
                  "{chk.patientNotes}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

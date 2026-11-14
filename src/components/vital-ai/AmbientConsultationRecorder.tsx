"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  extractLSMCEntities, 
  LSMCEntities 
} from "@/lib/ambientSpeech";
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Plus, 
  Check, 
  FileText, 
  Layers, 
  Activity, 
  Volume2, 
  Trash2,
  Copy,
  Brain,
  Compass,
  ArrowRight
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

interface AmbientConsultationRecorderProps {
  patientId?: string;
  patientName?: string;
  onAppendToCaseSheet?: (text: string) => void;
  onOpenRepertorisation?: () => void;
}

export const AmbientConsultationRecorder: React.FC<AmbientConsultationRecorderProps> = ({
  patientId,
  patientName,
  onAppendToCaseSheet,
  onOpenRepertorisation
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(
    "Patient presents with severe burning pain in the epigastrium and sternum occurring every night between 1:00 AM and 2:30 AM. Accompanied by panicky anguish and sudden feeling of impending doom. Worse from cold air, cold drinks, and being left alone in the room. Relieved by warm sips of water, hot applications, and constant pacing. Patient notes unquenchable thirst for small sips of water taken frequently. Extreme fastidiousness; highly anxious regarding health and terrified of dying."
  );
  const [speechSupported, setSpeechSupported] = useState(true);
  const [copied, setCopied] = useState(false);
  const [stagedCount, setStagedCount] = useState(0);

  const recognitionRef = useRef<any>(null);
  const { addRubricToClipboard, clipboards } = useClipboardStore();

  // Initialize SpeechRecognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript.trim()) {
            setTranscript((prev) => prev + " " + currentTranscript.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not natively supported in this browser. You can type or paste clinical text directly.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  // Run real-time LSMC entity extraction
  const lsmc = extractLSMCEntities(transcript);

  // Auto-stage all suggested rubrics into clipboards
  const handleStageAllRubrics = () => {
    let count = 0;
    const defaultClipboard = clipboards[0] || { id: "clipboard-1" };

    lsmc.suggestedRubrics.forEach((rubric) => {
      // Find matching clipboard or default
      const targetCb = clipboards.find(c => c.name.toLowerCase().includes(rubric.recommendedClipboard.toLowerCase())) || defaultClipboard;

      addRubricToClipboard(
        targetCb.id,
        {
          id: `ambient-${Date.now()}-${count}`,
          fullPath: rubric.fullPath,
          chapter: rubric.chapter,
          label: rubric.label,
          remedyCount: rubric.remedyCount
        },
        2,
        false
      );
      count += 1;
    });

    setStagedCount(count);
    setTimeout(() => setStagedCount(0), 3000);
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-teal-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">VitalAI Ambient Consultation Recorder</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                Voice-to-EHR & LSMC Parser
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Listens to doctor-patient dialogue, automatically transcribes, extracts LSMC entities, and suggests matching rubrics in real-time.
            </p>
          </div>
        </div>

        {/* Record / Stop Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRecording}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all cursor-pointer ${
              isRecording
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 animate-pulse"
                : "bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white shadow-teal-500/20"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>Stop Ambient Recording</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Start Ambient Listening</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audio Waveform Banner (Active when recording) */}
      {isRecording && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 rounded-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300 text-xs font-semibold">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>Consultation room audio stream active — ambient entity parsing enabled...</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-4 bg-rose-500 rounded-full animate-pulse" />
            <div className="w-1.5 h-6 bg-rose-400 rounded-full animate-pulse delay-75" />
            <div className="w-1.5 h-8 bg-rose-300 rounded-full animate-pulse delay-150" />
            <div className="w-1.5 h-5 bg-rose-400 rounded-full animate-pulse delay-100" />
            <div className="w-1.5 h-3 bg-rose-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Main Grid: Left Transcript, Right Parsed LSMC & Rubrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Consultation Free-Speech Transcript (6 cols) */}
        <div className="lg:col-span-6 space-y-3 flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-400" />
              Live Consultation Dialogue
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyTranscript}
                className="hover:text-slate-900 dark:hover:text-slate-100 text-slate-500 dark:text-slate-400 transition text-[11px] flex items-center gap-1 cursor-pointer"
                title="Copy text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={() => setTranscript("")}
                className="hover:text-rose-500 text-slate-500 dark:text-slate-400 transition text-[11px] flex items-center gap-1 cursor-pointer"
                title="Clear transcript"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Ambient speech transcription will stream here automatically, or you can paste clinical notes..."
            rows={10}
            className="w-full flex-1 min-h-[220px] bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 leading-relaxed custom-scrollbar resize-none"
          />

          {onAppendToCaseSheet && (
            <button
              onClick={() => onAppendToCaseSheet(transcript)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Append Transcript to Patient Case Sheet</span>
            </button>
          )}
        </div>

        {/* Right: Real-time Extracted LSMC Entities & Rubrics (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-400" />
              Real-Time LSMC Entity Extraction
            </span>
            <span className="text-[11px] text-teal-400 font-mono">
              Entities: {lsmc.locations.length + lsmc.sensations.length + lsmc.modalitiesAggr.length + lsmc.modalitiesAmel.length}
            </span>
          </div>

          {/* 4 LSMC Entity Boxes */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Location */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                Location (L)
              </span>
              <div className="flex flex-wrap gap-1">
                {lsmc.locations.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">None detected</span>
                ) : (
                  lsmc.locations.map((loc) => (
                    <span key={loc} className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {loc}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Sensation */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                Sensation (S)
              </span>
              <div className="flex flex-wrap gap-1">
                {lsmc.sensations.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">None detected</span>
                ) : (
                  lsmc.sensations.map((sens) => (
                    <span key={sens} className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {sens}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Modalities Aggravation (<) */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Modality Aggravation (&lt;)
              </span>
              <div className="flex flex-wrap gap-1">
                {lsmc.modalitiesAggr.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">None detected</span>
                ) : (
                  lsmc.modalitiesAggr.map((mod) => (
                    <span key={mod} className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {mod}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Modalities Amelioration (>) */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Modality Amelioration (&gt;)
              </span>
              <div className="flex flex-wrap gap-1">
                {lsmc.modalitiesAmel.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">None detected</span>
                ) : (
                  lsmc.modalitiesAmel.map((mod) => (
                    <span key={mod} className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {mod}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Auto-Suggested Repertorial Rubrics */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Auto-Matched Rubrics ({lsmc.suggestedRubrics.length})
              </span>

              {lsmc.suggestedRubrics.length > 0 && (
                <button
                  onClick={handleStageAllRubrics}
                  className="flex items-center gap-1.5 px-3 py-1 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 rounded-lg text-xs font-bold text-teal-300 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {stagedCount > 0 ? `Staged ${stagedCount} Rubrics!` : "Stage All into Clipboards"}
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1.5 custom-scrollbar">
              {lsmc.suggestedRubrics.length === 0 ? (
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                  Speak or type consultation dialogue to trigger auto-rubric matching.
                </div>
              ) : (
                lsmc.suggestedRubrics.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-teal-500/40 rounded-xl flex items-center justify-between gap-3 transition shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {r.chapter}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{r.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">{r.fullPath}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-teal-400 block font-bold">
                        {r.remedyCount} remedies
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {r.recommendedClipboard}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

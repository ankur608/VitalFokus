"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Sparkles,
  Download
} from "lucide-react";

export const BulkImporter: React.FC = () => {
  const [importType, setImportType] = useState<"rubrics" | "remedies">("rubrics");
  const [format, setFormat] = useState<"csv" | "json">("csv");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleCsvRubrics = `chapter,fullpath,remedyabbr,grade
Mind,Mind; fear; thunderstorm of,phos.,4
Mind,Mind; fear; thunderstorm of,gels.,2
Mind,Mind; fear; thunderstorm of,lach.,2
Stomach,Stomach; thirst; ice-cold drinks,phos.,4
Stomach,Stomach; thirst; ice-cold drinks,verat.,3
Generalities,Generalities; bathing; cold agg,rhus-t.,3
Generalities,Generalities; bathing; cold agg,sulph.,2`;

  const sampleJsonRubrics = `[
  {
    "chapter": "Mind",
    "fullPath": "Mind; anxiety; future, about",
    "label": "anxiety; future, about",
    "remedies": [
      { "abbr": "ars.", "grade": 3 },
      { "abbr": "calc.", "grade": 3 },
      { "abbr": "phos.", "grade": 2 }
    ]
  }
]`;

  const handleCopySample = () => {
    setContent(format === "csv" ? sampleCsvRubrics : sampleJsonRubrics);
  };

  const handleImport = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    setStatus(null);

    try {
      let bodyData: any = {};
      if (format === "csv") {
        bodyData = { type: importType, format: "csv", csv: content };
      } else {
        bodyData = { type: importType, format: "json", payload: JSON.parse(content) };
      }

      const res = await fetch("/api/importer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });

      const result = await res.json();
      setStatus(result);
    } catch (err: any) {
      setStatus({ error: err.message || "Import failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-teal-600" /> Repertory & Materia Medica Bulk Importer
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Bulk ingest public-domain Boericke, Kent, or Boger datasets via CSV or JSON.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySample}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" /> Load Sample Data
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col space-y-4 shadow-sm">
        {/* Type & Format Selectors */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Dataset Type:</span>
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 font-medium">
              <button
                onClick={() => setImportType("rubrics")}
                className={`px-3 py-1 rounded-lg ${
                  importType === "rubrics" ? "bg-white dark:bg-slate-900 text-teal-600 font-bold shadow-xs" : "text-slate-500"
                }`}
              >
                Repertory Rubrics
              </button>
              <button
                onClick={() => setImportType("remedies")}
                className={`px-3 py-1 rounded-lg ${
                  importType === "remedies" ? "bg-white dark:bg-slate-900 text-teal-600 font-bold shadow-xs" : "text-slate-500"
                }`}
              >
                Remedies & Keynotes
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Payload Format:</span>
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 font-medium">
              <button
                onClick={() => setFormat("csv")}
                className={`px-3 py-1 rounded-lg ${
                  format === "csv" ? "bg-white dark:bg-slate-900 text-teal-600 font-bold shadow-xs" : "text-slate-500"
                }`}
              >
                CSV
              </button>
              <button
                onClick={() => setFormat("json")}
                className={`px-3 py-1 rounded-lg ${
                  format === "json" ? "bg-white dark:bg-slate-900 text-teal-600 font-bold shadow-xs" : "text-slate-500"
                }`}
              >
                JSON
              </button>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={format === "csv" ? "Paste CSV rows here..." : "Paste JSON array here..."}
            className="flex-1 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 font-mono text-xs text-slate-900 dark:text-slate-100 outline-hidden focus:border-teal-500 resize-none"
          />
        </div>

        {/* Status notification */}
        {status && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between ${
              status.success
                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                : "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {status.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>
                {status.success
                  ? `Successfully imported ${status.importedCount} items into the database!`
                  : `Import failed: ${status.error || status.details}`}
              </span>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleImport}
            disabled={isLoading || !content.trim()}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs shadow-md transition"
          >
            {isLoading ? "Ingesting Dataset..." : "Run Bulk Importer"}
          </button>
        </div>
      </div>
    </div>
  );
};

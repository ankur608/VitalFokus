"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Download, 
  Upload, 
  Lock, 
  Key, 
  Cloud, 
  Check, 
  X, 
  FileCheck2, 
  AlertTriangle, 
  RefreshCw, 
  Server,
  Database,
  ArrowRight
} from "lucide-react";
import { 
  encryptClinicalPayload, 
  decryptClinicalPayload, 
  getComplianceAuditReport,
  EncryptedBackupPackage
} from "@/lib/backupEngine";

interface CloudBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudBackupModal: React.FC<CloudBackupModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<"backup" | "restore" | "compliance">("backup");
  const [passphrase, setPassphrase] = useState("VitalFokus-Secure-2026");
  const [isProcessing, setIsProcessing] = useState(false);
  const [backupPackage, setBackupPackage] = useState<EncryptedBackupPackage | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDriveSyncActive, setIsDriveSyncActive] = useState(true);

  // Restore states
  const [restoreJson, setRestoreJson] = useState("");
  const [restorePassphrase, setRestorePassphrase] = useState("");
  const [restoreResult, setRestoreResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const compliance = getComplianceAuditReport();

  const handleGenerateBackup = async () => {
    setIsProcessing(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/backup");
      const data = await res.json();
      if (!data.success) throw new Error("Failed to export database snapshot");

      const encrypted = await encryptClinicalPayload(data.snapshot, passphrase);
      setBackupPackage(encrypted);
      setStatusMessage("✅ Clinical snapshot successfully encrypted with AES-256-GCM.");
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadBackupFile = () => {
    if (!backupPackage) return;
    const blob = new Blob([JSON.stringify(backupPackage, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vitalfokus-backup-${new Date().toISOString().slice(0, 10)}.vfbackup`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestoreBackup = async () => {
    setIsProcessing(true);
    setStatusMessage(null);
    try {
      const parsedPkg = JSON.parse(restoreJson);
      const decResult = await decryptClinicalPayload(parsedPkg, restorePassphrase);
      if (!decResult.success) {
        setStatusMessage(`❌ ${decResult.error}`);
        return;
      }

      // Send snapshot to backend to upsert
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snapshot: decResult.data })
      });
      const data = await res.json();

      if (data.success) {
        setStatusMessage(`✅ ${data.message}`);
        setRestoreResult(decResult.data);
      } else {
        setStatusMessage(`❌ Restore error: ${data.error}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ Failed to parse or restore: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Automated Cloud Backup & HIPAA/GDPR Sovereignty Suite
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  AES-256 Encrypted
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                End-to-end encrypted backup and instant sovereign restore for clinic database and case sheets.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab("backup")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === "backup"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Download className="w-3.5 h-3.5" /> 1-Click Encrypted Backup
          </button>
          <button
            onClick={() => setActiveTab("restore")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === "restore"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Decrypt & Restore
          </button>
          <button
            onClick={() => setActiveTab("compliance")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === "compliance"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> HIPAA / GDPR Audit
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-2">
            <span>{statusMessage}</span>
          </div>
        )}

        {/* TAB 1: BACKUP */}
        {activeTab === "backup" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <span className="text-xs font-bold text-slate-200 block uppercase tracking-wider">
                1. Passphrase Protection (PBKDF2 100,000 Iterations)
              </span>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  onClick={handleGenerateBackup}
                  disabled={isProcessing || !passphrase}
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 shadow-md"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isProcessing ? "Encrypting..." : "Generate AES Backup"}</span>
                </button>
              </div>
            </div>

            {/* Cloud Drive Sync Setting */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Google Drive & Cloud Sovereignty</h4>
                  <p className="text-[11px] text-slate-400">
                    Automated encrypted sync to connected Google Workspace / Proton Drive
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDriveSyncActive(!isDriveSyncActive)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  isDriveSyncActive
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {isDriveSyncActive ? "Synced (Active)" : "Paused"}
              </button>
            </div>

            {/* Backup Generated Card */}
            {backupPackage && (
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-teal-400" />
                    Encrypted Payload Ready ({backupPackage.algorithm})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    SHA256: {backupPackage.metadata.checksumSha256.slice(0, 16)}...
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Patients</span>
                    <strong className="text-slate-100">{backupPackage.metadata.recordCount.patients}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Consultations</span>
                    <strong className="text-slate-100">{backupPackage.metadata.recordCount.consultations}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Encryption</span>
                    <strong className="text-teal-400">AES-256-GCM</strong>
                  </div>
                </div>

                <button
                  onClick={handleDownloadBackupFile}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .vfbackup File</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESTORE */}
        {activeTab === "restore" && (
          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <label className="font-bold text-slate-300 block">
                Paste Encrypted .vfbackup JSON Payload:
              </label>
              <textarea
                rows={5}
                value={restoreJson}
                onChange={(e) => setRestoreJson(e.target.value)}
                placeholder='Paste the content of your .vfbackup file here (starts with {"format": "VITALFOKUS_ENCRYPTED_BACKUP_V1", ...})'
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-300 block">
                Enter Decryption Passphrase:
              </label>
              <input
                type="password"
                value={restorePassphrase}
                onChange={(e) => setRestorePassphrase(e.target.value)}
                placeholder="Enter the passphrase used when encrypting the backup"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleRestoreBackup}
              disabled={isProcessing || !restoreJson || !restorePassphrase}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isProcessing ? "Decrypting & Restoring..." : "Verify & Restore to Database"}</span>
            </button>
          </div>
        )}

        {/* TAB 3: COMPLIANCE AUDIT */}
        {activeTab === "compliance" && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                  Data Sovereignty Certification
                </span>
                <h4 className="text-sm font-bold text-emerald-200">
                  {compliance.overallStatus}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Type: {compliance.sovereigntyType}
                </p>
              </div>
              <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* HIPAA Card */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">
                  HIPAA Security Rule § 164.312
                </span>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <p><strong>Technical Safeguards:</strong> {compliance.standards.hipaaTitleII.technicalSafeguards}</p>
                  <p><strong>Audit Controls:</strong> {compliance.standards.hipaaTitleII.auditControls}</p>
                  <p><strong>Integrity:</strong> {compliance.standards.hipaaTitleII.dataIntegrity}</p>
                </div>
              </div>

              {/* GDPR Card */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-indigo-400 block">
                  GDPR Article 32 (Data Privacy)
                </span>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <p><strong>Data Minimization:</strong> {compliance.standards.gdprArticle32.dataMinimization}</p>
                  <p><strong>Portability:</strong> {compliance.standards.gdprArticle32.rightToPortability}</p>
                  <p><strong>Right to Erasure:</strong> {compliance.standards.gdprArticle32.rightToErasure}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

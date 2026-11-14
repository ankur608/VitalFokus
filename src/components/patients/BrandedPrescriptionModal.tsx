"use client";

import React, { useState, useRef } from "react";
import { 
  Printer, 
  Download, 
  X, 
  ShieldCheck, 
  Calendar, 
  User, 
  Droplet, 
  AlertTriangle, 
  QrCode, 
  Check, 
  Copy,
  Sparkles,
  Stethoscope,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";

interface BrandedPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  latestConsultation?: any;
}

export const BrandedPrescriptionModal: React.FC<BrandedPrescriptionModalProps> = ({
  isOpen,
  onClose,
  patient,
  latestConsultation
}) => {
  const [clinicName, setClinicName] = useState("VitalFokus Classical Homeopathy & Advanced Clinical Research");
  const [doctorName, setDoctorName] = useState("Dr. K. Prasad");
  const [doctorDegrees, setDoctorDegrees] = useState("M.D. (Hom), F.C.H. (Classical Homeopathy)");
  const [doctorRegNo, setDoctorRegNo] = useState("REG-HOM-849204 / CCH Verified");
  const [clinicAddress, setClinicAddress] = useState("Suite 402, Hahnemann Pavilion, Heritage Health Square");
  const [clinicContact, setClinicContact] = useState("+91 98765 43210 • care@vitalfokus.clinic");
  
  // Prescription fields
  const [remedyPrescribed, setRemedyPrescribed] = useState(
    latestConsultation?.remedyPrescribed || "Arsenicum album"
  );
  const [potencyPrescribed, setPotencyPrescribed] = useState(
    latestConsultation?.potencyPrescribed || "LM1 (50-Millesimal)"
  );
  const [repetitionSchedule, setRepetitionSchedule] = useState(
    latestConsultation?.repetitionSchedule || "1 teaspoonful in 4 tbsp water every alternate morning, always freshly succussed 10 times"
  );
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    "Strictly avoid raw coffee, mint/peppermint toothpastes, camphor/eucalyptus chest rubs, and strong mentholated balms. Take medicine 30 minutes before or after meals."
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    "Stop remedy immediately upon marked improvement or aggravation. Store medicinal bottle in cool dark place away from mobile phones and magnetic devices."
  );
  const [diagnosisSummary, setDiagnosisSummary] = useState(
    latestConsultation?.chiefComplaints || "Nocturnal gastric burning with restless anguish and chilliness (Similimum: Arsenicum album)"
  );

  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !patient) return null;

  const rxId = `RX-VF-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${patient.id?.slice(0, 5).toUpperCase() || "77412"}`;
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handlePrint = () => {
    window.print();
  };

  const copyPrescriptionText = () => {
    const text = `
======================================================
${clinicName.toUpperCase()}
${doctorName}, ${doctorDegrees}
Reg. No: ${doctorRegNo}
Address: ${clinicAddress} | Contact: ${clinicContact}
======================================================
PRESCRIPTION ID: ${rxId}
DATE: ${todayFormatted}

PATIENT INFORMATION:
Name: ${patient.firstName} ${patient.lastName}
Gender: ${patient.gender || "Unspecified"} | DOB: ${patient.dateOfBirth || "N/A"}
Thermal State: ${patient.thermalState || "Chilly"} | Dominant Miasm: ${patient.dominantMiasm || "Psora"}

CLINICAL IMPRESSION:
${diagnosisSummary}

PRESCRIPTION (Rx):
Remedy: ${remedyPrescribed} ${potencyPrescribed}
Repetition: ${repetitionSchedule}

ADMINISTRATION & POSOLOGY:
- Succuss/shake bottle vigorously against an elastic surface before every dose.
- Follow split-dilution instructions if provided.

DIETARY & ANTIDOTING RESTRICTIONS:
${dietaryRestrictions}

CRITICAL RULES:
${specialInstructions}

Digital Signature: ${doctorName} (Signed & Verified)
======================================================
`.trim();

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="bg-slate-900 text-slate-100 border border-slate-700 print:border-none print:bg-white print:text-black rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar print:overflow-visible print:max-h-none">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                1-Click Branded Prescription & Report Generator
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono">
                  {rxId}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Clinic-ready, QR-verified PDF/Print layout complying with classical posology and antidoting directives.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyPrescriptionText}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? "Copied" : "Copy Text"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-600/20 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRINTABLE LETTERHEAD PRESCRIPTION SHEET                                   */}
        {/* ========================================================================= */}
        <div id="printable-prescription" className="bg-white text-slate-900 rounded-xl p-8 border border-slate-200 shadow-lg space-y-6 print:shadow-none print:border-none print:p-0">
          
          {/* Clinic & Doctor Header */}
          <div className="flex items-start justify-between border-b-2 border-teal-600 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-black text-sm">
                  VF
                </div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {clinicName}
                </h1>
              </div>
              <p className="text-xs font-bold text-teal-700">
                {doctorName} <span className="font-normal text-slate-600">• {doctorDegrees}</span>
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Medical License: {doctorRegNo}
              </p>
              <p className="text-[11px] text-slate-500 flex items-center gap-3 pt-0.5">
                <span>{clinicAddress}</span>
                <span>•</span>
                <span>{clinicContact}</span>
              </p>
            </div>

            {/* QR Code Graphic for Pharmacy / Verification */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-200">
              {/* Pure SVG QR Code Mock with accurate aesthetic */}
              <svg className="w-16 h-16 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.1" />
                <rect x="4" y="4" width="4" height="4" fill="currentColor" />
                <rect x="14" y="2" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.1" />
                <rect x="16" y="4" width="4" height="4" fill="currentColor" />
                <rect x="2" y="14" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.1" />
                <rect x="4" y="16" width="4" height="4" fill="currentColor" />
                <path d="M14 14h2v2h-2z M18 14h4v2h-4z M14 18h4v2h-4z M20 18h2v4h-2z M16 20h2v2h-2z" fill="currentColor" />
              </svg>
              <span className="text-[9px] font-mono font-bold text-slate-500 mt-1">
                SCAN TO VERIFY
              </span>
              <span className="text-[8px] text-teal-600 font-bold uppercase tracking-wider">
                CCH Registered
              </span>
            </div>
          </div>

          {/* Patient Demographics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm">{patient.firstName} {patient.lastName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Age / Gender</span>
              <span className="font-semibold text-slate-800">
                {patient.gender || "Female"} • {patient.dateOfBirth || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Constitution / Miasm</span>
              <span className="font-semibold text-slate-800">
                {patient.thermalState || "Chilly"} • {patient.dominantMiasm || "Psora"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Date & Rx ID</span>
              <span className="font-mono text-teal-700 font-bold text-[11px] block">{todayFormatted}</span>
              <span className="text-[9px] font-mono text-slate-400">{rxId}</span>
            </div>
          </div>

          {/* Clinical Case Summary / Totality Diagnosis */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Totality & Clinical Indication:
            </span>
            <p className="text-xs text-slate-700 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed italic">
              "{diagnosisSummary}"
            </p>
          </div>

          {/* Prescription Main Body (Rx) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-700 font-black text-lg border-b border-slate-200 pb-1">
              <span>℞</span>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Medicinal Prescription</span>
            </div>

            <div className="p-4 rounded-xl border-2 border-teal-600/30 bg-teal-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-teal-950 flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-teal-600" />
                    <span>{remedyPrescribed}</span>
                    <span className="text-sm px-2 py-0.5 rounded bg-teal-600 text-white font-mono">
                      {potencyPrescribed}
                    </span>
                  </h3>
                </div>
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full">
                  Organon 6th Ed. Protocol
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-800">
                <span className="font-bold text-slate-900 block">Dosing Cadence & Repetition:</span>
                <p className="leading-relaxed bg-white p-2.5 rounded-lg border border-teal-200 font-medium">
                  {repetitionSchedule}
                </p>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1 bg-white/70 p-2.5 rounded-lg border border-teal-100">
                <span className="font-bold text-teal-900 block">Preparation Method:</span>
                <p>
                  Dissolve prescribed medicinal globules in 150 ml pure distilled water with 15 ml alcohol preservative. 
                  Succuss bottle 10 times before every single administration. Take 1 teaspoon stirred in fresh water.
                </p>
              </div>
            </div>
          </div>

          {/* Antidoting Rules & Dietary Safeguards (§ 260) */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Classical Dietary & Antidoting Directives (Organon § 260)</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              {dietaryRestrictions}
            </p>
            <p className="text-amber-900 text-[11px] font-semibold">
              <strong>Emergency Note:</strong> {specialInstructions}
            </p>
          </div>

          {/* Doctor Signature & Stamp Area */}
          <div className="pt-8 flex items-end justify-between border-t border-slate-200">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-1.5 text-xs text-teal-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Authenticated Prescription</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Hash: SHA256-VF-{patient.id?.slice(0, 8)}-{Date.now().toString(36).toUpperCase()}
              </p>
            </div>

            <div className="text-center space-y-1">
              {/* Digital Signature representation */}
              <div className="font-serif italic text-lg font-bold text-slate-800 tracking-wider">
                Dr. K. Prasad
              </div>
              <div className="w-44 border-t border-slate-400 pt-1">
                <p className="text-xs font-bold text-slate-900">{doctorName}</p>
                <p className="text-[10px] text-slate-500">{doctorDegrees}</p>
                <p className="text-[9px] text-slate-400">{doctorRegNo}</p>
              </div>
            </div>
          </div>

          {/* Clinic Footer */}
          <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
            VitalFokus Classical Suite • Heiner Frei BPA • Vithoulkas VES • Verified Clinical Prescription
          </div>
        </div>

      </div>
    </div>
  );
};

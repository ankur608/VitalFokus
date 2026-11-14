"use client";

import React, { useState } from "react";
import {
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Trash2,
  Plus,
  ArrowRight,
  Filter,
  Flame,
  CheckCircle2,
  MoveRight,
  Sparkles
} from "lucide-react";
import { useClipboardStore } from "@/lib/store/useClipboardStore";

interface ClipboardDockProps {
  onOpenRepertorisation: () => void;
}

export const ClipboardDock: React.FC<ClipboardDockProps> = ({
  onOpenRepertorisation
}) => {
  const {
    clipboards,
    activeClipboardId,
    isDockOpen,
    toggleDock,
    setActiveClipboardId,
    toggleClipboardActive,
    addClipboard,
    removeClipboard,
    removeRubricFromClipboard,
    setRubricWeight,
    toggleRubricEliminative,
    moveRubricToClipboard,
    clearClipboard,
    clearAllClipboards
  } = useClipboardStore();

  const [newCbName, setNewCbName] = useState("");
  const [isAddingCb, setIsAddingCb] = useState(false);

  const activeClipboard =
    clipboards.find((cb) => cb.id === activeClipboardId) || clipboards[0];

  const totalRubricsAcrossAll = clipboards.reduce(
    (sum, cb) => sum + cb.rubrics.length,
    0
  );

  const handleCreateClipboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCbName.trim()) return;
    addClipboard(newCbName.trim());
    setNewCbName("");
    setIsAddingCb(false);
  };

  if (!isDockOpen) {
    return (
      <aside className="fixed bottom-4 right-6 z-40">
        <button
          onClick={toggleDock}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/30 transition-all font-semibold text-xs cursor-pointer group"
        >
          <Layers className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition" />
          <span>Clipboards ({totalRubricsAcrossAll})</span>
          <ChevronUp className="w-3.5 h-3.5 text-indigo-200" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-2xl transition-all">
      {/* Top Header Bar of Dock */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-slate-200/70 dark:border-slate-800/70 text-xs">
        {/* Clipboards Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1 mr-4">
          {clipboards.map((cb) => {
            const isSelected = cb.id === activeClipboardId;
            return (
              <div
                key={cb.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition shrink-0 ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs"
                    : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setActiveClipboardId(cb.id)}
              >
                {/* Active in Analysis Checkbox */}
                <input
                  type="checkbox"
                  checked={cb.isActive}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleClipboardActive(cb.id);
                  }}
                  title={cb.isActive ? "Included in Repertorisation" : "Excluded from Repertorisation"}
                  className="rounded text-teal-600 focus:ring-0 cursor-pointer accent-teal-600 w-3.5 h-3.5"
                />

                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cb.color }}
                />
                <span className="truncate max-w-[120px]">{cb.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? "bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {cb.rubrics.length}
                </span>

                {clipboards.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeClipboard(cb.id);
                    }}
                    className="opacity-50 hover:opacity-100 ml-1 hover:text-red-500"
                    title="Delete clipboard"
                  >
                    &times;
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Clipboard Button */}
          {clipboards.length < 8 && !isAddingCb && (
            <button
              onClick={() => setIsAddingCb(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs hover:border-slate-400 hover:text-slate-700 dark:hover:text-slate-200 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          )}

          {isAddingCb && (
            <form onSubmit={handleCreateClipboard} className="flex items-center gap-1 shrink-0">
              <input
                type="text"
                value={newCbName}
                onChange={(e) => setNewCbName(e.target.value)}
                placeholder="Clipboard name..."
                autoFocus
                className="px-2 py-1 text-xs rounded-lg border border-teal-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-hidden w-28"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-teal-600 text-white rounded-lg text-xs font-medium"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsAddingCb(false)}
                className="text-slate-400 text-xs px-1"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRepertorisation}
            disabled={totalRubricsAcrossAll === 0}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 disabled:opacity-40 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Repertorise Live ({totalRubricsAcrossAll})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleDock}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Minimize Dock"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dock Content Body: Rubrics list in selected clipboard */}
      <div className="max-h-52 overflow-y-auto px-6 py-3">
        {activeClipboard.rubrics.length === 0 ? (
          <div className="py-6 text-center text-slate-400 dark:text-slate-500 text-xs flex flex-col items-center justify-center gap-1.5">
            <Layers className="w-6 h-6 text-slate-300 dark:text-slate-700" />
            <span>
              "{activeClipboard.name}" is empty. Add rubrics from the{" "}
              <strong>Repertory Explorer</strong> or use the <strong>Symptom Highlighter</strong>.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {activeClipboard.rubrics.map((rubric) => (
              <div
                key={rubric.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs group"
              >
                <div className="flex flex-col truncate pr-2 flex-1">
                  <div className="flex items-center gap-1.5 truncate">
                    {rubric.eliminative && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 shrink-0">
                        ELIM
                      </span>
                    )}
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {rubric.fullPath}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {rubric.chapter} • {rubric.remedyCount} remedies
                  </span>
                </div>

                {/* Rubric Controls: Weight & Eliminative */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Weight Selector */}
                  <div className="flex items-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5">
                    {[1, 2, 3, 4].map((w) => (
                      <button
                        key={w}
                        onClick={() => setRubricWeight(activeClipboard.id, rubric.id, w)}
                        className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center transition ${
                          rubric.weight === w
                            ? "bg-teal-600 text-white"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                        title={`Set weight to ${w}x`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>

                  {/* Eliminative Toggle */}
                  <button
                    onClick={() => toggleRubricEliminative(activeClipboard.id, rubric.id)}
                    className={`p-1 rounded-md text-[10px] border transition ${
                      rubric.eliminative
                        ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500"
                    }`}
                    title={
                      rubric.eliminative
                        ? "Marked Eliminative (filters out non-matching remedies)"
                        : "Click to mark as Eliminative Keynote"
                    }
                  >
                    <Filter className="w-3 h-3" />
                  </button>

                  {/* Move to another clipboard dropdown */}
                  {clipboards.length > 1 && (
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          moveRubricToClipboard(
                            activeClipboard.id,
                            e.target.value,
                            rubric.id
                          );
                        }
                      }}
                      className="text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md py-0.5 text-slate-500 outline-hidden cursor-pointer"
                      title="Move to clipboard..."
                    >
                      <option value="" disabled>Move</option>
                      {clipboards
                        .filter((cb) => cb.id !== activeClipboard.id)
                        .map((cb) => (
                          <option key={cb.id} value={cb.id}>
                            {cb.name}
                          </option>
                        ))}
                    </select>
                  )}

                  {/* Delete Rubric */}
                  <button
                    onClick={() =>
                      removeRubricFromClipboard(activeClipboard.id, rubric.id)
                    }
                    className="p-1 rounded-md text-slate-400 hover:text-red-500"
                    title="Remove rubric from clipboard"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Bar: Clear actions */}
      <div className="flex items-center justify-between px-6 py-1.5 bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-500">
        <div className="flex items-center gap-4">
          <span>
            Active Rubrics: <strong>{activeClipboard.rubrics.length}</strong>
          </span>
          <span>
            Status: {activeClipboard.isActive ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active in Live Analysis</span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Inactive (Toggled Off)</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {activeClipboard.rubrics.length > 0 && (
            <button
              onClick={() => clearClipboard(activeClipboard.id)}
              className="hover:text-red-600 dark:hover:text-red-400 transition"
            >
              Clear Current Clipboard
            </button>
          )}
          {totalRubricsAcrossAll > 0 && (
            <button
              onClick={clearAllClipboards}
              className="hover:text-red-600 dark:hover:text-red-400 transition"
            >
              Clear All Clipboards
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

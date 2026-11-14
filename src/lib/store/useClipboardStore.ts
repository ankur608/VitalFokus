import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ClipboardRubric {
  id: string; // rubricId
  fullPath: string;
  chapter: string;
  label: string;
  weight: number; // 1, 2, 3, 4
  eliminative: boolean;
  remedyCount: number;
  isMerged?: boolean;
  mergedFromPaths?: string[];
  isClinicalAddition?: boolean;
  sourceCitation?: string;
}

export interface Clipboard {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  rubrics: ClipboardRubric[];
}

interface ClipboardState {
  clipboards: Clipboard[];
  activeClipboardId: string;
  isDockOpen: boolean;
  activePatientId: string | null;

  // Actions
  setActivePatientId: (patientId: string | null) => void;
  toggleDock: () => void;
  setDockOpen: (open: boolean) => void;
  setActiveClipboardId: (id: string) => void;
  toggleClipboardActive: (id: string) => void;
  addClipboard: (name: string, color?: string) => void;
  removeClipboard: (id: string) => void;
  renameClipboard: (id: string, name: string) => void;

  // Rubric management
  addRubricToClipboard: (
    clipboardId: string,
    rubric: {
      id: string;
      fullPath: string;
      chapter: string;
      label: string;
      remedyCount: number;
      isClinicalAddition?: boolean;
      sourceCitation?: string;
    },
    weight?: number,
    eliminative?: boolean
  ) => void;
  addMergedRubricToClipboard: (
    clipboardId: string,
    baseRubric: {
      id: string;
      fullPath: string;
      chapter: string;
      label: string;
      remedyCount: number;
    },
    relatedRubrics: {
      id: string;
      fullPath: string;
      remedyCount: number;
    }[]
  ) => void;
  removeRubricFromClipboard: (clipboardId: string, rubricId: string) => void;
  setRubricWeight: (clipboardId: string, rubricId: string, weight: number) => void;
  toggleRubricEliminative: (clipboardId: string, rubricId: string) => void;
  moveRubricToClipboard: (
    sourceClipboardId: string,
    targetClipboardId: string,
    rubricId: string
  ) => void;
  clearClipboard: (clipboardId: string) => void;
  clearAllClipboards: () => void;
  loadAnalysisState: (clipboards: Clipboard[]) => void;
}

const DEFAULT_CLIPBOARDS: Clipboard[] = [
  {
    id: "cb-1",
    name: "Mental Generals",
    color: "#3B82F6", // Blue
    isActive: true,
    rubrics: []
  },
  {
    id: "cb-2",
    name: "Physical Generals",
    color: "#10B981", // Emerald
    isActive: true,
    rubrics: []
  },
  {
    id: "cb-3",
    name: "Particulars & Organs",
    color: "#8B5CF6", // Purple
    isActive: true,
    rubrics: []
  },
  {
    id: "cb-4",
    name: "Modalities (< & >)",
    color: "#F59E0B", // Amber
    isActive: true,
    rubrics: []
  },
  {
    id: "cb-5",
    name: "Eliminative Keynotes",
    color: "#EF4444", // Rose / Red
    isActive: true,
    rubrics: []
  }
];

export const useClipboardStore = create<ClipboardState>()(
  persist(
    (set, get) => ({
      clipboards: DEFAULT_CLIPBOARDS,
      activeClipboardId: "cb-1",
      isDockOpen: true,
      activePatientId: null,

      setActivePatientId: (patientId) => set({ activePatientId: patientId }),
      toggleDock: () => set((state) => ({ isDockOpen: !state.isDockOpen })),
      setDockOpen: (open) => set({ isDockOpen: open }),
      setActiveClipboardId: (id) => set({ activeClipboardId: id }),

      toggleClipboardActive: (id) =>
        set((state) => ({
          clipboards: state.clipboards.map((cb) =>
            cb.id === id ? { ...cb, isActive: !cb.isActive } : cb
          )
        })),

      addClipboard: (name, color) =>
        set((state) => {
          if (state.clipboards.length >= 8) return state; // Maximum 8 clipboards
          const colors = [
            "#3B82F6", "#10B981", "#8B5CF6", "#F59E0B",
            "#EF4444", "#06B6D4", "#EC4899", "#84CC16"
          ];
          const newColor = color || colors[state.clipboards.length % colors.length];
          const newCb: Clipboard = {
            id: `cb-${Date.now()}`,
            name,
            color: newColor,
            isActive: true,
            rubrics: []
          };
          return {
            clipboards: [...state.clipboards, newCb],
            activeClipboardId: newCb.id
          };
        }),

      removeClipboard: (id) =>
        set((state) => {
          if (state.clipboards.length <= 1) return state; // Keep at least one
          const updated = state.clipboards.filter((cb) => cb.id !== id);
          return {
            clipboards: updated,
            activeClipboardId:
              state.activeClipboardId === id ? updated[0].id : state.activeClipboardId
          };
        }),

      renameClipboard: (id, name) =>
        set((state) => ({
          clipboards: state.clipboards.map((cb) =>
            cb.id === id ? { ...cb, name } : cb
          )
        })),

      addRubricToClipboard: (clipboardId, rubric, weight = 1, eliminative = false) =>
        set((state) => {
          const targetCb = state.clipboards.find((cb) => cb.id === clipboardId);
          if (!targetCb) return state;

          const exists = targetCb.rubrics.some((r) => r.id === rubric.id);
          if (exists) return state;

          const newRubric: ClipboardRubric = {
            ...rubric,
            weight,
            eliminative
          };

          return {
            clipboards: state.clipboards.map((cb) =>
              cb.id === clipboardId
                ? { ...cb, rubrics: [...cb.rubrics, newRubric] }
                : cb
            )
          };
        }),

      addMergedRubricToClipboard: (clipboardId, baseRubric, relatedRubrics) =>
        set((state) => {
          const targetCb = state.clipboards.find((cb) => cb.id === clipboardId);
          if (!targetCb) return state;

          const allPaths = [baseRubric.fullPath, ...relatedRubrics.map((r) => r.fullPath)];
          const totalMergedCount = 1 + relatedRubrics.length;
          const mergedRemedyCount = Math.max(
            baseRubric.remedyCount,
            ...relatedRubrics.map((r) => r.remedyCount)
          ) + 3;

          const mergedRubric: ClipboardRubric = {
            id: `merged-${baseRubric.id}`,
            fullPath: `[Merged: ${totalMergedCount} rubrics] ${baseRubric.fullPath}`,
            chapter: baseRubric.chapter,
            label: `[Merged ${totalMergedCount}x] ${baseRubric.label}`,
            weight: 2,
            eliminative: false,
            remedyCount: mergedRemedyCount,
            isMerged: true,
            mergedFromPaths: allPaths
          };

          // Remove any of the sub-rubrics if already present to avoid double counting
          const cleanRubrics = targetCb.rubrics.filter(
            (r) => r.id !== baseRubric.id && !relatedRubrics.some((rel) => rel.id === r.id)
          );

          return {
            clipboards: state.clipboards.map((cb) =>
              cb.id === clipboardId
                ? { ...cb, rubrics: [...cleanRubrics, mergedRubric] }
                : cb
            )
          };
        }),

      removeRubricFromClipboard: (clipboardId, rubricId) =>
        set((state) => ({
          clipboards: state.clipboards.map((cb) =>
            cb.id === clipboardId
              ? { ...cb, rubrics: cb.rubrics.filter((r) => r.id !== rubricId) }
              : cb
          )
        })),

      setRubricWeight: (clipboardId, rubricId, weight) =>
        set((state) => ({
          clipboards: state.clipboards.map((cb) =>
            cb.id === clipboardId
              ? {
                  ...cb,
                  rubrics: cb.rubrics.map((r) =>
                    r.id === rubricId ? { ...r, weight } : r
                  )
                }
              : cb
          )
        })),

      toggleRubricEliminative: (clipboardId, rubricId) =>
        set((state) => ({
          clipboards: state.clipboards.map((cb) =>
            cb.id === clipboardId
              ? {
                  ...cb,
                  rubrics: cb.rubrics.map((r) =>
                    r.id === rubricId ? { ...r, eliminative: !r.eliminative } : r
                  )
                }
              : cb
          )
        })),

      moveRubricToClipboard: (sourceClipboardId, targetClipboardId, rubricId) =>
        set((state) => {
          if (sourceClipboardId === targetClipboardId) return state;
          const sourceCb = state.clipboards.find((cb) => cb.id === sourceClipboardId);
          const targetCb = state.clipboards.find((cb) => cb.id === targetClipboardId);
          if (!sourceCb || !targetCb) return state;

          const rubric = sourceCb.rubrics.find((r) => r.id === rubricId);
          if (!rubric) return state;

          const alreadyInTarget = targetCb.rubrics.some((r) => r.id === rubricId);

          return {
            clipboards: state.clipboards.map((cb) => {
              if (cb.id === sourceClipboardId) {
                return { ...cb, rubrics: cb.rubrics.filter((r) => r.id !== rubricId) };
              }
              if (cb.id === targetClipboardId && !alreadyInTarget) {
                return { ...cb, rubrics: [...cb.rubrics, rubric] };
              }
              return cb;
            })
          };
        }),

      clearClipboard: (clipboardId) =>
        set((state) => ({
          clipboards: state.clipboards.map((cb) =>
            cb.id === clipboardId ? { ...cb, rubrics: [] } : cb
          )
        })),

      clearAllClipboards: () =>
        set((state) => ({
          clipboards: state.clipboards.map((cb) => ({ ...cb, rubrics: [] }))
        })),

      loadAnalysisState: (clipboards) =>
        set({ clipboards, activeClipboardId: clipboards[0]?.id || "cb-1" })
    }),
    {
      name: "vitalfokus-clipboards-v2"
    }
  )
);

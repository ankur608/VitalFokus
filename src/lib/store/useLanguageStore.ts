"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageCode } from "@/lib/translationEngine";

interface LanguageState {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: "en",
      setLanguage: (lang: LanguageCode) => set({ currentLanguage: lang })
    }),
    {
      name: "vitalfokus_language_pref"
    }
  )
);

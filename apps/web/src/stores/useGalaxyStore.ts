import { create } from "zustand";

interface GalaxyState {
  selectedStarId: number | null;
  cameraResetKey: number;
  isSearchOpen: boolean;
  quality: "auto" | "low" | "medium" | "high";
  hiddenLanguages: string[];
  selectStar: (id: number | null) => void;
  resetCamera: () => void;
  setSearchOpen: (isSearchOpen: boolean) => void;
  setQuality: (quality: GalaxyState["quality"]) => void;
  toggleLanguageVisibility: (language: string) => void;
  showLanguage: (language: string) => void;
  showAllLanguages: () => void;
  hideAllLanguages: (languages: string[]) => void;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
  selectedStarId: null,
  cameraResetKey: 0,
  isSearchOpen: false,
  quality: "auto",
  hiddenLanguages: [],
  selectStar: (selectedStarId) => set({ selectedStarId }),
  resetCamera: () => set((state) => ({ cameraResetKey: state.cameraResetKey + 1 })),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  setQuality: (quality) => set({ quality }),
  toggleLanguageVisibility: (language) => set((state) => ({
    hiddenLanguages: state.hiddenLanguages.includes(language)
      ? state.hiddenLanguages.filter((item) => item !== language)
      : [...state.hiddenLanguages, language],
  })),
  showLanguage: (language) => set((state) => ({ hiddenLanguages: state.hiddenLanguages.filter((item) => item !== language) })),
  showAllLanguages: () => set({ hiddenLanguages: [] }),
  hideAllLanguages: (languages) => set({ hiddenLanguages: languages }),
}));

import { create } from "zustand";

interface GalaxyState {
  selectedStarId: number | null;
  cameraResetKey: number;
  isSearchOpen: boolean;
  quality: "auto" | "low" | "medium" | "high";
  selectStar: (id: number | null) => void;
  resetCamera: () => void;
  setSearchOpen: (isSearchOpen: boolean) => void;
  setQuality: (quality: GalaxyState["quality"]) => void;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
  selectedStarId: null,
  cameraResetKey: 0,
  isSearchOpen: false,
  quality: "auto",
  selectStar: (selectedStarId) => set({ selectedStarId }),
  resetCamera: () => set((state) => ({ cameraResetKey: state.cameraResetKey + 1 })),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  setQuality: (quality) => set({ quality }),
}));

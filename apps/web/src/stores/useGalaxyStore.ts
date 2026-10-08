import { create } from "zustand";

interface GalaxyState {
  selectedStarId: number | null;
  cameraResetKey: number;
  selectStar: (id: number | null) => void;
  resetCamera: () => void;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
  selectedStarId: null,
  cameraResetKey: 0,
  selectStar: (selectedStarId) => set({ selectedStarId }),
  resetCamera: () => set((state) => ({ cameraResetKey: state.cameraResetKey + 1 })),
}));

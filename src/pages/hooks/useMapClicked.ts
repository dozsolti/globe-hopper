import { create } from "zustand";

export interface MapClickedStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any | null;
  coords: [number, number] | null;
  setCoords: (coords: [number, number] | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDetails: (details: any | null) => void;
  reset: () => void;
}

export const useMapClicked = create<MapClickedStore>((set) => ({
  details: null,
  coords: null,
  setCoords: (coords) =>
    set(() => ({
      coords,
    })),
  setDetails: (details) =>
    set(() => ({
      details,
    })),
  reset: () =>
    set(() => ({
      details: null,
      coords: null,
    })),
}));

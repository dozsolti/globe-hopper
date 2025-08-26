import { create } from "zustand";

export interface MapClickedStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any | null;
  coords: [number, number] | null;
  setCoords: (coords: [number, number] | null) => void;
  loadDetails: () => void;
  clear: () => void;
}

export const useMapClicked = create<MapClickedStore>((set, get) => ({
  details: null,
  coords: null,
  setCoords: (coords) =>
    set(() => ({
      coords,
    })),
  loadDetails: async () => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${
      get().coords?.[0]
    }&lon=${get().coords?.[1]}`;

    try {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          set(() => ({
            details: data,
          }));
        });
    } catch (e) {
      set(() => ({ details: e }));
    }
  },
  clear: () =>
    set(() => ({
      details: null,
      coords: null,
    })),
}));

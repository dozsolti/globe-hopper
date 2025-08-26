import type { StoreState, Place } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultPlaces: Place[] = [];
defaultPlaces.sort((a, b) => (a.visitedEnd < b.visitedEnd ? 1 : -1));

export const useStore = create(
  persist<StoreState>(
    (set) => ({
      visitedList: defaultPlaces,
      addLocation: (place) =>
        set((state) => ({
          visitedList: [place, ...state.visitedList],
        })),
      removeLocation: (place) =>
        set((state) => ({
          visitedList: state.visitedList.filter((loc) => loc.id !== place.id),
        })),
      clearLocations: () => set({ visitedList: [] }),
    }),
    {
      name: "visited-places",
    }
  )
);

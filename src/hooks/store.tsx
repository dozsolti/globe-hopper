import { create } from "zustand";

export interface Location {
  id: number;
  name: string;
  country: string;
  lat: number;
  lng: number;
  visitedAt: string;
}

export interface StoreState {
  visitedList: Location[];
  addLocation: (location: Location) => void;
  removeLocation: (location: Location) => void;
  clearLocations: () => void;
}

const defaultLocations: Location[] = [
  {
    id: 1,
    name: "New York",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
    visitedAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    visitedAt: "2022-11-20",
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    lat: 35.6895,
    lng: 139.6917,
    visitedAt: "2023-03-10",
  },
  {
    id: 4,
    name: "California",
    country: "USA",
    lat: 36.7783,
    lng: -119.4179,
    visitedAt: "2023-05-05",
  },
];
defaultLocations.sort((a, b) => (a.visitedAt < b.visitedAt ? 1 : -1));

export const useStore = create<StoreState>((set) => ({
  visitedList: defaultLocations,
  addLocation: (location) =>
    set((state) => ({
      visitedList: [...state.visitedList, location],
    })),
  removeLocation: (location) =>
    set((state) => ({
      visitedList: state.visitedList.filter((loc) => loc.id !== location.id),
    })),
  clearLocations: () => set({ visitedList: [] }),
}));

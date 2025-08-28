export type LatLngArray = [number, number];

export interface City {
  i: number;
  n: string;
  c: LatLngArray;
  p: string;
}

export interface Place {
  id: number;
  name: string;
  country: string;
  lat: number;
  lng: number;
  visitedStart: string;
  visitedEnd: string;
  note?: string;
  color: string;
}

export interface StoreState {
  visitedList: Place[];
  addLocation: (location: Place) => void;
  removeLocation: (location: Place) => void;
  clearLocations: () => void;
}

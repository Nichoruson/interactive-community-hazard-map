export const HAZARD_CATEGORIES = ["flood", "road", "accident", "fire", "power"] as const;

export type HazardCategory = (typeof HAZARD_CATEGORIES)[number];

export type HazardReport = {
  id: string;
  category: HazardCategory;
  description: string;
  lat: number;
  lng: number;
  createdAt: string;
  status: "active" | "resolved";
};

export type MapBounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

import { HazardCategory, HazardReport, MapBounds } from "@/types/hazard";

export const CATEGORY_LABELS: Record<HazardCategory, string> = {
  flood: "Flood",
  road: "Road Hazard",
  accident: "Accident",
  fire: "Fire",
  power: "Power Outage"
};

export function isWithinBounds(report: HazardReport, bounds: MapBounds): boolean {
  return (
    report.lat <= bounds.north &&
    report.lat >= bounds.south &&
    report.lng <= bounds.east &&
    report.lng >= bounds.west
  );
}

export function formatRelativeTime(isoString: string): string {
  const minutesAgo = Math.max(1, Math.floor((Date.now() - new Date(isoString).getTime()) / 60000));
  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }
  const hoursAgo = Math.floor(minutesAgo / 60);
  return `${hoursAgo}h ago`;
}

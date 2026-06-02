import { HazardReport } from "@/types/hazard";

const seedData: HazardReport[] = [
  {
    id: "hz-1",
    category: "flood",
    description: "Street-level flooding near barangay hall. Vehicles moving slowly.",
    lat: 14.6091,
    lng: 121.0223,
    createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
    status: "active"
  },
  {
    id: "hz-2",
    category: "road",
    description: "Collapsed shoulder lane causing detour congestion.",
    lat: 14.5984,
    lng: 121.0108,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "active"
  },
  {
    id: "hz-3",
    category: "accident",
    description: "Two-vehicle collision at intersection, one lane blocked.",
    lat: 14.6155,
    lng: 121.0351,
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    status: "active"
  }
];

const globalForHazards = globalThis as unknown as {
  __hazardReports?: HazardReport[];
};

if (!globalForHazards.__hazardReports) {
  globalForHazards.__hazardReports = seedData;
}

export async function getHazardReports(): Promise<HazardReport[]> {
  const reports = globalForHazards.__hazardReports ?? [];
  return reports
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addHazardReport(
  report: Omit<HazardReport, "id" | "createdAt" | "status">
): Promise<HazardReport> {
  const newReport: HazardReport = {
    ...report,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "active"
  };

  if (!globalForHazards.__hazardReports) {
    globalForHazards.__hazardReports = [];
  }

  globalForHazards.__hazardReports.push(newReport);
  return newReport;
}

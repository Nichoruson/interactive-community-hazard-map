import { getHazardReports } from "@/lib/hazard-data";
import { HazardMapShell } from "@/components/hazard-map-shell";

export const dynamic = "force-dynamic";

export default async function Page() {
  const reports = await getHazardReports();

  return (
    <main className="mx-auto max-w-[1700px] p-4 lg:p-6">
      <header className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Geospatial Situational Intelligence
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Interactive Community Hazard & Emergency Map
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-slate-600">
          Pan or zoom the map to filter active incidents. Click any point on the map to submit a new
          hazard report through a Server Action-powered workflow.
        </p>
      </header>

      <HazardMapShell initialReports={reports} />
    </main>
  );
}

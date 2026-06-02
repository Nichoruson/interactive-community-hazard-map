"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { HazardReport, MapBounds } from "@/types/hazard";
import { isWithinBounds } from "@/lib/hazard-utils";
import { HazardSidebar } from "@/components/hazard-sidebar";

const HazardMap = dynamic(() => import("@/components/hazard-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-xl bg-slate-200" />
});

type HazardMapShellProps = {
  initialReports: HazardReport[];
};

export function HazardMapShell({ initialReports }: HazardMapShellProps) {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [viewportBounds, setViewportBounds] = useState<MapBounds | null>(null);

  const visibleReports = useMemo(() => {
    if (!viewportBounds) {
      return initialReports;
    }
    return initialReports.filter((report) => isWithinBounds(report, viewportBounds));
  }, [initialReports, viewportBounds]);

  return (
    <div className="grid h-[calc(100vh-5rem)] grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
      <HazardSidebar
        reports={visibleReports}
        selectedReportId={selectedReportId}
        onSelectReport={setSelectedReportId}
      />
      <section className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <HazardMap
          reports={initialReports}
          selectedReportId={selectedReportId}
          onSelectReport={setSelectedReportId}
          onViewportChange={setViewportBounds}
        />
      </section>
    </div>
  );
}

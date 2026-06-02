"use client";

import { CATEGORY_LABELS, formatRelativeTime } from "@/lib/hazard-utils";
import { HazardReport } from "@/types/hazard";

type HazardSidebarProps = {
  reports: HazardReport[];
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
};

export function HazardSidebar({ reports, selectedReportId, onSelectReport }: HazardSidebarProps) {
  return (
    <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Active Reports</h2>
        <p className="text-sm text-slate-500">{reports.length} reports in current viewport</p>
      </header>

      <ul className="max-h-[calc(100vh-12rem)] space-y-2 overflow-auto p-3">
        {reports.length === 0 ? (
          <li className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
            No active reports in this map view.
          </li>
        ) : (
          reports.map((report) => (
            <li key={report.id}>
              <button
                type="button"
                onClick={() => onSelectReport(report.id)}
                className={`w-full rounded-lg border p-3 text-left transition ${
                  selectedReportId === report.id
                    ? "border-slate-700 bg-slate-900 text-white"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-wide">
                  {CATEGORY_LABELS[report.category]}
                </p>
                <p className="mt-1 line-clamp-2 text-sm">{report.description}</p>
                <p className="mt-2 text-xs opacity-80">
                  {report.lat.toFixed(4)}, {report.lng.toFixed(4)} | {formatRelativeTime(report.createdAt)}
                </p>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

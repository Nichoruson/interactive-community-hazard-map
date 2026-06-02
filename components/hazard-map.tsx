"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { HazardReport, MapBounds } from "@/types/hazard";
import { CATEGORY_LABELS } from "@/lib/hazard-utils";
import { ReportHazardModal } from "@/components/report-hazard-modal";

type HazardMapProps = {
  reports: HazardReport[];
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
  onViewportChange: (bounds: MapBounds) => void;
};

type ReportDraft = { lat: number; lng: number } | null;

function ViewportSync({ onViewportChange }: { onViewportChange: (bounds: MapBounds) => void }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      onViewportChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      });
    },
    zoomend: () => {
      const bounds = map.getBounds();
      onViewportChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      });
    }
  });

  useEffect(() => {
    const bounds = map.getBounds();
    onViewportChange({
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest()
    });
  }, [map, onViewportChange]);

  return null;
}

function SelectedMarkerFollower({ target }: { target: HazardReport | undefined }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 14), { duration: 0.5 });
    }
  }, [map, target]);
  return null;
}

function ClickReporter({ onSelect }: { onSelect: (draft: ReportDraft) => void }) {
  useMapEvents({
    click: (event) => onSelect({ lat: event.latlng.lat, lng: event.latlng.lng })
  });
  return null;
}

function categoryColor(category: HazardReport["category"]): string {
  switch (category) {
    case "flood":
      return "#1d4ed8";
    case "road":
      return "#f59e0b";
    case "accident":
      return "#dc2626";
    case "fire":
      return "#ea580c";
    case "power":
      return "#9333ea";
    default:
      return "#475569";
  }
}

export default function HazardMap({
  reports,
  selectedReportId,
  onSelectReport,
  onViewportChange
}: HazardMapProps) {
  const [draft, setDraft] = useState<ReportDraft>(null);

  const selectedReport = useMemo(
    () => reports.find((report) => report.id === selectedReportId),
    [reports, selectedReportId]
  );

  return (
    <>
      <div className="h-full min-h-[620px] overflow-hidden rounded-lg">
        <MapContainer center={[14.6037, 121.0184]} zoom={13} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ViewportSync onViewportChange={onViewportChange} />
          <ClickReporter onSelect={setDraft} />
          <SelectedMarkerFollower target={selectedReport} />

          {reports.map((report) => (
            <CircleMarker
              key={report.id}
              center={[report.lat, report.lng]}
              radius={selectedReportId === report.id ? 11 : 8}
              pathOptions={{
                color: categoryColor(report.category),
                weight: selectedReportId === report.id ? 3 : 2,
                fillOpacity: 0.72
              }}
              eventHandlers={{
                click: () => onSelectReport(report.id)
              }}
            >
              <Popup>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">{CATEGORY_LABELS[report.category]}</p>
                  <p>{report.description}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <ReportHazardModal
        open={Boolean(draft)}
        lat={draft?.lat}
        lng={draft?.lng}
        onClose={() => setDraft(null)}
      />
    </>
  );
}

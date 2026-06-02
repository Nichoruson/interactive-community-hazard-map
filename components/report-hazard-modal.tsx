"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitHazardReport, type SubmitHazardReportState } from "@/app/actions";
import { HAZARD_CATEGORIES } from "@/types/hazard";
import { CATEGORY_LABELS } from "@/lib/hazard-utils";

type ReportHazardModalProps = {
  open: boolean;
  lat?: number;
  lng?: number;
  onClose: () => void;
};

const initialState: SubmitHazardReportState = {
  success: false,
  message: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Submitting..." : "Submit report"}
    </button>
  );
}

export function ReportHazardModal({ open, lat, lng, onClose }: ReportHazardModalProps) {
  const [state, formAction] = useActionState(submitHazardReport, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  if (!open || lat === undefined || lng === undefined) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Report hazard</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <p className="mb-4 text-sm text-slate-600">
          Coordinates: {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="lat" value={lat} />
          <input type="hidden" name="lng" value={lng} />

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">Hazard category</span>
            <select
              name="category"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none"
              defaultValue={HAZARD_CATEGORIES[0]}
            >
              {HAZARD_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>
            {state.errors?.category?.[0] ? (
              <p className="text-xs text-red-600">{state.errors.category[0]}</p>
            ) : null}
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea
              name="description"
              required
              minLength={8}
              maxLength={400}
              rows={4}
              placeholder="Describe severity, landmarks, and immediate risks..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none"
            />
            {state.errors?.description?.[0] ? (
              <p className="text-xs text-red-600">{state.errors.description[0]}</p>
            ) : null}
          </label>

          {state.message && !state.success ? <p className="text-sm text-red-600">{state.message}</p> : null}

          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

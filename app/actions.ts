"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addHazardReport } from "@/lib/hazard-data";
import { HAZARD_CATEGORIES } from "@/types/hazard";

const reportSchema = z.object({
  category: z.enum(HAZARD_CATEGORIES),
  description: z.string().min(8).max(400),
  lat: z.coerce.number().gte(-90).lte(90),
  lng: z.coerce.number().gte(-180).lte(180)
});

export type SubmitHazardReportState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const initialState: SubmitHazardReportState = {
  success: false,
  message: ""
};

export async function submitHazardReport(
  _prevState: SubmitHazardReportState = initialState,
  formData: FormData
): Promise<SubmitHazardReportState> {
  const payload = {
    category: formData.get("category"),
    description: formData.get("description"),
    lat: formData.get("lat"),
    lng: formData.get("lng")
  };

  const parsed = reportSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please review your report input.",
      errors: parsed.error.flatten().fieldErrors
    };
  }

  await addHazardReport(parsed.data);
  revalidatePath("/");

  return {
    success: true,
    message: "Hazard report submitted successfully."
  };
}

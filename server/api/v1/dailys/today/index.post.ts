import { z } from "zod";

const dailySchema = z.object({
  what_went_well_today: z.string().optional(),
  what_to_improve: z.string().optional(),
  tomorrow_plan: z.string().optional(),
});

export default defineEventHandler(async (e) => {});

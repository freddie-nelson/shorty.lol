import { z } from "zod";

export const createSlugSchema = z.object({
  longLink: z.string().url().max(2048),
});

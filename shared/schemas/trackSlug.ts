import { z } from "zod";
import { slugSchema } from "./slug";

export const trackSlugSchema = z.object({
  slug: slugSchema,
});

import { z } from "zod";
import { slugSchema } from "./slug";

export const deleteSlugSchema = z.object({
  slug: slugSchema,
});

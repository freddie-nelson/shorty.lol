import { z } from "zod";

export const slugSchema = z
  .string()
  .length(4, { message: "Slug must be 4 characters long." })
  .regex(/^[a-zA-Z0-9]*$/, { message: "Slug may only contain alpha-numeric characters." });

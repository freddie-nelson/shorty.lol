import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(1, "A password must be provided.")
  .max(255, "Password cannot exceed 255 characters.")
  .regex(/^\S*$/g, "Password must not contain whitespace.");

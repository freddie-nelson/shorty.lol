import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(1, "A username must be provided.")
  .max(255, "Username cannot exceed 255 characters.")
  .regex(/^[a-z0-9_\-.]*$/g, "Username may only contain lower case letters, digits and ., -, _.");

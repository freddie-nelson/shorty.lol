import { z } from "zod";

export const emailSchema = z.string().trim().max(320).email();

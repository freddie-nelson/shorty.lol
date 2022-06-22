import { z } from "zod";
import { emailSchema } from "./email";
import { passwordSchema } from "./password";
import { usernameSchema } from "./username";

export const registerUserSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});

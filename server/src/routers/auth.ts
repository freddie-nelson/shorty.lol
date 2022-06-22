import { Router } from "express";
import { useRoute } from "@/hooks/useRoute";
import register from "@/routes/auth/register";

export const authRouter = Router();
useRoute(authRouter, register);

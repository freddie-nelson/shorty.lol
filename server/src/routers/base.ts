import { Router } from "express";
import { useRoute } from "@/hooks/useRoute";
import slug from "@/routes/[slug]";

export const baseRouter = Router();
useRoute(baseRouter, slug);

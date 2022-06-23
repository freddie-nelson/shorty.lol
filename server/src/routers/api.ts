import { Router } from "express";
import { useRoute } from "../hooks/useRoute";
import createSlug from "../routes/api/createSlug";
import trackSlug from "@/routes/api/trackSlug";

export const apiRouter = Router();
useRoute(apiRouter, createSlug);
useRoute(apiRouter, trackSlug);

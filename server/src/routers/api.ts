import { Router } from "express";
import { useRoute } from "../hooks/useRoute";
import createSlug from "../routes/api/createSlug";

export const apiRouter = Router();
useRoute(apiRouter, createSlug);

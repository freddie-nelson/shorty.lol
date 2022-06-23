import { Router } from "express";
import { useRoute } from "../hooks/useRoute";
import createSlug from "../routes/api/createSlug";
import trackSlug from "@/routes/api/trackSlug";
import getUser from "@/routes/api/getUser";
import getLinks from "@/routes/api/getLinks";

export const apiRouter = Router();
useRoute(apiRouter, createSlug);
useRoute(apiRouter, trackSlug);
useRoute(apiRouter, getUser);
useRoute(apiRouter, getLinks);

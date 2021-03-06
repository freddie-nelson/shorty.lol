import { Router } from "express";
import { useRoute } from "../hooks/useRoute";
import createSlug from "../routes/api/createSlug";
import trackSlug from "@/routes/api/trackSlug";
import getUser from "@/routes/api/getUser";
import getLinks from "@/routes/api/getLinks";
import deleteSlug from "@/routes/api/deleteSlug";
import getVisits from "@/routes/api/getVisits";

export const apiRouter = Router();
useRoute(apiRouter, createSlug);
useRoute(apiRouter, trackSlug);
useRoute(apiRouter, deleteSlug);
useRoute(apiRouter, getUser);
useRoute(apiRouter, getLinks);
useRoute(apiRouter, getVisits);

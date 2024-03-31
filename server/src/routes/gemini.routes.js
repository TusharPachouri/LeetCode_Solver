import e, { Router } from "express";
import { generateSolution } from "../controllers/gemini.controllers.js";

const router = Router();

router.route("/generate").post(generateSolution);

export default router;

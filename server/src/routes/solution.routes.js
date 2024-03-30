import { Router } from "express";
import {
  solutionEntry,
  findRelatedSolution,
  findSolutionByQuestionIdAndLanguage,
} from "../controllers/solution.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/solution").post(verifyJWT, solutionEntry);

export default router;

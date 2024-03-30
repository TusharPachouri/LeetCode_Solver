import { Router } from "express";
import {
  solutionEntry,
  findRelatedSolutions,
  findSolutionByQuestionIdAndLanguage,
  getLoggedInUserSolutions,
  findSolutionByQuestionId,
  deleteQuestionById
} from "../controllers/solution.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/save").post(verifyJWT, solutionEntry);
router.route("/related/:questionId").get(findRelatedSolutions);
router.route("/solution").get(findSolutionByQuestionIdAndLanguage);
router.route("/user").get(verifyJWT, getLoggedInUserSolutions);
router.route("/:questionId").get(findSolutionByQuestionId).delete(verifyJWT, deleteQuestionById);

export default router;

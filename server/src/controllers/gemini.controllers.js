import { solveLeetCodeProblem } from "../utils/Gemini_AI.js";
import { formattedSolution} from "../utils/Gemini_Formatter.js";
import { ApiError } from "../utils/ApiError.js";
import { CorrectSolution } from "../models/correctSolution.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateSolution = asyncHandler(async (req, res) => {
  const {
    title,
    prompt,
    testCases,
    constraints,
    tags,
    snippet,
    language,
    userComments,
  } = req.body;
  if (
    [title, prompt, testCases, constraints, tags, snippet, language].some(
      (field) => field?.trim == ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const relatedQuestionsArray = await CorrectSolution.find({
    tags: { $in: tags }, // Match any tag in the provided array
    language: language, // Match the provided language
  })
    .where("_id")
    .select("-relatedQuestions -_id -__v -user -questionId -comments -createdAt -updatedAt");
  const solution = await solveLeetCodeProblem(
    title,
    prompt,
    testCases,
    constraints,
    tags,
    snippet,
    language,
    userComments,
    relatedQuestionsArray
  );
  const formatSolution = await formattedSolution(solution);
  const jsonFormatSolution = JSON.stringify(formatSolution);
  return res
    .status(200)
    .json(new ApiResponse(200, jsonFormatSolution, "Content generated successfully"));
});

export { generateSolution };

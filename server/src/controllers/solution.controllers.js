import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CorrectSolution } from "../models/correctSolution.models.js";

const solutionEntry = asyncHandler(async (req, res) => {
  const {
    questionId,
    title,
    prompt,
    solutionCode,
    tags,
    difficulty,
    language,
    comments,
  } = req.body;
  if (
    [
      questionId,
      title,
      prompt,
      solutionCode,
      tags,
      difficulty,
      language,
      comments,
    ].some((field) => field?.trim == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedSolution = await CorrectSolution.findOne({
    questionId,
    language,
  });
  if (existedSolution) {
    const solution = await CorrectSolution.findOne({ questionId, language });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          solution,
          "Solution found successfully It was already saved before."
        )
      );
  }
  const relatedQuestionsArray = await CorrectSolution.find({
    tags: { $in: tags }, // Match any tag in the provided array
    language: language, // Match the provided language
  });
  const relatedQuestionsIds = relatedQuestionsArray.map(
    (question) => question._id
  );

  const newCorrectQuestion = new CorrectSolution({
    user: req.user._id,
    questionId,
    title,
    prompt,
    solutionCode,
    tags,
    difficulty,
    language,
    comments,
    relatedQuestions: relatedQuestionsIds,
  });
  await newCorrectQuestion.save();
  return res
    .status(201)
    .json(
      new ApiResponse(201, newCorrectQuestion, "Solution added successfully")
    );
});

const findRelatedSolutions = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const question = await CorrectSolution.findById(questionId);
  const questionTags = question.tags;
  const language = question.language;
  const relatedQuestionsArray = await CorrectSolution.find({
    tags: { $in: questionTags }, // Match any tag in the provided array
    language: language, // Match the provided language
  })
    .where("_id")
    .ne(questionId)
    .select("-relatedQuestions");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        relatedQuestionsArray,
        "Related solutions found successfully"
      )
    );
});

const findSolutionByQuestionIdAndLanguage = asyncHandler(async (req, res) => {
  const { questionId, language } = req.body;
  const solution = await CorrectSolution.findOne({ questionId, language });
  if (!solution) {
    throw new ApiError(404, "Solution not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, solution, "Solution found successfully"));
});

const getLoggedInUserSolutions = asyncHandler(async (req, res) => {
  const solutions = await CorrectSolution.find({ user: req.user._id });
  return res
    .status(200)
    .json(
      new ApiResponse(200, solutions, "User's solutions found successfully")
    );
});

const findSolutionByQuestionId = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const solution = await CorrectSolution.findById(questionId);
  if (!solution) {
    throw new ApiError(404, "Solution not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, solution, "Solution found successfully"));
});

const deleteQuestionById = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const solution = await CorrectSolution.findById(questionId);
  if (!solution) {
    throw new ApiError(404, "Solution not found");
  }
  if (solution.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this solution");
  }
  await CorrectSolution.findByIdAndDelete(questionId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Solution deleted successfully"));
});

export {
  solutionEntry,
  findRelatedSolutions,
  findSolutionByQuestionIdAndLanguage,
  getLoggedInUserSolutions,
  findSolutionByQuestionId,
  deleteQuestionById,
};

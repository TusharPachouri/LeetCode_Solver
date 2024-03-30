import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CorrectSolution } from "../models/correctSolution.models.js";

const solutionEntry = asyncHandler(async (req, res) => {
    const { questionId, title, prompt, solutionCode, tags, difficulty, language, comments, relatedQuestions } = req.body;
    if (
        [questionId, title, prompt, solutionCode, tags, difficulty, language, comments, relatedQuestions].some((field) => field?.trim == "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    const existedSolution = await CorrectSolution.findOne({ questionId, language });
    if (existedSolution) {
        throw new ApiError(409, "Solution already exists");
    }

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
        relatedQuestions,
    });
    await newCorrectQuestion.save();
    return res.status(201).json(new ApiResponse(201, newCorrectQuestion, "Solution added successfully"));
})

const findRelatedSolution = asyncHandler(async (req, res) => {
    const { questionId } = req.params;
    const relatedSolutions = await CorrectQuestion.find({ relatedQuestions: questionId });
    return res.status(200).json(new ApiResponse(200, relatedSolutions, "Related solutions found successfully"));
})

const findSolutionByQuestionIdAndLanguage = asyncHandler(async (req, res) => {
    const { questionId, language } = req.params;
    const solution = await CorrectSolution.findOne({ questionId, language });
    if (!solution) {
        throw new ApiError(404, "Solution not found");
    }
    return res.status(200).json(new ApiResponse(200, solution, "Solution found successfully"));
})

export { solutionEntry, findRelatedSolution, findSolutionByQuestionIdAndLanguage, }
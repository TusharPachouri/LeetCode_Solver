const mongoose = require("mongoose");

const correctQuestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    questionId: {
      type: String,
      required: true,
    }, // ID of the question on LeetCode
    title: {
      type: String,
      required: true,
    }, 
    prompt: {
      type: String,
      required: true,
    }, //Whole Question Here
    solutionCode: {
      type: String,
      required: true,
    }, // Code solution for the question
    tags: {
      type: [String],
      required: true,
    }, // Tags related to the question
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    }, // Difficulty level of the question
    language: {
      type: String,
      required: true,
    }, // Programming language used for the solution
    comments: [{ type: String }], // Comments or explanations provided by users for the solution
    relatedQuestions: [{ type: String }], // IDs or references to related questions
  },
  { timestamps }
);

// Define model for the schema
const CorrectQuestion = mongoose.model(
  "CorrectQuestion",
  correctQuestionSchema
);

module.exports = CorrectQuestion;

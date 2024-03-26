import { GoogleGenerativeAI } from "@google/generative-ai";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);

async function geminiContent(title, programmingLanguage) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Objective:
  Given a new coding question similar to previously solved problems, solve it by learning from the provided examples.
  
  Instructions to Gemini AI:
  Gemini, we have encountered a new coding question that shares similarities with previously solved problems. Your task is to analyze the provided examples and learn from them to solve the new question effectively.
  
  Related Questions:
  
  1. [Provide LeetCode Question ID or Title]
  2. [Provide LeetCode Question ID or Title]
  3. [Provide LeetCode Question ID or Title]

  Task:
  
  *Analyze the related questions listed above.
  *Identify common patterns, algorithms, and strategies used in those questions.
  *Utilize the learned knowledge to solve the new question effectively.
  *Provide a clear and concise solution code along with any necessary explanations or insights.
  
  Additional Information:
  
  *If there are specific techniques or data structures commonly used in the related questions, pay close attention to them.
  Aim for efficiency and clarity in your solution.
  *Feel free to refer to any resources or external documentation as needed.
  
  Output Format:
  
  *Provide the solution code in ${programmingLanguage} format.
  *Include any relevant comments or explanations to clarify the solution.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let content = response.text();
  content = content.replace(/\*\*(.*?)\*\*/g, "<h2>$1</h2>");
  // console.log(content);
  return content;
}
// geminiContent("How to make a website")

export { geminiContent };

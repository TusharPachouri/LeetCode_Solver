import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB_sGFC4SvnIhKXwVFwiqtqasfTfZLnnmA");

async function formattedSolution(solution) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `You will receive input in the unformatted: 
            unformatted = {${solution}} 
            Your task is to extract the relevant information from the input and format it into the following structure: 
            Output = { "Solution": { "Solution Code": "// Paste the solution code here", 
                                     "Theory": "// Paste the theory and explanations here" } 
                    };`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let formatSolution = response.text();

  return formatSolution;
}

export { formattedSolution };

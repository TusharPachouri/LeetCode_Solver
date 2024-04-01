import { GoogleGenerativeAI } from "@google/generative-ai";
import e from "express";

// Access your API key as an environment variable (replace 'YOUR_API_KEY' with your actual API key)
const genAI = new GoogleGenerativeAI("AIzaSyB_sGFC4SvnIhKXwVFwiqtqasfTfZLnnmA");

async function solveLeetCodeProblem(
  title,
  promptQuestion,
  testCases,
  constraints,
  tags,
  snippet,
  language,
  userComments,
  relatedQuestionsArray
) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const relatedQuestionsList = relatedQuestionsArray.map(
    (question) => `- ${question.title}`
  );

  const solutionSnippet = `
     \`\`\`${language}
           ${snippet}
     \`\`\`
  `;

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `
        #Objective: Given a new coding problem and a set of related, previously solved problems, analyze the provided examples and learn from them to develop an efficient solution to the new problem.

        #Problem: ${title}
        
        ${promptQuestion}
        
        #Test Cases:
        ${testCases}
        
        #Constraints:
        ${constraints}
        
        #Tags:
        ${tags}
        
        #User Comments:
        ${userComments}
        `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `
        #Instructions to Gemini AI:

        Gemini, we have encountered a new coding problem: "${title}", which shares similarities with the following previously solved problems:
        ${relatedQuestionsList.join("\n")}
        
        Your task is to:
        
        1. Carefully analyze the provided related questions and their solutions.
        2. Identify common patterns, algorithms, data structures, and problem-solving strategies used in those questions.
        3. Leverage the learned knowledge to develop an efficient and robust solution for the new problem.
        4. Implement the solution in "${language}" programming language.
        5. Ensure your solution is well-documented, with clear comments explaining the approach, edge cases, and any necessary explanations.
        `,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `
          #Additional Considerations:

          - Pay close attention to the time and space complexities of your solution, aiming for optimal efficiency.
          - Consider edge cases and handle them appropriately in your solution.
          - Provide test cases or examples to validate your solution.
          - Feel free to refer to any relevant resources, documentation, or coding best practices as needed.
          
          #Output Format:
          
          1. Provide the solution code in ${language} format within the following code snippet:
          
          ${solutionSnippet}
          
          2. Include clear comments explaining the approach, time and space complexities, edge cases, and any other relevant information.
          3. Provide test cases or examples to validate the solution.
          
          #Example Output: (Template) Output format for the solution, and object name should be Output.
          #Code should be written in the following format: and should be formatted as a JSON object.
          #The JSON object should contain the following fields, and the values should be replaced with the appropriate information.
          Output = {
            "Solution": {"Solution Code"},
          };
          `,
          },
        ],
      },
      // Add a model response here to complete the turn
      {
        role: "model",
        parts: [
          {
            text: `
      I understand. Based on the provided problem details (title, prompt, test cases, constraints, tags, and related questions), I will analyze the problem and leverage insights from the related questions to propose an efficient solution in ${language}.

      Please ensure the solution includes:
        - Clear and well-commented code explaining the approach, time/space complexity, and edge cases.
        - Test cases or examples to validate the solution.
    `,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 2000,
      temperature: 0.6, // Prioritize focus and relevance (adjust between 0.5-0.8)
      topP: 0.9, // Emphasize more likely continuations (adjust between 0.8-0.95)
    },
  });

  const msg =
    `Write the solution code for the new problem. In the code snippet, include comments explaining the approach, time and space complexities, edge cases, and any other relevant information. Provide test cases or examples to validate the solution.
    #Example Output: (Template) Output format for the solution, and object name should be Output.
          #Code should be written in the following format: and should be formatted as a JSON object.
          #The JSON object should contain the following fields, and the values should be replaced with the appropriate information.
          Output = {
            "Solution": {"Solution Code"},
          };
    `;

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  // console.log('text:',text);
  return text;
}

export { solveLeetCodeProblem };

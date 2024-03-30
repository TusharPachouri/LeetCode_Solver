import { GoogleGenerativeAI } from "@google/generative-ai";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyB_sGFC4SvnIhKXwVFwiqtqasfTfZLnnmA");

async function geminiLeetCodeSolver(
  question,
  solutionSnippet,
  relatedQuestionsList,
  programmingLanguage
) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  #Objective: Given a new coding problem and a set of related, previously solved problems, analyze the provided examples and learn from them to develop an efficient solution to the new problem.

#Instructions to Gemini AI:
Gemini, we have encountered a new coding problem: "${question}", which shares similarities with the following previously solved problems: ${relatedQuestionsList}

Your task is to:

1. Carefully analyze the provided related questions and their solutions.
2. Identify common patterns, algorithms, data structures, and problem-solving strategies used in those questions.
3. Leverage the learned knowledge to develop an efficient and robust solution for the new problem.
4. Implement the solution in "${programmingLanguage}" programming language.
5. Ensure your solution is well-documented, with clear comments explaining the approach, edge cases, and any necessary explanations.

#Additional Considerations:
- Pay close attention to the time and space complexities of your solution, aiming for optimal efficiency.
- Consider edge cases and handle them appropriately in your solution.
- If applicable, provide test cases or examples to validate your solution.
- Feel free to refer to any relevant resources, documentation, or coding best practices as needed.

#Output Format:
1. Provide the solution code in ${programmingLanguage} format within the following code snippet:

${solutionSnippet}

2. Include clear comments explaining the approach, time and space complexities, edge cases, and any other relevant information.
3. If applicable, provide test cases or examples to validate the solution.

#Example Output:
/**
 * Solution for "Title of the Question"
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Approach:
 * [Explain the approach and any relevant details]
 *
 * Edge Cases:
 * [Mention any edge cases and how they are handled]
 *
 * [Solution Code]
 *
 * Example Usage:
 * [Provide test cases or examples to validate the solution]
 */
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let solution = response.text();
  solution = solution.replace(/\*\*(.*?)\*\*/g, "<h2>$1</h2>");
  // console.log(content);
  return solution;
}
// geminiContent("How to make a website")
async function testGeminiLeetCodeSolver() {
  try {
    const relatedQuestions = [
      "Two Sum",
      "Add Two Numbers",
      "Longest Substring Without Repeating Characters",
    ];
    const question = `3. Longest Substring Without Repeating Characters
    Medium
    Topics
    Companies
    Given a string s, find the length of the longest 
    substring
     without repeating characters.
    
     
    
    Example 1:
    
    Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3.
    Example 2:
    
    Input: s = "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.
    Example 3:
    
    Input: s = "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3.
    Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
     
    
    Constraints:
    
    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces.
    `;
    const solutionSnippet = `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        `
    const programmingLanguage = "python";

    const solutionContent = await geminiLeetCodeSolver(
      question,
      solutionSnippet,
      relatedQuestions,
      programmingLanguage
    );
    console.log("Generated solution content:", solutionContent);
  } catch (error) {
    console.error("Error:", error);
  }
}
// Call the test function
testGeminiLeetCodeSolver();

export { geminiLeetCodeSolver };

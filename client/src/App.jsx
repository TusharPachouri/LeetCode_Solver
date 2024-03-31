import { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  // State to hold the response
  const [response, setResponse] = useState(null);

  // Simulated API call
  useEffect(() => {
    // Simulated API response (replace with your actual API call)
    const simulatedResponse = {
      "statusCode": 200,
      "data": "```javascript\n// Title: Two Sum\n\n// Problem: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\n// Approach: Using a hash table to store the complement of each number as we iterate through the array.\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)\n\n// Test Cases:\nconst test1 = twoSum([2, 7, 11, 15], 9); // [0, 1]\nconst test2 = twoSum([3, 2, 4], 6); // [1, 2]\nconst test3 = twoSum([3, 3], 6); // [0, 1]\n\nfunction twoSum(nums, target) {\n  const map = new Map();\n\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n\n    // Check if the complement exists in the map\n    if (map.has(complement)) {\n      // If the complement exists, return the indices of the two numbers\n      return [map.get(complement), i];\n    }\n\n    // If the complement does not exist, add the current number and its index to the map\n    map.set(nums[i], i);\n  }\n\n  // If no pair is found, return an empty array\n  return [];\n}\n\nconsole.log(test1); // [0, 1]\nconsole.log(test2); // [1, 2]\nconsole.log(test3); // [0, 1]\n```",
      "message": "Content generated successfully",
      "success": true
    };

    // Set the response state
    setResponse(simulatedResponse);
  }, []); // Empty dependency array to execute the effect only once

  return (
    <div className="app">
      {response && (
        <div className="api-response">
          <h2>API Response</h2>
          <div>Status Code: {response.statusCode}</div>
          <div>Message: {response.message}</div>
          <div>Success: {response.success.toString()}</div>
          <div>Data:</div>
          <div className="code-box">
            <pre>
              <code>{response.data}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

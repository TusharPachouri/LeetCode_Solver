import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const SolutionComponent = () => {
  //   const history = useHistory();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
    testCases: "",
    constraints: "",
    tags: "",
    snippet: "",
    language: "",
    userComments: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/gemini/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("Data sent to server:", formData);
      if (!response.ok) {
        throw new Error("Failed to send data to server");
      }
      const responseData = await response.json();
      console.log("Server response:", responseData);
      alert("Data sent successfully!");
      navigate('/display', { state: { responseData } });
      //   history.push("/display", { responseData });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send data to server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <br />
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="prompt">Prompt:</label>
      <br />
      <textarea
        id="prompt"
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="testCases">Test Cases:</label>
      <br />
      <textarea
        id="testCases"
        name="testCases"
        value={formData.testCases}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="constraints">Constraints:</label>
      <br />
      <textarea
        id="constraints"
        name="constraints"
        value={formData.constraints}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="tags">Tags:</label>
      <br />
      <input
        type="text"
        id="tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="snippet">Snippet:</label>
      <br />
      <textarea
        id="snippet"
        name="snippet"
        value={formData.snippet}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="language">Language:</label>
      <br />
      <input
        type="text"
        id="language"
        name="language"
        value={formData.language}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="userComments">User Comments:</label>
      <br />
      <textarea
        id="userComments"
        name="userComments"
        value={formData.userComments}
        onChange={handleChange}
        required
      />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SolutionComponent;

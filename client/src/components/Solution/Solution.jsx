import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/img/background.jpg";
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
      navigate("/display", { state: { responseData } });
      //   history.push("/display", { responseData });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send data to server");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 p-6 bg-gray-400 rounded-xl shadow-2xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      >
        <div className="mb-4">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Prompt:
          </label>
          <textarea
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="testCases"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Test Cases:
          </label>
          <textarea
            id="testCases"
            name="testCases"
            value={formData.testCases}
            onChange={handleChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="constraints"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Constraints:
          </label>
          <textarea
            id="constraints"
            name="constraints"
            value={formData.constraints}
            onChange={handleChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="snippet"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Snippet:
          </label>
          <textarea
            id="snippet"
            name="snippet"
            value={formData.snippet}
            onChange={handleChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="language"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            Language:
          </label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="userComments"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
          >
            User Comments:
          </label>
          <textarea
            id="userComments"
            name="userComments"
            value={formData.userComments}
            onChange={handleChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SolutionComponent;

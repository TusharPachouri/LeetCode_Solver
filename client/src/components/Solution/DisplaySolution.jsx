import { useLocation } from "react-router-dom";

function DisplaySolution() {
  const location = useLocation();
  const responseData = location.state?.responseData;

  const formatCodeBlock = (code) => {
    // Remove backticks and newlines
    code = code.replace(/```/g, '').trim();

    // Indent code block with 4 spaces
    const lines = code.split('\n').map(line => '    ' + line);
    return lines.join('\n');
  };

  const formatContent = (content) => {
    // Replace ** ** with <strong> tags
    return content.replace(/\*\*(.*?)\*\*/g, (match, group) => `<strong>${group}</strong>`);
  };

  return (
    <div>
      {responseData ? (
        <>
          <h2>{responseData.success ? formatContent("Solution Generated Successfully") : formatContent("Failed to Generate Solution")}</h2>
          {responseData.success && (
            <div>
              <h3>Output:</h3>
              <pre>{formatCodeBlock(responseData.data)}</pre>
              <h3>Message:</h3>
              <p>{formatContent(responseData.message)}</p>
            </div>
          )}
        </>
      ) : (
        <p>No response data available.</p>
      )}
    </div>
  );
}

export default DisplaySolution;

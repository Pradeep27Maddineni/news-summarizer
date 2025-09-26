import React, { useState } from "react";
import axios from "axios";

function App() {
  // State for user input, summary result, and loading status
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to call backend summarize API
  const handleSummarize = async () => {
    if (!text.trim()) {
      setSummary("⚠️ Please enter some text first.");
      return;
    }

    setLoading(true);
    setSummary(""); // Clear old summary

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/summarize/", { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing:", error);
      setSummary("⚠️ Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "40px", fontFamily: "Arial, sans-serif" }}>
      <h2>📰 News Summarizer</h2>

      {/* Textarea for input */}
      <textarea
        rows="8"
        cols="60"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your article or news here..."
        style={{ padding: "10px", fontSize: "14px" }}
      />

      <br />

      {/* Summarize button */}
      <button
        onClick={handleSummarize}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {/* Summary output */}
      <h3>Summary:</h3>
      <p style={{ background: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
        {summary}
      </p>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // Backend status
  const [status, setStatus] = useState("loading");

  // News summarization
  const [topic, setTopic] = useState("technology");
  const [summaries, setSummaries] = useState([]);
  const [loadingSummaries, setLoadingSummaries] = useState(false);

  // Check backend health on mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/health/")
      .then(res => setStatus(res.data.status))
      .catch(err => setStatus("error"));
  }, []);

  // Fetch summaries from backend
  const fetchSummaries = () => {
    if (!topic) return;
    setLoadingSummaries(true);
    axios.get(`http://127.0.0.1:8000/api/summarize/?topic=${topic}`)
      .then(res => setSummaries(res.data.summaries))
      .catch(err => {
        console.error(err);
        setSummaries([]);
      })
      .finally(() => setLoadingSummaries(false));
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>📰 News Summarizer</h1>

      {/* Backend health status */}
      <p><strong>Backend status:</strong> {status}</p>

      {/* Topic input */}
      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., technology, bitcoin)"
          style={{ padding: 8, width: "70%", marginRight: 10 }}
        />
        <button onClick={fetchSummaries} style={{ padding: "8px 16px" }}>
          Summarize
        </button>
      </div>

      {/* Loading indicator */}
      {loadingSummaries && <p>Fetching and summarizing news...</p>}

      {/* Display summarized news */}
      <div style={{ marginTop: 20 }}>
        {summaries.length === 0 && !loadingSummaries && (
          <p>No summaries to display. Enter a topic and click Summarize.</p>
        )}
        {summaries.map((s, idx) => (
          <div
            key={idx}
            style={{
              marginTop: 15,
              padding: 15,
              border: "1px solid #ccc",
              borderRadius: 5,
              backgroundColor: "#f9f9f9"
            }}
          >
            <h3>{s.title}</h3>
            <p>{s.summary}</p>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              Read full article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

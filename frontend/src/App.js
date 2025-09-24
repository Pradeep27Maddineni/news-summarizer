import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/health/")
      .then(res => setStatus(res.data.status))
      .catch(err => setStatus("error"));
  }, []);

  return (
    <div style={{padding:20}}>
      <h1>📰 News Summarizer</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;

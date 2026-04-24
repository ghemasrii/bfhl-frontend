import React, { useState } from "react";
import axios from "axios";
import ResponseCard from "./components/ResponseCard";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://bfhl-backend-x6vk.onrender.com/bfhl";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const dataArray = input
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const res = await axios.post(API_URL, {
        data: dataArray,
      });

      setResponse(res.data);
    } catch (err) {
      setError("API request failed. Please check backend deployment.");
    }

    setLoading(false);
  };

  const loadSample = () => {
    setInput(
      "A->B, A->C, B->D, C->E, E->F, X->Y, Y->Z, Z->X, G->H, G->H, hello"
    );
  };

  return (
    <div className="container">
      <h1>BFHL Hierarchy Builder</h1>
      <p>SRM Full Stack Engineering Challenge</p>

      <textarea
        placeholder="Enter nodes separated by commas..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="buttons">
        <button onClick={handleSubmit}>
          Submit
        </button>

        <button onClick={loadSample}>
          Sample Input
        </button>
      </div>

      {loading && <p className="loading">Processing...</p>}
      {error && <p className="error">{error}</p>}
      {response && <ResponseCard data={response} />}
    </div>
  );
}

export default App;
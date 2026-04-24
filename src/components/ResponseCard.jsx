import React from "react";

function ResponseCard({ data }) {
  return (
    <div className="response-card">
      <h2>Response</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default ResponseCard;
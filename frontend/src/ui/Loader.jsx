import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: "4px",
      }}
      className="loader-container"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <img src="/loader/gemini.png" alt="" key={i} className="loader-icon" />
      ))}
    </div>
  );
};

export default Loader;

import React from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rephypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { useState, useEffect } from "react";
import "../index.css";

const API = import.meta.env.VITE_AI_API_LINK;
const Reviewer = () => {
  const [code, setCode] = useState(`function sum() { return 1+1; }`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    prism.highlightAll();
  }, []);
  async function reviewCode() {
    try {
      setLoading(true);
      const response = await axios.post(`${API}/ai/get-review`, {
        code,
      });
      setReview(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div className="right">
          {loading && <div>Loading...</div>}
          <Markdown rehypePlugins={[rephypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default Reviewer;

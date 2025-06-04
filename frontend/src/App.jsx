import { useState, useEffect } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rephypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

const API = import.meta.env.AI_API_LINK;

function App() {
  const [code, setCode] = useState(`function sum() { return 1+1; }`);
  const [review, setReview] = useState(``);
  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post(`${API}/ai/get-review`, {
      code,
    });

    setReview(response.data);
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
          <Markdown rehypePlugins={[rephypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

function sum() {
  return 1 + 1;
}

export default App;

import React from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-sql";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rephypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { useState, useEffect } from "react";
import "../index.css";
import Loader from "../ui/Loader";

const API = import.meta.env.VITE_AI_API_LINK;

const supportedLanguages = [
  "Javascript",
  "Java",
  "Python",
  "C",
  "C++",
  "SQL",
  "Ruby",
  "Rust",
];

const languageMap = {
  Javascript: "js",
  Java: "java",
  Python: "python",
  C: "c",
  "C++": "cpp",
  SQL: "sql",
  Ruby: "ruby",
  Rust: "rust",
};

const Reviewer = () => {
  const [code, setCode] = useState(
    ` // Write your code here... \n\nfunction helloOops() {\n  console.log("Welcome to OopsFinder!");\n}\n\nhelloOops();`
  );
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Javascript");
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
            <LanguageSelector
              selection={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => {
                const langKey = languageMap[selectedLanguage] || "javascript";
                const grammar = prism.languages[langKey];
                return prism.highlight(code, grammar, langKey);
              }}
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
          <button
            className="review"
            onClick={reviewCode}
            disabled={loading === true}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading === true
              ? "Reviewing..."
              : `${review.length !== 0 ? "Regenerate" : "Review"}`}
          </button>
        </div>
        <div className="right">
          {loading === true ? (
            <Loader />
          ) : (
            <Markdown rehypePlugins={[rephypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
};

const LanguageSelector = ({ selection, setSelectedLanguage }) => {
  const selectedLanguage = selection || "Javascript";
  return (
    <div
      style={{ position: "absolute", top: "10px", right: "10px", zIndex: "1" }}
    >
      <select
        name="language"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {supportedLanguages.map((language) => (
          <option value={language} key={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Reviewer;

import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("# Type your Python code...");
  const [syntaxCheck, setSyntaxCheck] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState("");

  const handleEditorChange = (newCode) => {
    setCode(newCode);

    // ✅ Send code to FastAPI for syntax checking & AI suggestion
    axios.post("https://ai-powered-ide-backend-0oih.onrender.com//analyze-code", { code: newCode })
      .then((response) => {
        console.log("✅ API Response:", response.data);
        setSyntaxCheck(response.data.syntax_check);
        setAiSuggestions(response.data.ai_suggestions);
      })
      .catch((error) => {
        console.error("❌ API Request Failed:", error);
      });
  };

  return (
    <div>
      <h1>Intelligent Code Editor</h1>
      <Editor
        height="400px"
        defaultLanguage="python"
        value={code}
        onChange={handleEditorChange}
      />
      <p><strong>Syntax Check:</strong> {syntaxCheck || "⏳ Checking..."}</p>
      <p><strong>AI Suggestions:</strong> {aiSuggestions || "⏳ Waiting for AI..."}</p>
    </div>
  );
}

export default App;

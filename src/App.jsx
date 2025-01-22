import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatContainer from "./components/ChatContainer";
import InputForm from "./components/InputForm";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately

    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        {
          contents: [{ role: "user", parts: [{ text: currentQuestion }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API Response:", response.data); // Log response to debug

      // Extract response content safely
      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received from the AI.";

      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: "Sorry - Something went wrong. Please try again!",
        },
      ]);
    } finally {
      setGeneratingAnswer(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 via-gray-700 to-gray-500 
    bg-[length:200%_200%] animate-[gradientMove_10s_linear_infinite]"
    >
      <div className="h-full max-w-4xl mx-auto flex flex-col p-3 relative">
        <Header />
        <ChatContainer
          chatHistory={chatHistory}
          generatingAnswer={generatingAnswer}
          chatContainerRef={chatContainerRef}
        />
        <InputForm
          question={question}
          setQuestion={setQuestion}
          generatingAnswer={generatingAnswer}
          generateAnswer={generateAnswer}
        />
      </div>
    </div>
  );
}

export default App;

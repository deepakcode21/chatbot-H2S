import React from "react";
import ReactMarkdown from "react-markdown";

function ChatContainer({ chatHistory, generatingAnswer, chatContainerRef }) {
  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto mb-4 rounded-b-lg bg-[#F1F0E8] shadow-xl p-6 hide-scrollbar border border-gray-300"
    >
      {chatHistory.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="bg-gradient-to-br from-purple-100 to-blue-50 rounded-2xl p-10 max-w-2xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Welcome to Chat AI! 👋</h2>
            <p className="text-gray-700 mb-6 text-lg">
              I'm here to assist you with any questions. Try asking about:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-3 hover:bg-blue-100 transition-all">
                <span className="text-blue-500 text-xl">💡</span>
                <span className="text-gray-800 font-medium">General knowledge</span>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-3 hover:bg-blue-100 transition-all">
                <span className="text-blue-500 text-xl">🔧</span>
                <span className="text-gray-800 font-medium">Technical questions</span>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-3 hover:bg-blue-100 transition-all">
                <span className="text-blue-500 text-xl">📝</span>
                <span className="text-gray-800 font-medium">Writing assistance</span>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-3 hover:bg-blue-100 transition-all">
                <span className="text-blue-500 text-xl">🤔</span>
                <span className="text-gray-800 font-medium">Problem solving</span>
              </div>
            </div>
            <p className="text-gray-500 mt-8 text-sm">
              Type your question below and press Enter or click Send!
            </p>
          </div>
        </div>
      ) : (
        <>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-4 ${chat.type === "question" ? "text-right" : "text-left"}`}
            >
              <div
                className="inline-block max-w-[80%] p-4 rounded-xl overflow-auto hide-scrollbar shadow-md bg-white text-gray-900 border border-gray-300"
              >
                <ReactMarkdown className="overflow-auto hide-scrollbar text-lg leading-relaxed">
                  {chat.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </>
      )}
      {generatingAnswer && (
        <div className="text-left animate-pulse">
          <div className="inline-block bg-white p-4 rounded-xl shadow-md border border-gray-300">
            Thinking...
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
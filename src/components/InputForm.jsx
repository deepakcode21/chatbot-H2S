import React from "react";

function InputForm({ question, setQuestion, generatingAnswer, generateAnswer }) {
  return (
    <form
      onSubmit={generateAnswer}
      className="bg-[#F1F0E8] rounded-xl shadow-md p-3 border border-gray-200"
    >
      <div className="flex gap-4 items-center">
        <textarea
          required
          className="flex-1 border border-gray-300 rounded-lg p-2 h-[40px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 resize-none text-gray-700 placeholder-gray-400 shadow-sm overflow-hidden"
          // The "overflow-hidden" class hides the scrollbar.
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          rows="1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              generateAnswer(e);
            }
          }}
        ></textarea>
        <button
          type="submit"
          className={`flex items-center justify-center px-4 py-2 h-[40px] bg-[#222831] text-white font-semibold rounded-lg shadow-md hover:bg-[#6D4FC2] transition-all active:bg-[#6D4FC2] disabled:opacity-50 disabled:cursor-not-allowed`}
          // Button changes color on hover and active states.
          disabled={generatingAnswer}
        >
          {generatingAnswer ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Send</>
          )}
        </button>
      </div>
    </form>
  );
}

export default InputForm;
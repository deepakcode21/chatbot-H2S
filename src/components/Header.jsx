import React from "react";

function Header() {
  return (
    <header
      className="bg-[#00ADB5] text-[#EEEEEE] py-4 flex flex-col items-center justify-center shadow-lg rounded-t-lg"
    >
      <div className="container text-center">
        <h1 className="text-3xl font-bold">Chat AI</h1>
        <p className="mt-2 text-lg">
          Your intelligent conversation partner 🤖
        </p>
      </div>
    </header>
  );
}

export default Header;

// src/components/ChatbotButton.jsx
import React, { useState } from "react";
import botLogo from "../assets/images/ai_bot.png";

export default function ChatbotButton() {
  const [isHovered, setIsHovered] = useState(false);

  const openChatbot = () => {
    alert("Chatbot will open here!");
    // Replace with actual chatbot modal logic later
  };

  return (
    <div
      onClick={openChatbot}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 bg-white rounded-lg border border-gray-200 cursor-pointer z-50 transition-all duration-300 font-mono"
      style={{
        width: "64px",
        height: "64px",
        padding: "14px",
        boxShadow: isHovered 
          ? "0px 4px 12px rgba(0, 0, 0, 0.15)" 
          : "0px 2px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="relative w-full h-full">
        <img
          src={botLogo}
          alt="Library Assistant"
          className="w-full h-full object-contain transition-transform duration-300"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)"
          }}
        />
        {isHovered && (
          <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
            Need help?
          </div>
        )}
      </div>
    </div>
  );
}
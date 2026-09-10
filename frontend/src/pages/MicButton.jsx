// MicButton.jsx
import React from "react";
import { SiChatbot } from "react-icons/si";

const MicButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 p-4 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition"
    >
      <SiChatbot size={24} />
    </button>
  );
};

export default MicButton;

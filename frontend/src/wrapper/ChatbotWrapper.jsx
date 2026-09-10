// ChatbotWrapper.jsx
import React, { useState } from "react";
import MicButton from "../pages/MicButton";
import Chatbot from "./Chatbot";

const ChatbotWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Mic Button */}
      <MicButton onClick={() => setOpen(true)} />

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%]">
            {/* Chatbot */}
            <Chatbot />

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-15 right-40 bg-red-500 hover:bg-red-600 
                         text-white w-8 h-8 flex items-center justify-center 
                         rounded-full shadow-lg transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWrapper;

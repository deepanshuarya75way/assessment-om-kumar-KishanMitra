import React, { useRef, useState } from "react";
import { Mic, Send, Volume2, Bot } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const typeMessage = (fullText, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        callback(fullText.slice(0, i));
        i++;
      } else clearInterval(interval);
    }, 15);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user", time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/ai/chat`, {
        prompt: input,
      });

      const botText = response.data.response || "⚠️ No response";
      const botMsg = { text: "", sender: "bot", time: getTime() };
      setMessages((prev) => [...prev, botMsg]);

      typeMessage(botText, (current) => {
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 ? { ...msg, text: current } : msg
          )
        );
      });
    } catch (error) {
      const errorMsg = { text: "⚠️ Failed to get response", sender: "bot", time: getTime() };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleMic = async () => {
    if (recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob, "speech.wav");

        try {
          const res = await axios.post(`${import.meta.env.VITE_URL}/nlp/speech-to-text`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const recognizedText = res.data.text;
          if (recognizedText) {
            setInput(recognizedText);
            setTimeout(() => handleSend(), 500);
          }
        } catch (err) {
          console.error("Speech-to-text error", err);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Mic access denied", error);
      alert("🎙️ Please allow microphone access.");
    }
  };

  const handleSpeak = async (text) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/nlp/text-to-speech`,
        new URLSearchParams({ text }),
        { responseType: "blob" }
      );
      const audioUrl = URL.createObjectURL(res.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS error", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto mt-10 mb-5 bg-gradient-to-br from-green-50 to-green-100 border shadow-xl rounded-2xl
                    w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] h-[520px] overflow-hidden">

      {/* Chat Header */}
      <div className="flex items-center space-x-2 bg-green-600 text-white p-4 shadow-md">
        <Bot size={22} className="bg-white text-green-600 p-1 rounded-full" />
        <div>
          <h1 className="font-semibold text-lg">AI Farmer Chatbot</h1>
          <p className="text-xs opacity-80">Your smart farming assistant 🌱</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center text-sm mt-10">
            Start chatting with AI Farmer 🌾
          </p>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-end space-x-2 max-w-[80%]">
                {msg.sender === "bot" && (
                  <span className="text-xs text-gray-400">{msg.time}</span>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl shadow-md whitespace-pre-wrap break-words text-sm sm:text-base ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <div className="relative prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1 text-gray-600 hover:text-green-600"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.sender === "user" && (
                  <span className="text-xs text-gray-400">{msg.time}</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-2xl animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center bg-gray-50 border-t p-2 sm:p-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-3 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-lg"
        >
          <Send size={18} />
        </button>
        <button
          onClick={handleMic}
          className={`ml-2 p-3 rounded-full shadow-lg ${
            recording ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
}

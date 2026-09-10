import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative h-screen w-[455px] overflow-hidden md:w-full">
      {/* Background Video */}
      <video
        src="https://www.pexels.com/download/video/3266800/"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Main Title with Gradient Animation */}
        <motion.h1
          className="text-3xl md:text-5xl md:mt-20 font-bold leading-tight tracking-tight bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 bg-[length:200%_200%] bg-clip-text text-transparent"
          >
            Your Smart Farming Companion
          </motion.span>
        </motion.h1>

        {/* Subtitle with Gradient + Glow Animation */}
        <motion.h2
          className="text-xl md:text-3xl xl:text-4xl font-semibold mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                "0px 0px 5px #fff",
                "0px 0px 20px #ff00ff",
                "0px 0px 5px #fff",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Anytime, Anywhere
          </motion.span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="mt-6 max-w-[90%] md:max-w-lg text-base md:text-lg xl:text-xl leading-relaxed text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          Empowering farmers with AI-driven crop advisory, real-time weather
          insights, pest diagnosis, market prices, and sustainable farming
          practices across India.
        </motion.p>

        {/* Explore Button with Rotating Border */}
        <motion.div
          className="relative mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <button className="relative px-10 py-3 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-700 transition">
            Explore
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
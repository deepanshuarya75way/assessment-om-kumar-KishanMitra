import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../components/cards/ServiceCard";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const serviceData = [
  {
    name: "Crop Advisory with AI",
    description:
      "Get AI-powered guidance for crop planning, cultivation, and yield optimization.",
    image: "https://unpkg.com/lucide-static/icons/sprout.svg",
  },
  {
    name: "Weather Forecasting",
    description:
      "Receive hyperlocal weather updates to make timely farming decisions.",
    image: "https://unpkg.com/lucide-static/icons/cloud-snow.svg",
  },
  {
    name: "Soil Detection",
    description:
      "Analyze your soil for pH, nutrients, and moisture for better crop health.",
    image: "https://unpkg.com/lucide-static/icons/test-tube.svg",
  },
  {
    name: "Disease Detection",
    description:
      "Detect crop diseases and get recommendations for organic and chemical treatments.",
    image: "https://unpkg.com/lucide-static/icons/stethoscope.svg",
  },
  {
    name: "Market Price",
    description: "Check the latest market prices for crops to maximize your profits.",
    image: "https://unpkg.com/lucide-static/icons/bar-chart-2.svg",
  },
  {
    name: "Chat with AI",
    description:
      "Interact with an AI assistant to get answers and guidance for farming queries.",
    image: "https://unpkg.com/lucide-static/icons/message-square.svg",
  },
];

function FarmingSolutions() {
  return (


    <div className="max-w-full bg-gray-50">
      {/* Header Section */}
      <div className="px-2 sm:px-6 lg:px-0 pt-10 bg-green-50">

        <div className="flex items-center justify-center space-x-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-sparkles h-6 w-6 text-green-600 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
          </svg>
          <span className="text-green-600 font-semibold text-xl">
            Complete Solutions
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-sparkles h-6 w-6 text-green-600 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
          </svg>
        </div>
  <div className="flex items-stretch justify-center gap-6">

    {/* Left Animation */}
    <div className="flex items-center">
      <DotLottieReact
        src="https://lottie.host/ac8ddb9f-d59e-4de6-91b0-374ede2c60a7/3gNWp4dbdF.lottie"
        loop
        autoplay
        className="w-80 h-full pb-5 "
      />
    </div>

    {/* Center Text Block */}
    <div className="text-center flex flex-col justify-center max-w-3xl">
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-teal-400 to-green-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Complete Farming Solutions
      </motion.h2>
      <motion.p
        className="text-lg sm:text-xl text-green-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        From seed to harvest, DigiShivar AI provides comprehensive support for
        every aspect of modern agriculture
      </motion.p>
    </div>

    {/* Right Animation */}
    <div className="flex items-center">
      <DotLottieReact
        src="https://lottie.host/43571147-8baa-4b09-8a38-67dfd8984d4c/FT6kTMnPth.lottie"
        loop
        autoplay
        className="w-40 h-full pb-5"
      />
    </div>
  </div>
</div>


      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-12 md:py-0 py-12">
        {serviceData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -8, rotate: 1 }}
            whileTap={{ scale: 1.05, y: -8, rotate: 1 }}
          >
            <ServiceCard
              name={item.name}
              description={item.description}
              image={item.image}
              className="bg-gradient-to-br from-green-50 via-teal-50 to-green-100 rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center"
            />
          </motion.div>
        ))}


      </div>
    </div>
  );
}

export default FarmingSolutions;

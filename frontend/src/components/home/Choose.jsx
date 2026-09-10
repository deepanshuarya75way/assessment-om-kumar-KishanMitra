import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Droplet, Bot, CloudSun, Sparkles, Users } from "lucide-react"; // icons

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { 
    scale: 1.05, 
    y: -5, 
    boxShadow: "0 15px 40px rgba(0,255,162,0.4)",
    rotate: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const Choose = () => {
  const cards = [
    {
      title: "AI-Powered Disease Detection",
      desc: "Quickly identify crop diseases using advanced AI image recognition, reducing crop loss and ensuring timely treatment.",
      bg: "#14532d",
      icon: Leaf,
    },
    {
      title: "Accurate Soil Analysis",
      desc: "Get detailed insights into soil health, nutrients, and moisture levels to improve productivity and choose the right fertilizers.",
      bg: "#166534",
      icon: Droplet,
    },
    {
      title: "24/7 AI Chatbot Support",
      desc: "Farmers can ask questions anytime and get instant guidance about crops, farming techniques, and market updates.",
      bg: "#14532d",
      icon: Bot,
    },
    {
      title: "Real-Time Weather Forecasting",
      desc: "Access hyper-local and accurate weather predictions to plan irrigation, harvesting, and protect crops from climate risks.",
      bg: "#166534",
      icon: CloudSun,
    },
    {
      title: "Smart & Affordable Solutions",
      desc: "Our platform combines cutting-edge AI with cost-effective tools, making modern farming accessible for every farmer.",
      bg: "#14532d",
      icon: Sparkles,
    },
    {
      title: "Freelancers with a Company Mindset",
      desc: "We combine the affordability of freelancers with the professionalism of an agency.",
      bg: "#166534",
      icon: Users,
    }
  ];

  return (
    <section className="bg-gray-50 overflow-hidden text-white">
      <div className="px-4 sm:px-6 lg:px-18 mx-auto max-w-7xl mb-7 lg:mb-7">
        {/* Heading */}
        <div className="text-center">
          <h2 className="relative text-center text-2xl sm:text-3xl md:mt-10 md:text-4xl lg:text-5xl font-serif font-bold mb-5 mt-4 text-green-600">
            WHY CHOOSE US ??
          </h2>
        </div>

        {/* Cards Grid */}
       <div className="grid grid-cols-2 ml-9 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 text-center md:px-8 md:gap-6">
  {cards.map((card, index) => {
    const Icon = card.icon;
    return (
      <motion.div
        key={index}
        className="relative group rounded-2xl border border-green-700 shadow-[0_8px_30px_rgba(0,255,162,0.2)] p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer h-[150px] sm:h-[400px] md:h-[200px] lg:h-[240px] lg:w-[330px]"
        style={{ backgroundColor: card.bg }}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        whileTap="hover"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Icon */}
        <Icon className="w-10 h-10 text-green-400 mb-3" />

        <h3 className="mt-2 text-base sm:text-lg md:text-lg lg:text-lg font-semibold text-green-400 font-pj">
          {card.title}
        </h3>
        <p className="mt-3 text-xs sm:text-sm md:text-sm lg:text-sm font-pj">
          {card.desc}
        </p>
      </motion.div>
    );
  })}
</div>
     </div>
    </section>
  )
}

export default Choose

import React from 'react';
import { useNavigate } from 'react-router-dom';

function ServiceCard({ name, description, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (name === 'Crop Advisory with AI' || name==='Chat with AI') {
      navigate('/ai-chatbot');

    }
    else if(name==='Weather Forecasting'){

      navigate('/weather')
    }
     else if(name==='Soil Detection'){

      navigate('/soil-detection')
    }
     else if(name==='Disease Detection'){

      navigate('/disease-detection')
    }
     else{

      navigate('/market-price')
    }
 
    
  };

  return (
    <div 
      onClick={handleClick} 
      className="group bg-gradient-to-r from-green-100 to-green-200 p-8 rounded-2xl  shadow-lg cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-gray-100 hover:border-transparent  hover:text-white relative overflow-hidden"
    >
      <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-green-200 text-green-600 flex items-center justify-center mb-6  group-hover:bg-green-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          <img src={image} alt={name} />
        </div>

        <h3 className="text-xl font-semibold text-green-700 mb-4  transition-colors duration-300">
          {name}
        </h3>

        <p className="text-green-900 text-sm leading-relaxed  transition-colors duration-300 mb-4">
          {description}
        </p>

        <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-black transition-all duration-300">
          <span className="mr-2">Learn More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;

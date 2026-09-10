import React from 'react'

function WeatherCard(props) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:scale-105 transform transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center space-x-2 mb-2">
        <img 
          src={props.image} 
          alt={props.name} 
          className="w-6 h-6 text-blue-600"
        />
        <span className="text-sm font-medium text-gray-700">{props.name}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{props.value}</div>
    </div>
  )
}

export default WeatherCard

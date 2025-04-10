import React from 'react';

const EarningMethodCard = ({ method, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClick(method.id)}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">{method.icon}</span>
          <h3 className="text-xl font-semibold text-gray-800">{method.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{method.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Difficulty</span>
            <span className="font-medium text-gray-800">{method.difficulty}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Startup Cost</span>
            <span className="font-medium text-gray-800">{method.startupCost}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Earning Potential</span>
            <span className="font-medium text-gray-800">{method.earningPotential}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Time Commitment</span>
            <span className="font-medium text-gray-800">{method.timeCommitment}</span>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 py-3 px-6 border-t border-blue-100">
        <span className="text-blue-600 font-medium flex items-center justify-between">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default EarningMethodCard;
import React from 'react';

const EarningMethodDetail = ({ method, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <button 
          onClick={onBack} 
          className="flex items-center text-blue-600 font-medium mb-4 cursor-pointer hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all methods
        </button>

        <div className="flex items-center mb-6">
          <span className="text-5xl mr-4">{method.icon}</span>
          <h2 className="text-3xl font-bold text-gray-800">{method.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Difficulty</h4>
            <p className="text-lg font-semibold text-gray-800">{method.difficulty}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Startup Cost</h4>
            <p className="text-lg font-semibold text-gray-800">{method.startupCost}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Earning Potential</h4>
            <p className="text-lg font-semibold text-gray-800">{method.earningPotential}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Time Commitment</h4>
            <p className="text-lg font-semibold text-gray-800">{method.timeCommitment}</p>
          </div>
        </div>

        <div 
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: method.content }}
        ></div>
      </div>
    </div>
  );
};

export default EarningMethodDetail;
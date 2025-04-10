import React, { useState } from 'react';
import earningMethods from '../data/earningMethods';
import EarningMethodCard from '../components/EarningMethodCard';
import EarningMethodDetail from '../components/EarningMethodDetail';

const EarningGuideView = () => {
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    difficulty: '',
    startupCost: '',
    earningPotential: '',
    timeCommitment: ''
  });

  const handleSelectMethod = (id) => {
    setSelectedMethodId(id);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedMethodId(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilter({
      difficulty: '',
      startupCost: '',
      earningPotential: '',
      timeCommitment: ''
    });
  };

  const filteredMethods = earningMethods.filter(method => {
    // Search term filter
    const matchesSearch = method.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        method.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Other filters
    const matchesDifficulty = filter.difficulty === '' || method.difficulty.includes(filter.difficulty);
    const matchesStartupCost = filter.startupCost === '' || method.startupCost.includes(filter.startupCost);
    const matchesEarningPotential = filter.earningPotential === '' || method.earningPotential.includes(filter.earningPotential);
    const matchesTimeCommitment = filter.timeCommitment === '' || method.timeCommitment.includes(filter.timeCommitment);
    
    return matchesSearch && matchesDifficulty && matchesStartupCost && 
           matchesEarningPotential && matchesTimeCommitment;
  });

  const selectedMethod = earningMethods.find(method => method.id === selectedMethodId);

  // If a method is selected, show its details
  if (selectedMethod) {
    return <EarningMethodDetail method={selectedMethod} onBack={handleBack} />;
  }

  // Otherwise show the list of methods
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Online Earning Guide</h2>
        <p className="text-gray-600">
          Discover various ways to earn money online. Explore different methods based on your skills, 
          interests, and resources. Click on any method to learn more.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search earning methods..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button 
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
          >
            Reset filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              name="difficulty"
              value={filter.difficulty}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Startup Cost</label>
            <select
              name="startupCost"
              value={filter.startupCost}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            >
              <option value="">All</option>
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Earning Potential</label>
            <select
              name="earningPotential"
              value={filter.earningPotential}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Commitment</label>
            <select
              name="timeCommitment"
              value={filter.timeCommitment}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        {filteredMethods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMethods.map(method => (
              <EarningMethodCard 
                key={method.id} 
                method={method} 
                onClick={handleSelectMethod} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg mb-4">No earning methods match your filters.</p>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Disclaimer</h3>
        <p className="text-gray-600 text-sm">
          This guide provides general information about online earning methods, not financial advice. 
          Results may vary based on skills, effort, market conditions, and other factors. 
          Research thoroughly before investing time or money in any opportunity.
        </p>
      </div>
    </div>
  );
};

export default EarningGuideView;
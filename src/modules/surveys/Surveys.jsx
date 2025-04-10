import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Surveys() {
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('reward-high');

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulated survey data
        const surveysData = [
          { id: 201, title: 'Consumer Shopping Habits', reward: 8.50, estimatedTime: '15 min', category: 'Market Research', questions: 25 },
          { id: 202, title: 'Technology Usage Survey', reward: 6.25, estimatedTime: '12 min', category: 'Technology', questions: 20 },
          { id: 203, title: 'Food Preferences Study', reward: 5.00, estimatedTime: '10 min', category: 'Food & Beverage', questions: 18 },
          { id: 204, title: 'Travel Experience Feedback', reward: 12.75, estimatedTime: '20 min', category: 'Travel', questions: 30 },
          { id: 205, title: 'Entertainment Streaming Habits', reward: 7.50, estimatedTime: '15 min', category: 'Entertainment', questions: 22 },
          { id: 206, title: 'Financial Services Evaluation', reward: 9.25, estimatedTime: '18 min', category: 'Finance', questions: 28 },
          { id: 207, title: 'Mobile App User Experience', reward: 6.50, estimatedTime: '12 min', category: 'Technology', questions: 19 },
          { id: 208, title: 'Home Decor Preferences', reward: 5.75, estimatedTime: '10 min', category: 'Home & Living', questions: 16 }
        ];
        
        setSurveys(surveysData);
        setFilteredSurveys(surveysData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setLoading(false);
      }
    };
    
    fetchSurveys();
  }, []);

  useEffect(() => {
    // Filter and sort surveys whenever search term or sort criteria changes
    const filtered = surveys.filter(survey => 
      survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'reward-high':
          return b.reward - a.reward;
        case 'reward-low':
          return a.reward - b.reward;
        case 'time-low':
          return parseInt(a.estimatedTime) - parseInt(b.estimatedTime);
        case 'time-high':
          return parseInt(b.estimatedTime) - parseInt(a.estimatedTime);
        case 'questions-low':
          return a.questions - b.questions;
        case 'questions-high':
          return b.questions - a.questions;
        default:
          return 0;
      }
    });
    
    setFilteredSurveys(sorted);
  }, [searchTerm, sortBy, surveys]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading available surveys..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Available Surveys</h1>
        <p className="text-gray-600 mt-1">Share your opinions and earn money by completing surveys. New surveys are added regularly.</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Surveys</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or category..."
              className="input box-border"
            />
          </div>
          
          {/* Sort By */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input box-border"
            >
              <option value="reward-high">Highest Reward</option>
              <option value="reward-low">Lowest Reward</option>
              <option value="time-low">Shortest Time</option>
              <option value="time-high">Longest Time</option>
              <option value="questions-low">Fewest Questions</option>
              <option value="questions-high">Most Questions</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Survey Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurveys.map((survey) => (
          <Link
            key={survey.id}
            to={`/surveys/${survey.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">{survey.title}</h3>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  ${survey.reward.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{survey.estimatedTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{survey.questions} Questions</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {survey.category}
                </span>
                <span className="text-sm text-indigo-600 font-medium">
                  Take Survey →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredSurveys.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No surveys match your search. Try different keywords.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSortBy('reward-high');
            }}
            className="mt-4 btn-primary cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
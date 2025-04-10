import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Tasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('reward-high');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulated task data
        const tasksData = [
          { id: 101, title: 'Website Testing & Feedback', reward: 10.00, estimatedTime: '20 min', category: 'Testing', description: 'Visit a website, complete specific actions, and provide detailed feedback about your experience and any issues found.' },
          { id: 102, title: 'Product Survey', reward: 5.50, estimatedTime: '10 min', category: 'Survey', description: 'Answer questions about your preferences and experiences with consumer products to help companies improve their offerings.' },
          { id: 103, title: 'Data Categorization', reward: 12.25, estimatedTime: '25 min', category: 'Data', description: 'Organize and categorize a set of data entries according to provided guidelines and examples.' },
          { id: 104, title: 'Content Moderation', reward: 8.75, estimatedTime: '15 min', category: 'Content', description: 'Review user-generated content and flag any items that violate platform guidelines or contain inappropriate material.' },
          { id: 105, title: 'Image Annotation', reward: 15.50, estimatedTime: '30 min', category: 'Data', description: 'Draw bounding boxes around specific objects in images to help train machine learning algorithms.' },
          { id: 106, title: 'Customer Preference Survey', reward: 4.25, estimatedTime: '8 min', category: 'Survey', description: 'Share your opinions about product features and design to help shape future product development.' },
          { id: 107, title: 'App Usability Testing', reward: 11.00, estimatedTime: '22 min', category: 'Testing', description: 'Download and use a mobile app, then provide detailed feedback about the user experience and functionality.' },
          { id: 108, title: 'Transcription', reward: 9.50, estimatedTime: '18 min', category: 'Content', description: 'Listen to a short audio clip and accurately transcribe the spoken content into text format.' },
          { id: 109, title: 'Social Media Evaluation', reward: 6.75, estimatedTime: '12 min', category: 'Content', description: 'Review social media content and evaluate its engagement potential and relevance to target audiences.' },
          { id: 110, title: 'Logo Feedback', reward: 3.50, estimatedTime: '5 min', category: 'Design', description: 'View several logo options and provide your preferences and impressions to help companies choose effective branding.' }
        ];
        
        setTasks(tasksData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(tasksData.map(task => task.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'reward-high':
          return b.reward - a.reward;
        case 'reward-low':
          return a.reward - b.reward;
        case 'time-low':
          return parseInt(a.estimatedTime) - parseInt(b.estimatedTime);
        case 'time-high':
          return parseInt(b.estimatedTime) - parseInt(a.estimatedTime);
        default:
          return 0;
      }
    });

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading available tasks..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Available Tasks</h1>
        <p className="text-gray-600 mt-1">Complete tasks to earn money. New tasks are added daily.</p>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Tasks</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword..."
              className="input box-border"
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input box-border"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
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
              <option value="time-low">Quickest Time</option>
              <option value="time-high">Longest Time</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tasks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTasks.map((task) => (
          <Link
            key={task.id}
            to={`/tasks/${task.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  ${task.reward.toFixed(2)}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {task.estimatedTime}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {task.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredAndSortedTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks match your filters. Try adjusting your search criteria.</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
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
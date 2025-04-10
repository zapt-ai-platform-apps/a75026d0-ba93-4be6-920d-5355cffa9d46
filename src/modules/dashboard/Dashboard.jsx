import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import StatsCard from './StatsCard';
import RecentEarnings from './RecentEarnings';
import TasksList from './TasksList';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarned: 0,
    pendingPayout: 0,
    completedTasks: 0,
    availableTasks: 0
  });
  const [recentEarnings, setRecentEarnings] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In a real app, these would be API calls to fetch the actual data
        // Simulated data for demonstration
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalEarned: 258.75,
          pendingPayout: 42.50,
          completedTasks: 23,
          availableTasks: 15
        });
        
        setRecentEarnings([
          { id: 1, date: '2023-11-05', amount: 12.50, source: 'Survey Completion', status: 'Paid' },
          { id: 2, date: '2023-11-04', amount: 8.75, source: 'Data Entry Task', status: 'Paid' },
          { id: 3, date: '2023-11-02', amount: 15.00, source: 'Content Moderation', status: 'Pending' },
          { id: 4, date: '2023-10-30', amount: 5.25, source: 'Referral Bonus', status: 'Paid' }
        ]);
        
        setAvailableTasks([
          { id: 101, title: 'Website Testing', reward: 10.00, estimatedTime: '20 min', category: 'Testing' },
          { id: 102, title: 'Product Survey', reward: 5.50, estimatedTime: '10 min', category: 'Survey' },
          { id: 103, title: 'Data Categorization', reward: 12.25, estimatedTime: '25 min', category: 'Data' }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading your dashboard..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to your Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your earnings and find new opportunities to make money.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard
          title="Total Earned"
          value={`$${stats.totalEarned.toFixed(2)}`}
          icon="💰"
          color="bg-green-100 text-green-800"
        />
        <StatsCard
          title="Pending Payout"
          value={`$${stats.pendingPayout.toFixed(2)}`}
          icon="⏳"
          color="bg-yellow-100 text-yellow-800"
        />
        <StatsCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon="✓"
          color="bg-blue-100 text-blue-800"
        />
        <StatsCard
          title="Available Tasks"
          value={stats.availableTasks}
          icon="📋"
          color="bg-purple-100 text-purple-800"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Earnings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Earnings</h2>
                <Link to="/wallet" className="text-sm text-indigo-600 hover:text-indigo-800">
                  View All
                </Link>
              </div>
              <RecentEarnings earnings={recentEarnings} />
            </div>
          </div>
          
          {/* Available Tasks */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Available Tasks</h2>
                <Link to="/tasks" className="text-sm text-indigo-600 hover:text-indigo-800">
                  View All
                </Link>
              </div>
              <TasksList tasks={availableTasks} />
            </div>
          </div>
        </div>
        
        {/* Sidebar Content */}
        <div className="lg:col-span-1">
          {/* Earnings Goal */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Goal</h2>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">$258.75 / $500.00</span>
                <span className="text-sm text-gray-600">52%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '52%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                You're making great progress! Keep going to reach your monthly goal.
              </p>
            </div>
          </div>
          
          {/* Referral */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Invite Friends & Earn</h2>
              <p className="text-indigo-100 text-sm mb-4">
                Earn 10% of what your referrals make for their first month!
              </p>
              <div className="bg-white p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-500 mb-1">Your Referral Link</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={`https://huzaifa.business/ref/${user?.id?.slice(0, 8) || 'yourcode'}`}
                    className="text-sm text-gray-800 bg-transparent flex-grow outline-none box-border"
                    readOnly
                  />
                  <button className="ml-2 p-1 text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <Link to="/referrals" className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer">
                View Referral Program
              </Link>
            </div>
          </div>
          
          {/* Daily Checkin */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Check-in</h2>
              <p className="text-gray-600 text-sm mb-4">Check in daily to earn bonus points and unlock tasks.</p>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium">M</div>
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium">T</div>
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium">W</div>
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium">T</div>
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-medium">F</div>
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-medium">S</div>
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-medium">S</div>
              </div>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer">
                Check in today (+5 points)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
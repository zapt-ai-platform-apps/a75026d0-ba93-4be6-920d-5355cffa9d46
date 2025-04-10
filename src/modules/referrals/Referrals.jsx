import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Referrals() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarned: 0,
    pendingEarnings: 0
  });
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);
  
  // Generate a referral link based on user ID
  const referralLink = `https://huzaifa.business/ref/${user?.id?.slice(0, 8) || 'yourcode'}`;

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock referral data
        setReferralStats({
          totalReferrals: 5,
          activeReferrals: 3,
          totalEarned: 24.75,
          pendingEarnings: 8.50
        });
        
        setReferrals([
          { id: 1, email: 'j***@example.com', joinDate: '2023-10-15', status: 'Active', earned: 12.50 },
          { id: 2, email: 'm***@gmail.com', joinDate: '2023-10-18', status: 'Active', earned: 8.75 },
          { id: 3, email: 'a***@outlook.com', joinDate: '2023-10-22', status: 'Active', earned: 3.50 },
          { id: 4, email: 's***@yahoo.com', joinDate: '2023-10-25', status: 'Pending', earned: 0 },
          { id: 5, email: 'r***@mail.com', joinDate: '2023-10-28', status: 'Pending', earned: 0 }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching referral data:', error);
        setLoading(false);
      }
    };
    
    fetchReferralData();
  }, [user]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading referral data..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
        <p className="text-gray-600 mt-1">Invite friends and earn 10% of their earnings for their first month.</p>
      </div>
      
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Referrals</h3>
          <p className="text-2xl font-semibold text-gray-900">{referralStats.totalReferrals}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Active Referrals</h3>
          <p className="text-2xl font-semibold text-gray-900">{referralStats.activeReferrals}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Earned</h3>
          <p className="text-2xl font-semibold text-green-600">${referralStats.totalEarned.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Earnings</h3>
          <p className="text-2xl font-semibold text-yellow-600">${referralStats.pendingEarnings.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Referral Link */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-md p-8 mb-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">Your Referral Link</h2>
            <p className="text-indigo-100 mb-4">
              Share this link with friends and start earning commissions!
            </p>
          </div>
          <div className="flex space-x-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-800 rounded-full hover:bg-blue-900 transition cursor-pointer"
            >
              <span className="text-white font-bold">f</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join Huzaifa Business and start earning money today! Use my referral link:')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-400 rounded-full hover:bg-blue-500 transition cursor-pointer"
            >
              <span className="text-white font-bold">t</span>
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent('Join Huzaifa Business and start earning money today! Use my referral link: ' + referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer"
            >
              <span className="text-white font-bold">w</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 bg-white p-3 rounded-lg">
          <div className="flex items-center">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-grow text-gray-800 bg-transparent outline-none box-border"
            />
            <button
              onClick={copyToClipboard}
              className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How Our Referral Program Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Share Your Link</h3>
            <p className="text-gray-600">
              Share your unique referral link with friends via email, social media, or messaging apps.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Friends Sign Up</h3>
            <p className="text-gray-600">
              When your friends click your link and create an account, they're automatically linked to you.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Earn Commissions</h3>
            <p className="text-gray-600">
              Earn 10% of what your referrals make during their first month on the platform.
            </p>
          </div>
        </div>
      </div>
      
      {/* Referrals Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Your Referrals</h2>
        </div>
        <div className="overflow-x-auto">
          {referrals.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    You've Earned
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {referral.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(referral.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        referral.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${referral.earned.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                You haven't referred anyone yet. Share your referral link to start earning!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
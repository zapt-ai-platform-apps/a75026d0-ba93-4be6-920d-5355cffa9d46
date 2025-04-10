import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Profile() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    notifications: {
      email: true,
      push: true
    },
    paymentMethods: []
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Populate with user data and mock additional data
        setProfileData({
          name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          phone: '',
          notifications: {
            email: true,
            push: true
          },
          paymentMethods: [
            { id: 1, type: 'paypal', details: 'user@example.com', isDefault: true },
            { id: 2, type: 'bank', details: '•••• 4567', isDefault: false }
          ]
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSetDefaultPayment = (id) => {
    setProfileData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    }));
  };

  const handleDeletePayment = (id) => {
    setProfileData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      // In a real app, this would be an API call to update the profile
      console.log('Saving profile data:', profileData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      setSaving(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaving(false);
      alert('There was an error saving your profile. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading profile..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your profile, notifications, and payment methods.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'notifications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'payments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile}>
              {savedSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                  Profile updated successfully!
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="input box-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="input box-border"
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email address cannot be changed. This is your login identifier.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="input box-border"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary cursor-pointer"
                  >
                    {saving ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Receive emails about new earning opportunities, account updates, and payouts.
                    </p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      checked={profileData.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      className="sr-only"
                    />
                    <label
                      htmlFor="email-notifications"
                      className={`block cursor-pointer w-10 h-6 rounded-full transition-colors ${
                        profileData.notifications.email ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-4 w-4 mt-1 ml-1 rounded-full transition-transform ${
                          profileData.notifications.email ? 'bg-white transform translate-x-4' : 'bg-white'
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Receive push notifications on your device for important updates.
                    </p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle">
                    <input
                      type="checkbox"
                      id="push-notifications"
                      checked={profileData.notifications.push}
                      onChange={() => handleNotificationChange('push')}
                      className="sr-only"
                    />
                    <label
                      htmlFor="push-notifications"
                      className={`block cursor-pointer w-10 h-6 rounded-full transition-colors ${
                        profileData.notifications.push ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-4 w-4 mt-1 ml-1 rounded-full transition-transform ${
                          profileData.notifications.push ? 'bg-white transform translate-x-4' : 'bg-white'
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="btn-primary cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Payment Methods Tab */}
          {activeTab === 'payments' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
              
              <div className="space-y-4 mb-6">
                {profileData.paymentMethods.length > 0 ? (
                  profileData.paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-md mr-3">
                          {method.type === 'paypal' ? (
                            <span className="font-bold text-blue-700">P</span>
                          ) : (
                            <span className="font-bold text-gray-700">B</span>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {method.type === 'paypal' ? 'PayPal' : 'Bank Account'}
                            {method.isDefault && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-500">{method.details}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultPayment(method.id)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeletePayment(method.id)}
                          className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No payment methods added yet.</p>
                )}
              </div>
              
              <button
                type="button"
                className="btn-outline cursor-pointer"
              >
                Add Payment Method
              </button>
            </div>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Change Password</h4>
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-800 text-sm cursor-pointer"
                  >
                    Send password reset email
                  </button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Delete Account</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 cursor-pointer"
                  >
                    Delete Account
                  </button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Sign Out</h4>
                  <button
                    type="button"
                    onClick={signOut}
                    className="btn-outline cursor-pointer"
                  >
                    Sign Out of All Devices
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
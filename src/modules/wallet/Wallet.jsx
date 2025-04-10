import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Wallet() {
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState({
    balance: 0,
    pendingBalance: 0,
    transactions: []
  });
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock wallet data
        setWalletData({
          balance: 115.50,
          pendingBalance: 42.75,
          transactions: [
            { id: 1, date: '2023-11-01', type: 'Earning', description: 'Survey Completion', amount: 8.50, status: 'Completed' },
            { id: 2, date: '2023-10-28', type: 'Earning', description: 'Data Entry Task', amount: 12.25, status: 'Completed' },
            { id: 3, date: '2023-10-25', type: 'Referral', description: 'Referral Commission', amount: 5.25, status: 'Completed' },
            { id: 4, date: '2023-10-20', type: 'Withdrawal', description: 'PayPal Withdrawal', amount: -50.00, status: 'Completed' },
            { id: 5, date: '2023-10-15', type: 'Earning', description: 'Website Testing', amount: 10.00, status: 'Completed' },
            { id: 6, date: '2023-10-12', type: 'Earning', description: 'Content Moderation', amount: 8.75, status: 'Completed' },
            { id: 7, date: '2023-10-05', type: 'Withdrawal', description: 'Bank Transfer', amount: -25.00, status: 'Completed' },
            { id: 8, date: '2023-10-01', type: 'Earning', description: 'Survey Completion', amount: 6.25, status: 'Completed' }
          ]
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setLoading(false);
      }
    };
    
    fetchWalletData();
  }, []);

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    
    const amount = parseFloat(withdrawalAmount);
    
    // Validate form
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }
    
    if (amount > walletData.balance) {
      alert('Withdrawal amount exceeds your available balance.');
      return;
    }
    
    if (amount < 10) {
      alert('Minimum withdrawal amount is $10.00.');
      return;
    }
    
    if (!paymentDetails) {
      alert('Please enter your payment details.');
      return;
    }
    
    try {
      setWithdrawing(true);
      
      // In a real app, this would be an API call to process the withdrawal
      console.log('Processing withdrawal:', {
        amount,
        method: paymentMethod,
        details: paymentDetails
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update wallet data after withdrawal
      setWalletData(prev => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [
          {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            type: 'Withdrawal',
            description: `${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Withdrawal`,
            amount: -amount,
            status: 'Processing'
          },
          ...prev.transactions
        ]
      }));
      
      setWithdrawalAmount('');
      setPaymentDetails('');
      setSuccess(true);
      
      // Reset success message after a delay
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
      setWithdrawing(false);
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setWithdrawing(false);
      alert('There was an error processing your withdrawal. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading wallet data..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        <p className="text-gray-600 mt-1">Manage your earnings and make withdrawals.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Wallet Summary and Withdrawal */}
        <div className="md:col-span-1 space-y-6">
          {/* Balance Cards */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
              <h2 className="text-lg font-medium text-white mb-1">Available Balance</h2>
              <p className="text-3xl font-bold text-white">${walletData.balance.toFixed(2)}</p>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pending Balance</h3>
                  <p className="text-xl font-semibold text-gray-900">${walletData.pendingBalance.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Minimum withdrawal: $10.00</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Withdrawal Form */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Withdraw Funds</h2>
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                  Withdrawal request submitted successfully!
                </div>
              )}
              
              <form onSubmit={handleWithdrawal}>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    step="0.01"
                    min="10"
                    max={walletData.balance}
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="input box-border"
                    placeholder="Enter amount"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="input box-border"
                  >
                    <option value="paypal">PayPal</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    {paymentMethod === 'paypal' ? 'PayPal Email' : 
                     paymentMethod === 'bank' ? 'Bank Account Details' : 
                     'Wallet Address'}
                  </label>
                  <input
                    type="text"
                    id="paymentDetails"
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    className="input box-border"
                    placeholder={`Enter ${
                      paymentMethod === 'paypal' ? 'email' : 
                      paymentMethod === 'bank' ? 'account details' : 
                      'wallet address'
                    }`}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={withdrawing || walletData.balance < 10}
                  className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                    walletData.balance < 10 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                  }`}
                >
                  {withdrawing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Withdraw Funds'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
            </div>
            <div className="overflow-x-auto">
              {walletData.transactions.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {walletData.transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.type === 'Earning' ? 'bg-green-100 text-green-800' :
                            transaction.type === 'Referral' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No transactions yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
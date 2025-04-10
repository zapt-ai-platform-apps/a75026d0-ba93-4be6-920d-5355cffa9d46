import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './modules/auth/useAuth';
import Navbar from './modules/layout/Navbar';
import Footer from './modules/layout/Footer';
import Dashboard from './modules/dashboard/Dashboard';
import Tasks from './modules/tasks/Tasks';
import Surveys from './modules/surveys/Surveys';
import Referrals from './modules/referrals/Referrals';
import Wallet from './modules/wallet/Wallet';
import Profile from './modules/profile/Profile';
import LandingPage from './modules/landing/LandingPage';
import TaskDetail from './modules/tasks/TaskDetail';
import SurveyDetail from './modules/surveys/SurveyDetail';
import LoadingSpinner from './modules/common/LoadingSpinner';
import ZaptBadge from './modules/common/ZaptBadge';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/" />} />
          <Route path="/tasks/:taskId" element={user ? <TaskDetail /> : <Navigate to="/" />} />
          <Route path="/surveys" element={user ? <Surveys /> : <Navigate to="/" />} />
          <Route path="/surveys/:surveyId" element={user ? <SurveyDetail /> : <Navigate to="/" />} />
          <Route path="/referrals" element={user ? <Referrals /> : <Navigate to="/" />} />
          <Route path="/wallet" element={user ? <Wallet /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      <ZaptBadge />
    </div>
  );
}
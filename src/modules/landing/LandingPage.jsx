import React from 'react';
import AuthUI from '../auth/AuthUI';
import FeatureCard from './FeatureCard';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-12 lg:mb-0 lg:mr-8 lg:max-w-xl">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                Start Earning Money Today
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-indigo-100 sm:text-xl md:mt-5 md:max-w-3xl">
                Complete simple tasks, surveys, and invite friends to maximize your earnings with Huzaifa Business.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#get-started"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#how-it-works"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 lg:max-w-md">
              <img
                className="h-64 w-auto object-cover rounded-lg shadow-xl"
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Person earning money"
                data-image-request="person earning money online with laptop"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Multiple Ways to Earn
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Huzaifa Business offers several opportunities to earn money online, from anywhere in the world.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                title="Complete Tasks"
                description="Earn money by completing simple online tasks like data entry, content moderation, and more."
                icon="✓"
              />
              <FeatureCard 
                title="Take Surveys"
                description="Share your opinions and get paid for participating in market research surveys."
                icon="📝"
              />
              <FeatureCard 
                title="Refer Friends"
                description="Earn a commission when your friends sign up and start earning through your referral link."
                icon="👥"
              />
              <FeatureCard 
                title="Daily Bonuses"
                description="Check in daily to earn bonus points and unlock additional earning opportunities."
                icon="🎁"
              />
              <FeatureCard 
                title="Achievement Rewards"
                description="Earn extra by completing achievement milestones in your earning journey."
                icon="🏆"
              />
              <FeatureCard 
                title="Fast Payments"
                description="Get paid quickly through multiple payment methods, including PayPal and bank transfers."
                icon="💰"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              From Our Users
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
                  S
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Sarah J.</h3>
                  <p className="text-sm text-gray-500">Earned $245 last month</p>
                </div>
              </div>
              <p className="text-gray-600">"I've been using Huzaifa Business for 3 months now and it has become a reliable source of extra income. The tasks are easy and the platform is user-friendly."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
                  M
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Michael T.</h3>
                  <p className="text-sm text-gray-500">Earned $180 last month</p>
                </div>
              </div>
              <p className="text-gray-600">"The surveys available here are much better paying than other sites I've tried. The referral program is also excellent - I've earned a lot by inviting friends."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
                  L
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Lisa K.</h3>
                  <p className="text-sm text-gray-500">Earned $310 last month</p>
                </div>
              </div>
              <p className="text-gray-600">"As a student, this has been a game-changer for me. I can work on tasks between classes and earn enough to cover some of my expenses. Highly recommended!"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started / Sign Up */}
      <div id="get-started" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Get Started</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Join Huzaifa Business Today
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Create your account and start earning money right away.
            </p>
          </div>
          <div className="mt-10 mx-auto">
            <AuthUI />
          </div>
        </div>
      </div>
    </div>
  );
}
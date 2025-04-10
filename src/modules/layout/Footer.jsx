import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {year} Huzaifa Business. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
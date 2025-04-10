import React from 'react';

export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-semibold mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
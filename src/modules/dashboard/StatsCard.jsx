import React from 'react';

export default function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
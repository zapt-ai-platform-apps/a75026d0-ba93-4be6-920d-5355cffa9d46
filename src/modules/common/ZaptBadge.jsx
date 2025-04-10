import React from 'react';

export default function ZaptBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-10">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-white text-xs font-medium hover:bg-gray-700 transition-colors"
      >
        Made on ZAPT
      </a>
    </div>
  );
}
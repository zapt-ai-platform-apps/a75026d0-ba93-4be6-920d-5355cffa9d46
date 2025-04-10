import React from 'react';

export default function LoadingSpinner({ fullScreen = false, size = 'md', text = 'Loading...' }) {
  const sizeClass = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }[size] || 'w-8 h-8';
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClass} border-4 border-t-transparent border-indigo-600 rounded-full animate-spin`}></div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
}
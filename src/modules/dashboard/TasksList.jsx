import React from 'react';
import { Link } from 'react-router-dom';

export default function TasksList({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks available right now. Check back soon!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Link 
          key={task.id}
          to={`/tasks/${task.id}`}
          className="block bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-medium text-gray-900">{task.title}</h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {task.estimatedTime}
                </span>
                <span className="text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {task.category}
                </span>
              </div>
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              ${task.reward.toFixed(2)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
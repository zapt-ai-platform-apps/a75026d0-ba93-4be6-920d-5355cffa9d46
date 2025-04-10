import React from 'react';
import { EarningGuideView } from './modules/earningGuide';
import ZaptBadge from './components/ZaptBadge';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=48&height=48" 
              alt="Huzaifa business logo" 
              className="h-10 w-10 mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-900">Huzaifa business</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <EarningGuideView />
        </div>
      </main>
      
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-gray-500 text-sm">© 2023 Huzaifa business. All rights reserved.</p>
          <ZaptBadge />
        </div>
      </footer>
    </div>
  );
}
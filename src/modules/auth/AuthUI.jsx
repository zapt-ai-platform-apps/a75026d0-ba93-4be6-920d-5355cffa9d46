import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../supabaseClient';

export default function AuthUI() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Sign in with ZAPT</h2>
        <p className="text-gray-600">
          <a 
            href="https://www.zapt.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Powered by ZAPT
          </a>
        </p>
      </div>
      
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              borderRadius: '0.5rem',
              backgroundColor: '#4F46E5',
              color: 'white'
            },
            input: {
              borderRadius: '0.5rem',
              backgroundColor: 'white'
            },
            anchor: {
              color: '#4F46E5'
            }
          }
        }}
        providers={['google', 'facebook', 'apple']}
        magicLink={true}
        view="magic_link"
        showLinks={true}
        redirectTo={window.location.origin}
      />
    </div>
  );
}
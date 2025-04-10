import React, { createContext, useState, useEffect, useRef } from 'react';
import { supabase, recordLogin } from '../../supabaseClient';
import { eventBus } from '../core/events';
import { events } from './events';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRecordedLogin, setHasRecordedLogin] = useState(false);
  const hasSessionRef = useRef(false);
  
  // Update session and state references
  const updateSession = (newSession) => {
    setSession(newSession);
    setUser(newSession?.user || null);
    hasSessionRef.current = !!newSession;
  };
  
  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        console.log('Checking for existing session...');
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // Set initial session
        updateSession(data.session);
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth event:', event);
      
      if (event === 'SIGNED_IN') {
        if (!hasSessionRef.current) {
          updateSession(newSession);
          if (newSession?.user?.email) {
            eventBus.publish(events.USER_SIGNED_IN, { user: newSession.user });
            setHasRecordedLogin(false);
          }
        }
      } 
      else if (event === 'TOKEN_REFRESHED') {
        updateSession(newSession);
      }
      else if (event === 'SIGNED_OUT') {
        updateSession(null);
        eventBus.publish(events.USER_SIGNED_OUT, {});
        setHasRecordedLogin(false);
      }
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  // Record login when user is available
  useEffect(() => {
    if (session?.user?.email && !hasRecordedLogin) {
      try {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
        setHasRecordedLogin(true);
        console.log('Login recorded for:', session.user.email);
      } catch (error) {
        console.error('Failed to record login:', error);
      }
    }
  }, [session, hasRecordedLogin]);
  
  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const value = {
    session,
    user,
    loading,
    signOut
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
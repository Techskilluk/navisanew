import { useState, useEffect } from 'react';
import { AuthError, AuthApiError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuthError = (propError: string) => {
  const [authError, setAuthError] = useState<string>('');

  const getErrorMessage = (error: AuthError) => {
    console.log('Processing auth error:', error);

    // Handle AuthApiError specifically
    if (error instanceof AuthApiError) {
      console.log('Auth API Error details:', {
        status: error.status,
        message: error.message,
        name: error.name,
        code: error.message,
      });

      // Check for invalid credentials first
      if (error.message.includes('Invalid login credentials')) {
        return 'The email or password you entered is incorrect. Please try again.';
      }

      // Handle other specific status codes
      switch (error.status) {
        case 400:
          return 'Invalid email or password format. Please check your credentials.';
        case 422:
          return 'Please check your input and try again.';
        case 429:
          return 'Too many attempts. Please try again later.';
        default:
          return 'An error occurred during authentication. Please try again.';
      }
    }

    // Parse error message if it's JSON
    try {
      const errorMessage = error.message;
      if (typeof errorMessage === 'string') {
        const parsedError = JSON.parse(errorMessage);
        if (parsedError.code === 'invalid_credentials') {
          return 'The email or password you entered is incorrect. Please try again.';
        }
        if (errorMessage.includes('Email not confirmed')) {
          return 'Please check your email and click the verification link to confirm your account before signing in.';
        }
      }
    } catch (e) {
      console.log('Error parsing error message:', e);
    }

    return 'An error occurred during authentication. Please try again.';
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed in useAuthError:', event);
      console.log('Session:', subscription);
      if (event === 'USER_UPDATED' || event === 'SIGNED_IN') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error('Auth error in state change:', error);
          setAuthError(getErrorMessage(error));
        } else {
          // Clear error on successful auth
          setAuthError('');
        }
      }
      if (event === 'SIGNED_OUT') {
        setAuthError(''); // Clear any existing errors
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update error when propError changes
  useEffect(() => {
    if (propError) {
      setAuthError(propError);
    }
  }, [propError]);

  return {
    error: authError || propError,
    setAuthError,
  };
};

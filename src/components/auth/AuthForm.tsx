import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthError } from '@/hooks/useAuthError';
import { AuthFormHeader } from './AuthFormHeader';
import { authUiConfig } from '@/config/authUiConfig';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface AuthFormProps {
  error: string;
  preserveFormData?: boolean;
}

const AuthForm = ({ error: propError, preserveFormData }: AuthFormProps) => {
  console.log('Auth form rendered with error:', propError);
  const { error, setAuthError } = useAuthError(propError);
  const redirectTo = window.location.origin + '/signin';
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') === 'sign_up' ? 'sign_up' : 'sign_in';

  console.log(error);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed in AuthForm:', event, session);
      if (event === 'USER_UPDATED' || event === 'SIGNED_IN') {
        setAuthError('');
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuthError]);

  return (
    <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-white'>
      <div className='w-full max-w-md space-y-8'>
        <AuthFormHeader preserveFormData={preserveFormData} view={view} />

        {error && (
          <Alert variant='destructive' className='mb-4 border '>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Auth
          supabaseClient={supabase}
          view={view}
          showLinks={true}
          providers={[]}
          redirectTo={redirectTo}
          appearance={authUiConfig}
        />

        <div className='mt-6 text-center space-y-2'>
          {view === 'sign_in' ? (
            <>
              <Link
                to='/reset-password'
                className='text-primary hover:text-[#9b87f5] underline transition-colors duration-300 cursor-pointer text-sm block'
              >
                Forgot your password?
              </Link>
              <p className='text-sm text-gray-600'>
                Don't have an account?{' '}
                <Link
                  to='/signin?view=sign_up'
                  className='font-medium text-primary hover:text-[#9b87f5] underline transition-colors duration-300 cursor-pointer'
                >
                  Sign up
                </Link>
              </p>
            </>
          ) : (
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link
                to='/signin'
                className='font-medium text-primary hover:text-[#9b87f5] underline transition-colors duration-300 cursor-pointer'
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

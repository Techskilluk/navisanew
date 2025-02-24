import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  userProfile: UserProfile;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

const defaultUserProfile: UserProfile = {
  id: '',
  username: '',
  email: '',
  avatar_url: '',
  first_name: '',
  last_name: '',
  created_at: '',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    const fetchUserProfile = async (userId: string, userEmail: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, email, avatar_url, first_name, last_name, created_at')
        .eq('id', userId)
        .single();

      if (error || !data) {
        console.warn('Profile not found, creating new profile...');
        const { error: insertError } = await supabase.from('profiles').insert({
          id: userId,
          email: userEmail,
        });

        if (insertError) {
          console.error('Error creating profile:', insertError);
        } else {
          console.log('Profile created successfully.');
        }

        setUserProfile({
          ...defaultUserProfile,
          id: userId,
          email: userEmail,
        });
      } else {
        setUserProfile(data);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);

      if (session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user.id, session.user.email || '');
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email || '');
      } else {
        setUserProfile(defaultUserProfile);
      }

      // Handle email verification from URL parameters
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      const error = hashParams.get('error_description');

      if (error) {
        console.error('Verification error:', error);
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: 'There was an error verifying your email. Please try again.',
        });
        navigate('/signin');
        return;
      }

      switch (event) {
        case 'SIGNED_IN':
          toast({ title: 'Welcome back!', description: 'You have successfully signed in.' });
          // navigate('/dashboard');
          break;

        case 'SIGNED_OUT':
          toast({ title: 'Signed out', description: 'You have been signed out successfully.' });
          navigate('/signin');
          break;

        case 'USER_UPDATED':
          // Handle email verification success
          if (session?.user?.email_confirmed_at && type === 'email_confirmation') {
            console.log('Email verified successfully');
            toast({ title: 'Email verified!', description: 'Your email has been successfully verified.' });
            navigate('/verify-success');
          }
          break;

        case 'PASSWORD_RECOVERY':
          toast({ title: 'Verification Required', description: 'Please check your email to verify your account.' });
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(defaultUserProfile);
  };

  return <AuthContext.Provider value={{ session, user, signOut, userProfile }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

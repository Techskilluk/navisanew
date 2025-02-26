import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { CalendarWidget } from './CalendarWidget';
import { ConsultationButton } from './ConsultationButton';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardActionsProps {
  onBookConsultation: () => void;
  onStartApplication: () => void;
}

const DashboardActions = ({ onStartApplication }: DashboardActionsProps) => {
  const [appStatus, setAppStatus] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('application_trackings').select('*').eq('email', user.email).single();
      if (data) {
        setAppStatus(data);
      }
    })();
  }, []);
  return (
    <div className='w-full bg-background/50 border-b border-border/10 p-4 mt-4'>
      <CalendarWidget />
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-center gap-3'>
        <ConsultationButton />
        <Button onClick={onStartApplication} disabled={!!appStatus?.visa_type} variant='outline' size='lg'>
          <BookOpen className='w-4 h-4 mr-2' />
          {appStatus?.visa_type ? 'Application in progress' : 'Start Application'}
        </Button>
      </div>
    </div>
  );
};

export default DashboardActions;

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stage {
  label: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
  tooltip?: string;
}

export const useApplicationStatus = (userId: string | undefined) => {
  const [stages, setStages] = useState<Stage[]>([]);

  const fetchDocumentStatus = async () => {
    if (!userId) return;

    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    console.log('Fetched documents:', documents);
    console.log('Fetch error:', error);

    if (error) {
      console.error('Error fetching documents:', error);
      return;
    }

    const latestDocument = documents?.[0];

    setStages([
      {
        label: 'Documents Uploaded',
        status: latestDocument ? 'completed' : 'pending',
        timestamp: latestDocument?.created_at,
        tooltip: 'All required documents have been successfully uploaded',
      },
      {
        label: 'Expert Review',
        status:
          latestDocument?.status === 'pending'
            ? 'active'
            : latestDocument?.status === 'approved'
            ? 'completed'
            : 'pending',
        tooltip: 'Documents currently under review by our team',
      },
      {
        label: 'Application Submitted',
        status: latestDocument?.status === 'approved' ? 'completed' : 'pending',
        tooltip: 'Review completion status',
      },
      {
        label: 'Final Result',
        status: latestDocument?.status === 'approved' ? 'active' : 'pending',
        tooltip: 'Awaiting final visa decision',
      },
    ]);
  };

  useEffect(() => {
    fetchDocumentStatus();

    // Set up real-time subscription
    const channel = supabase
      .channel('document-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          console.log('Document status changed, refreshing...');
          fetchDocumentStatus();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return stages;
};

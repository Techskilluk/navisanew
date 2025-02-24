import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { EligibilityData } from '../EligibilityForm';
import AuthPromptModal from '../AuthPromptModal';
import { POST_REQUEST } from '@/lib/request';
import { EndPoints } from '@/lib/endpoints';
import { useNavigate } from 'react-router-dom';

interface FormSubmissionHandlerProps {
  formData: Partial<EligibilityData>;
  onSuccess: () => void;
}

const FormSubmissionHandler = ({ formData, onSuccess }: FormSubmissionHandlerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { toast } = useToast();
  const { user, session, userProfile } = useAuth();

  const navigate = useNavigate();

  console.log(formData);

  const formatDateForJson = (date: Date | undefined) => {
    if (!date) return null;
    return date.toISOString();
  };

  const prepareVerificationData = (data: EligibilityData) => {
    const formattedData = JSON.parse(JSON.stringify(data));

    if (formattedData.immigrationInfo) {
      formattedData.immigrationInfo.issueDate = formatDateForJson(data.immigrationInfo.issueDate);
      formattedData.immigrationInfo.expirationDate = formatDateForJson(data.immigrationInfo.expirationDate);
      formattedData.immigrationInfo.proposedEntryDate = formatDateForJson(data.immigrationInfo.proposedEntryDate);
    }

    return formattedData;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // const verificationData = {
      //   verification_data: prepareVerificationData(formData as EligibilityData),
      //   status: 'pending',
      //   is_guest: !user,
      //   ...(user && { user_id: user.id })
      // };

      // const { error } = await supabase
      //   .from('eligibility_verifications')
      //   .insert(verificationData);

      // if (error) throw error;

      // if (!user) {
      //   setShowAuthPrompt(true);
      // }

      const data = prepareVerificationData(formData as EligibilityData);
      const payload = {
        personal: data.personalInfo,
        assessment: {
          education: data.education.degree,
          field: data.education.field,
          experience: data.experience,
          achievement: {
            achievementCount: data.achievements.length,
            achievementImpact: data.achievementImpact,
          },
          language: data.language,
          financialCategory: data.additionalInfo.financialCategory,
          salaryCategory: data.additionalInfo.salaryCategory,
          positionCategory: data.additionalInfo.positionCategory,
        },
      };

      const response = await POST_REQUEST(EndPoints.assessment, payload, session?.access_token);

      if (response.success) {
        if (!user) {
          setShowAuthPrompt(true);
        } else {
          toast({
            title: 'Assessment Submitted',
            description: 'Assessment successfully submitted, please continue to your dashboard to see result.',
          });
          navigate('/dashboard');
        }
      }

      // onSuccess();
    } catch (error) {
      console.error('Error submitting eligibility assessment:', error);
      console.log(formData);
      toast({
        title: 'Submission Error',
        description: 'There was an error submitting your assessment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueAsGuest = () => {
    setShowAuthPrompt(false);
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className='w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md'
      >
        {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
      </button>

      <AuthPromptModal
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        onContinueAsGuest={handleContinueAsGuest}
      />
    </>
  );
};

export default FormSubmissionHandler;

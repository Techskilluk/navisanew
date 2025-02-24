import { useEffect, useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import PersonalInfo from './steps/PersonalInfo';
import Education from './steps/Education';
import Experience from './steps/Experience';
import Skills from './steps/Skills';
import Achievements from './steps/Achievements';
import PreferredCountries from './steps/PreferredCountries';
import ImmigrationInfo from './steps/ImmigrationInfo';
import Summary from './steps/Summary';
import FormNavigation from './FormNavigation';
import AssessmentResults from './AssessmentResults';
import FormSubmissionHandler from './form-handlers/FormSubmissionHandler';
import AdditionalInfo from './steps/AdditionalInfo';
import { POST_REQUEST } from '@/lib/request';
import { EndPoints } from '@/lib/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';

interface EligibilityFormProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

export type EligibilityData = {
  personalInfo: {
    fullName: string;
    email: string;
    nationality: string;
    currentLocation: string;
  };
  education: {
    degree: string;
    field: string;
    institution: string;
    graduationYear: string;
  };
  experience: {
    years: string;
    position: string;
    foreignYears: number;
    industry: string;
  };
  skills: string[];
  achievements: {
    type: string;
    description: string;
    impact: string;
  }[];
  additionalInfo: {
    financialCategory: string;
    salaryCategory: string;
    positionCategory: string;
  };

  preferredCountries: string[];
  language: string;
  achievementImpact: string;
  immigrationInfo: {
    currentStatus: string;
    otherStatusSpecification?: string;
    hasValidVisa: string;
    visaType?: string;
    visaNumber?: string;
    issueDate?: Date;
    expirationDate?: Date;
    relocationPurpose: string;
    otherPurposeSpecification?: string;
    stayDuration: number;
    proposedEntryDate: Date;
  };
};

const EligibilityForm = ({ currentStep, onNext, onPrevious }: EligibilityFormProps) => {
  const { userProfile } = useAuth();

  const [formData, setFormData] = useState<Partial<EligibilityData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<EligibilityData>({});

  useEffect(() => {
    if (userProfile.email) {
      form.reset({
        personalInfo: {
          fullName: userProfile.first_name ? userProfile?.first_name + ' ' + userProfile?.last_name : '',
          email: userProfile.email ? userProfile.email : '',
        },
      });
    }
  }, [userProfile]);
  const [activeStep, setActiveStep] = useState('');

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setActiveStep('personalInfo');
        break;
      case 2:
        setActiveStep('education');
        break;
      case 3:
        setActiveStep('experience');
        break;
      case 4:
        setActiveStep('skills');
        break;
      case 5:
        setActiveStep('achievements');
        break;
      case 6:
        setActiveStep('additionalInfo');
        break;
      case 7:
        setActiveStep('immigrationInfo');
        break;
      case 8:
        setActiveStep('preferredCountries');
        break;
    }
  }, [currentStep]);

  const renderStep = () => {
    if (isSubmitted) {
      return <AssessmentResults data={formData as EligibilityData} />;
    }

    switch (currentStep) {
      case 1:
        return <PersonalInfo form={form} />;
      case 2:
        return <Education form={form} />;
      case 3:
        return <Experience form={form} />;
      case 4:
        return <Skills form={form} />;
      case 5:
        return <Achievements form={form} />;
      case 6:
        return <AdditionalInfo form={form} />;
      case 7:
        return <ImmigrationInfo form={form} />;
      case 8:
        return <PreferredCountries form={form} />;

      case 9:
        return (
          <>
            <Summary data={formData} />
            <FormSubmissionHandler formData={formData} onSuccess={() => setIsSubmitted(true)} />
          </>
        );
      default:
        return null;
    }
  };

  const { session } = useAuth();

  const { toast } = useToast();

  const handleSubmit = async (data: EligibilityData) => {
    setFormData((prev) => ({ ...prev, ...data }));

    // console.log(Object.values(data[activeStep]));

    // if (Object.values(data[activeStep]).includes('') || Object.values(data[activeStep]).includes(undefined)) {
    //   toast({
    //     title: 'Oops!',
    //     description: 'Please fill in all fields before proceeding.',
    //   });
    //   return;
    // }
    if (currentStep < 9) {
      onNext();
      return;
    }

    // const response = await POST_REQUEST(EndPoints.assessment, payload, session?.access_token);
    // console.log(response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {renderStep()}
        {!isSubmitted && currentStep < 9 && (
          <FormNavigation currentStep={currentStep} totalSteps={9} onNext={onNext} onPrevious={onPrevious} />
        )}
      </form>
    </Form>
  );
};

export default EligibilityForm;

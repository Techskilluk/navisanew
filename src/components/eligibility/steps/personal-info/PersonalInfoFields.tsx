import { UseFormReturn } from 'react-hook-form';
import { EligibilityData } from '../../EligibilityForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import IconInput from '../../form-fields/IconInput';
import { User, Mail, Globe, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PersonalInfoFieldsProps {
  form: UseFormReturn<EligibilityData>;
}

const PersonalInfoFields = ({ form }: PersonalInfoFieldsProps) => {
  const { userProfile } = useAuth();

  return (
    <>
      <FormField
        control={form.control}
        name='personalInfo.fullName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <IconInput
                icon={User}
                placeholder='Enter your full name'
                {...field}
                disabled={!!userProfile.first_name}
                // value={userProfile.first_name && `${userProfile.first_name} ${userProfile.last_name}`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='personalInfo.email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <IconInput
                icon={Mail}
                type='email'
                placeholder='Enter your email'
                {...field}
                disabled={!!userProfile.email}
                // value={userProfile.email}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='personalInfo.nationality'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality</FormLabel>
            <FormControl>
              <IconInput icon={Globe} placeholder='Enter your nationality' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='personalInfo.currentLocation'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Location</FormLabel>
            <FormControl>
              <IconInput icon={MapPin} placeholder='Enter your current location' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfoFields;

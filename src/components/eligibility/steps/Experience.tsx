import { UseFormReturn } from 'react-hook-form';
import { EligibilityData } from '../EligibilityForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Briefcase, WorkflowIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import IconInput from '../form-fields/IconInput';
import { useState } from 'react';

interface ExperienceProps {
  form: UseFormReturn<EligibilityData>;
}

const EXPERIENCE_RANGES = ['0-2 years', '3-5 years', '6-10 years', '10+ years'];

const ROLES = [
  { label: 'Executive', value: 'executive' },
  { label: 'Senior Management', value: 'seniormanagement' },
  { label: 'Expert', value: 'expert' },
  { label: 'Department Head', value: 'departmenthead' },
  { label: 'Senior Level', value: 'seniorlevel' },
  { label: 'Mid Level', value: 'midlevel' },
  { label: 'Junior Level', value: 'juniorlevel' },
  { label: 'Other', value: 'other' },
];

const Experience = ({ form }: ExperienceProps) => {
  const [haveForeignExperience, setHaveForeignExperience] = useState(false);
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold mb-2'>Professional Experience</h2>
        <p className='text-muted-foreground'>Tell us about your work experience.</p>
      </div>

      <FormField
        control={form.control}
        name='experience.years'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <div className=' relative'>
                {/* <WorkflowIcon className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' /> */}
                <IconInput icon={WorkflowIcon} type='number' placeholder='Enter your years of experience' {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem className=' flex items-center gap-2'>
        <FormControl>
          <input
            type='checkbox'
            checked={haveForeignExperience}
            onChange={(e) => {
              // field.onChange(e.target.checked);
              setHaveForeignExperience(!haveForeignExperience);
            }}
            className=' mt-1 h-4 w-4 text-primary focus:ring-primary accent-black'
          />
        </FormControl>
        <FormLabel>Have Foreign Experience?</FormLabel>

        <FormMessage />
      </FormItem>
      {haveForeignExperience && (
        <FormField
          control={form.control}
          name='experience.foreignYears'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                {/* <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger> */}
                <div className=' relative'>
                  {/* <WorkflowIcon className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' /> */}
                  <IconInput
                    icon={WorkflowIcon}
                    type='number'
                    placeholder='Enter your foreign years of experience'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name='experience.position'
        render={({ field }) => (
          <FormItem>
            <FormLabel className=' flex gap-1'>
              Current Role <span className=' text-xs'>* Select any that applies.</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                {/* <IconInput icon={BookOpen} placeholder='Enter your field of study' {...field} /> */}
                <div className='relative'>
                  <Briefcase className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <SelectTrigger className='pl-9'>
                    <SelectValue placeholder='Select your current role/position' />
                  </SelectTrigger>
                </div>
              </FormControl>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role.label} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <FormField
        control={form.control}
        name='experience.industry'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <FormControl>
              <Input placeholder='Enter your industry' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </div>
  );
};

export default Experience;

import { UseFormReturn } from 'react-hook-form';
import { EligibilityData } from '../../EligibilityForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, BookOpen } from 'lucide-react';
import IconInput from '../../form-fields/IconInput';

interface EducationFieldsProps {
  form: UseFormReturn<EligibilityData>;
}

// const DEGREES = [
//   "High School",
//   "Bachelor's",
//   "Master's",
//   "PhD",
//   "Other",
// ];

const DEGREES = [
  {
    label: 'PhD',
    value: 'phD',
  },
  {
    label: "Master's",
    value: 'masters',
  },
  {
    label: "Bachelor's",
    value: 'bachelors',
  },
  {
    label: 'Three-year Diploma',
    value: 'three-year diploma',
  },
  {
    label: 'One-Two Year Diploma',
    value: 'one-two year diploma',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const FIELD_OF_STUDY = [
  { label: 'Science, Technology, Engineering, Mathematics, Digital Arts (STEM)', value: 'stem' },
  { label: 'Business & Economics', value: 'economics' },
  { label: 'Arts & Culture', value: 'arts' },
];

const EducationFields = ({ form }: EducationFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name='education.degree'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <div className='relative'>
                  <GraduationCap className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <SelectTrigger className='pl-9'>
                    <SelectValue placeholder='Select your degree level' />
                  </SelectTrigger>
                </div>
              </FormControl>
              <SelectContent>
                {DEGREES.map((degree) => (
                  <SelectItem key={degree.label} value={degree.value}>
                    {degree.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='education.field'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Field of Study</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                {/* <IconInput icon={BookOpen} placeholder='Enter your field of study' {...field} /> */}
                <div className='relative'>
                  <BookOpen className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <SelectTrigger className='pl-9'>
                    <SelectValue placeholder='Select your field of study' />
                  </SelectTrigger>
                </div>
              </FormControl>
              <SelectContent>
                {FIELD_OF_STUDY.map((field) => (
                  <SelectItem key={field.label} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='education.institution'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institution</FormLabel>
            <FormControl>
              <Input placeholder='Enter your institution' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='education.graduationYear'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Graduation Year</FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Enter graduation year'
                min={1950}
                max={new Date().getFullYear() + 5}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EducationFields;

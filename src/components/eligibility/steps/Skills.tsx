import { UseFormReturn } from 'react-hook-form';
import { EligibilityData } from '../EligibilityForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SkillsProps {
  form: UseFormReturn<EligibilityData>;
}

const Skills = ({ form }: SkillsProps) => {
  const [newSkill, setNewSkill] = useState('');
  const skills = form.watch('skills') || [];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      form.setValue('skills', [...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      'skills',
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const LANGUAGE_PROFICIENCY = [
    { label: 'CLB 9+', value: 'clb9plus' },
    { label: 'CLB 8', value: 'clb8' },
    { label: 'CLB 7', value: 'clb7' },
    { label: 'CLB 6', value: 'clb6' },
    { label: 'Below CLB 6 - Ineligible', value: 'belowclb6' },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold mb-2'>Skills</h2>
        <p className='text-muted-foreground'>List your relevant skills and competencies.</p>
      </div>

      <div className='space-y-4'>
        <div className='flex gap-2'>
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder='Enter a skill'
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button type='button' onClick={addSkill}>
            Add Skill
          </Button>
        </div>

        <div className='flex flex-wrap gap-2'>
          {skills.map((skill, index) => (
            <div key={index} className='flex items-center gap-1 bg-secondary px-3 py-1 rounded-full'>
              <span>{skill}</span>
              <button
                type='button'
                onClick={() => removeSkill(skill)}
                className='text-muted-foreground hover:text-foreground'
              >
                <X className='h-4 w-4' />
              </button>
            </div>
          ))}
        </div>
      </div>

      <FormField
        control={form.control}
        name='language'
        render={({ field }) => (
          <FormItem>
            <FormLabel className=' flex gap-1'>
              Language Proficiency <span className=' text-xs'>(Canadian Language Benchmark)</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                {/* <IconInput icon={BookOpen} placeholder='Enter your field of study' {...field} /> */}
                <div className='relative'>
                  {/* <Briefcase className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' /> */}
                  <SelectTrigger className='pl-9'>
                    <SelectValue placeholder='Select your language proficiency.' />
                  </SelectTrigger>
                </div>
              </FormControl>
              <SelectContent>
                {LANGUAGE_PROFICIENCY.map((language) => (
                  <SelectItem key={language.label} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Skills;

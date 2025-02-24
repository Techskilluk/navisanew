import { UseFormReturn } from 'react-hook-form';
import { EligibilityData } from '../EligibilityForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BriefcaseBusinessIcon, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import IconInput from '../form-fields/IconInput';

interface AchievementsProps {
  form: UseFormReturn<EligibilityData>;
}

const Achievements = ({ form }: AchievementsProps) => {
  const achievements = form.watch('achievements') || [];

  const addAchievement = () => {
    form.setValue('achievements', [...achievements, { type: '', description: '', impact: '' }]);
  };

  const removeAchievement = (index: number) => {
    form.setValue(
      'achievements',
      achievements.filter((_, i) => i !== index)
    );
  };

  const IMPACT = [
    { label: 'International', value: 'International' },
    { label: 'National', value: 'National' },
    { label: 'Industry', value: 'Industry' },
    { label: 'Regional', value: 'Regional' },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold mb-2'>Achievements</h2>
        <p className='text-muted-foreground'>Tell us about your notable achievements.</p>
      </div>

      <div className='space-y-6'>
        {achievements.map((_, index) => (
          <div key={index} className='space-y-4 p-4 border rounded-lg relative'>
            <button
              type='button'
              onClick={() => removeAchievement(index)}
              className='absolute top-2 right-2 text-muted-foreground hover:text-foreground'
            >
              <X className='h-4 w-4' />
            </button>

            <FormField
              control={form.control}
              name={`achievements.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievement Type</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., Award, Publication, Patent' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`achievements.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Describe your achievement' className='resize-none' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button type='button' variant='outline' onClick={addAchievement}>
          Add Achievement
        </Button>

        {achievements.length > 0 && (
          <FormField
            control={form.control}
            name='achievementImpact'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' flex gap-1'>Achievement Impact</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <div className='relative'>
                      <BriefcaseBusinessIcon className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <SelectTrigger className='pl-9'>
                        <SelectValue placeholder='Select your achievement impact' />
                      </SelectTrigger>
                    </div>
                  </FormControl>
                  <SelectContent>
                    {IMPACT.map((impact) => (
                      <SelectItem key={impact.label} value={impact.value}>
                        {impact.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Achievements;

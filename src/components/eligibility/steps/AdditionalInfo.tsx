import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { EligibilityData } from '../EligibilityForm';
import { UseFormReturn } from 'react-hook-form';

interface AdditionalInfoProps {
  form: UseFormReturn<EligibilityData>;
}

const AdditionalInfo = ({ form }: AdditionalInfoProps) => {
  const FINANCIAL_CATEGORIES = [
    {
      label: 'AED 10M+ Public Investment',
      value: 'publicinvestment10mplus',
    },
    {
      label: 'AED 5M - 10M Public Investment',
      value: 'publicinvestment5to10m',
    },
    {
      label: 'AED 5M+ Private Company Investment',
      value: 'privatecompany5mplus',
    },
    {
      label: 'AED 3M - 5M Private Investment',
      value: 'privatecompany3to5m',
    },
    {
      label: 'AED 2M+ Property Investment',
      value: 'propertyinvestment2mplus',
    },
    {
      label: 'AED 1M - 2M Property Investment',
      value: 'propertyinvestment1to2m',
    },
  ];

  const SALARY_CATEGORIES = [
    {
      label: 'AED 30K+ Salary',
      value: 'salary30kplus',
    },
    {
      label: 'AED 20K - 30K Salary',
      value: 'salary20to30k',
    },
    {
      label: 'AED 15K - 20K Salary',
      value: 'salary15to20k',
    },
  ];

  const POSITION_CATEGORIES = [
    {
      label: 'CEO/MD',
      value: 'ceo/md',
    },
    {
      label: 'Senior Management',
      value: 'seniormanagement',
    },
    {
      label: 'Department Head',
      value: 'departmenthead',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold mb-2'>Extra Information</h2>
        <p className='text-muted-foreground'>Kindly provide us with this extra information</p>
      </div>
      <FormField
        control={form.control}
        name='additionalInfo.financialCategory'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Financial Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select financial category' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {FINANCIAL_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
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
        name='additionalInfo.salaryCategory'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salary Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select salary category' />
                </SelectTrigger>
              </FormControl>{' '}
              <SelectContent>
                {SALARY_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
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
        name='additionalInfo.positionCategory'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select position category' />
                </SelectTrigger>
              </FormControl>{' '}
              <SelectContent>
                {POSITION_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
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

export default AdditionalInfo;

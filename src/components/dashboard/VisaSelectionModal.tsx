import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

interface VisaOption {
  id: string;
  title: string;
  description: string;
  rating: number;
  processingTime: string;
  requirements: {
    label: string;
    value: string;
  }[];
}

interface VisaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (visa: VisaOption) => void;
}

const visaOptions: VisaOption[] = [
  {
    // id: "global-talent",
    id: 'UK Global Talent Visa',
    // title: "Global Talent Visa (UK)",
    title: 'UK Global Talent Visa',
    description: 'For exceptional talent in science, engineering, humanities, and digital technology',
    rating: 4.5,
    processingTime: '3-8 weeks',
    requirements: [
      { label: 'Education', value: 'PhD or equivalent experience' },
      { label: 'Experience', value: '5+ years in field' },
      { label: 'Achievements', value: 'Significant contributions' },
    ],
  },
  {
    //    id: 'high-potential',
    id: 'US EB-1/EB-2 VISA',
    // title: 'High Potential Individual',
    title: 'US EB-1/EB-2 VISA',
    description: 'For recent graduates from top global universities',
    rating: 4.2,
    processingTime: '2-3 weeks',
    requirements: [
      { label: 'Education', value: 'Top university graduate' },
      { label: 'Graduation', value: 'Last 5 years' },
      { label: 'Degree Level', value: "Bachelor's or higher" },
    ],
  },
  {
    // id: 'scale-up',
    id: 'CANADA EXPRESS ENTRY',

    title: 'CANADA EXPRESS ENTRY',
    //    title: 'Scale-up Talent Program',
    description: 'Fast-growing companies hiring international talent',
    rating: 4.0,
    processingTime: '2-4 weeks',
    requirements: [
      { label: 'Company', value: 'Scale-up sponsor' },
      { label: 'Salary', value: '£33,000+' },
      { label: 'Skills', value: 'Graduate level' },
    ],
  },
  {
    id: 'DUBAI GOLDEN VISA',
    //    id: 'tech-talent',
    //    title: 'Tech Talent Sponsorship',
    title: 'DUBAI GOLDEN VISA',

    description: 'Fast-track sponsorship for software engineers and tech professionals',
    rating: 4.3,
    processingTime: '4-6 weeks',
    requirements: [
      { label: 'Experience', value: '2+ years in tech' },
      { label: 'Skills', value: 'In-demand tech stack' },
      { label: 'Language', value: 'English proficiency' },
    ],
  },
  // {
  //   id: 'healthcare',
  //   title: 'Healthcare Professionals',
  //   description: 'Dedicated route for doctors, nurses, and healthcare specialists',
  //   rating: 4.4,
  //   processingTime: '4-8 weeks',
  //   requirements: [
  //     { label: 'Qualification', value: 'Medical degree/certification' },
  //     { label: 'Registration', value: 'GMC/NMC registration' },
  //     { label: 'Experience', value: 'Clinical experience' },
  //   ],
  // },
  // {
  //   id: 'academic',
  //   title: 'Academic Sponsorship',
  //   description: 'For researchers, professors, and academic professionals',
  //   rating: 4.1,
  //   processingTime: '6-8 weeks',
  //   requirements: [
  //     { label: 'Qualification', value: 'PhD or equivalent' },
  //     { label: 'Research', value: 'Publication record' },
  //     { label: 'Position', value: 'Academic role offer' },
  //   ],
  // },
];

const VisaSelectionModal = ({ isOpen, onClose, onSelect }: VisaSelectionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Choose Your Visa Pathway</DialogTitle>
          <DialogDescription>Select the visa type that best matches your profile and aspirations</DialogDescription>
        </DialogHeader>
        <div className='space-y-4 mt-4'>
          {visaOptions.map((visa) => (
            <div
              key={visa.id}
              className='p-4 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer'
              onClick={() => onSelect(visa)}
            >
              <div className='flex justify-between items-start mb-2'>
                <h3 className='font-semibold'>{visa.title}</h3>
                <div className='flex items-center gap-1'>
                  <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                  <span className='text-sm'>{visa.rating}</span>
                </div>
              </div>
              <p className='text-sm text-muted-foreground mb-2'>{visa.description}</p>
              <div className='space-y-2'>
                <p className='text-sm font-medium'>Key Requirements:</p>
                <ul className='list-disc list-inside space-y-1 text-sm text-muted-foreground'>
                  {visa.requirements.map((req, index) => (
                    <li key={index}>
                      <span className='font-medium'>{req.label}:</span> {req.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-4 flex justify-between items-center text-sm'>
                <span className='text-muted-foreground'>Processing: {visa.processingTime}</span>
                <Button variant='ghost' size='sm'>
                  Select <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisaSelectionModal;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Resource {
  title: string;
  description: string;
  url: string;
}

interface DocumentResourcesProps {
  resources: Resource[];
}

const DocumentResources = ({ resources }: DocumentResourcesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Resources & Templates</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {resources.map((resource, index) => (
          <div key={index} className='flex items-start gap-4 p-4 rounded-lg border'>
            <FileText className='w-8 h-8 text-primary-foreground shrink-0' />
            <div className='flex-1 min-w-0'>
              <h4 className='font-medium mb-1'>{resource.title}</h4>
              <p className='text-sm text-muted-foreground mb-3'>{resource.description}</p>
              <Button
                variant='outline'
                size='sm'
                className='w-full sm:w-auto '
                onClick={() => window.open(resource.url, '_blank')}
              >
                <Download className='w-4 h-4 mr-2' />
                Download Template
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DocumentResources;

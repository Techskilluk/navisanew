import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  visa_type: string;
  document_type: string;
  template_url: string;
}

const ResourcesSection = () => {
  const { toast } = useToast();

  const {
    data: templates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['documentTemplates'],
    queryFn: async () => {
      console.log('Fetching document templates...');
      const { data, error } = await supabase.from('document_templates').select('*');

      if (error) {
        console.error('Error fetching templates:', error);
        throw error;
      }

      console.log('Templates fetched:', data);
      return data as Template[];
    },
  });

  const handleDownload = async (template: Template) => {
    try {
      console.log('Downloading template:', template.template_url);
      const response = await fetch(template.template_url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${template.document_type.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      toast({
        title: 'Download Started',
        description: 'Your document template is being downloaded.',
      });
    } catch (error) {
      console.error('Error downloading template:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'There was an error downloading the template. Please try again.',
      });
    }
  };

  if (error) {
    return (
      <div className='p-4 text-center'>
        <p className='text-destructive'>Error loading resources. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold tracking-tight'>Resources</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className='animate-pulse'>
                <CardHeader className='space-y-2'>
                  <div className='h-4 bg-muted rounded w-3/4' />
                  <div className='h-3 bg-muted rounded w-1/2' />
                </CardHeader>
                <CardContent>
                  <div className='h-9 bg-muted rounded' />
                </CardContent>
              </Card>
            ))
          : templates?.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <FileText className='h-5 w-5' />
                    {template.document_type}
                  </CardTitle>
                  <CardDescription>For {template.visa_type} visa applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant='outline' className='w-full' onClick={() => handleDownload(template)}>
                    <Download className='mr-2 h-4 w-4' />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default ResourcesSection;

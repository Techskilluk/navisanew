import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentChecklistPanel from './DocumentChecklistPanel';
import DocumentUploadForm from './DocumentUploadForm';
import DocumentResources from './DocumentResources';
import { VISA_DOCUMENTS } from '@/types/documents';
import type { DocumentRequirement } from '@/types/documents';

interface DocumentUploadProps {
  visaType: string;
}

const DocumentUpload = ({ visaType }: DocumentUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const navigate = useNavigate();

  const visaDocuments = VISA_DOCUMENTS[visaType];

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  if (!visaDocuments) {
    console.error(`No document requirements found for visa type: ${visaType}`);
    return null;
  }

  const { requirements, resources } = visaDocuments;

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <Button variant='ghost' onClick={() => navigate('/dashboard')} className='mb-4'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to dashboard
        </Button>

        <h1 className='text-2xl font-bold mb-2'>Required Documents</h1>
        <p className='text-muted-foreground'>
          Based on your selected visa pathway ({visaType}), we've generated a personalized list of required documents
          and resources to guide you
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='space-y-8'>
          <DocumentChecklistPanel documents={requirements} uploadedFiles={uploadedFiles} />
          <DocumentResources resources={resources} />
        </div>

        <div className='md:col-span-2'>
          <DocumentUploadForm
            visaType={visaType}
            documents={requirements}
            onFileUpload={(type: string, file: File) => {
              setUploadedFiles((prev) => ({ ...prev, [type]: file }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;

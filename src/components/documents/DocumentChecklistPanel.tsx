import { Circle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { DocumentRequirement } from '@/types/documents';

interface DocumentChecklistPanelProps {
  documents: DocumentRequirement[];
  uploadedFiles: Record<string, File>;
}

const DocumentChecklistPanel = ({ documents, uploadedFiles }: DocumentChecklistPanelProps) => {
  return (
    <Card className='p-6'>
      <h2 className='text-xl font-semibold mb-4'>Document Checklist</h2>
      <p className='text-sm text-muted-foreground mb-6'>
        All documents must be in PDF, PNG, or JPG format and must not exceed 5MB
      </p>

      <div className='space-y-4'>
        {documents.map((doc) => {
          const isUploaded = !!uploadedFiles[doc.type];
          console.log(doc.type, isUploaded, uploadedFiles[doc.type]);

          return (
            <div key={doc.type} className='flex items-start gap-3'>
              {isUploaded ? (
                <CheckCircle2 className='w-5 h-5 text-primary bg-white rounded-full shrink-0' />
              ) : (
                <Circle className='w-5 h-5 text-muted-foreground shrink-0' />
              )}
              <div>
                <div className='font-medium'>
                  {doc.label}
                  {doc.required && <span className='text-destructive ml-1'>*</span>}
                </div>
                {doc.description && <p className='text-sm text-muted-foreground'>{doc.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DocumentChecklistPanel;

import { DocumentRequirement } from '@/types/documents';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import DocumentUploadZone from './DocumentUploadZone';
import { toast } from '@/hooks/use-toast';

interface FileUploadFieldProps {
  document: DocumentRequirement;
  files: File[];
  onFileSelect: (file: File) => void;
  onRemoveFile: (index: number) => void;
}

const FileUploadField = ({ document, files, onFileSelect, onRemoveFile }: FileUploadFieldProps) => {
  const handleFileSelection = () => {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = document.formats.join('');
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > document.maxSize) {
          toast({
            title: 'File too large',
            description: `Maximum file size is ${document.maxSize / (1024 * 1024)}MB`,
            variant: 'destructive',
          });
          return;
        }
        onFileSelect(file);
      }
    };
    input.click();
  };

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>
        {document.label}
        {document.required && <span className='text-destructive ml-1'>*</span>}
      </label>

      <div className='space-y-4'>
        {files.map((file, index) => (
          <div key={`${document.type}-${index}`} className='flex items-center gap-2'>
            <div className='flex-1'>
              <DocumentUploadZone
                onFileSelect={onFileSelect}
                file={file}
                accept={document.formats}
                maxSize={document.maxSize}
                multiple={document.multiple}
              />
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onRemoveFile(index)}
              className='shrink-0 text-destructive hover:text-destructive/90'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        ))}

        {document.multiple && files.length < (document.maxFiles || 3) && (
          <Button type='button' variant='outline' size='sm' onClick={handleFileSelection} className='w-full'>
            <Plus className='w-4 h-4 mr-2' />
            Add Another File
          </Button>
        )}
      </div>

      {document.description && <p className='text-sm text-muted-foreground'>{document.description}</p>}
    </div>
  );
};

export default FileUploadField;

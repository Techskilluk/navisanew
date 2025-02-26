import { useCallback } from 'react';
import { FileText, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface DocumentUploadZoneProps {
  onFileSelect: (file: File) => void;
  file?: File;
  accept: string[];
  maxSize: number;
  multiple?: boolean;
}

const DocumentUploadZone = ({ onFileSelect, file, accept, maxSize, multiple = false }: DocumentUploadZoneProps) => {
  const { toast } = useToast();

  const validateFile = useCallback(
    (file: File) => {
      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: `Maximum file size is ${maxSize / (1024 * 1024)}MB`,
          variant: 'destructive',
        });
        return false;
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const acceptedFormats = accept.map((format) => format.replace('.', '').toLowerCase());

      if (!fileExt || !acceptedFormats.includes(fileExt)) {
        toast({
          title: 'Invalid file format',
          description: `Allowed formats: ${accept.join(', ')}`,
          variant: 'destructive',
        });
        return false;
      }

      return true;
    },
    [accept, maxSize, toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, validateFile]
  );

  const handleClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept.join(',');
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    };
    input.click();
  }, [accept, onFileSelect, validateFile]);

  return (
    <div
      className={cn(
        'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors',
        file ? 'border-primary bg-primary/5' : 'border-muted'
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {file ? (
        <div className='flex items-center justify-center gap-2'>
          <FileText className='w-5 h-5 text-primary-foreground ' />
          <span className='text-sm'>{file.name}</span>
        </div>
      ) : (
        <div className='space-y-2'>
          <Upload className='w-6 h-6 mx-auto text-muted-foreground' />
          <div className='text-sm'>
            <span className='text-muted-foreground'>Drag & drop or </span>
            <span className='text-primary font-medium'>click to upload</span>
          </div>
          <div className='text-xs text-muted-foreground'>
            {multiple ? (
              <span>Upload up to 3 recommendation letters (PDF only, max 5MB each)</span>
            ) : (
              <span>Supported formats: PDF, JPG, PNG</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadZone;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { GET_REQUEST, POST_REQUEST } from '@/lib/request';
import { EndPoints } from '@/lib/endpoints';

interface DocumentSubmissionHandlerProps {
  visaType: string;
  uploadedFiles: Record<string, File[]>;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const DocumentSubmissionHandler = ({
  visaType,
  uploadedFiles,
  isUploading,
  setIsUploading,
}: DocumentSubmissionHandlerProps) => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const handleSubmit = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please sign in to submit documents.',
      });
      return;
    }

    console.log(user.email);
    const assessmentTest = await GET_REQUEST(EndPoints.score, session.access_token);

    console.log(assessmentTest);

    if (!assessmentTest.id) {
      toast({
        variant: 'destructive',
        title: 'Assessment Required',
        description: 'Please complete the assessment before submitting documents.',
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      const totalFiles = Object.values(uploadedFiles).flat().length;
      let uploadedCount = 0;

      for (const [docType, files] of Object.entries(uploadedFiles)) {
        let doc_num = 1;
        for (const file of files) {
          const filePath = `${user.id}/${visaType}/${docType}/${doc_num}.${file.name.split('.').pop()}`;
          console.log(`Uploading ${docType} to ${filePath}`);

          const { data: existingFiles, error: checkError } = await supabase.storage
            .from('documents')
            .list(`${user.id}/${visaType}/${docType}`);
          console.log(existingFiles);

          if (checkError) throw checkError;

          const fileExists = existingFiles?.some((existingFile) => existingFile.name === filePath.split('/').pop());

          if (fileExists) {
            // Delete existing file
            await POST_REQUEST(EndPoints.removeDoc, { file_path: filePath }, session.access_token)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                throw err;
              });
          }

          const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);

          if (uploadError) {
            console.error(`Error uploading ${docType}:`, uploadError);
            throw uploadError;
          }

          const { error: dbError } = await supabase.from('documents').insert({
            user_id: user.id,
            document_type: docType,
            file_path: filePath,
            status: 'pending',
          });

          if (dbError) {
            console.error(`Error saving ${docType} metadata:`, dbError);
            throw dbError;
          }

          uploadedCount++;
          doc_num++;
          setProgress((uploadedCount / totalFiles) * 100);
        }
      }

      toast({
        title: 'Documents Uploaded',
        description: 'Your documents have been successfully uploaded.',
      });

      console.log('All files uploaded:', uploadedCount === totalFiles, uploadedCount, totalFiles);

      if (uploadedCount === totalFiles) {
        await POST_REQUEST(
          EndPoints.updateTrackings,
          {
            stage: 'Document Upload',
            visa_type: visaType,
            status: 'Completed',
            comment: 'Documents uploaded successfully',
          },
          session.access_token
        )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });

        navigate(0);
      }

      // navigate('/dashboard', {
      //   state: { documentSubmission: { visaType, timestamp: new Date().toISOString() } }
      // });
    } catch (error) {
      console.error('Document submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error uploading your documents. Please try again.',
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className='mt-6'>
      {progress > 0 && progress < 100 && (
        <div className='w-full bg-secondary rounded-full h-1.5 mb-4'>
          <div
            className='bg-primary h-1.5 rounded-full transition-all duration-300'
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={isUploading || Object.keys(uploadedFiles).length === 0}
        className='w-full'
      >
        {isUploading ? 'Uploading...' : 'Submit Documents'}
      </Button>
    </div>
  );
};

export default DocumentSubmissionHandler;

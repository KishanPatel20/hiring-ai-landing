import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText } from 'lucide-react';

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a resume file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await fetch('https://api.skillsync.dev/skillsync/candidates/upload/', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Upload Successful",
          description: "Resume has been uploaded and processed successfully.",
        });
        
        // Redirect to the candidate's profile or demo page
        navigate(`/demo`, { 
          state: { 
            fromSubmission: true,
            candidateId: result.candidate_id 
          } 
        });
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "There was a problem uploading the resume.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">Upload Candidate Resume</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Resume Upload</CardTitle>
              <CardDescription>
                Upload a candidate's resume to parse and add to the SkillSync database.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-10 w-10 text-skillsync-darkgray/50 mb-2" />
                    <p className="text-lg font-medium mb-2">Drag and drop or click to upload</p>
                    <p className="text-sm text-skillsync-darkgray/60 mb-4">
                      Supports PDF, DOCX, or TXT files
                    </p>
                    <Input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Label
                      htmlFor="resume-upload"
                      className="bg-skillsync-lightgray hover:bg-skillsync-lightgray/80 text-skillsync-darkgray py-2 px-4 rounded cursor-pointer"
                    >
                      Select File
                    </Label>
                  </div>
                  
                  {file && (
                    <div className="bg-skillsync-lightgray/30 p-3 rounded flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText size={20} className="text-skillsync-purple mr-2" />
                        <span>{file.name}</span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-skillsync-purple hover:bg-skillsync-purple/90 text-white"
                  disabled={isUploading || !file}
                >
                  {isUploading ? 'Uploading...' : 'Upload Resume'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadResume;

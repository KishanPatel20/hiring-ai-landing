
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Candidate } from '@/pages/Demo';
import { useToast } from "@/hooks/use-toast";
import { FileText, Download } from 'lucide-react';

interface CandidateProfileProps {
  candidate: Candidate;
  onBack: () => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidate, onBack }) => {
  const { toast } = useToast();

  const handleDownloadResume = async () => {
    try {
      const response = await fetch(`https://api.skillsync.dev/api/candidates/${candidate.id}/resume/`);
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      // Create a blob from the PDF Stream
      const blob = await response.blob();
      
      // Create a link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${candidate.name.replace(/\s+/g, '_')}_Resume.pdf`;
      
      // Append to the document
      document.body.appendChild(link);
      
      // Start download
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      
      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Download Error",
        description: "There was a problem downloading the resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={onBack}
      >
        ← Back to Results
      </Button>
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-28 w-28 border border-gray-200">
            <AvatarImage src={candidate.image} alt={candidate.name} />
            <AvatarFallback className="text-2xl">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-2xl font-bold">{candidate.name}</h1>
                <p className="text-skillsync-darkgray/80 text-lg">{candidate.role}</p>
                <p className="text-skillsync-darkgray/60">{candidate.experience} Experience</p>
              </div>
              
              <Button 
                className="mt-4 md:mt-0 flex items-center gap-2 bg-skillsync-purple hover:bg-skillsync-purple/90 text-white"
                onClick={handleDownloadResume}
              >
                <Download size={18} />
                Download Resume
              </Button>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-skillsync-lightgray/50 rounded-full text-skillsync-darkgray/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Work Experience</h2>
          <div className="space-y-4">
            {candidate.experiences.map((exp, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="font-medium text-lg text-skillsync-darkgray">{exp.company}</h3>
                  <span className="text-skillsync-darkgray/60">{exp.duration}</span>
                </div>
                <p className="text-skillsync-purple font-medium">{exp.role}</p>
                <p className="mt-2 text-skillsync-darkgray/80">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {candidate.education && candidate.education.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Education</h2>
            <ul className="list-disc pl-5">
              {candidate.education.map((edu, index) => (
                <li key={index} className="text-skillsync-darkgray/80 mb-2">{edu}</li>
              ))}
            </ul>
          </div>
        )}
        
        {candidate.projects && candidate.projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Projects</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidate.projects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;

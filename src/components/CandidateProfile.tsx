
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Candidate } from '@/pages/Demo';
import { useToast } from "@/hooks/use-toast";
import { Download, Brain, Loader2 } from 'lucide-react';
import { buildApiUrl, API_ENDPOINTS } from '@/config/api';
import { apiCall } from '@/services/apiService';
import { useAuth } from '@/contexts/AuthContext';
import CandidateAnalysis from './CandidateAnalysis';

interface CandidateProfileProps {
  candidate: Candidate;
  onBack: () => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidate, onBack }) => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [showJDForm, setShowJDForm] = useState(false);
  const [jdText, setJDText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleDownloadResume = async () => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.CANDIDATE_RESUME(candidate.id)));
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${candidate.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
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

  const handleAnalyzeCandidate = async () => {
    if (!jdText.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please enter a job description to analyze the candidate.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await apiCall(API_ENDPOINTS.CANDIDATE_ANALYSIS(candidate.id), {
        method: 'POST',
        token,
        body: {
          job_description: jdText
        }
      });
      
      setAnalysisResult(analysis);
      setShowJDForm(false);
      
      toast({
        title: "Analysis Complete",
        description: "AI analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Error analyzing candidate:', error);
      toast({
        title: "Analysis Error",
        description: "There was a problem analyzing the candidate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
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
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
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
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button 
                  className="flex items-center gap-2 bg-skillsync-purple hover:bg-skillsync-purple/90 text-white"
                  onClick={() => setShowJDForm(true)}
                >
                  <Brain size={18} />
                  AI Analysis
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleDownloadResume}
                >
                  <Download size={18} />
                  Download Resume
                </Button>
              </div>
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
      </div>

      {/* JD Input Form */}
      {showJDForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis - Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Paste Job Description
                </label>
                <Textarea
                  placeholder="Paste the job description here for AI analysis..."
                  value={jdText}
                  onChange={(e) => setJDText(e.target.value)}
                  rows={8}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleAnalyzeCandidate}
                  disabled={isAnalyzing || !jdText.trim()}
                  className="bg-skillsync-purple hover:bg-skillsync-purple/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Candidate'
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowJDForm(false)}
                  disabled={isAnalyzing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="mb-6">
          <CandidateAnalysis analysis={analysisResult} />
        </div>
      )}
        
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
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

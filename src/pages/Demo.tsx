
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CandidateSearch from '@/components/CandidateSearch';
import CandidateList from '@/components/CandidateList';
import CandidateProfile from '@/components/CandidateProfile';
import { useToast } from "@/hooks/use-toast";
import { apiCall } from '@/services/apiService';
import { API_ENDPOINTS } from '@/config/api';

export interface Candidate {
  id: number;
  name: string;
  image: string;
  role: string;
  experience: string;
  skills: string[];
  education: string[];
  projects: { name: string, description: string }[];
  experiences: { company: string, role: string, duration: string, description: string }[];
}

const Demo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  React.useEffect(() => {
    if (!location.state?.fromSubmission) {
      navigate('/');
    }
  }, [location, navigate]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    
    try {
      const data = await apiCall(API_ENDPOINTS.CANDIDATE_SEARCH, {
        method: 'POST',
        body: { query },
      });
      
      const transformedCandidates = data.results.map((candidate: any) => ({
        id: candidate.candidate_id,
        name: candidate.name,
        image: `/placeholder.svg`,
        role: candidate.roles && candidate.roles.length > 0 ? candidate.roles[0] : 'Professional',
        experience: `${candidate.total_experience_years} Years`,
        skills: [],
        education: [],
        projects: [],
        experiences: []
      }));
      
      setCandidates(transformedCandidates);
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error searching candidates:', error);
      toast({
        title: "Search Error",
        description: "There was a problem searching candidates. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCandidate = async (candidate: Candidate) => {
    try {
      setLoading(true);
      const candidateData = await apiCall(API_ENDPOINTS.CANDIDATE_DETAIL(candidate.id));
      
      const fullCandidate: Candidate = {
        id: candidateData.id,
        name: candidateData.name,
        image: `/placeholder.svg`,
        role: candidateData.experiences && candidateData.experiences.length > 0 
          ? candidateData.experiences[0].role 
          : candidate.role,
        experience: candidate.experience,
        skills: candidateData.skills || [],
        education: candidateData.education || [],
        projects: candidateData.projects ? candidateData.projects.map((p: any) => ({
          name: p.project_name,
          description: p.description
        })) : [],
        experiences: candidateData.experiences ? candidateData.experiences.map((exp: any) => ({
          company: exp.company,
          role: exp.role,
          duration: `${exp.start_date} - ${exp.end_date || 'Present'}`,
          description: exp.description
        })) : []
      };
      
      setSelectedCandidate(fullCandidate);
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      toast({
        title: "Error",
        description: "Failed to load candidate details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToResults = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Find Your Ideal Candidate</h1>
          
          {!selectedCandidate ? (
            <>
              <CandidateSearch onSearch={handleSearch} loading={loading} />
              
              {candidates.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
                  <CandidateList 
                    candidates={candidates} 
                    onSelectCandidate={handleSelectCandidate}
                  />
                </div>
              )}
              
              {!loading && searchQuery && candidates.length === 0 && (
                <div className="mt-8 text-center py-12 bg-skillsync-lightgray/30 rounded-xl">
                  <p className="text-xl text-skillsync-darkgray/70">
                    No candidates found matching your criteria. Try adjusting your search.
                  </p>
                </div>
              )}
            </>
          ) : (
            <CandidateProfile 
              candidate={selectedCandidate} 
              onBack={handleBackToResults} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Demo;

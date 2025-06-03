
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LinkedInProfileCard from '@/components/LinkedInProfileCard';
import CandidateReview from '@/components/CandidateReview';
import CandidateAnalysis from '@/components/CandidateAnalysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiCall } from '@/services/apiService';
import { API_ENDPOINTS } from '@/config/api';
import { Search, ArrowLeft } from 'lucide-react';

interface LinkedInProfile {
  name: string;
  linkedin_url: string;
  headline: string;
  location: string;
}

interface ScrapedProfile {
  name: string;
  headline: string;
  skills: string[];
  experience: string;
  education: string;
  linkedin_url?: string;
}

const LinkedInSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [searchResults, setSearchResults] = useState<LinkedInProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<ScrapedProfile | null>(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [view, setView] = useState<'search' | 'profile' | 'analysis'>('search');
  const { toast } = useToast();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const data = await apiCall(API_ENDPOINTS.LINKEDIN_SEARCH, {
        method: 'POST',
        token,
        body: { query: searchQuery },
      });
      
      setSearchResults(data);
      toast({
        title: "Search Complete",
        description: `Found ${data.length} LinkedIn profiles.`,
      });
    } catch (error) {
      console.error('LinkedIn search error:', error);
      toast({
        title: "Search Failed",
        description: "Failed to search LinkedIn profiles. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSearching(false);
    }
  };

  const handleViewProfile = async (profile: LinkedInProfile) => {
    setScraping(true);
    try {
      const data = await apiCall(API_ENDPOINTS.LINKEDIN_PROFILE, {
        method: 'POST',
        token,
        body: { linkedin_url: profile.linkedin_url },
      });
      
      setSelectedProfile({ ...data, linkedin_url: profile.linkedin_url });
      setView('profile');
      
      toast({
        title: "Profile Loaded",
        description: "LinkedIn profile has been analyzed successfully.",
      });
    } catch (error) {
      console.error('LinkedIn scraping error:', error);
      toast({
        title: "Profile Load Failed",
        description: "Failed to load LinkedIn profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setScraping(false);
    }
  };

  const handleAddToDatabase = async (profile: LinkedInProfile) => {
    try {
      // First scrape the profile
      const scrapedData = await apiCall(API_ENDPOINTS.LINKEDIN_PROFILE, {
        method: 'POST',
        token,
        body: { linkedin_url: profile.linkedin_url },
      });
      
      // Then add to candidates database
      await apiCall(API_ENDPOINTS.CANDIDATES, {
        method: 'POST',
        token,
        body: {
          name: scrapedData.name,
          role: scrapedData.headline,
          skills: scrapedData.skills,
          experience: scrapedData.experience,
          education: scrapedData.education,
          linkedin_url: profile.linkedin_url,
          status: 'pending'
        },
      });
      
      toast({
        title: "Candidate Added",
        description: "LinkedIn profile has been added to your candidate database.",
      });
    } catch (error) {
      console.error('Add to database error:', error);
      toast({
        title: "Add Failed",
        description: "Failed to add candidate to database. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStatusUpdate = async (candidateId: number, status: string, notes?: string) => {
    try {
      await apiCall(API_ENDPOINTS.CANDIDATE_DETAIL(candidateId), {
        method: 'PATCH',
        token,
        body: { status, notes },
      });
      
      toast({
        title: "Status Updated",
        description: `Candidate status updated to ${status}`,
      });
    } catch (error) {
      console.error('Status update error:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update candidate status.",
        variant: "destructive"
      });
    }
  };

  const handleAnalyze = async (candidateId: number, jd: string) => {
    try {
      const analysis = await apiCall(API_ENDPOINTS.CANDIDATE_ANALYSIS(candidateId), {
        method: 'POST',
        token,
        body: { job_description: jd },
      });
      
      setAnalysisResult(analysis);
      setView('analysis');
      
      toast({
        title: "Analysis Complete",
        description: "AI analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze candidate. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header with Back Button */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">LinkedIn Integration</h1>
              <p className="text-gray-600">Search for candidates and analyze LinkedIn profiles</p>
            </div>
            {view !== 'search' && (
              <Button 
                variant="outline" 
                onClick={() => setView('search')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </Button>
            )}
          </div>

          {/* Search View */}
          {view === 'search' && (
            <>
              {/* Search Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    LinkedIn Search
                  </CardTitle>
                  <CardDescription>
                    Search for candidates on LinkedIn based on job requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                      <Label htmlFor="search-query">Search Query</Label>
                      <Textarea
                        id="search-query"
                        placeholder="e.g., Python Developer with 5 years experience in Django"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-skillsync-purple hover:bg-skillsync-purple/90"
                      disabled={searching}
                    >
                      {searching ? 'Searching...' : 'Search LinkedIn'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Search Results ({searchResults.length} profiles found)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((profile, index) => (
                      <LinkedInProfileCard
                        key={index}
                        profile={profile}
                        onViewProfile={handleViewProfile}
                        onAddToDatabase={handleAddToDatabase}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Profile Review View */}
          {view === 'profile' && selectedProfile && (
            <CandidateReview
              candidate={selectedProfile}
              onStatusUpdate={handleStatusUpdate}
              onAnalyze={handleAnalyze}
            />
          )}

          {/* Analysis View */}
          {view === 'analysis' && analysisResult && (
            <CandidateAnalysis analysis={analysisResult} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LinkedInSearch;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiCall } from '@/services/apiService';
import { API_ENDPOINTS } from '@/config/api';
import { Search as SearchIcon, Users, Linkedin } from 'lucide-react';
import LinkedInProfileCard from '@/components/LinkedInProfileCard';
import CandidateReview from '@/components/CandidateReview';
import CandidateAnalysis from '@/components/CandidateAnalysis';
import LinkedInLoadingScreen from '@/components/LinkedInLoadingScreen';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

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

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Show loading screen if not authenticated yet
  if (!isAuthenticated) {
    return null;
  }

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
      const scrapedData = await apiCall(API_ENDPOINTS.LINKEDIN_PROFILE, {
        method: 'POST',
        token,
        body: { linkedin_url: profile.linkedin_url },
      });
      
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

  if (scraping) {
    return (
      <AuthenticatedLayout>
        <LinkedInLoadingScreen />
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        {view === 'search' && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-skillsync-blue">Skill<span className="text-skillsync-purple">Sync</span></span>
              </h1>
              <p className="text-xl text-gray-600 mb-2">Find exactly who you're looking for, in seconds.</p>
              <p className="text-purple-600 cursor-pointer hover:underline">See how it works.</p>
            </div>

            {/* Search Form */}
            <Card className="max-w-4xl mx-auto mb-8">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2 text-purple-600">
                    <SearchIcon className="h-5 w-5" />
                    <span className="font-medium">Who are you looking for?</span>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                      📋 Job Description
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                      ✓ Boolean
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
                      🎯 Select Manually
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Software Engineers with 5+ yrs of experience at fintech companies in the Bay Area"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="min-h-[100px] text-lg"
                      required
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      ✓ Location
                    </span>
                    <span className="flex items-center gap-1">
                      ✓ Job Title
                    </span>
                    <span className="flex items-center gap-1">
                      ✓ Years of Experience
                    </span>
                    <span className="flex items-center gap-1">
                      ✓ Industry
                    </span>
                    <span className="flex items-center gap-1">
                      ✓ Skills
                    </span>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg"
                    disabled={searching}
                  >
                    {searching ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Searching LinkedIn...
                      </div>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    All Profiles ({searchResults.length})
                  </h2>
                  <div className="text-sm text-gray-500">
                    1 - 15 of {searchResults.length}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {searchResults.map((profile, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                            <Linkedin className="h-4 w-4 text-blue-600" />
                          </div>
                          <p className="text-gray-600 mb-1">{profile.headline}</p>
                          <p className="text-sm text-gray-500">{profile.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewProfile(profile)}
                          >
                            View Profile
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAddToDatabase(profile)}
                            className="bg-skillsync-purple hover:bg-skillsync-purple/90"
                          >
                            Add to DB
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {view === 'profile' && selectedProfile && (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setView('search')}
              className="mb-6"
            >
              ← Back to Search
            </Button>
            <CandidateReview
              candidate={selectedProfile}
              onStatusUpdate={handleStatusUpdate}
              onAnalyze={handleAnalyze}
            />
          </div>
        )}

        {view === 'analysis' && analysisResult && (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setView('profile')}
              className="mb-6"
            >
              ← Back to Profile
            </Button>
            <CandidateAnalysis analysis={analysisResult} />
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default Search;

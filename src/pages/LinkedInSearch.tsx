
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiCall } from '@/services/apiService';
import { API_ENDPOINTS } from '@/config/api';
import { Search, ExternalLink } from 'lucide-react';

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
}

const LinkedInSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [searchResults, setSearchResults] = useState<LinkedInProfile[]>([]);
  const [scrapedProfile, setScrapedProfile] = useState<ScrapedProfile | null>(null);
  const [searching, setSearching] = useState(false);
  const [scraping, setScraping] = useState(false);
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

  const handleScrapeProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileUrl.trim()) return;

    setScraping(true);
    try {
      const data = await apiCall(API_ENDPOINTS.LINKEDIN_PROFILE, {
        method: 'POST',
        token,
        body: { linkedin_url: profileUrl },
      });
      
      setScrapedProfile(data);
      toast({
        title: "Profile Scraped",
        description: "LinkedIn profile has been analyzed successfully.",
      });
    } catch (error) {
      console.error('LinkedIn scraping error:', error);
      toast({
        title: "Scraping Failed",
        description: "Failed to analyze LinkedIn profile. Please check the URL and try again.",
        variant: "destructive"
      });
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">LinkedIn Integration</h1>
            <p className="text-gray-600">Search for candidates and analyze LinkedIn profiles</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LinkedIn Search */}
            <Card>
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
                
                {searchResults.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold">Search Results:</h3>
                    {searchResults.map((profile, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium">{profile.name}</h4>
                        <p className="text-sm text-gray-600">{profile.headline}</p>
                        <p className="text-sm text-gray-500">{profile.location}</p>
                        <a 
                          href={profile.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-skillsync-purple hover:underline text-sm mt-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Profile
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Profile Scraping */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Analysis</CardTitle>
                <CardDescription>
                  Analyze a specific LinkedIn profile by entering the URL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScrapeProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="profile-url">LinkedIn Profile URL</Label>
                    <Input
                      id="profile-url"
                      type="url"
                      placeholder="https://www.linkedin.com/in/username"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-skillsync-purple hover:bg-skillsync-purple/90"
                    disabled={scraping}
                  >
                    {scraping ? 'Analyzing...' : 'Analyze Profile'}
                  </Button>
                </form>
                
                {scrapedProfile && (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold">Profile Analysis:</h3>
                    <div className="p-4 border rounded-lg space-y-3">
                      <div>
                        <h4 className="font-medium">{scrapedProfile.name}</h4>
                        <p className="text-gray-600">{scrapedProfile.headline}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Experience:</h5>
                        <p className="text-sm text-gray-600">{scrapedProfile.experience}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Education:</h5>
                        <p className="text-sm text-gray-600">{scrapedProfile.education}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Skills:</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scrapedProfile.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="text-xs px-2 py-1 bg-skillsync-lightgray/50 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LinkedInSearch;

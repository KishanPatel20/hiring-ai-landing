
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiCall } from '@/services/apiService';
import { API_ENDPOINTS } from '@/config/api';
import { Eye, Download } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  email: string;
  status: string;
  skills: string[];
  applied_on: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchCandidates();
  }, [isAuthenticated, navigate]);

  const fetchCandidates = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.CANDIDATES, {
        token,
      });
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: "Error",
        description: "Failed to load candidates.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCandidateStatus = async (candidateId: number, status: string) => {
    try {
      await apiCall(API_ENDPOINTS.CANDIDATE_DETAIL(candidateId), {
        method: 'PUT',
        token,
        body: { status },
      });
      
      // Update local state
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, status }
            : candidate
        )
      );
      
      toast({
        title: "Status Updated",
        description: "Candidate status has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating candidate status:', error);
      toast({
        title: "Error",
        description: "Failed to update candidate status.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SELECTED': return 'bg-green-100 text-green-800';
      case 'INTERVIEW': return 'bg-orange-100 text-orange-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'APPLIED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20 pb-16 px-4">
          <div className="container mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Candidates</h1>
            <p className="text-gray-600">Manage your candidate pipeline</p>
          </div>
          
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                      <p className="text-gray-600">{candidate.email}</p>
                      <p className="text-sm text-gray-500">Applied: {new Date(candidate.applied_on).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 5 && (
                          <Badge variant="outline">+{candidate.skills.length - 5} more</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Select
                          value={candidate.status}
                          onValueChange={(value) => updateCandidateStatus(candidate.id, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="APPLIED">Applied</SelectItem>
                            <SelectItem value="INTERVIEW">Interview</SelectItem>
                            <SelectItem value="SELECTED">Selected</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/candidates/${candidate.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`${API_ENDPOINTS.CANDIDATE_RESUME(candidate.id)}`, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {candidates.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">No candidates found. Upload some resumes to get started!</p>
                  <Button 
                    className="mt-4 bg-skillsync-purple hover:bg-skillsync-purple/90"
                    onClick={() => navigate('/upload-resume')}
                  >
                    Upload Resume
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Candidates;

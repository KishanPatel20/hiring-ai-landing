
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, Brain, MessageSquare } from 'lucide-react';

interface CandidateReviewProps {
  candidate: any;
  onStatusUpdate: (candidateId: number, status: string, notes?: string) => void;
  onAnalyze: (candidateId: number, jd: string) => void;
}

const CandidateReview: React.FC<CandidateReviewProps> = ({ 
  candidate, 
  onStatusUpdate, 
  onAnalyze 
}) => {
  const [notes, setNotes] = useState('');
  const [jdText, setJdText] = useState('');
  const [showJDForm, setShowJDForm] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = (status: string) => {
    onStatusUpdate(candidate.id, status, notes);
    toast({
      title: "Status Updated",
      description: `Candidate status changed to ${status}`,
    });
  };

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please enter a job description for analysis",
        variant: "destructive"
      });
      return;
    }
    onAnalyze(candidate.id, jdText);
    setShowJDForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'selected': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.image} alt={candidate.name} />
              <AvatarFallback>
                {candidate.name?.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{candidate.name}</CardTitle>
              <p className="text-gray-600">{candidate.role || candidate.headline}</p>
              <p className="text-sm text-gray-500">{candidate.experience || candidate.location}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {candidate.status && (
              <Badge className={getStatusColor(candidate.status)}>
                {candidate.status}
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowJDForm(!showJDForm)}
            >
              <Brain className="h-4 w-4 mr-1" />
              AI Analysis
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Skills */}
        {candidate.skills && (
          <div>
            <Label className="text-sm font-medium">Skills</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {candidate.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* JD Analysis Form */}
        {showJDForm && (
          <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
            <Label htmlFor="jd-input">Job Description for AI Analysis</Label>
            <Textarea
              id="jd-input"
              placeholder="Paste job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button onClick={handleAnalyze} size="sm">
                Analyze
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowJDForm(false)} 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <Label htmlFor="notes">Review Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add your review notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={() => handleStatusUpdate('selected')}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Select
          </Button>
          <Button 
            onClick={() => handleStatusUpdate('interview')}
            variant="outline"
            className="flex-1"
          >
            <Clock className="h-4 w-4 mr-1" />
            Interview
          </Button>
          <Button 
            onClick={() => handleStatusUpdate('rejected')}
            variant="destructive"
            className="flex-1"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateReview;

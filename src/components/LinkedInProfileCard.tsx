
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, UserPlus } from 'lucide-react';

interface LinkedInProfile {
  name: string;
  linkedin_url: string;
  headline: string;
  location: string;
}

interface LinkedInProfileCardProps {
  profile: LinkedInProfile;
  onViewProfile: (profile: LinkedInProfile) => void;
  onAddToDatabase: (profile: LinkedInProfile) => void;
}

const LinkedInProfileCard: React.FC<LinkedInProfileCardProps> = ({ 
  profile, 
  onViewProfile, 
  onAddToDatabase 
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {profile.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{profile.headline}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {profile.location}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewProfile(profile)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Profile
          </Button>
          <Button 
            size="sm"
            onClick={() => onAddToDatabase(profile)}
            className="flex-1 bg-skillsync-purple hover:bg-skillsync-purple/90"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Add to DB
          </Button>
        </div>
        <a 
          href={profile.linkedin_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-skillsync-purple hover:underline text-xs mt-2"
        >
          <ExternalLink className="h-3 w-3" />
          LinkedIn Profile
        </a>
      </CardContent>
    </Card>
  );
};

export default LinkedInProfileCard;

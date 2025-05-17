
import React from 'react';
import { Candidate } from '@/pages/Demo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CandidateListProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates, onSelectCandidate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <div 
          key={candidate.id} 
          className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectCandidate(candidate)}
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border border-gray-200">
              <AvatarImage src={candidate.image} alt={candidate.name} />
              <AvatarFallback>
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-skillsync-darkgray">{candidate.name}</h3>
              <p className="text-skillsync-darkgray/70">{candidate.role}</p>
              <p className="text-sm text-skillsync-darkgray/60">{candidate.experience} Experience</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {candidate.skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 bg-skillsync-lightgray/50 rounded-full text-skillsync-darkgray/70"
                >
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 3 && (
                <span className="text-xs px-2 py-1 bg-skillsync-lightgray/30 rounded-full text-skillsync-darkgray/60">
                  +{candidate.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-sm text-skillsync-purple">Click to view profile →</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;

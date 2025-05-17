
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CandidateSearchProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const CandidateSearch: React.FC<CandidateSearchProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="job-description" className="block text-lg font-medium text-skillsync-darkgray mb-2">
            Paste your Job Description or Requirements
          </label>
          <Textarea
            id="job-description"
            placeholder="Enter job requirements, skills needed, or any specifications for the role..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[150px]"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full md:w-auto bg-skillsync-purple hover:bg-skillsync-purple/90 text-white"
          disabled={loading || !query.trim()}
        >
          {loading ? 'Searching...' : 'Find Candidates'}
        </Button>
      </form>
    </div>
  );
};

export default CandidateSearch;

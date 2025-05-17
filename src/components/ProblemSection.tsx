
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: "Time-Consuming Process",
      description: "Manual resume screening and candidate assessment takes weeks of your valuable time."
    },
    {
      title: "Talent Scarcity",
      description: "Finding qualified IT candidates with the right skillset is increasingly difficult."
    },
    {
      title: "High Hiring Costs",
      description: "Traditional recruitment methods lead to expensive sourcing and prolonged vacancies."
    },
    {
      title: "Imprecise Matching",
      description: "Without AI assistance, it's challenging to precisely match candidates to your needs."
    }
  ];

  return (
    <section className="py-16 bg-skillsync-blue text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The IT Hiring Challenge</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-white/80">
          SMB IT companies face significant obstacles when trying to find and hire the right talent.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-white/80">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

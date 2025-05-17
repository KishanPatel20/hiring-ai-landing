
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "Save Valuable Time",
      description: "Reduce screening time by up to 75% with automated candidate processing and AI-powered matching."
    },
    {
      title: "Cut Hiring Costs",
      description: "Lower recruitment expenses by streamlining the process and finding qualified candidates faster."
    },
    {
      title: "Improve Candidate Quality",
      description: "Find better matches with AI that understands technical requirements and soft skills."
    },
    {
      title: "Simplify Complex Searches",
      description: "Just tell SkillSync what you need in plain language, and let the AI handle the rest."
    },
    {
      title: "Eliminate Bias",
      description: "Focus on skills and qualifications with objective AI assessment instead of subjective opinions."
    },
    {
      title: "Data-Driven Insights",
      description: "Gain valuable analytics about talent pools and market trends to inform your hiring strategy."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">SkillSync</span> is the Solution
        </h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-skillsync-darkgray/80">
          Our AI-powered platform transforms how IT companies find and hire talent, making the process faster, smarter, and more effective.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="feature-card border-gray-100">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-full bg-skillsync-purple/10 flex items-center justify-center mb-4">
                  <Check className="h-5 w-5 text-skillsync-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-skillsync-blue">{benefit.title}</h3>
                <p className="text-skillsync-darkgray/80">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

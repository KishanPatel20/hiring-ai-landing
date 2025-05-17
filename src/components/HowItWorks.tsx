
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Describe Your Ideal Candidate",
      description: "Use natural language to tell SkillSync exactly who you're looking for - technical skills, experience level, and even soft skills."
    },
    {
      number: "02",
      title: "AI Processes & Matches",
      description: "Our advanced AI parses resumes, extracts skills, and matches candidates to your requirements with remarkable precision."
    },
    {
      number: "03",
      title: "Review Top Candidates",
      description: "Receive a ranked list of qualified candidates with AI-generated summaries highlighting why they're a good fit."
    },
    {
      number: "04",
      title: "Hire With Confidence",
      description: "Make data-driven decisions and move forward with the candidates who truly match your needs."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-skillsync-lightgray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How SkillSync Works</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-skillsync-darkgray/80">
          A simple, powerful process that transforms your hiring workflow
        </p>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-skillsync-purple/20 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`lg:w-6 lg:h-6 hidden lg:block absolute left-1/2 -translate-x-1/2 rounded-full ${index === steps.length - 1 ? 'bg-skillsync-cyan' : 'bg-skillsync-purple'}`}></div>
                
                <div className={`flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex items-center mb-4">
                        <span className="text-4xl font-bold mr-3 text-skillsync-purple/20">{step.number}</span>
                        <h3 className="text-xl font-semibold text-skillsync-blue">{step.title}</h3>
                      </div>
                      <p className="text-skillsync-darkgray/80">{step.description}</p>
                    </div>
                  </div>
                  <div className="lg:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

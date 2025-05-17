
import React from 'react';
import { Search, Users, Clock, FileText } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-skillsync-purple" />,
      title: "Natural Language Search (PeopleGPT)",
      description: "Find candidates using conversational language just like you'd describe your ideal hire to a colleague."
    },
    {
      icon: <FileText className="h-8 w-8 text-skillsync-purple" />,
      title: "Auto Resume Parsing & Skill Extraction",
      description: "Our AI automatically extracts and understands skills, experience, and qualifications from resumes."
    },
    {
      icon: <Users className="h-8 w-8 text-skillsync-purple" />,
      title: "AI-Generated Candidate Summaries",
      description: "Get concise overviews of each candidate highlighting their key qualifications and fit for your role."
    },
    {
      icon: <Clock className="h-8 w-8 text-skillsync-purple" />,
      title: "Automated Candidate Ranking",
      description: "Candidates are automatically scored and ranked based on how well they match your requirements."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Key Features</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-skillsync-darkgray/80">
          Powerful tools to transform your IT hiring process
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-skillsync-purple/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-skillsync-blue">{feature.title}</h3>
              <p className="text-skillsync-darkgray/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

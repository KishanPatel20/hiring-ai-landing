
import React from 'react';

const TargetAudience: React.FC = () => {
  const targetGroups = [
    {
      title: "HR Specialists & Recruiters",
      description: "Perfect for HR professionals who need to find qualified IT candidates efficiently without technical expertise.",
      emoji: "👩‍💼"
    },
    {
      title: "Technical Hiring Managers",
      description: "Ideal for team leads and managers who know what technical skills they need but lack time for screening.",
      emoji: "👨‍💻"
    },
    {
      title: "Startup Founders & CTOs",
      description: "Essential for leaders wearing multiple hats who need to build teams quickly without a dedicated recruitment team.",
      emoji: "🚀"
    },
    {
      title: "Small to Medium IT Companies",
      description: "Designed specifically for organizations with 10-250 employees who compete with larger companies for talent.",
      emoji: "🏢"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-skillsync-blue to-skillsync-purple text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Should Join the Beta?</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-white/80">
          SkillSync is designed for these specific users and companies
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetGroups.map((group, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">{group.emoji}</div>
              <h3 className="text-xl font-semibold mb-2">{group.title}</h3>
              <p className="text-white/80">{group.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

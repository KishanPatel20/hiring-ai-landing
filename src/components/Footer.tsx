
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-skillsync-blue text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold">
              Skill<span className="text-skillsync-cyan">Sync</span>
            </div>
            <p className="text-white/70 mt-2">AI-Powered Hiring Copilot for IT Companies</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h4 className="font-semibold mb-3">Beta Program</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-skillsync-cyan transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-skillsync-cyan transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-skillsync-cyan transition-colors">Apply Now</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-skillsync-cyan transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-skillsync-cyan transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center md:text-left text-white/50">
          <p>&copy; {currentYear} SkillSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

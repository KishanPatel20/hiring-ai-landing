import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  const scrollToForm = () => {
    document.getElementById('demo-request')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 bg-gradient-to-br from-skillsync-lightgray to-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find Top IT Talent <span className="gradient-text">Faster with AI</span>
          </h1>
          <p className="text-lg md:text-xl text-skillsync-darkgray/80 mb-6">
            SkillSync is your AI copilot for smarter IT hiring. Streamline recruitment for SMBs using intelligent automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToForm}
              className="bg-skillsync-purple hover:bg-skillsync-purple/90 text-white text-lg py-6 px-8"
            >
              Request a Demo
            </Button>
            <Button 
              variant="outline" 
              className="border-skillsync-purple text-skillsync-purple hover:bg-skillsync-purple/10"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-skillsync-purple/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-skillsync-cyan/10 rounded-full blur-3xl"></div>
            <div className="relative bg-white p-4 md:p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="bg-skillsync-lightgray rounded-xl p-4 mb-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-skillsync-lightgray p-3 rounded-lg">
                  <p className="font-medium text-sm text-skillsync-darkgray/70">AI Search Query</p>
                  <p className="text-skillsync-darkgray">"Find a senior React developer with Node.js experience and strong communication skills"</p>
                </div>
                <div className="flex items-center justify-center my-4">
                  <div className="w-10 h-10 rounded-full bg-skillsync-purple/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-skillsync-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="bg-skillsync-lightgray p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-sm text-skillsync-darkgray/70">Results Found</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">98% match</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <p className="font-medium">Emily Wilson</p>
                      <p className="text-sm text-skillsync-darkgray/70">Senior Frontend Developer • 5 years • React, Node.js</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-skillsync-darkgray/70">Fullstack Engineer • 6 years • React, Express, Node.js</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import TargetAudience from '@/components/TargetAudience';
import DemoForm from '@/components/CTAForm';
import Footer from '@/components/Footer';
import { initScrollAnimation } from '@/utils/scrollAnimation';

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize scroll animations
    const cleanupScrollAnimation = initScrollAnimation();
    
    // Cleanup on component unmount
    return () => {
      cleanupScrollAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="animate-on-scroll">
          <ProblemSection />
        </div>
        
        <div className="animate-on-scroll">
          <BenefitsSection />
        </div>
        
        <div className="animate-on-scroll">
          <HowItWorks />
        </div>
        
        <div className="animate-on-scroll">
          <Features />
        </div>
        
        <div className="animate-on-scroll">
          <TargetAudience />
        </div>
        
        <div className="animate-on-scroll">
          <DemoForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/90 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <span className="text-xl font-bold text-skillsync-blue">
            Skill<span className="text-skillsync-purple">Sync</span>
          </span>
        </div>
        <nav>
          <Button onClick={scrollToForm} className="bg-skillsync-purple hover:bg-skillsync-purple/90 text-white">
            Join Beta
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

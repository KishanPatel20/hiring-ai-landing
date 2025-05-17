
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  const scrollToForm = () => {
    document.getElementById('demo-request')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleRequestDemo = () => {
    // If we're already on the home page, scroll to form
    if (window.location.pathname === '/') {
      scrollToForm();
    } else {
      // Otherwise navigate to home page
      navigate('/');
      // We need to wait for the navigation to complete before scrolling
      setTimeout(() => {
        document.getElementById('demo-request')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/90 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-xl font-bold text-skillsync-blue">
            Skill<span className="text-skillsync-purple">Sync</span>
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-skillsync-purple text-skillsync-purple hover:bg-skillsync-purple/10"
            onClick={() => navigate('/upload-resume')}
          >
            <Upload size={18} />
            <span className="hidden sm:inline">Upload Resume</span>
          </Button>
          <Button onClick={handleRequestDemo} className="bg-skillsync-purple hover:bg-skillsync-purple/90 text-white">
            Request Demo
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

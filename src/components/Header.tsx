
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { apiCall } from '@/services/apiService';
import { API_ENDPOINTS } from '@/config/api';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, token } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await apiCall(API_ENDPOINTS.HR_LOGOUT, {
        method: 'POST',
        token,
      });
      
      logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      logout();
      navigate('/');
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
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <BarChart3 size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-skillsync-purple text-skillsync-purple hover:bg-skillsync-purple/10"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-skillsync-purple hover:bg-skillsync-purple/90 text-white"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

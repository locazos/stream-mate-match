
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-app-dark/80 backdrop-blur-lg border-t border-border">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex justify-around items-center py-4">
          <Link 
            to="/" 
            className={`flex flex-col items-center ${isActive('/') ? 'text-twitch' : 'text-gray-400'}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Discover</span>
          </Link>
          <Link 
            to="/matches" 
            className={`flex flex-col items-center ${isActive('/matches') ? 'text-twitch' : 'text-gray-400'}`}
          >
            <Users size={24} />
            <span className="text-xs mt-1">Matches</span>
          </Link>
          <Link 
            to="/profile" 
            className={`flex flex-col items-center ${isActive('/profile') ? 'text-twitch' : 'text-gray-400'}`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

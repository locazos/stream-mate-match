
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Discover';
      case '/matches':
        return 'Matches';
      case '/profile':
        return 'My Profile';
      default:
        return 'StreamMate Match';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-app-dark border-b border-border">
      <div className="container max-w-md mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white flex items-center">
          <span className="text-twitch mr-2">Stream</span>
          <span>Mate Match</span>
        </h1>
        <div className="text-lg font-medium">{getTitle()}</div>
      </div>
    </header>
  );
};

export default Navbar;

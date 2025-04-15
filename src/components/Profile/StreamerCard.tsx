
import React, { useState } from 'react';
import { Heart, X, Gamepad2, Users, Calendar } from 'lucide-react';
import { Streamer } from '../../data/streamers';

interface StreamerCardProps {
  streamer: Streamer;
  onSwipeRight: (id: string) => void;
  onSwipeLeft: (id: string) => void;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer, onSwipeRight, onSwipeLeft }) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  const handleSwipeRight = () => {
    setSwipeDirection('right');
    setTimeout(() => {
      onSwipeRight(streamer.id);
    }, 300);
  };
  
  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    setTimeout(() => {
      onSwipeLeft(streamer.id);
    }, 300);
  };
  
  return (
    <div 
      className={`absolute w-full bg-card rounded-2xl overflow-hidden card-shadow transition-transform duration-300 ${
        swipeDirection === 'right' ? 'animate-swipe-right' : 
        swipeDirection === 'left' ? 'animate-swipe-left' : ''
      }`}
    >
      <div className="relative h-96">
        <img 
          src={streamer.profileImage} 
          alt={streamer.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white text-shadow">{streamer.name}</h2>
            <span className="bg-twitch text-white text-xs px-2 py-1 rounded-full">
              {streamer.level}
            </span>
          </div>
          <p className="text-gray-200 mb-2">{streamer.bio}</p>
          <div className="flex gap-4">
            <div className="flex items-center text-sm text-gray-200">
              <Gamepad2 size={16} className="mr-1" />
              <span>{streamer.category}</span>
            </div>
            <div className="flex items-center text-sm text-gray-200">
              <Users size={16} className="mr-1" />
              <span>{streamer.followers}</span>
            </div>
            <div className="flex items-center text-sm text-gray-200">
              <Calendar size={16} className="mr-1" />
              <span>{streamer.schedule}</span>
            </div>
          </div>
        </div>
        
        {/* Match percentage indicator */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-twitch to-accent rounded-full px-3 py-1">
          <span className="font-bold text-white text-shadow">{streamer.matchPercentage}% Match</span>
        </div>
      </div>
      
      <div className="p-4 bg-card">
        <h3 className="font-semibold mb-2">Looking For:</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {streamer.lookingFor.map((tag, index) => (
            <span 
              key={index} 
              className="bg-muted text-white text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between gap-4 mt-4">
          <button 
            onClick={handleSwipeLeft}
            className="flex-1 bg-secondary hover:bg-secondary/80 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition-colors"
          >
            <X size={20} className="text-destructive" />
            <span>Skip</span>
          </button>
          <button 
            onClick={handleSwipeRight}
            className="flex-1 bg-twitch hover:bg-twitch-dark text-white py-3 rounded-xl flex justify-center items-center gap-2 transition-colors"
          >
            <Heart size={20} />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;

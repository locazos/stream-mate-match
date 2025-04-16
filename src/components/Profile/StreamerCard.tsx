
import React, { useState } from 'react';
import { Heart, X, Gamepad2, Users, Calendar } from 'lucide-react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Profile } from '@/hooks/useProfile';
import { useIsMobile } from '@/hooks/use-mobile';

interface StreamerCardProps {
  profile: Profile;
  onSwipeRight: (id: string) => void;
  onSwipeLeft: (id: string) => void;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ profile, onSwipeRight, onSwipeLeft }) => {
  const controls = useAnimation();
  const isMobile = useIsMobile();
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Swiped right
      setExitX(1000);
      controls.start({ x: 1000, opacity: 0, transition: { duration: 0.5 } });
      onSwipeRight(profile.id);
    } else if (info.offset.x < -threshold) {
      // Swiped left
      setExitX(-1000);
      controls.start({ x: -1000, opacity: 0, transition: { duration: 0.5 } });
      onSwipeLeft(profile.id);
    } else {
      // Return to center if not swiped far enough
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  };

  return (
    <motion.div 
      className="glass-card shadow-card overflow-hidden rounded-xl cursor-grab active:cursor-grabbing"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      drag={isMobile ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-96">
        <img 
          src={profile.avatar_url || 'https://via.placeholder.com/400x400'} 
          alt={profile.username || 'Streamer'} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-app-dark via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-2xl font-bold font-orbitron text-white mb-2">
            {profile.username || 'Anonymous Streamer'}
          </h2>
          
          <p className="text-gray-200 mb-4 line-clamp-2">{profile.description}</p>
          
          <div className="flex flex-wrap gap-3">
            {profile.games && profile.games.map((game, index) => (
              <div key={index} className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-gray-100">
                <Gamepad2 size={14} className="mr-1.5 text-neon-pink" />
                <span>{game}</span>
              </div>
            ))}
            
            {profile.language && (
              <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-gray-100">
                <Users size={14} className="mr-1.5 text-neon-teal" />
                <span>{profile.language}</span>
              </div>
            )}
            
            {profile.availability && (
              <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-gray-100">
                <Calendar size={14} className="mr-1.5 text-twitch-light" />
                <span>{profile.availability}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-app-gray p-6">
        <div className="flex justify-between gap-4">
          <button 
            onClick={() => onSwipeLeft(profile.id)}
            className="flex-1 bg-app-dark hover:bg-muted/60 text-white py-4 rounded-xl flex justify-center items-center gap-2 transition-colors button-hover border border-destructive/20"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-destructive/20 rounded-full opacity-30 blur-md"></div>
              <X size={20} className="text-destructive relative" />
            </div>
            <span className="font-chakra">Pass</span>
          </button>
          
          <button 
            onClick={() => onSwipeRight(profile.id)}
            className="flex-1 gradient-purple text-white py-4 rounded-xl flex justify-center items-center gap-2 transition-colors button-hover shadow-glow"
          >
            <Heart size={20} />
            <span className="font-chakra">Connect</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StreamerCard;

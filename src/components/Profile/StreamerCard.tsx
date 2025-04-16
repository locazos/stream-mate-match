
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
  const [rotation, setRotation] = useState(0);
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    const direction = info.velocity.x > 0 ? 1 : -1;
    
    if (Math.abs(info.offset.x) > threshold || velocity > 800) {
      const exitX = direction * window.innerWidth * 1.5;
      setExitX(exitX);
      
      if (direction > 0) {
        controls.start({ 
          x: exitX,
          y: 50,
          rotate: 30,
          opacity: 0,
          transition: { duration: 0.2 }
        });
        onSwipeRight(profile.id);
      } else {
        controls.start({ 
          x: exitX,
          y: 50,
          rotate: -30,
          opacity: 0,
          transition: { duration: 0.2 }
        });
        onSwipeLeft(profile.id);
      }
    } else {
      // Return to center
      controls.start({ 
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      });
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Calculate rotation based on drag distance
    const rotate = (info.offset.x * 0.1);
    setRotation(rotate);
    
    // Calculate opacity for the action buttons
    const swipeProgress = Math.min(Math.abs(info.offset.x) / 100, 1);
    const opacity = swipeProgress;
    
    controls.start({
      x: info.point.x,
      rotate,
      opacity: 1 - Math.abs(info.offset.x) / 1000,
      transition: { duration: 0 }
    });
  };

  return (
    <motion.div 
      className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden backdrop-blur-xl bg-black/20"
      style={{ height: "600px" }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={controls}
      drag={isMobile ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      whileTap={{ cursor: "grabbing" }}
    >
      <div className="absolute inset-0">
        <img 
          src={profile.avatar_url || 'https://via.placeholder.com/400x400'} 
          alt={profile.username || 'Streamer'} 
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-orbitron mb-2">
            {profile.username || 'Anonymous Streamer'}
          </h2>
          
          <p className="text-gray-200 mb-4 line-clamp-2 text-lg">
            {profile.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {profile.games && profile.games.map((game, index) => (
              <div key={index} className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm">
                <Gamepad2 size={14} className="mr-1.5 text-neon-pink" />
                <span>{game}</span>
              </div>
            ))}
            
            {profile.language && (
              <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm">
                <Users size={14} className="mr-1.5 text-neon-teal" />
                <span>{profile.language}</span>
              </div>
            )}
            
            {profile.availability && (
              <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm">
                <Calendar size={14} className="mr-1.5 text-twitch-light" />
                <span>{profile.availability}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button 
              onClick={() => onSwipeLeft(profile.id)}
              className="flex-1 bg-app-dark hover:bg-muted/60 text-white py-4 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-lg border border-red-500/20"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-red-500/20 rounded-full opacity-30 blur-md"></div>
                <X size={24} className="text-red-500 relative" />
              </div>
              <span className="font-chakra text-lg">Pass</span>
            </button>
            
            <button 
              onClick={() => onSwipeRight(profile.id)}
              className="flex-1 bg-gradient-to-r from-twitch via-twitch-dark to-purple-700 text-white py-4 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-glow"
            >
              <Heart size={24} />
              <span className="font-chakra text-lg">Connect</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StreamerCard;

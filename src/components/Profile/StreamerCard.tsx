
import React, { useState } from 'react';
import { Heart, X, Gamepad2, Users, Calendar, Zap, Award, ThumbsUp, Flame } from 'lucide-react';
import { Streamer } from '../../data/streamers';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

interface StreamerCardProps {
  streamer: Streamer;
  onSwipeRight: (id: string) => void;
  onSwipeLeft: (id: string) => void;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer, onSwipeRight, onSwipeLeft }) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
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
    <motion.div 
      className={`absolute w-full glass-card shadow-card overflow-hidden transition-transform duration-300 ${
        swipeDirection === 'right' ? 'animate-swipe-right' : 
        swipeDirection === 'left' ? 'animate-swipe-left' : ''
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      layoutId={`card-${streamer.id}`}
    >
      <div className="relative h-96">
        <img 
          src={streamer.profileImage} 
          alt={streamer.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-app-dark via-transparent to-transparent opacity-100" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold font-orbitron text-white text-shadow">{streamer.name}</h2>
            <Badge className="bg-twitch text-white border-none font-chakra">
              {streamer.level}
            </Badge>
          </div>
          
          <p className="text-gray-200 mb-3 line-clamp-2 font-jakarta">{streamer.bio}</p>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-gray-100">
              <Gamepad2 size={14} className="mr-1.5 text-neon-pink" />
              <span>{streamer.category}</span>
            </div>
            <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-gray-100">
              <Users size={14} className="mr-1.5 text-neon-teal" />
              <span>{streamer.followers}</span>
            </div>
            <div className="flex items-center bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-gray-100">
              <Calendar size={14} className="mr-1.5 text-twitch-light" />
              <span>{streamer.schedule}</span>
            </div>
          </div>
        </div>
        
        {/* Match percentage indicator */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-twitch to-neon-teal rounded-full opacity-30 blur-md"></div>
            <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 relative">
              <Flame size={14} className="text-neon-pink" />
              <span className="font-bold text-white text-shadow">Match {streamer.matchPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-app-gray">
        <motion.div
          animate={{ height: isExpanded ? 'auto' : '80px' }}
          className="overflow-hidden"
        >
          <div className="mb-4">
            <h3 className="font-chakra text-neon-teal mb-2 flex items-center gap-2">
              <Zap size={16} />
              Busca:
            </h3>
            <div className="flex flex-wrap gap-2">
              {streamer.lookingFor.map((tag, index) => (
                <Badge 
                  key={index}
                  className="bg-muted hover:bg-muted/80 text-white px-3 py-1 font-space"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {streamer.achievements && (
            <div className="mb-4">
              <h3 className="font-chakra text-neon-pink mb-2 flex items-center gap-2">
                <Award size={16} />
                Logros:
              </h3>
              <div className="flex flex-wrap gap-2">
                {streamer.achievements.map((achievement, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-neon-pink/30 text-neon-pink/90 px-3 py-1 font-space"
                  >
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {streamer.strengths && (
            <div className="mb-4">
              <h3 className="font-chakra text-neon-teal mb-2 flex items-center gap-2">
                <ThumbsUp size={16} />
                Fortalezas:
              </h3>
              <div className="flex flex-wrap gap-2">
                {streamer.strengths.map((strength, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="border-neon-teal/30 text-neon-teal/90 px-3 py-1 font-space"
                  >
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="pt-3 flex justify-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-app-text hover:text-white transition-colors flex items-center"
          >
            {isExpanded ? "Ver menos" : "Ver más detalles"}
          </button>
        </div>
        
        <div className="flex justify-between gap-4 mt-6">
          <button 
            onClick={handleSwipeLeft}
            className="flex-1 bg-app-dark hover:bg-muted/60 text-white py-4 rounded-xl flex justify-center items-center gap-2 transition-colors button-hover border border-destructive/20"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-destructive/20 rounded-full opacity-30 blur-md"></div>
              <X size={20} className="text-destructive relative" />
            </div>
            <span className="font-chakra">Pasar</span>
          </button>
          
          <button 
            onClick={handleSwipeRight}
            className="flex-1 gradient-purple text-white py-4 rounded-xl flex justify-center items-center gap-2 transition-colors button-hover shadow-glow"
          >
            <Heart size={20} />
            <span className="font-chakra">Conectar</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StreamerCard;


import React from 'react';
import { Match } from '../../hooks/useMatches';
import { MessageSquare, User2, Gamepad2, Star, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface MatchesListProps {
  matches: Match[];
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-12 text-center glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <User2 size={32} className="text-app-text" />
        </div>
        <h3 className="text-xl font-space mb-2">No hay matches aún</h3>
        <p className="text-app-text text-sm max-w-xs mb-6">
          ¡Comienza a hacer swipe a la derecha en streamers con los que te gustaría colaborar!
        </p>
        <Button 
          variant="outline" 
          className="border-twitch/30 text-twitch hover:bg-twitch/10 button-hover"
          onClick={() => window.location.href = '/'}
        >
          Explorar streamers
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid gap-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {matches.map((match, index) => {
        const profile = match.matchedProfile;
        if (!profile) return null;
        
        return (
          <motion.div 
            key={match.id} 
            className="glass-card overflow-hidden shadow-card animate-fade-in"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex">
              <div className="w-28 h-28 overflow-hidden">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.username || 'User'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <User2 size={32} className="text-app-text" />
                  </div>
                )}
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-chakra font-bold">{profile.username || 'User'}</h3>
                  <Badge className="bg-gradient-to-r from-twitch to-neon-pink text-white border-none">
                    <Star size={12} className="mr-1" />
                    Match
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center text-xs text-app-text mb-2 gap-2">
                  {profile.games && profile.games.length > 0 && (
                    <div className="flex items-center">
                      <Gamepad2 size={12} className="mr-1 text-neon-pink" />
                      <span>{profile.games.join(', ')}</span>
                    </div>
                  )}
                  {profile.availability && (
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1 text-neon-teal" />
                      <span>{profile.availability}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-app-text line-clamp-1 mb-3">
                  {profile.description || ''}
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-app-gray border-app-text/10 hover:bg-muted text-white button-hover flex items-center justify-center gap-1"
                  >
                    <ExternalLink size={14} />
                    <span>Ver perfil</span>
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 gradient-purple button-hover shadow-glow flex items-center justify-center gap-1"
                  >
                    <MessageSquare size={14} />
                    <span>Mensaje</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MatchesList;

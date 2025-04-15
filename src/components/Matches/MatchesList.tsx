
import React from 'react';
import { Streamer } from '../../data/streamers';
import { MessageSquare, User2, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MatchesListProps {
  matches: Streamer[];
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <User2 size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No matches yet</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Start swiping right on streamers you'd like to collaborate with!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {matches.map(match => (
        <div 
          key={match.id} 
          className="bg-card rounded-xl overflow-hidden animate-fade-in"
        >
          <div className="flex">
            <div className="w-24 h-24">
              <img 
                src={match.profileImage} 
                alt={match.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold">{match.name}</h3>
                <span className="text-xs bg-twitch-light/20 text-twitch-light px-2 py-0.5 rounded-full">
                  {match.matchPercentage}% Match
                </span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <Gamepad2 size={12} className="mr-1" />
                <span>{match.category}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                {match.bio}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-1 bg-secondary hover:bg-muted text-white"
              >
                <MessageSquare size={14} />
                <span>Message</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesList;

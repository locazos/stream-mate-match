
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Heart, Gamepad2 } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 text-center">
        <div className="mb-8 relative">
          <h1 className="text-4xl font-bold mb-2 gradient-bg text-transparent bg-clip-text">
            Stream<span className="text-white">Mate Match</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-sm">
            Find your perfect streaming partner and grow together
          </p>
        </div>
        
        <div className="w-full max-w-md bg-card rounded-2xl p-6 mb-8 card-shadow">
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-twitch/20 flex items-center justify-center mb-2">
                <Users size={24} className="text-twitch" />
              </div>
              <span className="text-sm">Connect</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                <Heart size={24} className="text-accent" />
              </div>
              <span className="text-sm">Match</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-twitch/20 flex items-center justify-center mb-2">
                <Gamepad2 size={24} className="text-twitch" />
              </div>
              <span className="text-sm">Collab</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            StreamMate Match connects Twitch streamers for collaborations, helping you grow your audience and create amazing content together.
          </p>
          
          <Link to="/profile">
            <Button className="w-full gradient-bg hover:opacity-90 flex items-center justify-center gap-2">
              Create Your Profile
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Already have a profile? <Link to="/" className="text-twitch hover:underline">Start discovering</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

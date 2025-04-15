
import React from 'react';
import StreamerCard from '../components/Profile/StreamerCard';
import { useStreamers } from '../hooks/useStreamers';
import { User } from 'lucide-react';

const Home: React.FC = () => {
  const { 
    currentStreamer, 
    handleSwipeRight, 
    handleSwipeLeft 
  } = useStreamers();

  if (!currentStreamer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <User size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No more streamers</h3>
        <p className="text-muted-foreground max-w-xs">
          You've seen all potential stream partners for now. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-20 px-4 min-h-screen">
      <div className="container max-w-md mx-auto">
        <div className="mt-4 relative h-[640px]">
          <StreamerCard 
            streamer={currentStreamer}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

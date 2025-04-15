
import { useState } from 'react';
import { Streamer, mockStreamers, mockMatches } from '../data/streamers';
import { useToast } from '@/hooks/use-toast';

export const useStreamers = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([...mockStreamers]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<Streamer[]>([...mockMatches]);
  const { toast } = useToast();
  
  const currentStreamer = streamers[currentIndex];
  
  const handleSwipeRight = (id: string) => {
    // In a real app, this would make an API call to record the match
    toast({
      title: "It's a match!",
      description: `You matched with ${currentStreamer.name}. Start a conversation!`,
    });
    
    // Add to matches
    setMatches(prev => [currentStreamer, ...prev]);
    
    // Move to next streamer
    handleNextStreamer();
  };
  
  const handleSwipeLeft = (id: string) => {
    // Move to next streamer
    handleNextStreamer();
  };
  
  const handleNextStreamer = () => {
    // If we've gone through all streamers, reset
    if (currentIndex >= streamers.length - 1) {
      // In a real app, we would fetch more streamers
      toast({
        title: "That's everyone for now!",
        description: "Check back later for more potential stream partners.",
      });
      // For demo purposes, we'll reset the index
      setCurrentIndex(0);
      return;
    }
    
    setCurrentIndex(prev => prev + 1);
  };
  
  return {
    streamers,
    currentStreamer,
    matches,
    handleSwipeRight,
    handleSwipeLeft,
  };
};


import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from './useProfile';
import { toast } from '@/components/ui/sonner';

export const useSwipe = (currentUserId: string) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProfiles = async () => {
    try {
      setIsLoading(true);
      
      // Get all profiles except current user and already swiped ones
      const { data: swipedProfiles } = await supabase
        .from('swipes')
        .select('target_id')
        .eq('swiper_id', currentUserId);

      const swipedIds = swipedProfiles?.map(s => s.target_id) || [];

      const { data: availableProfiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUserId)
        .not('id', 'in', `(${swipedIds.join(',')})`);

      if (error) throw error;
      
      setProfiles(availableProfiles || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error loading profiles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = async (targetId: string, direction: 'left' | 'right') => {
    try {
      // Record the swipe
      const { error: swipeError } = await supabase
        .from('swipes')
        .insert({ swiper_id: currentUserId, target_id: targetId, direction });

      if (swipeError) throw swipeError;

      if (direction === 'right') {
        // Check if there's a mutual match
        const { data: matchData } = await supabase
          .from('swipes')
          .select('*')
          .eq('swiper_id', targetId)
          .eq('target_id', currentUserId)
          .eq('direction', 'right')
          .maybeSingle();

        if (matchData) {
          // Create a match
          const { error: matchError } = await supabase
            .from('matches')
            .insert({ 
              user_a: currentUserId, 
              user_b: targetId 
            });

          if (matchError) throw matchError;
          
          toast.success("¡Es un match! 🎮");
        }
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error processing swipe');
    }
  };

  return {
    profiles,
    currentProfile: profiles[currentIndex],
    isLoading,
    fetchProfiles,
    handleSwipe,
  };
};

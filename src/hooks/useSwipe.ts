import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from './useProfile';
import { toast } from '@/components/ui/sonner';

export const useSwipe = (currentUserId: string) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProfiles = async () => {
    try {
      if (!currentUserId) {
        console.log('No current user ID provided');
        return;
      }
      
      setIsLoading(true);
      setCurrentIndex(0);
      
      console.log('Fetching profiles for user ID:', currentUserId);
      
      // Get all profiles except current user and already swiped ones
      const { data: swipedProfiles, error: swipeError } = await supabase
        .from('swipes')
        .select('target_id')
        .eq('swiper_id', currentUserId);

      if (swipeError) {
        console.error('Error fetching swiped profiles:', swipeError);
        throw swipeError;
      }
      
      const swipedIds = swipedProfiles?.map(s => s.target_id) || [];
      console.log('Already swiped profile IDs:', swipedIds);
      
      // Fetch profiles excluding the current user
      const { data: availableProfiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUserId);

      if (error) {
        console.error('Error fetching available profiles:', error);
        throw error;
      }
      
      // Filter out the swiped profiles manually in JavaScript
      let filteredProfiles = availableProfiles || [];
      if (swipedIds.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile => !swipedIds.includes(profile.id));
      }
      
      console.log('Available profiles to swipe on:', filteredProfiles.length);
      setProfiles(filteredProfiles);
    } catch (error) {
      console.error('Error in fetchProfiles:', error);
      toast.error('Error loading profiles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = async (targetId: string, direction: 'left' | 'right') => {
    try {
      console.log(`[Swipe] Processing ${direction} swipe from ${currentUserId} to ${targetId}`);
      
      // Record the swipe
      const { error: swipeError } = await supabase
        .from('swipes')
        .insert({ 
          swiper_id: currentUserId, 
          target_id: targetId, 
          direction 
        });

      if (swipeError) {
        console.error('[Swipe] Error recording swipe:', swipeError);
        throw swipeError;
      }
      
      console.log('[Swipe] Successfully recorded swipe');

      // Only check for matches on right swipes
      if (direction === 'right') {
        // Check if target user already swiped right on current user
        const { data: reciprocalSwipe, error: checkError } = await supabase
          .from('swipes')
          .select('*')
          .eq('swiper_id', targetId)
          .eq('target_id', currentUserId)
          .eq('direction', 'right')
          .maybeSingle();

        if (checkError) {
          console.error('[Match] Error checking for reciprocal swipe:', checkError);
          throw checkError;
        }

        if (reciprocalSwipe) {
          console.log('[Match] Found reciprocal swipe, creating match...');
          
          // Call the create_match RPC function
          const { data: match, error: matchError } = await supabase
            .rpc('create_match', { 
              user_1: currentUserId, 
              user_2: targetId 
            });

          if (matchError) {
            console.error('[Match] Error creating match:', matchError);
            throw matchError;
          }
          
          console.log('[Match] Successfully created match:', match);
          toast.success("¡Es un match! 🎮");
        } else {
          console.log('[Match] No reciprocal swipe found yet');
          toast.success("Solicitud enviada");
        }
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('[Error] Error in handleSwipe:', error);
      toast.error('Error procesando la acción');
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchProfiles();
    }
  }, [currentUserId]);

  return {
    profiles,
    currentProfile: profiles[currentIndex],
    isLoading,
    fetchProfiles,
    handleSwipe,
  };
};

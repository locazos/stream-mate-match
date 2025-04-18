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
      console.log(`Handling ${direction} swipe for profile ID: ${targetId}`);
      
      // Record the swipe
      const { error: swipeError } = await supabase
        .from('swipes')
        .insert({ swiper_id: currentUserId, target_id: targetId, direction });

      if (swipeError) {
        console.error('Error recording swipe:', swipeError);
        throw swipeError;
      }
      
      console.log(`Swipe recorded: ${currentUserId} -> ${targetId} (${direction})`);

      if (direction === 'right') {
        // Check if there's a mutual match
        const { data: matchData, error: matchCheckError } = await supabase
          .from('swipes')
          .select('*')
          .eq('swiper_id', targetId)
          .eq('target_id', currentUserId)
          .eq('direction', 'right')
          .maybeSingle();

        if (matchCheckError) {
          console.error('Error checking for match:', matchCheckError);
          throw matchCheckError;
        }

        // For Connect button, we'll always display a success message
        if (matchData) {
          console.log('Found a mutual match! Creating match record...');
          
          // Call the create_match RPC function
          const { data: newMatch, error: matchError } = await supabase
            .rpc('create_match', { 
              user_1: currentUserId, 
              user_2: targetId 
            });

          if (matchError) {
            console.error('Error creating match:', matchError);
            throw matchError;
          }
          
          console.log('Match created successfully:', newMatch);
          toast.success("¡Es un match! 🎮");
        } else {
          console.log('No mutual match found with this profile');
          toast.success("Connection request sent!");
        }
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error in handleSwipe:', error);
      toast.error('Error processing swipe');
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

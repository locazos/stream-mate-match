
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
      
      // First, let's log all available profiles to diagnose issues
      const { data: allProfiles, error: allProfilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (allProfilesError) {
        console.error('Error fetching all profiles:', allProfilesError);
      } else {
        console.log('All profiles in database:', allProfiles.length);
        
        // Check if we have the specific profile ID we're looking for
        const specificId = '7238973d-a6e5-462d-91d0-66a2104374a7';
        console.log('Including the specific user ID we\'re looking for?', 
          allProfiles.some(p => p.id === specificId));
      }
      
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
      if (filteredProfiles.length > 0) {
        console.log('Profile IDs available:', filteredProfiles.map(p => p.id));
      }
      
      if (filteredProfiles && filteredProfiles.length > 0) {
        setProfiles(filteredProfiles);
      } else {
        console.log('No profiles available, adding test profiles');
        addTestProfilesIfEmpty();
      }
    } catch (error) {
      console.error('Error in fetchProfiles:', error);
      toast.error('Error loading profiles');
      // If there was an error, add test profiles as fallback
      addTestProfilesIfEmpty();
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
        }

        // For Connect button, we'll always display a success message
        if (direction === 'right') {
          if (matchData) {
            console.log('Found a match!', matchData);
            // Create a match
            const { data: newMatch, error: matchError } = await supabase
              .from('matches')
              .insert({ 
                user_a: currentUserId, 
                user_b: targetId 
              })
              .select();

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
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error in handleSwipe:', error);
      toast.error('Error processing swipe');
    }
  };

  // Add some test profiles if none are available - for demo purposes only
  const addTestProfilesIfEmpty = () => {
    console.log('Adding test profiles as fallback');
    
    const testProfiles = [
      {
        id: 'test-1',
        username: 'StreamerPro',
        avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
        description: 'Professional streamer looking for collaborations on FPS games.',
        games: ['Valorant', 'Call of Duty', 'Apex Legends'],
        language: 'English',
        timezone: 'America/New_York',
        availability: 'Weekday evenings'
      },
      {
        id: 'test-2',
        username: 'GamerGirl',
        avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
        description: 'RPG specialist streaming since 2020. Looking for co-op partners.',
        games: ['Elden Ring', 'Diablo IV', 'Final Fantasy'],
        language: 'English',
        timezone: 'Europe/London',
        availability: 'Weekends'
      }
    ];
    
    setProfiles(testProfiles as Profile[]);
  };

  useEffect(() => {
    if (currentUserId) {
      fetchProfiles();
    }
  }, [currentUserId]);

  useEffect(() => {
    // If we have no profiles after loading, add some test profiles
    if (profiles.length === 0 && !isLoading) {
      addTestProfilesIfEmpty();
    }
  }, [profiles, isLoading]);

  return {
    profiles,
    currentProfile: profiles[currentIndex],
    isLoading,
    fetchProfiles,
    handleSwipe,
  };
};

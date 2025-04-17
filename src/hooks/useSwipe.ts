
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
      
      // Fetch all profiles except current user
      const { data: availableProfiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUserId);

      if (error) {
        console.error('Error fetching available profiles:', error);
        throw error;
      }
      
      console.log('Available profiles to swipe on:', availableProfiles?.length || 0);
      
      if (availableProfiles && availableProfiles.length > 0) {
        setProfiles(availableProfiles);
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
      
      if (direction === 'right') {
        console.log('Creating a match with:', targetId);
        
        // Create a match in the matches table directly
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
        console.log('User passed on profile:', targetId);
        toast.success("Skipped this profile");
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error in handleSwipe:', error);
      toast.error('Error processing action');
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

  return {
    profiles,
    currentProfile: profiles[currentIndex],
    isLoading,
    fetchProfiles,
    handleSwipe,
  };
};

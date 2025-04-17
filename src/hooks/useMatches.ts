
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from './useProfile';
import { toast } from '@/components/ui/sonner';

export interface Match {
  id: string;
  user_a: string;
  user_b: string;
  matched_at: string;
  matchedProfile?: Profile;
}

export const useMatches = (currentUserId: string) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMatches = async () => {
    try {
      if (!currentUserId) {
        console.log('No current user ID provided for matches');
        return;
      }
      
      setIsLoading(true);
      console.log('Fetching matches for user ID:', currentUserId);
      
      // Get all matches where the current user is either user_a or user_b
      // Using parameterized query to avoid SQL injection and improve query parsing
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('*')
        .or(`user_a.eq.${currentUserId},user_b.eq.${currentUserId}`);

      if (matchesError) {
        console.error('Error fetching matches:', matchesError);
        throw matchesError;
      }
      
      console.log('Raw matches data:', matchesData);
      
      // For each match, fetch the profile of the other user
      if (matchesData && matchesData.length > 0) {
        const matchesWithProfiles = await Promise.all(
          matchesData.map(async (match) => {
            // Determine which user is the match (not the current user)
            const matchedUserId = match.user_a === currentUserId ? match.user_b : match.user_a;
            console.log(`Processing match ${match.id}: matched user ID is ${matchedUserId}`);
            
            // Fetch the profile of the matched user
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', matchedUserId)
              .maybeSingle();
              
            if (profileError) {
              console.error(`Error fetching profile for user ${matchedUserId}:`, profileError);
            }
            
            console.log(`Profile data for user ${matchedUserId}:`, profileData);
              
            return {
              ...match,
              matchedProfile: profileData || undefined
            };
          })
        );
        
        console.log('Processed matches with profiles:', matchesWithProfiles);
        setMatches(matchesWithProfiles.filter(match => match.matchedProfile)); // Filter out matches without profiles
      } else {
        console.log('No matches found for user', currentUserId);
        setMatches([]);
      }
    } catch (error) {
      console.error('Error in fetchMatches:', error);
      toast.error('Error loading matches');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchMatches();
    }
  }, [currentUserId]);

  return {
    matches,
    isLoading,
    fetchMatches
  };
};

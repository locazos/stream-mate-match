
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
      setIsLoading(true);
      
      // Get all matches where the current user is either user_a or user_b
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('*')
        .or(`user_a.eq.${currentUserId},user_b.eq.${currentUserId}`);

      if (matchesError) throw matchesError;
      
      // For each match, fetch the profile of the other user
      if (matchesData && matchesData.length > 0) {
        const matchesWithProfiles = await Promise.all(
          matchesData.map(async (match) => {
            // Determine which user is the match (not the current user)
            const matchedUserId = match.user_a === currentUserId ? match.user_b : match.user_a;
            
            // Fetch the profile of the matched user
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', matchedUserId)
              .single();
              
            return {
              ...match,
              matchedProfile: profileData || undefined
            };
          })
        );
        
        setMatches(matchesWithProfiles);
      } else {
        setMatches([]);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
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

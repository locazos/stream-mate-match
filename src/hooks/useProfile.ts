
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  games: string[] | null;
  description: string | null;
  language: string | null;
  timezone: string | null;
  availability: string | null;
}

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      toast.error('Error loading profile');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userId: string, updates: Partial<Profile>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      await fetchProfile(userId);
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    fetchProfile,
    updateProfile
  };
};

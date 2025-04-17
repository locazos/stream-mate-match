
import React, { useEffect } from 'react';
import StreamerCard from '../components/Profile/StreamerCard';
import { useSwipe } from '../hooks/useSwipe';
import { useAuth } from '../hooks/useAuth';
import { Loader2, Search, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';

const Home: React.FC = () => {
  const { session } = useAuth();
  const { profiles, currentProfile, isLoading, fetchProfiles, handleSwipe } = 
    useSwipe(session?.user?.id || '');
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfiles().catch((err) => {
        console.error('Error in initial profile fetch:', err);
        setError('Failed to load profiles. Please try refreshing.');
      });
    }
  }, [session?.user?.id]);
  
  // Debug logging to see what's happening with profiles
  useEffect(() => {
    console.log('Current profile state:', { 
      currentProfile, 
      profilesCount: profiles.length,
      isLoading,
      currentUserId: session?.user?.id
    });
  }, [currentProfile, profiles, isLoading, session?.user?.id]);
  
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError(null);
      await fetchProfiles();
      toast.success('Profiles refreshed');
    } catch (error) {
      console.error('Error refreshing profiles:', error);
      setError('Failed to refresh profiles. Please try again.');
      toast.error('Error refreshing profiles');
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="glass-card p-8 flex flex-col items-center">
          <Loader2 size={40} className="text-twitch mb-4 animate-spin" />
          <h3 className="text-xl font-orbitron mb-2">Loading streamers</h3>
          <p className="text-app-text text-center max-w-xs">
            Finding the best matches for you...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="glass-card p-8 flex flex-col items-center shadow-card"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <AlertCircle size={32} className="text-red-400" />
          </div>
          <h3 className="text-xl font-orbitron mb-2">Error Loading Profiles</h3>
          <p className="text-app-text text-center max-w-xs mb-6">
            {error}
          </p>
          <Button 
            onClick={handleRefresh}
            variant="outline" 
            className="border-twitch/30 text-twitch hover:bg-twitch/10 button-hover flex items-center gap-2"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <RefreshCw size={16} />
            )}
            <span>Try again</span>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  if (!currentProfile) {
    return (
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="glass-card p-8 flex flex-col items-center shadow-card"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search size={32} className="text-app-text" />
          </div>
          <h3 className="text-xl font-orbitron mb-2">No more streamers</h3>
          <p className="text-app-text text-center max-w-xs mb-6">
            You've seen all potential streaming partners for now. Check back later!
          </p>
          <Button 
            onClick={handleRefresh}
            variant="outline" 
            className="border-twitch/30 text-twitch hover:bg-twitch/10 button-hover flex items-center gap-2"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <RefreshCw size={16} />
            )}
            <span>Refresh search</span>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-app-dark via-app-gray to-app-dark z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,70,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(145,70,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
      
      <div className="w-full max-w-lg mx-auto relative z-10 flex flex-col flex-1 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-4 text-center"
        >
          <h1 className="text-3xl font-orbitron bg-gradient-to-r from-[#00FFFF] via-twitch to-[#ff4ecd] bg-clip-text text-transparent">
            Find matches
          </h1>
          <p className="text-app-text">Click Connect or Pass to find your next collaborator</p>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="mt-2 border-twitch/30 text-twitch hover:bg-twitch/10 button-hover"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 size={14} className="mr-2 animate-spin" />
            ) : (
              <RefreshCw size={14} className="mr-2" />
            )}
            <span>Refresh profiles</span>
          </Button>
        </motion.div>
        
        <div className="flex-1 flex items-center justify-center">
          {currentProfile && (
            <StreamerCard 
              profile={currentProfile}
              onSwipeRight={(id) => handleSwipe(id, 'right')}
              onSwipeLeft={(id) => handleSwipe(id, 'left')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


import React, { useState, useEffect } from 'react';
import MatchesList from '../components/Matches/MatchesList';
import { useMatches } from '../hooks/useMatches';
import { useAuth } from '../hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, UserCheck, Loader2, RefreshCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Matches: React.FC = () => {
  const { session } = useAuth();
  const { matches, isLoading, error, fetchMatches } = useMatches(session?.user?.id || '');
  const [activeTab, setActiveTab] = useState('matches');
  
  // In a real app, we would have actual messages
  // For now, we'll just show an empty state
  const mockMessages: any[] = [];
  
  // Debug logging for matches
  useEffect(() => {
    console.log('Matches component loaded with data:', {
      matches: matches.length,
      matchDetails: matches,
      userId: session?.user?.id
    });
  }, [matches, session?.user?.id]);
  
  // Initial load logging
  useEffect(() => {
    console.log('Matches component mounted, user ID:', session?.user?.id);
  }, []);
  
  // Manual refresh function
  const handleRefresh = () => {
    if (session?.user?.id) {
      console.log('Manual refresh triggered for matches');
      fetchMatches();
    }
  };

  return (
    <div className="pt-16 pb-20 px-4 min-h-screen">
      <div className="container max-w-md mx-auto">
        <Tabs defaultValue="matches" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger 
                value="matches" 
                onClick={() => setActiveTab('matches')}
                className="data-[state=active]:bg-twitch"
              >
                <UserCheck size={16} className="mr-2" />
                Matches
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                onClick={() => setActiveTab('messages')}
                className="data-[state=active]:bg-twitch"
              >
                <MessageSquare size={16} className="mr-2" />
                Messages
              </TabsTrigger>
            </TabsList>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleRefresh}
              className="text-app-text"
              disabled={isLoading}
            >
              <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
            </Button>
          </div>
          
          <TabsContent value="matches" className="mt-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Loader2 size={40} className="text-twitch mb-4 animate-spin" />
                <h3 className="text-lg font-medium mb-2">Loading matches...</h3>
              </div>
            ) : error ? (
              <motion.div 
                className="flex flex-col items-center justify-center py-10 text-center glass-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <AlertCircle size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Error Loading Matches</h3>
                <p className="text-app-text text-sm max-w-xs mb-6">
                  {error}
                </p>
                <Button onClick={handleRefresh} variant="default" className="gradient-purple">
                  Try Again
                </Button>
              </motion.div>
            ) : (
              <MatchesList matches={matches} />
            )}
          </TabsContent>
          <TabsContent value="messages" className="mt-0">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <MessageSquare size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No messages yet</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                When you match with someone, you can start a conversation here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Matches;

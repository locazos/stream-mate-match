
import React, { useState } from 'react';
import MatchesList from '../components/Matches/MatchesList';
import { useMatches } from '../hooks/useMatches';
import { useAuth } from '../hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, UserCheck, Loader2 } from 'lucide-react';

const Matches: React.FC = () => {
  const { session } = useAuth();
  const { matches, isLoading } = useMatches(session?.user.id || '');
  const [activeTab, setActiveTab] = useState('matches');
  
  // In a real app, we would have actual messages
  // For now, we'll just show an empty state
  const mockMessages: any[] = [];

  return (
    <div className="pt-16 pb-20 px-4 min-h-screen">
      <div className="container max-w-md mx-auto">
        <Tabs defaultValue="matches" className="mt-4">
          <TabsList className="grid grid-cols-2 mb-6">
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
          <TabsContent value="matches" className="mt-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Loader2 size={40} className="text-twitch mb-4 animate-spin" />
                <h3 className="text-lg font-medium mb-2">Loading matches...</h3>
              </div>
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

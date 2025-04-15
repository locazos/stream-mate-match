
import React from 'react';
import StreamerCard from '../components/Profile/StreamerCard';
import { useStreamers } from '../hooks/useStreamers';
import { User, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { 
    currentStreamer, 
    handleSwipeRight, 
    handleSwipeLeft,
    isLoading 
  } = useStreamers();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <div className="glass-card p-8 flex flex-col items-center">
          <Loader2 size={40} className="text-twitch mb-4 animate-spin" />
          <h3 className="text-xl font-orbitron mb-2">Cargando streamers</h3>
          <p className="text-app-text text-center max-w-xs">
            Estamos encontrando los mejores matches para ti...
          </p>
        </div>
      </div>
    );
  }

  if (!currentStreamer) {
    return (
      <motion.div 
        className="min-h-screen flex flex-col items-center justify-center py-20 px-4"
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
            <User size={32} className="text-app-text" />
          </div>
          <h3 className="text-xl font-orbitron mb-2">No hay más streamers</h3>
          <p className="text-app-text text-center max-w-xs mb-6">
            Has visto todos los posibles compañeros de stream por ahora. ¡Vuelve más tarde!
          </p>
          <Button 
            variant="outline" 
            className="border-twitch/30 text-twitch hover:bg-twitch/10 button-hover flex items-center gap-2"
          >
            <Search size={16} />
            <span>Expandir búsqueda</span>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-app-dark via-app-gray to-app-dark z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,70,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(145,70,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
      
      <div className="container max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 mb-6 text-center"
        >
          <h1 className="text-3xl font-orbitron gradient-text gradient-neon">Encuentra matches</h1>
          <p className="text-app-text">Desliza para descubrir tu próximo colaborador</p>
        </motion.div>
        
        <div className="relative h-[720px]">
          <StreamerCard 
            streamer={currentStreamer}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

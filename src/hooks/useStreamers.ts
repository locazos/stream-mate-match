
import { useState, useEffect } from 'react';
import { Streamer, mockStreamers, mockMatches } from '../data/streamers';
import { toast } from '@/components/ui/sonner';

export const useStreamers = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([...mockStreamers]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<Streamer[]>([...mockMatches]);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentStreamer = streamers[currentIndex];
  
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSwipeRight = (id: string) => {
    // En una app real, esto haría una llamada a la API para registrar el match
    toast.success("¡Es un match!", {
      description: `Has conectado con ${currentStreamer.name}. ¡Inicia una conversación!`,
      position: "bottom-center",
    });
    
    // Añadir a matches
    setMatches(prev => [currentStreamer, ...prev]);
    
    // Pasar al siguiente streamer
    handleNextStreamer();
  };
  
  const handleSwipeLeft = (id: string) => {
    // Pasar al siguiente streamer
    handleNextStreamer();
  };
  
  const handleNextStreamer = () => {
    // Si hemos pasado por todos los streamers, resetear
    if (currentIndex >= streamers.length - 1) {
      // En una app real, obtendríamos más streamers
      toast.info("¡Eso es todo por ahora!", {
        description: "Revisa más tarde para ver nuevos compañeros potenciales.",
        position: "bottom-center",
      });
      
      // Para fines de demostración, reiniciaremos el índice
      setCurrentIndex(0);
      return;
    }
    
    setCurrentIndex(prev => prev + 1);
  };
  
  return {
    streamers,
    currentStreamer,
    matches,
    isLoading,
    handleSwipeRight,
    handleSwipeLeft,
  };
};

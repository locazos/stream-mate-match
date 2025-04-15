
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Heart, Gamepad2, Zap, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Welcome: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-app-dark via-app-gray to-background z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,70,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(145,70,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-20 left-10 w-60 h-60 bg-twitch/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-neon-pink/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-neon-teal/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-6s' }} />

      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink via-twitch to-neon-teal opacity-30 blur-xl rounded-full"></div>
          <h1 className="text-5xl font-orbitron mb-3 gradient-neon gradient-text relative">
            Stream<span className="text-white">Mate</span>
          </h1>
          <p className="text-xl text-app-text font-space max-w-sm">
            Encuentra tu compañero ideal para hacer streaming juntos
          </p>
        </motion.div>
        
        <motion.div 
          className="w-full max-w-md glass-card p-8 mb-8 shadow-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-4 text-center mb-8"
          >
            <motion.div variants={item} className="flex flex-col items-center card-hover">
              <div className="w-16 h-16 rounded-2xl bg-twitch/20 flex items-center justify-center mb-3 neon-border">
                <Users size={28} className="text-twitch" />
              </div>
              <span className="text-sm font-chakra">Conecta</span>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center card-hover">
              <div className="w-16 h-16 rounded-2xl bg-neon-pink/20 flex items-center justify-center mb-3 neon-border">
                <Heart size={28} className="text-neon-pink" />
              </div>
              <span className="text-sm font-chakra">Colabora</span>
            </motion.div>
            <motion.div variants={item} className="flex flex-col items-center card-hover">
              <div className="w-16 h-16 rounded-2xl bg-neon-teal/20 flex items-center justify-center mb-3 neon-border">
                <Gamepad2 size={28} className="text-neon-teal" />
              </div>
              <span className="text-sm font-chakra">Crece</span>
            </motion.div>
          </motion.div>
          
          <motion.p 
            variants={item}
            className="text-sm text-app-text mb-8 leading-relaxed"
          >
            StreamMate conecta creadores de contenido para colaboraciones, 
            ayudándote a crecer tu audiencia y crear contenido increíble juntos.
          </motion.p>
          
          <motion.div variants={item}>
            <Link to="/profile">
              <Button className="w-full gradient-purple hover:opacity-90 flex items-center justify-center gap-2 text-md py-6 rounded-xl shadow-glow button-hover">
                Crear tu perfil
                <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-2 text-app-text text-sm">
            <Play size={14} className="text-neon-teal" />
            <span>Más de 5,000 streamers ya conectados</span>
          </div>
          
          <div className="text-sm text-app-text">
            ¿Ya tienes un perfil? <Link to="/auth" className="text-twitch hover:text-neon-teal transition-colors font-medium">Inicia sesión</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;

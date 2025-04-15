
import { useState, useEffect } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import { motion } from 'framer-motion';

const Auth = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-app-dark via-app-gray to-background z-0" />
      
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(145,70,255,0.1),transparent_70%)]"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      />
      
      <div className="absolute top-20 left-10 w-40 h-40 bg-twitch/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-neon-teal/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-neon-pink/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,70,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(145,70,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

      {/* Content */}
      <div className="w-full max-w-md z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-orbitron mb-2 gradient-neon gradient-text">
            Stream<span className="text-white">Mate</span>
          </h1>
          <motion.p 
            className="text-lg text-app-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Encuentra tu compañero ideal de streaming
          </motion.p>
          <motion.p 
            className="text-sm text-neon-teal mt-2 italic font-chakra"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            "El próximo gran stream comienza aquí"
          </motion.p>
        </motion.div>

        <motion.div 
          className="glass-card p-8 shadow-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <AuthForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;

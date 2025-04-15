
import React from 'react';
import ProfileForm from '../components/Profile/ProfileForm';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 pb-24 px-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-app-dark via-app-gray to-app-dark z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(145,70,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(145,70,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
      <div className="absolute top-1/4 left-0 w-60 h-60 bg-twitch/5 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-1/3 right-0 w-60 h-60 bg-neon-teal/5 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: '-3s' }} />
    
      <div className="container max-w-lg mx-auto relative z-10">
        <motion.div 
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-orbitron gradient-neon gradient-text">Tu Perfil de Streamer</h1>
          <p className="text-app-text mt-2">Personaliza tu perfil para encontrar matches perfectos</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ProfileForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

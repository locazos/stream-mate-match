
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Gamepad2, Image, Save, User, Link2, Calendar, Sparkles, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileForm: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const streamCategories = [
    'Just Chatting',
    'Gaming',
    'Music',
    'Art',
    'IRL',
    'Educational',
    'Esports',
    'Talk Shows'
  ];
  
  const experienceLevels = [
    'Beginner',
    'Affiliate',
    'Partner',
    'Pro'
  ];

  const collaborationTypes = [
    'Co-streaming',
    'Guest Appearances',
    'Shared Projects',
    'Community Events',
    'Regular Collabs',
    'One-time Streams',
    'Tournament Teams',
    'Podcast/Talk Shows'
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("¡Perfil actualizado correctamente!", {
        description: "Tus cambios han sido guardados."
      });
    }, 1500);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="glass-card p-6 md:p-8 shadow-card"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={item} className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-app-gray mb-4 group">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-app-gray to-muted">
                <User size={40} className="text-app-text" />
              </div>
            )}
            <label className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <div className="flex flex-col items-center">
                <Image size={24} className="text-white mb-2" />
                <span className="text-white text-xs font-chakra">Cambiar foto</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </motion.div>

        <div className="space-y-5">
          <motion.div variants={item}>
            <Label className="text-sm font-chakra flex items-center gap-2 mb-1.5">
              <User size={14} className="text-neon-pink" />
              Nombre de usuario
            </Label>
            <Input placeholder="Tu nombre de streamer" className="bg-app-gray border-app-text/10 focus:border-twitch focus:ring-twitch" />
          </motion.div>
          
          <motion.div variants={item}>
            <Label className="text-sm font-chakra flex items-center gap-2 mb-1.5">
              <Link2 size={14} className="text-neon-teal" />
              URL de Twitch
            </Label>
            <Input placeholder="https://twitch.tv/tunombre" className="bg-app-gray border-app-text/10 focus:border-twitch focus:ring-twitch" />
          </motion.div>
          
          <motion.div variants={item}>
            <Label className="text-sm font-chakra flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-twitch-light" />
              Biografía
            </Label>
            <Textarea 
              placeholder="Cuéntales a otros streamers sobre ti..." 
              className="min-h-[120px] bg-app-gray border-app-text/10 focus:border-twitch focus:ring-twitch" 
            />
          </motion.div>
          
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="text-sm font-chakra flex items-center gap-2 mb-1.5">
                <Gamepad2 size={14} className="text-neon-pink" />
                Categoría principal
              </Label>
              <Select>
                <SelectTrigger className="bg-app-gray border-app-text/10 focus:ring-twitch">
                  <SelectValue placeholder="Selecciona categoría" />
                </SelectTrigger>
                <SelectContent className="bg-app-gray border-app-text/10">
                  {streamCategories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()} className="focus:bg-twitch/20">
                      <div className="flex items-center">
                        <Gamepad2 size={14} className="mr-2 text-neon-pink" />
                        {category}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-chakra flex items-center gap-2 mb-1.5">
                <Flame size={14} className="text-neon-teal" />
                Nivel de experiencia
              </Label>
              <Select>
                <SelectTrigger className="bg-app-gray border-app-text/10 focus:ring-twitch">
                  <SelectValue placeholder="Selecciona nivel" />
                </SelectTrigger>
                <SelectContent className="bg-app-gray border-app-text/10">
                  {experienceLevels.map(level => (
                    <SelectItem key={level} value={level.toLowerCase()} className="focus:bg-twitch/20">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <Label className="text-sm font-chakra flex items-center gap-2 mb-1.5">
              <Calendar size={14} className="text-twitch-light" />
              Horario típico de stream
            </Label>
            <Input 
              placeholder="Ej: Lun-Vie 7-10pm" 
              className="bg-app-gray border-app-text/10 focus:border-twitch focus:ring-twitch" 
            />
          </motion.div>
          
          <motion.div variants={item}>
            <Label className="text-sm font-chakra flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-neon-pink" />
              Buscando (Tipos de colaboración)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {collaborationTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`collab-${type.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="data-[state=checked]:bg-twitch data-[state=checked]:border-twitch"
                  />
                  <label 
                    htmlFor={`collab-${type.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-sm text-app-text hover:text-white cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <Button 
            type="submit" 
            className="w-full gradient-purple hover:opacity-90 button-hover py-6 shadow-glow"
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Guardando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save size={18} />
                <span>Guardar perfil</span>
              </div>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ProfileForm;

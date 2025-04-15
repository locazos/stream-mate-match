
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Loader2, AtSign, Lock, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("¡Registro exitoso! Por favor revisa tu email para confirmar tu cuenta.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/');
        toast.success("¡Inicio de sesión exitoso!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      }
    })
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-chakra gradient-text gradient-purple mb-1">
          {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>
        <p className="text-sm text-app-text">
          {isSignUp 
            ? 'Regístrate para encontrar compañeros de stream' 
            : 'Accede a tu cuenta para conectar con streamers'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-5">
        <motion.div 
          className="space-y-2"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Label htmlFor="email" className="text-sm font-chakra flex items-center gap-2">
            <AtSign size={14} className="text-neon-teal" />
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary pl-3 pr-3 py-6 border-secondary focus:border-twitch focus:ring-twitch rounded-xl placeholder:text-muted-foreground/60"
            />
          </div>
        </motion.div>

        <motion.div 
          className="space-y-2"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Label htmlFor="password" className="text-sm font-chakra flex items-center gap-2">
            <Lock size={14} className="text-neon-pink" />
            Contraseña
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary pl-3 pr-3 py-6 border-secondary focus:border-twitch focus:ring-twitch rounded-xl placeholder:text-muted-foreground/60"
            />
          </div>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
        >
          <Button
            type="submit"
            className="w-full gradient-purple hover:opacity-90 transition-all duration-300 py-6 rounded-xl shadow-glow button-hover"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Registrando..." : "Iniciando sesión..."}
              </>
            ) : (
              <>
                {isSignUp ? (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Registrarse
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Iniciar sesión
                  </>
                )}
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div 
        className="text-center mt-6 pt-4 border-t border-muted"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={inputVariants}
      >
        <Button
          variant="ghost"
          onClick={() => setIsSignUp(!isSignUp)}
          type="button"
          className="text-app-text hover:text-white transition-colors flex items-center gap-2"
        >
          <Sparkles size={14} className="text-neon-teal" />
          {isSignUp 
            ? "¿Ya tienes cuenta? Inicia sesión" 
            : "¿No tienes cuenta? Regístrate"}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;

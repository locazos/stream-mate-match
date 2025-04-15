
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

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

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp 
            ? 'Regístrate para encontrar compañeros de stream'
            : 'Inicia sesión para continuar'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading 
            ? "Cargando..." 
            : (isSignUp ? "Registrarse" : "Iniciar sesión")}
        </Button>
      </form>

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
          type="button"
        >
          {isSignUp 
            ? "¿Ya tienes cuenta? Inicia sesión" 
            : "¿No tienes cuenta? Regístrate"}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;

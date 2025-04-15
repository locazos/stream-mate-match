
import AuthForm from '../components/Auth/AuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-background to-app-dark">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-bg text-transparent bg-clip-text">
            Stream<span className="text-white">Mate</span>
          </h1>
          <p className="text-muted-foreground">
            Encuentra tu compañero ideal de streaming
          </p>
        </div>
        <div className="glass-effect rounded-2xl p-6 card-shadow">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;

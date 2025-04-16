
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import BottomNav from "./components/Layout/BottomNav";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthGuard from "./components/Layout/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="bg-app-dark text-app-light min-h-screen flex flex-col">
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <AuthGuard>
                <div className="flex flex-col min-h-screen pt-[72px] pb-[80px]">
                  <Navbar />
                  <Home />
                  <BottomNav />
                </div>
              </AuthGuard>
            } />
            <Route path="/matches" element={
              <AuthGuard>
                <div className="flex flex-col min-h-screen pt-[72px] pb-[80px]">
                  <Navbar />
                  <Matches />
                  <BottomNav />
                </div>
              </AuthGuard>
            } />
            <Route path="/profile" element={
              <AuthGuard>
                <div className="flex flex-col min-h-screen pt-[72px] pb-[80px]">
                  <Navbar />
                  <Profile />
                  <BottomNav />
                </div>
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

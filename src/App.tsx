
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="bg-app-dark text-app-light min-h-screen">
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <BottomNav />
              </>
            } />
            <Route path="/matches" element={
              <>
                <Navbar />
                <Matches />
                <BottomNav />
              </>
            } />
            <Route path="/profile" element={
              <>
                <Navbar />
                <Profile />
                <BottomNav />
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

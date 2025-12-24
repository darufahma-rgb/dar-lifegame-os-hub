import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Daily Pages
import DailyPlanner from "./pages/daily/Planner";
import Habits from "./pages/daily/Habits";
import Journal from "./pages/daily/Journal";

// Goals Pages
import GoalsList from "./pages/goals/GoalsList";
import Vision from "./pages/goals/Vision";
import Health from "./pages/goals/Health";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Daily Routes */}
            <Route path="/daily/planner" element={<DailyPlanner />} />
            <Route path="/daily/habits" element={<Habits />} />
            <Route path="/daily/journal" element={<Journal />} />
            
            {/* Goals Routes */}
            <Route path="/goals/list" element={<GoalsList />} />
            <Route path="/goals/vision" element={<Vision />} />
            <Route path="/goals/health" element={<Health />} />
            
            {/* Placeholder routes */}
            <Route path="/planners/*" element={<Index />} />
            <Route path="/personal/*" element={<Index />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Daily Pages
import DailyPlanner from "./pages/daily/Planner";
import Habits from "./pages/daily/Habits";
import Journal from "./pages/daily/Journal";

// Goals Pages
import GoalsList from "./pages/goals/GoalsList";
import Vision from "./pages/goals/Vision";
import Health from "./pages/goals/Health";

// Planners Pages
import MealPlanner from "./pages/planners/MealPlanner";
import WorkoutPlanner from "./pages/planners/WorkoutPlanner";
import TravelPlanner from "./pages/planners/TravelPlanner";

// Personal Pages
import Bookshelf from "./pages/personal/Bookshelf";
import Movies from "./pages/personal/Movies";
import Finance from "./pages/personal/Finance";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Daily Routes */}
              <Route path="/daily/planner" element={<DailyPlanner />} />
              <Route path="/daily/habits" element={<Habits />} />
              <Route path="/daily/journal" element={<Journal />} />
              
              {/* Goals Routes */}
              <Route path="/goals/list" element={<GoalsList />} />
              <Route path="/goals/vision" element={<Vision />} />
              <Route path="/goals/health" element={<Health />} />
              
              {/* Planners Routes */}
              <Route path="/planners/meal" element={<MealPlanner />} />
              <Route path="/planners/workout" element={<WorkoutPlanner />} />
              <Route path="/planners/travel" element={<TravelPlanner />} />
              
              {/* Personal Routes */}
              <Route path="/personal/bookshelf" element={<Bookshelf />} />
              <Route path="/personal/movies" element={<Movies />} />
              <Route path="/personal/finance" element={<Finance />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

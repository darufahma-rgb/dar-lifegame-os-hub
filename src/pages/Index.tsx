import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardNav from "@/components/dashboard/DashboardNav";
import OverviewWidget from "@/components/dashboard/OverviewWidget";
import CalendarWidget from "@/components/dashboard/CalendarWidget";
import UpcomingWidget from "@/components/dashboard/UpcomingWidget";
import PlayNowSection from "@/components/dashboard/PlayNowSection";
import HabitTrackerWidget from "@/components/dashboard/HabitTrackerWidget";
import MealPlannerWidget from "@/components/dashboard/MealPlannerWidget";
import ShoppingListWidget from "@/components/dashboard/ShoppingListWidget";
import FinanceWidget from "@/components/dashboard/FinanceWidget";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dar Lifegame OS - Transform Your Life Into An Epic Game</title>
        <meta
          name="description"
          content="Dar Lifegame OS adalah sistem operasi kehidupan yang mengubah setiap momen menjadi quest, setiap pencapaian menjadi achievement, dan hidupmu menjadi game epik."
        />
      </Helmet>

      <DashboardLayout>
        <div className="min-h-screen">
          {/* Hero Banner */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img 
              src={dashboardHero} 
              alt="Dashboard Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
            <div className="absolute bottom-4 left-4">
              <div className="w-10 h-10 rounded-full bg-neon-green shadow-lg shadow-neon-green/50" />
            </div>
          </div>

          {/* Content */}
          <div className="px-4 md:px-8 py-6 max-w-[1600px] mx-auto">
            {/* Section 1: Navigation Hub (Top Menu) - 4 Pillars */}
            <DashboardNav />

            {/* Section 2 & 3: Task Management + Mood Booster */}
            <div className="grid lg:grid-cols-4 gap-6 mt-8">
              {/* Left/Center: Overview & Calendar (Task Management) */}
              <div className="lg:col-span-3 space-y-6">
                <OverviewWidget />
                <CalendarWidget />
              </div>

              {/* Right: Upcoming & Play Now (Mood Booster) */}
              <div className="space-y-6">
                <PlayNowSection />
                <UpcomingWidget />
              </div>
            </div>

            {/* Section 4: Lifestyle & Habit Tracking (Bottom Widgets) */}
            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-muted-foreground">—</span> Lifestyle Tracking
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Habit Tracker */}
                <HabitTrackerWidget />
                
                {/* Meal Planner */}
                <MealPlannerWidget />
                
                {/* Shopping List */}
                <ShoppingListWidget />
                
                {/* Finance Widget */}
                <FinanceWidget />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Index;

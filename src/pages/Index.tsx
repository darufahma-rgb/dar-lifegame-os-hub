import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardNav from "@/components/dashboard/DashboardNav";
import OverviewSection from "@/components/dashboard/OverviewSection";
import CalendarSection from "@/components/dashboard/CalendarSection";
import UpcomingSection from "@/components/dashboard/UpcomingSection";
import PlayNowSection from "@/components/dashboard/PlayNowSection";
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
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={dashboardHero} 
              alt="Dashboard Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
            <div className="absolute bottom-4 left-4">
              <div className="w-12 h-12 rounded-full bg-neon-green shadow-lg shadow-neon-green/50" />
            </div>
          </div>

          {/* Content */}
          <div className="container px-4 md:px-8 py-8 max-w-7xl">
            {/* Dashboard Nav (Category Cards) */}
            <DashboardNav />

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Overview & Calendar */}
              <div className="lg:col-span-2 space-y-8">
                <OverviewSection />
                <CalendarSection />
              </div>

              {/* Right Column - Play Now & Upcoming */}
              <div className="space-y-8">
                <PlayNowSection />
                <UpcomingSection />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Index;

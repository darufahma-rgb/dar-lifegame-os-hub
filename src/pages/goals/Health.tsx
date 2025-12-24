import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Heart, Activity, Moon, Droplets, Dumbbell, Brain } from "lucide-react";

const healthStats = [
  { label: "Sleep Score", value: "85%", icon: Moon, color: "text-purple-400", bg: "bg-purple-500/20" },
  { label: "Hydration", value: "6/8", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/20" },
  { label: "Workouts", value: "4/5", icon: Dumbbell, color: "text-pink-400", bg: "bg-pink-500/20" },
  { label: "Mental", value: "90%", icon: Brain, color: "text-amber-400", bg: "bg-amber-500/20" },
];

const recentActivities = [
  { title: "Morning Run", duration: "45 min", calories: 450, date: "Today" },
  { title: "Weight Training", duration: "60 min", calories: 380, date: "Yesterday" },
  { title: "Yoga Session", duration: "30 min", calories: 150, date: "2 days ago" },
  { title: "Swimming", duration: "45 min", calories: 400, date: "3 days ago" },
];

const Health = () => {
  return (
    <>
      <Helmet>
        <title>Health Dashboard - Dar Lifegame OS</title>
        <meta name="description" content="Track your health and wellness metrics with Dar Lifegame OS." />
      </Helmet>

      <SubpageLayout 
        title="Health" 
        subtitle="Your wellness and vitality stats"
        breadcrumbs={[{ label: "Goals", href: "/goals/health" }, { label: "Health", href: "/goals/health" }]}
      >
        {/* Overall Score */}
        <div className="bg-gradient-to-br from-pink-500/20 via-card/50 to-purple-500/20 rounded-2xl border border-pink-500/30 p-8 mb-8 text-center">
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-pulse" />
          <h2 className="font-display text-4xl font-bold text-foreground mb-2">87%</h2>
          <p className="text-muted-foreground">Overall Health Score</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {healthStats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-card/30 rounded-xl border border-border/50 p-4"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activities
            </h3>
          </div>
          <div className="divide-y divide-border/30">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <div>
                  <div className="font-medium text-foreground">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-foreground">{activity.duration}</div>
                  <div className="text-xs text-primary">{activity.calories} cal</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SubpageLayout>
    </>
  );
};

export default Health;

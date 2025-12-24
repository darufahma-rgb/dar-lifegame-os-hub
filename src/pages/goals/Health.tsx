import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Heart, Activity, Moon, Droplets, Dumbbell, Brain, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface HealthLog {
  id: string;
  log_date: string;
  sleep_hours: number | null;
  water_glasses: number;
  steps: number;
  weight: number | null;
  mood: string | null;
}

interface Activity {
  id: string;
  title: string;
  activity_type: string | null;
  duration_minutes: number | null;
  calories_burned: number | null;
  activity_date: string;
}

const Health = () => {
  const [healthLog, setHealthLog] = useState<HealthLog | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user) {
      fetchTodayLog();
      fetchActivities();
    }
  }, [user]);

  const fetchTodayLog = async () => {
    const { data } = await supabase
      .from('health_logs')
      .select('*')
      .eq('log_date', today)
      .maybeSingle();
    
    setHealthLog(data);
    setLoading(false);
  };

  const fetchActivities = async () => {
    const { data } = await supabase
      .from('activities')
      .select('*')
      .order('activity_date', { ascending: false })
      .limit(10);
    
    setActivities(data || []);
  };

  const createOrUpdateLog = async (field: string, value: number) => {
    if (!user) return;

    if (healthLog) {
      const { data } = await supabase
        .from('health_logs')
        .update({ [field]: value })
        .eq('id', healthLog.id)
        .select()
        .single();
      
      if (data) setHealthLog(data);
    } else {
      const { data } = await supabase
        .from('health_logs')
        .insert({ user_id: user.id, log_date: today, [field]: value })
        .select()
        .single();
      
      if (data) setHealthLog(data);
    }
  };

  const addActivity = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('activities')
      .insert({
        user_id: user.id,
        title: "New Activity",
        activity_type: "workout",
        duration_minutes: 30,
      })
      .select()
      .single();

    if (!error && data) {
      setActivities([data, ...activities]);
      toast({ title: "Activity added!" });
    }
  };

  const deleteActivity = async (id: string) => {
    await supabase.from('activities').delete().eq('id', id);
    setActivities(activities.filter(a => a.id !== id));
    toast({ title: "Activity deleted" });
  };

  const healthStats = [
    { 
      label: "Sleep", 
      value: healthLog?.sleep_hours ? `${healthLog.sleep_hours}h` : "0h", 
      icon: Moon, 
      color: "text-purple-400", 
      bg: "bg-purple-500/20",
      field: "sleep_hours",
      max: 12
    },
    { 
      label: "Water", 
      value: `${healthLog?.water_glasses || 0}/8`, 
      icon: Droplets, 
      color: "text-cyan-400", 
      bg: "bg-cyan-500/20",
      field: "water_glasses",
      max: 8
    },
    { 
      label: "Steps", 
      value: (healthLog?.steps || 0).toLocaleString(), 
      icon: Dumbbell, 
      color: "text-pink-400", 
      bg: "bg-pink-500/20",
      field: "steps",
      max: 10000
    },
  ];

  return (
    <>
      <Helmet>
        <title>Health Dashboard - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Health" 
        subtitle="Your wellness and vitality stats"
        breadcrumbs={[{ label: "Goals", href: "/goals/health" }, { label: "Health", href: "/goals/health" }]}
      >
        {/* Overall Score */}
        <div className="bg-gradient-to-br from-pink-500/20 via-card/50 to-purple-500/20 rounded-2xl border border-pink-500/30 p-8 mb-8 text-center">
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-pulse" />
          <h2 className="font-display text-4xl font-bold text-foreground mb-2">
            {loading ? "..." : Math.min(100, Math.round(
              ((healthLog?.water_glasses || 0) / 8 * 33) +
              ((healthLog?.sleep_hours || 0) / 8 * 33) +
              ((healthLog?.steps || 0) / 10000 * 34)
            ))}%
          </h2>
          <p className="text-muted-foreground">Overall Health Score</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {healthStats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-card/30 rounded-xl border border-border/50 p-4"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground mb-3">{stat.label}</div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const current = (healthLog as any)?.[stat.field] || 0;
                    if (current > 0) createOrUpdateLog(stat.field, current - 1);
                  }}
                >
                  -
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const current = (healthLog as any)?.[stat.field] || 0;
                    createOrUpdateLog(stat.field, current + 1);
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activities
            </h3>
            <Button variant="outline" size="sm" onClick={addActivity}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          
          {activities.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No activities logged yet
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {activities.map((activity) => (
                <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors group">
                  <div>
                    <div className="font-medium text-foreground">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(activity.activity_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {activity.duration_minutes && (
                        <div className="text-sm text-foreground">{activity.duration_minutes} min</div>
                      )}
                      {activity.calories_burned && (
                        <div className="text-xs text-primary">{activity.calories_burned} cal</div>
                      )}
                    </div>
                    <button 
                      onClick={() => deleteActivity(activity.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SubpageLayout>
    </>
  );
};

export default Health;

import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Plus, Dumbbell, Timer, Flame, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface WorkoutPlan {
  id: string;
  title: string;
  description: string | null;
  workout_date: string | null;
  workout_type: string | null;
  duration_minutes: number | null;
  completed: boolean;
}

const workoutTypes = [
  { type: "strength", label: "Strength", color: "bg-red-500" },
  { type: "cardio", label: "Cardio", color: "bg-blue-500" },
  { type: "flexibility", label: "Flexibility", color: "bg-green-500" },
  { type: "hiit", label: "HIIT", color: "bg-orange-500" },
];

const WorkoutPlanner = () => {
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user) fetchWorkouts();
  }, [user]);

  const fetchWorkouts = async () => {
    const { data, error } = await supabase
      .from('workout_plans')
      .select('*')
      .order('workout_date', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setWorkouts(data || []);
    }
    setLoading(false);
  };

  const addWorkout = async (workoutType: string) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('workout_plans')
      .insert({
        user_id: user.id,
        workout_date: today,
        workout_type: workoutType,
        title: `${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Workout`,
        duration_minutes: 45,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setWorkouts([data, ...workouts]);
      toast({ title: "Workout added!" });
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from('workout_plans')
      .update({ completed: !completed })
      .eq('id', id);

    if (!error) {
      setWorkouts(workouts.map(w => w.id === id ? { ...w, completed: !completed } : w));
    }
  };

  return (
    <>
      <Helmet>
        <title>Workout Planner - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Workout Planner" 
        subtitle="Plan your fitness journey"
        breadcrumbs={[{ label: "Planners", href: "/planners/workout" }, { label: "Workout", href: "/planners/workout" }]}
      >
        {/* Quick Add */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {workoutTypes.map((wt) => (
            <button
              key={wt.type}
              onClick={() => addWorkout(wt.type)}
              className="bg-card/30 rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-all flex items-center gap-3"
            >
              <div className={`w-3 h-3 rounded-full ${wt.color}`} />
              <span className="text-foreground">{wt.label}</span>
              <Plus className="w-4 h-4 text-muted-foreground ml-auto" />
            </button>
          ))}
        </div>

        {/* Workouts List */}
        <div className="bg-card/30 rounded-2xl border border-border/50 p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Workouts</h3>
          
          {loading ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : workouts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Dumbbell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No workouts planned yet</p>
              <p className="text-sm">Click a workout type above to add one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workouts.map((workout) => (
                <div 
                  key={workout.id}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
                >
                  <Dumbbell className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{workout.title}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="capitalize">{workout.workout_type}</span>
                      {workout.duration_minutes && (
                        <span className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {workout.duration_minutes} min
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleComplete(workout.id, workout.completed)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      workout.completed ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {workout.completed && <Check className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SubpageLayout>
    </>
  );
};

export default WorkoutPlanner;

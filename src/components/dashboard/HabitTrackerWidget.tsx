import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Dumbbell, BookOpen, Wind, Snowflake, Footprints, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  completed: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  "🏋️": Dumbbell,
  "🧘": Wind,
  "📚": BookOpen,
  "🏃": Footprints,
  "🧊": Snowflake,
};

const HabitTrackerWidget = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const fetchHabits = async () => {
    if (!user) return;
    
    try {
      // Fetch habits
      const { data: habitsData, error: habitsError } = await supabase
        .from("habits")
        .select("id, name, emoji")
        .eq("user_id", user.id)
        .limit(5);

      if (habitsError) throw habitsError;

      // Fetch today's completions
      const { data: completionsData, error: completionsError } = await supabase
        .from("habit_completions")
        .select("habit_id")
        .eq("user_id", user.id)
        .eq("completed_date", today);

      if (completionsError) throw completionsError;

      const completedIds = new Set(completionsData?.map(c => c.habit_id) || []);
      
      const habitsWithStatus = (habitsData || []).map(habit => ({
        ...habit,
        completed: completedIds.has(habit.id),
      }));

      setHabits(habitsWithStatus);
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId: string, currentlyCompleted: boolean) => {
    if (!user) return;

    try {
      if (currentlyCompleted) {
        // Remove completion
        await supabase
          .from("habit_completions")
          .delete()
          .eq("habit_id", habitId)
          .eq("user_id", user.id)
          .eq("completed_date", today);
      } else {
        // Add completion
        await supabase
          .from("habit_completions")
          .insert({
            habit_id: habitId,
            user_id: user.id,
            completed_date: today,
          });
      }

      setHabits(habits.map(h => 
        h.id === habitId ? { ...h, completed: !currentlyCompleted } : h
      ));
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  };

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <div className="bg-card/30 rounded-lg sm:rounded-xl border border-border/50 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground">Habits</h4>
        <Link to="/daily/habits" className="text-muted-foreground hover:text-primary">
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>

      <div className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
        {completedCount}/{habits.length} done
      </div>

      {loading ? (
        <div className="space-y-1.5 sm:space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-7 sm:h-8 bg-muted/30 rounded animate-pulse" />
          ))}
        </div>
      ) : habits.length === 0 ? (
        <div className="text-center py-3 sm:py-4 text-muted-foreground text-xs sm:text-sm">
          <p>No habits</p>
          <Link to="/daily/habits" className="text-primary hover:underline">Add</Link>
        </div>
      ) : (
        <div className="space-y-1.5 sm:space-y-2">
          {habits.slice(0, 4).map((habit) => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id, habit.completed)}
              className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all ${
                habit.completed 
                  ? "bg-primary/20 border border-primary/30" 
                  : "bg-muted/30 border border-transparent hover:border-border/50"
              }`}
            >
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                habit.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {habit.completed ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <span className="text-[10px] sm:text-xs">{habit.emoji}</span>}
              </div>
              <span className={`text-xs sm:text-sm truncate ${habit.completed ? "text-primary line-through" : "text-foreground"}`}>
                {habit.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitTrackerWidget;

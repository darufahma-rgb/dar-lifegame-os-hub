import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Flame, Check, Plus, Trophy, Zap, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  streak: number;
  best_streak: number;
  category: string | null;
}

interface HabitCompletion {
  id: string;
  habit_id: string;
  completed_date: string;
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [newHabit, setNewHabit] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchHabits();
      fetchCompletions();
    }
  }, [user]);

  const fetchHabits = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (!error) setHabits(data || []);
    setLoading(false);
  };

  const fetchCompletions = async () => {
    // Get last 7 days of completions
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const { data } = await supabase
      .from('habit_completions')
      .select('*')
      .gte('completed_date', weekAgo.toISOString().split('T')[0]);
    
    setCompletions(data || []);
  };

  const addHabit = async () => {
    if (!user || !newHabit.trim()) return;
    
    const { data, error } = await supabase
      .from('habits')
      .insert({
        user_id: user.id,
        name: newHabit,
        emoji: '✅',
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setHabits([...habits, data]);
      setNewHabit("");
      toast({ title: "Habit added!" });
    }
  };

  const toggleCompletion = async (habitId: string, date: string) => {
    if (!user) return;
    
    const existing = completions.find(c => c.habit_id === habitId && c.completed_date === date);
    
    if (existing) {
      await supabase.from('habit_completions').delete().eq('id', existing.id);
      setCompletions(completions.filter(c => c.id !== existing.id));
    } else {
      const { data } = await supabase
        .from('habit_completions')
        .insert({ habit_id: habitId, user_id: user.id, completed_date: date })
        .select()
        .single();
      
      if (data) setCompletions([...completions, data]);
    }
  };

  const deleteHabit = async (id: string) => {
    await supabase.from('habits').delete().eq('id', id);
    setHabits(habits.filter(h => h.id !== id));
    toast({ title: "Habit deleted" });
  };

  const getWeekDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const isCompleted = (habitId: string, date: string) => {
    return completions.some(c => c.habit_id === habitId && c.completed_date === date);
  };

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <>
      <Helmet>
        <title>Habits Tracker - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Habits Tracker" 
        subtitle="Build power-ups for your life"
        breadcrumbs={[{ label: "Daily", href: "/daily/habits" }, { label: "Habits", href: "/daily/habits" }]}
      >
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card/30 rounded-xl border border-border/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Total Streak</span>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">{totalStreak}</div>
          </div>
          <div className="bg-card/30 rounded-xl border border-border/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm">Active Habits</span>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">{habits.length}</div>
          </div>
          <div className="bg-card/30 rounded-xl border border-border/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Check className="w-5 h-5 text-neon-green" />
              <span className="text-sm">Today Done</span>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">
              {completions.filter(c => c.completed_date === weekDates[6]).length}/{habits.length}
            </div>
          </div>
          <div className="bg-card/30 rounded-xl border border-border/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm">Best Streak</span>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">
              {Math.max(...habits.map(h => h.best_streak), 0)}
            </div>
          </div>
        </div>

        {/* Add Habit */}
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Add a new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            className="bg-muted/50"
          />
          <Button variant="outline" onClick={addHabit}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Habits Grid */}
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : habits.length === 0 ? (
          <div className="bg-card/30 rounded-2xl border border-border/50 p-12 text-center">
            <Zap className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No habits yet. Add one above!</p>
          </div>
        ) : (
          <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-border/50 text-xs text-muted-foreground">
              <div className="col-span-5">Habit</div>
              {weekDays.map((day, idx) => (
                <div key={day} className={`col-span-1 text-center ${idx === 6 ? "text-primary" : ""}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Habits */}
            <div className="divide-y divide-border/30">
              {habits.map((habit) => (
                <div 
                  key={habit.id}
                  className="grid grid-cols-12 gap-2 px-4 py-4 hover:bg-muted/20 transition-colors items-center group"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <span className="text-2xl">{habit.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{habit.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{habit.streak} day streak</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteHabit(habit.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {weekDates.map((date, dayIdx) => (
                    <div key={date} className="col-span-1 flex justify-center">
                      <button
                        onClick={() => toggleCompletion(habit.id, date)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          isCompleted(habit.id, date)
                            ? "bg-primary/20 border-2 border-primary text-primary" 
                            : "bg-muted/50 border-2 border-transparent text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {isCompleted(habit.id, date) && <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </SubpageLayout>
    </>
  );
};

export default Habits;

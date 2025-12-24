import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState } from "react";
import { Flame, Check, X, Plus, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  streak: number;
  weeklyProgress: boolean[];
  category: string;
}

const mockHabits: Habit[] = [
  { id: "1", name: "Morning Exercise", emoji: "🏃", streak: 14, weeklyProgress: [true, true, true, true, true, false, false], category: "Health" },
  { id: "2", name: "Read 30 mins", emoji: "📚", streak: 21, weeklyProgress: [true, true, true, true, true, true, false], category: "Growth" },
  { id: "3", name: "Meditate", emoji: "🧘", streak: 7, weeklyProgress: [true, true, false, true, true, false, false], category: "Mind" },
  { id: "4", name: "Drink 8 glasses water", emoji: "💧", streak: 30, weeklyProgress: [true, true, true, true, true, true, true], category: "Health" },
  { id: "5", name: "No social media before 12pm", emoji: "📵", streak: 5, weeklyProgress: [true, true, true, false, true, false, false], category: "Focus" },
  { id: "6", name: "Journal before bed", emoji: "📝", streak: 10, weeklyProgress: [true, true, true, true, true, true, false], category: "Mind" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Habits = () => {
  const [habits, setHabits] = useState(mockHabits);

  const toggleDay = (habitId: string, dayIndex: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newProgress = [...habit.weeklyProgress];
        newProgress[dayIndex] = !newProgress[dayIndex];
        return { ...habit, weeklyProgress: newProgress };
      }
      return habit;
    }));
  };

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <>
      <Helmet>
        <title>Habits Tracker - Dar Lifegame OS</title>
        <meta name="description" content="Build and track your daily habits with Dar Lifegame OS Habit Tracker." />
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
              {habits.filter(h => h.weeklyProgress[4]).length}/{habits.length}
            </div>
          </div>
          <div className="bg-card/30 rounded-xl border border-border/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm">Best Streak</span>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">
              {Math.max(...habits.map(h => h.streak))}
            </div>
          </div>
        </div>

        {/* Habits Grid */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">This Week</h3>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4" />
            New Habit
          </Button>
        </div>

        <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-border/50 text-xs text-muted-foreground">
            <div className="col-span-5">Habit</div>
            {weekDays.map((day, idx) => (
              <div key={day} className={`col-span-1 text-center ${idx === 4 ? "text-primary" : ""}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Habits */}
          <div className="divide-y divide-border/30">
            {habits.map((habit) => (
              <div 
                key={habit.id}
                className="grid grid-cols-12 gap-2 px-4 py-4 hover:bg-muted/20 transition-colors items-center"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <span className="text-2xl">{habit.emoji}</span>
                  <div>
                    <div className="font-medium text-foreground">{habit.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span>{habit.streak} day streak</span>
                    </div>
                  </div>
                </div>
                {habit.weeklyProgress.map((done, dayIdx) => (
                  <div key={dayIdx} className="col-span-1 flex justify-center">
                    <button
                      onClick={() => toggleDay(habit.id, dayIdx)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        done 
                          ? "bg-primary/20 border-2 border-primary text-primary" 
                          : "bg-muted/50 border-2 border-transparent text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {done ? <Check className="w-4 h-4" /> : ""}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </SubpageLayout>
    </>
  );
};

export default Habits;

import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Target, Plus, Calendar, CheckCircle2, Circle, TrendingUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  target_date: string | null;
  category: string | null;
  category_color: string;
  status: string;
}

interface Milestone {
  id: string;
  goal_id: string;
  title: string;
  completed: boolean;
}

const GoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGoal, setNewGoal] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchGoals();
      fetchMilestones();
    }
  }, [user]);

  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setGoals(data || []);
    setLoading(false);
  };

  const fetchMilestones = async () => {
    const { data } = await supabase
      .from('goal_milestones')
      .select('*')
      .order('sort_order', { ascending: true });
    
    setMilestones(data || []);
  };

  const addGoal = async () => {
    if (!user || !newGoal.trim()) return;
    
    const { data, error } = await supabase
      .from('goals')
      .insert({
        user_id: user.id,
        title: newGoal,
        progress: 0,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setGoals([data, ...goals]);
      setNewGoal("");
      toast({ title: "Goal added!" });
    }
  };

  const deleteGoal = async (id: string) => {
    await supabase.from('goals').delete().eq('id', id);
    setGoals(goals.filter(g => g.id !== id));
    toast({ title: "Goal deleted" });
  };

  const toggleMilestone = async (id: string, completed: boolean) => {
    await supabase
      .from('goal_milestones')
      .update({ completed: !completed, completed_at: !completed ? new Date().toISOString() : null })
      .eq('id', id);
    
    setMilestones(milestones.map(m => m.id === id ? { ...m, completed: !completed } : m));
  };

  return (
    <>
      <Helmet>
        <title>Goals - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Goals" 
        subtitle="Your main quests and objectives"
        breadcrumbs={[{ label: "Goals", href: "/goals/list" }, { label: "List", href: "/goals/list" }]}
      >
        {/* Add Goal */}
        <div className="flex gap-3 mb-8">
          <Input
            placeholder="Add a new goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
            className="bg-muted/50"
          />
          <Button variant="hero" onClick={addGoal}>
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {/* Goals */}
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : goals.length === 0 ? (
          <div className="bg-card/30 rounded-2xl border border-border/50 p-12 text-center">
            <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No goals yet. Add one above!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const goalMilestones = milestones.filter(m => m.goal_id === goal.id);
              const completedMilestones = goalMilestones.filter(m => m.completed).length;
              const progress = goalMilestones.length > 0 
                ? Math.round((completedMilestones / goalMilestones.length) * 100)
                : goal.progress;

              return (
                <div 
                  key={goal.id}
                  className="bg-card/30 rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${goal.category_color}`} />
                      <span className="text-sm text-muted-foreground">{goal.category || "General"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {goal.target_date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(goal.target_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      <button 
                        onClick={() => deleteGoal(goal.id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {goal.title}
                  </h3>
                  {goal.description && (
                    <p className="text-muted-foreground mb-6">{goal.description}</p>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium text-primary">{progress}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-neon-purple rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  {goalMilestones.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Milestones
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {goalMilestones.map((milestone) => (
                          <button 
                            key={milestone.id}
                            onClick={() => toggleMilestone(milestone.id, milestone.completed)}
                            className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                          >
                            {milestone.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                            <span className={`text-sm ${milestone.completed ? "text-foreground" : "text-muted-foreground"}`}>
                              {milestone.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SubpageLayout>
    </>
  );
};

export default GoalsList;

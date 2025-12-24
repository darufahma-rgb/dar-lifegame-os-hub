import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Plus, Calendar, Clock, CheckCircle2, Circle, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  due_time: string | null;
  priority: string;
  completed: boolean;
}

const DailyPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const addTask = async () => {
    if (!user || !newTask.trim()) return;
    
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title: newTask,
        priority: 'medium',
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setTasks([data, ...tasks]);
      setNewTask("");
      toast({ title: "Task added!" });
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from('tasks')
      .update({ 
        completed: !completed,
        completed_at: !completed ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (!error) {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !completed } : task
      ));
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (!error) {
      setTasks(tasks.filter(t => t.id !== id));
      toast({ title: "Task deleted" });
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const priorityColors: Record<string, string> = {
    high: "bg-pink-500/20 text-pink-400",
    medium: "bg-amber-500/20 text-amber-400",
    low: "bg-blue-500/20 text-blue-400",
  };

  return (
    <>
      <Helmet>
        <title>Daily Planner - Dar Lifegame OS</title>
        <meta name="description" content="Plan your daily tasks and activities with Dar Lifegame OS Daily Planner." />
      </Helmet>

      <SubpageLayout 
        title="Daily Planner" 
        subtitle="Plan your day like a boss"
        breadcrumbs={[{ label: "Daily", href: "/daily/planner" }, { label: "Planner", href: "/daily/planner" }]}
      >
        {/* Today's Date & Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-lg font-medium text-foreground">{today}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Progress:</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-neon-purple rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-foreground font-medium">{completedCount}/{tasks.length}</span>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="bg-muted/50"
          />
          <Button variant="hero" onClick={addTask}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {/* Tasks */}
        <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
          {loading ? (
            <div className="p-6 text-muted-foreground">Loading...</div>
          ) : tasks.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors group"
                >
                  <button
                    onClick={() => toggleTask(task.id, task.completed)}
                    className="flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      {task.due_time && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {task.due_time}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
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

export default DailyPlanner;

import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState } from "react";
import { Plus, Calendar, Clock, CheckCircle2, Circle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  time?: string;
  completed: boolean;
  category: string;
  categoryColor: string;
}

const mockTasks: Task[] = [
  { id: "1", title: "Morning Workout", time: "06:00", completed: true, category: "Health", categoryColor: "bg-pink-500" },
  { id: "2", title: "Team Standup Meeting", time: "09:00", completed: true, category: "Work", categoryColor: "bg-purple-500" },
  { id: "3", title: "Review Project Docs", time: "10:00", completed: false, category: "Work", categoryColor: "bg-purple-500" },
  { id: "4", title: "Lunch with Client", time: "12:30", completed: false, category: "Work", categoryColor: "bg-purple-500" },
  { id: "5", title: "Write Blog Post", time: "14:00", completed: false, category: "Content", categoryColor: "bg-cyan-500" },
  { id: "6", title: "Grocery Shopping", time: "17:00", completed: false, category: "Life", categoryColor: "bg-amber-500" },
  { id: "7", title: "Evening Walk", time: "18:30", completed: false, category: "Health", categoryColor: "bg-pink-500" },
];

const DailyPlanner = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

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
            <Button variant="hero" size="sm">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
          <div className="divide-y divide-border/30">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors group"
              >
                <button
                  onClick={() => toggleTask(task.id)}
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
                    {task.time && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {task.time}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs">
                      <span className={`w-2 h-2 rounded-full ${task.categoryColor}`} />
                      <span className="text-muted-foreground">{task.category}</span>
                    </span>
                  </div>
                </div>

                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border/30">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <Plus className="w-4 h-4" />
              Add new task
            </button>
          </div>
        </div>
      </SubpageLayout>
    </>
  );
};

export default DailyPlanner;

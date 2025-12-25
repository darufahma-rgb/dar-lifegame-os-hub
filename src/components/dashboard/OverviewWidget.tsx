import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ClipboardList, Pencil, Smile, Dumbbell, CalendarDays, Plus, MoreHorizontal, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  due_date: string | null;
  priority: string | null;
  completed: boolean | null;
  categories: { name: string; color: string } | null;
}

const tabs = [
  { icon: ClipboardList, label: "Todo", active: true },
  { icon: Pencil, label: "Journal" },
  { icon: Smile, label: "Habits" },
  { icon: Dumbbell, label: "Workout" },
  { icon: CalendarDays, label: "Meal" },
];

const OverviewWidget = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Todo");

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select(`
          id, title, due_date, priority, completed,
          categories (name, color)
        `)
        .eq("user_id", user.id)
        .order("due_date", { ascending: true })
        .limit(8);

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: string, completed: boolean | null) => {
    if (!user) return;

    try {
      await supabase
        .from("tasks")
        .update({ 
          completed: !completed,
          completed_at: !completed ? new Date().toISOString() : null
        })
        .eq("id", taskId);

      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, completed: !completed } : t
      ));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const getCategoryColor = (color: string | null | undefined) => {
    if (!color) return "bg-purple-500";
    if (color.startsWith("bg-")) return color;
    return `bg-${color}-500`;
  };

  return (
    <section>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-muted-foreground">—</span> Overview
      </h3>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.label
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
        <button className="text-muted-foreground hover:text-foreground px-2 py-1.5 text-sm">
          3 more...
        </button>
      </div>

      {/* Task Table */}
      <div className="bg-card/30 rounded-xl border border-border/50 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border/50 text-xs text-muted-foreground">
          <div className="col-span-1"></div>
          <div className="col-span-4">Task Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-3">Due Date</div>
          <div className="col-span-1">Priority</div>
        </div>

        {/* Tasks */}
        {loading ? (
          <div className="divide-y divide-border/30">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3">
                <div className="col-span-1"><div className="w-5 h-5 bg-muted/30 rounded animate-pulse" /></div>
                <div className="col-span-4"><div className="h-4 bg-muted/30 rounded animate-pulse" /></div>
                <div className="col-span-3"><div className="h-4 bg-muted/30 rounded animate-pulse w-20" /></div>
                <div className="col-span-3"><div className="h-4 bg-muted/30 rounded animate-pulse" /></div>
                <div className="col-span-1"><div className="h-4 bg-muted/30 rounded animate-pulse w-10" /></div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No tasks yet</p>
            <Link to="/daily/planner" className="text-primary hover:underline text-sm">
              Create your first task
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-muted/20 transition-colors items-center text-sm"
              >
                <div className="col-span-1">
                  <button
                    onClick={() => toggleTask(task.id, task.completed)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.completed 
                        ? "bg-primary border-primary" 
                        : "border-muted-foreground/50 hover:border-primary"
                    }`}
                  >
                    {task.completed && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </button>
                </div>
                <div className={`col-span-4 ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getCategoryColor(task.categories?.color)}`} />
                  <span className="text-muted-foreground">{task.categories?.name || "Uncategorized"}</span>
                </div>
                <div className="col-span-3 text-muted-foreground">
                  {formatDate(task.due_date)}
                </div>
                <div className="col-span-1">
                  {task.priority === "high" && (
                    <span className="px-2 py-0.5 rounded text-xs bg-pink-500/20 text-pink-400">
                      High
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border/50">
          <Link 
            to="/daily/planner"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm"
          >
            <MoreHorizontal className="w-4 h-4" />
            View all tasks
          </Link>
          <Link 
            to="/daily/planner"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mt-2"
          >
            <Plus className="w-4 h-4" />
            New task
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OverviewWidget;

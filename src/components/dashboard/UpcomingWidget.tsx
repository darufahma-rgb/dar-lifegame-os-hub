import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, isTomorrow, addDays, isBefore } from "date-fns";
import { ChevronRight, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  due_date: string | null;
  priority: string | null;
  completed: boolean | null;
}

interface GroupedTasks {
  today: Task[];
  tomorrow: Task[];
  next7Days: Task[];
}

const UpcomingWidget = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<GroupedTasks>({ today: [], tomorrow: [], next7Days: [] });
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    today: true,
    tomorrow: true,
    next7Days: true,
  });

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const today = new Date();
      const next7Days = addDays(today, 7);

      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, due_date, priority, completed")
        .eq("user_id", user.id)
        .eq("completed", false)
        .gte("due_date", format(today, "yyyy-MM-dd"))
        .lte("due_date", format(next7Days, "yyyy-MM-dd"))
        .order("due_date", { ascending: true });

      if (error) throw error;

      const grouped: GroupedTasks = { today: [], tomorrow: [], next7Days: [] };
      
      (data || []).forEach(task => {
        if (!task.due_date) return;
        const dueDate = new Date(task.due_date);
        
        if (isToday(dueDate)) {
          grouped.today.push(task);
        } else if (isTomorrow(dueDate)) {
          grouped.tomorrow.push(task);
        } else {
          grouped.next7Days.push(task);
        }
      });

      setTasks(grouped);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: string) => {
    if (!user) return;

    try {
      await supabase
        .from("tasks")
        .update({ completed: true, completed_at: new Date().toISOString() })
        .eq("id", taskId);

      // Remove from local state
      setTasks({
        today: tasks.today.filter(t => t.id !== taskId),
        tomorrow: tasks.tomorrow.filter(t => t.id !== taskId),
        next7Days: tasks.next7Days.filter(t => t.id !== taskId),
      });
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const renderGroup = (label: string, groupKey: keyof GroupedTasks, taskList: Task[]) => {
    if (taskList.length === 0) return null;
    
    return (
      <div key={groupKey} className="mb-4">
        <button
          onClick={() => toggleGroup(groupKey)}
          className="flex items-center gap-2 mb-2 w-full text-left"
        >
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedGroups[groupKey] ? "rotate-90" : ""}`} />
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground">{taskList.length}</span>
        </button>

        {expandedGroups[groupKey] && (
          <div className="space-y-1 pl-6">
            {taskList.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between py-1.5 hover:bg-muted/20 rounded px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="w-4 h-4 rounded border-2 border-muted-foreground/50 hover:border-primary flex items-center justify-center flex-shrink-0"
                  />
                  <span className="text-sm text-foreground truncate">{task.title}</span>
                </div>
                {task.priority === "high" && (
                  <span className="px-2 py-0.5 rounded text-xs bg-pink-500/20 text-pink-400">
                    High
                  </span>
                )}
              </div>
            ))}
            <Link 
              to="/daily/planner"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm py-1"
            >
              <Plus className="w-4 h-4" />
              New
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card/30 rounded-lg sm:rounded-xl border border-border/50 p-3 sm:p-4 h-full">
      <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
        <span className="text-muted-foreground">—</span> Upcoming
      </h3>

      <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
        <span>All</span>
      </div>

      {loading ? (
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-3 sm:h-4 w-16 sm:w-20 bg-muted/30 rounded animate-pulse" />
              <div className="h-5 sm:h-6 bg-muted/30 rounded animate-pulse" />
              <div className="h-5 sm:h-6 bg-muted/30 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-h-64 sm:max-h-none overflow-y-auto">
          {renderGroup("Today", "today", tasks.today)}
          {renderGroup("Tomorrow", "tomorrow", tasks.tomorrow)}
          {renderGroup("Next 7 days", "next7Days", tasks.next7Days)}
          
          {tasks.today.length === 0 && tasks.tomorrow.length === 0 && tasks.next7Days.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-muted-foreground">
              <p className="text-xs sm:text-sm">No upcoming tasks</p>
              <Link to="/daily/planner" className="text-primary hover:underline text-xs sm:text-sm">
                Add a task
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingWidget;

import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Pencil, Smile, Dumbbell, CalendarDays, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

const mockTasks: Task[] = [
  { id: "1", name: "Write blog post", category: "Work", categoryColor: "bg-purple-500", dueDate: "January 26, 2024", priority: "High", completed: false },
  { id: "2", name: "Write blog post", category: "Work", categoryColor: "bg-purple-500", dueDate: "January 27, 2024", priority: "High", completed: false },
  { id: "3", name: "Meet Carl", category: "Life", categoryColor: "bg-cyan-500", dueDate: "January 27, 2024", priority: "Medium", completed: false },
  { id: "4", name: "Edit Photo", category: "Work", categoryColor: "bg-purple-500", dueDate: "January 28, 2024", priority: "Medium", completed: false },
  { id: "5", name: "Write blog post", category: "Work", categoryColor: "bg-purple-500", dueDate: "January 28, 2024", priority: "High", completed: false },
  { id: "6", name: "Edit Website", category: "Work", categoryColor: "bg-purple-500", dueDate: "February 12, 2024", priority: "High", completed: false },
  { id: "7", name: "Create Social Content", category: "Life", categoryColor: "bg-cyan-500", dueDate: "February 13, 2024", priority: "Medium", completed: false },
  { id: "8", name: "Run", category: "Health", categoryColor: "bg-pink-500", dueDate: "February 14, 2024", priority: "Low", completed: false },
];

const tabs = [
  { icon: ClipboardList, label: "Todo", active: true },
  { icon: Pencil, label: "Journal", active: false },
  { icon: Smile, label: "Habits", active: false },
  { icon: Dumbbell, label: "Workout", active: false },
  { icon: CalendarDays, label: "Meal", active: false },
];

const OverviewSection = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTab, setActiveTab] = useState("Todo");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <section className="py-8">
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
          <div className="col-span-4">As Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-3">Due Date</div>
          <div className="col-span-1">Priority</div>
        </div>

        {/* Tasks */}
        <div className="divide-y divide-border/30">
          {tasks.slice(0, 8).map((task) => (
            <div 
              key={task.id}
              className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-muted/20 transition-colors items-center text-sm"
            >
              <div className="col-span-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? "bg-primary border-primary" 
                      : "border-muted-foreground/50 hover:border-primary"
                  }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
              <div className={`col-span-4 ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.name}
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${task.categoryColor}`} />
                <span className="text-muted-foreground">{task.category}</span>
              </div>
              <div className="col-span-3 text-muted-foreground">
                {task.dueDate}
              </div>
              <div className="col-span-1">
                {task.priority === "High" && (
                  <span className="px-2 py-0.5 rounded text-xs bg-pink-500/20 text-pink-400">
                    High
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border/50">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <MoreHorizontal className="w-4 h-4" />
            Load more
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mt-2">
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;

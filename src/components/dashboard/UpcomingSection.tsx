import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface UpcomingTask {
  id: string;
  name: string;
  priority?: "High" | "Medium" | "Low";
}

interface UpcomingGroup {
  label: string;
  count: number;
  tasks: UpcomingTask[];
}

const upcomingGroups: UpcomingGroup[] = [
  {
    label: "Today",
    count: 2,
    tasks: [
      { id: "1", name: "Edit Website", priority: "High" },
      { id: "2", name: "Write copy", priority: "High" },
    ],
  },
  {
    label: "Tomorrow",
    count: 2,
    tasks: [
      { id: "3", name: "Edit Photo" },
      { id: "4", name: "Write blog post", priority: "High" },
    ],
  },
  {
    label: "Next 7 days",
    count: 7,
    tasks: [
      { id: "5", name: "Run" },
      { id: "6", name: "Edit Website", priority: "High" },
      { id: "7", name: "Record video", priority: "High" },
      { id: "8", name: "Create Social Content" },
      { id: "9", name: "Call Repairman" },
      { id: "10", name: "Edit Photo" },
      { id: "11", name: "Manage Finance" },
    ],
  },
];

const UpcomingSection = () => {
  return (
    <section className="py-8">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-muted-foreground">—</span> Upcoming
      </h3>

      <div className="bg-card/30 rounded-xl border border-border/50 p-4">
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <span>All</span>
        </div>

        <div className="space-y-6">
          {upcomingGroups.map((group, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{group.label}</span>
                <span className="text-xs text-muted-foreground">{group.count}</span>
              </div>

              <div className="space-y-1 pl-6">
                {group.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between py-1.5 hover:bg-muted/20 rounded px-2 -mx-2 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-muted-foreground/50" />
                      <span className="text-sm text-foreground">{task.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.priority === "High" && (
                        <span className="px-2 py-0.5 rounded text-xs bg-pink-500/20 text-pink-400">
                          High
                        </span>
                      )}
                      <div className="w-4 h-4 rounded border border-muted-foreground/30" />
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm py-1">
                  <Plus className="w-4 h-4" />
                  New
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border/30">
          <button className="text-sm text-muted-foreground hover:text-foreground">
            2 hidden groups
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;

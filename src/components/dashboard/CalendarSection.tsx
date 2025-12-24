import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ClipboardList, Pencil, Smile, Dumbbell, CalendarDays } from "lucide-react";

const tabs = [
  { icon: ClipboardList, label: "Todo", active: true },
  { icon: Pencil, label: "Journal", active: false },
  { icon: Smile, label: "Habits", active: false },
  { icon: Dumbbell, label: "Workout", active: false },
  { icon: CalendarDays, label: "Meal", active: false },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarEvent {
  title: string;
  category: string;
  categoryColor: string;
  priority?: "High" | "Medium" | "Low";
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

// Generate mock calendar data
const generateCalendarDays = (): CalendarDay[] => {
  const days: CalendarDay[] = [];
  
  // Previous month days
  for (let i = 29; i <= 31; i++) {
    days.push({ day: i, isCurrentMonth: false, events: [] });
  }
  
  // Current month days
  for (let i = 1; i <= 29; i++) {
    const events: CalendarEvent[] = [];
    
    if (i === 12) {
      events.push({ title: "Edit", category: "Work", categoryColor: "bg-purple-500", priority: "High" });
    }
    if (i === 13) {
      events.push({ title: "Create", category: "Life", categoryColor: "bg-cyan-500" });
    }
    if (i === 14) {
      events.push({ title: "Run", category: "Health", categoryColor: "bg-pink-500" });
    }
    if (i === 19) {
      events.push({ title: "Edit", category: "Work", categoryColor: "bg-purple-500", priority: "High" });
      events.push({ title: "Edit Photo", category: "Work", categoryColor: "bg-purple-500" });
    }
    if (i === 20) {
      events.push({ title: "Create", category: "Life", categoryColor: "bg-cyan-500" });
      events.push({ title: "Write blog", category: "Work", categoryColor: "bg-purple-500" });
    }
    if (i === 21) {
      events.push({ title: "Call", category: "Home", categoryColor: "bg-amber-500" });
    }
    if (i === 22) {
      events.push({ title: "Edit", category: "Personal", categoryColor: "bg-blue-500" });
    }
    if (i === 23) {
      events.push({ title: "Run", category: "Health", categoryColor: "bg-pink-500" });
    }
    if (i === 26) {
      events.push({ title: "Record", category: "Work", categoryColor: "bg-purple-500", priority: "High" });
      events.push({ title: "Write copy", category: "Work", categoryColor: "bg-purple-500" });
    }
    if (i === 27) {
      events.push({ title: "Go", category: "Health", categoryColor: "bg-pink-500" });
    }
    if (i === 28) {
      events.push({ title: "Create", category: "Life", categoryColor: "bg-cyan-500", priority: "High" });
    }
    
    days.push({ day: i, isCurrentMonth: true, events });
  }
  
  // Next month days
  for (let i = 1; i <= 3; i++) {
    days.push({ day: i, isCurrentMonth: false, events: [] });
  }
  
  return days;
};

const CalendarSection = () => {
  const [currentMonth] = useState("February 2024");
  const [activeTab, setActiveTab] = useState("Todo");
  const calendarDays = generateCalendarDays();

  return (
    <section className="py-8">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-muted-foreground">—</span> Calendar
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
          2 more...
        </button>
      </div>

      <div className="bg-card/30 rounded-xl border border-border/50 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <span className="font-medium text-foreground">{currentMonth}</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted/50">
              <ExternalLink className="w-4 h-4" />
              Open in Calendar
            </button>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground px-2">
                Today
              </button>
              <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => (
              <div
                key={idx}
                className={`min-h-[80px] p-1 rounded-lg border transition-colors ${
                  day.isCurrentMonth
                    ? "border-border/30 hover:border-border/60"
                    : "border-transparent"
                } ${day.day === 19 && day.isCurrentMonth ? "bg-pink-500/10 border-pink-500/30" : ""}`}
              >
                <div className={`text-xs mb-1 ${
                  day.isCurrentMonth ? "text-foreground" : "text-muted-foreground/50"
                } ${day.day === 1 && day.isCurrentMonth ? "text-primary" : ""}`}>
                  {day.day === 1 && day.isCurrentMonth ? "Feb 1" : day.day}
                </div>
                <div className="space-y-0.5">
                  {day.events.slice(0, 2).map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className={`text-xs px-1 py-0.5 rounded truncate ${event.categoryColor}/20 text-foreground`}
                    >
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${event.categoryColor} mr-1`} />
                      {event.title}
                      {event.priority === "High" && (
                        <span className="ml-1 text-pink-400 text-[10px]">High</span>
                      )}
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-[10px] text-muted-foreground pl-1">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ClipboardList, Pencil, Smile, Dumbbell, CalendarDays } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isToday } from "date-fns";

interface CalendarEvent {
  title: string;
  category: string;
  categoryColor: string;
  priority?: string | null;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

const tabs = [
  { icon: ClipboardList, label: "Todo" },
  { icon: Pencil, label: "Journal" },
  { icon: Smile, label: "Habits" },
  { icon: Dumbbell, label: "Workout" },
  { icon: CalendarDays, label: "Meal" },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarWidget = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Todo");
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      generateCalendar();
    }
  }, [user, currentDate]);

  const generateCalendar = async () => {
    if (!user) return;

    try {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const startDay = getDay(monthStart);
      
      // Adjust for Monday start (0 = Monday, 6 = Sunday)
      const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;
      
      // Get all days in month
      const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
      
      // Fetch tasks for the month
      const { data: tasksData, error } = await supabase
        .from("tasks")
        .select(`
          id, title, due_date, priority,
          categories (name, color)
        `)
        .eq("user_id", user.id)
        .gte("due_date", format(monthStart, "yyyy-MM-dd"))
        .lte("due_date", format(monthEnd, "yyyy-MM-dd"));

      if (error) throw error;

      // Group tasks by date
      const tasksByDate: Record<string, CalendarEvent[]> = {};
      (tasksData || []).forEach(task => {
        if (!task.due_date) return;
        const dateKey = task.due_date;
        if (!tasksByDate[dateKey]) tasksByDate[dateKey] = [];
        tasksByDate[dateKey].push({
          title: task.title,
          category: task.categories?.name || "Work",
          categoryColor: task.categories?.color || "bg-purple-500",
          priority: task.priority,
        });
      });

      // Build calendar days
      const days: CalendarDay[] = [];
      
      // Add days from previous month
      const prevMonth = subMonths(monthStart, 1);
      const prevMonthEnd = endOfMonth(prevMonth);
      for (let i = adjustedStartDay - 1; i >= 0; i--) {
        const date = new Date(prevMonthEnd);
        date.setDate(prevMonthEnd.getDate() - i);
        days.push({ date, isCurrentMonth: false, events: [] });
      }
      
      // Add current month days
      daysInMonth.forEach(date => {
        const dateKey = format(date, "yyyy-MM-dd");
        days.push({
          date,
          isCurrentMonth: true,
          events: tasksByDate[dateKey] || [],
        });
      });
      
      // Add days from next month
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(monthEnd);
        date.setDate(monthEnd.getDate() + i);
        days.push({ date, isCurrentMonth: false, events: [] });
      }

      setCalendarDays(days);
    } catch (error) {
      console.error("Error generating calendar:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (color: string) => {
    if (color.startsWith("bg-")) return color;
    return `bg-${color}-500`;
  };

  return (
    <section className="mt-8">
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
          <span className="font-medium text-foreground">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted/50">
              <ExternalLink className="w-4 h-4" />
              Open
            </button>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="text-sm text-muted-foreground hover:text-foreground px-2"
              >
                Today
              </button>
              <button 
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              >
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
          {loading ? (
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, idx) => (
                <div key={idx} className="min-h-[80px] p-1 rounded-lg border border-border/30">
                  <div className="h-4 w-4 bg-muted/30 rounded animate-pulse mb-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                const dayIsToday = isToday(day.date);
                const hasHighPriority = day.events.some(e => e.priority === "high");
                
                return (
                  <div
                    key={idx}
                    className={`min-h-[80px] p-1 rounded-lg border transition-colors ${
                      day.isCurrentMonth
                        ? "border-border/30 hover:border-border/60"
                        : "border-transparent opacity-40"
                    } ${hasHighPriority ? "bg-pink-500/10 border-pink-500/30" : ""}`}
                  >
                    <div className={`text-xs mb-1 ${
                      day.isCurrentMonth ? "text-foreground" : "text-muted-foreground/50"
                    } ${dayIsToday ? "text-primary font-bold" : ""}`}>
                      {day.date.getDate() === 1 
                        ? format(day.date, "MMM d") 
                        : day.date.getDate()
                      }
                    </div>
                    <div className="space-y-0.5">
                      {day.events.slice(0, 2).map((event, eventIdx) => (
                        <div
                          key={eventIdx}
                          className="text-xs px-1 py-0.5 rounded truncate bg-muted/30 text-foreground"
                        >
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${getCategoryColor(event.categoryColor)} mr-1`} />
                          {event.title}
                          {event.priority === "high" && (
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarWidget;

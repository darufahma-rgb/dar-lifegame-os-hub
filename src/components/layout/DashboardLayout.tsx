import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Home, CalendarDays, ClipboardList, Heart, Target, BookOpen, Settings, ChevronRight } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: CalendarDays, label: "Daily", href: "/daily/planner" },
  { icon: ClipboardList, label: "Planners", href: "/planners/meal" },
  { icon: BookOpen, label: "Personal", href: "/personal/bookshelf" },
  { icon: Target, label: "Goals", href: "/goals/list" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 bg-card/50 border-r border-border/50 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary flex-shrink-0" />
            <span className="font-display text-lg font-bold tracking-wider text-gradient hidden md:block">
              DAR LIFEGAME OS
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 md:p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = item.href === "/" 
              ? location.pathname === "/" 
              : location.pathname.startsWith(item.href.split("/")[1] ? `/${item.href.split("/")[1]}` : item.href);
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden md:block text-sm font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden md:block" />}
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-2 md:p-4 border-t border-border/50">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden md:block text-sm font-medium">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-16 md:ml-64">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

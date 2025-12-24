import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

interface SubpageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href: string }[];
}

const SubpageLayout = ({ children, title, subtitle, breadcrumbs }: SubpageLayoutProps) => {
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/30">
          <div className="container px-4 md:px-8 py-6 max-w-7xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  <Link 
                    to={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Title */}
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container px-4 md:px-8 py-8 max-w-7xl">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubpageLayout;

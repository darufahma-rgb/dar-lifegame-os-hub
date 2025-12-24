import { Link } from "react-router-dom";
import { 
  CalendarDays, 
  ClipboardList, 
  Heart, 
  Target, 
  BookOpen, 
  Dumbbell,
  PiggyBank,
  Film,
  Compass,
  Smile,
  Map,
  Pencil
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

interface CategoryCardProps {
  title: string;
  image: string;
  items: { icon: React.ElementType; label: string; href: string }[];
  gradient: string;
}

const CategoryCard = ({ title, image, items, gradient }: CategoryCardProps) => (
  <div className="space-y-3">
    <Link 
      to={items[0]?.href || "#"}
      className="block relative h-32 rounded-xl overflow-hidden group cursor-pointer"
    >
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className={`absolute inset-0 ${gradient} opacity-60`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-display text-xl font-bold text-foreground tracking-wide">
          {title}
        </h3>
      </div>
      <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 rounded-xl transition-all duration-300" />
    </Link>
    <div className="space-y-1">
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.href}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-sm"
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  </div>
);

const categories = [
  {
    title: "Daily",
    image: dashboardHero,
    gradient: "bg-gradient-to-br from-purple-600/80 to-pink-600/80",
    items: [
      { icon: ClipboardList, label: "Planner", href: "/daily/planner" },
      { icon: Smile, label: "Habits", href: "/daily/habits" },
      { icon: Pencil, label: "Journal", href: "/daily/journal" },
    ],
  },
  {
    title: "Planners",
    image: dashboardHero,
    gradient: "bg-gradient-to-br from-blue-600/80 to-cyan-600/80",
    items: [
      { icon: CalendarDays, label: "Meal Planner", href: "/planners/meal" },
      { icon: Map, label: "Travel Planner", href: "/planners/travel" },
      { icon: Dumbbell, label: "Workout Planner", href: "/planners/workout" },
    ],
  },
  {
    title: "Personal",
    image: dashboardHero,
    gradient: "bg-gradient-to-br from-violet-600/80 to-purple-600/80",
    items: [
      { icon: BookOpen, label: "Bookshelf", href: "/personal/bookshelf" },
      { icon: Film, label: "Movies & Series", href: "/personal/movies" },
      { icon: PiggyBank, label: "Finance", href: "/personal/finance" },
    ],
  },
  {
    title: "Goals",
    image: dashboardHero,
    gradient: "bg-gradient-to-br from-pink-600/80 to-rose-600/80",
    items: [
      { icon: Target, label: "Goals", href: "/goals/list" },
      { icon: Compass, label: "Vision", href: "/goals/vision" },
      { icon: Heart, label: "Health", href: "/goals/health" },
    ],
  },
];

const DashboardNav = () => {
  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Life Planner</h2>
        <p className="text-muted-foreground text-sm mt-1 border-l-2 border-primary pl-3">
          All your thoughts in one private place.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, idx) => (
          <CategoryCard key={idx} {...category} />
        ))}
      </div>
    </section>
  );
};

export default DashboardNav;

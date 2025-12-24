import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Compass, Plus, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const visionAreas = [
  {
    title: "Career & Business",
    icon: "💼",
    vision: "Build a successful tech company that helps people achieve their goals through gamification.",
    timeframe: "5 years",
  },
  {
    title: "Health & Fitness",
    icon: "🏃",
    vision: "Maintain peak physical condition and complete an Ironman triathlon.",
    timeframe: "3 years",
  },
  {
    title: "Relationships",
    icon: "❤️",
    vision: "Build deep, meaningful relationships and be a pillar of support for family and friends.",
    timeframe: "Ongoing",
  },
  {
    title: "Financial Freedom",
    icon: "💰",
    vision: "Achieve financial independence with passive income covering all expenses.",
    timeframe: "10 years",
  },
  {
    title: "Personal Growth",
    icon: "🌱",
    vision: "Become a lifelong learner, master 3 languages, and read 500+ books.",
    timeframe: "Lifetime",
  },
  {
    title: "Impact & Legacy",
    icon: "🌍",
    vision: "Create positive change in the world and leave a lasting legacy for future generations.",
    timeframe: "Lifetime",
  },
];

const Vision = () => {
  return (
    <>
      <Helmet>
        <title>Vision Board - Dar Lifegame OS</title>
        <meta name="description" content="Define your life vision and long-term goals with Dar Lifegame OS." />
      </Helmet>

      <SubpageLayout 
        title="Vision Board" 
        subtitle="Your north star and life direction"
        breadcrumbs={[{ label: "Goals", href: "/goals/vision" }, { label: "Vision", href: "/goals/vision" }]}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Compass className="w-5 h-5 text-primary" />
            <span>Your life vision</span>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4" />
            Add Area
          </Button>
        </div>

        {/* Main Vision Statement */}
        <div className="bg-gradient-to-br from-primary/20 via-card/50 to-secondary/20 rounded-2xl border border-primary/30 p-8 mb-8 text-center">
          <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Life Mission Statement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            "To live an epic, meaningful life filled with growth, adventure, and positive impact. 
            To help others unlock their potential by gamifying personal development."
          </p>
        </div>

        {/* Vision Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visionAreas.map((area, idx) => (
            <div 
              key={idx}
              className="bg-card/30 rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{area.icon}</span>
                <span className="px-2 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs">
                  {area.timeframe}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {area.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {area.vision}
              </p>
            </div>
          ))}
        </div>

        {/* Add New Vision Card */}
        <button className="w-full mt-6 py-8 border-2 border-dashed border-border/50 rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2">
          <Star className="w-8 h-8" />
          <span>Add new vision area</span>
        </button>
      </SubpageLayout>
    </>
  );
};

export default Vision;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Swords, Users, Scroll, Map, Gem, Rocket, ChevronRight } from "lucide-react";

const modules = [
  {
    id: "quest",
    icon: Swords,
    title: "Quest Engine",
    subtitle: "Mission Control",
    description: "Sistem manajemen quest yang powerful untuk semua goals dan objectives dalam hidupmu. Dari daily tasks hingga life missions.",
    features: ["Daily Quests", "Main Story Quests", "Side Quests", "Raid Bosses"],
  },
  {
    id: "guild",
    icon: Users,
    title: "Guild System",
    subtitle: "Social Connection",
    description: "Bergabung dengan guild (komunitas) yang sesuai dengan visimu. Kolaborasi, support, dan grow bersama.",
    features: ["Family Guild", "Work Party", "Friend Circle", "Mentor Network"],
  },
  {
    id: "lore",
    icon: Scroll,
    title: "Lore Journal",
    subtitle: "Personal Archive",
    description: "Dokumentasikan perjalanan hidupmu dalam journal yang indah. Setiap chapter adalah cerita yang berharga.",
    features: ["Daily Logs", "Memory Archive", "Wisdom Collection", "Story Mode"],
  },
  {
    id: "world",
    icon: Map,
    title: "World Map",
    subtitle: "Life Navigation",
    description: "Visualisasi kehidupan sebagai peta dunia yang luas. Explore berbagai area dan unlock new territories.",
    features: ["Career Zone", "Health Region", "Relationship Area", "Growth Territory"],
  },
  {
    id: "inventory",
    icon: Gem,
    title: "Inventory",
    subtitle: "Resource Management",
    description: "Kelola semua resources, skills, dan assets yang kamu miliki. Optimize untuk maximum impact.",
    features: ["Skill Tree", "Asset Tracker", "Time Currency", "Energy Points"],
  },
  {
    id: "destiny",
    icon: Rocket,
    title: "Destiny System",
    subtitle: "Future Planning",
    description: "Sistem untuk merancang dan melacak long-term vision dan destiny path yang kamu pilih.",
    features: ["Vision Board", "Milestone Tracker", "Legacy Planning", "Dream Archive"],
  },
];

const ModulesSection = () => {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const active = modules.find((m) => m.id === activeModule) || modules[0];

  return (
    <section id="modules" className="py-24 bg-gradient-hero relative">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium mb-4">
            System Modules
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Explore The</span>{" "}
            <span className="text-gradient">Game Modules</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Setiap modul dirancang untuk mengcover aspek penting dalam kehidupanmu.
          </p>
        </div>

        {/* Module Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${
                activeModule === module.id
                  ? "bg-primary/20 border-primary text-primary shadow-neon"
                  : "bg-card/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              <module.icon className="w-5 h-5" />
              <span className="font-medium">{module.title}</span>
            </button>
          ))}
        </div>

        {/* Active Module Display */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-card">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon animate-glow">
                  <active.icon className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-sm text-primary font-medium mb-2">
                  {active.subtitle}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {active.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {active.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {active.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="neon" className="group">
                  Explore Module
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;

import { Target, Trophy, Zap, Brain, Heart, Compass } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Quest System",
    description: "Ubah goals dan task harian menjadi quest yang seru. Selesaikan misi dan dapatkan rewards.",
    color: "neon-cyan",
  },
  {
    icon: Trophy,
    title: "Achievement Tracker",
    description: "Setiap pencapaianmu tercatat dan dirayakan. Unlock badges dan level up hidupmu.",
    color: "neon-purple",
  },
  {
    icon: Zap,
    title: "Power-Ups",
    description: "Bangun habits positif yang menjadi power-ups permanen untuk karaktermu.",
    color: "neon-pink",
  },
  {
    icon: Brain,
    title: "Mind Stats",
    description: "Track perkembangan mental, skill, dan knowledge dengan sistem stats yang visual.",
    color: "neon-blue",
  },
  {
    icon: Heart,
    title: "Health Meter",
    description: "Monitor kesehatan fisik dan mental dengan dashboard yang intuitif dan actionable.",
    color: "neon-green",
  },
  {
    icon: Compass,
    title: "Life Map",
    description: "Visualisasi journey hidupmu dalam peta interaktif dengan milestones dan destinations.",
    color: "neon-cyan",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 to-transparent blur-3xl" />

      <div className="container px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            Core Features
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Power Up Your</span>{" "}
            <span className="text-gradient">Life Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Fitur-fitur canggih yang dirancang untuk mengubah cara kamu melihat dan menjalani kehidupan.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-card rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

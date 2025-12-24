import { Lightbulb, Flame, Shield, Crown } from "lucide-react";

const philosophies = [
  {
    icon: Lightbulb,
    title: "Life is a Game",
    description: "Kehidupan adalah game terbesar yang pernah dimainkan. Setiap pilihan adalah strategi, setiap hari adalah level baru.",
    quote: "\"You are the player, the game master, and the main character of your own story.\"",
  },
  {
    icon: Flame,
    title: "Growth is Power",
    description: "Setiap challenge adalah XP. Setiap kegagalan adalah lesson. Progress, bukan perfection, adalah tujuan utama.",
    quote: "\"Level up daily. Even 1% better is still better.\"",
  },
  {
    icon: Shield,
    title: "Balance is Key",
    description: "Health, Wealth, Relationships, dan Purpose - keempat stat ini harus balanced untuk unlocking true potential.",
    quote: "\"A maxed-out character needs all stats, not just one.\"",
  },
  {
    icon: Crown,
    title: "Legacy Matters",
    description: "Game ini bukan hanya tentang winning, tapi tentang legacy yang kita tinggalkan untuk player lain.",
    quote: "\"Play the infinite game. Impact others. Leave a legacy.\"",
  },
];

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-secondary/10 to-transparent blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-accent/10 to-transparent blur-3xl" />

      <div className="container px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-4">
            Core Philosophy
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">The</span>{" "}
            <span className="text-gradient">Lifegame Mindset</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Prinsip-prinsip fundamental yang membentuk cara kita melihat dan menjalani kehidupan.
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {philosophies.map((item, index) => (
            <div
              key={index}
              className="relative bg-gradient-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 group overflow-hidden"
            >
              {/* Decorative Number */}
              <div className="absolute top-6 right-6 font-display text-7xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Quote */}
              <blockquote className="text-sm italic text-primary/80 border-l-2 border-primary/30 pl-4">
                {item.quote}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

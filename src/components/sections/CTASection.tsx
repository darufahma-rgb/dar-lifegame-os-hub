import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";

const CTASection = () => {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/50 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-primary fill-primary animate-pulse-slow"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Ready to</span>{" "}
            <span className="text-gradient glow-text">Level Up</span>
            <br />
            <span className="text-foreground">Your Life?</span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Bergabunglah dengan ribuan player lainnya yang sudah memulai perjalanan 
            epic mereka. Setiap hari adalah kesempatan baru untuk grinding dan leveling up.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              Start Your Game
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>Community Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

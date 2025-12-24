import { Gamepad2, Github, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Modules", href: "#modules" },
      { label: "Philosophy", href: "#philosophy" },
      { label: "Roadmap", href: "#" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Community", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Changelog", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  };

  return (
    <footer className="bg-card/50 border-t border-border/50 pt-16 pb-8">
      <div className="container px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="font-display text-lg font-bold tracking-wider text-gradient">
                DAR LIFEGAME OS
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Transformasi hidupmu menjadi game epik yang meaningful dan fulfilling.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4 capitalize">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Dar Lifegame OS. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by Dar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

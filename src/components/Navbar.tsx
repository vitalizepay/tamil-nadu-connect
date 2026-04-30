import { useState } from "react";
import { Menu, X, Globe, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/mjmk-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = {
  ta: [
    { label: "முகப்பு", href: "#hero" },
    { label: "எங்களை பற்றி", href: "#about" },
    { label: "நிறுவனர்", href: "#founder" },
    { label: "சேவைகள்", href: "#services" },
    { label: "சாதனைகள்", href: "#achievements" },
    { label: "தொகுப்பு", href: "#gallery" },
    { label: "இணைக", href: "#register" },
    { label: "தொடர்பு", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Founder", href: "#founder" },
    { label: "Services", href: "#services" },
    { label: "Achievements", href: "#achievements" },
    { label: "Gallery", href: "#gallery" },
    { label: "Join", href: "#register" },
    { label: "Contact", href: "#contact" },
  ],
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLanguage();
  const links = navLinks[lang];

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Flag color stripe - Red, Green, Blue */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex h-1.5">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-secondary" />
        <div className="flex-1 bg-accent" />
      </div>

      <nav className="fixed top-1.5 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2">
              <img src={logo} alt="MJMK Logo" className="h-11 w-11 rounded-full border-2 border-accent" />
              <span className="text-lg font-black text-accent hidden sm:block">MJMK</span>
            </button>
            <div className="flex items-center gap-2 ml-1">
              <a
                href="https://www.facebook.com/mjmkofficial/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook size={16} className="text-[#1877F2]" />
              </a>
              <a
                href="https://x.com/MJMKforPEOPLE"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter / X"
                className="w-8 h-8 rounded-full bg-foreground shadow flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Twitter size={16} className="text-background" />
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={toggle}
              className="ml-2 flex items-center gap-1 px-3 py-2 text-sm font-bold text-accent border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors"
            >
              <Globe size={16} />
              {lang === "ta" ? "EN" : "தமிழ்"}
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggle}
              className="text-accent border border-accent/30 rounded px-2 py-1 text-xs font-bold"
            >
              {lang === "ta" ? "EN" : "தமிழ்"}
            </button>
            <button onClick={() => setOpen(!open)} className="text-foreground p-2">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-background border-t border-border/30 pb-4">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left px-6 py-3 text-foreground font-semibold hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

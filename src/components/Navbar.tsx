import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import logo from "@/assets/mjmk-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { label: "முகப்பு", href: "#hero" },
  { label: "எங்களை பற்றி", href: "#about" },
  { label: "சேவைகள்", href: "#services" },
  { label: "சாதனைகள்", href: "#achievements" },
  { label: "தொகுப்பு", href: "#gallery" },
  { label: "இணைக", href: "#register" },
  { label: "தொடர்பு", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLanguage();

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gradient-hero border-b-2 border-primary/30">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2">
          <img src={logo} alt="MJMK Logo" className="h-12 w-12 rounded-full border-2 border-mjmk-cyan" />
          <span className="text-lg font-bold text-primary-foreground hidden sm:block">MJMK</span>
        </button>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="px-3 py-2 text-sm font-semibold text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/30 rounded transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={toggle}
            className="ml-2 flex items-center gap-1 px-3 py-2 text-sm font-bold text-mjmk-cyan border border-mjmk-cyan/40 rounded hover:bg-primary/30 transition-colors"
          >
            <Globe size={16} />
            {lang === "ta" ? "EN" : "தமிழ்"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground p-2">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden gradient-hero border-t border-primary/20 pb-4">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/30 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

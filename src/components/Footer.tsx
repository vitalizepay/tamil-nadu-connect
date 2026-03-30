import logo from "@/assets/mjmk-logo.png";
import { Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    tagline: "மக்கள் சேவை • மனித உரிமை • நியாயம்",
    quickLinks: "விரைவு இணைப்புகள்",
    social: "சமூக ஊடகங்கள்",
    links: [
      { label: "முகப்பு", href: "#hero" },
      { label: "எங்களை பற்றி", href: "#about" },
      { label: "சேவைகள்", href: "#services" },
      { label: "இணைக", href: "#register" },
    ],
  },
  en: {
    tagline: "Public Service • Human Rights • Justice",
    quickLinks: "Quick Links",
    social: "Social Media",
    links: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Join", href: "#register" },
    ],
  },
};

const Footer = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center sm:items-start">
            <img src={logo} alt="MJMK" className="w-16 h-16 rounded-full border-2 border-mjmk-cyan mb-3" />
            <p className="font-bold text-lg">MJMK</p>
            <p className="text-primary-foreground/60 text-sm">{c.tagline}</p>
          </div>
          <div className="text-center">
            <h4 className="font-bold mb-3">{c.quickLinks}</h4>
            <div className="space-y-2">
              {c.links.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="block mx-auto text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center sm:text-right">
            <h4 className="font-bold mb-3">{c.social}</h4>
            <div className="flex gap-3 justify-center sm:justify-end">
              <a href="https://www.facebook.com/mjmkofficial/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK). All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

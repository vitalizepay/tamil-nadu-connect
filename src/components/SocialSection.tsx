import { Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: { title: "எங்களை பின்தொடருங்கள்" },
  en: { title: "Follow Us" },
};

const SocialSection = () => {
  const { lang } = useLanguage();
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">{t[lang].title}</h2>
        <div className="w-24 h-1 bg-mjmk-cyan mx-auto mb-10 rounded-full" />
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
          <a href="https://www.facebook.com/groups/323032691880806/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-accent text-accent-foreground font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-strong">
            <Facebook size={28} /> Facebook Group
          </a>
          <a href="https://www.facebook.com/mjmkofficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-accent text-accent-foreground font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-strong">
            <Facebook size={28} /> Facebook Page
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;

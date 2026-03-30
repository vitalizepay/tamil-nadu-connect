import { Shield, Building2, HandHeart, Scale, Megaphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "எங்கள் சேவைகள்",
    services: [
      { icon: Shield, title: "மனித உரிமை பாதுகாப்பு", desc: "அனைத்து குடிமக்களின் மனித உரிமைகளை பாதுகாத்தல்" },
      { icon: Building2, title: "NBFC / வங்கி வசூல் தொல்லை தீர்வு", desc: "NBFC மற்றும் வங்கி தொல்லை பிரச்சினைகளுக்கு தீர்வு" },
      { icon: HandHeart, title: "ஏழை மக்களுக்கு உதவி", desc: "ஒடுக்கப்பட்ட சமூகங்களுக்கு நேரடி உதவி" },
      { icon: Scale, title: "சட்ட ஆலோசனை", desc: "இலவச சட்ட ஆலோசனை மற்றும் வழிகாட்டுதல்" },
      { icon: Megaphone, title: "சமூக நீதி இயக்கம்", desc: "சமூக நீதி இயக்கம் மற்றும் வழக்காடுதல்" },
    ],
  },
  en: {
    title: "Our Services",
    services: [
      { icon: Shield, title: "Human Rights Protection", desc: "Protecting human rights of all citizens" },
      { icon: Building2, title: "NBFC / Bank Harassment Resolution", desc: "Resolution of NBFC & bank harassment issues" },
      { icon: HandHeart, title: "Help for the Underprivileged", desc: "Direct assistance to underprivileged communities" },
      { icon: Scale, title: "Legal Consultation", desc: "Free legal consultation and guidance" },
      { icon: Megaphone, title: "Social Justice Movement", desc: "Social justice movement and advocacy" },
    ],
  },
};

const ServicesSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="services" className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">{c.title}</h2>
        <div className="w-24 h-1 bg-secondary-foreground/30 mx-auto mb-12 rounded-full" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {c.services.map((s, i) => (
            <div key={i} className="group bg-background/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 hover:bg-background/20 transition-all duration-300 border border-secondary-foreground/20 hover:border-secondary-foreground/40 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-foreground/20 flex items-center justify-center group-hover:bg-secondary-foreground/30 transition-colors">
                <s.icon size={32} className="text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-secondary-foreground/80 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

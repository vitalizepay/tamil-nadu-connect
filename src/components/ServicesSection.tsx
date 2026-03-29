import { Shield, Building2, HandHeart, Scale, Megaphone } from "lucide-react";

const services = [
  { icon: Shield, title: "மனித உரிமை பாதுகாப்பு", desc: "Protecting human rights of all citizens" },
  { icon: Building2, title: "NBFC / வங்கி வசூல் தொல்லை தீர்வு", desc: "Resolution of NBFC & bank harassment issues" },
  { icon: HandHeart, title: "ஏழை மக்களுக்கு உதவி", desc: "Direct assistance to underprivileged communities" },
  { icon: Scale, title: "சட்ட ஆலோசனை", desc: "Free legal consultation and guidance" },
  { icon: Megaphone, title: "சமூக நீதி இயக்கம்", desc: "Social justice movement and advocacy" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-4">எங்கள் சேவைகள்</h2>
      <div className="w-24 h-1 bg-secondary-foreground/30 mx-auto mb-12 rounded-full" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <div key={i} className="bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform border border-secondary-foreground/20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-foreground/20 flex items-center justify-center">
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

export default ServicesSection;

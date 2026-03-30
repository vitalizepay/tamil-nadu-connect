import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "தொடர்பு கொள்ள",
    office: "தலைமை அலுவலகம்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
  },
  en: {
    title: "Contact Us",
    office: "Head Office",
    phone: "Phone",
    email: "Email",
  },
};

const ContactSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-4">{c.title}</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-xl shadow-card bg-muted">
            <MapPin size={36} className="mx-auto mb-3 text-primary" />
            <h3 className="font-bold text-foreground mb-1">{c.office}</h3>
            <p className="text-muted-foreground">Tirupur, Tamil Nadu</p>
          </div>
          <div className="text-center p-6 rounded-xl shadow-card bg-muted">
            <Phone size={36} className="mx-auto mb-3 text-primary" />
            <h3 className="font-bold text-foreground mb-1">{c.phone}</h3>
            <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
          </div>
          <div className="text-center p-6 rounded-xl shadow-card bg-muted">
            <Mail size={36} className="mx-auto mb-3 text-primary" />
            <h3 className="font-bold text-foreground mb-1">{c.email}</h3>
            <p className="text-muted-foreground">info@mjmk.in</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

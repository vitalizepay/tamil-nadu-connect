import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import vishnuImg from "@/assets/leader-vishnu.png";
import farookImg from "@/assets/leader-farook.png";
import akkimImg from "@/assets/leader-akkim.png";
import sabithaImg from "@/assets/leader-sabitha.png";
import vishnuLImg from "@/assets/leader-vishnu-l.png";
import prakashImg from "@/assets/leader-prakash.png";
import rahimImg from "@/assets/leader-rahim.png";
import senthilImg from "@/assets/leader-senthil.png";

const t = {
  ta: {
    title: "கழக நிர்வாகிகள்",
    back: "முகப்புக்குச் செல்",
    leaders: [
      { name: "கோ விஷ்ணு லட்சுமணன்", role: "கழகப் பொதுச் செயலாளர் மற்றும் கோவை மாநகர மாவட்ட செயலாளர்", img: vishnuImg },
      { name: "A.முகமது பாரூக்", role: "கழகத் தலைமை நிலைய செயலாளர்", img: farookImg },
      { name: "Akkim", role: "கழக அமைப்புச் செயலாளர்", img: akkimImg },
      { name: "V. சபிதா ராணி", role: "கழக கொள்கை பரப்புச் செயலாளர்", img: sabithaImg },
      { name: "G. விஷ்ணு லட்சுமணன்", role: "கழக அவைத் தலைவர்", img: vishnuLImg },
      { name: "கா.பிரகாஷ்", role: "கழக முதன்மை செயலாளர்", img: prakashImg },
      { name: "ஜா.ரஹீம்", role: "கழக ஒருங்கிணைப்பாளர்", img: rahimImg },
      { name: "S செந்தில்குமார்", role: "கழக மேற்கு மண்டல செயலாளர்", img: senthilImg },
    ],
  },
  en: {
    title: "Party Office Bearers",
    back: "Back to Home",
    leaders: [
      { name: "Ko. Vishnu Lakshmanan", role: "General Secretary & Coimbatore City District Secretary", img: vishnuImg },
      { name: "A. Muhammad Farook", role: "Headquarters Secretary", img: farookImg },
      { name: "Akkim", role: "Organization Secretary", img: akkimImg },
      { name: "V. Sabitha Rani", role: "Policy Propagation Secretary", img: sabithaImg },
      { name: "G. Vishnu Lakshmanan", role: "Party Speaker", img: vishnuLImg },
      { name: "Ka. Prakash", role: "Chief Secretary", img: prakashImg },
      { name: "Ja. Rahim", role: "Party Coordinator", img: rahimImg },
      { name: "S. Senthilkumar", role: "Western Zone Secretary", img: senthilImg },
    ],
  },
};

const BearersContent = () => {
  const { lang } = useLanguage();
  const c = t[lang];
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary font-bold mb-6 hover:underline">
            <ArrowLeft size={18} /> {c.back}
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-center text-foreground mb-4">{c.title}</h1>
          <div className="w-24 h-1 bg-mjmk-cyan mx-auto mb-12 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {c.leaders.map((leader, i) => (
              <div
                key={i}
                className="group flex flex-col items-center bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative w-36 h-36 rounded-full border-4 border-secondary shadow-lg overflow-hidden mb-4 group-hover:border-mjmk-cyan transition-colors duration-500">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-black text-foreground text-center mb-2 group-hover:text-secondary transition-colors duration-300">{leader.name}</h3>
                <p className="text-secondary font-bold text-xs text-center">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const Bearers = () => (
  <LanguageProvider>
    <BearersContent />
  </LanguageProvider>
);

export default Bearers;

import founderImg from "@/assets/founder.png";
import vishnuImg from "@/assets/leader-vishnu.png";
import farookImg from "@/assets/leader-farook.png";
import akkimImg from "@/assets/leader-akkim.png";
import sabithaImg from "@/assets/leader-sabitha.png";
import vishnuLImg from "@/assets/leader-vishnu-l.png";
import prakashImg from "@/assets/leader-prakash.png";
import rahimImg from "@/assets/leader-rahim.png";
import senthilImg from "@/assets/leader-senthil.png";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "நிறுவனர் & தலைவர்",
    name: "எஸ்.இப்ராஹீம்பாதுஷா",
    role: "நிறுவனர் & தலைவர் – MJMK",
    desc: "மக்கள் ஜனநாயக முன்னேற்ற கழகத்தின் நிறுவனர் மற்றும் தலைவர். 2018 ஆம் ஆண்டு முதல் திருப்பூரில் சாதாரண மக்களின் உரிமைகளுக்காகவும், சட்டவிரோத கடன் வசூல்களுக்கு எதிராகவும், சமூக நீதிக்காகவும் தீவிரமாகப் போராடி வரும் தலைவர்.",
    quote: "\"மக்களின் உரிமைக்காக போராடும் தலைவர்\"",
    teamTitle: "கழக நிர்வாகிகள்",
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
    title: "Founder & President",
    name: "S. Ibrahim Badusha",
    role: "Founder-President – MJMK",
    desc: "Founder and President of Makkal Jananayaka Munnetra Kazhagam, headquartered in Tirupur. Since 2018, he has been actively fighting against illegal debt recovery practices, championing labor and consumer rights, and promoting communal harmony across Tamil Nadu.",
    quote: "\"A leader who fights for the rights of the people\"",
    teamTitle: "Party Office Bearers",
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

const FounderSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <>
    <section id="founder" className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        {/* Founder */}
        <h2 className="text-3xl md:text-4xl font-black text-center text-primary-foreground mb-4">{c.title}</h2>
        <div className="w-24 h-1 bg-mjmk-cyan mx-auto mb-10 rounded-full" />
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl border-4 border-mjmk-cyan shadow-strong overflow-hidden">
            <img src={founderImg} alt={c.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-primary-foreground mb-2">{c.name}</h3>
            <p className="text-mjmk-cyan font-bold text-lg mb-4">{c.role}</p>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">{c.desc}</p>
            <p className="text-2xl font-black text-mjmk-cyan italic">{c.quote}</p>
          </div>
        </div>
      </div>
    </section>

    {/* Team Leaders - White background section */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-4">{c.teamTitle}</h2>
        <div className="w-24 h-1 bg-mjmk-cyan mx-auto mb-10 rounded-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {c.leaders.map((leader, i) => (
            <div
              key={i}
              className="group flex flex-col items-center bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative w-36 h-36 rounded-full border-4 border-secondary shadow-lg overflow-hidden mb-4 group-hover:border-mjmk-cyan transition-colors duration-500">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-secondary/40 transition-all duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-black text-foreground text-center mb-2 group-hover:text-secondary transition-colors duration-300">{leader.name}</h3>
              <p className="text-secondary font-bold text-xs text-center">{leader.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default FounderSection;

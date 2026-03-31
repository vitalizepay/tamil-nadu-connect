import partyBanner from "@/assets/party-banner.png";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "மக்கள் ஜனநாயக முன்னேற்ற கழகம்",
    subtitle: "MAKKAL JANANAYAKA MUNNETRA KAZHAGAM",
    years: "9+ ஆண்டுகளாக மக்கள் சேவையில்",
    join: "இணைந்திடுங்கள்",
    help: "உதவி பெறுங்கள்",
    ticker: "★ மக்களுக்காக \u00a0•\u00a0 நீதிக்காக \u00a0•\u00a0 நியாயத்திற்காக \u00a0★\u00a0 மக்கள் சேவை \u00a0•\u00a0 மனித உரிமை \u00a0•\u00a0 நியாயம் \u00a0★\u00a0 மக்களுக்காக \u00a0•\u00a0 நீதிக்காக \u00a0•\u00a0 நியாயத்திற்காக ★",
  },
  en: {
    title: "Makkal Jananayaka Munnetra Kazhagam",
    subtitle: "MJMK - People's Democratic Progressive Party",
    years: "9+ Years in Public Service",
    join: "Join Us",
    help: "Get Help",
    ticker: "★ For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness \u00a0★\u00a0 Public Service \u00a0•\u00a0 Human Rights \u00a0•\u00a0 Justice \u00a0★\u00a0 For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness ★",
  },
};

const HeroSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-20 md:mt-28 animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text on top / left */}
          <div className="flex-1 text-center md:text-left order-1">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-4">
              {c.title}
            </h1>
            <p className="text-xl md:text-2xl font-bold text-mjmk-cyan mb-2">{c.subtitle}</p>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">{c.years}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
              <button onClick={() => scrollTo("#register")} className="gradient-red-btn text-primary-foreground font-bold text-lg px-8 py-4 rounded-lg shadow-strong hover:scale-105 transition-transform animate-pulse-glow">
                {c.join}
              </button>
              <button onClick={() => scrollTo("#complaint")} className="bg-secondary text-secondary-foreground font-bold text-lg px-8 py-4 rounded-lg hover:scale-105 transition-transform">
                {c.help}
              </button>
            </div>
          </div>

          {/* Banner image on right / bottom */}
          <div className="flex-1 order-2">
            <div className="rounded-xl overflow-hidden shadow-strong">
              <img src={partyBanner} alt="MJMK" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-foreground/80 py-3 overflow-hidden">
        <div className="animate-ticker whitespace-nowrap text-primary-foreground font-bold text-lg">
          {c.ticker}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

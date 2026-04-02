import partyBanner from "@/assets/party-banner.png";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "மக்கள் ஜனநாயக முன்னேற்ற கழகம்",
    subtitle: "MAKKAL JANANAYAKA MUNNETRA KAZHAGAM (MJMK)",
    tagline: "மக்கள் நலன் • சமூக நீதி • முன்னேற்றம்",
    description:
      "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK) என்பது சமத்துவம், வெளிப்படைத்தன்மை மற்றும் நிலையான வளர்ச்சி மூலம் சமூகத்தை மேம்படுத்த அர்ப்பணிக்கப்பட்ட மக்கள் சார்ந்த அரசியல் இயக்கமாகும். 9+ ஆண்டுகளாக அடிமட்ட அளவில் குடிமக்களை மேம்படுத்தவும் ஜனநாயக மதிப்புகளை பாதுகாக்கவும் செயல்பட்டு வருகிறது.",
    years: "9+ ஆண்டுகளாக மக்கள் சேவையில்",
    ticker:
      "★ மக்களுக்காக \u00a0•\u00a0 நீதிக்காக \u00a0•\u00a0 நியாயத்திற்காக \u00a0★\u00a0 மக்கள் சேவை \u00a0•\u00a0 மனித உரிமை \u00a0•\u00a0 நியாயம் \u00a0★\u00a0 மக்களுக்காக \u00a0•\u00a0 நீதிக்காக \u00a0•\u00a0 நியாயத்திற்காக ★",
  },
  en: {
    title: "Makkal Jananayaka Munnetra Kazhagam",
    subtitle: "MJMK - People's Democratic Progressive Party",
    tagline: "People's Welfare • Social Justice • Progress",
    description:
      "Makkal Jananayaka Munnetra Kazhagam (MJMK) is a people-driven political movement committed to uplifting society through equality, transparency, and sustainable development. With over 9 years of service, the party works at grassroots level to empower citizens and protect democratic values.",
    years: "9+ Years in Public Service",
    ticker:
      "★ For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness \u00a0★\u00a0 Public Service \u00a0•\u00a0 Human Rights \u00a0•\u00a0 Justice \u00a0★\u00a0 For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness ★",
  },
};

const HeroSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Animated background shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mt-20 md:mt-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Banner Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden max-w-[520px] w-full border-2 border-accent/20 hover:border-accent/40 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <img
                src={partyBanner}
                alt="MJMK Party Banner"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-accent leading-tight mb-3">
              {c.title}
            </h1>
            <p className="text-lg md:text-xl font-bold text-primary mb-3">
              {c.subtitle}
            </p>
            <p className="text-base md:text-lg font-semibold text-secondary mb-4 tracking-wide">
              {c.tagline}
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto md:mx-0">
              {c.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-bold text-accent">{c.years}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-accent/90 py-3 overflow-hidden backdrop-blur-sm">
        <div className="animate-ticker whitespace-nowrap text-accent-foreground font-bold text-lg">
          {c.ticker}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

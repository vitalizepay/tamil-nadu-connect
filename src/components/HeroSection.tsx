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
    join: "இணைந்திடுங்கள்",
    help: "உதவி பெறுங்கள்",
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
    join: "Join Us",
    help: "Get Help",
    ticker:
      "★ For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness \u00a0★\u00a0 Public Service \u00a0•\u00a0 Human Rights \u00a0•\u00a0 Justice \u00a0★\u00a0 For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness ★",
  },
};

const HeroSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mt-20 md:mt-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Banner Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden shadow-strong max-w-[520px] w-full border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight mb-3">
              {c.title}
            </h1>
            <p className="text-lg md:text-xl font-bold text-mjmk-cyan mb-3">
              {c.subtitle}
            </p>
            <p className="text-base md:text-lg font-semibold text-secondary mb-4 tracking-wide">
              {c.tagline}
            </p>
            <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-6 max-w-lg mx-auto md:mx-0">
              {c.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-bold text-primary-foreground">{c.years}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollTo("#register")}
                className="gradient-red-btn text-primary-foreground font-bold text-lg px-8 py-4 rounded-xl shadow-strong hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse-glow"
              >
                {c.join}
              </button>
              <button
                onClick={() => scrollTo("#complaint")}
                className="bg-secondary text-secondary-foreground font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 border border-secondary-foreground/10"
              >
                {c.help}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-foreground/80 py-3 overflow-hidden backdrop-blur-sm">
        <div className="animate-ticker whitespace-nowrap text-primary-foreground font-bold text-lg">
          {c.ticker}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

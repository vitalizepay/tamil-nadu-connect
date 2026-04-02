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
    mission: "எங்கள் நோக்கம்",
    missionText:
      "ஒவ்வொரு குடிமகனும் மரியாதையுடனும் சமத்துவத்துடனும் வாழ வேண்டும் என்பதே எங்கள் உறுதியான நம்பிக்கை. வங்கி வசூல் துன்புறுத்தல்களுக்கு எதிராகவும், சமூக அநீதிகளுக்கு எதிராகவும் தொடர்ந்து போராடி வருகிறோம்.",
    vision: "எங்கள் பார்வை",
    visionText:
      "தமிழ்நாட்டில் ஒரு நியாயமான, வெளிப்படையான மற்றும் மக்கள் நலன் சார்ந்த ஆட்சி அமைப்பை உருவாக்குவதே எங்கள் இலக்கு. அடிமட்ட மக்களின் குரலை ஆட்சியில் எதிரொலிக்கச் செய்வோம்.",
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
    mission: "Our Mission",
    missionText:
      "We firmly believe that every citizen deserves to live with dignity and equality. We continue to fight against banking recovery harassment and social injustice across Tamil Nadu.",
    vision: "Our Vision",
    visionText:
      "To build a just, transparent, and people-centric governance system in Tamil Nadu. We aim to amplify the voices of grassroots communities in governance and policy-making.",
    ticker:
      "★ For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness \u00a0★\u00a0 Public Service \u00a0•\u00a0 Human Rights \u00a0•\u00a0 Justice \u00a0★\u00a0 For the People \u00a0•\u00a0 For Justice \u00a0•\u00a0 For Fairness ★",
  },
};

const HeroSection = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-secondary/5" />
      <div className="absolute top-32 right-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-20 w-72 h-72 bg-secondary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.8s" }} />

      <div className="relative z-10 w-full px-4 md:px-8 max-w-4xl mx-auto text-center mt-24 md:mt-28 mb-16">
        {/* Banner */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-block rounded-2xl overflow-hidden border-2 border-accent/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500 max-w-2xl w-full">
            <img src={partyBanner} alt="MJMK Party Banner" className="w-full h-auto" loading="eager" />
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-accent leading-tight mb-3">
            {c.title}
          </h1>
          <p className="text-lg md:text-2xl font-bold text-primary mb-2">{c.subtitle}</p>
          <p className="text-base md:text-lg font-semibold text-secondary mb-4 tracking-widest">{c.tagline}</p>
        </div>

        {/* Years badge */}
        <div className="animate-fade-in-up mb-6" style={{ animationDelay: "0.3s" }}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm md:text-base font-bold text-accent">{c.years}</span>
          </div>
        </div>

        {/* Description */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            {c.description}
          </p>
        </div>

        {/* Mission & Vision cards */}
        <div className="grid sm:grid-cols-2 gap-6 animate-fade-in-up max-w-3xl mx-auto" style={{ animationDelay: "0.5s" }}>
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-strong hover:-translate-y-1 transition-all duration-300 text-left">
            <div className="w-10 h-1 bg-primary rounded-full mb-3" />
            <h3 className="text-lg font-black text-primary mb-2">{c.mission}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.missionText}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-strong hover:-translate-y-1 transition-all duration-300 text-left">
            <div className="w-10 h-1 bg-secondary rounded-full mb-3" />
            <h3 className="text-lg font-black text-secondary mb-2">{c.vision}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.visionText}</p>
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

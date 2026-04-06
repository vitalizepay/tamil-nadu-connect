import partyBanner from "@/assets/party-banner.png";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  ta: {
    title: "மக்கள் ஜனநாயக முன்னேற்ற கழகம்",
    subtitle: "MAKKAL JANANAYAKA MUNNETRA KAZHAGAM (MJMK)",
    tagline: "மக்கள் நலன் • சமூக நீதி • முன்னேற்றம்",
    description:
      "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK) என்பது 2018 ஆம் ஆண்டு நிறுவப்பட்ட, திருப்பூரை தலைமையகமாகக் கொண்ட மக்கள் சார்ந்த அரசியல் இயக்கமாகும். சாதாரண மக்களின் உரிமைகளைப் பாதுகாக்கவும், சமூக நீதியை நிலைநாட்டவும், வெளிப்படையான ஆட்சியை உறுதி செய்யவும் தீவிரமாகச் செயல்பட்டு வருகிறது.",
    years: "2018 முதல் மக்கள் சேவையில்",
    mission: "எங்கள் நோக்கம்",
    missionText:
      "தனியார் நிதி நிறுவனங்கள் மற்றும் மைக்ரோ லோன் ஆப்களின் சட்டவிரோத வசூல் முறைகளுக்கு எதிராகப் போராடுதல், தொழிலாளர் மற்றும் நுகர்வோர் உரிமைகளைப் பாதுகாத்தல், வகுப்புவாத நல்லிணக்கம் மற்றும் மதச்சார்பின்மையை நிலைநாட்டுதல் ஆகியவை எங்கள் முக்கிய நோக்கங்கள்.",
    vision: "எங்கள் பார்வை",
    visionText:
      "MJMK சமூக பொது நல அறக்கட்டளை மூலம் கல்வி உதவி, நலத்திட்டப் பொருட்கள் மற்றும் சமூக நலன் சார்ந்த உதவிகளை திருப்பூர் மக்களுக்கு வழங்கி வருகிறது. அடிமட்ட மக்களின் குரலை ஆட்சியில் எதிரொலிக்கச் செய்வோம்.",
    ticker:
      "★ மக்களுக்காக \u00a0•\u00a0 நீதிக்காக \u00a0•\u00a0 நியாயத்திற்காக \u00a0★\u00a0 மக்கள் சேவை \u00a0•\u00a0 மனித உரிமை \u00a0•\u00a0 நியாயம் \u00a0★\u00a0 மக்களுக்காக \u00a0•\u00a0 நீதிக்காக \u00a0•\u00a0 நியாயத்திற்காக ★",
  },
  en: {
    title: "Makkal Jananayaka Munnetra Kazhagam",
    subtitle: "MJMK - People's Democratic Progressive Party",
    tagline: "People's Welfare • Social Justice • Progress",
    description:
      "Makkal Jananayaka Munnetra Kazhagam (MJMK) is a people-driven political movement founded in 2018, headquartered at Ramu Colony, Thiruneelakandapuram, Tirupur. Unlike larger state parties, MJMK operates with a strong focus on social activism, local labor rights, and consumer protection across the Tirupur region.",
    years: "Serving the People Since 2018",
    mission: "Our Mission",
    missionText:
      "We actively protest against private finance companies and micro-loan apps that use illegal or forceful debt collection methods. We champion communal harmony, secularism, and stand as vocal critics of policies that harm the common people.",
    vision: "Our Vision",
    visionText:
      "Through the MJMK Social Public Welfare Trust, we provide educational support, welfare materials, and community aid to the people of Tirupur. Our goal is to amplify grassroots voices in governance and build a just, transparent society.",
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

      <div className="relative z-10 w-full px-4 md:px-8 max-w-5xl mx-auto mt-24 md:mt-28 mb-16">
        {/* Text first on top */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-accent leading-tight mb-2">
            {c.title}
          </h1>
          <p className="text-sm md:text-base font-bold text-primary mb-1">{c.subtitle}</p>
          <p className="text-xs md:text-sm font-semibold text-secondary tracking-widest">{c.tagline}</p>
        </div>

        {/* Banner aligned left */}
        <div className="flex flex-col md:flex-row items-start gap-8 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="md:w-1/2 w-full flex-shrink-0">
            <div className="rounded-2xl overflow-hidden border-2 border-accent/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500">
              <img src={partyBanner} alt="MJMK Party Banner" className="w-full h-auto" loading="eager" />
            </div>
          </div>

          {/* Right side content */}
          <div className="md:w-1/2 w-full space-y-4">
            {/* Years badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs md:text-sm font-bold text-accent">{c.years}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {c.description}
            </p>

            {/* Mission & Vision cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-strong hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-8 h-0.5 bg-primary rounded-full mb-2" />
                <h3 className="text-sm font-black text-primary mb-1">{c.mission}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.missionText}</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-strong hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-8 h-0.5 bg-secondary rounded-full mb-2" />
                <h3 className="text-sm font-black text-secondary mb-1">{c.vision}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.visionText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-accent/90 py-2.5 overflow-hidden backdrop-blur-sm">
        <div className="animate-ticker whitespace-nowrap text-accent-foreground font-bold text-sm">
          {c.ticker}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

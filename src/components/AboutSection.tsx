import { Shield, Scale, Gavel, HandHeart, GraduationCap, HeartPulse } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  ta: {
    title: "எங்களை பற்றி",
    subtitle: "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK)",
    description:
      "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK) என்பது 2018 ஆம் ஆண்டு நிறுவனர்-தலைவர் இப்ராஹீம் பாதுஷா அவர்களால் நிறுவப்பட்ட, திருப்பூர் ராமு காலனி, திருநீலகண்டபுரத்தை தலைமையகமாகக் கொண்ட மக்கள் மைய அரசியல் இயக்கமாகும். பெரிய மாநிலக் கட்சிகளைப் போலன்றி, MJMK சமூக செயல்பாடு, உள்ளூர் தொழிலாளர் உரிமைகள் மற்றும் நுகர்வோர் பாதுகாப்பில் தீவிரமாகச் செயல்படுகிறது.",
    points: [
      { icon: Shield, text: "தனியார் நிதி நிறுவனங்கள் மற்றும் மைக்ரோ லோன் ஆப்களின் சட்டவிரோத கடன் வசூல் முறைகளுக்கு எதிரான போராட்டம்" },
      { icon: Gavel, text: "மத்திய அரசின் கொள்கைகளுக்கு எதிராக குரல் எழுப்புதல், வகுப்புவாத நல்லிணக்கம் மற்றும் மதச்சார்பின்மைக்கு பாடுபடுதல்" },
      { icon: HandHeart, text: "MJMK சமூக பொது நல அறக்கட்டளை மூலம் நலத்திட்டப் பொருட்கள் மற்றும் சமூக உதவிகள் வழங்குதல்" },
      { icon: GraduationCap, text: "திருப்பூர் மக்களுக்கு கல்வி உதவி மற்றும் இளைஞர் மேம்பாட்டு திட்டங்கள்" },
      { icon: HeartPulse, text: "தொழிலாளர் நலன் மற்றும் சுகாதார அணுகலை மேம்படுத்துதல்" },
      { icon: Scale, text: "வெளிப்படையான மற்றும் பொறுப்பான ஆட்சியை உறுதி செய்தல்" },
    ],
    quote: "\"மக்கள் நலன் எங்கள் முதன்மை\"",
    quoteDesc: "என்பது எங்கள் அடிப்படை கொள்கை.",
    conclusion:
      "MJMK ஒரு அரசியல் அமைப்பு மட்டுமல்ல — இது உரிமைகளுக்கான இயக்கம், நீதிக்கான குரல், மனிதநேய ஆட்சிக்கான சக்தி.",
  },
  en: {
    title: "About Us",
    subtitle: "Makkal Jananayaka Munnetra Kazhagam (MJMK)",
    description:
      "Makkal Jananayaka Munnetra Kazhagam (MJMK) was founded in 2018 by Founder-President Ibrahim Badusha, headquartered at Ramu Colony, Thiruneelakandapuram, Tirupur. Unlike larger state parties, MJMK operates with a heavy focus on social activism, local labor rights, and consumer protection in the Tirupur region.",
    points: [
      { icon: Shield, text: "Anti-harassment campaigns against private finance companies and micro-loan apps using illegal debt collection methods" },
      { icon: Gavel, text: "Vocal critics of central government policies, championing communal harmony and secularism" },
      { icon: HandHeart, text: "MJMK Social Public Welfare Trust providing aid and welfare materials to the Tirupur community" },
      { icon: GraduationCap, text: "Educational support programs and youth empowerment initiatives" },
      { icon: HeartPulse, text: "Improving labor welfare and access to healthcare" },
      { icon: Scale, text: "Ensuring transparent and accountable governance" },
    ],
    quote: "\"People's Welfare is Our Priority\"",
    quoteDesc: "is the core principle that drives our mission.",
    conclusion:
      "MJMK is not just a political organization — It is a movement for rights, a voice for justice, and a force for humane governance.",
  },
};

const AboutSection = () => {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">{t.title}</h2>
          <p className="text-lg font-bold text-primary mb-2">{t.subtitle}</p>
          <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
            {t.description}
          </p>

          {/* Quote */}
          <div className="mb-12 p-6 rounded-2xl bg-muted/50 border border-border/50 backdrop-blur-sm max-w-2xl mx-auto">
            <p className="text-2xl font-black text-primary italic">{t.quote}</p>
            <p className="text-muted-foreground mt-2">{t.quoteDesc}</p>
          </div>
        </div>

        {/* Points Grid */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {t.points.map((p, i) => (
            <div
              key={i}
              className="group p-5 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-strong hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <p.icon size={24} />
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed font-medium">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="max-w-3xl mx-auto">
          <div className="p-6 md:p-8 rounded-2xl gradient-green text-primary-foreground text-center">
            <p className="text-lg md:text-xl font-bold leading-relaxed">{t.conclusion}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

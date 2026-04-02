import { Shield, Scale, Gavel, HandHeart, GraduationCap, HeartPulse } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  ta: {
    title: "எங்களை பற்றி",
    subtitle: "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK)",
    description:
      "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK) என்பது தமிழ்நாடு முழுவதும் உள்ள குடிமக்களுக்கு சேவை செய்வதற்காக அர்ப்பணிக்கப்பட்ட மக்கள் முதல் அரசியல் இயக்கமாகும். சமூக நீதி, சமத்துவம் மற்றும் வெளிப்படையான ஆட்சி ஆகியவற்றில் கட்சி கவனம் செலுத்துகிறது. நிதி நெருக்கடிகளை எதிர்கொள்ளும் மக்களுக்கு உதவுதல், நியாயமற்ற வங்கி நடைமுறைகளிலிருந்து குடிமக்களை பாதுகாத்தல் மற்றும் இந்திய சட்டத்தின் கீழ் சட்ட உரிமைகள் மதிக்கப்படுவதை உறுதி செய்தல் ஆகியவற்றில் MJMK தீவிரமாக செயல்படுகிறது.",
    points: [
      { icon: Shield, text: "வங்கி துன்புறுத்தல் மற்றும் சட்டவிரோத வசூல் நடைமுறைகளிலிருந்து மக்களை பாதுகாத்தல்" },
      { icon: Gavel, text: "குடிமக்களுக்கு சட்ட விழிப்புணர்வு மற்றும் ஆதரவு வழங்குதல்" },
      { icon: HandHeart, text: "கிராம மற்றும் நகர சமூகங்களுக்கு உண்மையான தீர்வுகள் வழங்குதல்" },
      { icon: GraduationCap, text: "இளைஞர்களை மேம்படுத்துதல் மற்றும் வேலைவாய்ப்புகளை ஆதரித்தல்" },
      { icon: HeartPulse, text: "சுகாதாரம் மற்றும் கல்விக்கான அணுகலை மேம்படுத்துதல்" },
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
      "Makkal Jananayaka Munnetra Kazhagam (MJMK) is a people-first political movement dedicated to serving citizens across Tamil Nadu. The party focuses on social justice, equality, and transparent governance. MJMK actively works to help people facing financial struggles, protect citizens from unfair banking practices, and ensure legal rights are respected under Indian law. Through awareness, support systems, and grassroots action, the party stands as a strong voice against injustice and exploitation.",
    points: [
      { icon: Shield, text: "Protecting people from bank harassment and illegal recovery practices" },
      { icon: Gavel, text: "Providing legal awareness and support to citizens" },
      { icon: HandHeart, text: "Helping rural and urban communities with real solutions" },
      { icon: GraduationCap, text: "Empowering youth and supporting employment opportunities" },
      { icon: HeartPulse, text: "Improving access to healthcare and education" },
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

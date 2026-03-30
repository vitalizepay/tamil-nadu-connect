import { Shield, Users, Heart, Scale, Gavel, Megaphone, BookOpen, HandHeart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  ta: {
    title: "எங்களை பற்றி",
    subtitle: "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK)",
    intro: [
      "மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK) என்பது தமிழ்நாட்டில் சாதாரண மக்களின் உரிமைகளை பாதுகாக்க உருவாக்கப்பட்ட மக்கள் மைய அரசியல் இயக்கமாகும்.",
      "9 ஆண்டுகளுக்கும் மேலாக, குரல் இல்லாத மக்களுக்கு குரலாக இருந்து, நியாயத்திற்காக தொடர்ந்து செயல்பட்டு வருகிறோம்.",
    ],
    quote: "\"மக்கள் நலன் எங்கள் முதன்மை\"",
    quoteDesc: "என்பது எங்கள் அடிப்படை கொள்கை. மக்களின் மரியாதை, பாதுகாப்பு மற்றும் உரிமைகள் எந்த சூழ்நிலையிலும் பாதிக்கப்படக்கூடாது என்பதில் நாங்கள் உறுதியாக உள்ளோம்.",
    focusTitle: "எங்கள் முக்கிய நோக்கங்கள் மற்றும் சேவைகள்",
    services: [
      {
        icon: Shield,
        title: "NBFC & வங்கி வசூல் தொல்லைகளுக்கு எதிரான பாதுகாப்பு",
        points: [
          "கடன் வசூல் நடவடிக்கைகள் மனிதநேயத்துடன் நடைபெற வேண்டும்.",
          "அச்சுறுத்துதல், மிரட்டல், அவமதிப்பு முற்றிலும் தவறு.",
          "வசூல் முகவர்கள் RBI விதிமுறைகளின்படி ஒழுக்க நெறிமுறைகளை பின்பற்ற வேண்டும்.",
        ],
      },
      {
        icon: Scale,
        title: "RBI விதிமுறைகள் – கட்டாயம் பின்பற்றப்பட வேண்டும்",
        points: [
          "Recovery agents must follow a strict Code of Conduct.",
          "தொல்லை, பகிரங்க அவமானம், வன்முறை எதுவும் அனுமதிக்கப்படாது.",
          "எழுத்துப்பூர்வ அறிவிப்பு வழங்கப்பட வேண்டும்; அனுமதிக்கப்பட்ட நேரத்தில் மட்டுமே தொடர்பு.",
          "இந்த விதிமுறைகள் RBI மூலம் கட்டாயமாக நிர்ணயிக்கப்பட்டவை.",
        ],
      },
      {
        icon: Gavel,
        title: "சட்ட உதவி மற்றும் வழிகாட்டுதல்",
        points: [
          "கடன் வசூல் அத்துமீறல்களுக்கு எதிராக இலவச ஆலோசனை வழங்குகிறோம்.",
          "சட்டப்படி உரிமைகளை எப்படி பாதுகாப்பது என்பதில் வழிகாட்டுகிறோம்.",
        ],
      },
      {
        icon: HandHeart,
        title: "சமூக நலன் மற்றும் சமத்துவம்",
        points: [
          "ஏழை மற்றும் ஒடுக்கப்பட்ட மக்களின் உரிமைகளை காக்க செயல்படுகிறோம்.",
          "கல்வி, நீர், சுகாதாரம், வேலைவாய்ப்பு போன்ற தேவைகளுக்காக குரல் கொடுக்கிறோம்.",
          "மக்கள் நேரடியாக அணுகக்கூடிய அமைப்பாக செயல்படுகிறோம்.",
        ],
      },
    ],
    journeyTitle: "எங்கள் பயணம்",
    journey: "9+ ஆண்டுகளாக தொடர்ந்து மக்கள் சேவையில் ஈடுபட்டு, நம்பிக்கையுடன் வளர்ந்து வரும் இயக்கமாக உள்ளோம். ஒவ்வொரு குடிமகனும் பாதுகாப்பாகவும் மரியாதையுடனும் வாழும் சமூகத்தை உருவாக்குவதே எங்கள் நோக்கம்.",
    conclusion: "MJMK ஒரு அரசியல் அமைப்பு மட்டுமல்ல — இது உரிமைகளுக்கான இயக்கம், நீதிக்கான குரல், மனிதநேய ஆட்சிக்கான சக்தி.",
  },
  en: {
    title: "About Us",
    subtitle: "Makkal Jananayaka Munnetra Kazhagam (MJMK)",
    intro: [
      "Makkal Jananayaka Munnetra Kazhagam (MJMK) is a people-centric political movement dedicated to protecting the rights of common citizens across Tamil Nadu.",
      "For over 9 years, we have stood as a strong voice for the voiceless and continue to fight for justice and dignity.",
    ],
    quote: "\"People's Welfare is Our Priority\"",
    quoteDesc: "is the core principle that drives our mission.",
    focusTitle: "Our Key Focus Areas",
    services: [
      {
        icon: Shield,
        title: "Protection Against NBFC & Bank Recovery Harassment",
        points: [
          "Loan recovery must always be conducted in a lawful and humane manner.",
          "Any form of harassment, threats, abuse, or coercion is strictly unacceptable.",
          "Recovery agents must operate within RBI-prescribed ethical guidelines.",
        ],
      },
      {
        icon: Scale,
        title: "RBI Fair Practices & Recovery Guidelines",
        points: [
          "Recovery agents must follow a strict code of conduct.",
          "No harassment, intimidation, public humiliation, threats, or violence allowed.",
          "Communication must be respectful and within permitted hours.",
          "Written notice must be issued before any recovery action.",
        ],
      },
      {
        icon: Gavel,
        title: "Legal Support & Public Guidance",
        points: [
          "We provide awareness and guidance to citizens facing recovery-related issues.",
          "We help individuals understand their legal rights and how to act against violations.",
        ],
      },
      {
        icon: HandHeart,
        title: "Social Justice & Public Welfare",
        points: [
          "We support underprivileged and marginalized communities.",
          "We advocate for equal rights, dignity, and access to basic needs.",
          "We engage directly with people to resolve real-life problems.",
        ],
      },
    ],
    journeyTitle: "Our Journey",
    journey: "With 7+ years of continuous service, MJMK has grown into a trusted movement committed to public welfare, justice, and human dignity.",
    conclusion: "MJMK is not just a political organization — It is a movement for rights, a voice for justice, and a force for humane governance.",
  },
};

const AboutSection = () => {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-2">{t.title}</h2>
        <p className="text-center text-lg font-bold text-primary mb-2">{t.subtitle}</p>
        <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />

        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-12">
          {t.intro.map((p, i) => (
            <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-4">{p}</p>
          ))}
          <blockquote className="border-l-4 border-primary pl-6 my-8">
            <p className="text-2xl font-black text-primary italic">{t.quote}</p>
            <p className="text-muted-foreground mt-2">{t.quoteDesc}</p>
          </blockquote>
        </div>

        {/* Focus Areas - Left/Right layout */}
        <h3 className="text-2xl md:text-3xl font-black text-center text-foreground mb-10">{t.focusTitle}</h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {t.services.map((s, i) => (
            <div key={i} className="p-6 rounded-xl bg-muted shadow-card border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <s.icon size={28} />
                </div>
                <h4 className="text-lg font-bold text-foreground">{s.title}</h4>
              </div>
              <ul className="space-y-2">
                {s.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">✦</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Journey */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-black text-foreground mb-4">{t.journeyTitle}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.journey}</p>
          <div className="p-6 rounded-xl gradient-green text-primary-foreground">
            <p className="text-xl font-bold leading-relaxed">{t.conclusion}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

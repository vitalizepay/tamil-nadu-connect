import { Shield, Users, Heart, Scale } from "lucide-react";

const points = [
  { icon: Users, text: "மக்கள் நலனுக்கான அரசியல் இயக்கம்" },
  { icon: Shield, text: "NBFC & வங்கி வசூல் தொல்லையிலிருந்து மக்களைக் காத்தல்" },
  { icon: Heart, text: "ஏழை மற்றும் ஒடுக்கப்பட்ட மக்களுக்கு ஆதரவு" },
  { icon: Scale, text: "7+ ஆண்டுகள் தொடர்ச்சியான சேவை" },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-4">எங்களை பற்றி</h2>
      <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />

      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK) is a people-focused political movement dedicated to protecting the rights of common citizens across Tamil Nadu. For over 7 years, we have been the voice of the voiceless.
        </p>
        <p className="text-2xl font-black text-primary italic">
          "மக்கள் நலன் எங்கள் முதன்மை"
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {points.map((p, i) => (
          <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-muted shadow-card">
            <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
              <p.icon size={28} />
            </div>
            <p className="font-semibold text-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;

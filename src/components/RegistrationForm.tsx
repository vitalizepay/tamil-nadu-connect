import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserPlus, MapPin, Phone as PhoneIcon, Briefcase, Mail, Users } from "lucide-react";

const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
  "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];

const t = {
  ta: {
    title: "உறுப்பினர் பதிவு",
    subtitle: "எங்களுடன் இணைந்து மாற்றத்தை உருவாக்குங்கள்",
    name: "முழு பெயர் *",
    mobile: "கைபேசி எண் *",
    district: "மாவட்டம் தேர்வு செய்க *",
    address: "முகவரி *",
    age: "வயது",
    occupation: "தொழில்",
    email: "மின்னஞ்சல் (விரும்பினால்)",
    supporter: "ஆதரவாளர் (Supporter)",
    volunteer: "தொண்டர் (Volunteer)",
    member: "உறுப்பினர் (Member)",
    submit: "பதிவு செய்யுங்கள்",
    thanks: "நன்றி!",
    success: "உங்கள் பதிவு வெற்றிகரமாக முடிந்தது",
    fillAll: "தயவுசெய்து அனைத்து தேவையான தகவல்களையும் நிரப்பவும்",
    error: "பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்",
    welcomeMsg: "MJMK குடும்பத்தில் இணையுங்கள்!",
  },
  en: {
    title: "Member Registration",
    subtitle: "Join us and be part of the change",
    name: "Full Name *",
    mobile: "Mobile Number *",
    district: "Select District *",
    address: "Address *",
    age: "Age",
    occupation: "Occupation",
    email: "Email (optional)",
    supporter: "Supporter",
    volunteer: "Volunteer",
    member: "Member",
    submit: "Register Now",
    thanks: "Thank You!",
    success: "Your registration has been completed successfully",
    fillAll: "Please fill in all required fields",
    error: "Registration failed. Please try again",
    welcomeMsg: "Join the MJMK family!",
  },
};

const RegistrationForm = () => {
  const { lang } = useLanguage();
  const c = t[lang];
  const [form, setForm] = useState({
    name: "", mobile: "", district: "", address: "", age: "", occupation: "", email: "", interest: "Supporter"
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.district || !form.address.trim()) {
      toast({ title: c.fillAll, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("registrations").insert({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      district: form.district,
      address: form.address.trim(),
      age: form.age ? parseInt(form.age) : null,
      occupation: form.occupation.trim() || null,
      email: form.email.trim() || null,
      interest: form.interest,
    });
    setLoading(false);
    if (error) {
      toast({ title: c.error, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: c.success });
  };

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  if (submitted) {
    return (
      <section id="register" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto p-10 rounded-2xl shadow-card bg-secondary text-secondary-foreground relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
            <div className="text-7xl mb-4 animate-count-up">✅</div>
            <h3 className="text-2xl font-black mb-2">{c.thanks}</h3>
            <p className="font-semibold text-lg">{c.success}</p>
          </div>
        </div>
      </section>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200";

  return (
    <section id="register" className="py-20 bg-muted relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">{c.title}</h2>
          <p className="text-lg text-muted-foreground font-semibold">{c.subtitle}</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 p-8 rounded-2xl shadow-card bg-background border border-border/50 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-2xl" />
          
          <p className="text-center text-primary font-bold text-lg pb-2">{c.welcomeMsg}</p>

          <div className="relative">
            <UserPlus size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className={`${inputClass} pl-10`} placeholder={c.name} value={form.name} onChange={e => update("name", e.target.value)} required maxLength={100} />
          </div>
          
          <div className="relative">
            <PhoneIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className={`${inputClass} pl-10`} placeholder={c.mobile} value={form.mobile} onChange={e => update("mobile", e.target.value)} required maxLength={15} type="tel" />
          </div>

          <select className={inputClass} value={form.district} onChange={e => update("district", e.target.value)} required>
            <option value="">{c.district}</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-4 text-muted-foreground" />
            <textarea className={`${inputClass} pl-10 min-h-[80px] resize-none`} placeholder={c.address} value={form.address} onChange={e => update("address", e.target.value)} required maxLength={300} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input className={inputClass} placeholder={c.age} value={form.age} onChange={e => update("age", e.target.value)} type="number" min="18" max="100" />
            <div className="relative">
              <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input className={`${inputClass} pl-10`} placeholder={c.occupation} value={form.occupation} onChange={e => update("occupation", e.target.value)} maxLength={50} />
            </div>
          </div>

          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className={`${inputClass} pl-10`} placeholder={c.email} value={form.email} onChange={e => update("email", e.target.value)} type="email" maxLength={255} />
          </div>

          <div className="relative">
            <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select className={`${inputClass} pl-10`} value={form.interest} onChange={e => update("interest", e.target.value)}>
              <option value="Supporter">{c.supporter}</option>
              <option value="Volunteer">{c.volunteer}</option>
              <option value="Member">{c.member}</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full gradient-red-btn text-primary-foreground font-bold text-lg py-4 rounded-xl shadow-strong hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50">
            {loading ? "..." : c.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;

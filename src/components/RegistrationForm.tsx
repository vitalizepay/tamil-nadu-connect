import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const districts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Tirupur", "Erode", "Vellore", "Thanjavur",
  "Dindigul", "Kanchipuram", "Cuddalore", "Other"
];

const t = {
  ta: {
    title: "உறுப்பினர் பதிவு",
    name: "முழு பெயர் *",
    mobile: "கைபேசி எண் *",
    district: "மாவட்டம் தேர்வு செய்க *",
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
  },
  en: {
    title: "Member Registration",
    name: "Full Name *",
    mobile: "Mobile Number *",
    district: "Select District *",
    age: "Age",
    occupation: "Occupation",
    email: "Email (optional)",
    supporter: "Supporter",
    volunteer: "Volunteer",
    member: "Member",
    submit: "Register",
    thanks: "Thank You!",
    success: "Your registration has been completed successfully",
    fillAll: "Please fill in all required fields",
    error: "Registration failed. Please try again",
  },
};

const RegistrationForm = () => {
  const { lang } = useLanguage();
  const c = t[lang];
  const [form, setForm] = useState({
    name: "", mobile: "", district: "", age: "", occupation: "", email: "", interest: "Supporter"
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.district) {
      toast({ title: c.fillAll, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("registrations").insert({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      district: form.district,
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
          <div className="max-w-md mx-auto p-10 rounded-xl shadow-card bg-secondary text-secondary-foreground">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-black mb-2">{c.thanks}</h3>
            <p className="font-semibold">{c.success}</p>
          </div>
        </div>
      </section>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <section id="register" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-4">{c.title}</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 p-8 rounded-xl shadow-card bg-muted">
          <input className={inputClass} placeholder={c.name} value={form.name} onChange={e => update("name", e.target.value)} required maxLength={100} />
          <input className={inputClass} placeholder={c.mobile} value={form.mobile} onChange={e => update("mobile", e.target.value)} required maxLength={15} type="tel" />
          <select className={inputClass} value={form.district} onChange={e => update("district", e.target.value)} required>
            <option value="">{c.district}</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input className={inputClass} placeholder={c.age} value={form.age} onChange={e => update("age", e.target.value)} type="number" min="18" max="100" />
            <input className={inputClass} placeholder={c.occupation} value={form.occupation} onChange={e => update("occupation", e.target.value)} maxLength={50} />
          </div>
          <input className={inputClass} placeholder={c.email} value={form.email} onChange={e => update("email", e.target.value)} type="email" maxLength={255} />
          <select className={inputClass} value={form.interest} onChange={e => update("interest", e.target.value)}>
            <option value="Supporter">{c.supporter}</option>
            <option value="Volunteer">{c.volunteer}</option>
            <option value="Member">{c.member}</option>
          </select>
          <button type="submit" disabled={loading} className="w-full gradient-red-btn text-primary-foreground font-bold text-lg py-4 rounded-lg shadow-strong hover:scale-105 transition-transform disabled:opacity-50">
            {loading ? "..." : c.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const issueTypes = ["NBFC", "Bank", "Collection Harassment", "Other"];
const districts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Tirupur", "Erode", "Vellore", "Thanjavur", "Other"
];

const t = {
  ta: {
    title: "உங்கள் பிரச்சினையை தெரிவிக்கவும்",
    name: "பெயர் *",
    phone: "கைபேசி எண் *",
    district: "மாவட்டம்",
    issueType: "பிரச்சினை வகை *",
    description: "விவரம்",
    submit: "அனுப்பவும்",
    received: "பெறப்பட்டது!",
    success: "உங்கள் கோரிக்கை பெறப்பட்டது. விரைவில் தொடர்பு கொள்கிறோம்",
    fillAll: "தயவுசெய்து அனைத்து தேவையான தகவல்களையும் நிரப்பவும்",
  },
  en: {
    title: "Report Your Issue",
    name: "Name *",
    phone: "Phone Number *",
    district: "District",
    issueType: "Issue Type *",
    description: "Description",
    submit: "Submit",
    received: "Received!",
    success: "Your request has been received. We will contact you soon",
    fillAll: "Please fill in all required fields",
  },
};

const ComplaintForm = () => {
  const { lang } = useLanguage();
  const c = t[lang];
  const [form, setForm] = useState({ name: "", phone: "", district: "", issueType: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.issueType) {
      toast({ title: c.fillAll, variant: "destructive" });
      return;
    }
    const existing = JSON.parse(localStorage.getItem("mjmk_complaints") || "[]");
    existing.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem("mjmk_complaints", JSON.stringify(existing));
    setSubmitted(true);
    toast({ title: c.success });
  };

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));
  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary";

  if (submitted) {
    return (
      <section id="complaint" className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto p-10 rounded-xl shadow-card bg-secondary text-secondary-foreground">
            <div className="text-6xl mb-4">📩</div>
            <h3 className="text-2xl font-black mb-2">{c.received}</h3>
            <p className="font-semibold">{c.success}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="complaint" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-4">{c.title}</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 p-8 rounded-xl shadow-card bg-background">
          <input className={inputClass} placeholder={c.name} value={form.name} onChange={e => update("name", e.target.value)} required maxLength={100} />
          <input className={inputClass} placeholder={c.phone} value={form.phone} onChange={e => update("phone", e.target.value)} required type="tel" maxLength={15} />
          <select className={inputClass} value={form.district} onChange={e => update("district", e.target.value)}>
            <option value="">{c.district}</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className={inputClass} value={form.issueType} onChange={e => update("issueType", e.target.value)} required>
            <option value="">{c.issueType}</option>
            {issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <textarea className={inputClass + " min-h-[120px]"} placeholder={c.description} value={form.description} onChange={e => update("description", e.target.value)} maxLength={1000} />
          <button type="submit" className="w-full gradient-red-btn text-primary-foreground font-bold text-lg py-4 rounded-lg shadow-strong hover:scale-105 transition-transform">
            {c.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ComplaintForm;

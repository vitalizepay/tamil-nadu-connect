import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const districts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Tirupur", "Erode", "Vellore", "Thanjavur",
  "Dindigul", "Kanchipuram", "Cuddalore", "Other"
];

const RegistrationForm = () => {
  const [form, setForm] = useState({
    name: "", mobile: "", district: "", age: "", occupation: "", email: "", interest: "Supporter"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.district) {
      toast({ title: "தயவுசெய்து அனைத்து தேவையான தகவல்களையும் நிரப்பவும்", variant: "destructive" });
      return;
    }
    // Store locally
    const existing = JSON.parse(localStorage.getItem("mjmk_members") || "[]");
    existing.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem("mjmk_members", JSON.stringify(existing));
    setSubmitted(true);
    toast({ title: "நன்றி! உங்கள் பதிவு வெற்றிகரமாக முடிந்தது" });
  };

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  if (submitted) {
    return (
      <section id="register" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto p-10 rounded-xl shadow-card bg-secondary text-secondary-foreground">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-black mb-2">நன்றி!</h3>
            <p className="font-semibold">உங்கள் பதிவு வெற்றிகரமாக முடிந்தது</p>
          </div>
        </div>
      </section>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <section id="register" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-4">உறுப்பினர் பதிவு</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full" />

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 p-8 rounded-xl shadow-card bg-muted">
          <input className={inputClass} placeholder="முழு பெயர் *" value={form.name} onChange={e => update("name", e.target.value)} required maxLength={100} />
          <input className={inputClass} placeholder="கைபேசி எண் *" value={form.mobile} onChange={e => update("mobile", e.target.value)} required maxLength={15} type="tel" />
          <select className={inputClass} value={form.district} onChange={e => update("district", e.target.value)} required>
            <option value="">மாவட்டம் தேர்வு செய்க *</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input className={inputClass} placeholder="வயது" value={form.age} onChange={e => update("age", e.target.value)} type="number" min="18" max="100" />
            <input className={inputClass} placeholder="தொழில்" value={form.occupation} onChange={e => update("occupation", e.target.value)} maxLength={50} />
          </div>
          <input className={inputClass} placeholder="மின்னஞ்சல் (விரும்பினால்)" value={form.email} onChange={e => update("email", e.target.value)} type="email" maxLength={255} />
          <select className={inputClass} value={form.interest} onChange={e => update("interest", e.target.value)}>
            <option value="Supporter">ஆதரவாளர் (Supporter)</option>
            <option value="Volunteer">தொண்டர் (Volunteer)</option>
            <option value="Member">உறுப்பினர் (Member)</option>
          </select>
          <button type="submit" className="w-full gradient-red-btn text-primary-foreground font-bold text-lg py-4 rounded-lg shadow-strong hover:scale-105 transition-transform">
            பதிவு செய்யுங்கள்
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;

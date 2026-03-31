import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Phone, Mail, MapPin, Building2, MessageSquare, Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";

const tamilNaduDistricts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
  "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
  "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
  "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur",
  "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur",
  "Tirupur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
  "Viluppuram", "Virudhunagar"
];

const complaintTypes = [
  { value: "Harassment", ta: "தொல்லை", en: "Harassment" },
  { value: "Recovery Issue", ta: "வசூல் பிரச்சினை", en: "Recovery Issue" },
  { value: "Loan Fraud", ta: "கடன் மோசடி", en: "Loan Fraud" },
  { value: "Others", ta: "மற்றவை", en: "Others" },
];

const t = {
  ta: {
    title: "புகார் பதிவு படிவம்",
    subtitle: "உங்கள் பிரச்சினையை பதிவு செய்யுங்கள் — நாங்கள் உங்களுக்காக குரல் கொடுப்போம்",
    name: "முழுப் பெயர்",
    phone: "கைபேசி எண்",
    email: "மின்னஞ்சல்",
    district: "மாவட்டம் தேர்வு செய்யவும்",
    bankName: "வங்கி / NBFC பெயர்",
    complaintType: "புகார் வகை தேர்வு செய்யவும்",
    comments: "விவரமான விளக்கம் (குறைந்தபட்சம் 20 எழுத்துகள்)",
    upload: "ஆதாரம் பதிவேற்றம் (விருப்பம்)",
    uploadHint: "படம் அல்லது PDF (அதிகபட்சம் 5MB)",
    submit: "புகார் பதிவு செய்",
    submitting: "பதிவு செய்கிறது...",
    success: "புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது!",
    successSub: "உங்கள் புகார் எண்:",
    fillAll: "தயவுசெய்து அனைத்து தேவையான தகவல்களையும் சரியாக நிரப்பவும்",
    phoneError: "சரியான 10 இலக்க கைபேசி எண் உள்ளிடவும்",
    emailError: "சரியான மின்னஞ்சல் முகவரி உள்ளிடவும்",
    commentsError: "குறைந்தபட்சம் 20 எழுத்துகள் தேவை",
    newComplaint: "புதிய புகார் பதிவு",
    fileTooBig: "கோப்பு அளவு 5MB-க்கு குறைவாக இருக்க வேண்டும்",
  },
  en: {
    title: "Complaint Registration Form",
    subtitle: "Register your issue — We will raise our voice for you",
    name: "Full Name",
    phone: "Phone Number",
    email: "Email ID",
    district: "Select District",
    bankName: "Bank / NBFC Name",
    complaintType: "Select Complaint Type",
    comments: "Detailed Description (minimum 20 characters)",
    upload: "Upload Proof (Optional)",
    uploadHint: "Image or PDF (max 5MB)",
    submit: "Submit Complaint",
    submitting: "Submitting...",
    success: "Complaint registered successfully!",
    successSub: "Your Complaint ID:",
    fillAll: "Please fill in all required fields correctly",
    phoneError: "Enter a valid 10-digit phone number",
    emailError: "Enter a valid email address",
    commentsError: "Minimum 20 characters required",
    newComplaint: "Submit Another Complaint",
    fileTooBig: "File size must be less than 5MB",
  },
};

const generateComplaintId = () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MJMK-${dateStr}-${rand}`;
};

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  district?: string;
  bankName?: string;
  complaintType?: string;
  comments?: string;
}

const ComplaintForm = () => {
  const { lang } = useLanguage();
  const c = t[lang];
  const [form, setForm] = useState({
    name: "", phone: "", email: "", district: "", bankName: "", complaintType: "", comments: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = c.fillAll;
    if (!/^\d{10}$/.test(form.phone)) errs.phone = c.phoneError;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = c.emailError;
    if (!form.district) errs.district = c.fillAll;
    if (!form.bankName.trim()) errs.bankName = c.fillAll;
    if (!form.complaintType) errs.complaintType = c.fillAll;
    if (form.comments.trim().length < 20) errs.comments = c.commentsError;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      let fileUrl: string | null = null;

      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("complaint-proofs")
          .upload(path, file);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage
          .from("complaint-proofs")
          .getPublicUrl(path);
        fileUrl = urlData.publicUrl;
      }

      const cid = generateComplaintId();
      const { error } = await supabase.from("complaints").insert({
        complaint_id: cid,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        district: form.district,
        bank_name: form.bankName.trim(),
        complaint_type: form.complaintType,
        comments: form.comments.trim(),
        file_url: fileUrl,
      });

      if (error) throw error;
      setComplaintId(cid);
      setSubmitted(true);
      toast({ title: c.success });
    } catch (err: any) {
      toast({ title: err.message || "Error", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(p => ({ ...p, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.size > 5 * 1024 * 1024) {
      toast({ title: c.fileTooBig, variant: "destructive" });
      return;
    }
    setFile(f || null);
  };

  const inputBase = "w-full px-4 py-3 pl-12 rounded-xl border bg-background text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200";
  const inputOk = "border-border";
  const inputErr = "border-destructive ring-1 ring-destructive";

  if (submitted) {
    return (
      <section id="complaint" className="py-20 bg-gradient-to-br from-muted via-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto p-10 rounded-2xl shadow-card bg-card border border-border">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-black mb-2 text-foreground">{c.success}</h3>
            <p className="font-semibold text-muted-foreground mb-4">{c.successSub}</p>
            <div className="bg-primary/10 text-primary font-black text-xl py-3 px-6 rounded-xl inline-block mb-6">
              {complaintId}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", phone: "", email: "", district: "", bankName: "", complaintType: "", comments: "" });
                setFile(null);
              }}
              className="block w-full gradient-red-btn text-primary-foreground font-bold py-3 rounded-xl hover:scale-105 transition-transform"
            >
              {c.newComplaint}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="complaint" className="py-20 bg-gradient-to-br from-muted via-background to-muted relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{c.title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground font-semibold max-w-lg mx-auto">{c.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5 p-8 md:p-10 rounded-2xl shadow-card bg-card border border-border backdrop-blur-sm">
          {/* Name */}
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input className={`${inputBase} ${errors.name ? inputErr : inputOk}`} placeholder={c.name + " *"} value={form.name} onChange={e => update("name", e.target.value)} maxLength={100} />
            </div>
            {errors.name && <p className="text-destructive text-sm mt-1 font-semibold">{errors.name}</p>}
          </div>

          {/* Phone & Email row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input className={`${inputBase} ${errors.phone ? inputErr : inputOk}`} placeholder={c.phone + " *"} value={form.phone} onChange={e => update("phone", e.target.value.replace(/\D/g, ""))} maxLength={10} type="tel" />
              </div>
              {errors.phone && <p className="text-destructive text-sm mt-1 font-semibold">{errors.phone}</p>}
            </div>
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input className={`${inputBase} ${errors.email ? inputErr : inputOk}`} placeholder={c.email + " *"} value={form.email} onChange={e => update("email", e.target.value)} maxLength={255} type="email" />
              </div>
              {errors.email && <p className="text-destructive text-sm mt-1 font-semibold">{errors.email}</p>}
            </div>
          </div>

          {/* District & Bank row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <select className={`${inputBase} ${errors.district ? inputErr : inputOk}`} value={form.district} onChange={e => update("district", e.target.value)}>
                  <option value="">{c.district} *</option>
                  {tamilNaduDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {errors.district && <p className="text-destructive text-sm mt-1 font-semibold">{errors.district}</p>}
            </div>
            <div>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input className={`${inputBase} ${errors.bankName ? inputErr : inputOk}`} placeholder={c.bankName + " *"} value={form.bankName} onChange={e => update("bankName", e.target.value)} maxLength={200} />
              </div>
              {errors.bankName && <p className="text-destructive text-sm mt-1 font-semibold">{errors.bankName}</p>}
            </div>
          </div>

          {/* Complaint Type */}
          <div>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <select className={`${inputBase} ${errors.complaintType ? inputErr : inputOk}`} value={form.complaintType} onChange={e => update("complaintType", e.target.value)}>
                <option value="">{c.complaintType} *</option>
                {complaintTypes.map(ct => (
                  <option key={ct.value} value={ct.value}>{lang === "ta" ? ct.ta : ct.en}</option>
                ))}
              </select>
            </div>
            {errors.complaintType && <p className="text-destructive text-sm mt-1 font-semibold">{errors.complaintType}</p>}
          </div>

          {/* Comments */}
          <div>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-muted-foreground w-5 h-5" />
              <textarea
                className={`${inputBase} min-h-[130px] pt-4 ${errors.comments ? inputErr : inputOk}`}
                placeholder={c.comments + " *"}
                value={form.comments}
                onChange={e => update("comments", e.target.value)}
                maxLength={2000}
              />
            </div>
            <div className="flex justify-between mt-1">
              {errors.comments && <p className="text-destructive text-sm font-semibold">{errors.comments}</p>}
              <p className="text-muted-foreground text-xs ml-auto">{form.comments.length}/2000</p>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">
              <Upload className="inline w-4 h-4 mr-1" />
              {c.upload}
            </label>
            <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {file ? (
                <p className="text-sm font-semibold text-foreground">{file.name}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{c.uploadHint}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full gradient-red-btn text-primary-foreground font-bold text-lg py-4 rounded-xl shadow-strong hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {c.submitting}
              </>
            ) : (
              c.submit
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ComplaintForm;

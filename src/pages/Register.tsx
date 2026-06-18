import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/mjmk-logo.png";

const MAX_IMG = 5 * 1024 * 1024; // 5 MB
const IMG_TYPES = ["image/jpeg", "image/png", "image/webp"];

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  father_name: z.string().trim().min(2).max(120),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().min(1, "Date of birth required"),
  blood_group: z.string().optional(),
  mobile_number: z.string().regex(/^\d{10}$/, "10-digit mobile required"),
  whatsapp_number: z.string().regex(/^\d{10}$/, "10-digit number").optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  voter_id_number: z.string().trim().min(5).max(30),
  state: z.string().min(1),
  district: z.string().min(1),
  taluk: z.string().optional(),
  village: z.string().min(1),
  address: z.string().min(5).max(500),
  membership_type: z.enum(["Primary Member", "Active Member", "Volunteer", "Supporter"]),
  designation: z.string().optional(),
  referral_name: z.string().optional(),
  referral_mobile: z.string().regex(/^\d{10}$/).optional().or(z.literal("")),
});

const fieldClass = "space-y-1.5";
const reqStar = <span className="text-destructive">*</span>;

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [voterImg, setVoterImg] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFile = (f: File | null, label: string) => {
    if (!f) return `${label} is required`;
    if (!IMG_TYPES.includes(f.type)) return `${label}: only JPG/PNG/WEBP`;
    if (f.size > MAX_IMG) return `${label}: max 5MB`;
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (!agreed) {
      toast.error("Please accept the declaration");
      return;
    }
    const photoErr = validateFile(photo, "Passport photo");
    const voterErr = validateFile(voterImg, "Voter ID image");
    if (photoErr || voterErr) {
      toast.error(photoErr || voterErr!);
      return;
    }
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path.join(".")] = i.message));
      setErrors(errs);
      toast.error("Please check the highlighted fields");
      return;
    }

    setSubmitting(true);
    try {
      const ts = Date.now();
      const safeMobile = parsed.data.mobile_number;
      const photoPath = `${safeMobile}/${ts}-photo.${photo!.name.split(".").pop()}`;
      const voterPath = `${safeMobile}/${ts}-voter.${voterImg!.name.split(".").pop()}`;

      const [photoUp, voterUp] = await Promise.all([
        supabase.storage.from("member-photos").upload(photoPath, photo!, { upsert: false }),
        supabase.storage.from("member-voter-ids").upload(voterPath, voterImg!, { upsert: false }),
      ]);
      if (photoUp.error) throw photoUp.error;
      if (voterUp.error) throw voterUp.error;

      const { error } = await supabase.from("members").insert({
        ...parsed.data,
        whatsapp_number: parsed.data.whatsapp_number || null,
        email: parsed.data.email || null,
        referral_mobile: parsed.data.referral_mobile || null,
        photo_url: photoUp.data.path,
        voter_id_url: voterUp.data.path,
      });
      if (error) {
        if (error.code === "23505") {
          toast.error("A member with this mobile number or Voter ID already exists");
        } else {
          toast.error(error.message);
        }
        return;
      }
      setDone(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Helmet>
          <title>Registration Submitted — MJMK</title>
          <meta name="description" content="Your MJMK membership application has been received." />
        </Helmet>
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-secondary" />
            <CardTitle className="text-2xl mt-3">Application Submitted</CardTitle>
            <CardDescription className="text-base">
              Thank you for joining MJMK. Your membership application is now <strong>Pending</strong> admin
              approval. You will receive your digital ID card and membership number on WhatsApp once approved.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/"><Button>Back to Home</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4">
      <Helmet>
        <title>Member Registration — MJMK</title>
        <meta name="description" content="Register as a member of Makkal Jananayaka Munnetra Kazhagam (MJMK)." />
        <link rel="canonical" href="https://mkmj-munnetram-sangam.lovable.app/register" />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img src={logo} alt="MJMK Logo" className="h-16 w-16 rounded-full border-2 border-accent mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-black text-foreground">MJMK Member Registration</h1>
          <p className="text-muted-foreground mt-2">மக்கள் ஜனநாயக முன்னேற்ற கழகம் — Join the movement</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Personal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className={fieldClass + " sm:col-span-2"}>
                <Label>Passport Photo {reqStar}</Label>
                <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{photo?.name ?? "Upload JPG/PNG/WEBP (max 5MB)"}</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                    onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
                </label>
              </div>
              <div className={fieldClass}>
                <Label>Full Name {reqStar}</Label>
                <Input name="full_name" required />
                {errors.full_name && <p className="text-xs text-destructive">{errors.full_name}</p>}
              </div>
              <div className={fieldClass}>
                <Label>Father's Name {reqStar}</Label>
                <Input name="father_name" required />
                {errors.father_name && <p className="text-xs text-destructive">{errors.father_name}</p>}
              </div>
              <div className={fieldClass}>
                <Label>Gender {reqStar}</Label>
                <Select name="gender" required>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className={fieldClass}>
                <Label>Date of Birth {reqStar}</Label>
                <Input name="dob" type="date" required />
              </div>
              <div className={fieldClass}>
                <Label>Blood Group</Label>
                <Select name="blood_group">
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className={fieldClass}>
                <Label>Mobile Number {reqStar}</Label>
                <Input name="mobile_number" required maxLength={10} placeholder="10-digit" />
                {errors.mobile_number && <p className="text-xs text-destructive">{errors.mobile_number}</p>}
              </div>
              <div className={fieldClass}>
                <Label>WhatsApp Number</Label>
                <Input name="whatsapp_number" maxLength={10} />
              </div>
              <div className={fieldClass + " sm:col-span-2"}>
                <Label>Email</Label>
                <Input name="email" type="email" />
              </div>
            </CardContent>
          </Card>

          {/* Identity */}
          <Card>
            <CardHeader><CardTitle className="text-xl">Identity Verification</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className={fieldClass}>
                <Label>Voter ID Number {reqStar}</Label>
                <Input name="voter_id_number" required />
                {errors.voter_id_number && <p className="text-xs text-destructive">{errors.voter_id_number}</p>}
              </div>
              <div className={fieldClass}>
                <Label>Voter ID Image {reqStar}</Label>
                <label className="flex items-center gap-3 border rounded-md p-2.5 cursor-pointer hover:bg-muted/50">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">{voterImg?.name ?? "Upload image"}</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                    onChange={(e) => setVoterImg(e.target.files?.[0] ?? null)} />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader><CardTitle className="text-xl">Location</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className={fieldClass}>
                <Label>State {reqStar}</Label>
                <Input name="state" defaultValue="Tamil Nadu" required />
              </div>
              <div className={fieldClass}>
                <Label>District {reqStar}</Label>
                <Input name="district" required />
              </div>
              <div className={fieldClass}>
                <Label>Taluk</Label>
                <Input name="taluk" />
              </div>
              <div className={fieldClass}>
                <Label>Village / City {reqStar}</Label>
                <Input name="village" required />
              </div>
              <div className={fieldClass + " sm:col-span-2"}>
                <Label>Full Address {reqStar}</Label>
                <Textarea name="address" rows={3} required />
                {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Party */}
          <Card>
            <CardHeader><CardTitle className="text-xl">Party Information</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className={fieldClass}>
                <Label>Membership Type {reqStar}</Label>
                <Select name="membership_type" defaultValue="Primary Member" required>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Primary Member","Active Member","Volunteer","Supporter"].map(t =>
                      <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className={fieldClass}>
                <Label>Position Applying For</Label>
                <Input name="designation" placeholder="e.g. District Secretary" />
              </div>
              <div className={fieldClass}>
                <Label>Referral Member Name</Label>
                <Input name="referral_name" />
              </div>
              <div className={fieldClass}>
                <Label>Referral Mobile</Label>
                <Input name="referral_mobile" maxLength={10} />
              </div>
            </CardContent>
          </Card>

          {/* Declaration */}
          <Card>
            <CardContent className="pt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox checked={agreed} onCheckedChange={(c) => setAgreed(!!c)} className="mt-0.5" />
                <span className="text-sm text-foreground">
                  I declare that the information provided is accurate and I agree to follow MJMK principles and code of conduct.
                </span>
              </label>
            </CardContent>
          </Card>

          <Button type="submit" disabled={submitting} size="lg" className="w-full">
            {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : "Submit Application"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Your application will be reviewed by our admin team. Approved members receive a digital ID card via WhatsApp.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

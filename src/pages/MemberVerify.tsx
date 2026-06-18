import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/mjmk-logo.png";

interface PublicMember {
  membership_number: string;
  full_name: string;
  photo_url: string | null;
  district: string | null;
  designation: string | null;
  blood_group: string | null;
  approved_at: string | null;
}

const MemberVerify = () => {
  const { number } = useParams<{ number: string }>();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<PublicMember | null>(null);
  const [photoSigned, setPhotoSigned] = useState<string | null>(null);

  useEffect(() => {
    if (!number) return;
    (async () => {
      const { data } = await supabase
        .from("public_members" as never)
        .select("*")
        .eq("membership_number", number)
        .maybeSingle<PublicMember>();
      setMember(data);
      if (data?.photo_url) {
        const { data: signed } = await supabase.storage
          .from("member-photos")
          .createSignedUrl(data.photo_url, 60 * 60);
        setPhotoSigned(signed?.signedUrl ?? null);
      }
      setLoading(false);
    })();
  }, [number]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/40 to-background p-4">
      <Helmet>
        <title>{member ? `${member.full_name} — Verified MJMK Member` : "Member Verification — MJMK"}</title>
        <meta name="description" content="Verify an MJMK member's identity." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <Card className="max-w-md w-full overflow-hidden">
        <div className="bg-primary p-4 flex items-center gap-3">
          <img src={logo} alt="MJMK" className="h-10 w-10 rounded-full border-2 border-accent" />
          <div className="text-primary-foreground">
            <p className="font-black leading-tight">MJMK</p>
            <p className="text-xs opacity-90">Member Verification</p>
          </div>
        </div>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex flex-col items-center py-10 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-2" /> Verifying...
            </div>
          ) : !member ? (
            <div className="text-center py-8">
              <XCircle className="h-14 w-14 text-destructive mx-auto mb-3" />
              <h2 className="text-xl font-bold">Not Verified</h2>
              <p className="text-sm text-muted-foreground mt-1">
                No approved MJMK member found with number <strong>{number}</strong>.
              </p>
              <Link to="/" className="text-accent font-semibold mt-4 inline-block">← Back to MJMK</Link>
            </div>
          ) : (
            <div className="text-center">
              {photoSigned ? (
                <img src={photoSigned} alt={member.full_name}
                  className="h-32 w-32 rounded-full object-cover mx-auto border-4 border-accent" />
              ) : (
                <div className="h-32 w-32 rounded-full bg-muted mx-auto" />
              )}
              <h2 className="text-2xl font-bold mt-4">{member.full_name}</h2>
              <p className="font-mono text-sm text-primary font-bold">{member.membership_number}</p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" /> Verified MJMK Member
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-left">
                {member.district && <div><p className="text-muted-foreground text-xs">District</p><p className="font-semibold">{member.district}</p></div>}
                {member.designation && <div><p className="text-muted-foreground text-xs">Designation</p><p className="font-semibold">{member.designation}</p></div>}
                {member.blood_group && <div><p className="text-muted-foreground text-xs">Blood Group</p><p className="font-semibold">{member.blood_group}</p></div>}
                {member.approved_at && <div><p className="text-muted-foreground text-xs">Approved</p><p className="font-semibold">{new Date(member.approved_at).toLocaleDateString()}</p></div>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberVerify;

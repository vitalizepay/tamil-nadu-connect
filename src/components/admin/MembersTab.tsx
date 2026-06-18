import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, XCircle, PauseCircle, Eye, Loader2 } from "lucide-react";

interface Member {
  id: string;
  membership_number: string | null;
  full_name: string;
  father_name: string;
  mobile_number: string;
  whatsapp_number: string | null;
  email: string | null;
  voter_id_number: string;
  district: string | null;
  village: string | null;
  membership_type: string | null;
  designation: string | null;
  status: "Pending" | "Approved" | "Rejected" | "Suspended";
  photo_url: string | null;
  voter_id_url: string | null;
  created_at: string;
  approved_at: string | null;
}

const statusColors: Record<string, string> = {
  Pending: "bg-accent/10 text-accent",
  Approved: "bg-secondary/10 text-secondary",
  Rejected: "bg-destructive/10 text-destructive",
  Suspended: "bg-muted text-muted-foreground",
};

const MembersTab = () => {
  const [rows, setRows] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | Member["status"]>("All");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("members" as never)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Member[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const approve = async (m: Member) => {
    setBusyId(m.id);
    const { data, error } = await (supabase.rpc as any)("approve_member", { _member_id: m.id });
    setBusyId(null);
    if (error) { toast.error(error.message); return; }
    toast.success(`Approved — Membership: ${data}`);
    load();
  };

  const setStatus = async (m: Member, status: Member["status"]) => {
    setBusyId(m.id);
    const { error } = await (supabase.from("members") as any).update({ status }).eq("id", m.id);
    setBusyId(null);
    if (error) { toast.error(error.message); return; }
    toast.success(`Status set to ${status}`);
    load();
  };

  const openFile = async (bucket: string, path: string | null) => {
    if (!path) return;
    const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const sendWhatsApp = (m: Member) => {
    const phone = (m.whatsapp_number || m.mobile_number).replace(/\D/g, "");
    const msg = `Welcome to MJMK.\nYour membership has been approved.\n\nMembership Number: ${m.membership_number}\n\nVerify: ${window.location.origin}/member/${m.membership_number}`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const filtered = rows.filter(r => {
    if (filter !== "All" && r.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        r.full_name.toLowerCase().includes(s) ||
        r.mobile_number.includes(s) ||
        r.voter_id_number.toLowerCase().includes(s) ||
        (r.membership_number ?? "").toLowerCase().includes(s) ||
        (r.district ?? "").toLowerCase().includes(s)
      );
    }
    return true;
  });

  const counts = {
    All: rows.length,
    Pending: rows.filter(r => r.status === "Pending").length,
    Approved: rows.filter(r => r.status === "Approved").length,
    Rejected: rows.filter(r => r.status === "Rejected").length,
    Suspended: rows.filter(r => r.status === "Suspended").length,
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(["All","Pending","Approved","Rejected","Suspended"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${filter===s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {s} ({counts[s]})
          </button>
        ))}
        <Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, mobile, voter ID, district..." className="ml-auto max-w-xs" />
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-10"><Loader2 className="inline animate-spin mr-2" />Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">No members.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2">Membership #</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Mobile</th>
                <th className="px-3 py-2">Voter ID</th>
                <th className="px-3 py-2">District</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Files</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="border-t border-border hover:bg-muted/30 align-top">
                  <td className="px-3 py-2 font-mono font-bold text-primary">{m.membership_number ?? "—"}</td>
                  <td className="px-3 py-2 font-semibold">{m.full_name}<br/><span className="text-xs text-muted-foreground">s/o {m.father_name}</span></td>
                  <td className="px-3 py-2">{m.mobile_number}</td>
                  <td className="px-3 py-2">{m.voter_id_number}</td>
                  <td className="px-3 py-2">{m.district ?? "—"}</td>
                  <td className="px-3 py-2">{m.membership_type ?? "—"}</td>
                  <td className="px-3 py-2 space-x-1">
                    <button onClick={()=>openFile("member-photos", m.photo_url)} className="text-accent hover:underline text-xs">Photo</button>
                    <span className="text-muted-foreground">·</span>
                    <button onClick={()=>openFile("member-voter-ids", m.voter_id_url)} className="text-accent hover:underline text-xs">Voter</button>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[m.status]}`}>{m.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {m.status !== "Approved" && (
                        <Button size="sm" variant="default" disabled={busyId===m.id} onClick={()=>approve(m)} className="h-7 px-2 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />Approve
                        </Button>
                      )}
                      {m.status === "Approved" && (
                        <>
                          <Button size="sm" variant="outline" onClick={()=>sendWhatsApp(m)} className="h-7 px-2 text-xs">WhatsApp</Button>
                          <Button size="sm" variant="outline" onClick={()=>window.open(`/member/${m.membership_number}`,"_blank")} className="h-7 px-2 text-xs"><Eye className="h-3 w-3" /></Button>
                        </>
                      )}
                      {m.status !== "Rejected" && (
                        <Button size="sm" variant="outline" disabled={busyId===m.id} onClick={()=>setStatus(m,"Rejected")} className="h-7 px-2 text-xs"><XCircle className="h-3 w-3" /></Button>
                      )}
                      {m.status !== "Suspended" && (
                        <Button size="sm" variant="outline" disabled={busyId===m.id} onClick={()=>setStatus(m,"Suspended")} className="h-7 px-2 text-xs"><PauseCircle className="h-3 w-3" /></Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembersTab;

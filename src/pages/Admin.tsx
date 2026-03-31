import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/mjmk-logo.png";
import { Link } from "react-router-dom";

interface Registration {
  id: string;
  name: string;
  mobile: string;
  district: string;
  address: string | null;
  age: number | null;
  occupation: string | null;
  email: string | null;
  interest: string;
  created_at: string;
}

interface Complaint {
  id: string;
  complaint_id: string;
  name: string;
  phone: string;
  email: string;
  district: string;
  bank_name: string;
  complaint_type: string;
  comments: string;
  file_url: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  Open: "bg-destructive/10 text-destructive",
  "In Progress": "bg-accent/10 text-accent",
  Resolved: "bg-secondary/10 text-secondary",
};

const Admin = () => {
  const [tab, setTab] = useState<"registrations" | "complaints">("registrations");
  const [regData, setRegData] = useState<Registration[]>([]);
  const [compData, setCompData] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (tab === "registrations") {
        const { data: rows } = await supabase
          .from("registrations")
          .select("*")
          .order("created_at", { ascending: false });
        if (rows) setRegData(rows as Registration[]);
      } else {
        const { data: rows } = await supabase
          .from("complaints")
          .select("*")
          .order("created_at", { ascending: false });
        if (rows) setCompData(rows as Complaint[]);
      }
      setLoading(false);
    };
    fetchData();
  }, [tab]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("complaints").update({ status }).eq("id", id);
    setCompData(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MJMK" className="h-10 w-10 rounded-full border-2 border-mjmk-cyan" />
          <h1 className="text-xl font-bold text-primary-foreground">MJMK Admin</h1>
        </div>
        <Link to="/" className="text-mjmk-cyan font-bold hover:underline">← Back to Site</Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("registrations")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${tab === "registrations" ? "bg-primary text-primary-foreground shadow-strong" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            உறுப்பினர் பதிவுகள் ({tab === "registrations" ? regData.length : "..."})
          </button>
          <button
            onClick={() => setTab("complaints")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${tab === "complaints" ? "bg-primary text-primary-foreground shadow-strong" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            புகார்கள் ({tab === "complaints" ? compData.length : "..."})
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-10">Loading...</p>
        ) : tab === "registrations" ? (
          regData.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">No registrations yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">#</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Name</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Mobile</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">District</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Address</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Age</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Occupation</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Email</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Interest</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {regData.map((r, i) => (
                    <tr key={r.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{r.name}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.mobile}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.district}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.address ?? "-"}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.age ?? "-"}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.occupation ?? "-"}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.email ?? "-"}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{r.interest}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          compData.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">No complaints yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">#</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Complaint ID</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Name</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Phone</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Email</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">District</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Bank/NBFC</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Type</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Proof</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Status</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {compData.map((c, i) => (
                    <tr key={c.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 text-sm font-mono font-bold text-primary">{c.complaint_id}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{c.name}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.phone}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.email}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.district}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.bank_name}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.complaint_type}</td>
                      <td className="px-4 py-3 text-sm">
                        {c.file_url ? (
                          <a href={c.file_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">View</a>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={c.status}
                          onChange={e => updateStatus(c.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border-0 cursor-pointer ${statusColors[c.status] || "bg-muted text-foreground"}`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Admin;

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

const Admin = () => {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && rows) setData(rows as Registration[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MJMK" className="h-10 w-10 rounded-full border-2 border-mjmk-cyan" />
          <h1 className="text-xl font-bold text-primary-foreground">MJMK Admin - Registrations</h1>
        </div>
        <Link to="/" className="text-mjmk-cyan font-bold hover:underline">← Back to Site</Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-foreground">
            உறுப்பினர் பதிவுகள் ({data.length})
          </h2>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-10">Loading...</p>
        ) : data.length === 0 ? (
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
                {data.map((r, i) => (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{r.name}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{r.mobile}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{r.district}</td>
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
        )}
      </div>
    </div>
  );
};

export default Admin;

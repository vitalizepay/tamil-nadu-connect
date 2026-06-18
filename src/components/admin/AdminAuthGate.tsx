import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const AdminAuthGate = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const check = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setAuthed(false); setIsAdmin(false); setLoading(false); return; }
    setAuthed(true);
    const { data } = await supabase
      .from("user_roles" as never)
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
    setLoading(false);
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    check();
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) toast.error(error.message);
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-muted-foreground" /></div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="max-w-sm w-full">
          <CardHeader className="text-center">
            <Lock className="h-10 w-10 mx-auto text-primary" />
            <CardTitle>Admin Sign In</CardTitle>
            <CardDescription>MJMK Admin Portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={signIn} className="space-y-3">
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
              <div className="space-y-1.5"><Label>Password</Label><Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
              <Button type="submit" disabled={submitting} className="w-full">{submitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Sign In"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="max-w-sm w-full text-center">
          <CardHeader><CardTitle>Not Authorized</CardTitle><CardDescription>Your account is signed in but is not an admin.</CardDescription></CardHeader>
          <CardContent><Button variant="outline" onClick={signOut}>Sign Out</Button></CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}<button onClick={signOut} className="fixed bottom-4 right-4 text-xs bg-card border px-3 py-1.5 rounded-lg shadow hover:bg-muted">Sign out</button></>;
};

export default AdminAuthGate;

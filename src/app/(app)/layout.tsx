import { Nav } from "@/components/nav";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const email = user.email ?? "";
  const initial = email.charAt(0);

  return (
    <div className="flex min-h-screen">
      <Nav userEmail={email} userInitial={initial} />
      <main className="flex-1 ml-60 min-h-screen bg-[#090A12]">
        {children}
      </main>
    </div>
  );
}

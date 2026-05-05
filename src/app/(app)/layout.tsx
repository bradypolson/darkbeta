import { Nav } from "@/components/nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="flex-1 ml-60 min-h-screen bg-[#090A12]">
        {children}
      </main>
    </div>
  );
}

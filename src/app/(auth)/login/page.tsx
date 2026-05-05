"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#090A12] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-[#35F2B9]/10 border border-[#35F2B9]/30 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#35F2B9" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 5V8M8 8V11M8 8H5M8 8H11" stroke="#35F2B9" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[#F7F8FF] font-semibold text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              DarkScan Pro
            </span>
          </div>
          <p className="text-[#A9B0C8] text-sm">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#A9B0C8] mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="w-full bg-[#0F1120] border border-[#1E2235] rounded-[6px] px-3 py-2.5 text-[#F7F8FF] text-sm placeholder:text-[#A9B0C8]/40 focus:outline-none focus:border-[#35F2B9]/50 focus:ring-1 focus:ring-[#35F2B9]/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#A9B0C8] mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#0F1120] border border-[#1E2235] rounded-[6px] px-3 py-2.5 text-[#F7F8FF] text-sm placeholder:text-[#A9B0C8]/40 focus:outline-none focus:border-[#35F2B9]/50 focus:ring-1 focus:ring-[#35F2B9]/20 transition"
            />
          </div>

          {error && (
            <div className="bg-[#2F0A0A] border border-[#F25C5C]/20 rounded-[6px] px-3 py-2.5 text-[#F25C5C] text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#35F2B9] hover:bg-[#2dd4a3] text-[#090A12] font-semibold text-sm rounded-[6px] px-4 py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="text-[#A9B0C8] hover:text-[#35F2B9] transition text-xs">
            Forgot password?
          </Link>
          <Link href="/signup" className="text-[#A9B0C8] hover:text-[#35F2B9] transition text-xs">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

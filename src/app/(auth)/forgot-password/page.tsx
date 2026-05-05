"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-[#090A12] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-[#142F34] border border-[#35F2B9]/30 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10L8 14L16 6" stroke="#35F2B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[#F7F8FF] font-semibold text-lg mb-2">Check your email</h2>
          <p className="text-[#A9B0C8] text-sm mb-6">
            Password reset instructions sent to <span className="text-[#F7F8FF]">{email}</span>.
          </p>
          <Link href="/login" className="text-[#35F2B9] hover:underline text-sm">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090A12] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-[#F7F8FF] font-semibold text-xl mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Reset password
          </h1>
          <p className="text-[#A9B0C8] text-sm">
            Enter your email and we&apos;ll send a reset link.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
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
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-[#A9B0C8] hover:text-[#35F2B9] transition text-xs">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });
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
        <div className="mb-8">
          <h1 className="text-[#F7F8FF] font-semibold text-xl mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Set new password
          </h1>
          <p className="text-[#A9B0C8] text-sm">Choose a strong password for your account.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#A9B0C8] mb-1.5 uppercase tracking-wide">
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Min. 8 characters"
              className="w-full bg-[#0F1120] border border-[#1E2235] rounded-[6px] px-3 py-2.5 text-[#F7F8FF] text-sm placeholder:text-[#A9B0C8]/40 focus:outline-none focus:border-[#35F2B9]/50 focus:ring-1 focus:ring-[#35F2B9]/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#A9B0C8] mb-1.5 uppercase tracking-wide">
              Confirm password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="Re-enter password"
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
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

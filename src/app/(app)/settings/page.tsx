import type { Metadata } from "next";
import { Settings, Building2, Users, Key, Bell, Shield } from "lucide-react";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[800px] space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-1">
          Configuration
        </p>
        <h1 className="font-display text-2xl font-semibold text-[#F7F8FF]">
          Settings
        </h1>
      </div>

      {/* Organization */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5" />
          Organization
        </h2>
        <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] divide-y divide-[#1E2235]">
          {[
            { label: "Organization Name", value: "Demo Organization" },
            { label: "Industry", value: "Healthcare" },
            { label: "Employee Count", value: "51–200" },
            { label: "Slug", value: "demo-organization" },
          ].map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-0.5">
                  {field.label}
                </p>
                <p className="text-sm text-[#F7F8FF]">{field.value}</p>
              </div>
              <button className="text-xs text-[#A9B0C8] hover:text-[#35F2B9] transition-colors px-3 py-1.5 rounded-[6px] border border-[#1E2235] hover:border-[#35F2B9]/30">
                Edit
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider flex items-center gap-2">
          <Users className="w-3.5 h-3.5" />
          Team Members
        </h2>
        <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] divide-y divide-[#1E2235]">
          {[
            { name: "Brady Phenicie", email: "brady@phenicie.com", role: "Admin" },
            { name: "IT Manager", email: "it@example.com", role: "Editor" },
          ].map((member) => (
            <div
              key={member.email}
              className="flex items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#35F2B9]/20 flex items-center justify-center text-xs font-medium text-[#35F2B9]">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F7F8FF]">
                    {member.name}
                  </p>
                  <p className="text-xs font-mono text-[#A9B0C8]">
                    {member.email}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#A9B0C8] border border-[#1E2235] px-2 py-1 rounded-[4px]">
                {member.role}
              </span>
            </div>
          ))}
          <div className="px-5 py-4">
            <button className="text-xs text-[#35F2B9] hover:text-[#2dd4a0] transition-colors font-medium">
              + Invite Team Member
            </button>
          </div>
        </div>
      </section>

      {/* Integrations placeholder */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider flex items-center gap-2">
          <Key className="w-3.5 h-3.5" />
          Integrations
        </h2>
        <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-5 text-center">
          <Shield className="w-6 h-6 text-[#A9B0C8] mx-auto mb-2" />
          <p className="text-sm text-[#A9B0C8]">
            Integrations available after authentication setup
          </p>
          <p className="text-xs text-[#A9B0C8]/60 mt-1">
            Connect AWS, Azure, GCP, and more to automate evidence collection
          </p>
        </div>
      </section>
    </div>
  );
}

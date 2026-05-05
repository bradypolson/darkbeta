import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Plus, ArrowRight, Lock } from "lucide-react";
import { InlineScore } from "@/components/score-ring";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = { title: "Frameworks" };

const frameworks = [
  {
    id: "hipaa",
    key: "HIPAA",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description:
      "Federal law requiring organizations handling protected health information (PHI) to implement administrative, physical, and technical safeguards.",
    version: "2013 Omnibus Rule",
    category: "Healthcare",
    totalControls: 64,
    compliant: 46,
    inProgress: 12,
    notStarted: 6,
    status: "active",
    score: 72,
    dueDate: "2026-06-30",
  },
  {
    id: "pci-dss",
    key: "PCI_DSS",
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    description:
      "Security standard for organizations handling credit card information. Applies to any entity that stores, processes, or transmits cardholder data.",
    version: "v4.0",
    category: "Financial",
    totalControls: 78,
    compliant: 45,
    inProgress: 18,
    notStarted: 15,
    status: "active",
    score: 58,
    dueDate: "2026-09-01",
  },
  {
    id: "soc2",
    key: "SOC2",
    name: "SOC 2 Type II",
    fullName: "Service Organization Control 2",
    description:
      "Auditing standard for service organizations to demonstrate controls relevant to security, availability, processing integrity, confidentiality, and privacy.",
    version: "AICPA TSC 2017",
    category: "General",
    totalControls: 60,
    compliant: 0,
    inProgress: 0,
    notStarted: 60,
    status: "inactive",
    score: 0,
    dueDate: null,
  },
];

export default function FrameworksPage() {
  const active = frameworks.filter((f) => f.status === "active");
  const available = frameworks.filter((f) => f.status !== "active");

  return (
    <div className="p-8 max-w-[1280px] space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-1">
            Compliance
          </p>
          <h1 className="font-display text-2xl font-semibold text-[#F7F8FF]">
            Frameworks
          </h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#35F2B9] text-[#090A12] text-sm font-semibold hover:bg-[#2dd4a0] transition-colors">
          <Plus className="w-4 h-4" />
          Add Framework
        </button>
      </div>

      {/* Active */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider">
          Active — {active.length}
        </h2>
        <div className="space-y-3">
          {active.map((fw) => {
            const pct = Math.round((fw.compliant / fw.totalControls) * 100);
            return (
              <Link
                key={fw.id}
                href={`/frameworks/${fw.id}`}
                className="block bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-6 hover:border-[#2E3450] transition-colors group"
              >
                <div className="flex items-start gap-6">
                  <InlineScore score={pct} size={56} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display font-semibold text-[#F7F8FF]">
                        {fw.name}
                      </span>
                      <span className="text-xs font-mono text-[#A9B0C8]">
                        {fw.version}
                      </span>
                      <StatusBadge status={fw.status} />
                    </div>
                    <p className="text-sm text-[#A9B0C8] mb-4 max-w-2xl">
                      {fw.description}
                    </p>
                    {/* Segmented bar */}
                    <div className="h-1.5 bg-[#1E2235] rounded-full overflow-hidden flex gap-0.5 max-w-lg">
                      <div
                        className="h-full bg-[#35F2B9] rounded-l-full"
                        style={{
                          width: `${(fw.compliant / fw.totalControls) * 100}%`,
                        }}
                      />
                      <div
                        className="h-full bg-[#F2A935]"
                        style={{
                          width: `${(fw.inProgress / fw.totalControls) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-6 mt-2.5">
                      <span className="text-xs font-mono text-[#35F2B9]">
                        {fw.compliant} compliant
                      </span>
                      <span className="text-xs font-mono text-[#F2A935]">
                        {fw.inProgress} in progress
                      </span>
                      <span className="text-xs font-mono text-[#A9B0C8]">
                        {fw.notStarted} not started
                      </span>
                      <span className="text-xs font-mono text-[#A9B0C8]">
                        {fw.totalControls} total controls
                      </span>
                    </div>
                  </div>
                  {fw.dueDate && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-[#A9B0C8] font-mono">Due</p>
                      <p className="text-xs font-medium text-[#F7F8FF] mt-0.5">
                        {new Date(fw.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                  <ArrowRight className="w-4 h-4 text-[#A9B0C8] group-hover:text-[#35F2B9] transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Available */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider">
          Available to Add
        </h2>
        <div className="space-y-3">
          {available.map((fw) => (
            <div
              key={fw.id}
              className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-6 opacity-70"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-[6px] bg-[#161929] border border-[#1E2235] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#A9B0C8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display font-semibold text-[#F7F8FF]">
                      {fw.name}
                    </span>
                    <span className="text-xs font-mono text-[#A9B0C8]">
                      {fw.version}
                    </span>
                  </div>
                  <p className="text-sm text-[#A9B0C8] max-w-2xl">
                    {fw.description}
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#161929] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors flex-shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                  Enable
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

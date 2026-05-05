import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Shield,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { InlineScore } from "@/components/score-ring";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = { title: "Dashboard" };

// Static demo data — replaced with Supabase queries post-auth integration
const overviewStats = [
  {
    label: "Overall Score",
    value: "67",
    unit: "/100",
    trend: "+4 this month",
    color: "#F2A935",
  },
  {
    label: "Controls Compliant",
    value: "84",
    unit: " / 142",
    trend: "12 added this week",
    color: "#35F2B9",
  },
  {
    label: "Critical Gaps",
    value: "6",
    unit: " open",
    trend: "2 resolved recently",
    color: "#F25C5C",
  },
  {
    label: "Evidence Items",
    value: "31",
    unit: " on file",
    trend: "5 expiring soon",
    color: "#A9B0C8",
  },
];

const frameworks = [
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    score: 72,
    total: 64,
    compliant: 46,
    inProgress: 12,
    status: "in_progress",
  },
  {
    id: "pci-dss",
    name: "PCI DSS v4.0",
    description: "Payment Card Industry Data Security Standard",
    score: 58,
    total: 78,
    compliant: 45,
    inProgress: 18,
    status: "in_progress",
  },
];

const criticalItems = [
  {
    id: "1",
    control: "§ 164.312(a)(2)(i)",
    title: "Unique User Identification",
    framework: "HIPAA",
    priority: "critical",
    status: "non_compliant",
    daysOpen: 14,
  },
  {
    id: "2",
    control: "PCI 8.2.1",
    title: "Account data storage limits",
    framework: "PCI DSS",
    priority: "critical",
    status: "non_compliant",
    daysOpen: 7,
  },
  {
    id: "3",
    control: "§ 164.308(a)(5)",
    title: "Security Awareness Training",
    framework: "HIPAA",
    priority: "high",
    status: "in_progress",
    daysOpen: 21,
  },
  {
    id: "4",
    control: "PCI 6.3.2",
    title: "Inventory of bespoke software",
    framework: "PCI DSS",
    priority: "high",
    status: "not_started",
    daysOpen: 30,
  },
];

const recentActivity = [
  {
    id: "1",
    action: "Evidence uploaded",
    detail: "Firewall policy v2.1 attached to PCI 1.2.1",
    time: "2h ago",
    type: "evidence",
  },
  {
    id: "2",
    action: "Control marked compliant",
    detail: "§ 164.310(d)(1) — Workstation Use updated",
    time: "5h ago",
    type: "status",
  },
  {
    id: "3",
    action: "Note added",
    detail: "PCI 8.3.6 — password complexity in review",
    time: "1d ago",
    type: "note",
  },
  {
    id: "4",
    action: "Control assigned",
    detail: "§ 164.308(a)(1)(i) assigned to IT Manager",
    time: "2d ago",
    type: "assign",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1280px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-1">
            Compliance Posture
          </p>
          <h1 className="font-display text-2xl font-semibold text-[#F7F8FF]">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#0F1120] border border-[#1E2235] text-xs text-[#A9B0C8] font-mono">
            <Clock className="w-3 h-3" />
            Last scan: 2h ago
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-5"
          >
            <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-3">
              {stat.label}
            </p>
            <p className="font-display text-3xl font-semibold" style={{ color: stat.color }}>
              {stat.value}
              <span className="text-base font-normal text-[#A9B0C8]">
                {stat.unit}
              </span>
            </p>
            <p className="text-xs text-[#A9B0C8] mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Frameworks + critical items */}
      <div className="grid grid-cols-3 gap-6">
        {/* Frameworks */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-[#F7F8FF] uppercase tracking-wider">
              Active Frameworks
            </h2>
            <Link
              href="/frameworks"
              className="text-xs text-[#A9B0C8] hover:text-[#35F2B9] flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {frameworks.map((fw) => {
              const pct = Math.round((fw.compliant / fw.total) * 100);
              return (
                <Link
                  key={fw.id}
                  href={`/frameworks/${fw.id}`}
                  className="block bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-5 hover:border-[#2E3450] transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <InlineScore score={pct} size={52} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-semibold text-[#F7F8FF] text-sm">
                          {fw.name}
                        </span>
                        <StatusBadge status={fw.status} />
                      </div>
                      <p className="text-xs text-[#A9B0C8] mb-3">
                        {fw.description}
                      </p>
                      {/* Progress bar */}
                      <div className="h-1 bg-[#1E2235] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor:
                              pct >= 80
                                ? "#35F2B9"
                                : pct >= 50
                                  ? "#F2A935"
                                  : "#F25C5C",
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[11px] font-mono text-[#35F2B9]">
                          {fw.compliant} compliant
                        </span>
                        <span className="text-[11px] font-mono text-[#F2A935]">
                          {fw.inProgress} in progress
                        </span>
                        <span className="text-[11px] font-mono text-[#A9B0C8]">
                          {fw.total - fw.compliant - fw.inProgress} remaining
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A9B0C8] group-hover:text-[#35F2B9] transition-colors flex-shrink-0 mt-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Critical items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-[#F7F8FF] uppercase tracking-wider">
              Needs Attention
            </h2>
            <span className="text-xs font-mono text-[#F25C5C]">
              {criticalItems.length} open
            </span>
          </div>
          <div className="space-y-2">
            {criticalItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-4"
              >
                <div className="flex items-start gap-2 mb-2">
                  {item.priority === "critical" ? (
                    <XCircle className="w-3.5 h-3.5 text-[#F25C5C] flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F2A935] flex-shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-[#A9B0C8]">
                      {item.control}
                    </p>
                    <p className="text-xs font-medium text-[#F7F8FF] mt-0.5 leading-snug">
                      {item.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#A9B0C8]">
                    {item.framework}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-sm font-semibold text-[#F7F8FF] uppercase tracking-wider">
            Recent Activity
          </h2>
          <Link
            href="/audits"
            className="text-xs text-[#A9B0C8] hover:text-[#35F2B9] flex items-center gap-1 transition-colors"
          >
            Full audit log <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] divide-y divide-[#1E2235]">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-5 py-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#35F2B9] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-[#F7F8FF]">
                  {item.action}
                </span>
                <span className="text-xs text-[#A9B0C8] ml-2">
                  {item.detail}
                </span>
              </div>
              <span className="text-xs font-mono text-[#A9B0C8] flex-shrink-0">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

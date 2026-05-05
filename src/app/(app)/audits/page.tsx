import type { Metadata } from "next";
import { ClipboardList, Download, Filter } from "lucide-react";

export const metadata: Metadata = { title: "Audit Log" };

const auditEntries = [
  {
    id: "a1",
    timestamp: "2026-05-05T14:23:11Z",
    user: "Brady Phenicie",
    action: "control.status_updated",
    resource: "§ 164.308(a)(1)(i)",
    resourceType: "control",
    detail: "Status changed from in_progress to compliant",
    framework: "HIPAA",
  },
  {
    id: "a2",
    timestamp: "2026-05-05T11:02:44Z",
    user: "Brady Phenicie",
    action: "evidence.uploaded",
    resource: "Risk Analysis Report Q1 2026",
    resourceType: "evidence",
    detail: "Evidence uploaded for § 164.308(a)(1)(i)",
    framework: "HIPAA",
  },
  {
    id: "a3",
    timestamp: "2026-05-04T16:45:00Z",
    user: "IT Manager",
    action: "control.note_added",
    resource: "PCI 8.3.6",
    resourceType: "control",
    detail: "Note added: password complexity review scheduled",
    framework: "PCI DSS",
  },
  {
    id: "a4",
    timestamp: "2026-05-04T10:30:15Z",
    user: "Brady Phenicie",
    action: "control.assigned",
    resource: "§ 164.308(a)(1)(i)",
    resourceType: "control",
    detail: "Assigned to IT Manager",
    framework: "HIPAA",
  },
  {
    id: "a5",
    timestamp: "2026-05-03T09:15:30Z",
    user: "System",
    action: "framework.activated",
    resource: "PCI DSS v4.0",
    resourceType: "framework",
    detail: "Framework activated for Demo Organization",
    framework: "PCI DSS",
  },
  {
    id: "a6",
    timestamp: "2026-05-03T09:10:00Z",
    user: "Brady Phenicie",
    action: "framework.activated",
    resource: "HIPAA",
    resourceType: "framework",
    detail: "Framework activated for Demo Organization",
    framework: "HIPAA",
  },
  {
    id: "a7",
    timestamp: "2026-05-02T14:00:00Z",
    user: "Brady Phenicie",
    action: "organization.created",
    resource: "Demo Organization",
    resourceType: "organization",
    detail: "Organization created",
    framework: null,
  },
];

const actionColors: Record<string, string> = {
  "control.status_updated": "#35F2B9",
  "evidence.uploaded": "#F2A935",
  "control.note_added": "#A9B0C8",
  "control.assigned": "#A9B0C8",
  "framework.activated": "#35F2B9",
  "organization.created": "#35F2B9",
};

function formatTimestamp(ts: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(ts));
}

export default function AuditsPage() {
  return (
    <div className="p-8 max-w-[1280px] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-1">
            Compliance
          </p>
          <h1 className="font-display text-2xl font-semibold text-[#F7F8FF]">
            Audit Log
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0F1120] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0F1120] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Events", value: auditEntries.length.toString() },
          { label: "This Week", value: "5" },
          { label: "Controls Updated", value: "3" },
          { label: "Evidence Added", value: "1" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-4"
          >
            <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="font-display text-xl font-semibold text-[#F7F8FF]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Log table */}
      <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] overflow-hidden">
        <div className="grid grid-cols-[160px_1fr_200px_120px] gap-0 px-5 py-3 border-b border-[#1E2235] bg-[#161929]">
          <span className="text-[11px] font-mono text-[#A9B0C8] uppercase tracking-wider">
            Timestamp
          </span>
          <span className="text-[11px] font-mono text-[#A9B0C8] uppercase tracking-wider">
            Event
          </span>
          <span className="text-[11px] font-mono text-[#A9B0C8] uppercase tracking-wider">
            User
          </span>
          <span className="text-[11px] font-mono text-[#A9B0C8] uppercase tracking-wider">
            Framework
          </span>
        </div>
        <div className="divide-y divide-[#1E2235]">
          {auditEntries.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[160px_1fr_200px_120px] gap-0 px-5 py-3.5 hover:bg-[#161929]/50 transition-colors"
            >
              <span className="text-xs font-mono text-[#A9B0C8] self-start pt-0.5">
                {formatTimestamp(entry.timestamp)}
              </span>
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-xs font-mono font-medium"
                    style={{ color: actionColors[entry.action] ?? "#A9B0C8" }}
                  >
                    {entry.action}
                  </span>
                </div>
                <p className="text-xs text-[#A9B0C8] truncate">{entry.detail}</p>
                <p className="text-[11px] font-mono text-[#A9B0C8]/60 mt-0.5">
                  {entry.resource}
                </p>
              </div>
              <span className="text-xs text-[#F7F8FF] self-start pt-0.5">
                {entry.user}
              </span>
              <span className="text-xs font-mono text-[#A9B0C8] self-start pt-0.5">
                {entry.framework ?? "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

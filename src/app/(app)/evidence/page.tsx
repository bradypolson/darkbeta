import type { Metadata } from "next";
import { FileCheck, Upload, Filter, Search, Paperclip } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = { title: "Evidence" };

const evidenceItems = [
  {
    id: "e1",
    title: "Security Management Policy v2.3",
    type: "policy",
    control: "§ 164.308(a)(1)(i)",
    framework: "HIPAA",
    uploadedAt: "2026-03-15",
    uploadedBy: "IT Manager",
    size: "248 KB",
    status: "active",
  },
  {
    id: "e2",
    title: "Risk Analysis Report Q1 2026",
    type: "document",
    control: "§ 164.308(a)(1)(ii)(A)",
    framework: "HIPAA",
    uploadedAt: "2026-03-28",
    uploadedBy: "Brady Phenicie",
    size: "1.2 MB",
    status: "active",
  },
  {
    id: "e3",
    title: "Board Approval — Security Policy",
    type: "document",
    control: "§ 164.308(a)(1)(i)",
    framework: "HIPAA",
    uploadedAt: "2026-04-01",
    uploadedBy: "Brady Phenicie",
    size: "89 KB",
    status: "active",
  },
  {
    id: "e4",
    title: "Firewall Policy v2.1",
    type: "policy",
    control: "PCI 1.2.1",
    framework: "PCI DSS",
    uploadedAt: "2026-04-10",
    uploadedBy: "Network Engineer",
    size: "512 KB",
    status: "active",
  },
  {
    id: "e5",
    title: "TLS Certificate — Production",
    type: "screenshot",
    control: "PCI 4.2.1",
    framework: "PCI DSS",
    uploadedAt: "2026-04-15",
    uploadedBy: "Brady Phenicie",
    size: "92 KB",
    status: "active",
  },
  {
    id: "e6",
    title: "Facility Access Badge Logs",
    type: "document",
    control: "§ 164.310(a)(1)",
    framework: "HIPAA",
    uploadedAt: "2026-04-20",
    uploadedBy: "Facilities Manager",
    size: "340 KB",
    status: "active",
  },
];

const typeIcons: Record<string, string> = {
  policy: "P",
  document: "D",
  screenshot: "S",
  procedure: "PR",
  other: "O",
};

export default function EvidencePage() {
  return (
    <div className="p-8 max-w-[1280px] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-1">
            Compliance
          </p>
          <h1 className="font-display text-2xl font-semibold text-[#F7F8FF]">
            Evidence Library
          </h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#35F2B9] text-[#090A12] text-sm font-semibold hover:bg-[#2dd4a0] transition-colors">
          <Upload className="w-4 h-4" />
          Upload Evidence
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Files", value: evidenceItems.length.toString() },
          { label: "Policies", value: "2" },
          { label: "Documents", value: "3" },
          { label: "Screenshots", value: "1" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-4"
          >
            <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-1">
              {s.label}
            </p>
            <p className="font-display text-xl font-semibold text-[#F7F8FF]">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B0C8]" />
          <input
            type="text"
            placeholder="Search evidence..."
            className="w-full bg-[#0F1120] border border-[#1E2235] rounded-[6px] pl-9 pr-4 py-2 text-sm text-[#F7F8FF] placeholder-[#A9B0C8]/50 focus:outline-none focus:border-[#35F2B9]/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0F1120] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </button>
      </div>

      {/* Evidence grid */}
      <div className="space-y-2">
        {evidenceItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 px-5 py-4 bg-[#0F1120] border border-[#1E2235] rounded-[6px] hover:border-[#2E3450] transition-colors"
          >
            <div className="w-8 h-8 rounded-[4px] bg-[#161929] border border-[#1E2235] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-mono text-[#A9B0C8]">
                {typeIcons[item.type] ?? "?"}
              </span>
            </div>
            <Paperclip className="w-4 h-4 text-[#A9B0C8] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#F7F8FF] truncate">
                {item.title}
              </p>
              <p className="text-xs font-mono text-[#A9B0C8] mt-0.5">
                {item.control} · {item.framework} · {item.size} · {item.uploadedAt}
              </p>
            </div>
            <StatusBadge status={item.type} />
            <span className="text-xs font-mono text-[#A9B0C8] flex-shrink-0">
              {item.uploadedBy}
            </span>
          </div>
        ))}
      </div>

      {/* Upload drop zone */}
      <div className="border-2 border-dashed border-[#1E2235] rounded-[6px] p-10 text-center">
        <Upload className="w-8 h-8 text-[#A9B0C8] mx-auto mb-3" />
        <p className="text-sm font-medium text-[#F7F8FF] mb-1">
          Drop files here to upload
        </p>
        <p className="text-xs text-[#A9B0C8]">
          PDF, DOCX, PNG, JPG up to 50 MB · Linked to a control at upload
        </p>
      </div>
    </div>
  );
}

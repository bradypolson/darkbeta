"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Plus,
  Paperclip,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";

const STATUSES = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "compliant", label: "Compliant" },
  { value: "non_compliant", label: "Non-Compliant" },
  { value: "not_applicable", label: "N/A" },
];

// Demo static control data
const CONTROL_DATA: Record<string, {
  controlId: string;
  frameworkId: string;
  frameworkName: string;
  title: string;
  description: string;
  guidance: string;
  priority: string;
  status: string;
  category: string;
  notes: string;
  assignee: string | null;
  dueDate: string | null;
  evidence: {
    id: string;
    title: string;
    type: string;
    uploadedAt: string;
    uploadedBy: string;
    size: string;
  }[];
}> = {
  c1: {
    controlId: "§ 164.308(a)(1)(i)",
    frameworkId: "hipaa",
    frameworkName: "HIPAA",
    title: "Security Management Process",
    description:
      "Implement policies and procedures to prevent, detect, contain, and correct security violations.",
    guidance:
      "This standard requires the implementation of policies and procedures to prevent, detect, contain, and correct security violations. The implementation specifications include: (i) Risk Analysis; (ii) Risk Management; (iii) Sanction Policy; (iv) Information System Activity Review.",
    priority: "critical",
    status: "compliant",
    category: "Administrative Safeguards",
    notes:
      "Security management policy documented and approved by board. Risk analysis completed Q1 2026.",
    assignee: "IT Manager",
    dueDate: "2026-03-31",
    evidence: [
      {
        id: "e1",
        title: "Security Management Policy v2.3",
        type: "policy",
        uploadedAt: "2026-03-15",
        uploadedBy: "IT Manager",
        size: "248 KB",
      },
      {
        id: "e2",
        title: "Risk Analysis Report Q1 2026",
        type: "document",
        uploadedAt: "2026-03-28",
        uploadedBy: "Brady Phenicie",
        size: "1.2 MB",
      },
      {
        id: "e3",
        title: "Board Approval — Security Policy",
        type: "document",
        uploadedAt: "2026-04-01",
        uploadedBy: "Brady Phenicie",
        size: "89 KB",
      },
    ],
  },
  c7: {
    controlId: "§ 164.312(a)(1)",
    frameworkId: "hipaa",
    frameworkName: "HIPAA",
    title: "Access Control",
    description:
      "Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons or software programs.",
    guidance:
      "Implementation specifications include: Unique User Identification (Required); Emergency Access Procedure (Required); Automatic Logoff (Addressable); Encryption and Decryption (Addressable).",
    priority: "critical",
    status: "non_compliant",
    category: "Technical Safeguards",
    notes: "",
    assignee: null,
    dueDate: null,
    evidence: [],
  },
  p6: {
    controlId: "PCI 8.2.1",
    frameworkId: "pci-dss",
    frameworkName: "PCI DSS",
    title: "Unique IDs for All Users",
    description:
      "All users are assigned a unique ID before allowing them to access system components or cardholder data.",
    guidance:
      "Sharing a single login for multiple users makes it impossible to trace actions to a specific individual. Unique IDs are required for all users with access to system components.",
    priority: "critical",
    status: "non_compliant",
    category: "Implement Strong Access Control",
    notes: "",
    assignee: null,
    dueDate: null,
    evidence: [],
  },
};

export default function ControlDetailPage() {
  const { id, controlId } = useParams<{ id: string; controlId: string }>();
  const control = CONTROL_DATA[controlId] ?? {
    controlId: controlId,
    frameworkId: id,
    frameworkName: id.toUpperCase(),
    title: "Control",
    description: "Control details.",
    guidance: "",
    priority: "medium",
    status: "not_started",
    category: "",
    notes: "",
    assignee: null,
    dueDate: null,
    evidence: [],
  };

  const [status, setStatus] = useState(control.status);
  const [notes, setNotes] = useState(control.notes);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const statusIcon = {
    compliant: <CheckCircle2 className="w-4 h-4 text-[#35F2B9]" />,
    in_progress: <Clock className="w-4 h-4 text-[#F2A935]" />,
    non_compliant: <XCircle className="w-4 h-4 text-[#F25C5C]" />,
    not_started: <AlertCircle className="w-4 h-4 text-[#A9B0C8]" />,
    not_applicable: <AlertCircle className="w-4 h-4 text-[#A9B0C8]" />,
  };

  return (
    <div className="p-8 max-w-[1280px] space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#A9B0C8]">
        <Link
          href="/frameworks"
          className="hover:text-[#F7F8FF] transition-colors"
        >
          Frameworks
        </Link>
        <span>/</span>
        <Link
          href={`/frameworks/${id}`}
          className="hover:text-[#F7F8FF] transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" />
          {control.frameworkName}
        </Link>
        <span>/</span>
        <span className="text-[#F7F8FF]">{control.controlId}</span>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left: main content */}
        <div className="col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-mono text-[#A9B0C8] mb-1">
                  {control.controlId}
                </p>
                <h1 className="font-display text-xl font-semibold text-[#F7F8FF]">
                  {control.title}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={control.priority} />
              </div>
            </div>
            <p className="text-sm text-[#A9B0C8] leading-relaxed mt-3">
              {control.description}
            </p>
          </div>

          {/* Guidance */}
          {control.guidance && (
            <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-5">
              <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-3">
                Implementation Guidance
              </p>
              <p className="text-sm text-[#A9B0C8] leading-relaxed">
                {control.guidance}
              </p>
            </div>
          )}

          {/* Status update */}
          <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-5 space-y-4">
            <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider">
              Status
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatus(s.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-sm border transition-colors",
                    status === s.value
                      ? "bg-[#142F34] border-[#35F2B9]/30 text-[#35F2B9]"
                      : "bg-[#161929] border-[#1E2235] text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450]"
                  )}
                >
                  {statusIcon[s.value as keyof typeof statusIcon] ?? null}
                  {s.label}
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-2 block">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add implementation notes, findings, or context..."
                rows={4}
                className="w-full bg-[#161929] border border-[#1E2235] rounded-[6px] px-4 py-3 text-sm text-[#F7F8FF] placeholder-[#A9B0C8]/50 resize-none focus:outline-none focus:border-[#35F2B9]/50 transition-colors font-mono"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-[6px] bg-[#35F2B9] text-[#090A12] text-sm font-semibold hover:bg-[#2dd4a0] transition-colors"
              >
                {saved ? "Saved" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Evidence */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider">
                Evidence — {control.evidence.length} items
              </p>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#0F1120] border border-[#1E2235] text-xs text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Add Evidence
              </button>
            </div>

            {control.evidence.length > 0 ? (
              <div className="space-y-2">
                {control.evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center gap-4 px-5 py-3 bg-[#0F1120] border border-[#1E2235] rounded-[6px]"
                  >
                    <Paperclip className="w-4 h-4 text-[#A9B0C8] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#F7F8FF] truncate">
                        {ev.title}
                      </p>
                      <p className="text-xs font-mono text-[#A9B0C8]">
                        {ev.type} · {ev.size} · uploaded {ev.uploadedAt} by{" "}
                        {ev.uploadedBy}
                      </p>
                    </div>
                    <StatusBadge status={ev.type} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#1E2235] rounded-[6px] p-8 text-center">
                <Upload className="w-6 h-6 text-[#A9B0C8] mx-auto mb-3" />
                <p className="text-sm text-[#A9B0C8]">No evidence on file</p>
                <p className="text-xs text-[#A9B0C8]/60 mt-1">
                  Upload documents, screenshots, or policies to support this
                  control
                </p>
                <button className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 rounded-[6px] bg-[#0F1120] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Evidence
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="space-y-4">
          {/* Current status */}
          <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-4">
            <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-3">
              Current Status
            </p>
            <StatusBadge status={status} />
          </div>

          {/* Metadata */}
          <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-4 space-y-3">
            <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider">
              Details
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-[11px] font-mono text-[#A9B0C8]">
                  Framework
                </p>
                <p className="text-sm text-[#F7F8FF]">
                  {control.frameworkName}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-[#A9B0C8]">
                  Category
                </p>
                <p className="text-sm text-[#F7F8FF]">{control.category}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-[#A9B0C8]">
                  Priority
                </p>
                <StatusBadge status={control.priority} className="mt-0.5" />
              </div>
              <div>
                <p className="text-[11px] font-mono text-[#A9B0C8]">
                  Assignee
                </p>
                <p className="text-sm text-[#F7F8FF]">
                  {control.assignee ?? (
                    <span className="text-[#A9B0C8]">Unassigned</span>
                  )}
                </p>
              </div>
              {control.dueDate && (
                <div>
                  <p className="text-[11px] font-mono text-[#A9B0C8]">
                    Due Date
                  </p>
                  <p className="text-sm text-[#F7F8FF] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(control.dueDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-[#0F1120] border border-[#1E2235] rounded-[6px] p-4 space-y-2">
            <p className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider mb-3">
              Actions
            </p>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-[6px] bg-[#161929] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              Add Comment
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-[6px] bg-[#161929] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              Set Due Date
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-[6px] bg-[#161929] border border-[#1E2235] text-sm text-[#A9B0C8] hover:text-[#F7F8FF] hover:border-[#2E3450] transition-colors">
              <FileText className="w-3.5 h-3.5" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Filter, Search } from "lucide-react";
import { InlineScore } from "@/components/score-ring";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = { title: "Framework Detail" };

const FRAMEWORK_DATA: Record<string, {
  id: string;
  name: string;
  fullName: string;
  version: string;
  description: string;
  categories: {
    name: string;
    controls: {
      id: string;
      controlId: string;
      title: string;
      description: string;
      priority: "critical" | "high" | "medium" | "low";
      status: string;
      evidenceCount: number;
    }[];
  }[];
}> = {
  hipaa: {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    version: "2013 Omnibus Rule",
    description:
      "HIPAA requires covered entities and business associates to implement safeguards to protect the privacy and security of protected health information (PHI).",
    categories: [
      {
        name: "Administrative Safeguards",
        controls: [
          {
            id: "c1",
            controlId: "§ 164.308(a)(1)(i)",
            title: "Security Management Process",
            description:
              "Implement policies and procedures to prevent, detect, contain, and correct security violations.",
            priority: "critical",
            status: "compliant",
            evidenceCount: 3,
          },
          {
            id: "c2",
            controlId: "§ 164.308(a)(1)(ii)(A)",
            title: "Risk Analysis",
            description:
              "Conduct an accurate and thorough assessment of potential risks and vulnerabilities to ePHI.",
            priority: "critical",
            status: "in_progress",
            evidenceCount: 1,
          },
          {
            id: "c3",
            controlId: "§ 164.308(a)(5)",
            title: "Security Awareness Training",
            description:
              "Implement a security awareness and training program for all members of its workforce.",
            priority: "high",
            status: "in_progress",
            evidenceCount: 0,
          },
          {
            id: "c4",
            controlId: "§ 164.308(a)(6)(i)",
            title: "Security Incident Procedures",
            description:
              "Implement policies and procedures to address security incidents.",
            priority: "high",
            status: "compliant",
            evidenceCount: 2,
          },
        ],
      },
      {
        name: "Physical Safeguards",
        controls: [
          {
            id: "c5",
            controlId: "§ 164.310(a)(1)",
            title: "Facility Access Controls",
            description:
              "Implement policies and procedures to limit physical access to electronic information systems and the facility or facilities in which they are housed.",
            priority: "high",
            status: "compliant",
            evidenceCount: 4,
          },
          {
            id: "c6",
            controlId: "§ 164.310(d)(1)",
            title: "Device and Media Controls",
            description:
              "Implement policies and procedures that govern the receipt and removal of hardware and electronic media.",
            priority: "medium",
            status: "not_started",
            evidenceCount: 0,
          },
        ],
      },
      {
        name: "Technical Safeguards",
        controls: [
          {
            id: "c7",
            controlId: "§ 164.312(a)(1)",
            title: "Access Control",
            description:
              "Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons.",
            priority: "critical",
            status: "non_compliant",
            evidenceCount: 0,
          },
          {
            id: "c8",
            controlId: "§ 164.312(a)(2)(i)",
            title: "Unique User Identification",
            description:
              "Assign a unique name and/or number for identifying and tracking user identity.",
            priority: "critical",
            status: "non_compliant",
            evidenceCount: 0,
          },
          {
            id: "c9",
            controlId: "§ 164.312(e)(1)",
            title: "Transmission Security",
            description:
              "Implement technical security measures to guard against unauthorized access to ePHI transmitted over electronic communications networks.",
            priority: "critical",
            status: "compliant",
            evidenceCount: 2,
          },
        ],
      },
    ],
  },
  "pci-dss": {
    id: "pci-dss",
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    version: "v4.0",
    description:
      "PCI DSS applies to all entities that store, process, or transmit cardholder data. It provides a framework for securing payment card data.",
    categories: [
      {
        name: "Build and Maintain a Secure Network",
        controls: [
          {
            id: "p1",
            controlId: "PCI 1.2.1",
            title: "Network Security Controls",
            description:
              "Implement security controls between untrusted networks and the cardholder data environment.",
            priority: "critical",
            status: "compliant",
            evidenceCount: 5,
          },
          {
            id: "p2",
            controlId: "PCI 1.3.1",
            title: "Restrict Inbound Traffic",
            description:
              "Inbound traffic to the CDE is restricted to that which is necessary.",
            priority: "critical",
            status: "in_progress",
            evidenceCount: 1,
          },
        ],
      },
      {
        name: "Protect Account Data",
        controls: [
          {
            id: "p3",
            controlId: "PCI 3.2.1",
            title: "SAD Not Retained After Authorization",
            description:
              "SAD is not retained after authorization, even if encrypted.",
            priority: "critical",
            status: "not_started",
            evidenceCount: 0,
          },
          {
            id: "p4",
            controlId: "PCI 4.2.1",
            title: "Strong Cryptography for Data in Transit",
            description:
              "Strong cryptography is used to safeguard PAN during transmission over open, public networks.",
            priority: "critical",
            status: "compliant",
            evidenceCount: 3,
          },
        ],
      },
      {
        name: "Implement Strong Access Control",
        controls: [
          {
            id: "p5",
            controlId: "PCI 7.2.1",
            title: "Access Control Model",
            description:
              "Access to system components and cardholder data is limited to only authorized individuals.",
            priority: "high",
            status: "in_progress",
            evidenceCount: 0,
          },
          {
            id: "p6",
            controlId: "PCI 8.2.1",
            title: "Unique IDs for All Users",
            description:
              "All users are assigned a unique ID before allowing them to access system components or cardholder data.",
            priority: "critical",
            status: "non_compliant",
            evidenceCount: 0,
          },
          {
            id: "p7",
            controlId: "PCI 8.3.6",
            title: "Password Complexity",
            description:
              "If passwords are used as authentication factors, they meet minimum complexity and strength requirements.",
            priority: "high",
            status: "in_progress",
            evidenceCount: 1,
          },
        ],
      },
    ],
  },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FrameworkDetailPage({ params }: Props) {
  const { id } = await params;
  const fw = FRAMEWORK_DATA[id];
  if (!fw) notFound();

  const allControls = fw.categories.flatMap((c) => c.controls);
  const compliant = allControls.filter((c) => c.status === "compliant").length;
  const inProgress = allControls.filter((c) => c.status === "in_progress").length;
  const nonCompliant = allControls.filter((c) => c.status === "non_compliant").length;
  const notStarted = allControls.filter((c) => c.status === "not_started").length;
  const total = allControls.length;
  const score = Math.round((compliant / total) * 100);

  return (
    <div className="p-8 max-w-[1280px] space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#A9B0C8]">
        <Link href="/frameworks" className="hover:text-[#F7F8FF] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Frameworks
        </Link>
        <span>/</span>
        <span className="text-[#F7F8FF]">{fw.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start gap-6">
        <InlineScore score={score} size={72} />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display text-2xl font-semibold text-[#F7F8FF]">
              {fw.name}
            </h1>
            <span className="text-sm font-mono text-[#A9B0C8]">{fw.version}</span>
          </div>
          <p className="text-sm text-[#A9B0C8] max-w-2xl mb-4">{fw.description}</p>
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-[#35F2B9]">{compliant} compliant</span>
            <span className="text-xs font-mono text-[#F2A935]">{inProgress} in progress</span>
            <span className="text-xs font-mono text-[#F25C5C]">{nonCompliant} non-compliant</span>
            <span className="text-xs font-mono text-[#A9B0C8]">{notStarted} not started</span>
            <span className="text-xs font-mono text-[#A9B0C8]">{total} total</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#1E2235] rounded-full overflow-hidden flex">
        <div className="h-full bg-[#35F2B9]" style={{ width: `${(compliant / total) * 100}%` }} />
        <div className="h-full bg-[#F2A935]" style={{ width: `${(inProgress / total) * 100}%` }} />
        <div className="h-full bg-[#F25C5C]" style={{ width: `${(nonCompliant / total) * 100}%` }} />
      </div>

      {/* Controls by category */}
      <div className="space-y-8">
        {fw.categories.map((cat) => (
          <div key={cat.name} className="space-y-3">
            <h2 className="text-xs font-mono text-[#A9B0C8] uppercase tracking-wider">
              {cat.name} — {cat.controls.length} controls
            </h2>
            <div className="space-y-2">
              {cat.controls.map((control) => (
                <Link
                  key={control.id}
                  href={`/frameworks/${id}/controls/${control.id}`}
                  className="flex items-center gap-4 px-5 py-4 bg-[#0F1120] border border-[#1E2235] rounded-[6px] hover:border-[#2E3450] transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
                    backgroundColor:
                      control.status === "compliant" ? "#35F2B9"
                      : control.status === "in_progress" ? "#F2A935"
                      : control.status === "non_compliant" ? "#F25C5C"
                      : "#1E2235"
                  }} />
                  <span className="w-40 text-xs font-mono text-[#A9B0C8] flex-shrink-0">
                    {control.controlId}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#F7F8FF] truncate">
                      {control.title}
                    </p>
                    <p className="text-xs text-[#A9B0C8] truncate mt-0.5">
                      {control.description}
                    </p>
                  </div>
                  <StatusBadge status={control.priority} />
                  <StatusBadge status={control.status} />
                  {control.evidenceCount > 0 && (
                    <span className="text-xs font-mono text-[#A9B0C8] flex-shrink-0">
                      {control.evidenceCount} evidence
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-[#A9B0C8] group-hover:text-[#35F2B9] transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getStatusColor(status: string) {
  switch (status) {
    case "compliant":
    case "complete":
    case "passed":
      return "text-[#35F2B9]";
    case "in_progress":
    case "partial":
      return "text-[#F2A935]";
    case "non_compliant":
    case "failed":
    case "critical":
      return "text-[#F25C5C]";
    default:
      return "text-[#A9B0C8]";
  }
}

export function getStatusBg(status: string) {
  switch (status) {
    case "compliant":
    case "complete":
    case "passed":
      return "bg-[#142F34] text-[#35F2B9] border-[#35F2B9]/20";
    case "in_progress":
    case "partial":
      return "bg-[#2F1E0A] text-[#F2A935] border-[#F2A935]/20";
    case "non_compliant":
    case "failed":
    case "critical":
      return "bg-[#2F0A0A] text-[#F25C5C] border-[#F25C5C]/20";
    default:
      return "bg-[#161929] text-[#A9B0C8] border-[#1E2235]";
  }
}

export function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    compliant: "Compliant",
    non_compliant: "Non-Compliant",
    in_progress: "In Progress",
    not_started: "Not Started",
    partial: "Partial",
    complete: "Complete",
    failed: "Failed",
    passed: "Passed",
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
    not_applicable: "N/A",
    active: "Active",
    inactive: "Inactive",
    archived: "Archived",
    policy: "Policy",
    document: "Document",
    screenshot: "Screenshot",
    procedure: "Procedure",
    other: "Other",
  };
  return labels[status] ?? status;
}

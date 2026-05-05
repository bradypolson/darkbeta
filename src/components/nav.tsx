"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shield,
  FileCheck,
  ClipboardList,
  Settings,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/frameworks",
    label: "Frameworks",
    icon: Shield,
  },
  {
    href: "/evidence",
    label: "Evidence",
    icon: FileCheck,
  },
  {
    href: "/audits",
    label: "Audit Log",
    icon: ClipboardList,
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-full w-60 border-r border-[#1E2235] bg-[#090A12] flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-[60px] border-b border-[#1E2235]">
        <div className="w-7 h-7 rounded-[6px] bg-[#35F2B9]/10 border border-[#35F2B9]/30 flex items-center justify-center">
          <Shield className="w-4 h-4 text-[#35F2B9]" />
        </div>
        <span className="font-display font-semibold text-[15px] tracking-tight text-[#F7F8FF]">
          DarkScan Pro
        </span>
      </div>

      {/* Org selector */}
      <div className="px-4 py-3 border-b border-[#1E2235]">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-[6px] bg-[#0F1120] border border-[#1E2235] hover:border-[#2E3450] transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded-[3px] bg-[#35F2B9]/20 flex-shrink-0" />
            <span className="text-sm text-[#F7F8FF] truncate font-medium">
              Demo Organization
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#A9B0C8] flex-shrink-0" />
        </button>
      </div>

      {/* Nav links */}
      <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-[6px] text-sm transition-colors",
                isActive
                  ? "bg-[#142F34] text-[#35F2B9]"
                  : "text-[#A9B0C8] hover:text-[#F7F8FF] hover:bg-[#0F1120]"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[#1E2235] space-y-0.5">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-[6px] text-sm transition-colors",
            pathname.startsWith("/settings")
              ? "bg-[#142F34] text-[#35F2B9]"
              : "text-[#A9B0C8] hover:text-[#F7F8FF] hover:bg-[#0F1120]"
          )}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          Settings
        </Link>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-6 h-6 rounded-full bg-[#35F2B9]/20 flex items-center justify-center text-xs font-medium text-[#35F2B9]">
            B
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#F7F8FF] truncate">
              Brady Phenicie
            </p>
            <p className="text-[11px] text-[#A9B0C8] truncate">Admin</p>
          </div>
          <Bell className="w-4 h-4 text-[#A9B0C8] flex-shrink-0" />
        </div>
      </div>
    </nav>
  );
}

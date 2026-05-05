import { cn, getStatusBg, getStatusLabel } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[4px] text-xs font-mono font-medium border",
        getStatusBg(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}

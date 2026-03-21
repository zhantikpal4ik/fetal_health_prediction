import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PredictionStatus, PriorityLevel } from "@/lib/mock-data";

export function PredictionBadge({ status, className }: { status: PredictionStatus, className?: string }) {
  const styles = {
    Normal: "status-normal",
    Suspect: "status-suspect",
    Pathological: "status-pathological"
  };

  return (
    <Badge variant="outline" className={cn("font-medium px-2.5 py-0.5", styles[status], className)}>
      {status}
    </Badge>
  );
}

export function PriorityBadge({ level, className }: { level: PriorityLevel, className?: string }) {
  const styles = {
    Low: "bg-slate-100 text-slate-600 border-slate-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    HIGH: "bg-red-100 text-red-700 border-red-200 font-bold animate-pulse"
  };

  return (
    <Badge variant="outline" className={cn("px-2 text-xs", styles[level], className)}>
      {level} Priority
    </Badge>
  );
}

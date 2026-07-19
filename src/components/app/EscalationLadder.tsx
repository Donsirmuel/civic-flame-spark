import { ChevronRight } from "lucide-react";

const RUNGS = ["Ward", "LGA", "State", "Federal"] as const;

export function EscalationLadder({
  scope,
  status,
}: {
  scope: string; // LGA | STATE | FEDERAL | WARD
  status: string;
}) {
  const reachedIndex = (() => {
    switch (scope) {
      case "FEDERAL":
        return 3;
      case "STATE":
        return 2;
      case "LGA":
        return 1;
      default:
        return 0;
    }
  })();

  const filledColor =
    status === "resolved"
      ? "bg-primary border-primary"
      : status === "escalated"
        ? "bg-destructive border-destructive"
        : "bg-accent border-accent";

  return (
    <div className="flex items-center gap-1.5">
      {RUNGS.map((r, i) => {
        const reached = i <= reachedIndex;
        return (
          <div key={r} className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2.5 w-2.5 rounded-full border-2 transition-colors ${
                  reached ? filledColor : "border-hairline bg-transparent"
                }`}
                aria-hidden
              />
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  reached ? "text-foreground" : "text-foreground/40"
                }`}
              >
                {r}
              </span>
            </div>
            {i < RUNGS.length - 1 && (
              <ChevronRight className="h-3 w-3 text-foreground/25" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}

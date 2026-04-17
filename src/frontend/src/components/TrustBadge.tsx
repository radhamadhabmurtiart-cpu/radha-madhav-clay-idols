import type { ReactNode } from "react";

interface TrustBadgeProps {
  icon: ReactNode;
  title: string;
  description?: string;
  variant?: "default" | "compact";
}

export function TrustBadge({
  icon,
  title,
  description,
  variant = "default",
}: TrustBadgeProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 bg-card/80 border border-border rounded-md px-3 py-2">
        <span className="text-secondary text-lg flex-shrink-0">{icon}</span>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border shadow-sm transition-smooth hover:shadow-elevated">
      <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mb-4 text-2xl text-secondary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

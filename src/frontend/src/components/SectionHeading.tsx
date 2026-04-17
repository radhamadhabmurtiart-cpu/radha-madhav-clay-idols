import { useLanguage } from "@/hooks/useLanguage";

interface SectionHeadingProps {
  title: { bn: string; en: string };
  subtitle?: { bn: string; en: string };
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  const { t } = useLanguage();

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <div
        className={`flex items-center gap-3 mb-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-secondary opacity-60" />
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
          Radha Madhav
        </span>
        <span className="h-px w-8 bg-secondary opacity-60" />
      </div>
      <h2 className="text-display-md text-foreground mb-4">{t(title)}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils/cn";

/**
 * Phase1で確認したワイヤーフレームの見出しパターン
 * (英字ラベル + goldディバイダー + 和文見出し)を踏襲。
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";

  return (
    <div className={cn("mb-10 md:mb-12", className)}>
      <p className="text-gold-dark text-xs tracking-[0.2em] mb-3">
        {eyebrow}
      </p>
      <div className="flex items-start gap-3">
        <span className="mt-2 h-px w-8 shrink-0 bg-gold" aria-hidden />
        <h2
          className={cn(
            "font-serif text-2xl md:text-3xl font-medium",
            isLight ? "text-offwhite" : "text-navy",
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-sm md:text-base leading-relaxed",
            isLight ? "text-offwhite/70" : "text-navy/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

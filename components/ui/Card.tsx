import { cn } from "@/lib/utils/cn";

/**
 * Phase6で定義した基盤Cardコンポーネント。
 * CaseCard/DoctorCard/VoiceCard/ArticleCard等はこのCardを土台に派生させる。
 */
export function Card({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article";
}) {
  return (
    <Tag
      className={cn(
        "group flex flex-col overflow-hidden rounded-sm border border-navy/10 bg-white transition-colors duration-250 hover:border-gold/50",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function CardGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-3 md:gap-7", className)}>
      {children}
    </div>
  );
}

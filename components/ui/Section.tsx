import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

type SectionTone = "offwhite" | "navy" | "white";

const toneClasses: Record<SectionTone, string> = {
  offwhite: "bg-offwhite text-navy",
  navy: "bg-navy text-offwhite",
  white: "bg-white text-navy",
};

export function Section({
  id,
  tone = "offwhite",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

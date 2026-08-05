import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

/**
 * Phase5デザインシステム: btn-primary / btn-outline / btn-outline-navy
 * (医師向け研修LPのボタン言語を踏襲)
 * タップターゲットは44px以上を確保(WCAG 2.1 AA)。
 */
const buttonStyles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-250 ease-out whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-gold text-navy hover:bg-gold-light active:scale-[0.98]",
        outline: "border border-gold text-gold-dark hover:bg-gold hover:text-navy",
        "outline-navy":
          "border border-navy text-navy hover:bg-navy hover:text-offwhite",
      },
      size: {
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant, size, className, children } = props;
  const classes = cn(buttonStyles({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, external } = props;

    // 外部リンク(YouTube等)はロケール接頭辞を付与しないネイティブaタグで扱う
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener">
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

import { cn } from "@/lib/utils/cn";

const fieldClasses =
  "w-full rounded-sm border border-navy/20 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required ? <span className="ml-1 text-error">*</span> : null}
      </label>
      {children}
    </div>
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string },
) {
  const { className, ...rest } = props;
  return <input className={cn(fieldClasses, className)} {...rest} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string },
) {
  const { className, ...rest } = props;
  return <textarea className={cn(fieldClasses, "min-h-32 resize-y", className)} {...rest} />;
}

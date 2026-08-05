import { cn } from "@/lib/utils/cn";

/**
 * Phase3/Phase5で定義した免責事項コンポーネント。
 * 症例の効果個人差、会員エリアの便・パスポート・ビザ情報等、
 * 「情報提供のみで責任を負わない」旨の表示に使用する。
 * 警告色ではなく落ち着いたトーンで表示する(過度に不安を煽らないため)。
 */
export function NoticeBox({
  title = "ご注意",
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "rounded-sm border border-gold-dark/40 bg-notice-bg px-5 py-4 text-sm leading-relaxed text-navy/80",
        className,
      )}
    >
      <p className="mb-1.5 font-medium text-navy">{title}</p>
      <div>{children}</div>
    </div>
  );
}

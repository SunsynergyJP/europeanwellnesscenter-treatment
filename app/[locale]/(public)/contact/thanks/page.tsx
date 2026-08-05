import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function ContactThanksPage() {
  return (
    <Section tone="white" className="text-center">
      <p className="text-xs tracking-[0.2em] text-gold-dark">THANK YOU</p>
      <h1 className="mt-3 font-serif text-2xl text-navy md:text-3xl">
        お問い合わせいただきありがとうございます
      </h1>
      <p className="mt-4 text-sm text-navy/70 md:text-base">
        担当者よりご連絡させていただきます。今しばらくお待ちください。
      </p>
      <div className="mt-8">
        <Button href="/">トップページへ戻る</Button>
      </div>
    </Section>
  );
}

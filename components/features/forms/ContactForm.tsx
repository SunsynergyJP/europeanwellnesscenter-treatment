"use client";

import { useState } from "react";
import { Link, useRouter } from "@/lib/i18n/navigation";
import { Field, TextInput, TextArea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type SubmitState = "idle" | "submitting" | "error";

/**
 * /contact 用問い合わせフォーム。
 * 送信先 app/api/contact/route.ts はスタブ実装のため、
 * 実運用前に送信基盤(メール送信サービス等)の接続が必要。
 */
export function ContactForm() {
  const router = useRouter();
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      router.push("/contact/thanks");
    } catch {
      setState("error");
      setErrorMessage(
        "送信に失敗しました。時間をおいて再度お試しいただくか、お電話にてお問い合わせください。",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field id="name" label="お名前" required>
        <TextInput id="name" name="name" required autoComplete="name" />
      </Field>
      <Field id="email" label="メールアドレス" required>
        <TextInput id="email" name="email" type="email" required autoComplete="email" />
      </Field>
      <Field id="phone" label="お電話番号">
        <TextInput id="phone" name="phone" type="tel" autoComplete="tel" />
      </Field>
      <Field id="message" label="お問い合わせ内容" required>
        <TextArea id="message" name="message" required />
      </Field>

      <div className="flex items-start gap-2.5 text-sm text-navy/70">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded-sm border-navy/30 text-gold focus:ring-gold/40"
        />
        <label htmlFor="consent">
          <Link href="/privacy" className="underline hover:text-gold-dark">
            プライバシーポリシー
          </Link>
          に同意の上、送信します
        </label>
      </div>

      {errorMessage ? (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "送信中..." : "送信する"}
      </Button>
    </form>
  );
}

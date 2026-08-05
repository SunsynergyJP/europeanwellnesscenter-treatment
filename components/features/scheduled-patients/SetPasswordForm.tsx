"use client";

import { useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { Field, TextInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function SetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    if (password !== passwordConfirm) {
      setErrorMessage("パスワードが一致しません。");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch("/api/scheduled-patients/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      setErrorMessage("リンクの有効期限が切れているか、無効です。再度招待をご依頼ください。");
      setIsSubmitting(false);
      return;
    }

    router.push("/scheduled-patients/login");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field id="password" label="新しいパスワード(8文字以上)" required>
        <TextInput
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </Field>
      <Field id="passwordConfirm" label="パスワード(確認)" required>
        <TextInput
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </Field>
      {errorMessage ? (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? "設定中..." : "パスワードを設定してログイン画面へ"}
      </Button>
    </form>
  );
}

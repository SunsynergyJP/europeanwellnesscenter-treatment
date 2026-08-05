"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "@/lib/i18n/navigation";
import { Field, TextInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
      setIsSubmitting(false);
      return;
    }

    router.push("/scheduled-patients");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field id="email" label="メールアドレス" required>
        <TextInput id="email" name="email" type="email" required autoComplete="email" />
      </Field>
      <Field id="password" label="パスワード" required>
        <TextInput
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </Field>
      {errorMessage ? (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? "確認中..." : "ログイン"}
      </Button>
    </form>
  );
}

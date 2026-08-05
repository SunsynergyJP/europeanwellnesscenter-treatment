import { LoginForm } from "@/components/features/scheduled-patients/LoginForm";

export default function ScheduledPatientsLoginPage() {
  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-2 font-serif text-2xl text-navy">参加者専用ログイン</h1>
      <p className="mb-8 text-sm text-navy/60">
        ご案内済みのメールアドレス・パスワードでログインしてください。
      </p>
      <LoginForm />
    </div>
  );
}

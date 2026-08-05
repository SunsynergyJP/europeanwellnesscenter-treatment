import { LogoutButton } from "@/components/features/scheduled-patients/LogoutButton";

export default function AccountPage() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-navy">アカウント設定</h1>
      <p className="mb-8 text-sm text-navy/60">
        パスワード変更等のアカウント管理機能は、正式な認証基盤(Auth.js)導入後に実装予定です。
      </p>
      <LogoutButton />
    </div>
  );
}

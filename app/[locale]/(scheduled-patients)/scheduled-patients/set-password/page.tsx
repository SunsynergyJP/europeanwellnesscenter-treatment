import { SetPasswordForm } from "@/components/features/scheduled-patients/SetPasswordForm";
import { NoticeBox } from "@/components/ui/NoticeBox";

export default async function SetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="mx-auto max-w-sm py-10">
        <NoticeBox title="招待リンクが正しくありません">
          お手数ですが、届いたメールのリンクから改めてアクセスしてください。
        </NoticeBox>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-2 font-serif text-2xl text-navy">パスワードの設定</h1>
      <p className="mb-8 text-sm text-navy/60">
        参加者専用エリアでご利用いただくパスワードを設定してください。
      </p>
      <SetPasswordForm token={token} />
    </div>
  );
}

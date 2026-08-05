import { ScheduledPatientsSidebar } from "@/components/features/scheduled-patients/ScheduledPatientsSidebar";
import { ScheduledPatientsHeaderActions } from "@/components/features/scheduled-patients/ScheduledPatientsHeaderActions";

/**
 * 参加者専用エリア共通レイアウト。
 * 認証ガードはmiddleware.tsで実施済み(未ログイン時はlogin/へリダイレクト)。
 * ログインページ自体もこのレイアウト配下のため、サイドバーは常に表示される
 * (loginページ側で見た目上問題ないようシンプルな1カラム構成にしている)。
 */
export default function ScheduledPatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-offwhite text-navy">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="font-serif text-base text-navy">参加者専用エリア</p>
          <ScheduledPatientsHeaderActions />
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <ScheduledPatientsSidebar />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

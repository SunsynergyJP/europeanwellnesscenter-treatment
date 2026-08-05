# europeanwellnesscenter-treatment

European Wellness Center コタキナバルの幹細胞治療サイト(Next.js + Sanity + Auth.js）。

## セットアップ

```bash
npm install
cp .env.local.example .env.local  # 値を設定
npm run db:migrate                # 参加者DBのマイグレーション
npx tsx scripts/seed.ts --with-user-token  # Sanityへのサンプルコンテンツ投入(任意)
npm run dev
```

### 環境変数(`.env.local`)

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`: Sanityプロジェクト情報
- `SANITY_REVALIDATE_SECRET`: Sanity Webhookからのオンデマンド再検証用シークレット
- `AUTH_SECRET`: Auth.jsのセッション署名用シークレット(`openssl rand -base64 32`等で生成)
- `DATABASE_URL`: 参加者専用エリアの認証DB(Vercel Postgres / Neon)

## 参加者アカウントの招待

参加者専用エリア(`/scheduled-patients`)は招待制です。メール送信基盤が未接続のため、
現状は以下のスクリプトで招待URLを発行し、運営者が手動で共有します。

```bash
npx tsx scripts/invite-participant.ts --email taro@example.com --name "山田太郎"
```

## CMS(Sanity Studio)

`/studio` からコンテンツ(症例・医師・FAQ・患者様の声など)を編集できます。

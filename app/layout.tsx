import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  variable: "--font-serif-shippori",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "European Wellness Center コタキナバル | 幹細胞治療のご案内",
    template: "%s | European Wellness Center コタキナバル",
  },
  description:
    "コタキナバルEuropean Wellness Centerで受けられる幹細胞治療のご案内。安心・信頼を第一に、患者様お一人お一人に寄り添った治療計画をご提案します。",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${shipporiMincho.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-offwhite text-navy font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

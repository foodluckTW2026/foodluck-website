import type { Metadata } from "next";
import { Noto_Sans_TC, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "FOODLUCK — 台灣食物惜食平台",
  description:
    "用超值價格收購餐廳剩餘食物，加入 FOODLUCK 一起減少食物浪費。",
  keywords: ["剩食", "食物惜食", "減少浪費", "優惠餐廳", "台灣"],
  openGraph: {
    title: "FOODLUCK — 台灣食物惜食平台",
    description: "用超值價格收購餐廳剩餘食物，加入 FOODLUCK 一起減少食物浪費。",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

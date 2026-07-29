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
    metadataBase: new URL("https://foodluck.com.tw"),
    title: "FOODLUCK — 台灣惜食媒合平台",
    description: "讓當日美味轉化為額外收入，加入 FOODLUCK 一起減少食物浪費。",
    keywords: ["剩食", "惜食", "減少浪費", "友善時光", "永續"],
    icons: {
        icon: "/icon.png",
        shortcut: "/icon.png",
        apple: "/icon.png",
    },
    openGraph: {
        title: "FOODLUCK — 台灣惜食媒合平台",
        description:
            "讓當日美味轉化為額外收入，加入 FOODLUCK 一起減少食物浪費。",
        url: "https://foodluck.com.tw",
        siteName: "FOODLUCK",
        images: [
            {
                url: "/icon.png",
                alt: "FOODLUCK",
            },
        ],
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
            <body
                className={`${notoSansTC.variable} ${playfairDisplay.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}

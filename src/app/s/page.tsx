import type { Metadata } from "next";
import Link from "next/link";
import StoreTicket from "./StoreTicket";

/**
 * 店家 QR 導引頁（#277）— 只有「沒裝 App 且 worker 判不出手機平台」或桌機、爬蟲會看到。
 * 路徑：/s/{storeCode}，worker 把它改寫成這一頁；code 由 StoreTicket 從網址讀，純顯示。
 * 這頁不做核銷、不打 API、不嘗試開 custom scheme。
 */
export const metadata: Metadata = {
    title: "掃到店家取餐碼 — FOODLUCK",
    description: "下載 FOODLUCK，回到店家再掃一次取餐碼，就能在 App 裡完成取餐。",
    robots: { index: false, follow: false },
    other: {
        // iOS Safari 的 Smart App Banner；已裝 App 會顯示「開啟」
        "apple-itunes-app": "app-id=6763681592",
    },
};

const IOS_URL = "https://apps.apple.com/tw/app/id6763681592";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.foodluck2026.customer&hl=zh_TW";

export default function StoreLinkPage() {
    return (
        <main className="min-h-screen bg-[#F6FBF7] text-[#14261C] flex flex-col">
            <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-[26rem]">
                    <Link
                        href="/"
                        className="block text-center text-2xl font-black text-primary tracking-tight mb-10"
                    >
                        FOODLUCK
                    </Link>

                    <StoreTicket />

                    <h1 className="font-display text-[2rem] leading-tight font-black text-center mt-10 mb-4">
                        這家店的福袋，
                        <br />
                        在 App 裡等你
                    </h1>
                    <p className="text-center text-[#4E5E56] leading-relaxed mb-8 [text-wrap:pretty]">
                        你掃到的是店家的取餐碼。裝好 FOODLUCK 後回到店家再掃一次，就能在 App 裡完成取餐。
                    </p>

                    <div className="flex flex-col gap-3">
                        <a
                            href={IOS_URL}
                            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            <AppleMark />
                            到 App Store 下載
                        </a>
                        <a
                            href={ANDROID_URL}
                            className="inline-flex items-center justify-center gap-2 bg-white text-[#14261C] font-semibold px-8 py-4 rounded-full border border-[#14261C]/15 hover:border-primary hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            <PlayMark />
                            到 Google Play 下載
                        </a>
                    </div>

                    <p className="text-center text-sm text-[#6B7A72] mt-8">
                        已經有 App？打開 FOODLUCK，用裡面的掃描功能掃店家的取餐碼。
                    </p>
                </div>
            </div>

            <footer className="px-6 pb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#6B7A72]">
                <span className="whitespace-nowrap">© 2026 FOODLUCK 福來科技有限公司</span>
                <Link href="/privacy" className="whitespace-nowrap hover:text-primary">
                    隱私權政策
                </Link>
                <Link href="/terms" className="whitespace-nowrap hover:text-primary">
                    服務條款
                </Link>
            </footer>
        </main>
    );
}

function AppleMark() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.37 12.7c0-2.4 1.97-3.55 2.06-3.6-1.12-1.64-2.87-1.87-3.49-1.9-1.49-.15-2.9.88-3.65.88-.75 0-1.92-.86-3.15-.83-1.62.02-3.12.94-3.95 2.4-1.69 2.93-.43 7.27 1.21 9.65.8 1.16 1.76 2.47 3.01 2.42 1.21-.05 1.67-.78 3.13-.78 1.46 0 1.87.78 3.15.76 1.3-.02 2.13-1.18 2.92-2.35.92-1.35 1.3-2.65 1.32-2.72-.03-.01-2.54-.97-2.56-3.93zM13.98 5.62c.66-.8 1.11-1.92.99-3.03-.96.04-2.11.64-2.8 1.44-.61.71-1.15 1.85-1.01 2.94 1.07.08 2.16-.54 2.82-1.35z" />
        </svg>
    );
}

function PlayMark() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 3.6v16.8c0 .5.55.8.97.55l14.2-8.4a.64.64 0 0 0 0-1.1L4.97 3.05A.64.64 0 0 0 4 3.6z" />
        </svg>
    );
}

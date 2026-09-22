"use client";

import { useEffect, useState } from "react";

/**
 * 「取餐票根」：這頁唯一的視覺重點。白紙、鋸齒撕邊、打孔，中間放掃到的店家代碼（Playfair）。
 * code 只從網址 /s/{code} 讀來顯示，不打任何 API；讀不到就顯示通用票根。
 */
export default function StoreTicket() {
    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
        const match = /^\/s\/([A-Za-z0-9]{4,32})\/?$/.exec(window.location.pathname);
        setCode(match ? match[1].toUpperCase() : null);
    }, []);

    return (
        <div className="relative mx-auto w-full max-w-[20rem]" aria-label="店家取餐碼">
            {/* 撕邊：上下各一排小圓形挖空 */}
            <div
                className="bg-white shadow-[0_18px_40px_-24px_rgba(20,38,28,0.35)]"
                style={{
                    WebkitMaskImage:
                        "radial-gradient(circle at 10px 0, transparent 7px, black 7.5px), radial-gradient(circle at 10px 100%, transparent 7px, black 7.5px)",
                    WebkitMaskSize: "20px 51%",
                    WebkitMaskPosition: "0 0, 0 100%",
                    WebkitMaskRepeat: "repeat-x",
                    maskImage:
                        "radial-gradient(circle at 10px 0, transparent 7px, black 7.5px), radial-gradient(circle at 10px 100%, transparent 7px, black 7.5px)",
                    maskSize: "20px 51%",
                    maskPosition: "0 0, 0 100%",
                    maskRepeat: "repeat-x",
                }}
            >
                <div className="px-7 pt-9 pb-8 text-center">
                    <div className="text-sm text-[#6B7A72] mb-3">店家取餐碼</div>
                    <div className="font-display text-[2.6rem] leading-none font-black tracking-[0.12em] text-[#14261C] break-all">
                        {code ?? "FOODLUCK"}
                    </div>
                    <div className="mx-auto mt-6 w-16 border-t-2 border-dashed border-[#14261C]/15" />
                    <div className="mt-4 text-sm text-[#4E5E56]">請用 FOODLUCK App 掃描</div>
                </div>
            </div>
            {/* 票根打孔 */}
            <div
                className="absolute left-1/2 -translate-x-1/2 -top-2 h-4 w-4 rounded-full bg-[#F6FBF7]"
                aria-hidden="true"
            />
        </div>
    );
}

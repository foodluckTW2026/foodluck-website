"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const DEEPLINK_SCHEMES: Record<string, string> = {
    consumer: "foodluck2026://",
    store: "foodluck2026-merchant://",
};

export default function ResetPasswordClient() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const appType = searchParams.get("app") ?? "consumer";
    const [triggered, setTriggered] = useState(false);

    const deeplink = useMemo(() => {
        if (!token || !email) return null;
        const scheme = DEEPLINK_SCHEMES[appType] ?? DEEPLINK_SCHEMES.consumer;
        const query = new URLSearchParams({ token, email }).toString();
        return `${scheme}reset-password?${query}`;
    }, [token, email, appType]);

    useEffect(() => {
        if (!deeplink) return;
        window.location.href = deeplink;
        setTriggered(true);
    }, [deeplink]);

    if (!token || !email) {
        return (
            <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900 mb-3">
                    連結無效
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                    此重設密碼連結缺少必要參數。請回到 FOODLUCK App
                    重新申請忘記密碼。
                </p>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-3">
                正在開啟 FOODLUCK App
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {triggered
                    ? "如果 App 沒有自動開啟，請點下方按鈕。"
                    : "請稍候..."}
            </p>

            <a
                href={deeplink!}
                className="inline-block bg-primary text-white font-semibold rounded-lg px-8 py-3 hover:opacity-90 transition-opacity"
            >
                在 App 中重設密碼
            </a>

            <hr className="my-6 border-gray-200" />

            <p className="text-gray-500 text-xs leading-relaxed">
                如果您還沒安裝 FOODLUCK App，請先到 App Store 或 Google Play
                下載後再點擊此頁面上方的按鈕。
            </p>
        </div>
    );
}

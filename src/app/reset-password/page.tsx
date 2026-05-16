import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
    title: "重設密碼 — FOODLUCK",
    description: "重設您的 FOODLUCK 帳號密碼",
    referrer: "no-referrer",
    robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
    return (
        <>
            <main className="min-h-screen bg-[#F6FBF7] pt-24 pb-16 px-6">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8">
                    <div className="text-center mb-6">
                        <span className="text-3xl font-black text-primary tracking-tight">
                            FOODLUCK
                        </span>
                    </div>
                    <Suspense
                        fallback={
                            <p className="text-center text-gray-500 text-sm">
                                載入中...
                            </p>
                        }
                    >
                        <ResetPasswordClient />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </>
    );
}

import Link from "next/link";
import LineContactLink from "@/components/LineContactLink";

const lineOfficialAccount = "https://lin.ee/OUqBsHc";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    {/* Logo & Tagline */}
                    <div>
                        <span className="text-2xl font-black text-primary tracking-tight">
                            FOODLUCK
                        </span>
                        <p className="text-gray-400 text-sm mt-2">
                            福來科技有限公司
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            統一編號:62214273
                        </p>
                    </div>

                    <LineContactLink
                        href={lineOfficialAccount}
                        label="LINE客服"
                        className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#06C755]/50 hover:bg-white/10"
                    />
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2026 FOODLUCK 福來科技有限公司
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            隱私權政策
                        </Link>
                        <Link
                            href="/terms"
                            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            服務條款
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

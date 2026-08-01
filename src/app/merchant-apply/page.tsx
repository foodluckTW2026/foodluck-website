import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MerchantApplicationForm from "@/components/MerchantApplicationForm";

export const metadata: Metadata = {
    title: "商家合作申請 | FOODLUCK",
    description:
        "把即期餐點轉成額外收入與新客接觸點。免費提出 FOODLUCK 商家合作申請，3 個工作天內由專人聯繫。",
};

const benefits = [
    {
        title: "增加額外收入",
        description: "原本要報廢的食物，轉變為實際收入，降低營運成本。",
        image: "https://images.pexels.com/photos/6249398/pexels-photo-6249398.jpeg?auto=compress&cs=tinysrgb&w=900",
        alt: "餐廳工作人員準備餐點",
    },
    {
        title: "讓附近新客找到你",
        description: "用一份餐點建立第一次接觸，讓取餐成為顧客認識品牌的入口。",
        image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=80",
        alt: "顧客走進餐廳取餐",
    },
    {
        title: "輕鬆操作",
        description: "簡單上架，手機或平板即可管理，無需額外設備或人力。",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
        alt: "店家使用手機管理餐點",
    },
];

const process = [
    {
        step: "01",
        title: "填寫線上申請",
        description: "提供店家基本資訊與聯絡方式，3 分鐘輕鬆完成。",
    },
    {
        step: "02",
        title: "專人審核聯繫",
        description: "我們會在 3 個工作天內以 Email 與您聯繫確認。",
    },
    {
        step: "03",
        title: "開通帳號上架",
        description: "通過後協助開通店家後台、提供操作教學與上線支援。",
    },
];

const faqs = [
    {
        question: "申請後多久會收到回覆？",
        answer: "送出資料後，我們會在 3 個工作天內透過 Email 與你聯繫。",
    },
    {
        question: "需要準備額外設備嗎？",
        answer: "不需要添購專用設備，使用手機或平板即可進行操作。",
    },
    {
        question: "每天都一定要上架嗎？",
        answer: "FOODLUCK的宗旨是協助商家解決剩食問題，不需要每天都上架。",
    },
    {
        question: "還不確定是否適合，也能先申請嗎？",
        answer: "可以。填寫申請不代表立即上線，專人會先了解需求並和你確認合作方式。",
    },
];

export default function MerchantApplyPage() {
    return (
        <>
            <Navbar />
            <main className="bg-white text-gray-900">
                <section className="relative flex min-h-[70vh] items-center overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/merchant-hero-v2.png"
                            alt="餐廳店主正在準備供顧客取餐的餐盒"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />
                    </div>

                    <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 md:py-32">
                        <div className="max-w-2xl">
                            <span className="mb-6 inline-block rounded-full border border-primary/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                                For Merchants 給商家
                            </span>
                            <h1 className="font-display text-4xl font-black leading-tight text-white md:text-6xl">
                                讓每份好味道，
                                <br />
                                <span className="text-primary">
                                    被更多人認識。
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                                彈性上架當日餐點，讓剩食變收入，也讓附近顧客走進你的店。
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="#apply-form"
                                    className="inline-flex min-w-[180px] items-center justify-center whitespace-nowrap rounded-full bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-px"
                                >
                                    立即申請
                                </Link>
                                <Link
                                    href="#how-it-works"
                                    className="inline-flex min-w-[180px] items-center justify-center whitespace-nowrap rounded-full border border-white/60 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-gray-900 active:translate-y-px"
                                >
                                    合作方式
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-16">
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                                Why Join 為什麼加入
                            </span>
                            <h2 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                                把每天的用心，
                                <br />
                                變成收入與新客
                            </h2>
                        </div>

                        <div className="mb-12 grid gap-8 md:grid-cols-3">
                            {benefits.map((benefit) => (
                                <article
                                    key={benefit.title}
                                    className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={benefit.image}
                                            alt={benefit.alt}
                                            fill
                                            sizes="(min-width: 768px) 33vw, 100vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-500">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="bg-gray-50 py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-14 md:text-right">
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                                How It Works 合作流程
                            </span>
                            <h2 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                                從申請到上線，
                                <br />
                                每一步都有人協助
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {process.map((item) => (
                                <article
                                    key={item.step}
                                    className="rounded-2xl bg-white p-8 shadow-sm"
                                >
                                    <span className="font-display text-5xl font-black text-primary">
                                        {item.step}
                                    </span>
                                    <h3 className="mt-4 text-xl font-bold text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                        {item.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                                商家常見問題
                            </h2>
                            <p className="mt-4 text-gray-500">
                                申請前想確認的事情，我們先替你整理好了。
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="group rounded-2xl bg-gray-50 p-6 open:bg-primary/5"
                                >
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
                                        {faq.question}
                                        <span
                                            aria-hidden="true"
                                            className="text-xl font-normal text-primary transition-transform group-open:rotate-45"
                                        >
                                            +
                                        </span>
                                    </summary>
                                    <p className="mt-4 text-sm leading-relaxed text-gray-500">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="apply-form" className="bg-gray-50 py-24">
                    <div className="mx-auto max-w-3xl px-6">
                        <div className="mb-12 text-center">
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                                Apply Now 商家申請
                            </span>
                            <h2 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                                準備好加入 FOODLUCK 了嗎？
                            </h2>
                            <p className="mt-4 leading-relaxed text-gray-500">
                                填寫資料後，專人會在 3 個工作天內與你聯繫。
                            </p>
                        </div>

                        <MerchantApplicationForm />
                        <p className="mt-8 text-center text-sm text-gray-500">
                            申請遇到問題？來信
                            <a
                                href="mailto:service@foodluck.com.tw"
                                className="ml-1 font-semibold text-primary hover:underline"
                            >
                                service@foodluck.com.tw
                            </a>
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

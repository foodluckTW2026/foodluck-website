import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MerchantApplicationForm from "@/components/MerchantApplicationForm";

export const metadata: Metadata = {
  title: "商家申請加入 | FOODLUCK",
  description:
    "加入 FOODLUCK 一起減少食物浪費。線上填寫申請表單，3 個工作天內專人聯繫。",
};

const benefits = [
  {
    title: "增加收益",
    description: "原本要報廢的食物，轉變為實際收入，降低營運成本。",
  },
  {
    title: "觸及新客",
    description: "讓更多在地消費者透過 FOODLUCK 認識你的品牌。",
  },
  {
    title: "輕鬆操作",
    description: "簡單上架，手機即可管理，無需額外設備或人力。",
  },
];

const flow = [
  {
    step: "01",
    title: "填寫線上申請",
    desc: "提供店家基本資訊與聯絡方式，3 分鐘輕鬆完成。",
  },
  {
    step: "02",
    title: "專人審核聯繫",
    desc: "我們會在 3 個工作天內以 Email 與您聯繫確認。",
  },
  {
    step: "03",
    title: "開通帳號上架",
    desc: "通過後協助開通店家後台、提供操作教學與上線支援。",
  },
];

export default function MerchantApplyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — 與首頁同款 image bg + overlay */}
        <section className="relative flex items-center overflow-hidden min-h-[60vh] md:min-h-[70vh]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80"
              alt="商家申請"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-32">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-6 border border-primary/50 px-3 py-1 rounded-full">
                For Merchants 商家申請
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                讓剩食變收入，
                <br />
                <span className="text-primary">免費加入 FOODLUCK。</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                填寫下方表單，3 個工作天內專人聯繫，
                <br />
                協助你快速上線、開始銷售。
              </p>
            </div>
          </div>
        </section>

        {/* Benefits — bg-white section pattern */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                Why Join 為什麼加入
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                和我們一起，
                <br />
                把剩食變成收入
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-gray-50 rounded-2xl p-8 transition-shadow duration-300 hover:shadow-md"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {b.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flow — bg-gray-50 section pattern */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14 md:text-right">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                How It Works 申請流程
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                簡單三步，
                <br />
                就能開始上架
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {flow.map((item) => (
                <div
                  key={item.step}
                  className="bg-white rounded-2xl p-8 shadow-sm"
                >
                  <span className="font-display text-5xl font-black text-primary">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form — bg-white section pattern */}
        <section id="apply-form" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                Apply Now 線上申請
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                填寫申請表單
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                所有欄位資料僅用於審核作業，不會公開展示。
              </p>
            </div>
            <MerchantApplicationForm />
            <p className="mt-8 text-center text-sm text-gray-500">
              有問題嗎？歡迎來信
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

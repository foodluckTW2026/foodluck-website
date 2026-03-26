import Image from "next/image";

const stats = [
  { value: "50+", label: "合作商家" },
  { value: "1,000+", label: "已惜食份數" },
  { value: "持續", label: "減少碳排放中" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80"
                alt="健康餐盒"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-4 max-w-xs">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-primary">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text */}
          <div className="md:pl-8">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              About FOODLUCK
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              我們為什麼
              <br />
              做 FOODLUCK
            </h2>
            {/* Quote */}
            <div className="mb-6 border-l-4 border-primary pl-5">
              <p className="text-gray-900 font-semibold text-lg leading-relaxed italic">
                「看著用心準備的健康餐盒，只因為打烊就必須丟進垃圾桶，那種心痛是很難形容的。」
              </p>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                這不僅是許多餐飲老闆的日常，也是FOODLUCK團隊負責人過去經營健康餐盒時的真實經歷。那些食材明明新鮮、美味，卻因為預估落差，只能無奈地自己帶回家硬吃，或是心痛地當作廚餘處理。市場上一直缺乏一個真正簡單、流暢的管道來解決這個問題。
              </p>
              <p>
                為此，我們決定自己動手，為台灣打造一個通用且好用的「惜食媒合平台」。讓店家能輕鬆轉化打烊前的優質餐點，也讓消費者能用超值的價格，帶走一份充滿驚喜的美味。
              </p>
              <p className="text-xl font-bold text-gray-900 mt-2">
                救地球不用很偉大，在 FOODLUCK 拯救一份美味就可以！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
          alt="食物背景"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay with green tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-6 border border-primary/50 px-3 py-1 rounded-full">
            台灣食物惜食平台
          </span>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Have A Foodluck,
            <br />
            <span className="text-primary">Have A Goodluck.</span>
          </h1>

          {/* Sub Headline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
            買 1 份剩食，獲得 1 整天的幸運
            <br />
            讓臺灣的好食物，以最佳狀態被消費
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center min-w-[200px] bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/30"
            >
              消費者 — 下載 App
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center min-w-[200px] bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-accent/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-accent/30"
            >
              商家 — 加入合作
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}

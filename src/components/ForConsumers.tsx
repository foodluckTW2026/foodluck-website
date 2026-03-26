import Image from "next/image";

const benefits = [
  {
    title: "超值消費",
    description: "搶救今日剩食最低5折起，購買商家當日未販售出的食物，新鮮不浪費！",
    image: "https://images.pexels.com/photos/130491/pexels-photo-130491.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "麵包店陳列",
  },
  {
    title: "盲盒驚喜",
    description: "不知道今天吃什麼？讓 FOODLUCK 幫你決定，每次開盒都是驚喜！",
    image: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80",
    alt: "街道商家場景",
  },
  {
    title: "一起救地球",
    description: "每一筆消費都在減少糧食浪費，吃得開心，也為永續盡一份力！",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    alt: "消費者用餐場景",
  },
];

export default function ForConsumers() {
  return (
    <section id="consumers" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            For Consumers 給消費者
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            今天吃什麼？
            <br />
            讓 FOODLUCK 幫你決定
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Text */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center min-w-[220px] bg-primary text-white font-semibold px-10 py-4 rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/20"
          >
            APP STORE 下載
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center min-w-[220px] bg-primary text-white font-semibold px-10 py-4 rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/20"
          >
            GOOGLE PLAY 下載
          </a>
        </div>
      </div>
    </section>
  );
}

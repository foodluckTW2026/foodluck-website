"use client";
import Image from "next/image";

const benefits = [
    {
        title: "增加收益",
        description: "原本要報廢的食物，轉變為實際收入",
        image: "https://images.pexels.com/photos/6249398/pexels-photo-6249398.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "美味的炸雞餐盒",
    },
    {
        title: "觸及新客",
        description: "觸及更多願意嘗試你的顧客，擴大品牌曝光",
        image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
        alt: "商家廚房結帳場景",
    },
    {
        title: "輕鬆操作",
        description: "簡單上架，無需額外設備，手機即可管理",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        alt: "手機操作介面場景",
    },
];

export default function ForMerchants() {
    const handleClick = () => {
        alert("籌備中，敬請期待!");
    };
    return (
        <section id="merchants" className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16 md:text-right">
                    <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                        For Merchants 給商家
                    </span>
                    <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        讓剩食變收入，
                        <br />
                        零浪費後開始賺
                    </h2>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {benefits.map((item, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                    <a
                        className="inline-flex items-center gap-2 border-2 border-accent text-accent font-semibold px-10 py-4 rounded-full hover:bg-accent hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        onClick={handleClick}
                    >
                        免費申請加入
                    </a>
                </div>
            </div>
        </section>
    );
}

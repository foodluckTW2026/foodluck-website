const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "LINE", href: "#" },
];

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

                    {/* Social Links */}
                    {/* <div className="flex items-center gap-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div> */}
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2026 FOODLUCK 福來科技有限公司
                    </p>
                    {/* <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              隱私政策
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              服務條款
            </a>
          </div> */}
                </div>
            </div>
        </footer>
    );
}

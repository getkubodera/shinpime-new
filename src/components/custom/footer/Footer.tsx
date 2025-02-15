// app/components/footer.tsx

import Link from "next/link";

export default function Footer() {
    // DTO for Footer Data
    interface FooterData {
        branding: string;
        tagline: string;
        links: { name: string; href: string }[];
        copyright: string;
    }

    // Hardcoded footer data
    const footerData: FooterData = {
        branding: "Shinpi Me",
        tagline: "神秘の私 | 人を深く励ます | 内なる自由を見つける", // Empowering digital solutions
        links: [
            { name: "ホーム", href: "/" },
            { name: "概要", href: "/about" },
         //   { name: "製品", href: "/products" },
            { name: "書籍", href: "/books" },
            { name: "ブログ", href: "https://blog.shinpi.me" },
        ],
        copyright: `© ${new Date().getFullYear()} Shinpi Me. 無断転載を禁じます`,
    };

    return (
        <footer className="bg-gray-800 text-gray-100 py-8 mt-16">
            <div className="container mx-auto px-4">
                {/* Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left side: Website Name or Branding */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl font-extrabold text-blue-400 hover:text-blue-500 transition-colors cursor-pointer">
                            {footerData.branding}
                        </h2>
                        <p className="mt-2 text-gray-400">{footerData.tagline}</p>
                    </div>

                    {/* Center: Footer Links */}
                    <div className="flex flex-wrap justify-center md:justify-start space-x-8 mb-6 md:mb-0">
                        {footerData.links.map((data, index) => (
                            <Link key={index} href={data.href} className="text-lg hover:text-blue-400 transition-colors">
                                {data.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div className="text-center mt-8 text-gray-400">
                    <p>{footerData.copyright}</p>
                </div>
            </div>
        </footer>
    );
}

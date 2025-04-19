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
            { name: "ブログ", href: "/blog" },
        ],
        copyright: `© ${new Date().getFullYear()} Shinpi Me. 無断転載を禁じます`,
    };

    return (
        <footer className="bg-background border-t border-border/50 text-foreground py-12 mt-16">
            <div className="astro-container px-4">
                {/* Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left side: Website Name or Branding */}
                    <div className="text-center md:text-left mb-8 md:mb-0">
                        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
                            {footerData.branding}
                        </Link>
                        <p className="mt-2 text-muted-foreground">{footerData.tagline}</p>
                    </div>

                    {/* Center: Footer Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8 md:mb-0">
                        {footerData.links.map((data, index) => (
                            <Link 
                                key={index} 
                                href={data.href} 
                                className="text-base text-muted-foreground hover:text-primary transition-colors"
                            >
                                {data.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div className="text-center mt-8 pt-8 border-t border-border/30 text-muted-foreground text-sm">
                    <p>{footerData.copyright}</p>
                </div>
            </div>
        </footer>
    );
}

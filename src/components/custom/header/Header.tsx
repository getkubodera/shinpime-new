'use client'
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderData {
    name: string;
    href: string;
}

const headerData: HeaderData[] = [
    { name: "ホーム", href: "/" },
    { name: "ブログ", href: "https://blog.shinpi.me" },
    { name: "概要", href: "/about" },
    { name: "書籍", href: "/books" },
    //{ name: "製品", href: "/products" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 text-foreground py-4 shadow-sm w-full z-10 top-0 sticky">
            <div className="astro-container flex justify-between items-center px-4">
                {/* Left side: Website Name */}
                <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
                    Shinpi Me
                </Link>

                {/* Right side: Navbar (Desktop version) */}
                <nav className="hidden md:flex space-x-8">
                    {headerData.map((data, index) => (
                        <Link 
                            key={index} 
                            href={data.href} 
                            className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                        >
                            {data.name}
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button (visible on small screens) */}
                <div className="md:hidden">
                    {/* Button to toggle mobile menu */}
                    <Button 
                        onClick={toggleMenu} 
                        variant="ghost" 
                        size="icon"
                        className="text-foreground hover:text-primary hover:bg-accent"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu (show vertical list of links when open) */}
            {isMenuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border/50 text-foreground py-4 space-y-4">
                    {headerData.map((data, index) => (
                        <Link
                            key={index}
                            href={data.href}
                            className="block text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300 text-center py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {data.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}

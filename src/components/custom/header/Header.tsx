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
    { name: "製品", href: "/products" },
    { name: "概要", href: "/about" },
    /*{ name: "活動内容", href: "/work" },*/
    { name: "書籍", href: "/books" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <header className="bg-gray-800 text-gray-100 py-4 shadow-md w-full z-10 top-0">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Left side: Website Name */}
                <h1 className="text-3xl font-extrabold text-blue-400 hover:text-blue-500 transition-colors cursor-pointer">
                    Shinpi Me
                </h1>

                {/* Right side: Navbar (Desktop version) */}
                <nav className="hidden md:flex space-x-8">
                    {headerData.map((data, index) => (
                        <Link key={index} href={data.href} className="text-lg font-medium hover:text-blue-400 transition-all duration-300 relative group">
                            {data.name}
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button (visible on small screens) */}
                <div className="md:hidden">
                    {/* Button to toggle mobile menu */}
                    <Button onClick={toggleMenu} className="text-2xl text-white hover:text-blue-400 transition-colors">
                        ☰
                    </Button>
                </div>
            </div>

            {/* Mobile Menu (show vertical list of links when open) */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 text-gray-100 py-4 space-y-4">
                    {headerData.map((data, index) => (
                        <Link
                            key={index}
                            href={data.href}
                            className="block text-lg font-medium hover:text-blue-400 transition-all duration-300 text-center"
                        >
                            {data.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}

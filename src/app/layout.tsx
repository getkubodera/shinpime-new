import type { Metadata } from "next";

import "./globals.css";
import {ThemeProvider} from "@/components/custom/themeprovider/ThemeProvider";
import { Inter } from "next/font/google";
import Header from "@/components/custom/header/Header";
import Footer from "@/components/custom/footer/Footer";
// Import Once-UI typography-like font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shinpi.me | 岳久保寺 | 人を深く励ます/神秘の私 | 内なる自由を見つける",
  description: "日本文化の根底にある空や無の世界観を現代に表現し、心と意識の自由を探求し人々の成長をサポートしながら、世界に新たな価値をもたらす。",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
  },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
            <ThemeProvider>
                <html lang="ja" className={inter.className}>
                <body className="min-h-screen bg-background text-foreground font-sans antialiased">
                <Header/>
                {children}
                <Footer/>
                </body>
                </html>
            </ThemeProvider>
    );
}

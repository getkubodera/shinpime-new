// app/pages/index.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, MessageSquare, FileText, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageSlider from "@/components/custom/slider/ImageSlider";
import ConsultationCard from "@/components/custom/consultation/ConsultationCard";

// Data for the page
const pageData = {
  consultation: {
    title: "shinpi me カウンセリング",
    description:
        "shinpi me カウンセリング～内なる神秘を探し、本来の自分に還る",
    plans: [
      {
        name: "ベーシックコース：「内なる静寂を見つける」",
        price: "¥5,000 / セッション",
        description: "1対1のオンラインセッション（30分）",
        points: [
          "はじめてカウンセリングを受ける人、忙しい日常の中で手軽に心を整えたい人。",
          "短時間で自分を見つめ直すためのシンプルなセッション。",
          "主にカウンセリング中心で、日常生活に取り入れやすいアドバイスを提供。",
        ],
        link: "https://book.squareup.com/appointments/4lq2tdfpxuuee3/location/LVEG5SJSD88B9/services/RJFF5GBWTSWOTLUG2TCMASGX",
      },
      {
        name: "ディープダイブコース：「心の神秘と向き合う」",
        price: "¥10,000 / セッション",
        description: "1対1のオンラインまたは対面セッション（60分）",
        points: [
          "深い内省と心の奥にある問題の根本原因にアプローチするセッション。",
          "東洋思想やスピリチュアルの視点を取り入れながら、実践的なワークも行う。",
          "主なテーマ例：人生の目的探し、感情の解放、自己成長のプロセス。",
          "セッション後にメールフォローアップ（アドバイスや質問回答付き）。",
        ],
        link: "https://book.squareup.com/appointments/4lq2tdfpxuuee3/location/LVEG5SJSD88B9/services/27YKS5JX6P2XBLQHBU7W5SN5",
      },
      {
        name: "トランスフォーメーションコース：「本来の自分に還る」",
        price: "¥30,000 / 月",
        description: "月額制プラン（週1回60分×4回のセッション + 無制限メールサポート）",
        points: [
          "人生の大きな転換期にいる人、深い変容を求めている人、東洋思想に基づく指導をじっくり学びたい人。",
          "継続的なサポートを提供し、大きな人生の変革を目指すコース。",
          "月4回のセッションを通じて、包括的な自己変革プランを作成し、実践をサポート。",
          "主なテーマ例：長期的な目標達成、東洋思想を生かした生き方の指導、無や空の哲学の応用。",
          "人生の大きな転換期にいる人、深い変容を求めている人、東洋思想に基づく指導をじっくり学びたい人。",
        ],
        link: "https://book.squareup.com/appointments/4lq2tdfpxuuee3/location/LVEG5SJSD88B9/services/USHZP7RXTKNF4J736SOG5NQP",
      },
    ],
  },
  books: {
    title: "shinpi me ブックス",
    description:
        "これらの書籍があなたに日本の文化や思想、世界観に関する新たな視点を与え、自らの神秘に気づき、内なる自由を得るための一助になります。\n",
    link: "/books",
    featuredBooks: [
      {
        title: "中村天風の師、頭山満の人材育成術",
        image: "https://m.media-amazon.com/images/I/411ETp4HUYL.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E/dp/B07FSX1363/"
      },
      {
        title: "ぼっけもんリーダー術",
        image: "https://m.media-amazon.com/images/I/71ITBZb6zBL._SL1500_.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E-ebook/dp/B07262BVX8"
      },
      {
        title: "頭山満のサラリーマン問題解決法",
        image: "https://m.media-amazon.com/images/I/51AROYDqiHL.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E/dp/B07FDN2P9B/"
      }
    ]
  },
  products: {
    title: "shinpi me プロダクト",
    description:
        "これらの品々にこめられた日本文化の根底にある精神が、空間からあなたの心を癒し、励まします。",
    link: "/products",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Integrated Slider */}
      <section className="relative py-8 sm:py-12 px-4 overflow-hidden">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="astro-container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Left: Profile and Title */}
            <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6 md:max-w-xl w-full">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <Image
                  src="https://blog.shinpi.me/wp-content/uploads/2024/10/kubo-1.jpg"
                  alt="冨嶽百太郎の写真"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center md:text-left space-y-3 md:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  {pageData.consultation.title}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  {pageData.consultation.description}
                </p>
              </div>
            </div>
            
            {/* Right: Image Slider */}
            <div className="flex-1 w-full h-[25vh] sm:h-[30vh] md:h-[35vh] mt-4 md:mt-0">
              <ImageSlider />
            </div>
          </div>

          {/* Quick Links Below Profile */}
          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <Link href="/books" className="block">
                <Card className="astro-card card-hover h-full transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-3 sm:p-4 flex flex-col items-center space-y-1 sm:space-y-2">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    <span className="font-medium text-sm sm:text-base">書籍</span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="https://blog.shinpi.me" className="block">
                <Card className="astro-card card-hover h-full transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-3 sm:p-4 flex flex-col items-center space-y-1 sm:space-y-2">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    <span className="font-medium text-sm sm:text-base">ブログ</span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="#consultation" className="block">
                <Card className="astro-card card-hover h-full transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-3 sm:p-4 flex flex-col items-center space-y-1 sm:space-y-2">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    <span className="font-medium text-sm sm:text-base">カウンセリング</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="astro-section py-8 sm:py-12">
        <div className="astro-container space-y-8 sm:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">カウンセリングプラン</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              あなたのニーズに合わせた3つのプランをご用意しています
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {pageData.consultation.plans.map((plan, index) => (
              <ConsultationCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="astro-section bg-secondary/10 py-8 sm:py-12">
        <div className="astro-container">
          <div className="astro-card rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
            <div className="flex flex-col space-y-6 sm:space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
                <div className="space-y-3 sm:space-y-4 flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                    {pageData.books.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    {pageData.books.description}
                  </p>
                </div>
                <Link href={pageData.books.link} className="w-full md:w-auto">
                  <Button className="button-hover astro-button w-full md:w-auto flex items-center justify-center gap-2">
                    書籍へ
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              {/* Featured Books */}
              <div className="mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-4 sm:mb-6 text-center">おすすめの書籍</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {pageData.books.featuredBooks.map((book, index) => (
                    <Link href={book.link} key={index} target="_blank" rel="noopener noreferrer">
                      <Card className="astro-card card-hover h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden border-2 border-primary/10">
                        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20">
                            <h4 className="font-bold text-white text-base sm:text-lg drop-shadow-md">{book.title}</h4>
                          </div>
                        </div>
                        <CardContent className="p-3 sm:p-4 flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-muted-foreground">Amazonで購入</span>
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

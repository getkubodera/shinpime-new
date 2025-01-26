// app/pages/index.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

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
        link: "https://app.squareup.com/appointments/book/4lq2tdfpxuuee3/LVEG5SJSD88B9/start", // Add link here
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
        link: "https://app.squareup.com/appointments/book/4lq2tdfpxuuee3/LVEG5SJSD88B9/start", // Add link here
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
        link: "https://app.squareup.com/appointments/book/4lq2tdfpxuuee3/LVEG5SJSD88B9/start", // Add link here
      },
    ],
  },
  books: {
    title: "shinpi me ブックス",
    description:
        "これらの書籍があなたに日本の文化や思想、世界観に関する新たな視点を与え、自らの神秘に気づき、内なる自由を得るための一助になります。\n",
    link: "/books",
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
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Consultation Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 text-left">
            {pageData.consultation.title}
          </h1>
          <p className="text-lg text-gray-600 text-left">
            {pageData.consultation.description}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {pageData.consultation.plans.map((plan, index) => (
                <Card key={index} className="shadow-md h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-left">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-500 text-left">
                      {plan.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-gray-700 mb-4 text-left">{plan.description}</p>
                    <ul className="space-y-2 mb-auto">
                      {plan.points.map((point, idx) => (
                          <li key={idx} className="flex items-center space-x-3 text-left">
                            {/* Consistent icon size across all points */}
                            <CheckCircle className="text-green-500 w-10 h-10" /> {/* Same size for all icons */}
                            <span className="text-gray-600">{point}</span>
                          </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Link href={plan.link}> {/* Wrap Button with Link */}
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          予約
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </section>

        {/* Books Section */}
        <section className="flex flex-col md:flex-row items-center justify-between bg-blue-50 rounded-lg p-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-800 text-left">
              {pageData.books.title}
            </h2>
            <p className="text-gray-600 text-left">{pageData.books.description}</p>
          </div>
          <Link href={pageData.books.link}>
            <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              書籍へ
            </Button>
          </Link>
        </section>

        {/* Products Section */}
        <section className="flex flex-col md:flex-row items-center justify-between bg-blue-50 rounded-lg p-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-800 text-left">
              {pageData.products.title}
            </h2>
            <p className="text-gray-600 text-left">{pageData.products.description}</p>
          </div>
          <Link href={pageData.products.link}>
            <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              商品へ
            </Button>
          </Link>
        </section>
      </main>
  );
}

// app/pages/books.tsx
'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

// Data for the books
const booksData = [
    {
        title: "中村天風の師、頭山満の人材育成術。人材育成で悩むあなたへ。",
        description: "社会であれ組織であれ要は人である。しかし、人の上に立つようになって初めて、人を育てることがいかに大変であるかがわかる。それは、子をもつ親も同じである。筆者が人生の壁に突きあたるたびにひも解き、励まされてきたのが、頭山満の生き方である。頭山満とはいったい誰なのか？大アジア主義者であり、在野の国士である。一方で、人材育成者の顔をもつ。昭和の哲学者、中村天風を初め、有名無名を問わず、各界に多くの人材を輩出した。彼らに伝えたのが、「一人でいても淋しくない人間になれ」というメッセージであった。本書では、この言葉の意味するところはなんであったのか？なぜ伝えたのか？さまざまな方向から考えることで、頭山満・人材育成術の奥義にせまる。本書を読むことで、とくに上司、教師、親…人を育てる立場にある人の心は少し軽くなるであろう。なぜならば、頭山の教えは、人間の本質をついているからだ。彼が指し示した方向をヒントに、自分ができることを実践していけば、人を育てるとともに、いつのまにか自分も育てられていることに気づくであろう。",
        image: "https://m.media-amazon.com/images/I/411ETp4HUYL.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E/dp/B07FSX1363/"
    },
    {
        title: "ぼっけもんリーダー術～リーダーに必要な「呆ける」は『老子』が教えてくれる！20分で読めるシリーズ ",
        description: "洋子は、男性に負けまいと勉強や仕事に邁進してきた優秀なビジネスウーマンである。ところが管理職となって仕事がうまくいかなくなり、人生の迷路にはまってしまう。\n" +
            "あるとき、彼女は「呆子」という不思議な老人から日本古来の指導者像に基づく「ぼっけもんリーダー術」を学び、将来に希望を見出すようになる。\n" +
            "\n" +
            "―ぜひ本書を、男性女性を問わず、リーダーシップに悩む人、人生がうまくいっていない人に読んでいただきたい。\n" +
            "きっと主人公に自分を重ね合わせて、リーダーシップへのストレスが軽くなり、そして自分の人生をあらためて見つめるきっかけともなるだろう。\n" +
            "\n" +
            "なぜならば、「ぼっけもんリーダー術」を学ぶことはリーダーシップの原点に返ることであり、\"自分の心\"を学ぶことだからである。\n" +
            "さらに『老子』というレンズを合わせることで、それがより深く明瞭に見えるようになる。\n" +
            "\n" +
            "本書には、生粋のぼっけもんである西郷隆盛やその弟の西郷従道の他に、勝海舟や元京大総長で科学者の平澤興、自然農法の福岡正信などが登場する。\n" +
            "\n" +
            "彼らが呆子とともに、リーダーシップだけではなくて、人生に必要な「呆ける」を教えてくれるだろう。",
        image: "https://m.media-amazon.com/images/I/71ITBZb6zBL._SL1500_.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E-ebook/dp/B07262BVX8"
    },
    {
        title: "頭山満のサラリーマン問題解決法。閉塞感でモヤモヤ苦しいあなたの人生が輝き出すヒント。",
        description: "生きていると必ず生じるさまざまな\"問題\"。誰もが日々、悩みを抱え仕事をしている。本書はそんな悩める、ビジネスパーソンを中心とした２０代～４０代くらいの男女のためにある。他人から些細なことだと思われる問題でも、自分の中ではどんどん膨らんでいく。そして、仕事が手につかず、何も考えられなくなり絶望する。そんなこともあるだろう。本書を読むことで、堂々巡りしていたところから、少なくとも自分の問題の解決、悩みの解消に向かって一歩を踏み出せる。なぜならば、\"頭山満\"という歴史上類のない型破りな人物を現代によみがえらせ、現代人のさまざまな問題に当たらせている。そのため読者は「頭山満という鏡」を通して自分を見ることで、今までとは違った視点から目前の問題と人生をみることができるからだ。その上で、本書が指し示す具体的な行動を起こせば、主体的に変化を起こせる。こうしてあなたは、直面する問題を突破して、誰に何を言われようと独自の生き方をした頭山満のように、自分らしい人生を堂々と生き始めるだろう。",
        image: "https://m.media-amazon.com/images/I/51AROYDqiHL.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E/dp/B07FDN2P9B/"
    },
    {
        title: "ぼっけもんリーダー術～「呆ける」ことがリーダーに求められている～",
        description: "係長、課長、部長など会社で長のつく役職を与えられた人、その他企業経営者、地域、家庭の父母…。社会の至るところにリーダーのポジションはある。突然、「これからリーダーとして、みんなを引っ張ってくれ」と言われて、「自分は先頭に立つのは向いていないのに…」と重い負担を感じている人もいるだろう。まったく気の毒に思う。しかしである。本来、日本人のリーダーシップとは「先頭に立って、集団を引っ張っていく」ことではなかった。それは、戦後入ってきた欧米流である。人を率いて人並み外れた能力を発揮することは必ずしもいらない。むしろ「呆ける」ことがもっとも優れたリーダーの条件であった。鹿児島に生まれた「ぼっけもんリーダー術」こそがそれである。このリーダーの在り方は、部下を信頼して、それぞれの力を発揮させるがゆえに、組織全体の業績を向上させやすい。何よりもリーダー自身がリーダーであることによるストレスを減少させて楽になれる。すると、部下たちもますます活き活きとしてくる。但し、ただ「呆けて」いたって「ぼっけもんリーダー」にはなれない。その奥義を、本書では秘かに伝授しよう。",
        image: "https://m.media-amazon.com/images/I/41GbmUtcDBL.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E/dp/B07FSX13ST/"
    },
    {
        title: "人生が開花する日本流成功哲学。",
        description: "佐藤一斎から大塩平八郎、西郷隆盛、頭山満、中村天風、稲盛和夫まで約二五〇年間の私淑、師事の流れを本書では『日本流成功哲学』と呼ぶ。今、社会的に恵まれず不遇にある働き盛りの人、人生が思うようにならないと思っている中年、人生の目的が見つからない若者…。その人たちは、希望の光が見いだせず、自分という存在が空しく思え、生きている価値がないとふと思ってしまうこともあるだろう。それは現代日本人が富や地位など重視する欧米的な価値観に縛られているせいもある。欧米からきた成功哲学もその一つになる。本書を読めばまず、その自分の悩み自体が意味あることなのか疑うようになる。そして「思うようにならない」の「思う」がほんとうに自分の人生に欲していることなのかと考え、肩の荷がおりた心地がする。なぜならば、『日本流成功哲学』を学べばより自分の根源に立ち返ることができるからである。葉っぱの先端で立ち往生していた人は根に帰れば、幹から各枝、各葉へと無限の選択肢を取り戻すことができる。すると自然と希望が湧いてきて、人生の目的も見つかるかもしれない。少なくとも毎朝寝床で自分を責めさいなむこともなくなるはずだ。",
        image: "https://m.media-amazon.com/images/I/51tM6b45nIL.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E/dp/B07FSRBWYR/"
    },
    {
        title: "君が本気になれる天職を見つける方法！西郷隆盛をつくった『言志録』に答えがある！",
        description: "自分が本気で生涯をかけられる仕事は見つかりましたか。この本を読めば、あなたはあなたの天職に一気に近づけます。実は筆者も、自分の天職はなんであるのかさんざん悩んできました。だから、現在のあなたのモヤモヤ、イライラ、空虚感がよくわかります。私が天職へと道が開かれたのは、今思えば『言志録』を読んだのがきっかけでした。この本には文字通り、人生の志‐目的が述べられているからです。ただ天職がこれだと確信にいたるまでに、初めて『言志録』を読んでから２５年間の歳月が必要でした。江戸時代に書かれた古典のために、現代との感覚のズレがどうしてもあるからです。その経験により本書は、２５年間の歳月を一気に縮められるように書きました。執筆しながら、あのとき『言志録』を本書に書いたようなところまで掘り下げられていれば、「もっと早く天職が見つかったのに」と今更ながら思いました。今自分の進路に迷われている方、まずは【目次】をみて、惹き付けられた言葉がある章から、本書独自の世界へと踏み出してください。そこが、あなたの天職への入り口です。",
        image: "https://m.media-amazon.com/images/I/81QD42WjRLL._SL1500_.jpg",
        link: "https://www.amazon.co.jp/-/en/%E5%86%A8%E5%B6%BD%E7%99%BE%E5%A4%AA%E9%83%8E/dp/B07F9G56JL/"
    },
];

export default function BooksPage() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                            <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                            shinpi me ブックス
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            これらの書籍があなたに日本の文化や思想、世界観に関する新たな視点を与え、自らの神秘に気づき、内なる自由を得るための一助になります。
                        </p>
                    </div>
                </div>
            </section>

            {/* Books Grid Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {booksData.map((book, index) => (
                            <Card key={index} className="astro-card card-hover overflow-hidden flex flex-col h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-primary line-clamp-2">
                                        {book.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <p className="text-foreground line-clamp-4">
                                            {expandedIndex === index
                                                ? book.description
                                                : `${book.description.slice(0, 150)}...`}
                                        </p>
                                    </div>
                                    {book.description.length > 150 && (
                                        <div className="mt-4 flex justify-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleExpand(index)}
                                                className="text-primary hover:text-primary/80"
                                            >
                                                {expandedIndex === index ? (
                                                    <span className="flex items-center gap-1">
                                                        <ChevronUp className="w-4 h-4" />
                                                        閉じる
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <ChevronDown className="w-4 h-4" />
                                                        もっと読む
                                                    </span>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                    <div className="mt-6">
                                        <a
                                            href={book.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="button-hover astro-button w-full flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Amazonで購入
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl font-bold text-primary">東洋思想の探求</h2>
                        <p className="text-lg text-muted-foreground">
                            これらの書籍を通じて、日本文化の伝統的な世界観を再発見し、人間の内なる力を引き出すことで、より良い社会の創造に貢献することを目指しています。
                        </p>
                        <div className="pt-6">
                            <Link href="/about">
                                <Button className="button-hover astro-button">
                                    著者について
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

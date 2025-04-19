import Image from "next/image";
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, BookOpen, Heart, Target, Lightbulb, Calendar } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    // Inline Japanese JSON data
    const aboutData = {
        penName: "冨嶽百太郎",
        realName: "久保寺 岳",
        profession: "作家、著述家、放送作家、ライター、思想家、東洋思想カウンセラー",
        bio: `
      1964年東京都清瀬市生まれ。1987年玉川大学工学部経営工学科卒業。
      1989年より放送作家として活動を開始。ドキュメンタリー、情報番組、アニメーション、バラエティーなど多岐にわたるテレビやラジオ番組の企画・構成・脚本を担当。
      2003年、病をきっかけに健康関連の出版物の編集・ライティングに携わる。現在は東洋思想を軸としたカウンセリングや執筆活動に専念。
    `,
        mission: {
            short: "人間一人ひとりの内奥にある「空」「無」や「神秘の力」に気づくことで、人を深く励まし、内なる自由を取り戻すお手伝いをする。",
            detailed: `
        日本文化には、「空」や「無」という概念が根付いています。古来、日本では自分自身やあらゆる存在を神仏とみなす考え方があり、この精神が日本の伝統や思想に深く影響を与えています。
        shinpi me では、この日本文化の世界観を再発見し、人間の内なる力を引き出すことで、争いのない平和な世界の創造を目指します。
      `,
        },
        career: `
      放送作家としての活躍：ドキュメンタリーやアニメーションなど幅広い分野で構成・脚本を担当。
      著述活動：健康関連の出版物や東洋思想に関する執筆を行う。
      悟りと真理の探究：15歳から現在まで、自己の内面を深めることに取り組んでいます。
    `,
        personalMission: `
      意識の成長と成熟：悟りを通じて、内面を深める。
      社会や世界への貢献：より抽象度の高い視点から、人々や地球に役立つ活動を行う。
      本物の自分になる：自分を磨き、真の自分を表現する。
    `,
        missionActivities: `
      悟りの修行「自覚」や「自愛」を通じて、意識を成長させ、内なる自由を追求。
      執筆活動を通じて、東洋思想や日本文化を広め、人々の内面を励ますことで社会に貢献する。
    `,
        image: "https://blog.shinpi.me/wp-content/uploads/2024/10/kubo-1.jpg", // Replace with your actual image URL
        email: "contact@shinpi.me", // Your email address
    };

    // Timeline data
    const timelineData = [
        {
            year: "1964",
            title: "誕生",
            description: "東京都清瀬市に生まれる"
        },
        {
            year: "1987",
            title: "大学卒業",
            description: "玉川大学工学部経営工学科卒業"
        },
        {
            year: "1989",
            title: "放送作家として活動開始",
            description: "ドキュメンタリー、情報番組、アニメーション、バラエティーなどさまざまなテレビやラジオ番組等の企画、構成、脚本を手掛ける"
        },
        {
            year: "2003",
            title: "健康関連の出版物の編集・ライティング",
            description: "病をきっかけに健康関連の出版物の編集・ライティングに携わる"
        },
        {
            year: "現在",
            title: "東洋思想を軸とした活動",
            description: "ブログや書籍の執筆、イベントや講演の企画を行い、多くの人々に深い気づきと知恵を届ける。東洋思想やスピリチュアルに関する知識を広め、日本文化の根底にある空（くう）や無の世界観を現代に表現する"
        }
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                                冨嶽百太郎
                                <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                                    {aboutData.realName}
                                </span>
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                {aboutData.profession}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="/#consultation">
                                    <Button className="button-hover astro-button">
                                        カウンセリングを予約
                                    </Button>
                                </Link>
                                <Link href="/books">
                                    <Button variant="outline" className="button-hover">
                                        書籍を見る
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                                <Image
                                    src={aboutData.image}
                                    alt="冨嶽百太郎の写真"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary">プロフィール</CardTitle>
                                <CardDescription className="text-lg">
                                    東洋思想を軸としたカウンセリングと執筆活動
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground whitespace-pre-line">
                                    {aboutData.bio}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-primary mb-12 text-center">経歴</h2>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
                            
                            {/* Timeline items */}
                            <div className="space-y-12">
                                {timelineData.map((item, index) => (
                                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                        {/* Content */}
                                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50 hover:shadow-lg transition-shadow duration-300">
                                                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                                                <p className="text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Timeline dot */}
                                        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        
                                        {/* Year */}
                                        <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                                            <div className="text-2xl font-bold text-primary">{item.year}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary">ミッション</CardTitle>
                                <CardDescription className="text-lg">
                                    東洋思想を通じた内なる自由の追求
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-primary">短期的な目標</h3>
                                    <p className="text-muted-foreground">{aboutData.mission.short}</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-primary">長期的なビジョン</h3>
                                    <p className="text-muted-foreground whitespace-pre-line">{aboutData.mission.detailed}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Career Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary">キャリア</CardTitle>
                                <CardDescription className="text-lg">
                                    多様な分野での経験と専門性
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-line">{aboutData.career}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Personal Mission Section */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary">パーソナルミッション</CardTitle>
                                <CardDescription className="text-lg">
                                    自己の成長と社会への貢献
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-line">{aboutData.personalMission}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Mission Activities Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-primary">活動内容</CardTitle>
                                <CardDescription className="text-lg">
                                    ミッションを実現するための具体的な取り組み
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-line">{aboutData.missionActivities}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-primary mb-6">お問い合わせ</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            カウンセリングのご予約やお問い合わせは、以下のメールアドレスまでお願いします。
                        </p>
                        <a href={`mailto:${aboutData.email}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                            <Mail className="w-5 h-5" />
                            <span className="text-lg font-medium">{aboutData.email}</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

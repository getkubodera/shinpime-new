import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, BookOpen, Heart, Target, Lightbulb } from "lucide-react";
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
                                <p className="text-foreground whitespace-pre-line">
                                    {aboutData.bio}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">shinpi me のミッション</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                            {aboutData.mission.short}
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardContent className="p-6">
                                <p className="text-foreground whitespace-pre-line">
                                    {aboutData.mission.detailed}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-secondary/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">価値観と活動</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Heart className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-primary">個人的なミッション</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground whitespace-pre-line">
                                    {aboutData.personalMission}
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="astro-card card-hover">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Target className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-primary">ミッションの具体的な取り組み</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground whitespace-pre-line">
                                    {aboutData.missionActivities}
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="astro-card card-hover">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-primary">経歴</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground whitespace-pre-line">
                                    {aboutData.career}
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="astro-card card-hover">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Lightbulb className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-primary">哲学</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground">
                                    東洋思想の「空」「無」の概念を通じて、内なる自由と平和を見出すことを目指しています。日本文化の伝統的な世界観を現代に活かし、より良い社会の創造に貢献します。
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="astro-card card-hover">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold text-primary">お問い合わせ</CardTitle>
                                <CardDescription className="text-lg">
                                    ご質問や連絡は、下記のメールアドレスまでお願いいたします。
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="flex items-center justify-center gap-2 text-lg">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <a 
                                        href={`mailto:${aboutData.email}`} 
                                        className="text-primary hover:underline"
                                    >
                                        {aboutData.email}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}

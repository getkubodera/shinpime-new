import Image from "next/image";

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
        <main className="container mx-auto px-6 py-10 bg-gray-900 text-white">
            <section className="text-center space-y-8">
                {/* Profile Card */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-gray-100">プロフィール</h1>
                    <div className="flex justify-center mt-6">
                        <div className="relative">
                            <Image
                                src={aboutData.image}
                                alt="冨嶽百太郎の写真"
                                width={200}
                                height={200}
                                className="rounded-full object-cover shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-200">ペンネーム</h2>
                        <p className="text-xl text-gray-400">{aboutData.penName}</p>

                        <h2 className="text-3xl font-semibold text-gray-200">本名</h2>
                        <p className="text-xl text-gray-400">{aboutData.realName}</p>

                        <h2 className="text-3xl font-semibold text-gray-200">職業</h2>
                        <p className="text-xl text-gray-400">{aboutData.profession}</p>

                        <h2 className="text-3xl font-semibold text-gray-200">簡単な経歴</h2>
                        <p className="text-lg text-gray-300">{aboutData.bio}</p>
                    </div>
                </div>

                {/* Mission Card */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mt-10">
                    <h2 className="text-3xl font-semibold text-gray-200">shinpi me のミッション</h2>
                    <p className="text-lg text-gray-300">{aboutData.mission.short}</p>
                    <p className="text-lg text-gray-300 mt-4">{aboutData.mission.detailed}</p>
                </div>

                {/* Career Card */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mt-10">
                    <h2 className="text-3xl font-semibold text-gray-200">私について</h2>
                    <p className="text-lg text-gray-300">{aboutData.career}</p>
                </div>

                {/* Personal Mission Card */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mt-10">
                    <h2 className="text-3xl font-semibold text-gray-200">個人的なミッション</h2>
                    <p className="text-lg text-gray-300">{aboutData.personalMission}</p>
                </div>

                {/* Mission Activities Card */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mt-10">
                    <h2 className="text-3xl font-semibold text-gray-200">ミッションの具体的な取り組み</h2>
                    <p className="text-lg text-gray-300">{aboutData.missionActivities}</p>
                </div>

                {/* Contact Card */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mt-10">
                    <h2 className="text-3xl font-semibold text-gray-200">お問い合わせ</h2>
                    <p className="text-lg text-gray-300">
                        ご質問や連絡は、下記のメールアドレスまでお願いいたします。
                    </p>
                    <p className="text-lg text-blue-400 mt-4">
                        <a href={`mailto:${aboutData.email}`}>{aboutData.email}</a>
                    </p>
                </div>
            </section>
        </main>
    );
}

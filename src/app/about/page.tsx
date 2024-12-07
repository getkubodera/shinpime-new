const aboutUsData = {
    profile: {
        penName: "Shinpi Me",
        actualName: "John Doe",
        role: "Spiritual Consultant",
        image: "https://blog.shinpi.me/wp-content/uploads/2024/10/kubo-1.jpg",
        bio: "I have dedicated my life to guiding individuals on their journey of self-discovery and spiritual awakening. With years of experience, I help people unlock their inner freedom and connect deeply with their true selves."
    },
    mission: {
        title: "My Mission",
        content: "My mission is to provide personalized spiritual consultations that empower individuals to explore their inner worlds, cultivate peace, and live authentically. I offer a safe space for you to ask questions, reflect, and grow."
    },
    introduction: {
        title: "About Me",
        content: "Welcome to my consultation space. I am here to offer guidance and support on your journey to self-discovery and spiritual awakening. Through deep insights and tailored advice, I aim to help you find inner peace and unlock your true potential."
    }
};
export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-8 space-y-12">
            <section className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-gray-800">{aboutUsData.introduction.title}</h1>
                <p className="text-lg text-gray-600">{aboutUsData.introduction.content}</p>
            </section>

            <section className="flex flex-col items-center space-y-6">
                <img
                    src={aboutUsData.profile.image}
                    alt={`${aboutUsData.profile.penName}'s profile`}
                    className="w-64 h-64 rounded-full object-cover shadow-md"
                />
                <div className="text-center space-y-4 max-w-3xl">
                    <h2 className="text-2xl font-semibold text-gray-800">{aboutUsData.profile.penName}</h2>
                    <p className="text-lg text-gray-600">{aboutUsData.profile.actualName}</p>
                    <p className="text-gray-600">{aboutUsData.profile.role}</p>
                    <p className="text-lg text-gray-600 mt-4">{aboutUsData.profile.bio}</p>
                </div>
            </section>

            <section className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">{aboutUsData.mission.title}</h2>
                <p className="text-lg text-gray-600">{aboutUsData.mission.content}</p>
            </section>
        </main>
    );
}

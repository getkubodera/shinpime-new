"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
    "人間の心は宇宙より大きい。",
    "大道とは、自分を誇りに思える道を選ぶこと。",
    "一切唯心造－すべては私の心にかかっている。",
    "自分が大きくなるために与えられた環境を生かし切る。",
    "生きるとは私を知ることであり、私をほんとうに知ることは私を忘れること。",
    "「自分にウソ」をつかなければ、天から使われる。",
    "天上天下唯我独尊－この世に私だけが尊い。",
    "一人でもさびしくなければ孤独ではない。",
    "自分を尊重し、愛する。",
    "教養とは、自分の中の木を育てること。",
];

export default function TextSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 8000); // 8s auto-slide for smooth transitions

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setIndex((prev) => (prev + 1) % quotes.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);

    return (
        <div className="relative w-full h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden rounded-lg">
            {/* Rain Effect Layer */}
            <div className="absolute inset-0 w-full h-full rain-effect z-10"></div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-100
                     rounded-lg shadow-md border border-gray-300 bg-gradient animate-gradient"
                >
                    <p className="text-lg md:text-2xl font-medium px-8 text-center backdrop-blur-sm">
                        {quotes[index]}
                    </p>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200/70 hover:bg-gray-300 text-gray-800 p-3 rounded-full z-20"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200/70 hover:bg-gray-300 text-gray-800 p-3 rounded-full z-20"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Updated slides with the new SVG images
const slides = [
  {
    id: 1,
    image: "/images/slider/slide1.svg",
    title: "内なる静寂を見つける",
    description: "忙しい日常の中で、自分を見つめ直す時間を持つ",
  },
  {
    id: 2,
    image: "/images/slider/slide2.svg",
    title: "心の神秘と向き合う",
    description: "東洋思想やスピリチュアルの視点から、深い内省をサポート",
  },
  {
    id: 3,
    image: "/images/slider/slide3.svg",
    title: "本来の自分に還る",
    description: "継続的なサポートで、大きな人生の変革を目指す",
  },
  {
    id: 4,
    image: "/images/slider/slide4.svg",
    title: "自然との調和",
    description: "山々の静けさと星々の輝きに、内なる平和を見出す",
  },
  {
    id: 5,
    image: "/images/slider/slide5.svg",
    title: "新しい始まり",
    description: "夕日の美しさと海の広がりに、無限の可能性を感じる",
  },
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Only auto-slide if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 8000); // 8s auto-slide for smooth transitions

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40 z-10"></div>
          <div className="absolute inset-0">
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-3 sm:px-4 text-center">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2 drop-shadow-md"
            >
              {slides[index].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-white max-w-xs sm:max-w-xl drop-shadow-md"
            >
              {slides[index].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Smaller on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/70 text-foreground p-1.5 sm:p-2 rounded-full z-30 backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={isMobile ? 16 : 20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/70 text-foreground p-1.5 sm:p-2 rounded-full z-30 backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={isMobile ? 16 : 20} />
      </button>

      {/* Indicators - Smaller on mobile */}
      <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-1.5 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
              i === index ? "bg-primary w-3 sm:w-4" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 
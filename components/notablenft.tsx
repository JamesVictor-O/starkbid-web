"use client";
import { StaticImageData } from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Eth from "@/public/eth_l.png";

export interface TrendGam {
  id: string;
  title: string;
  floorPrice: number | string;
  totalVolume: number | string;
  image: string | StaticImageData;
}

const NotableCollections: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sales, setSales] = useState<TrendGam[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const originalCollections = [
      {
        id: "1",
        title: "Daki Da",
        floorPrice: 0.12,
        totalVolume: 207,
        image: "/nft1.png",
      },
      {
        id: "2",
        title: "Birds of Damascus",
        floorPrice: 0.12,
        totalVolume: 207,
        image: "/nft2.png",
      },
      {
        id: "3",
        title: "Birds of Damascus",
        floorPrice: 0.12,
        totalVolume: 207,
        image: "/nft3.png",
      },
      {
        id: "4",
        title: "Birds of Damascus",
        floorPrice: 0.12,
        totalVolume: 207,
        image: "/nft4.png",
      },
      {
        id: "5",
        title: "Birds of Damascus",
        floorPrice: 0.12,
        totalVolume: 207,
        image: "/nft5.jpeg",
      }
    ];

    setSales([
      ...originalCollections,
      ...originalCollections,
      ...originalCollections,
    ]);
    setCurrentIndex(originalCollections.length);
  }, []);

  useEffect(() => {
    if (!carouselRef.current || sales.length === 0) return;

    const originalLength = sales.length / 3;

    if (currentIndex >= originalLength * 2) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = "none";
          setCurrentIndex(currentIndex - originalLength);
          void carouselRef.current.offsetWidth;
          carouselRef.current.style.transition = "transform 500ms ease-in-out";
        }
      }, 500);
    } else if (currentIndex < originalLength && currentIndex !== 0) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = "none";
          setCurrentIndex(currentIndex + originalLength);
          void carouselRef.current.offsetWidth;
          carouselRef.current.style.transition = "transform 500ms ease-in-out";
        }
      }, 500);
    }
  }, [currentIndex, sales.length]);

  const startAutoPlay = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    autoPlayTimeoutRef.current = setTimeout(() => {
      if (isAutoPlaying && !transitioning && sales.length > 0) {
        setTransitioning(true);
        setCurrentIndex((prev) => prev + 1);

        setTimeout(() => {
          setTransitioning(false);
        }, 500);
      }
      startAutoPlay();
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isAutoPlaying, transitioning, sales.length]);

  const handlePrevious = () => {
    if (transitioning) return;

    setIsAutoPlaying(false);
    setTransitioning(true);
    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => {
      setTransitioning(false);
      setIsAutoPlaying(true);
    }, 500);
  };

  const handleNext = () => {
    if (transitioning) return;

    setIsAutoPlaying(false);
    setTransitioning(true);
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      setTransitioning(false);
      setIsAutoPlaying(true);
    }, 500);
  };

  const getCardWidth = () => {
    const width = window.innerWidth;

    if (width < 768) {
      return "100%";
    } else if (width >= 768 && width < 1024) {
      return "33.33%";
    } else {
      return "25%";
    }
  };

  const getTransformPercentage = () => {
    const width = window.innerWidth;

    if (width < 768) {
      return 100;
    } else if (width >= 768 && width < 1024) {
      return 33.33;
    } else {
      return 25;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50;
      if (diff > threshold) {
        handleNext();
      } else if (diff < -threshold) {
        handlePrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full min-h-screen p-8 bg-transparent">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-medium">
            Notable Collections
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={transitioning}
              className="hidden sm:flex p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              disabled={transitioning}
              className="hidden sm:flex p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
            
          </div>
        </div>


        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * getTransformPercentage()}%)`,
            }}
          >
            {sales.map((sale, index) => (
              <div
                key={`${sale.id}-${index}`}
                className="flex-shrink-0 p-2 transition-all duration-500"
                style={{ width: getCardWidth() }}
              >
                <div className="bg-[#1A1A1A] rounded-xl overflow-hidden transition-all duration-500">
                  <div className="aspect-square w-full overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      src={sale.image}
                      alt={sale.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-lg mb-4">{sale.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Floor Price</p>
                        <div className="flex items-center text-white">
                          <span className="w-4 h-7 mr-3">
                            <Image
                              width={500}
                              height={500}
                              src={Eth}
                              alt={sale.title}
                              className="w-full h-full object-cover"
                            />
                          </span>
                          {sale.floorPrice}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Total Volume</p>
                        <div className="flex items-center text-white">
                          <span className="w-4 h-7 mr-3">
                            <Image
                              width={500}
                              height={500}
                              src={Eth}
                              alt={sale.title}
                              className="w-full h-full object-cover"
                            />
                          </span>
                          {sale.totalVolume}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotableCollections;

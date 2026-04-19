import type { BannerImage } from "@/backend";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface SlidingBannerProps {
  images: BannerImage[];
}

const DEFAULT_BANNERS: BannerImage[] = [
  {
    id: "default-1",
    imageUrl: "/assets/generated/banner-ganesh-workshop.dim_1400x700.jpg",
    title: "",
    displayOrder: 0n,
  },
  {
    id: "default-2",
    imageUrl: "/assets/generated/banner-durga-idols.dim_1400x700.jpg",
    title: "",
    displayOrder: 1n,
  },
  {
    id: "default-3",
    imageUrl: "/assets/generated/banner-lakshmi-craft.dim_1400x700.jpg",
    title: "",
    displayOrder: 2n,
  },
  {
    id: "default-4",
    imageUrl: "/assets/generated/banner-idol-collection.dim_1400x700.jpg",
    title: "",
    displayOrder: 3n,
  },
];

export function SlidingBanner({ images }: SlidingBannerProps) {
  const slides = images.length > 0 ? images : DEFAULT_BANNERS;
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slidesLenRef = useRef(slides.length);
  slidesLenRef.current = slides.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesLenRef.current);
    }, 5000);
  }, []);

  function goTo(index: number) {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 300);
  }

  function goPrev() {
    goTo((current - 1 + slides.length) % slides.length);
    startTimer();
  }

  function goNext() {
    goTo((current + 1) % slides.length);
    startTimer();
  }

  useEffect(() => {
    if (slides.length <= 1) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, startTimer]);

  const slide = slides[current] ?? slides[0];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-lg h-[50vh] md:h-[65vh]"
      data-ocid="sliding-banner"
      aria-label="Featured banner"
    >
      {/* Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        <img
          src={slide.imageUrl}
          alt="Handcrafted clay idol by Radha Madhav Mrit Shilpalay Bardhaman"
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src =
              "/assets/generated/hero-clay-idols.dim_1200x600.jpg";
          }}
        />
      </div>

      {/* Left arrow */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-200"
          data-ocid="banner-prev-btn"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right arrow */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-200"
          data-ocid="banner-next-btn"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20"
          role="tablist"
          aria-label="Banner slides"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => {
                goTo(i);
                startTimer();
              }}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? "w-5 h-2 bg-secondary"
                  : "w-2 h-2 bg-white/55 hover:bg-white/80"
              }`}
              data-ocid={`banner-dot-${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

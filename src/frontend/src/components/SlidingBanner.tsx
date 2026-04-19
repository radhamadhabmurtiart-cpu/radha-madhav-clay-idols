import type { BannerImage } from "@/backend";
import { useCallback, useEffect, useRef, useState } from "react";

interface SlidingBannerProps {
  images: BannerImage[];
}

const DEFAULT_BANNER: BannerImage = {
  id: "default",
  imageUrl: "/assets/generated/hero-clay-idols.dim_1200x600.jpg",
  title: "Premium Handmade Clay Idols – Wholesale from Bardhaman",
  displayOrder: 0n,
};

export function SlidingBanner({ images }: SlidingBannerProps) {
  const slides = images.length > 0 ? images : [DEFAULT_BANNER];
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
      className="relative w-full overflow-hidden rounded-2xl shadow-lg"
      style={{ aspectRatio: "16/6" }}
      data-ocid="sliding-banner"
      aria-label="Featured banner"
    >
      {/* Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src =
              "/assets/generated/hero-clay-idols.dim_1200x600.jpg";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.06_35/0.70)] via-transparent to-transparent" />
      </div>

      {/* Title overlay */}
      {slide.title && (
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8 z-10">
          <p
            className={`text-sm sm:text-base lg:text-lg font-semibold text-[oklch(0.97_0.04_80)] drop-shadow-md transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
          >
            {slide.title}
          </p>
        </div>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div
          className="absolute bottom-3 right-4 flex gap-1.5 z-20"
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
                  : "w-2 h-2 bg-[oklch(0.97_0.04_80/0.55)] hover:bg-[oklch(0.97_0.04_80/0.80)]"
              }`}
              data-ocid={`banner-dot-${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

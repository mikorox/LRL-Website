"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Photo = { id: string; url: string; caption: string };

export default function Lightbox({
  photos,
  title,
}: {
  photos: Photo[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));

  useEffect(() => {
    if (activeIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, photos.length]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square rounded-sm border border-navy-line overflow-hidden bg-navy-900"
          >
            <Image
              src={photo.url}
              alt={photo.caption || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 text-white/70 hover:text-gold-light transition-colors"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-4 sm:left-8 text-white/70 hover:text-gold-light transition-colors"
            >
              <ChevronLeft size={40} strokeWidth={1.5} />
            </button>
          )}

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activeIndex].url}
              alt={photos[activeIndex].caption || title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-4 sm:right-8 text-white/70 hover:text-gold-light transition-colors"
            >
              <ChevronRight size={40} strokeWidth={1.5} />
            </button>
          )}

          {photos[activeIndex].caption && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70 max-w-xl text-center px-4">
              {photos[activeIndex].caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}

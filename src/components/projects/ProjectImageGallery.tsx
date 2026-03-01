"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectImageGalleryProps {
  images: string[];
  title: string;
}

export function ProjectImageGallery({ images, title }: ProjectImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : 0));
  const goPrev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : 0
    );

  return (
    <>
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns:
            images.length === 1
              ? "1fr"
              : images.length === 2
              ? "1fr 1fr"
              : "1fr 1fr 1fr",
        }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-video overflow-hidden rounded-lg focus-visible:ring-2 outline-none"
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: "0.75rem",
            }}
            aria-label={`View image ${i + 1} of ${images.length}`}
          >
            <Image
              src={img}
              alt={`${title} — image ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl w-full mx-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={images[lightboxIndex]}
                  alt={`${title} — image ${lightboxIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-white transition-colors"
                style={{ background: "rgba(0,0,0,0.5)" }}
                aria-label="Close lightbox"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Nav */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="text-center text-white text-sm mt-3 opacity-60">
                    {lightboxIndex + 1} / {images.length}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

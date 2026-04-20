"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import FloatingPhoto from "@/components/ui/FloatingPhoto";
import Lightbox from "@/components/ui/Lightbox";
import { memoryPhotos, type PhotoItem } from "@/data/photos";
import { useSectionAudio } from "@/hooks/useSectionAudio";

interface Props { onSectionComplete?: () => void }

export default function MemoryGallerySection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section7.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  useEffect(() => {
    const t = setTimeout(() => onSectionComplete?.(), 3000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center"
      style={{ backgroundColor: "#FFF8F0", maxWidth: "100vw", overflow: "hidden" }}
    >
      {/* Header */}
      <motion.div
        className="text-center pt-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-handwritten text-3xl" style={{ color: "#2D2D2D" }}>
          2016 — 2023 💛
        </h2>
      </motion.div>

      <motion.p
        className="text-xs text-center mt-2 mb-8 px-4"
        style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Every moment we collected
      </motion.p>

      {/* Photo grid */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "0 12px 120px 12px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
            width: "100%",
          }}
        >
          {memoryPhotos.map((photo, index) => (
            <div
              key={photo.id}
              style={{
                width: "100%",
                overflow: "hidden",
                minWidth: 0,
                marginTop: index % 2 === 1 ? 24 : 0,
              }}
            >
              <FloatingPhoto
                photo={photo}
                index={index}
                rotation={photo.rotation ?? 0}
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Table surface gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 60,
          background: "linear-gradient(transparent, rgba(255,248,240,0.5))",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      />

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}

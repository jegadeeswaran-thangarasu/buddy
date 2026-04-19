"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import Polaroid from "@/components/ui/Polaroid";
import Lightbox from "@/components/ui/Lightbox";
import { memoryPhotos, type PhotoItem } from "@/data/photos";

export default function MemoryGallerySection() {
  const sectionRef = useSectionAudio("section7.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center px-4 py-16"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-handwritten text-3xl" style={{ color: "#2D2D2D" }}>
          2016 — 2023 💛
        </h2>
      </motion.div>

      <motion.p
        className="text-xs text-center mb-10"
        style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Every moment we collected
      </motion.p>

      {/* Scattered two-column grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        {memoryPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="flex justify-center"
            style={{ marginTop: index % 2 === 1 ? "32px" : "0px" }}
          >
            <Polaroid
              photo={photo}
              index={index}
              onClick={() => setSelectedPhoto(photo)}
            />
          </div>
        ))}
      </div>

      {/* Section transition → AmmaSection warm saffron */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFF0DC)" }}
      />

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}

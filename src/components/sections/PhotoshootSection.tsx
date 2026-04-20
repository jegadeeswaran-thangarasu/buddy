"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import FloatingPhoto from "@/components/ui/FloatingPhoto";
import Lightbox from "@/components/ui/Lightbox";
import { photoshootPhotos, type PhotoItem } from "@/data/photos";

interface Props { onSectionComplete?: () => void }

export default function PhotoshootSection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section11.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  useEffect(() => {
    const t = setTimeout(() => onSectionComplete?.(), 4000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [p1, p2, p3, p4, p5, p6] = photoshootPhotos;
  const rotations = [0, 1, -1, 2, -1, 1];
  const delays =    [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "#F5ECD7", maxWidth: "100vw", overflow: "hidden" }}
    >
      {/* Header */}
      <motion.div
        className="text-center pt-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-handwritten text-4xl" style={{ color: "#2D2D2D" }}>
          Us 📸
        </h2>
      </motion.div>

      <motion.p
        className="text-xs text-center mt-2 mb-6 px-4"
        style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        2016 — 2026
      </motion.p>

      {/* Unified magazine grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
          width: "100%",
          padding: "0 12px 120px 12px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* p1 — full width hero, landscape */}
        <div
          style={{
            gridColumn: "1 / -1",
            aspectRatio: "16 / 9",
            width: "100%",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <FloatingPhoto
            photo={p1}
            index={0}
            delay={delays[0]}
            rotation={rotations[0]}
            onClick={() => setSelectedPhoto(p1)}
          />
        </div>

        {/* p2–p6 — half-width portrait cells */}
        {[p2, p3, p4, p5, p6].map((photo, i) => (
          <div
            key={photo.id}
            style={{
              aspectRatio: "4 / 5",
              width: "100%",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <FloatingPhoto
              photo={photo}
              index={i + 1}
              delay={delays[i + 1]}
              rotation={rotations[i + 1]}
              onClick={() => setSelectedPhoto(photo)}
            />
          </div>
        ))}
      </div>

      {/* Closing */}
      <motion.p
        className="text-handwritten text-2xl text-center px-4 pb-8"
        style={{ color: "#2D2D2D" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        10 years. Same two people. 💛💙
      </motion.p>

      {/* Section transition → StillBuddies dark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1a1a2e)" }}
      />

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}

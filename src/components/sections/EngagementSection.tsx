"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import FloatingPhoto from "@/components/ui/FloatingPhoto";
import Lightbox from "@/components/ui/Lightbox";
import { engagementPhotos, type PhotoItem } from "@/data/photos";

interface Props { onSectionComplete?: () => void }

export default function EngagementSection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section9.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  useEffect(() => {
    const t = setTimeout(() => onSectionComplete?.(), 4000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hero = engagementPhotos[0];
  const secondary = engagementPhotos.slice(1, 4);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col pb-32"
      style={{ backgroundColor: "#1a0a0a", maxWidth: "100vw", overflow: "hidden" }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center px-4 pt-16 mb-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "rgba(255,209,102,0.6)", fontFamily: "'Nunito', sans-serif" }}
        >
          Chapter 9
        </p>

        <h2 className="text-handwritten" style={{ fontSize: "clamp(2.5rem,10vw,3.5rem)", color: "#FFD166" }}>
          March 7, 2024
        </h2>

        <p
          className="text-sm mt-2"
          style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito', sans-serif" }}
        >
          She said yes again. Officially. 💍
        </p>

        <motion.span
          className="text-3xl mt-4"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          💍
        </motion.span>
      </motion.div>

      {/* Hero photo — portrait, fills width */}
      <div
        style={{
          width: "calc(100% - 32px)",
          margin: "0 16px",
          aspectRatio: "3 / 4",
          position: "relative",
          overflow: "hidden",
          borderRadius: 16,
          minWidth: 0,
        }}
      >
        <FloatingPhoto
          photo={hero}
          index={0}
          delay={0.2}
          rotation={-1}
          onClick={() => setSelectedPhoto(hero)}
        />
      </div>

      {/* Secondary row — 3 equal columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 8,
          width: "calc(100% - 32px)",
          margin: "12px 16px 0",
          overflow: "hidden",
        }}
      >
        {secondary.map((photo, i) => {
          const rotations = [2, -1, 3];
          const delays = [0.4, 0.6, 0.8];
          return (
            <div
              key={photo.id}
              style={{
                aspectRatio: "3 / 4",
                width: "100%",
                overflow: "hidden",
                borderRadius: 12,
                minWidth: 0,
              }}
            >
              <FloatingPhoto
                photo={photo}
                index={i + 1}
                delay={delays[i]}
                rotation={rotations[i]}
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>
          );
        })}
      </div>

      {/* Closing caption */}
      <motion.p
        className="text-handwritten text-2xl text-center px-4 py-8"
        style={{ color: "#FFD166" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        From best friends to forever. 💛
      </motion.p>

      {/* Section transition → Wedding dark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0d0d0d)" }}
      />

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import FloatingPhoto from "@/components/ui/FloatingPhoto";
import Lightbox from "@/components/ui/Lightbox";
import { weddingPhotos, type PhotoItem } from "@/data/photos";

interface Props { onSectionComplete?: () => void }

export default function WeddingSection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section10.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.8 });

  useEffect(() => {
    const t = setTimeout(() => onSectionComplete?.(), 5000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hero = weddingPhotos[0];
  const strip = weddingPhotos.slice(1, 4);
  const stripRotations = [-2, 1, -1];
  const stripDelays = [0.5, 0.7, 0.9];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col pb-32"
      style={{ backgroundColor: "#0d0d0d", maxWidth: "100vw", overflow: "hidden" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-16 pb-8">
        <div ref={lineRef} className="w-32 mb-6" style={{ height: "1px", overflow: "hidden" }}>
          <motion.div
            className="h-full"
            style={{ backgroundColor: "#FFD166" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <motion.h2
          className="text-handwritten"
          style={{ fontSize: "clamp(2.5rem,10vw,3.5rem)", color: "white" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          April 22, 2024
        </motion.h2>

        <div className="flex gap-3 items-center text-3xl mt-3">
          {["💛", "+", "💙", "=", "🥹"].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.15, type: "spring", stiffness: 300 }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-xs tracking-widest uppercase mt-3"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Buddies. Forever.
        </motion.p>
      </div>

      {/* Hero photo — portrait, max 70dvh */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          maxHeight: "70dvh",
          position: "relative",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <FloatingPhoto
          photo={hero}
          index={0}
          delay={0.3}
          rotation={0}
          onClick={() => setSelectedPhoto(hero)}
        />
      </div>

      {/* Photo grid — 3 columns instead of horizontal scroll */}
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
        {strip.map((photo, i) => (
          <div
            key={photo.id}
            style={{
              aspectRatio: "2 / 3",
              width: "100%",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <FloatingPhoto
              photo={photo}
              index={i + 1}
              delay={stripDelays[i]}
              rotation={stripRotations[i]}
              onClick={() => setSelectedPhoto(photo)}
            />
          </div>
        ))}
      </div>

      {/* Closing line */}
      <motion.p
        className="text-handwritten text-2xl text-center px-4 py-10"
        style={{ color: "#FFD166" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        She wore yellow. He wore his heart. 💛
      </motion.p>

      {/* Section transition → Photoshoot beige */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F5ECD7)" }}
      />

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}

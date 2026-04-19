"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { photoshootPhotos, type PhotoItem } from "@/data/photos";

// ─── Inline polaroid wrapper for wide / custom-size photos ──────────────────

interface PhotoCardProps {
  photo: PhotoItem;
  index: number;
  height: string;
  rotateDeg?: number;
  onClick: () => void;
  sizes?: string;
}

function PhotoCard({ photo, index, height, rotateDeg = 0, onClick, sizes = "100vw" }: PhotoCardProps) {
  return (
    <motion.div
      className="bg-white shadow-xl rounded-sm cursor-pointer"
      style={{ padding: "8px 8px 24px 8px", transform: `rotate(${rotateDeg}deg)` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ scale: 1.03, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-sm" style={{ height }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </div>
      <p
        className="text-handwritten text-sm text-center mt-1"
        style={{ color: "#2D2D2D" }}
      >
        {photo.caption}
      </p>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function PhotoshootSection() {
  const sectionRef = useSectionAudio("section11.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const [p1, p2, p3, p4, p5, p6] = photoshootPhotos;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col px-4 py-16"
      style={{ backgroundColor: "#F5ECD7" }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-handwritten text-4xl" style={{ color: "#2D2D2D" }}>
          Us 📸
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
        2016 — 2026
      </motion.p>

      {/* Row 1 — full width */}
      <div className="w-full">
        <PhotoCard
          photo={p1}
          index={0}
          height="256px"
          rotateDeg={p1.rotation}
          onClick={() => setSelectedPhoto(p1)}
          sizes="calc(100vw - 32px)"
        />
      </div>

      {/* Row 2 — two columns */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <PhotoCard
          photo={p2}
          index={1}
          height="192px"
          rotateDeg={p2.rotation}
          onClick={() => setSelectedPhoto(p2)}
          sizes="calc(50vw - 24px)"
        />
        <PhotoCard
          photo={p3}
          index={2}
          height="192px"
          rotateDeg={p3.rotation}
          onClick={() => setSelectedPhoto(p3)}
          sizes="calc(50vw - 24px)"
        />
      </div>

      {/* Row 3 — full width */}
      <div className="w-full mt-6">
        <PhotoCard
          photo={p4}
          index={3}
          height="256px"
          rotateDeg={p4.rotation}
          onClick={() => setSelectedPhoto(p4)}
          sizes="calc(100vw - 32px)"
        />
      </div>

      {/* Row 4 — two columns */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <PhotoCard
          photo={p5}
          index={4}
          height="192px"
          rotateDeg={p5.rotation}
          onClick={() => setSelectedPhoto(p5)}
          sizes="calc(50vw - 24px)"
        />
        <PhotoCard
          photo={p6}
          index={5}
          height="192px"
          rotateDeg={p6.rotation}
          onClick={() => setSelectedPhoto(p6)}
          sizes="calc(50vw - 24px)"
        />
      </div>

      {/* Closing */}
      <motion.p
        className="text-handwritten text-2xl text-center py-8"
        style={{ color: "#2D2D2D" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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

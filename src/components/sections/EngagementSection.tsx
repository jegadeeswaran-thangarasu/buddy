"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { engagementPhotos, type PhotoItem } from "@/data/photos";

export default function EngagementSection() {
  const sectionRef = useSectionAudio("section9.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const hero = engagementPhotos[0];
  const secondary = engagementPhotos.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col py-16"
      style={{ backgroundColor: "#1a0a0a" }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center px-4 mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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

      {/* Hero photo */}
      <motion.div
        className="relative mx-4 rounded-2xl overflow-hidden"
        style={{ height: "400px" }}
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onClick={() => setSelectedPhoto(hero)}
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-cover cursor-pointer"
          sizes="(max-width: 640px) calc(100vw - 32px), 608px"
          priority
        />
        {/* Golden bottom overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(transparent 55%, #1a0a0a)" }}
        />
        {/* Caption overlay */}
        <p
          className="absolute bottom-4 left-4 text-handwritten text-xl"
          style={{ color: "white" }}
        >
          The beginning of forever 💍
        </p>
      </motion.div>

      {/* Secondary row */}
      <div className="flex gap-2 mx-4 mt-3">
        {secondary.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="relative flex-1 rounded-xl overflow-hidden cursor-pointer"
            style={{ height: "130px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 33vw, 200px"
            />
          </motion.div>
        ))}
      </div>

      {/* Closing caption */}
      <motion.p
        className="text-handwritten text-2xl text-center px-4 py-8"
        style={{ color: "#FFD166" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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

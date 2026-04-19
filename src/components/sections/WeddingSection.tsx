"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { weddingPhotos, type PhotoItem } from "@/data/photos";

export default function WeddingSection() {
  const sectionRef = useSectionAudio("section10.mp3");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.8 });

  const hero = weddingPhotos[0];
  const strip = weddingPhotos.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 pt-16 pb-10">
        {/* Animated gold line */}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          April 22, 2024
        </motion.h2>

        {/* Emoji trio */}
        <div className="flex gap-3 items-center text-3xl mt-3">
          {["💛", "+", "💙", "=", "🥹"].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Buddies. Forever.
        </motion.p>
      </div>

      {/* Ken Burns hero — full width, edge-to-edge */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ height: "500px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        onClick={() => setSelectedPhoto(hero)}
      >
        {/* Ken Burns image wrapper */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Dark bottom overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(transparent 55%, #0d0d0d)" }}
        />

        {/* Overlay text */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
          <p className="text-handwritten text-3xl text-white text-center">
            The best day of our lives
          </p>
          <p
            className="text-sm mt-1 text-center"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito', sans-serif" }}
          >
            April 22, 2024
          </p>
        </div>
      </motion.div>

      {/* Horizontal scroll strip */}
      <div
        className="flex gap-3 px-4 mt-4 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {strip.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="relative rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
            style={{ width: "200px", height: "280px" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
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
              sizes="200px"
            />
          </motion.div>
        ))}
      </div>

      {/* Closing line */}
      <motion.p
        className="text-handwritten text-2xl text-center px-4 py-10"
        style={{ color: "#FFD166" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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

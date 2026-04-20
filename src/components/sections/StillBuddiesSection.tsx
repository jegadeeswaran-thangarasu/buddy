"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import Polaroid from "@/components/ui/Polaroid";
import type { PhotoItem } from "@/data/photos";

const PLACEHOLDER =
  "https://images.pexels.com/photos/8081418/pexels-photo-8081418.jpeg";

const usPhoto: PhotoItem = {
  id: "us-2026",
  src: PLACEHOLDER,
  alt: "Still us 2026",
  caption: "Still us. 2026. 💛",
  rotation: -1,
};

const TRAITS = [
  { emoji: "💬", label: "Emoji conversations" },
  { emoji: "🚌", label: "Bus rides & proposals" },
  { emoji: "🎁", label: "Blue & yellow gifts" },
  { emoji: "📚", label: "She finished my records" },
  { emoji: "🏠", label: "Pongal. Diwali. Home." },
  { emoji: "💍", label: "Best friends. Forever." },
];

interface Props { onSectionComplete?: () => void }

export default function StillBuddiesSection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section12.mp3");
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterInView = useInView(counterRef, { once: true, amount: 0.5 });

  // Count 0 → 10, then signal complete
  useEffect(() => {
    if (!counterInView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 10) {
        clearInterval(interval);
        setTimeout(() => onSectionComplete?.(), 500);
      }
    }, 200);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #1a1a2e, #0d0d1a)" }}
    >
      {/* ── Background floating orbs ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "rgba(255,209,102,0.08)",
          filter: "blur(64px)",
          top: "40px",
          left: "-60px",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "250px",
          height: "250px",
          backgroundColor: "rgba(107,164,216,0.08)",
          filter: "blur(64px)",
          bottom: "80px",
          right: "-40px",
        }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Header ── */}
      <div className="relative flex flex-col items-center text-center pt-20 px-6">
        <motion.p
          className="text-handwritten"
          style={{ fontSize: "clamp(1.8rem,8vw,2.5rem)", color: "rgba(255,255,255,0.6)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Still
        </motion.p>

        <motion.h1
          className="text-handwritten"
          style={{ fontSize: "clamp(3.5rem,14vw,5rem)", color: "#FFD166" }}
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          whileInView={{ opacity: 1, letterSpacing: "0em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Buddies.
        </motion.h1>

        <div className="flex items-center gap-3 mt-4 text-4xl">
          {["💛", "+", "💙"].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.35,
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── Year counter ── */}
      <div ref={counterRef} className="relative mt-12 flex flex-col items-center">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif" }}
        >
          Years Together
        </p>

        <span
          className="text-handwritten font-bold leading-none"
          style={{
            fontSize: "clamp(6rem,28vw,9rem)",
            background: "linear-gradient(135deg, #FFD166, #6BA4D8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}
        </span>

        <p
          className="text-xs text-center mt-2 max-w-xs"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif" }}
        >
          of friendship, love, and laughter
        </p>
      </div>

      {/* ── Traits grid ── */}
      <div className="grid grid-cols-2 gap-3 mx-4 mt-12 w-full max-w-sm">
        {TRAITS.map((trait, i) => (
          <motion.div
            key={i}
            className="rounded-2xl p-4 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: i * 0.1,
              type: "spring",
              stiffness: 280,
              damping: 20,
            }}
          >
            <p className="text-2xl mb-1">{trait.emoji}</p>
            <p
              className="text-xs leading-tight"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Nunito', sans-serif" }}
            >
              {trait.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Large polaroid ── */}
      <div className="relative mt-12 mb-16 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Oversized polaroid wrapper */}
          <div
            className="bg-white shadow-2xl rounded-sm"
            style={{
              padding: "12px 12px 40px 12px",
              width: "240px",
              transform: "rotate(-1deg)",
            }}
          >
            <div
              className="relative overflow-hidden rounded-sm"
              style={{ width: "216px", height: "216px" }}
            >
              <Polaroid photo={usPhoto} index={0} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section transition → Finale cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFF8F0)" }}
      />
    </section>
  );
}

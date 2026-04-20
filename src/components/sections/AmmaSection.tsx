"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import Polaroid from "@/components/ui/Polaroid";
import type { PhotoItem } from "@/data/photos";

const PLACEHOLDER =
  "https://images.pexels.com/photos/8081418/pexels-photo-8081418.jpeg";

const decoratingPhoto: PhotoItem = {
  id: "amma-dec",
  src: PLACEHOLDER,
  alt: "Decorating together",
  caption: "Decorating together 🎊",
  rotation: -2,
};

const happyPhoto: PhotoItem = {
  id: "amma-happy",
  src: PLACEHOLDER,
  alt: "The happiest day",
  caption: "The happiest day 🥹",
  rotation: 2,
};

interface Props { onSectionComplete?: () => void }

export default function AmmaSection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section8.mp3");

  useEffect(() => {
    const t = setTimeout(() => onSectionComplete?.(), 5000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center py-16 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #FFF0DC, #FFE4BA)" }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
        >
          The Promise 🙏
        </p>
        <h2
          className="text-handwritten"
          style={{ fontSize: "clamp(2.5rem,12vw,3.5rem)", color: "#2D2D2D" }}
        >
          Amma Said Yes
        </h2>
      </motion.div>

      {/* ── Twinkling lights banner ── */}
      <motion.div
        className="relative w-full px-4 mb-8"
        style={{ height: "52px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Wire */}
        <div
          className="absolute"
          style={{
            top: "14px",
            left: "20px",
            right: "20px",
            height: "1px",
            backgroundColor: "rgba(139,111,71,0.3)",
          }}
        />
        {/* Bulbs */}
        <div className="flex justify-around items-start">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-px"
                style={{ height: "12px", backgroundColor: "rgba(139,111,71,0.4)" }}
              />
              <motion.div
                className="rounded-full"
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: i % 2 === 0 ? "#FFD166" : "#6BA4D8",
                }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rangoli flowers */}
      <motion.div
        className="flex gap-6 text-2xl mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {["🌸", "🪔", "🌸"].map((item, i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 1.8,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>

      {/* Decorating polaroid */}
      <div className="mb-10">
        <Polaroid photo={decoratingPhoto} index={0} />
      </div>

      {/* ── Promise card ── */}
      <motion.div
        className="mx-4 mb-10 rounded-r-2xl p-6 shadow-md w-full max-w-sm"
        style={{
          backgroundColor: "#FFFBF0",
          borderLeft: "4px solid #FFD166",
        }}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-3xl text-center mb-3">🤝</div>
        <p
          className="text-sm leading-relaxed text-center"
          style={{ color: "#2D2D2D", fontFamily: "'Nunito', sans-serif" }}
        >
          &ldquo;I told her I would take care of
          <br />
          both of them. Always.&rdquo;
        </p>
        <p
          className="text-handwritten text-base text-center mt-3"
          style={{ color: "#8B6F47" }}
        >
          — and I meant every word. 💛
        </p>
      </motion.div>

      {/* ── Amma's speech bubble ── */}
      <motion.div
        className="flex items-start gap-3 mx-4 mb-10 w-full max-w-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
      >
        {/* Amma avatar */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: "#FFD166" }}
        >
          🙏
        </div>

        {/* Bubble */}
        <div
          className="rounded-2xl rounded-tl-none px-5 py-4 shadow-md flex-1"
          style={{ backgroundColor: "white" }}
        >
          <p
            className="text-sm"
            style={{ color: "#2D2D2D", fontFamily: "'Nunito', sans-serif" }}
          >
            Take care of my daughter.
          </p>
          <p
            className="text-xs italic mt-1"
            style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
          >
            — Amma 💛
          </p>
        </div>
      </motion.div>

      {/* ── Happy polaroid ── */}
      <div className="mb-8">
        <Polaroid photo={happyPhoto} index={1} />
      </div>

      {/* ── Salary hike card ── */}
      <motion.div
        className="mx-auto rounded-2xl p-4 text-center mb-4"
        style={{
          backgroundColor: "#6BA4D8",
          maxWidth: "260px",
          width: "calc(100% - 32px)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
      >
        <p className="text-2xl mb-1">📈</p>
        <p
          className="text-sm font-bold"
          style={{ color: "white", fontFamily: "'Nunito', sans-serif" }}
        >
          He got a hike. 🎉
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Nunito', sans-serif" }}
        >
          First person he told — Buddy and Amma.
        </p>
      </motion.div>

      {/* Closing line */}
      <motion.p
        className="text-handwritten text-2xl text-center px-4 py-8"
        style={{ color: "#2D2D2D" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        She became his family. He became hers. 💛
      </motion.p>

      {/* Section transition → Engagement dark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1a0a0a)" }}
      />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useSectionAudio } from "@/hooks/useSectionAudio";

export default function HardTimesSection() {
  const sectionRef = useSectionAudio("section5.mp3");
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center px-4 py-16"
      style={{ backgroundColor: "#1C1C2E" }}
    >
      {/* ── PART A: The Silence ── */}
      <motion.div
        className="flex flex-col items-center w-full max-w-xs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Mock phone screen */}
        <div
          className="flex flex-col items-center justify-center rounded-3xl border px-8 py-10"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "rgba(255,255,255,0.03)",
            width: "200px",
          }}
        >
          <motion.p
            className="text-3xl tracking-widest mb-3 font-light"
            style={{ color: "rgba(255,255,255,0.5)" }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </motion.p>
          <p
            className="text-xs text-center"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            2 months of silence
          </p>
        </div>

        <p
          className="text-sm text-center mt-6 leading-relaxed max-w-xs"
          style={{
            color: "rgba(255,248,240,0.6)",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Corona took the world. Distance took them.
        </p>

        <div className="mt-5 flex flex-col items-center">
          <span className="text-2xl">💻</span>
          <p
            className="text-xs text-center mt-1"
            style={{
              color: "rgba(255,209,102,0.7)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Her laptop. Kept safe. Always.
          </p>
        </div>
      </motion.div>

      {/* Divider */}
      <div
        className="w-full max-w-xs my-12 h-px"
        style={{ backgroundColor: "rgba(255,209,102,0.2)" }}
      />

      {/* ── PART B: The Call ── */}
      <motion.div
        className="flex flex-col items-center w-full max-w-xs"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {/* Ringing phone */}
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.2, 1], rotate: [-10, 10, -10] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          📞
        </motion.span>

        <p
          className="text-sm text-center mt-4"
          style={{ color: "#FFF8F0", fontFamily: "'Nunito', sans-serif" }}
        >
          Then one day — he called.
        </p>

        {/* Speech bubble */}
        <motion.div
          className="rounded-2xl px-5 py-3 mt-4"
          style={{ backgroundColor: "#FFD166" }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
        >
          <p
            className="text-sm"
            style={{ color: "#2D2D2D", fontFamily: "'Nunito', sans-serif" }}
          >
            Buddy… I got placed. 🎉
          </p>
        </motion.div>

        <motion.p
          className="text-handwritten text-sm text-center mt-4"
          style={{ color: "#FFD166" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          First class. First job. First call — to her.
        </motion.p>
      </motion.div>

      {/* Section transition → next (cream) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFF8F0)" }}
      />
    </section>
  );
}

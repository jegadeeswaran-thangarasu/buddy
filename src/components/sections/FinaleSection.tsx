"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";

// ─── Types ───────────────────────────────────────────────────────────────────

type LineType = "greeting" | "body" | "closing" | "signature";

interface LetterLine {
  text: string;
  type: LineType;
  mt?: string;
}

type ConfettiShape = "circle" | "rect" | "star";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  shape: ConfettiShape;
  duration: number;
  delay: number;
}

interface FloatingHeart {
  id: number;
  left: number;
  duration: number;
  delay: number;
  emoji: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PRE_LINES = ["Two years of marriage.", "Ten years of us."];

const LETTER_LINES: LetterLine[] = [
  { text: "Hey Buddy,",                                                      type: "greeting" },
  { text: "You helped me pass. You helped me grow.",                         type: "body", mt: "mt-4" },
  { text: "You kept my laptop safe.",                                         type: "body" },
  { text: "You said yes on a bus.",                                           type: "body" },
  { text: "You convinced Amma with your love.",                               type: "body" },
  { text: "You show up — every single day.",                                  type: "body" },
  { text: "I don't know what I did to deserve you.",                          type: "body", mt: "mt-4" },
  { text: "But I know I'll spend every year trying to be worthy of it.",      type: "body" },
  { text: "Still your Dai. Always your buddy.",                               type: "closing", mt: "mt-4" },
  { text: "— 💙",                                                             type: "signature", mt: "mt-2" },
];

const CONFETTI_COLORS = ["#FFD166", "#6BA4D8", "#FFB5C8", "#ffffff", "#FFB347"];
const CONFETTI_COUNT = 50;

const DATE_BADGES = [
  { label: "💍 March 7, 2024",  bg: "#FFD166", color: "#2D2D2D" },
  { label: "💒 April 22, 2024", bg: "#6BA4D8", color: "white"    },
];

// ─── Line style helpers ───────────────────────────────────────────────────────

function lineStyle(type: LineType): React.CSSProperties {
  switch (type) {
    case "greeting":
      return { fontFamily: "'Dancing Script', cursive", fontSize: "1.5rem", color: "#2D2D2D" };
    case "body":
      return { fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem", color: "#8B6F47" };
    case "closing":
      return { fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem", color: "#2D2D2D", fontWeight: 600 };
    case "signature":
      return { fontFamily: "'Dancing Script', cursive", fontSize: "1.25rem", color: "#6BA4D8" };
  }
}

// ─── FinaleSection ────────────────────────────────────────────────────────────

interface Props { onSectionComplete?: () => void }

export default function FinaleSection(_props: Props) {
  const sectionRef = useSectionAudio("section13.mp3");
  const letterEndRef = useRef<HTMLDivElement>(null);
  const letterInView = useInView(letterEndRef, { once: true, amount: 0.8 });
  const hasTriggered = useRef(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // Seed confetti and hearts on mount (client-only)
  useEffect(() => {
    setConfetti(
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 400,
        y: -(Math.random() * 200 + 100),
        rotation: (Math.random() - 0.5) * 720,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 8 + 6,
        shape: (["circle", "rect", "star"] as ConfettiShape[])[Math.floor(Math.random() * 3)],
        duration: Math.random() * 1.5 + 1.5,
        delay: Math.random() * 0.5,
      }))
    );

    setHearts(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 88 + 4,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 3,
        emoji: i % 2 === 0 ? "💛" : "💙",
      }))
    );
  }, []);

  // Trigger confetti once the letter bottom is in view
  useEffect(() => {
    if (letterInView && !hasTriggered.current && confetti.length > 0) {
      hasTriggered.current = true;
      setTimeout(() => setShowConfetti(true), 1000);
    }
  }, [letterInView, confetti.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      {/* ── Floating hearts (always on once mounted) ── */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none text-2xl select-none"
          style={{ left: `${h.left}%`, bottom: "0%" }}
          animate={{ y: [0, -1000], opacity: [0, 1, 0.9, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {h.emoji}
        </motion.div>
      ))}

      {/* ── PART 1 — Big Reveal ── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-20 px-6 w-full">
        {/* Pre-text lines */}
        {PRE_LINES.map((line, i) => (
          <motion.p
            key={i}
            className="text-sm leading-loose"
            style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.45 }}
          >
            {line}
          </motion.p>
        ))}

        {/* Happy Anniversary */}
        <motion.h2
          className="text-handwritten mt-6"
          style={{ fontSize: "clamp(2.2rem,11vw,3.5rem)", color: "#2D2D2D" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Happy Anniversary
        </motion.h2>

        {/* Buddy 💛 with glow */}
        <div className="relative inline-flex items-center justify-center mt-3">
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-12px",
              backgroundColor: "rgba(255,209,102,0.25)",
              filter: "blur(24px)",
            }}
            animate={{ opacity: [0.3, 0.85, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.h1
            className="text-handwritten relative"
            style={{ fontSize: "clamp(3.5rem,16vw,5.5rem)", color: "#FFD166" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Buddy 💛
          </motion.h1>
        </div>
      </div>

      {/* ── PART 2 — The Letter ── */}
      <motion.div
        className="relative z-10 w-11/12 max-w-sm mx-auto mt-12 rounded-2xl p-8 shadow-md"
        style={{ backgroundColor: "#FFFDF7", transform: "rotate(1deg)" }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {LETTER_LINES.map((line, i) => (
          <motion.p
            key={i}
            className={line.mt ?? ""}
            style={{ ...lineStyle(line.type), lineHeight: "1.75" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.18, ease: "easeOut" }}
          >
            {line.text}
          </motion.p>
        ))}

        {/* Confetti trigger anchor */}
        <div ref={letterEndRef} style={{ height: "1px" }} />
      </motion.div>

      {/* ── PART 3 — Celebration ── */}
      <div className="relative z-10 flex flex-col items-center w-full mt-12 px-4">
        {/* Confetti burst from center */}
        <div className="relative flex justify-center" style={{ height: "1px", width: "100%" }}>
          {showConfetti &&
            confetti.map((p) => {
              if (p.shape === "star") {
                return (
                  <motion.span
                    key={p.id}
                    className="absolute pointer-events-none select-none"
                    style={{
                      fontSize: p.size,
                      color: p.color,
                      left: "50%",
                      top: 0,
                      marginLeft: -p.size / 2,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                    animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotation, scale: 0.5 }}
                    transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
                  >
                    ★
                  </motion.span>
                );
              }
              return (
                <motion.div
                  key={p.id}
                  className="absolute pointer-events-none"
                  style={{
                    width: p.size,
                    height: p.shape === "circle" ? p.size : p.size * 0.45,
                    borderRadius: p.shape === "circle" ? "50%" : "2px",
                    backgroundColor: p.color,
                    left: "50%",
                    top: 0,
                    marginLeft: -p.size / 2,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotation, scale: 0.5 }}
                  transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
                />
              );
            })}
        </div>

        {/* Date badges */}
        <div className="flex gap-3 flex-wrap justify-center mt-8">
          {DATE_BADGES.map((badge, i) => (
            <motion.span
              key={badge.label}
              className="text-xs font-bold px-4 py-2 rounded-full"
              style={{
                backgroundColor: badge.bg,
                color: badge.color,
                fontFamily: "'Nunito', sans-serif",
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i * 0.2,
              }}
            >
              {badge.label}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── PART 4 — Footer ── */}
      <div className="relative z-10 flex flex-col items-center w-full mt-auto pt-12 px-6 text-center safe-bottom">
        <motion.p
          className="text-handwritten text-base"
          style={{ color: "#8B6F47", opacity: 0.7 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          From the boy who gave you blue and yellow gifts 💛💙
        </motion.p>

        <p
          className="text-xs mt-2"
          style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif", opacity: 0.4 }}
        >
          2016 — 2026
        </p>

        {/* Easter egg — barely visible */}
        <p
          className="text-xs mt-6 pb-2"
          style={{
            color: "#8B6F47",
            fontFamily: "'Nunito', sans-serif",
            opacity: 0.3,
          }}
        >
          dai loves buddy. always. 🚌
        </p>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";

// ─── Types ───────────────────────────────────────────────────────────────────

type LineStyle = "heading" | "body" | "special" | "signature" | "spacer";

interface LetterLine {
  text: string;
  style: LineStyle;
  delay: number;
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
  { text: "Hey Buddy,",                                                          style: "heading",   delay: 0 },
  { text: "",                                                                    style: "spacer",    delay: 0.8 },
  { text: "So… I hope you found this surprise by now 😄",                       style: "body",      delay: 1.2 },
  { text: "",                                                                    style: "spacer",    delay: 2.4 },
  { text: "And yes — before you say anything —",                                 style: "body",      delay: 2.8 },
  { text: "I know this came a little late.",                                     style: "body",      delay: 3.8 },
  { text: "But come on… you married me.",                                        style: "body",      delay: 4.6 },
  { text: "You already know punctuality and I",                                  style: "body",      delay: 5.4 },
  { text: "have a complicated relationship 😌",                                  style: "body",      delay: 6.0 },
  { text: "",                                                                    style: "spacer",    delay: 6.8 },
  { text: "But honestly, the delay just means one thing —",                      style: "body",      delay: 7.2 },
  { text: "I wanted it to be worth the wait.",                                   style: "special",   delay: 8.2 },
  { text: "",                                                                    style: "spacer",    delay: 9.2 },
  { text: "I was imagining your reaction",                                       style: "body",      delay: 9.6 },
  { text: "while you were reading the first letter…",                            style: "body",      delay: 10.5 },
  { text: "probably smiling, maybe rolling your eyes,",                          style: "body",      delay: 11.4 },
  { text: "maybe calling me \"drama king\" in your head 😄",                    style: "body",      delay: 12.3 },
  { text: "But that's exactly why I love doing this —",                          style: "body",      delay: 13.3 },
  { text: "because it's you. 💛",                                                style: "special",   delay: 14.0 },
  { text: "",                                                                    style: "spacer",    delay: 14.8 },
  { text: "Life with you is never boring.",                                      style: "body",      delay: 15.2 },
  { text: "Even in the simplest moments,",                                       style: "body",      delay: 16.0 },
  { text: "there's something special…",                                          style: "body",      delay: 16.8 },
  { text: "random conversations, silly arguments,",                              style: "body",      delay: 17.6 },
  { text: "inside jokes, or just sitting together",                              style: "body",      delay: 18.4 },
  { text: "doing nothing —",                                                     style: "body",      delay: 19.0 },
  { text: "it all somehow feels complete. 🥹",                                  style: "special",   delay: 19.6 },
  { text: "",                                                                    style: "spacer",    delay: 20.4 },
  { text: "I may not always say things at the right time…",                      style: "body",      delay: 20.8 },
  { text: "or in the perfect way…",                                              style: "body",      delay: 21.8 },
  { text: "but everything I do comes from",                                      style: "body",      delay: 22.6 },
  { text: "a place full of love for you. Always. 💛",                            style: "special",   delay: 23.4 },
  { text: "",                                                                    style: "spacer",    delay: 24.4 },
  { text: "Thank you for being patient with me 🏆",                              style: "body",      delay: 24.8 },
  { text: "for understanding me even when",                                      style: "body",      delay: 25.8 },
  { text: "I don't explain properly,",                                           style: "body",      delay: 26.6 },
  { text: "and for still choosing me every single day.",                         style: "body",      delay: 27.4 },
  { text: "",                                                                    style: "spacer",    delay: 28.4 },
  { text: "If this made you smile even a little —",                              style: "body",      delay: 28.8 },
  { text: "mission successful 😌",                                               style: "special",   delay: 29.8 },
  { text: "",                                                                    style: "spacer",    delay: 30.6 },
  { text: "Now come here…",                                                      style: "body",      delay: 31.0 },
  { text: "I deserve at least one hug",                                          style: "body",      delay: 31.8 },
  { text: "for all this effort 🤗",                                              style: "body",      delay: 32.4 },
  { text: "",                                                                    style: "spacer",    delay: 33.2 },
  { text: "Happy 2 years to us, Buddy ❤️",                                       style: "special",   delay: 33.6 },
  { text: "More love, more chaos, more memories —",                              style: "body",      delay: 34.8 },
  { text: "together. 💛💙",                                                      style: "body",      delay: 35.6 },
  { text: "",                                                                    style: "spacer",    delay: 36.4 },
  { text: "Luv u always 😘",                                                     style: "signature", delay: 36.8 },
  { text: "💛💙",                                                                style: "signature", delay: 37.8 },
];

const CONFETTI_COLORS = ["#FFD166", "#6BA4D8", "#FFB5C8", "#ffffff", "#FFB347"];
const CONFETTI_COUNT = 50;

const DATE_BADGES = [
  { label: "💍 March 7, 2024",  bg: "#FFD166", color: "#2D2D2D" },
  { label: "💒 April 22, 2024", bg: "#6BA4D8", color: "white"   },
];

// ─── Line style helpers ───────────────────────────────────────────────────────

function lineStyle(style: LineStyle): React.CSSProperties {
  switch (style) {
    case "heading":
      return { fontFamily: "'Dancing Script', cursive", fontSize: "1.5rem", color: "#2D2D2D" };
    case "body":
      return { fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem", color: "#8B6F47" };
    case "special":
      return { fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem", color: "#2D2D2D", fontWeight: 600 };
    case "signature":
      return { fontFamily: "'Dancing Script', cursive", fontSize: "1.25rem", color: "#6BA4D8" };
    case "spacer":
      return {};
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

  // Trigger confetti once the letter bottom is in view (after ~38s of reading)
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
        {LETTER_LINES.map((line, i) => {
          if (line.style === "spacer") {
            return <div key={i} style={{ height: 10 }} />;
          }
          return (
            <motion.p
              key={i}
              style={{ ...lineStyle(line.style), lineHeight: "1.75" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
            >
              {line.text}
            </motion.p>
          );
        })}

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
          className="text-xs mt-6 pb-8 text-center"
          style={{
            color: "#8B6F47",
            fontFamily: "'Nunito', sans-serif",
            opacity: 0.25,
          }}
        >
          punctuality and I have a complicated relationship 😌
        </p>
      </div>
    </section>
  );
}

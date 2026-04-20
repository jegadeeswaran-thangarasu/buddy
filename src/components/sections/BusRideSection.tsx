"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import AnimatedPhotoPlaceholder from "@/components/ui/AnimatedPhotoPlaceholder";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  shape: "circle" | "rect";
  duration: number;
  delay: number;
}

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const CONFETTI_COUNT = 30;
const CONFETTI_COLORS = ["#FFD166", "#6BA4D8", "#FFB5C8", "#ffffff"];

// ─── BusScene ───────────────────────────────────────────────────────────────

function BusScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const busInView = useInView(sceneRef, { once: true, amount: 0.5 });
  const busControls = useAnimation();
  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars client-side to avoid hydration mismatch
  useEffect(() => {
    setStars(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 95,
        top: Math.random() * 65,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  // Bus entrance → idle sequence
  useEffect(() => {
    if (!busInView) return;

    busControls
      .start({
        x: 0,
        transition: { duration: 2.5, ease: "easeOut" },
      })
      .then(() => {
        busControls.start({
          x: [0, -8, 0, 8, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        });
      });
  }, [busInView, busControls]);

  return (
    <div
      ref={sceneRef}
      className="relative w-full overflow-hidden"
      style={{ height: "160px", backgroundColor: "#1a1a2e" }}
    >
      {/* ── Stars ── */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: "3px",
            height: "3px",
            backgroundColor: "white",
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Road strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "22px", backgroundColor: "#333" }}
      />

      {/* ── Moving road markers ── */}
      {/*
        10 markers in a flex row; the row animates x: 0 → -(half its width).
        Since pattern repeats every 5 markers, the loop is seamless.
      */}
      <motion.div
        className="absolute flex"
        style={{
          bottom: "9px",
          left: 0,
          gap: "50px",
        }}
        animate={{ x: [0, -400] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              width: "30px",
              height: "4px",
              flexShrink: 0,
              backgroundColor: "rgba(255,255,255,0.55)",
              borderRadius: "2px",
            }}
          />
        ))}
      </motion.div>

      {/* ── Bus centering wrapper ── */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <motion.div animate={busControls} initial={{ x: -320 }}>
          {/* Bus body */}
          <div
            className="relative flex items-center justify-around rounded-2xl px-4"
            style={{
              width: "200px",
              height: "70px",
              backgroundColor: "#6BA4D8",
            }}
          >
            {/* Window left */}
            <div
              className="rounded-md"
              style={{
                width: "30px",
                height: "25px",
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
            {/* Window right */}
            <div
              className="rounded-md"
              style={{
                width: "30px",
                height: "25px",
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />

            {/* Heart floating from window */}
            <motion.span
              className="absolute text-sm"
              style={{ top: "6px", right: "32px" }}
              animate={{ y: [0, -40], opacity: [1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            >
              ❤️
            </motion.span>
          </div>

          {/* Wheels */}
          <div
            className="flex justify-around"
            style={{ padding: "0 20px", marginTop: "-8px" }}
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="rounded-full border-2"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#222",
                  borderColor: "#FFD166",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── ConfettiBurst ───────────────────────────────────────────────────────────

function ConfettiBurst() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  // Seed confetti data once on mount
  useEffect(() => {
    setPieces(
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 300,
        y: -(Math.random() * 200 + 50),
        rotation: (Math.random() - 0.5) * 720,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 6 + 6,
        shape: Math.random() > 0.5 ? "circle" : "rect",
        duration: Math.random() * 0.8 + 0.8,
        delay: Math.random() * 0.3,
      }))
    );
  }, []);

  // Fire confetti exactly once when in view
  useEffect(() => {
    if (isInView && !hasAnimated.current && pieces.length > 0) {
      hasAnimated.current = true;
      setShowConfetti(true);
    }
  }, [isInView, pieces.length]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* Confetti pieces */}
      {showConfetti &&
        pieces.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              width: p.size,
              height: p.shape === "circle" ? p.size : p.size * 0.5,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              backgroundColor: p.color,
              left: "50%",
              top: "50%",
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
              rotate: p.rotation,
              scale: 0.5,
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          />
        ))}

      {/* Date badge */}
      <span
        className="inline-block text-handwritten text-sm px-4 py-1 rounded-full mb-4"
        style={{ backgroundColor: "#6BA4D8", color: "white" }}
      >
        November 17, 2016
      </span>

      {/* She said yes */}
      <motion.p
        className="text-handwritten text-4xl text-center"
        style={{ color: "#FFD166" }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        She said yes. 💛
      </motion.p>

      <p
        className="text-xs text-center mt-6"
        style={{
          color: "rgba(255,248,240,0.5)",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        The best bus ride ever. 🚌
      </p>
    </div>
  );
}

// ─── BusRideSection ──────────────────────────────────────────────────────────

interface Props { onSectionComplete?: () => void }

export default function BusRideSection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section3.mp3");

  useEffect(() => {
    const t = setTimeout(() => onSectionComplete?.(), 5000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center px-4 py-16"
      style={{ background: "linear-gradient(to bottom, #1a1a2e, #2d2d4e)" }}
    >
      {/* Year label */}
      <motion.p
        className="text-handwritten text-sm mb-8 text-center"
        style={{ color: "#FFD166" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        November 2016
      </motion.p>

      {/* ── PART A: Animated bus scene ── */}
      <motion.div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <BusScene />
      </motion.div>

      {/* Proposal text */}
      <motion.div
        className="mt-6 flex flex-col items-center text-center gap-3 max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span
          className="inline-block text-handwritten text-sm px-4 py-1 rounded-full"
          style={{ backgroundColor: "#FFD166", color: "#2D2D2D" }}
        >
          November 7, 2016
        </span>
        <p
          className="text-sm"
          style={{ color: "#FFF8F0", fontFamily: "'Nunito', sans-serif" }}
        >
          He got on the bus. She didn&apos;t know what was coming.
        </p>
      </motion.div>

      {/* ── PART B: The Wait ── */}
      <div className="mt-10 flex flex-col items-center gap-2">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="text-2xl leading-none"
              style={{ color: "#FFD166" }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              •
            </motion.span>
          ))}
        </div>
        <p
          className="text-xs"
          style={{
            color: "rgba(255,248,240,0.6)",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          10 days later…
        </p>
      </div>

      {/* ── PART C: She Said Yes + Confetti ── */}
      <div className="mt-10 flex flex-col items-center w-full">
        <ConfettiBurst />
      </div>

      {/* Photo placeholder */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatedPhotoPlaceholder
          label="November 2016 🚌"
          rotateDeg={1}
          width="140px"
        />
      </motion.div>

      {/* Section transition → Gifts cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFF8F0)" }}
      />
    </section>
  );
}

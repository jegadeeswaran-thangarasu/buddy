"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ConfettiPiece {
  id: number;
  offsetX: number;
  rotate: number;
  duration: number;
  delay: number;
  color: string;
}

const CONFETTI_COLORS = ["#FFD166", "#6BA4D8", "#FFB5C8", "#FFD166", "#6BA4D8"];

function useSeedConfetti(): ConfettiPiece[] {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  useEffect(() => {
    setPieces(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        offsetX: (Math.random() - 0.5) * 200,
        rotate: Math.random() * 360,
        duration: Math.random() * 1 + 1,
        delay: Math.random() * 0.5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      }))
    );
  }, []);
  return pieces;
}

export default function BusRideSection() {
  const confettiRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(confettiRef, { once: true, amount: 0.6 });
  const confetti = useSeedConfetti();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center px-4 py-16"
      style={{ background: "linear-gradient(to bottom, #1a1a2e, #2d2d4e)" }}
    >
      {/* Year label */}
      <motion.p
        className="text-handwritten text-sm mb-10 text-center"
        style={{ color: "#FFD166" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        November 2016
      </motion.p>

      {/* ── PART A: The Bus ── */}
      <motion.div
        className="flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Bus body */}
        <div className="relative w-4/5 max-w-xs mx-auto flex flex-col items-center">
          <div
            className="relative w-full flex items-center justify-around px-6 rounded-2xl"
            style={{ backgroundColor: "#6BA4D8", height: "90px" }}
          >
            {/* Window left */}
            <div
              className="w-12 h-9 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            />
            {/* Window right — heart floats out */}
            <div
              className="relative w-12 h-9 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <motion.span
                className="absolute text-base"
                style={{ top: "-4px", left: "50%", x: "-50%" }}
                animate={{ y: [0, -32], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              >
                ❤️
              </motion.span>
            </div>
          </div>

          {/* Wheels */}
          <div className="flex justify-around w-3/4 -mt-3">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2"
                style={{ backgroundColor: "#2D2D2D", borderColor: "#FFD166" }}
              />
            ))}
          </div>

          {/* Road */}
          <div
            className="w-full mt-2 h-px"
            style={{ borderTop: "2px dashed rgba(255,209,102,0.3)" }}
          />
        </div>

        {/* Proposal text */}
        <div className="mt-6 flex flex-col items-center text-center gap-3 max-w-xs">
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
            He got on the bus. She didn't know what was coming.
          </p>
        </div>
      </motion.div>

      {/* ── PART B: The Wait ── */}
      <div className="mt-12 flex flex-col items-center gap-2">
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

      {/* ── PART C: She Said Yes ── */}
      <div
        ref={confettiRef}
        className="relative mt-12 flex flex-col items-center"
      >
        {/* Confetti burst — only after inView */}
        {isInView &&
          confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                backgroundColor: piece.color,
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
              }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: piece.offsetX,
                y: -200,
                opacity: 0,
                rotate: piece.rotate,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeOut",
              }}
            />
          ))}

        <span
          className="inline-block text-handwritten text-sm px-4 py-1 rounded-full mb-4"
          style={{ backgroundColor: "#6BA4D8", color: "white" }}
        >
          November 17, 2016
        </span>

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

      {/* Section transition → Gifts cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFF8F0)" }}
      />
    </section>
  );
}

"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";
import AnimatedPhotoPlaceholder from "@/components/ui/AnimatedPhotoPlaceholder";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface GiftData {
  id: number;
  boxColor: string;
  ribbonColor: string;
  label: string;
  giftEmoji: string;
  revealText: string;
  rotationDeg: number;
  offsetStyle: React.CSSProperties;
  photoLabel: string;
  photoRotateDeg: number;
}

const GIFTS: GiftData[] = [
  {
    id: 0,
    boxColor: "#FFD166",
    ribbonColor: "#6BA4D8",
    label: "Pongal 🌾",
    giftEmoji: "🌾",
    revealText: "He showed up. That was the gift. 🥹",
    rotationDeg: 2,
    offsetStyle: { marginLeft: "0px" },
    photoLabel: "Pongal 🌾",
    photoRotateDeg: -3,
  },
  {
    id: 1,
    boxColor: "#6BA4D8",
    ribbonColor: "#FFD166",
    label: "Diwali ✨",
    giftEmoji: "🪔",
    revealText: "Lights, sweets, and his smile. 💙",
    rotationDeg: -1,
    offsetStyle: { marginLeft: "30px" },
    photoLabel: "Diwali ✨",
    photoRotateDeg: 2,
  },
  {
    id: 2,
    boxColor: "#FFD166",
    ribbonColor: "#6BA4D8",
    label: "Amma's Birthday 🎂",
    giftEmoji: "🎂",
    revealText: "He came as a friend. He stayed as family. 💛",
    rotationDeg: 3,
    offsetStyle: { marginLeft: "12px" },
    photoLabel: "Amma's Birthday 🎂",
    photoRotateDeg: -1,
  },
];

function GiftBox({ gift }: { gift: GiftData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const lidControls = useAnimation();
  const emojiControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    setSparkles(
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 80,
        y: -(Math.random() * 40 + 40),
        delay: i * 0.05,
      }))
    );
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Step 1 + 4: lid flies open, sparkles mount via isOpen state
    lidControls.start({
      rotateX: -130,
      y: -60,
      transition: { duration: 0.5, ease: "easeOut" },
    });

    // Step 2: gift emoji pops out at 200ms
    setTimeout(() => {
      emojiControls.start({
        y: -50,
        opacity: 1,
        scale: [0.5, 1.2, 1],
        transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] },
      });
    }, 200);

    // Step 3: reveal text at 500ms
    setTimeout(() => {
      textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      });
    }, 500);
  };

  return (
    <motion.div
      className="flex flex-row items-start gap-3"
      style={gift.offsetStyle}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* ── Box column ── */}
      <div className="flex flex-col items-center" style={{ width: "150px" }}>
        {/* Rotation + click wrapper */}
        <div
          style={{ transform: `rotate(${gift.rotationDeg}deg)`, cursor: "pointer" }}
          onClick={handleOpen}
        >
          {/* 3-D perspective container */}
          <div
            style={{
              width: "150px",
              height: "160px",
              position: "relative",
              perspective: "600px",
              userSelect: "none",
            }}
          >
            {/* ── LID — top 40% (64px) ── */}
            <motion.div
              animate={lidControls}
              style={{
                transformOrigin: "top center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "64px",
                backgroundColor: gift.boxColor,
                borderRadius: "12px 12px 0 0",
                zIndex: 10,
              }}
            >
              {/* Horizontal ribbon */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: "3px",
                  marginTop: "-1.5px",
                  backgroundColor: gift.ribbonColor,
                }}
              />
              {/* Vertical ribbon */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  marginLeft: "-1.5px",
                  backgroundColor: gift.ribbonColor,
                }}
              />
              {/* Bow — left loop */}
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  left: "calc(50% - 18px)",
                  width: "16px",
                  height: "11px",
                  backgroundColor: gift.ribbonColor,
                  borderRadius: "50% 50% 20% 20%",
                  transform: "rotate(-25deg)",
                }}
              />
              {/* Bow — right loop */}
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  left: "calc(50% + 2px)",
                  width: "16px",
                  height: "11px",
                  backgroundColor: gift.ribbonColor,
                  borderRadius: "50% 50% 20% 20%",
                  transform: "rotate(25deg)",
                }}
              />
              {/* Bow — center knot */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "calc(50% - 5px)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: gift.ribbonColor,
                }}
              />
            </motion.div>

            {/* ── BOX BODY — bottom 60% (96px) ── */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "96px",
                backgroundColor: gift.boxColor,
                borderRadius: "0 0 12px 12px",
                overflow: "visible",
              }}
            >
              {/* Vertical ribbon on body */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  marginLeft: "-1.5px",
                  backgroundColor: gift.ribbonColor,
                }}
              />

              {/* Gift emoji — pops up from inside */}
              <motion.div
                animate={emojiControls}
                initial={{ y: 20, opacity: 0, scale: 0.5 }}
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "50%",
                  marginLeft: "-16px",
                  fontSize: "28px",
                  textAlign: "center",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              >
                {gift.giftEmoji}
              </motion.div>
            </div>

            {/* ── Sparkles ── */}
            {isOpen &&
              sparkles.map((s) => (
                <motion.span
                  key={s.id}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "30%",
                    marginLeft: "-10px",
                    marginTop: "-10px",
                    fontSize: "14px",
                    pointerEvents: "none",
                    zIndex: 30,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: s.x,
                    y: s.y,
                    opacity: 0,
                    scale: [0, 1, 0],
                  }}
                  transition={{ duration: 0.8, delay: s.delay, ease: "easeOut" }}
                >
                  ✨
                </motion.span>
              ))}
          </div>
        </div>

        {/* Label (closed) */}
        {!isOpen && (
          <p
            className="text-xs font-semibold mt-3 text-center"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#2D2D2D" }}
          >
            {gift.label}
          </p>
        )}

        {/* Reveal text (animates in on open) */}
        <motion.p
          animate={textControls}
          initial={{ opacity: 0, y: 10 }}
          className="text-xs leading-snug text-center mt-3"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "#2D2D2D",
            maxWidth: "150px",
            minHeight: "32px",
          }}
        >
          {isOpen ? gift.revealText : ""}
        </motion.p>
      </div>

      {/* ── Photo placeholder ── */}
      <AnimatedPhotoPlaceholder
        label={gift.photoLabel}
        width="90px"
        rotateDeg={gift.photoRotateDeg}
      />
    </motion.div>
  );
}

export default function GiftsSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center px-4 py-16"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      {/* Header */}
      <motion.h2
        className="text-handwritten text-2xl text-center"
        style={{ color: "#2D2D2D" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        His &amp; Hers 💛💙
      </motion.h2>

      <motion.p
        className="text-xs text-center mt-1 mb-12"
        style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Every gift — yellow for Buddy, blue for Dai.
      </motion.p>

      {/* Gifts */}
      <div className="flex flex-col gap-10 w-full max-w-xs">
        {GIFTS.map((gift) => (
          <GiftBox key={gift.id} gift={gift} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        className="text-handwritten text-xl text-center mt-12"
        style={{ color: "#2D2D2D" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Blue and yellow. Always.
      </motion.p>

      {/* Section transition → Records beige */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F5ECD7)" }}
      />
    </section>
  );
}

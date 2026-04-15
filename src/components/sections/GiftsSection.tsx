"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";

interface GiftData {
  id: number;
  boxColor: string;
  ribbonColor: string;
  label: string;
  revealText: string;
  rotationDeg: number;
  offsetStyle: React.CSSProperties;
}

const GIFTS: GiftData[] = [
  {
    id: 0,
    boxColor: "#FFD166",
    ribbonColor: "#6BA4D8",
    label: "Pongal 🌾",
    revealText: "He showed up. That was the gift. 🥹",
    rotationDeg: 2,
    offsetStyle: { marginLeft: "16px" },
  },
  {
    id: 1,
    boxColor: "#6BA4D8",
    ribbonColor: "#FFD166",
    label: "Diwali ✨",
    revealText: "Lights, sweets, and his smile. 💙",
    rotationDeg: -1,
    offsetStyle: { marginRight: "16px", alignSelf: "flex-end" },
  },
  {
    id: 2,
    boxColor: "#FFD166",
    ribbonColor: "#6BA4D8",
    label: "Amma's Birthday 🎂",
    revealText: "He came as a friend. He stayed as family. 💛",
    rotationDeg: 3,
    offsetStyle: { marginLeft: "32px" },
  },
];

function GiftBox({ gift }: { gift: GiftData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center"
      style={gift.offsetStyle}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="cursor-pointer select-none"
        style={{ transform: `rotate(${gift.rotationDeg}deg)` }}
        animate={isOpen ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Box body */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            width: "140px",
            height: "140px",
            backgroundColor: gift.boxColor,
          }}
        >
          {/* Horizontal ribbon */}
          <div
            className="absolute inset-x-0"
            style={{
              top: "50%",
              height: "4px",
              marginTop: "-2px",
              backgroundColor: gift.ribbonColor,
            }}
          />
          {/* Vertical ribbon */}
          <div
            className="absolute inset-y-0"
            style={{
              left: "50%",
              width: "4px",
              marginLeft: "-2px",
              backgroundColor: gift.ribbonColor,
            }}
          />
          {/* Bow — left loop */}
          <div
            className="absolute rounded-full"
            style={{
              top: "10px",
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
            className="absolute rounded-full"
            style={{
              top: "10px",
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
            className="absolute rounded-full"
            style={{
              top: "14px",
              left: "calc(50% - 5px)",
              width: "10px",
              height: "10px",
              backgroundColor: gift.ribbonColor,
            }}
          />
        </div>
      </motion.div>

      {/* Label / Reveal */}
      <div className="mt-3 text-center" style={{ minHeight: "44px", width: "160px" }}>
        {isOpen ? (
          <motion.p
            className="text-xs leading-snug text-center"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#2D2D2D" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {gift.revealText}
          </motion.p>
        ) : (
          <p
            className="text-xs font-semibold"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#2D2D2D" }}
          >
            {gift.label}
          </p>
        )}
      </div>
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

      {/* Gifts — stacked, scattered */}
      <div className="flex flex-col gap-8 w-full max-w-xs">
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

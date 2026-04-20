"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
}

export default function ProgressBar({ currentSection, totalSections }: ProgressBarProps) {
  const pct = totalSections > 1
    ? (currentSection / (totalSections - 1)) * 100
    : 0;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 3,
        backgroundColor: "rgba(255,255,255,0.1)",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(to right, #FFD166, #6BA4D8)",
          transformOrigin: "left",
        }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}

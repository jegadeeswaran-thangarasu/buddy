"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  sectionKey: string;
}

export default function SectionTransition({
  children,
  sectionKey,
}: SectionTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sectionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          height: "100dvh",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Camera-flash overlay on enter */}
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            pointerEvents: "none",
            zIndex: 999,
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

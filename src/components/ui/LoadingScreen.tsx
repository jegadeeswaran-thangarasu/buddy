"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [dotCount, setDotCount] = useState(1);
  const [visible, setVisible] = useState(true);

  // Animate dots 1 → 2 → 3 → 1 …
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((d) => (d % 3) + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // After 1.5 s, start fade-out; call onDone when animation ends
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#FFF8F0", zIndex: 200 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <motion.span
            style={{ fontSize: "3.5rem", display: "block" }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            💛
          </motion.span>

          <p
            className="mt-4 text-sm"
            style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
          >
            loading{".".repeat(dotCount)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

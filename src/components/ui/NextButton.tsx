"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NextButtonProps {
  text: string;
  subtext?: string;
  onNext: () => void;
  visible: boolean;
  variant?: "light" | "dark";
}

export default function NextButton({
  text,
  subtext,
  onNext,
  visible,
  variant = "light",
}: NextButtonProps) {
  const [rippling, setRippling] = useState(false);

  const handleTap = () => {
    setRippling(true);
    setTimeout(() => {
      setRippling(false);
      onNext();
    }, 350);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: "fixed",
            bottom: 32,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            zIndex: 50,
            pointerEvents: "auto",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Button */}
          <motion.button
            onClick={handleTap}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#FFD166",
              color: "#2D2D2D",
              borderRadius: 9999,
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 16,
              paddingBottom: 16,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255,209,102,0.4)",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              maxWidth: "calc(100vw - 48px)",
            }}
          >
            {/* Ripple */}
            <AnimatePresence>
              {rippling && (
                <motion.span
                  style={{
                    position: "absolute",
                    inset: 0,
                    margin: "auto",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "rgba(45,45,45,0.15)",
                    pointerEvents: "none",
                  }}
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{ scale: 5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* Arrow */}
            <motion.span
              style={{ fontSize: 10, opacity: 0.6, lineHeight: 1 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              ↑
            </motion.span>

            {/* Text */}
            <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
          </motion.button>

          {/* Subtext */}
          {subtext && (
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11,
                color: variant === "dark" ? "rgba(255,255,255,0.4)" : "rgba(139,111,71,0.6)",
                textAlign: "center",
                margin: 0,
              }}
            >
              {subtext}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

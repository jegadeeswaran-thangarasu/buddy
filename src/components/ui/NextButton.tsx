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
            zIndex: 50,
            pointerEvents: "auto",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Decorative line above button */}
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(255,209,102,0.4)",
              marginBottom: 8,
            }}
          />

          {/* Button */}
          <motion.button
            onClick={handleTap}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#FFD166",
              borderRadius: 9999,
              paddingLeft: 28,
              paddingRight: 28,
              paddingTop: 14,
              paddingBottom: 14,
              minWidth: 260,
              maxWidth: Math.min(320, typeof window !== "undefined" ? window.innerWidth - 48 : 320),
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255,209,102,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
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

            {/* Decorative dot */}
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,209,102,0.6)",
                lineHeight: 1,
                position: "relative",
                zIndex: 1,
              }}
            >
              ✦
            </span>

            {/* Main quote text */}
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'Dancing Script', cursive",
                fontSize: 16,
                fontWeight: 400,
                color: "#2D2D2D",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {text}
            </span>

            {/* Subtext */}
            {subtext && (
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 11,
                  color: variant === "dark" ? "rgba(255,255,255,0.5)" : "rgba(45,45,45,0.6)",
                  textAlign: "center",
                  fontStyle: "italic",
                  marginTop: 2,
                }}
              >
                {subtext}
              </span>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AudioManager } from "@/lib/audioManager";

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const toggle = () => {
    const manager = AudioManager.getInstance();
    if (isMuted) {
      manager.unmute();
      setIsMuted(false);
    } else {
      manager.mute();
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
      >
        {/* Hover label */}
        {showLabel && (
          <motion.p
            className="absolute bottom-14 right-0 whitespace-nowrap"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 12,
              color: "rgba(45,45,45,0.6)",
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            music 🎵
          </motion.p>
        )}

        <motion.button
          onClick={toggle}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className="w-12 h-12 rounded-full text-xl shadow-lg flex items-center justify-center cursor-pointer select-none"
          style={{ backgroundColor: "#FFD166", color: "#2D2D2D" }}
          animate={
            !isMuted
              ? {
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 0px #FFD16600",
                    "0 0 16px #FFD16699",
                    "0 0 0px #FFD16600",
                  ],
                }
              : { scale: 1, boxShadow: "0 0 0px #FFD16600" }
          }
          transition={
            !isMuted
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        >
          {isMuted ? "🔇" : "♪"}
        </motion.button>
      </div>
    </div>
  );
}

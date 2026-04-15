"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const PETAL_COLORS = ["#FFD166", "#6BA4D8", "#FFB5C8", "#F5ECD7"];

function generatePetals(): Petal[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 6 + 4,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 4,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }));
}

interface EntranceProps {
  onOpen: () => void;
}

export default function Entrance({ onOpen }: EntranceProps) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setPetals(generatePetals());
  }, []);

  const handleOpen = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onOpen();
    }, 650);
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="entrance"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
          style={{ backgroundColor: "#FFF8F0" }}
          onClick={handleOpen}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          {/* Floating petals */}
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${petal.x}%`,
                top: "-20px",
                width: petal.size,
                height: petal.size,
                backgroundColor: petal.color,
                opacity: 0.6,
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Center content */}
          <div className="flex flex-col items-center gap-3 px-8 select-none">
            {/* To: label */}
            <motion.p
              className="text-sm text-handwritten"
              style={{ color: "#8B6F47" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              To:
            </motion.p>

            {/* Name */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h1
                className="text-handwritten font-bold leading-none"
                style={{ fontSize: "clamp(3rem, 14vw, 4rem)", color: "#2D2D2D" }}
              >
                Buddy 💛
              </h1>

              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full"
                style={{ backgroundColor: "#FFD166" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              />
            </motion.div>

            {/* Gift box */}
            <motion.div
              className="mt-6 text-5xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.8 },
                y: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                },
              }}
            >
              🎁
            </motion.div>

            {/* Tap hint */}
            <motion.p
              className="mt-2 text-sm"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#8B6F47" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.3, 0.7] }}
              transition={{
                duration: 3,
                delay: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              tap to open your surprise
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="entrance-exit"
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "#FFF8F0" }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}

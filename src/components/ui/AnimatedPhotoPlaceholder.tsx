"use client";

import { motion } from "framer-motion";

interface AnimatedPhotoPlaceholderProps {
  label: string;
  aspectRatio?: string;
  rotateDeg?: number;
  width?: string;
}

export default function AnimatedPhotoPlaceholder({
  label,
  aspectRatio = "4/5",
  rotateDeg = 0,
  width = "120px",
}: AnimatedPhotoPlaceholderProps) {
  return (
    <motion.div
      className="inline-block bg-white shadow-lg rounded-sm"
      style={{
        padding: "10px 10px 28px 10px",
        transform: `rotate(${rotateDeg}deg)`,
        width,
        flexShrink: 0,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          aspectRatio,
          width: "100%",
          background: "linear-gradient(135deg, rgba(255,209,102,0.18), rgba(107,164,216,0.18))",
          border: "1.5px dashed rgba(255,209,102,0.45)",
        }}
      >
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <motion.span
            className="text-3xl leading-none"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            📷
          </motion.span>
          <p
            className="text-center leading-tight px-1"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "9px",
              color: "#8B6F47",
            }}
          >
            {label}
          </p>
        </div>

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-y-0 pointer-events-none"
          style={{
            width: "45%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
          animate={{ x: ["-100%", "320%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1.2,
          }}
        />
      </div>

      {/* Polaroid caption */}
      <p
        className="text-handwritten text-center mt-1.5 leading-none"
        style={{ fontSize: "10px", color: "#2D2D2D" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

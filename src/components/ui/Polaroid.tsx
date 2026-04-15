"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PhotoItem } from "@/data/photos";

interface PolaroidProps {
  photo: PhotoItem;
  index: number;
  onClick?: () => void;
}

export default function Polaroid({ photo, index, onClick }: PolaroidProps) {
  return (
    <motion.div
      className="inline-block bg-white rounded-sm shadow-xl"
      style={{
        padding: "8px 8px 32px 8px",
        cursor: onClick ? "pointer" : "default",
      }}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotation ?? 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {/* Photo */}
      <div className="relative rounded-sm overflow-hidden" style={{ width: "160px", height: "160px" }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="160px"
        />
        {/* Year badge */}
        {photo.year && (
          <span
            className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "#FFD166",
              color: "#2D2D2D",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {photo.year}
          </span>
        )}
      </div>

      {/* Caption */}
      <p
        className="text-handwritten text-sm text-center mt-1"
        style={{ color: "#2D2D2D", width: "160px" }}
      >
        {photo.caption}
      </p>
    </motion.div>
  );
}

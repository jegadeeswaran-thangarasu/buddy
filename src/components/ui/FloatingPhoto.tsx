"use client";

import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import type { PhotoItem } from "@/data/photos";

interface FloatingPhotoProps {
  photo: PhotoItem;
  index: number;
  delay?: number;
  onClick?: () => void;
  rotation?: number;
}

export default function FloatingPhoto({
  photo,
  index,
  delay = 0,
  onClick,
  rotation = 0,
}: FloatingPhotoProps) {
  const enterDelay = index * 0.25 + delay;
  const shadowControls = useAnimation();
  const boxShadow = useMotionValue("0 2px 4px rgba(0,0,0,0.08)");

  useEffect(() => {
    const t = setTimeout(() => {
      shadowControls.start({
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        transition: { duration: 0.4 },
      } as Parameters<typeof shadowControls.start>[0]);
    }, (enterDelay + 0.15) * 1000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  void boxShadow;

  return (
    <motion.div
      onClick={onClick}
      animate={shadowControls}
      style={{
        backgroundColor: "white",
        padding: "8px 8px 28px 8px",
        borderRadius: 2,
        cursor: onClick ? "pointer" : "default",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
      initial={{ y: -30, opacity: 0, rotate: 0, scale: 0.92 }}
      whileInView={{ y: 0, opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        y: { type: "spring", stiffness: 80, damping: 14, delay: enterDelay },
        opacity: { duration: 0.35, delay: enterDelay },
        scale: { type: "spring", stiffness: 80, damping: 14, delay: enterDelay },
        rotate: { type: "spring", stiffness: 180, damping: 18, delay: enterDelay + 0.2 },
      }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Image container — square aspect ratio */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          style={{ objectFit: "cover" }}
        />

        {/* Year badge */}
        {photo.year && (
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: "#FFD166",
              color: "#2D2D2D",
              fontFamily: "'Nunito', sans-serif",
              fontSize: 9,
              padding: "2px 6px",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            {photo.year}
          </span>
        )}
      </div>

      {/* Caption */}
      <p
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 11,
          color: "#2D2D2D",
          textAlign: "center",
          marginTop: 4,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
      >
        {photo.caption}
      </p>
    </motion.div>
  );
}

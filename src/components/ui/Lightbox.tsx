"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { PhotoItem } from "@/data/photos";

interface LightboxProps {
  photo: PhotoItem | null;
  onClose: () => void;
}

export default function Lightbox({ photo, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {photo && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Close button */}
          <motion.button
            className="fixed top-6 right-6 z-[60] flex items-center justify-center text-white text-3xl w-10 h-10 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.22)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ×
          </motion.button>

          {/* Draggable content */}
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center px-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div
              className="flex flex-col items-center pointer-events-auto"
              drag="y"
              dragConstraints={{ top: 0, bottom: 100 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) onClose();
              }}
            >
              {/* Image */}
              <div
                className="relative w-full max-w-sm rounded-2xl overflow-hidden"
                style={{ height: "480px" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 384px"
                />
              </div>

              {/* Caption */}
              <p
                className="text-handwritten text-xl text-center mt-4"
                style={{ color: "white" }}
              >
                {photo.caption}
              </p>

              {/* Swipe hint */}
              <p
                className="text-xs text-center mt-3"
                style={{
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                swipe down to close
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

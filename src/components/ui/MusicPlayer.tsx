"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => setIsAvailable(true);
    const handleError = () => setIsAvailable(false);

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    // Trigger load check
    audio.load();

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked or other error
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      {/* Hidden audio element — always present to probe file existence */}
      <audio ref={audioRef} src="/audio/song.mp3" preload="auto" loop />

      {isAvailable && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute bottom-14 right-0 bg-buddy-dark text-buddy-cream text-xs font-body px-3 py-1.5 rounded-full whitespace-nowrap shadow-md">
                Our song 💛
              </div>
            )}

            {/* Button */}
            <motion.button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="w-12 h-12 rounded-full bg-buddy-yellow text-buddy-dark text-xl shadow-lg flex items-center justify-center cursor-pointer select-none"
              animate={
                isPlaying
                  ? { scale: [1, 1.08, 1], boxShadow: ["0 0 0px #FFD16600", "0 0 16px #FFD16699", "0 0 0px #FFD16600"] }
                  : { scale: 1 }
              }
              transition={
                isPlaying
                  ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
            >
              {isPlaying ? "♫" : "♪"}
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}

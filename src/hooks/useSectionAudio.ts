"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { AudioManager } from "@/lib/audioManager";

export function useSectionAudio(songFile: string) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    amount: 0.4,
    once: false,
  });

  useEffect(() => {
    if (isInView && songFile) {
      AudioManager.getInstance().playSong(`/audio/${songFile}`, 0.4, "/audio/adiye.mp3");
    }
  }, [isInView, songFile]);

  return ref;
}

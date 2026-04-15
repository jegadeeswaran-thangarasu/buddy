"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Entrance from "@/components/sections/Entrance";
import LetterSection from "@/components/sections/LetterSection";
import EmojiChatSection from "@/components/sections/EmojiChatSection";
import BusRideSection from "@/components/sections/BusRideSection";
import GiftsSection from "@/components/sections/GiftsSection";
import RecordsSection from "@/components/sections/RecordsSection";
import HardTimesSection from "@/components/sections/HardTimesSection";
import MemoryGallerySection from "@/components/sections/MemoryGallerySection";
import AmmaSection from "@/components/sections/AmmaSection";
import EngagementSection from "@/components/sections/EngagementSection";
import WeddingSection from "@/components/sections/WeddingSection";
import PhotoshootSection from "@/components/sections/PhotoshootSection";
import StillBuddiesSection from "@/components/sections/StillBuddiesSection";
import FinaleSection from "@/components/sections/FinaleSection";
import MusicPlayer from "@/components/ui/MusicPlayer";
import ProgressBar from "@/components/ui/ProgressBar";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      {isLoading && <LoadingScreen onDone={() => setIsLoading(false)} />}

      {!isLoading && !hasOpened && <Entrance onOpen={() => setHasOpened(true)} />}

      {hasOpened && <ProgressBar />}

      {hasOpened && (
        <m.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          <LetterSection />
          <EmojiChatSection />
          <BusRideSection />
          <GiftsSection />
          <RecordsSection />
          <HardTimesSection />
          <MemoryGallerySection />
          <AmmaSection />
          <EngagementSection />
          <WeddingSection />
          <PhotoshootSection />
          <StillBuddiesSection />
          <FinaleSection />
          <MusicPlayer />
        </m.main>
      )}
    </LazyMotion>
  );
}

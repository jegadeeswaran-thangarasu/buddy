"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Entrance from "@/components/sections/Entrance";
import LetterSection from "@/components/sections/LetterSection";
import EmojiChatSection from "@/components/sections/EmojiChatSection";
import BusRideSection from "@/components/sections/BusRideSection";
import GiftsSection from "@/components/sections/GiftsSection";
import RecordsSection from "@/components/sections/RecordsSection";
import HardTimesSection from "@/components/sections/HardTimesSection";
import MusicPlayer from "@/components/ui/MusicPlayer";

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <>
      {!hasOpened && <Entrance onOpen={() => setHasOpened(true)} />}

      {hasOpened && (
        <motion.main
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
          {/* future sections will be added here */}
          <MusicPlayer />
        </motion.main>
      )}
    </>
  );
}

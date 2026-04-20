"use client";

import React, { useState, useEffect } from "react";
import Entrance from "@/components/sections/Entrance";
import LetterSection from "@/components/sections/LetterSection";
import EmojiChatSection from "@/components/sections/EmojiChatSection";
import BusRideSection from "@/components/sections/BusRideSection";
import QuizSection from "@/components/sections/QuizSection";
import TypewriterSection from "@/components/sections/TypewriterSection";
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
import NextButton from "@/components/ui/NextButton";
import SectionTransition from "@/components/ui/SectionTransition";
import { SECTIONS } from "@/lib/sectionConfig";

type SectionComponent = React.ComponentType<{ onSectionComplete?: () => void }>;

const sectionComponents: SectionComponent[] = [
  LetterSection,
  EmojiChatSection,
  BusRideSection,
  QuizSection,
  TypewriterSection,
  MemoryGallerySection,
  AmmaSection,
  EngagementSection,
  WeddingSection,
  PhotoshootSection,
  StillBuddiesSection,
  FinaleSection,
];

const DARK_SECTIONS = new Set([
  "emoji-chat",
  "bus-ride",
  "still-buddies",
  "engagement",
  "wedding",
  "quiz",
]);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // Lock scroll on body/html
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100dvh";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Reset next button whenever section changes
  useEffect(() => {
    setShowNextButton(false);
  }, [currentSection]);

  const isLastSection = currentSection === sectionComponents.length - 1;
  const config = SECTIONS[currentSection];
  const isDarkSection = config ? DARK_SECTIONS.has(config.id) : false;

  const handleNext = () => {
    if (isTransitioning) return;
    if (isLastSection) return;
    setIsTransitioning(true);
    setShowNextButton(false);
    setCurrentSection((prev) => prev + 1);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  if (isLoading) {
    return <LoadingScreen onDone={() => setIsLoading(false)} />;
  }

  if (!hasOpened) {
    return <Entrance onOpen={() => setHasOpened(true)} />;
  }

  const CurrentSection = sectionComponents[currentSection];

  return (
    <>
      <ProgressBar
        currentSection={currentSection}
        totalSections={sectionComponents.length}
      />

      <SectionTransition sectionKey={config?.id ?? `section-${currentSection}`}>
        <CurrentSection onSectionComplete={() => setShowNextButton(true)} />
      </SectionTransition>

      <NextButton
        text={config?.nextButtonText ?? ""}
        subtext={config?.nextButtonSubtext}
        onNext={handleNext}
        visible={showNextButton && !isLastSection}
        variant={isDarkSection ? "dark" : "light"}
      />

      <MusicPlayer />
    </>
  );
}

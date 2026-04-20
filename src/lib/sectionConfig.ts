export interface SectionConfig {
  id: string;
  component: string;
  nextButtonText: string;
  nextButtonSubtext?: string;
  songFile: string;
  lockUntil: "immediate" | "animated" | "interaction";
}

export const SECTIONS: SectionConfig[] = [
  {
    id: "letter",
    component: "LetterSection",
    nextButtonText: "உன்னோடு இந்த பயணம் தொடரட்டும் 💛",
    nextButtonSubtext: "continue our story",
    songFile: "section1.mp3",
    lockUntil: "animated",
  },
  {
    id: "emoji-chat",
    component: "EmojiChatSection",
    nextButtonText: "நம்ம கதை இன்னும் இருக்கு, வாலா 💙",
    nextButtonSubtext: "there is more to us",
    songFile: "section2.mp3",
    lockUntil: "animated",
  },
  {
    id: "bus-ride",
    component: "BusRideSection",
    nextButtonText: "அந்த bus ride மறக்கவே முடியாது 🚌💛",
    nextButtonSubtext: "a ride worth remembering",
    songFile: "section3.mp3",
    lockUntil: "animated",
  },
  {
    id: "quiz",
    component: "QuizSection",
    nextButtonText: "நம்ம கதையை நீ நன்னா தெரியும் 💛",
    nextButtonSubtext: "you know us by heart",
    songFile: "section4.mp3",
    lockUntil: "interaction",
  },
  {
    id: "hard-times",
    component: "HardTimesSection",
    nextButtonText: "கஷ்டங்கள் கடந்தோம், சேர்ந்து 💙",
    nextButtonSubtext: "we made it through together",
    songFile: "section5.mp3",
    lockUntil: "animated",
  },
  {
    id: "typewriter",
    component: "TypewriterSection",
    nextButtonText: "இந்த வார்த்தைகள் என் மனசிலிருந்து 💛",
    nextButtonSubtext: "straight from my heart",
    songFile: "section6.mp3",
    lockUntil: "interaction",
  },
  {
    id: "memory-gallery",
    component: "MemoryGallerySection",
    nextButtonText: "இந்த நினைவுகள் என் கண்முன்னே 🥹💛",
    nextButtonSubtext: "memories I hold forever",
    songFile: "section7.mp3",
    lockUntil: "animated",
  },
  {
    id: "amma",
    component: "AmmaSection",
    nextButtonText: "அம்மா ஆசீர்வாதம் வாங்கிட்டோம் 🙏💛",
    nextButtonSubtext: "with amma's blessings",
    songFile: "section8.mp3",
    lockUntil: "animated",
  },
  {
    id: "engagement",
    component: "EngagementSection",
    nextButtonText: "அந்த மோதிரம் மாட்டிய நாள் 💍",
    nextButtonSubtext: "the day it became official",
    songFile: "section9.mp3",
    lockUntil: "animated",
  },
  {
    id: "wedding",
    component: "WeddingSection",
    nextButtonText: "என் வாழ்க்கையின் best day 💒💛",
    nextButtonSubtext: "the best day of my life",
    songFile: "section10.mp3",
    lockUntil: "animated",
  },
  {
    id: "photoshoot",
    component: "PhotoshootSection",
    nextButtonText: "நாம் இருவரும், எப்பவும் 📸💛",
    nextButtonSubtext: "always us, always this",
    songFile: "section11.mp3",
    lockUntil: "animated",
  },
  {
    id: "still-buddies",
    component: "StillBuddiesSection",
    nextButtonText: "இந்த கதையின் finale பார்க்கணும் 💛💙",
    nextButtonSubtext: "the best part is coming",
    songFile: "section12.mp3",
    lockUntil: "animated",
  },
];

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
    nextButtonText: "With you, I am home 💛",
    nextButtonSubtext: "and home is my favourite place",
    songFile: "section1.mp3",
    lockUntil: "animated",
  },
  {
    id: "emoji-chat",
    component: "EmojiChatSection",
    nextButtonText: "Loving you is my favourite adventure 💙",
    nextButtonSubtext: "and I never want it to end",
    songFile: "section2.mp3",
    lockUntil: "animated",
  },
  {
    id: "bus-ride",
    component: "BusRideSection",
    nextButtonText: "I knew, the moment I met you 💛",
    nextButtonSubtext: "that you were going to change everything",
    songFile: "section3.mp3",
    lockUntil: "animated",
  },
  {
    id: "quiz",
    component: "QuizSection",
    nextButtonText: "You know us by heart 💛",
    nextButtonSubtext: "because you are my heart",
    songFile: "section4.mp3",
    lockUntil: "interaction",
  },
  {
    id: "typewriter",
    component: "TypewriterSection",
    nextButtonText: "Every love story is beautiful 💌",
    nextButtonSubtext: "but ours is my favourite",
    songFile: "section6.mp3",
    lockUntil: "interaction",
  },
  {
    id: "memory-gallery",
    component: "MemoryGallerySection",
    nextButtonText: "In a sea of people 💛",
    nextButtonSubtext: "my eyes will always search for you",
    songFile: "section7.mp3",
    lockUntil: "animated",
  },
  {
    id: "amma",
    component: "AmmaSection",
    nextButtonText: "I choose you. Again and again 💛",
    nextButtonSubtext: "in every phase, in every life",
    songFile: "section8.mp3",
    lockUntil: "animated",
  },
  {
    id: "engagement",
    component: "EngagementSection",
    nextButtonText: "You are my today 💍",
    nextButtonSubtext: "and all of my tomorrows",
    songFile: "section9.mp3",
    lockUntil: "animated",
  },
  {
    id: "wedding",
    component: "WeddingSection",
    nextButtonText: "I swear I couldn't love you more 💒",
    nextButtonSubtext: "and yet I know I will tomorrow",
    songFile: "section10.mp3",
    lockUntil: "animated",
  },
  {
    id: "photoshoot",
    component: "PhotoshootSection",
    nextButtonText: "Real love stories never have endings 📸",
    nextButtonSubtext: "ours is only just beginning",
    songFile: "section11.mp3",
    lockUntil: "animated",
  },
  {
    id: "still-buddies",
    component: "StillBuddiesSection",
    nextButtonText: "Forever is a long time 💛💙",
    nextButtonSubtext: "but I wouldn't mind spending it with you",
    songFile: "section12.mp3",
    lockUntil: "animated",
  },
];

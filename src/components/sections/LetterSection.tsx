"use client";

import { motion } from "framer-motion";

interface LetterLine {
  content: string | string[];
  className: string;
  style?: React.CSSProperties;
}

const LETTER_LINES: LetterLine[] = [
  {
    content: "Hey Buddy,",
    className: "text-handwritten text-2xl font-semibold",
    style: { color: "#2D2D2D" },
  },
  {
    content: "I know you weren't expecting this.",
    className: "text-sm mt-4 leading-relaxed",
    style: { color: "#8B6F47", fontFamily: "'Nunito', sans-serif" },
  },
  {
    content: "But then again — when have I ever been predictable? 😏",
    className: "text-sm mt-2",
    style: { color: "#2D2D2D", fontFamily: "'Nunito', sans-serif" },
  },
  {
    content: [
      "10 years ago, two introverts found each other.",
      "No drama. No grand gestures.",
      "Just emojis. And a bus ride. And everything after.",
    ],
    className: "text-sm mt-4 leading-relaxed",
    style: { color: "#2D2D2D", fontFamily: "'Nunito', sans-serif" },
  },
  {
    content: [
      "This is our story, Buddy.",
      "Scroll slowly. Feel it all. 💛",
    ],
    className: "text-sm mt-4 leading-relaxed",
    style: { color: "#2D2D2D", fontFamily: "'Nunito', sans-serif" },
  },
  {
    content: "— Dai 💙",
    className: "text-handwritten text-xl mt-6 text-right",
    style: { color: "#6BA4D8" },
  },
];

function LetterLine({
  line,
  index,
}: {
  line: LetterLine;
  index: number;
}) {
  const content = Array.isArray(line.content) ? line.content : [line.content];

  return (
    <motion.div
      className={line.className}
      style={line.style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.25, ease: "easeOut" }}
    >
      {content.map((text, i) => (
        <p key={i} className={i > 0 ? "mt-1" : undefined}>
          {text}
        </p>
      ))}
    </motion.div>
  );
}

export default function LetterSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      {/* Letter card */}
      <motion.div
        className="relative w-11/12 max-w-sm rounded-2xl p-8 shadow-md"
        style={{ backgroundColor: "#FFFDF7", maxWidth: "380px" }}
        initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Wax seal */}
        <motion.div
          className="flex flex-col items-center justify-center w-14 h-14 rounded-full mx-auto mb-6"
          style={{ backgroundColor: "#FFD166" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
        >
          <span className="text-lg leading-none">💛</span>
          <span
            className="text-handwritten leading-none mt-0.5"
            style={{ fontSize: "9px", color: "#2D2D2D" }}
          >
            2016 – 2026
          </span>
        </motion.div>

        {/* Letter lines */}
        {LETTER_LINES.map((line, index) => (
          <LetterLine key={index} line={line} index={index} />
        ))}
      </motion.div>

      {/* Section transition → EmojiChat dark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #2D2D2D)" }}
      />

      {/* Scroll hint */}
      <motion.div
        className="mt-12 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <motion.p
          className="text-xs"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#8B6F47" }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓ scroll to begin
        </motion.p>
      </motion.div>
    </section>
  );
}

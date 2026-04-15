"use client";

import { motion } from "framer-motion";

interface ChatMessage {
  emoji: string;
  side: "left" | "right";
  color: string;
}

// Interleaved: him (left, blue) and her (right, yellow)
const MESSAGES: ChatMessage[] = [
  { emoji: "👋", side: "left",  color: "#6BA4D8" },
  { emoji: "😊", side: "right", color: "#FFD166" },
  { emoji: "😄", side: "left",  color: "#6BA4D8" },
  { emoji: "🌸", side: "right", color: "#FFD166" },
  { emoji: "🌟", side: "left",  color: "#6BA4D8" },
  { emoji: "✨", side: "right", color: "#FFD166" },
  { emoji: "💙", side: "left",  color: "#6BA4D8" },
  { emoji: "🌙", side: "right", color: "#FFD166" },
  { emoji: "🎵", side: "left",  color: "#6BA4D8" },
  { emoji: "💛", side: "right", color: "#FFD166" },
];

export default function EmojiChatSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col px-4 py-16"
      style={{ backgroundColor: "#2D2D2D" }}
    >
      {/* Year label with side lines */}
      <motion.div
        className="flex items-center gap-3 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,209,102,0.2)" }} />
        <span
          className="text-handwritten text-sm whitespace-nowrap"
          style={{ color: "#FFD166" }}
        >
          2016 — College Days
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,209,102,0.2)" }} />
      </motion.div>

      {/* Chat bubbles */}
      <div className="flex flex-col gap-3 max-w-sm mx-auto w-full flex-1">
        {MESSAGES.map((msg, index) => (
          <motion.div
            key={index}
            className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, x: msg.side === "right" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.12, ease: "easeOut" }}
          >
            <div className="flex flex-col items-end gap-0.5">
              <div
                className="rounded-2xl px-4 py-3 text-2xl leading-none"
                style={{ backgroundColor: msg.color }}
              >
                {msg.emoji}
              </div>
              <span
                className="text-xs"
                style={{
                  color: "rgba(255,248,240,0.4)",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                just now
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Caption */}
      <motion.div
        className="mt-10 text-center max-w-xs mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#FFF8F0", fontFamily: "'Nunito', sans-serif" }}
        >
          No long conversations.
          <br />
          Just emojis. For hours. Never boring. 💛
        </p>
      </motion.div>

      {/* Section transition → BusRide dark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1a1a2e)" }}
      />
    </section>
  );
}

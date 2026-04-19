"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionAudio } from "@/hooks/useSectionAudio";

// ─── Types ────────────────────────────────────────────────────────────────────

type LineStyle = "heading" | "highlight" | "body" | "special" | "spacer" | "signature";

interface LetterLine {
  text: string;
  style: LineStyle;
  delay: number;
}

interface VisibleWord {
  lineIndex: number;
  wordIndex: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BUDDY_YELLOW = "#FFD166";
const BUDDY_BLUE = "#6BA4D8";
const BUDDY_DARK = "#2D2D2D";
const BUDDY_BROWN = "#8B6F47";

const letterLines: LetterLine[] = [
  { text: "My dear love,", style: "heading", delay: 0 },
  { text: "", style: "spacer", delay: 0.8 },
  { text: "Happy Anniversary ❤️", style: "highlight", delay: 1.0 },
  { text: "", style: "spacer", delay: 1.9 },
  { text: "Sometimes I wonder how I got so lucky", style: "body", delay: 2.2 },
  { text: "to have you in my life.", style: "body", delay: 3.7 },
  { text: "From the moment you came into it,", style: "body", delay: 4.9 },
  { text: "everything started to feel more meaningful,", style: "body", delay: 6.3 },
  { text: "more complete.", style: "body", delay: 7.7 },
  { text: "", style: "spacer", delay: 8.2 },
  { text: "You are not just my wife—", style: "body", delay: 8.5 },
  { text: "you are my peace, my strength,", style: "body", delay: 9.6 },
  { text: "and the most beautiful part of my everyday life.", style: "body", delay: 10.7 },
  { text: "", style: "spacer", delay: 12.1 },
  { text: "Over the time we've spent together,", style: "body", delay: 12.4 },
  { text: "we've shared so many moments—", style: "body", delay: 13.7 },
  { text: "some simple, some challenging,", style: "body", delay: 14.8 },
  { text: "but all of them special", style: "body", delay: 15.8 },
  { text: "because they were with you.", style: "body", delay: 16.7 },
  { text: "", style: "spacer", delay: 17.5 },
  { text: "You've stood by me, supported me,", style: "body", delay: 17.8 },
  { text: "and believed in me", style: "body", delay: 19.1 },
  { text: "even when I doubted myself.", style: "body", delay: 19.9 },
  { text: "That's something I will never take for granted.", style: "body", delay: 20.9 },
  { text: "", style: "spacer", delay: 22.4 },
  { text: "I truly admire the kind of person you are—", style: "body", delay: 22.7 },
  { text: "your kindness, your patience,", style: "body", delay: 24.4 },
  { text: "your strength, and the way you care", style: "body", delay: 25.3 },
  { text: "for the people around you.", style: "body", delay: 26.7 },
  { text: "You inspire me to become a better person", style: "body", delay: 27.6 },
  { text: "every single day.", style: "body", delay: 29.1 },
  { text: "", style: "spacer", delay: 29.7 },
  { text: "Life isn't always perfect,", style: "special", delay: 30.0 },
  { text: "and we may have our ups and downs,", style: "special", delay: 30.9 },
  { text: "but one thing I'm always sure of—", style: "special", delay: 32.3 },
  { text: "I choose you.", style: "special", delay: 33.6 },
  { text: "Again and again,", style: "special", delay: 34.2 },
  { text: "in every phase of life,", style: "special", delay: 34.9 },
  { text: "I will choose you.", style: "special", delay: 35.8 },
  { text: "", style: "spacer", delay: 36.6 },
  { text: "Thank you for being my partner,", style: "body", delay: 36.9 },
  { text: "my best friend, and my home.", style: "body", delay: 38.1 },
  { text: "", style: "spacer", delay: 39.2 },
  { text: "I look forward to building many more memories", style: "body", delay: 39.5 },
  { text: "with you, growing together,", style: "body", delay: 41.1 },
  { text: "and celebrating many more anniversaries like this.", style: "body", delay: 41.9 },
  { text: "", style: "spacer", delay: 43.4 },
  { text: "I love you more than words can express.", style: "body", delay: 43.7 },
  { text: "", style: "spacer", delay: 45.2 },
  { text: "Luv u always buddy 😘", style: "signature", delay: 45.5 },
];

const LETTER_DONE_MS = 47000;
const WORD_INTERVAL = 0.18;

// ─── Word-by-word line renderer ────────────────────────────────────────────────

function LineWords({
  line,
  lineIndex,
  visibleWords,
  showCursor,
  isLastActiveLine,
  started,
}: {
  line: LetterLine;
  lineIndex: number;
  visibleWords: VisibleWord[];
  showCursor: boolean;
  isLastActiveLine: boolean;
  started: boolean;
}) {
  if (!started) return null;
  if (line.style === "spacer") return <div style={{ height: 12 }} />;

  const words = line.text.split(" ");
  const visibleCount = visibleWords.filter(
    (w) => w.lineIndex === lineIndex
  ).length;
  const isSpecial = line.style === "special";
  const isHighlight = line.style === "highlight";
  const isHeading = line.style === "heading";
  const isSignature = line.style === "signature";

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: "0.25em",
    marginBottom: isHeading ? 8 : isHighlight ? 4 : isSpecial ? 4 : 2,
    ...(isSpecial && {
      borderLeft: `2px solid rgba(107,164,216,0.5)`,
      paddingLeft: 12,
      position: "relative",
    }),
  };

  const wordStyle: React.CSSProperties = isHeading
    ? { fontFamily: "'Dancing Script', cursive", fontSize: 30, color: BUDDY_DARK, fontWeight: 700 }
    : isHighlight
    ? {
        fontFamily: "'Dancing Script', cursive",
        fontSize: 24,
        color: BUDDY_YELLOW,
        fontWeight: 700,
        backgroundColor: "rgba(255,209,102,0.2)",
        padding: "2px 6px",
        borderRadius: 6,
      }
    : isSpecial
    ? { fontFamily: "'Nunito', sans-serif", fontSize: 16, color: BUDDY_DARK, fontWeight: 600 }
    : isSignature
    ? { fontFamily: "'Dancing Script', cursive", fontSize: 24, color: BUDDY_BLUE, fontWeight: 700 }
    : { fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(45,45,45,0.8)", lineHeight: 1.7 };

  // Special line: sweep highlight background when first word appears
  const showSweep = isSpecial && visibleCount > 0;

  return (
    <div style={{ position: "relative" }}>
      {showSweep && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(255,209,102,0.08)`,
            transformOrigin: "left center",
            borderRadius: 4,
            zIndex: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
      <div style={{ ...containerStyle, position: "relative", zIndex: 1 }}>
        {words.map((word, wi) => {
          const visible = wi < visibleCount;
          const isLastWord = wi === words.length - 1;
          const showCursorHere = isLastActiveLine && isLastWord && visible && showCursor;
          return (
            <AnimatePresence key={wi}>
              {visible && (
                <motion.span
                  style={{ ...wordStyle, display: "inline-flex", alignItems: "baseline" }}
                  initial={{ opacity: 0, y: 4, filter: "saturate(0)" }}
                  animate={{ opacity: 1, y: 0, filter: "saturate(1)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {word}
                  {showCursorHere && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: "0.85em",
                        backgroundColor: BUDDY_YELLOW,
                        marginLeft: 3,
                        verticalAlign: "text-bottom",
                        animation: "twCursorBlink 0.4s step-end infinite",
                      }}
                    />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}

// ─── Floating particles ────────────────────────────────────────────────────────

function FloatingParticles() {
  return (
    <>
      {[15, 30, 50, 70, 85].map((left, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            bottom: 0,
            left: `${left}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "rgba(255,209,102,0.3)",
            pointerEvents: "none",
          }}
          animate={{ y: [0, -300], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 4 + i * 0.4,
            delay: i * 1.1,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// ─── Envelope component ────────────────────────────────────────────────────────

type EnvelopeState = "closed" | "opening" | "open";

function Envelope({ onOpen }: { onOpen: () => void }) {
  const [state, setState] = useState<EnvelopeState>("closed");

  useEffect(() => {
    if (state === "open") onOpen();
  }, [state, onOpen]);

  const handleTap = () => {
    if (state !== "closed") return;
    setState("opening");
    setTimeout(() => setState("open"), 1100);
  };

  if (state === "open") return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "0 24px",
      }}
    >
      <motion.div
        style={{ cursor: "pointer" }}
        onClick={handleTap}
        whileTap={{ scale: 0.97 }}
      >
        {/* Envelope body */}
        <div
          style={{
            width: 280,
            height: 180,
            backgroundColor: "#FFF8F0",
            border: "2px solid rgba(255,209,102,0.4)",
            borderRadius: 16,
            position: "relative",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          {/* Flap */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 0,
              borderLeft: "140px solid transparent",
              borderRight: "140px solid transparent",
              borderTop: "90px solid rgba(255,209,102,0.3)",
              transformOrigin: "top center",
              zIndex: 2,
            }}
            animate={state === "opening" ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Letter rising out */}
          <AnimatePresence>
            {state === "opening" && (
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 20,
                  right: 20,
                  height: 100,
                  backgroundColor: "white",
                  borderRadius: 4,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 19px, rgba(139,111,71,0.1) 19px, rgba(139,111,71,0.1) 20px)",
                  zIndex: 1,
                }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: -40, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Wax seal */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              backgroundColor: BUDDY_YELLOW,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              zIndex: 3,
            }}
          >
            💛
          </div>
        </div>
      </motion.div>

      {/* Prompt */}
      <motion.p
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 14,
          color: BUDDY_BROWN,
          marginTop: 24,
          textAlign: "center",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Tap to open 💌
      </motion.p>
    </div>
  );
}

// ─── TypewriterSection ────────────────────────────────────────────────────────

export default function TypewriterSection() {
  const sectionRef = useSectionAudio("section6.mp3");
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [visibleWords, setVisibleWords] = useState<VisibleWord[]>([]);
  const [done, setDone] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Build word schedule once envelope opens
  useEffect(() => {
    if (!envelopeOpen) return;

    letterLines.forEach((line, lineIndex) => {
      if (line.style === "spacer" || line.text === "") return;
      const words = line.text.split(" ");
      words.forEach((_, wordIndex) => {
        const t = setTimeout(() => {
          setVisibleWords((prev) => [...prev, { lineIndex, wordIndex }]);
        }, (line.delay + wordIndex * WORD_INTERVAL) * 1000);
        timersRef.current.push(t);
      });
    });

    const doneTimer = setTimeout(() => setDone(true), LETTER_DONE_MS);
    timersRef.current.push(doneTimer);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [envelopeOpen]);

  // Which line is currently the "active" last line (for cursor)
  const lastActiveLineIndex = visibleWords.length > 0
    ? visibleWords[visibleWords.length - 1].lineIndex
    : -1;

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#FFF8F0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes twCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Floating particles (only while typing) */}
      {envelopeOpen && !done && <FloatingParticles />}

      {/* Envelope stage */}
      <AnimatePresence>
        {!envelopeOpen && (
          <motion.div
            style={{ width: "100%", position: "absolute", inset: 0, zIndex: 10 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
          >
            <Envelope onOpen={() => setEnvelopeOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter stage */}
      <AnimatePresence>
        {envelopeOpen && (
          <motion.div
            style={{ width: "100%", maxWidth: 390, margin: "0 auto" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Paper with ruled lines + left margin */}
            <motion.div
              style={{
                margin: "0 auto",
                maxWidth: 390,
                padding: "64px 32px 96px 40px",
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 31px, rgba(139,111,71,0.1) 31px, rgba(139,111,71,0.1) 32px)",
                borderLeft: `2px solid rgba(255,209,102,0.3)`,
                position: "relative",
              }}
              animate={{ scale: [1, 1.002, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* 💌 top decoration */}
              <motion.p
                style={{ fontSize: 28, textAlign: "center", marginBottom: 32 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                💌
              </motion.p>

              {/* Lines */}
              {letterLines.map((line, lineIndex) => (
                <LineWords
                  key={lineIndex}
                  line={line}
                  lineIndex={lineIndex}
                  visibleWords={visibleWords}
                  showCursor={!done}
                  isLastActiveLine={lineIndex === lastActiveLineIndex}
                  started={envelopeOpen}
                />
              ))}

              {/* Signature draw-in */}
              <AnimatePresence>
                {done && (
                  <>
                    <motion.p
                      style={{ fontSize: 24, textAlign: "center", marginTop: 32 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 14 }}
                    >
                      <motion.span
                        style={{ display: "inline-block" }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        💛💙
                      </motion.span>
                    </motion.p>

                    <motion.p
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: 12,
                        color: "rgba(139,111,71,0.6)",
                        textAlign: "center",
                        marginTop: 12,
                        fontStyle: "italic",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Written with love. Meant forever. 💛
                    </motion.p>

                    {/* Paper fold shadow at bottom */}
                    <motion.div
                      style={{
                        height: 12,
                        marginTop: 24,
                        background:
                          "linear-gradient(to bottom, transparent, rgba(139,111,71,0.08))",
                        borderRadius: "0 0 4px 4px",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

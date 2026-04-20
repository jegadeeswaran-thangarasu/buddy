"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionAudio } from "@/hooks/useSectionAudio";

const BUDDY_DARK = "#2D2D2D";
const BUDDY_YELLOW = "#FFD166";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  correctReaction: string;
  wrongReaction: string;
  revealText: string;
  animation: "confetti" | "bus" | "rings" | "hearts" | "stars";
}

const questions: Question[] = [
  {
    id: 1,
    question: "என்னன்னா, what do we call each other?",
    options: ["Kanna & Kutti", "Buddy & Dai", "Eruma Maadu & Paithiam"],
    correct: 1,
    correctReaction: "Aama aama! Correct! Nee thaan en Buddy. Always. 💛",
    wrongReaction: "Aiyo loosu! Wrong answer! Seekiram try pannunga 😄",
    revealText: "10 years and it's still Buddy & Dai. Always. 💛",
    animation: "confetti",
  },
  {
    id: 2,
    question: "Where did Dai propose to Buddy? 🚌",
    options: ["Temple", "On a bus", "College canteen"],
    correct: 1,
    correctReaction:
      "Wah! Bus-la propose pannen nu marakala? Nee loosu illa! 🚌💛",
    wrongReaction: "Enna paithiam! Wrong da Buddy! Try again 😂",
    revealText: "November 7, 2016. A bus ride she'll never forget. 💛",
    animation: "bus",
  },
  {
    id: 3,
    question: "When did we get engaged? 💍",
    options: ["February 14, 2024", "April 22, 2024", "March 7, 2024"],
    correct: 2,
    correctReaction: "Aama! March 7 — en life-la special day! Nee thaan best! 💍",
    wrongReaction: "Aiyo Buddy! Namma engagement date maranthutte? 😅",
    revealText: "March 7, 2024. The day it became official. 💍",
    animation: "rings",
  },
  {
    id: 4,
    question: "When did we get married? 💒",
    options: ["March 7, 2024", "May 1, 2024", "April 22, 2024"],
    correct: 2,
    correctReaction: "Yes! April 22 — en life-la best day! Naan romba lucky! 💒💛",
    wrongReaction: "Enna loosu! Namma wedding date theriyala? 😂",
    revealText: "April 22, 2024. The best day of our lives. 💛💙",
    animation: "hearts",
  },
  {
    id: 5,
    question: "Where did we go for our photoshoot? 📸",
    options: ["Ooty", "Pondicherry", "Kochi, Kerala"],
    correct: 2,
    correctReaction: "Kerala! Backwaters! Nee maaka maatiya? Correct da! 🌴",
    wrongReaction: "Aiyo paithiam! Kerala maranthutte? 😄",
    revealText: "Kochi, Kerala. Just us, the backwaters, and a camera. 🌴",
    animation: "confetti",
  },
  {
    id: 6,
    question: "Our two favourite places to visit together? 🙏",
    options: ["Beach & Cinema", "Temple & Prozone Mall", "Park & Restaurant"],
    correct: 1,
    correctReaction: "Aama aama! Temple + Prozone — namma perfect combo! 😄💛",
    wrongReaction: "Loosu! Temple + Prozone maranthutte? Seriously Buddy! 😂",
    revealText: "God's blessings + good food. Our kind of date. 💛",
    animation: "stars",
  },
];

const animationEmoji: Record<Question["animation"], string> = {
  confetti: "🎉",
  bus: "🚌",
  rings: "💍",
  hearts: "💛",
  stars: "✨",
};

function ConfettiPiece({ index }: { index: number }) {
  const colors = [BUDDY_YELLOW, "#FF6B6B", "#6BA4D8", "#A8E6CF", "#FFB347"];
  const color = colors[index % colors.length];
  const x = (Math.random() - 0.5) * 200;
  const rotate = Math.random() * 720 - 360;
  return (
    <motion.div
      style={{
        position: "absolute",
        width: 8,
        height: 8,
        borderRadius: index % 2 === 0 ? "50%" : 2,
        backgroundColor: color,
        top: "50%",
        left: "50%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      animate={{ x, y: -120 - Math.random() * 80, opacity: 0, scale: 0, rotate }}
      transition={{ duration: 0.9 + Math.random() * 0.4, ease: "easeOut" }}
    />
  );
}

function AnimationOverlay({ type }: { type: Question["animation"] }) {
  if (type === "confetti") {
    return (
      <div style={{ position: "relative", height: 0 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}
      </div>
    );
  }
  if (type === "hearts") {
    return (
      <div style={{ position: "relative", height: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              fontSize: 16,
              top: "50%",
              left: `${20 + i * 15}%`,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -100, opacity: 0 }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
          >
            💛
          </motion.div>
        ))}
      </div>
    );
  }
  if (type === "stars") {
    return (
      <div style={{ position: "relative", height: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const dist = 60 + Math.random() * 40;
          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                fontSize: 14,
                top: "50%",
                left: "50%",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: 0,
                scale: 1,
              }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
            >
              ✨
            </motion.div>
          );
        })}
      </div>
    );
  }
  return null;
}

type AnswerState =
  | { type: "idle" }
  | { type: "correct" }
  | { type: "wrong"; selected: number; showCorrect: boolean };

interface Props { onSectionComplete?: () => void }

export default function QuizSection({ onSectionComplete }: Props) {
  const sectionRef = useSectionAudio("section4.mp3");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>({ type: "idle" });
  const [quizComplete, setQuizComplete] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);

  useEffect(() => {
    if (quizComplete) onSectionComplete?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizComplete]);

  const q = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (answerState.type === "correct") {
      const t = setTimeout(() => setShowNextBtn(true), 1500);
      return () => clearTimeout(t);
    }
    if (answerState.type === "wrong") {
      const t1 = setTimeout(() => {
        setAnswerState({ type: "wrong", selected: (answerState as { type: "wrong"; selected: number; showCorrect: boolean }).selected, showCorrect: true });
      }, 1500);
      const t2 = setTimeout(() => {
        advance();
      }, 2500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerState]);

  function advance() {
    setShowNextBtn(false);
    if (currentIndex + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswerState({ type: "idle" });
    }
  }

  function handleAnswer(idx: number) {
    if (answerState.type !== "idle") return;
    if (idx === q.correct) {
      setScore((s) => s + 1);
      setAnswerState({ type: "correct" });
    } else {
      setAnswerState({ type: "wrong", selected: idx, showCorrect: false });
    }
  }

  function getButtonStyle(idx: number): React.CSSProperties {
    const base: React.CSSProperties = {
      width: "100%",
      textAlign: "left",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 16,
      padding: "16px 20px",
      color: "#fff",
      fontFamily: "'Nunito', sans-serif",
      fontSize: 14,
      marginBottom: 12,
      cursor: answerState.type === "idle" ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "background 0.2s",
    };
    if (answerState.type === "correct" && idx === q.correct) {
      return { ...base, background: BUDDY_YELLOW, color: BUDDY_DARK };
    }
    if (answerState.type === "wrong") {
      if (idx === (answerState as { type: "wrong"; selected: number; showCorrect: boolean }).selected) {
        return { ...base, background: "rgba(255,107,107,0.3)" };
      }
      if (
        (answerState as { type: "wrong"; selected: number; showCorrect: boolean }).showCorrect &&
        idx === q.correct
      ) {
        return { ...base, background: BUDDY_YELLOW, color: BUDDY_DARK };
      }
    }
    return base;
  }

  if (quizComplete) {
    return (
      <section
        ref={sectionRef}
        style={{
          backgroundColor: BUDDY_DARK,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 16px",
        }}
      >
        {score === 6 && (
          <div style={{ position: "relative", height: 0 }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <ConfettiPiece key={i} index={i} />
            ))}
          </div>
        )}
        <motion.div
          style={{ textAlign: "center" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.p
            style={{ fontSize: 64, textAlign: "center" }}
            animate={
              score === 6
                ? { y: [0, -20, 0], transition: { duration: 0.6, repeat: Infinity } }
                : {}
            }
          >
            {score === 6 ? "🏆" : score >= 4 ? "🌟" : "😂"}
          </motion.p>

          {score === 6 && (
            <>
              <p
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 36,
                  color: BUDDY_YELLOW,
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                6 / 6 — Vera level Buddy!
              </p>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Nee thaan en Buddy! Perfect score! 💛
              </p>
            </>
          )}

          {score >= 4 && score < 6 && (
            <>
              <p
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 36,
                  color: BUDDY_YELLOW,
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                {score} / 6 — Not bad, loosu! 😄
              </p>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Almost perfect. Nee thaan best. 💛
              </p>
            </>
          )}

          {score < 4 && (
            <>
              <p
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 36,
                  color: BUDDY_YELLOW,
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                {score} / 6 — Aiyo paithiam!
              </p>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Seri seri. Namma story innum padikanum! 😄💛
              </p>
            </>
          )}

        </motion.div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: BUDDY_DARK,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 0",
      }}
    >
      {/* Header */}
      <p
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 12,
          color: "rgba(255,209,102,0.6)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Let&apos;s Play 🎮
      </p>
      <p
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 36,
          color: BUDDY_YELLOW,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        How well do you know us?
      </p>
      <p
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 14,
          color: "rgba(255,255,255,0.6)",
          textAlign: "center",
          marginTop: 4,
        }}
      >
        6 questions. No cheating, Buddy. 😄
      </p>

      {/* Quiz card */}
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          marginTop: 32,
          padding: "0 16px",
        }}
      >
        {/* Progress */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div
          style={{
            height: 3,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 9999,
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              backgroundColor: BUDDY_YELLOW,
              borderRadius: 9999,
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <motion.div
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            padding: 24,
          }}
          animate={
            answerState.type === "wrong"
              ? { x: [0, -6, 6, -4, 4, 0] }
              : { x: 0 }
          }
          transition={
            answerState.type === "wrong"
              ? { duration: 0.4, ease: "easeInOut" }
              : {}
          }
        >
          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`q-${q.id}`}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: "#fff",
                textAlign: "center",
                marginBottom: 24,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {q.question}
            </motion.p>
          </AnimatePresence>

          {/* Options */}
          {q.options.map((opt, idx) => (
            <motion.button
              key={idx}
              style={getButtonStyle(idx)}
              whileHover={
                answerState.type === "idle"
                  ? { background: "rgba(255,255,255,0.15)", scale: 1.01 }
                  : {}
              }
              whileTap={answerState.type === "idle" ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(idx)}
            >
              <span>{opt}</span>
              <AnimatePresence>
                {answerState.type === "correct" && idx === q.correct && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    ✓
                  </motion.span>
                )}
                {answerState.type === "wrong" &&
                  idx === (answerState as { type: "wrong"; selected: number; showCorrect: boolean }).selected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ x: [0, -8, 8, -4, 4, 0], scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      ✗
                    </motion.span>
                  )}
                {answerState.type === "wrong" &&
                  (answerState as { type: "wrong"; selected: number; showCorrect: boolean }).showCorrect &&
                  idx === q.correct && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      ✓
                    </motion.span>
                  )}
              </AnimatePresence>
            </motion.button>
          ))}

          {/* Correct reaction */}
          <AnimatePresence>
            {answerState.type === "correct" && (
              <motion.div
                style={{
                  backgroundColor: BUDDY_YELLOW,
                  borderRadius: 24,
                  padding: 20,
                  marginTop: 8,
                  position: "relative",
                  overflow: "visible",
                }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <AnimationOverlay type={q.animation} />
                <motion.p
                  style={{ fontSize: 36, textAlign: "center" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 10, delay: 0.1 }}
                >
                  {animationEmoji[q.animation]}
                </motion.p>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: BUDDY_DARK,
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  {q.correctReaction}
                </p>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 12,
                    color: "rgba(45,45,45,0.7)",
                    textAlign: "center",
                    marginTop: 4,
                    fontStyle: "italic",
                  }}
                >
                  {q.revealText}
                </p>

                <AnimatePresence>
                  {showNextBtn && (
                    <motion.div
                      style={{ textAlign: "center", marginTop: 16 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        style={{
                          background: BUDDY_DARK,
                          color: BUDDY_YELLOW,
                          border: "none",
                          borderRadius: 9999,
                          padding: "8px 24px",
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: 14,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={advance}
                      >
                        {currentIndex + 1 === questions.length
                          ? "See the result! 🎉"
                          : "Next →"}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wrong reaction */}
          <AnimatePresence>
            {answerState.type === "wrong" && (
              <motion.div
                style={{
                  backgroundColor: BUDDY_DARK,
                  border: "1px solid rgba(255,107,107,0.4)",
                  borderRadius: 16,
                  padding: 16,
                  marginTop: 8,
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 14,
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  {q.wrongReaction}
                </p>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  Correct answer coming up... 😄
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

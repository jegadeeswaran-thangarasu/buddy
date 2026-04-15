"use client";

import { motion } from "framer-motion";

const RECORDS = [
  "Applied Physics Lab ✓",
  "Digital Electronics Record ✓",
  "Microprocessor Assignment ✓",
  "Engineering Maths Notes ✓",
  "Project Report ✓",
];

export default function RecordsSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#F5ECD7" }}
    >
      {/* Header */}
      <motion.h2
        className="text-handwritten text-2xl text-center mb-10"
        style={{ color: "#2D2D2D" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Final Year 📚
      </motion.h2>

      {/* Notebook */}
      <motion.div
        className="w-11/12 rounded-lg shadow-md"
        style={{
          maxWidth: "360px",
          backgroundColor: "white",
          borderLeft: "3px solid #FFD166",
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, #e8e0d0 27px, #e8e0d0 28px)",
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "40px",
          paddingRight: "24px",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {RECORDS.map((line, index) => (
          <motion.p
            key={index}
            className="text-handwritten text-base"
            style={{
              color: "#2D2D2D",
              lineHeight: "28px",
              marginBottom: "0",
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.4, ease: "easeOut" }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

      {/* Stat badges */}
      <motion.div
        className="flex gap-4 mt-8 w-11/12"
        style={{ maxWidth: "360px" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div
          className="flex-1 rounded-xl p-4 text-center"
          style={{ backgroundColor: "#FFD166" }}
        >
          <p
            className="text-sm font-bold"
            style={{ color: "#2D2D2D", fontFamily: "'Nunito', sans-serif" }}
          >
            First Class 🎓
          </p>
        </div>
        <div
          className="flex-1 rounded-xl p-4 text-center"
          style={{ backgroundColor: "#6BA4D8" }}
        >
          <p
            className="text-sm font-bold"
            style={{ color: "white", fontFamily: "'Nunito', sans-serif" }}
          >
            Placed 🏢
          </p>
        </div>
      </motion.div>

      {/* Caption */}
      <motion.p
        className="text-sm text-center mt-4 leading-relaxed italic max-w-xs"
        style={{ color: "#8B6F47", fontFamily: "'Nunito', sans-serif" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        &ldquo;She filled every page.&rdquo;
        <br />
        He got the degree. She deserved it too. 💛
      </motion.p>

      {/* Section transition → HardTimes dark */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1C1C2E)" }}
      />
    </section>
  );
}

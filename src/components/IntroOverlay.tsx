"use client";

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import styles from "@/styles/IntroOverlay.module.css";

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [phase, setPhase] = useState<"intro" | "countdown" | "confetti" | "exit">("intro");
  const [countdown, setCountdown] = useState(3);

  const fireConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ["#e8c4d8", "#d4c4e8", "#b8a9c9", "#9ca889", "#f0dce8"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  useEffect(() => {
    if (phase === "intro") {
      const t = setTimeout(() => setPhase("countdown"), 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "countdown") {
      if (countdown > 0) {
        const t = setTimeout(() => setCountdown((c) => c - 1), 800);
        return () => clearTimeout(t);
      } else {
        setPhase("confetti");
      }
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === "confetti") {
      fireConfetti();
      const t = setTimeout(() => {
        setPhase("exit");
        setTimeout(onComplete, 600);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [phase, fireConfetti, onComplete]);

  if (phase === "exit") {
    return (
      <div className={`${styles.overlay} ${styles.fadeOut}`} aria-hidden>
        <div className={styles.content} />
      </div>
    );
  }

  const countdownWords: Record<number, string> = { 3: "three...", 2: "two...", 1: "one..." };
  const currentWord = countdownWords[countdown] ?? "one...";

  return (
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        onClick={() => {
          setPhase("exit");
          setTimeout(onComplete, 100);
        }}
        className={styles.skipButton}
        aria-label="Skip intro"
      >
        Skip
      </button>
      <div className={styles.content}>
        {phase === "intro" && (
          <p className={styles.introText}>
            and let the 20th birthday celebrations begin...
          </p>
        )}
        {phase === "countdown" && (
          <div className={styles.countdown}>
            <span className={styles.countdownIn}>in</span>
            <span className={styles.countdownNumber}>{currentWord}</span>
          </div>
        )}
      </div>
    </div>
  );
}

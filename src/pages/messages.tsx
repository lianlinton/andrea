"use client";

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import FlowerBrix from "@/components/FlowerBrix";
import styles from "@/styles/Messages.module.css";
import homeStyles from "@/styles/Home.module.css";

type Message = { text: string; author: string };

const FALLBACK_MESSAGES: Message[] = [
  { text: "Ur goated fam", author: "Samuel Puthiakunnel" },
  { text: "Happy Birthday Andrea! Hope you have an amazing day today with loved ones and friends!", author: "Anand George" },
  { text: "Happy birthday Andrea", author: "Ryan" },
  { text: "HAPPY BIRTHDAY ANDREA REJI AR ASAP ROCKY!! you're the most mysterious person i know.", author: "Maria George" },
  { text: "Happy 20th birthday! Wishing you all the best!", author: "Aaron" },
  { text: "Happy Birthday!! Congrats on turning 20! Make your 20s the best!", author: "Ankita" },
  { text: "Happy birthday", author: "Jerom" },
  { text: "Happy birthday Andrea! You are one of the kindest people I know!", author: "Mathew Chandy" },
  { text: "I love you my princess! You have pulled me out of so many dark times.", author: "Ashley Joshi" },
  { text: "happiest birthday andrea! here's to 20!", author: "Jovita" },
  { text: "Hii Andrea, happy birthday! You are such a joy to be around.", author: "Meryl" },
  { text: "ammuu kuttaaaa, I wish you the bestest birthday ever!!!", author: 'Neha <3 ("chechi" from Zion)' },
];

const MESSAGES_PASSWORD = "andrea";
const MESSAGES_UNLOCK_KEY = "andrea-messages-unlocked";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(FALLBACK_MESSAGES);
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch("/api/sheet")
      .then((r) => r.json())
      .then((data) => {
        if (data.messages?.length) setMessages(data.messages);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUnlocked(sessionStorage.getItem(MESSAGES_UNLOCK_KEY) === "1");
    }
  }, []);

  const unlock = () => {
    if (passwordInput.trim() === MESSAGES_PASSWORD) {
      setUnlocked(true);
      setPasswordError("");
      setPasswordInput("");
      if (typeof window !== "undefined") sessionStorage.setItem(MESSAGES_UNLOCK_KEY, "1");
    } else {
      setPasswordError("Wrong password. Try again!");
    }
  };

  return (
    <>
      <Head>
        <title>Messages for Andrea – Andrea&apos;s 20th Birthday</title>
        <meta name="description" content="Birthday messages for Andrea, from everyone who loves her." />
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={20} />
            Back
          </Link>

          <header className={styles.header}>
            <div className={styles.headerFlowers}>
              <FlowerBrix size={40} variant="pink" />
              <FlowerBrix size={48} variant="purple" />
              <FlowerBrix size={36} variant="lavender" />
            </div>
            <h1 className={styles.title}>Messages for Andrea</h1>
            <p className={styles.subtitle}>From all of us who love you</p>
          </header>

          {!unlocked ? (
            <section aria-label="Unlock messages">
              <div className={homeStyles.messagesLockWrap}>
                <p className={homeStyles.messagesLockText}>Password to view messages</p>
                <div className={homeStyles.messagesLockForm}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={homeStyles.messagesLockInput}
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && unlock()}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={homeStyles.messagesLockShowBtn}
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide" : "Show"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  <button type="button" className={homeStyles.messagesLockBtn} onClick={unlock}>
                    Unlock
                  </button>
                </div>
                {passwordError && (
                  <p className={homeStyles.messagesLockError} role="alert">
                    {passwordError}
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section className={styles.section} aria-label="Birthday messages">
              <h2 className={styles.sectionTitle}>
                <MessageCircle className={styles.sectionTitleIcon} size={28} />
                Birthday messages
              </h2>

              <div className={styles.notesGrid}>
                {messages.map((msg, i) => (
                  <article key={i} className={styles.foldedNote}>
                    <div className={styles.foldedNoteContent}>
                      <p>&ldquo;{msg.text}&rdquo;</p>
                      <span className={styles.foldedNoteAuthor}>— {msg.author}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}


import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Heart } from "lucide-react";
import FlowerBrix from "@/components/FlowerBrix";
import styles from "@/styles/Messages.module.css";

/* Add submissions from your Google Form here */
const FAVORITE_MEMORIES = [
  { memory: "That time we stayed up until 3am talking about everything and nothing. I'll never forget how hard we laughed.", author: "A friend" },
  { memory: "The road trip when you made us pull over three times for snacks. Best day ever.", author: "Road trip crew" },
];

const BIRTHDAY_MESSAGES = [
  { text: "Happy 20th, Andrea! We're so grateful for you and everything you bring to our lives. Here's to many more memories together.", author: "All of us" },
  { text: "You light up every room you walk into. We hope your day is as amazing as you are!", author: "With love" },
  { text: "Twenty years of you and we couldn't be happier. We love you so much.", author: "xoxo" },
];

export default function MessagesPage() {
  return (
    <>
      <Head>
        <title>Messages for Andrea – Andrea&apos;s 20th Birthday</title>
        <meta name="description" content="Favorite memories and birthday messages for Andrea" />
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
            <h1 className={styles.title}>Messages for you</h1>
            <p className={styles.subtitle}>From all of us who love you</p>
          </header>

          {/* Favorite memory with Andrea */}
          <section className={styles.section} aria-label="Favorite memory with Andrea">
            <h2 className={styles.sectionTitle}>
              <Heart className={styles.sectionTitleIcon} size={28} />
              Favorite memory with Andrea
            </h2>
            <div className={styles.notesScatter}>
              {FAVORITE_MEMORIES.map((item, i) => (
                <article key={i} className={styles.foldedNote}>
                  <div className={styles.foldedNoteContent}>
                    <p>&ldquo;{item.memory}&rdquo;</p>
                    <span className={styles.foldedNoteAuthor}>— {item.author}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.floralBorder} aria-hidden />

          {/* Birthday messages to Andrea */}
          <section className={styles.section} aria-label="Birthday messages to Andrea">
            <h2 className={styles.sectionTitle}>
              <MessageCircle className={styles.sectionTitleIcon} size={28} />
              Birthday messages to Andrea
            </h2>
            <div className={styles.notesScatter}>
              {BIRTHDAY_MESSAGES.map((msg, i) => (
                <article key={i} className={styles.foldedNote}>
                  <div className={styles.foldedNoteContent}>
                    <p>&ldquo;{msg.text}&rdquo;</p>
                    <span className={styles.foldedNoteAuthor}>— {msg.author}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

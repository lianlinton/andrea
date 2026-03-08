"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Camera, MessageCircle, Video } from "lucide-react";
import IntroOverlay from "@/components/IntroOverlay";
import { ANDREA_HERO, GRID_PHOTOS, CAROUSEL_PHOTOS, POLAROID_PHOTOS, GALLERY_VIDEOS, type PhotoItem } from "@/data/media";
import styles from "@/styles/Home.module.css";
import galleryStyles from "@/styles/Gallery.module.css";

const CLOTHESPIN_COLORS = ["#ff85a2", "#7dd3a8", "#7db8ff", "#ffb366", "#ffe066"];

function ClothespinIcon({ color }: { color?: string }) {
  const fill = color ?? "var(--wood-mid)";
  const stroke = color ? "transparent" : "var(--wood-dark)";
  return (
    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2C4 1 5 0 6 0C7 0 8 1 8 2V14C8 15 7 16 6 16C5 16 4 15 4 14V2Z" fill={fill} stroke={stroke} strokeWidth="0.5" />
      <path d="M16 2C16 1 15 0 14 0C13 0 12 1 12 2V14C12 15 13 16 14 16C15 16 16 15 16 14V2Z" fill={fill} stroke={stroke} strokeWidth="0.5" />
      <ellipse cx="10" cy="1.5" rx="2.5" ry="1.2" fill={fill} opacity={color ? 1 : 0.9} />
    </svg>
  );
}

/* Fallback when sheet is unavailable */
const FALLBACK_MESSAGES = [
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

const FALLBACK_INS: Record<string, number> = {
  "Incredibly consistent BeReal streak": 4,
  "Her 'mysteriousness'": 2,
  "Musical talents": 1,
  "Always smiling": 1,
  "#lockedin sleep schedule": 1,
  "Your smile!": 1,
  "Her smile": 1,
  "Her amazing personality": 1,
};

const FALLBACK_OUTS: Record<string, number> = {
  "Bumping into poles": 3,
  "That kale salad combo": 3,
  "Making fun of me when I'm literally just existing": 1,
  "The stickers / salad (worst offense)": 1,
  "Getting sickly every 3-5 business days": 1,
  "Criminal offensive side eye": 1,
  "Skipping parts of movies/shows": 1,
};

const MCQ_COLORS = ["#e8c4d8", "#d4c4e8", "#b8a9c9", "#9ca889", "#c4b5d4", "#a89bb8"];

const ANDREA_QUOTES = [
  "We're not lost, we're on an adventure.",
  "Life is what happens when you're busy making other plans.",
  "I need snacks. Stat.",
  "Wait, we're skipping that part?",
  "That's so ageist of you.",
  "My salad, my rules.",
  "One more episode. I promise.",
  "This pole came out of nowhere.",
];

const FALLBACK_PHOTOS = GRID_PHOTOS.slice(0, 8).map((p) => p.src ?? "").filter(Boolean) as string[];

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const [hoveredKeep, setHoveredKeep] = useState<string | null>(null);
  const [hoveredLeave, setHoveredLeave] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [messages, setMessages] = useState<{ text: string; author: string }[]>(FALLBACK_MESSAGES);
  const [insAnswers, setInsAnswers] = useState<Record<string, number>>(FALLBACK_INS);
  const [outsAnswers, setOutsAnswers] = useState<Record<string, number>>(FALLBACK_OUTS);
  const [quotes, setQuotes] = useState<string[]>(ANDREA_QUOTES);
  const [photos, setPhotos] = useState<string[]>(FALLBACK_PHOTOS);
  const [featuredQuoteIndex, setFeaturedQuoteIndex] = useState(0);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [heroImagePortrait, setHeroImagePortrait] = useState<boolean | null>(null);
  /* Hero photos from dedicated folder - use all */
  const heroImagePaths = useMemo(() => {
    const arr = CAROUSEL_PHOTOS.filter(Boolean);
    return arr.length > 0 ? arr : [ANDREA_HERO];
  }, []);
  const featuredImage = heroImagePaths[featuredImageIndex % heroImagePaths.length];
  const polaroidRotations = [-1.5, 1, -0.5, 2, -1, 0.5];

  /* Detect if featured image is portrait → 3 panels; landscape → single full-bleed */
  useEffect(() => {
    if (!featuredImage) return;
    setHeroImagePortrait(null);
    const img = new Image();
    img.onload = () => {
      setHeroImagePortrait(img.naturalHeight > img.naturalWidth);
    };
    img.onerror = () => setHeroImagePortrait(false);
    img.src = featuredImage;
    return () => { img.src = ""; };
  }, [featuredImage]);

  /* Cycle through hero images */
  useEffect(() => {
    if (heroImagePaths.length <= 1) return;
    const id = setInterval(() => {
      setFeaturedImageIndex((i) => (i + 1) % heroImagePaths.length);
    }, 4000);
    return () => clearInterval(id);
  }, [heroImagePaths.length]);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const t = setInterval(() => {
      setFeaturedQuoteIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(t);
  }, [quotes.length]);

  const fetchSheet = () => {
    fetch("/api/sheet")
      .then((r) => r.json())
      .then((data) => {
        if (data.messages?.length) setMessages(data.messages);
        if (data.ins && Object.keys(data.ins).length) setInsAnswers(data.ins);
        if (data.outs && Object.keys(data.outs).length) setOutsAnswers(data.outs);
        if (data.quotes?.length) setQuotes(data.quotes);
        if (data.photos?.length) setPhotos(data.photos);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchSheet();
    const interval = setInterval(fetchSheet, 30000);
    return () => clearInterval(interval);
  }, []);

  const heroWindowImages = useMemo(() => {
    const n = heroImagePaths.length;
    return [0, 1, 2].map((o) => heroImagePaths[(featuredImageIndex + o) % n]);
  }, [heroImagePaths, featuredImageIndex]);

  return (
    <>
      <Head>
        <title>Andrea&apos;s 20th Birthday</title>
        <meta
          name="description"
          content="Celebrating Andrea's 20th birthday"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {!showMain && <IntroOverlay onComplete={() => setShowMain(true)} />}

      <div className={`${styles.page} ${showMain ? styles.visible : ""}`}>
        <main className={styles.feed}>
          {/* Gallery hero: full-bleed image with overlay text */}
          <div className={galleryStyles.heroFullBleed}>
            <section className={galleryStyles.heroSection} aria-label="Photo carousel">
              <div className={galleryStyles.carousel}>
                {heroImagePortrait ? (
                  <div className={galleryStyles.carouselWindow}>
                    {heroWindowImages.map((src, i) => (
                      <div key={`${i}-${src ?? ""}`} className={galleryStyles.carouselWindowPanel}>
                        {src ? (
                          <img src={src} alt="" />
                        ) : (
                          <div className={galleryStyles.heroPlaceholder} />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`${galleryStyles.carouselSlide} ${galleryStyles.carouselActive}`}>
                    {featuredImage ? (
                      <img src={featuredImage} alt="" />
                    ) : (
                      <div className={galleryStyles.heroPlaceholder} />
                    )}
                  </div>
                )}
                <div className={galleryStyles.carouselOverlay}>
                  <div className={galleryStyles.heroTextBlock}>
                    <h1 className={galleryStyles.heroTitle}>Happy 20th Birthday Andrea!</h1>
                    <p className={galleryStyles.heroSubtitle}>we love you so much </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className={galleryStyles.sectionDivider} aria-hidden />

          <section className={styles.andreaSaidSection} aria-label="Things Andrea said">
            <h2 className={styles.andreaSaidTitle}>things andrea said</h2>
            <p className={styles.andreaSaidSubtitle}>
              A collection of wisdom, chaos &amp; one-liners from the legend herself
            </p>

            {quotes.length > 0 && (
              <div className={galleryStyles.galleryFullBleed}>
              <>
                <div className={styles.quoteHero}>
                  <div className={styles.quoteHeroCard}>
                    <span className={styles.quoteHeroLabel}>Quote of the moment</span>
                    <p key={featuredQuoteIndex} className={`${styles.quoteHeroText} ${styles.quoteHeroTextAnimated}`}>
                      &ldquo;{quotes[featuredQuoteIndex]}&rdquo;
                    </p>
                  </div>
                </div>

                <div className={styles.quotesBento}>
                  {quotes
                    .filter((_, i) => i !== featuredQuoteIndex)
                    .map((quote, i) => {
                      const variants = [
                        styles.quoteSticky,
                        styles.quotePolaroid,
                        styles.quoteTape,
                        styles.quoteSticky,
                        styles.quotePolaroid,
                      ];
                      const rots = [-1.5, 2, -2.5, 1, -1, 2.5];
                      return (
                        <div
                          key={i}
                          className={`${styles.quoteCard} ${variants[i % variants.length]}`}
                          style={{ transform: `rotate(${rots[i % rots.length]}deg)` }}
                        >
                          <p>&ldquo;{quote}&rdquo;</p>
                        </div>
                      );
                    })}
                </div>
              </>
              </div>
            )}
          </section>

          <div className={galleryStyles.sectionDivider} aria-hidden />

          <section className={styles.chartsSection} aria-label="Survey results">
            <h2 className={styles.chartsHeading}>adulthood andrea</h2>
            <p className={styles.chartsIntro}>
              What her friends voted she should keep &amp; what to leave in the rearview
            </p>

            <div className={galleryStyles.galleryFullBleed}>
            {(() => {
              const insEntries = Object.entries(insAnswers)
                .filter(([, v]) => v > 0)
                .sort((a, b) => b[1] - a[1]);
              const outEntries = Object.entries(outsAnswers)
                .filter(([, v]) => v > 0)
                .sort((a, b) => b[1] - a[1]);

              const topIn = insEntries[0];
              const topOut = outEntries[0];

              return topIn || topOut ? (
                <div className={styles.chartWinners}>
                  {topIn && (
                    <div className={`${styles.winnerCard} ${styles.winnerKeep}`}>
                      <span className={styles.winnerLabel}>Crowd favorite to keep</span>
                      <span className={styles.winnerText}>{topIn[0]}</span>
                      <span className={styles.winnerVotes}>
                        {topIn[1]} vote{topIn[1] === 1 ? "" : "s"}
                      </span>
                    </div>
                  )}
                  {topOut && (
                    <div className={`${styles.winnerCard} ${styles.winnerRetire}`}>
                      <span className={styles.winnerLabel}>Unanimously retiring</span>
                      <span className={styles.winnerText}>{topOut[0]}</span>
                      <span className={styles.winnerVotes}>
                        {topOut[1]} vote{topOut[1] === 1 ? "" : "s"}
                      </span>
                    </div>
                  )}
                </div>
              ) : null;
            })()}

            <div className={styles.chartsGrid}>
              <div className={styles.chartBlock}>
                <h3 className={styles.chartLabel}>INs</h3>
                <p className={styles.chartSubtitle}>
                  One Andrea trait that must survive adulthood
                </p>

                <div
                  className={styles.pieChartArea}
                  onMouseMove={(e) => {
                    if (hoveredKeep) setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => {
                    setHoveredKeep(null);
                    setTooltipPos(null);
                  }}
                >
                  <div className={styles.pieChartWrap}>
                    <div className={styles.pieChart} role="img" aria-label="Adulthood traits to keep">
                      <svg viewBox="0 0 100 100" className={styles.pieSvg}>
                        {(() => {
                          const entries = Object.entries(insAnswers).filter(([, v]) => v > 0);
                          const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
                          let acc = 0;
                          const offset = -90;

                          return entries.map(([label], i) => {
                            const pct = (insAnswers[label] ?? 0) / total;
                            const start = offset + acc * 360;
                            acc += pct;
                            const angle = pct * 360;

                            const x1 = 50 + 45 * Math.cos((start * Math.PI) / 180);
                            const y1 = 50 + 45 * Math.sin((start * Math.PI) / 180);
                            const x2 = 50 + 45 * Math.cos(((start + angle) * Math.PI) / 180);
                            const y2 = 50 + 45 * Math.sin(((start + angle) * Math.PI) / 180);
                            const large = angle > 180 ? 1 : 0;
                            const d = `M50 50 L${x1} ${y1} A45 45 0 ${large} 1 ${x2} ${y2} Z`;
                            const isHovered = hoveredKeep === label;

                            return (
                              <path
                                key={label}
                                d={d}
                                fill={MCQ_COLORS[i % MCQ_COLORS.length]}
                                opacity={isHovered ? 1 : hoveredKeep ? 0.4 : 1}
                                style={{ cursor: "pointer" }}
                                onMouseEnter={(e) => {
                                  setHoveredKeep(label);
                                  setTooltipPos({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => setHoveredKeep(null)}
                                aria-label={`${label}: ${insAnswers[label]} vote${
                                  insAnswers[label] === 1 ? "" : "s"
                                }`}
                              />
                            );
                          });
                        })()}
                      </svg>
                    </div>

                    {hoveredKeep &&
                      (() => {
                        const total = Object.values(insAnswers).reduce((s, v) => s + v, 0) || 1;
                        const count = insAnswers[hoveredKeep] ?? 0;
                        const pct = ((count / total) * 100).toFixed(1);

                        return (
                          <div
                            className={styles.pieTooltip}
                            role="tooltip"
                            style={
                              tooltipPos
                                ? {
                                    left: tooltipPos.x,
                                    top: tooltipPos.y,
                                    transform: "translate(-50%, -100%) translateY(-8px)",
                                  }
                                : undefined
                            }
                          >
                            <strong>{hoveredKeep}</strong> {count} ({pct}%)
                          </div>
                        );
                      })()}

                    <div className={styles.chartLegend}>
                      {Object.entries(insAnswers)
                        .filter(([, v]) => v > 0)
                        .map(([label], i) => (
                          <span
                            key={label}
                            className={`${styles.legendItem} ${
                              hoveredKeep === label ? styles.legendItemHovered : ""
                            }`}
                            onMouseEnter={(e) => {
                              setHoveredKeep(label);
                              setTooltipPos({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseLeave={() => setHoveredKeep(null)}
                          >
                            <span
                              className={styles.legendDot}
                              style={{ background: MCQ_COLORS[i % MCQ_COLORS.length] }}
                            />
                            <span className={styles.legendLabel}>
                              {label} ({insAnswers[label]})
                            </span>
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.chartBlock}>
                <h3 className={styles.chartLabel}>OUTs</h3>
                <p className={styles.chartSubtitle}>
                  One Andrea habit that adulthood should retire
                </p>

                <div
                  className={styles.chartRow}
                  onMouseMove={(e) => {
                    if (hoveredLeave) setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => {
                    setHoveredLeave(null);
                    setTooltipPos(null);
                  }}
                >
                  <div className={styles.pieChartWrap}>
                    <div
                      className={styles.pieChart}
                      role="img"
                      aria-label="Habits to leave in teenagehood"
                    >
                      <svg viewBox="0 0 100 100" className={styles.pieSvg}>
                        {(() => {
                          const entries = Object.entries(outsAnswers).filter(([, v]) => v > 0);
                          const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
                          let acc = 0;
                          const offset = -90;

                          return entries.map(([label], i) => {
                            const pct = (outsAnswers[label] ?? 0) / total;
                            const start = offset + acc * 360;
                            acc += pct;
                            const angle = pct * 360;

                            const x1 = 50 + 45 * Math.cos((start * Math.PI) / 180);
                            const y1 = 50 + 45 * Math.sin((start * Math.PI) / 180);
                            const x2 = 50 + 45 * Math.cos(((start + angle) * Math.PI) / 180);
                            const y2 = 50 + 45 * Math.sin(((start + angle) * Math.PI) / 180);
                            const large = angle > 180 ? 1 : 0;
                            const d = `M50 50 L${x1} ${y1} A45 45 0 ${large} 1 ${x2} ${y2} Z`;
                            const isHovered = hoveredLeave === label;

                            return (
                              <path
                                key={label}
                                d={d}
                                fill={MCQ_COLORS[(i + 2) % MCQ_COLORS.length]}
                                opacity={isHovered ? 1 : hoveredLeave ? 0.4 : 1}
                                style={{ cursor: "pointer" }}
                                onMouseEnter={(e) => {
                                  setHoveredLeave(label);
                                  setTooltipPos({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => setHoveredLeave(null)}
                                aria-label={`${label}: ${outsAnswers[label]} vote${
                                  outsAnswers[label] === 1 ? "" : "s"
                                }`}
                              />
                            );
                          });
                        })()}
                      </svg>
                    </div>

                    {hoveredLeave &&
                      (() => {
                        const total = Object.values(outsAnswers).reduce((s, v) => s + v, 0) || 1;
                        const count = outsAnswers[hoveredLeave] ?? 0;
                        const pct = ((count / total) * 100).toFixed(1);

                        return (
                          <div
                            className={styles.pieTooltip}
                            role="tooltip"
                            style={
                              tooltipPos
                                ? {
                                    left: tooltipPos.x,
                                    top: tooltipPos.y,
                                    transform: "translate(-50%, -100%) translateY(-8px)",
                                  }
                                : undefined
                            }
                          >
                            <strong>{hoveredLeave}</strong> {count} ({pct}%)
                          </div>
                        );
                      })()}

                    <div className={styles.chartLegend}>
                      {Object.entries(outsAnswers)
                        .filter(([, v]) => v > 0)
                        .map(([label], i) => (
                          <span
                            key={label}
                            className={`${styles.legendItem} ${
                              hoveredLeave === label ? styles.legendItemHovered : ""
                            }`}
                            onMouseEnter={(e) => {
                              setHoveredLeave(label);
                              setTooltipPos({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseLeave={() => setHoveredLeave(null)}
                          >
                            <span
                              className={styles.legendDot}
                              style={{
                                background: MCQ_COLORS[(i + 2) % MCQ_COLORS.length],
                              }}
                            />
                            <span className={styles.legendLabel}>
                              {label} ({outsAnswers[label]})
                            </span>
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>

          <div className={galleryStyles.sectionDivider} aria-hidden />

          <section className={galleryStyles.section} aria-label="Polaroid memories">
            <h2 className={galleryStyles.sectionLabel}>Favorite Andrea Moments</h2>
            <p className={galleryStyles.sectionSubtext}>Polaroid Memories </p>
            <div className={galleryStyles.galleryFullBleed}>
            <div className={galleryStyles.polaroidMasonry}>
              {POLAROID_PHOTOS.map((item, i) => (
                <div
                  key={`p-${i}`}
                  className={galleryStyles.polaroidFrame}
                  style={{ transform: `rotate(${polaroidRotations[i % polaroidRotations.length]}deg)` }}
                >
                  <div className={galleryStyles.clothespin}>
                    <ClothespinIcon color={CLOTHESPIN_COLORS[i % CLOTHESPIN_COLORS.length]} />
                  </div>
                  <div className={galleryStyles.polaroidInner}>
                    {item.src ? (
                      <img src={item.src} alt={item.memory ?? ""} />
                    ) : (
                      <div className={galleryStyles.photoPlaceholder} />
                    )}
                    {item.memory && (
                      <p className={galleryStyles.polaroidMemory}>{item.memory}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </section>

          <div className={galleryStyles.sectionDivider} aria-hidden />

          <section className={galleryStyles.section} aria-label="Favorites">
            <h2 className={galleryStyles.sectionLabel}>Andrea Special's</h2>
            <p className={galleryStyles.sectionSubtext}>More special moments</p>
  
            <div className={galleryStyles.galleryFullBleed}>
            <div className={galleryStyles.masonryGallery}>
              {GRID_PHOTOS.map((item, i) => (
                <div
                  key={i}
                  className={`${galleryStyles.gridItemCard} ${item.memory ? galleryStyles.gridItemCardFlip : ""}`}
                  style={{
                    transform: `rotate(${[-1, 1, -0.5, 1.5, -1.2, 0.8, -0.7, 1][i % 8]}deg)`,
                  }}
                >
                  {item.memory ? (
                    <div className={galleryStyles.gridCardInner}>
                      <div className={galleryStyles.gridCardFront}>
                        {item.src ? (
                          <img src={item.src} alt={item.memory} />
                        ) : (
                          <div className={galleryStyles.photoPlaceholder} />
                        )}
                      </div>
                      <div className={galleryStyles.gridCardBack}>
                        <p>{item.memory}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={galleryStyles.gridCardFront}>
                      {item.src ? (
                        <img src={item.src} alt="" />
                      ) : (
                        <div className={galleryStyles.photoPlaceholder} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* {GALLERY_VIDEOS.length > 0 && (
            <>
              <div className={galleryStyles.sectionDivider} aria-hidden />
              <section className={galleryStyles.section} aria-label="Videos">
                <h2 className={galleryStyles.sectionTitle}>
                  <Video size={24} />
                  Videos
                </h2>
                <div className={galleryStyles.videoGrid}>
                  {GALLERY_VIDEOS.map((video, i) => (
                    <div key={i} className={galleryStyles.videoCard}>
                      <video
                        src={video.src}
                        controls
                        poster={video.thumbnail}
                        className={galleryStyles.video}
                      />
                      {video.title && (
                        <p className={galleryStyles.videoTitle}>{video.title}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )} */}

          {/* <nav className={styles.navLinks}>
            <Link href="/gallery" className={styles.navLink}>
              <Camera size={20} />
              Photos &amp; videos
            </Link>
            <Link href="/messages" className={styles.navLink}>
              <MessageCircle size={20} />
              More messages
            </Link>
          </nav> */}
        </main>
      </div>
    </>
  );
}
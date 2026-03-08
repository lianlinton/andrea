import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Video } from "lucide-react";
import { POLAROID_PHOTOS, GALLERY_VIDEOS, CAROUSEL_PHOTOS, GRID_PHOTOS, type PhotoItem } from "@/data/media";
import FlowerBrix from "@/components/FlowerBrix";
import styles from "@/styles/Gallery.module.css";

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

export default function GalleryPage() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselImages = CAROUSEL_PHOTOS.length > 0 ? CAROUSEL_PHOTOS : [null];
  const gridItems: PhotoItem[] =
    GRID_PHOTOS.length > 0 ? GRID_PHOTOS : POLAROID_PHOTOS.slice(0, 8).map((p) => ({ src: p.src, memory: p.memory }));

  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const id = setInterval(() => setCarouselIndex((i) => (i + 1) % carouselImages.length), 4000);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  const photosByLine = Array.from({ length: 3 }, (_, i) =>
    POLAROID_PHOTOS.filter((p) => (p.line ?? 0) === i)
  );

  /* Scattered rotations for polaroids - slight randomness */
  const polaroidRotations = [-1.5, 1, -0.5, 2, -1, 0.5];

  return (
    <>
      <Head>
        <title>For our beautiful, amazing queen – Photos & Videos</title>
        <meta name="description" content="A page of memories, just for you" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={20} />
            Back
          </Link>

          <header className={styles.header}>
            <div className={styles.headerFlowers}>
              <FlowerBrix size={40} variant="lavender" />
              <FlowerBrix size={48} variant="pink" />
              <FlowerBrix size={36} variant="purple" />
            </div>
            <h1 className={styles.title}>To our beautiful, amazing queen</h1>
            <p className={styles.subtitle}>All our photos and videos, just for you</p>
          </header>

          {/* 1. Carousel hero */}
          <section className={styles.heroSection}>
            <div className={styles.carousel}>
              {carouselImages.map((src, i) => (
                <div
                  key={i}
                  className={`${styles.carouselSlide} ${i === carouselIndex ? styles.carouselActive : ""}`}
                >
                  {src ? (
                    <img src={src} alt="" />
                  ) : (
                    <div className={styles.heroPlaceholder} />
                  )}
                </div>
              ))}
              <div className={styles.carouselOverlay}>
                <span className={styles.heroText}>To our beautiful, amazing queen</span>
              </div>
              {carouselImages.length > 1 && (
                <div className={styles.carouselDots}>
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.carouselDot} ${i === carouselIndex ? styles.carouselDotActive : ""}`}
                      onClick={() => setCarouselIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          <div className={styles.sectionDivider} aria-hidden />

          {/* 2. Polaroid clotheslines */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Moments</h2>
            <div className={styles.clotheslineGallery}>
              {photosByLine.map((photos, lineIdx) => (
                <div key={lineIdx} className={styles.clothesline}>
                  <div className={styles.stringLine} />
                  <div className={styles.polaroidRow}>
                    {photos.map((photo, i) => (
                      <div
                        key={`${lineIdx}-${i}`}
                        className={styles.polaroidFrame}
                        style={{ transform: `rotate(${polaroidRotations[i % polaroidRotations.length]}deg)` }}
                      >
                        <div className={styles.clothespin}>
                          <ClothespinIcon color={CLOTHESPIN_COLORS[i % CLOTHESPIN_COLORS.length]} />
                        </div>
                        <div className={styles.polaroidInner}>
                          {photo.src ? (
                            <img src={photo.src} alt={photo.memory ? photo.memory : ""} />
                          ) : (
                            <div className={styles.photoPlaceholder} />
                          )}
                          {photo.memory && (
                            <p className={styles.polaroidMemory}>{photo.memory}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Grid - photos with memory behind each */}
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Favorites</h2>
            <p className={styles.sectionSubtext}>Photos with their memories</p>
            <div className={styles.gridGallery}>
              {gridItems.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.gridItemCard} ${item.memory ? styles.gridItemCardFlip : ""}`}
                  style={{
                    transform: `rotate(${[-1, 1, -0.5, 1.5, -1.2, 0.8, -0.7, 1][i % 8]}deg)`,
                  }}
                >
                  {item.memory ? (
                    <div className={styles.gridCardInner}>
                      <div className={styles.gridCardFront}>
                        {item.src ? (
                          <img src={item.src} alt={item.memory} />
                        ) : (
                          <div className={styles.photoPlaceholder} />
                        )}
                      </div>
                      <div className={styles.gridCardBack}>
                        <p>{item.memory}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.gridCardFront}>
                      {item.src ? (
                        <img src={item.src} alt="" />
                      ) : (
                        <div className={styles.photoPlaceholder} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className={styles.sectionDivider} aria-hidden />

          {/* 4. Videos */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Video size={24} />
              Videos
            </h2>
            {GALLERY_VIDEOS.length > 0 ? (
              <div className={styles.videoGrid}>
                {GALLERY_VIDEOS.map((video, i) => (
                  <div key={i} className={styles.videoCard}>
                    <video
                      src={video.src}
                      controls
                      poster={video.thumbnail}
                      className={styles.video}
                    />
                    {video.title && (
                      <p className={styles.videoTitle}>{video.title}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.placeholderText}>
                Add video URLs to <code>src/data/media.ts</code> to see them here.
              </p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

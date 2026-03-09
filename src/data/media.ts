/* =============================================================================
   PHOTO PLACEMENT GUIDE - Paths match your folder structure
   =============================================================================

   public/photos/
   ├── gallery/hero/  → HERO carousel (1.png–38.png)
   ├── gallery/       → MASONRY section (Favorites)
   └── polaroid/      → POLAROID section (with captions)

   1. HERO (CAROUSEL_PHOTOS) - From /photos/gallery/hero/
   2. POLAROID - Use /photos/polaroid/...  Add memory (caption) for each
   3. MASONRY - Use /photos/gallery/...   Add memory for flip-card (optional)
   ============================================================================= */

export const ANDREA_HERO = "/photos/hero.jpg";

export type PhotoItem = {
  src?: string;
  line?: number;
  memory?: string;
};

export type VideoItem = {
  src: string;
  title?: string;
  thumbnail?: string;
};

/* 1. HERO - Photos from /photos/gallery/hero/ (1.png through 38.png) */
export const CAROUSEL_PHOTOS: string[] = Array.from({ length: 38 }, (_, i) => `/photos/gallery/hero/${i + 1}.png`);

/* 2. POLAROID - From /photos/polaroid/. Add memory (caption) for each. */
export const POLAROID_PHOTOS: PhotoItem[] = [
  { src: "/photos/polaroid/101_0764_Original - Steffi Mathew.jpeg", memory: "ruha memoriess" },
  { src: "/photos/polaroid/101_1695 - Ruth Simon.jpeg", memory: "crazy movie party!!" },
  { src: "/photos/polaroid/101_1738_Original - Steffi Mathew.jpeg", memory: "ruha memoriess" },
  { src: "/photos/polaroid/101_1831 (2).jpeg", memory: "Ruha SWC event" },
  { src: "/photos/polaroid/15901615-7B73-4BDC-9D97-31A309367E11 - John James.JPG", memory: "Jrotc - Slaving away in but also just how much life has changed" },
  { src: "/photos/polaroid/1CF69629-F74E-42FE-9F66-4351AADE9A7F - John James.JPG", memory: "Andrea always sleeping at a ripe 9 pm." },
  { src: "/photos/polaroid/375903B2-2472-4D2D-87FC-4A5E09B8BD88-branded - Jeslin Joshi.jpeg", memory: "sistahs!!" },
  { src: "/photos/polaroid/466F1AA4-31DE-4F39-89DD-3A5E5F876767 - John James.JPG", memory: "Monopoly- Me Andrea and Andric just demolishing them in Monopoly. When I say demolishing I mean straight belt." },
  { src: "/photos/polaroid/IMG-20250621-WA0102 - Ranjeet mathew thomas.jpg", memory: "So lovely 😘" },
  { src: "/photos/polaroid/IMG_0492 - Tanvi Sai Sure.jpeg", memory: "This is an insane throwback but it's actually the most recent picture that we have together (we really need to hang out soon and take new pictures) and we had soo much fun that day! Water balloon fight and towel lungis!" },
  { src: "/photos/polaroid/IMG_0560 - Mabel Neyyan.jpeg", memory: "i don't remember the context behind this photo but it was in the wysdom bunks and I like it because it looks like she was walking really fast around me and that i was trying to capture that on camera for whatever reason" },
  { src: "/photos/polaroid/IMG_2294 - Neha Joshy.jpeg", memory: "I DONT HAVE A SINGLE PIC WITH JUST ME AND HER OMGG but I do have this pic that I like, that has all of us in ittt" },
  { src: "/photos/polaroid/IMG_2996 - Ryan Arakal.jpeg", memory: "Ruha trip to LA church, pretty sure I rizzed everyone's parents. Sorry Andrea don't think we have any individuals lol." },
  { src: "/photos/polaroid/IMG_4333 - Angel Pereppadan.jpeg", memory: "christmas '24" },
  { src: "/photos/polaroid/IMG_4430 - Angel Pereppadan.jpeg", memory: "sunset at kingdom come" },
  { src: "/photos/polaroid/IMG_4721 - Kate Loise Macaraeg.jpeg", memory: "This beach day meant a lot, honestly I look back on this whenever I feel lonely and I miss when things were very simple. Where our worries on that beach were what time we needed to get home and what camera settings our phones should be at. I miss it so, so, so much. I believe when we were at the beach you spoke to me about what my plans were for college and you helped me solidify that small part of me that wanted to deny the fact I was going to have to grow up at some point. This day, you brought me out of my head and helped me live in the moment, your presence alone helped ease my anxiety and ease the pressure of the future." },
  { src: "/photos/polaroid/IMG_4807 - Angel Pereppadan.jpeg", memory: "all saints' day!!" },
  { src: "/photos/polaroid/IMG_6029 - Jeslin Joshi.jpeg", memory: "sistahs!!" },
  { src: "/photos/polaroid/screenshot-polaroid-1.png", memory: "Rende Ruha Hangout!" },
  { src: "/photos/polaroid/IMG_7062 - Angel Pereppadan.jpeg", memory: "CCD grad" },
  { src: "/photos/polaroid/IMG_7706 - Mayukha Talinki.jpg", memory: "First quarter of college!" },
  { src: "/photos/polaroid/IMG_9063 - Mabel Neyyan.jpeg", memory: "This when Andrea thought i was being suspicious in the boelter stairs and walked away with really fast LONG strides" },
  { src: "/photos/polaroid/IMG_9454 - Julia joshi.jpeg", memory: "christmas 2025" },
  { src: "/photos/polaroid/screenshot-polaroid-2.png", memory: "with the beauty and the brains of this project! 🥰" },
  { src: "/photos/polaroid/screenshot-polaroid-1.png", memory: "we went viral no questions asked " },
  { src: "/photos/polaroid/screenshot-polaroid-3.png", memory: "The picture is from Asha Aunty’s annual Divine Mercy Sunday festivities but it’s crazy the amount of times someone has said we look alike!" },
];

/* 3. MASONRY - From /photos/gallery/. Add memory for flip-card captions (optional). */
export const GRID_PHOTOS: PhotoItem[] = [
  { src: "/photos/gallery/01HJHF04ZM00VWTSX43A4A0W08-low-res-branded- - Samuel Puthiakunnel.jpeg", memory: "From Samuel Puthiakunnel" },
  { src: "/photos/gallery/101_0744.jpg", memory: "From Raina"  },
  { src: "/photos/gallery/681897a2-3684-45df-9e80-1e6fa3684bb0 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/7765ED39-094E-456B-AD4B-C9B418EBCF9F - Julia Binson.jpeg", memory: "From Julia Binson" },

  /* Screenshots / messages — moved up so they appear earlier */
  { src: "/photos/gallery/screenshot-gallery-11.png", memory: "From William Binson" },
  { src: "/photos/gallery/screenshot-gallery-9.png", memory: "From Maria George" },
  { src: "/photos/gallery/screenshot-gallery-10.png", memory: "From Maria George" },
  { src: "/photos/gallery/screenshot-gallery-12.png", memory: "From Raina" },
  { src: "/photos/gallery/screenshot-gallery-13.png", memory: "From Raina" },
  { src: "/photos/gallery/screenshot-gallery-14.png", memory: "From Raina "  },
  { src: "/photos/gallery/screenshot-gallery-15.png", memory: "From Raina" },
  { src: "/photos/gallery/screenshot-gallery-16.png", memory: "From Raina" },
  { src: "/photos/gallery/screenshot-gallery-17.png", memory: "From Raina" },
  { src: "/photos/gallery/screenshot-gallery-18.png", memory: "From Raina" },

  { src: "/photos/gallery/IMG-20250702-WA0068(1) - Ranjeet mathew thomas.jpg", memory: "From Irene Maria Ranjeet "  },
  { src: "/photos/gallery/IMG-20260306-WA0069 - Ranjeet mathew thomas.jpg", memory: "From Irene Maria Ranjeet " },
  { src: "/photos/gallery/IMG-20260306-WA0070 - Ranjeet mathew thomas.jpg", memory: "From Irene Maria Ranjeet "  },
  { src: "/photos/gallery/IMG_0010.JPG" },
  { src: "/photos/gallery/IMG_0155 - William Binson.jpeg", memory: "From William Binson" },
  { src: "/photos/gallery/IMG_1027 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/IMG_1482 - Samuel Puthiakunnel.jpeg", memory: "From Samuel Puthiakunnel" },
  { src: "/photos/gallery/IMG_1939 - Tahlia Garcia.jpeg", memory: "Bible study! Andrea probably hit some crazy bars right before this" },
  { src: "/photos/gallery/IMG_2297 - Samuel Puthiakunnel.jpeg", memory: "From Samuel Puthiakunnel" },
  { src: "/photos/gallery/IMG_2455 - Samuel Puthiakunnel.jpeg", memory: "From Samuel Puthiakunnel" },
  { src: "/photos/gallery/IMG_2726 - Julia Binson.jpeg", memory: "From Julia Binson" },
  { src: "/photos/gallery/IMG_3620 - Meryl Mathew.jpeg", memory: "From Meryl Mathew" },
  { src: "/photos/gallery/IMG_3849.JPEG", memory: "From Raina" },
  { src: "/photos/gallery/IMG_4671 - Maria George.JPG", memory: "From Maria George" },
  { src: "/photos/gallery/IMG_4819 - Steffi Mathew.jpeg", memory: "ruha memoriess" },
  { src: "/photos/gallery/IMG_5004 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/IMG_5411 - Julia Binson.jpeg", memory: "From Julia Binson" },
  { src: "/photos/gallery/IMG_5969 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/IMG_6318 - Andric Reji.jpeg", memory: "From Andric Reji" },
  { src: "/photos/gallery/IMG_6605 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/IMG_6766 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/IMG_7010 - Julia Binson.jpeg", memory: "From Julia Binson" },
  { src: "/photos/gallery/IMG_7050 - Samuel Puthiakunnel.jpeg", memory: "From Samuel Puthiakunnel" },
  { src: "/photos/gallery/IMG_7139.jpg" },
  { src: "/photos/gallery/IMG_7173 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/IMG_7289 - Jeffrey Pellissery.jpeg", memory: "From Jeffrey Pellissery" },
  { src: "/photos/gallery/IMG_7904 - William Binson.jpeg", memory: "From William Binson" },
  { src: "/photos/gallery/IMG_8465 - Andric Reji.jpeg", memory: "From Andric Reji" },
  { src: "/photos/gallery/IMG_8605 - Andric Reji.jpeg", memory: "From Andric Reji" },
  { src: "/photos/gallery/IMG_8688 - Andric Reji.jpeg", memory: "From Andric Reji" },
  { src: "/photos/gallery/IMG_9088.jpg", memory: "From Raina" },
  { src: "/photos/gallery/IMG_9956 - Julia Binson.jpeg", memory: "From Julia Binson" },
  { src: "/photos/gallery/screenshot-gallery-1.png" },
  { src: "/photos/gallery/screenshot-gallery-2.png" },
  { src: "/photos/gallery/screenshot-gallery-3.png" },
  { src: "/photos/gallery/screenshot-gallery-4.png" },
  { src: "/photos/gallery/screenshot-gallery-5.png" },
  { src: "/photos/gallery/screenshot-gallery-6.png" },
  { src: "/photos/gallery/screenshot-gallery-7.png" },
  { src: "/photos/gallery/screenshot-gallery-8.png" },
];

export const GALLERY_VIDEOS: VideoItem[] = [
  // { src: "/videos/birthday.mp4", title: "Birthday moments" },
];

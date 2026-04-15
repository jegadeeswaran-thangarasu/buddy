export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  year?: string;
  rotation?: number;
}

const PLACEHOLDER =
  "https://images.pexels.com/photos/8081418/pexels-photo-8081418.jpeg";

export const memoryPhotos: PhotoItem[] = [
  { id: "m1", src: PLACEHOLDER, alt: "College days",         caption: "Where it all began 💛",    year: "2016", rotation: -2 },
  { id: "m2", src: PLACEHOLDER, alt: "Pongal visit",         caption: "Pongal at her place 🌾",   year: "2018", rotation:  2 },
  { id: "m3", src: PLACEHOLDER, alt: "Temple visit",         caption: "Temple with family 🙏",    year: "2019", rotation: -1 },
  { id: "m4", src: PLACEHOLDER, alt: "Pongal vizha surprise",caption: "The surprise visit ✨",    year: "2020", rotation:  3 },
  { id: "m5", src: PLACEHOLDER, alt: "After placement",      caption: "The best news call 📞",    year: "2021", rotation: -2 },
  { id: "m6", src: PLACEHOLDER, alt: "Her birthday",         caption: "Her birthday 🎂",           year: "2023", rotation:  1 },
];

export const engagementPhotos: PhotoItem[] = [
  { id: "e1", src: PLACEHOLDER, alt: "Engagement",           caption: "March 7, 2024 💍" },
  { id: "e2", src: PLACEHOLDER, alt: "Engagement rings",     caption: "The rings 💛💙" },
  { id: "e3", src: PLACEHOLDER, alt: "Engagement with family", caption: "With our families 🥹" },
  { id: "e4", src: PLACEHOLDER, alt: "Engagement portrait",  caption: "Just us 💍" },
];

export const weddingPhotos: PhotoItem[] = [
  { id: "w1", src: PLACEHOLDER, alt: "Wedding day",          caption: "April 22, 2024 👰" },
  { id: "w2", src: PLACEHOLDER, alt: "Wedding ceremony",     caption: "The moment 💛" },
  { id: "w3", src: PLACEHOLDER, alt: "Wedding portrait",     caption: "Mr & Mrs 💙" },
  { id: "w4", src: PLACEHOLDER, alt: "Wedding celebration",  caption: "Pure joy 🎉" },
];

export const photoshootPhotos: PhotoItem[] = [
  { id: "p1", src: PLACEHOLDER, alt: "Photoshoot 1", caption: "Us, always 💛",          rotation: -1 },
  { id: "p2", src: PLACEHOLDER, alt: "Photoshoot 2", caption: "Laughing together 😄",   rotation:  1 },
  { id: "p3", src: PLACEHOLDER, alt: "Photoshoot 3", caption: "My favorite person 💙",  rotation: -1 },
  { id: "p4", src: PLACEHOLDER, alt: "Photoshoot 4", caption: "Forever buddies 💛💙",   rotation:  2 },
  { id: "p5", src: PLACEHOLDER, alt: "Photoshoot 5", caption: "Still us 🌟",            rotation: -2 },
  { id: "p6", src: PLACEHOLDER, alt: "Photoshoot 6", caption: "10 years of this 🥹",   rotation:  1 },
];

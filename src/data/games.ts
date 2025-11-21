import { type LocalizedText } from "@/lib/i18n";

export type GameStory = {
  slug: string;
  title: LocalizedText;
  genre: string;
  tagline: LocalizedText;
  description: LocalizedText;
  tone: LocalizedText;
  length: LocalizedText;
  highlights: LocalizedText[];
};

export const GAME_STORIES: GameStory[] = [
  {
    slug: "crypt_of_the_shattered_star",
    title: {
      en: "Crypt of the Shattered Star",
      th: "สุสานแห่งดวงดาวแตกสลาย"
    },
    genre: "High Fantasy",
    tagline: {
      th: "สำรวจดันเจี้ยนเรืองรูนที่จารึกคำทำนายจากอดีตกาล",
      en: "Explore a rune-lit dungeon carved with prophecies from ages past",
    },
    description: {
      th: "ผจญภัยในโถงหินเก่าแก่ที่เต็มไปด้วยเวทมนตร์และกลไกโบราณ ค้นหาความจริงของอาณาจักรที่หายสาบสูญและตัดสินใจว่าคุณจะปลดปล่อยหรือผนึกพลังที่หลับใหล",
      en: "Venture through ancient stone halls filled with arcane traps, uncover a lost kingdom's truth, and decide whether to unleash or seal the dormant power within.",
    },
    tone: { th: "มหากาพย์ • ลี้ลับ • เวทมนตร์หนักแน่น", en: "Epic • Mystical • High magic" },
    length: { th: "เซสชัน 20-30 นาที", en: "20-30 minute session" },
    highlights: [
      { th: "รูนเรืองแสง", en: "Glowing runes" },
      { th: "อสูรเฝ้าประตู", en: "Gatekeeper beast" },
      { th: "ดาบในตำนาน", en: "Legendary blade" },
    ],
  },
  {
    slug: "neon-rebellion",
    title: "Neon Rebellion",
    genre: "Cyberpunk",
    tagline: {
      th: "ก่อกบฏกลางมหานครนีออนที่ AI เฝ้าระวังทุกลมหายใจ",
      en: "Spark rebellion in a neon mega-city watched by sleepless AI",
    },
    description: {
      th: "เดินเกมใต้แสงไฟนีออน ร้อยแผนการแฮ็กและต่อสู้บนดาดฟ้า เมืองนี้เต็มไปด้วยสายลับ ซอมบี้ไซเบอร์ และข้อตกลงสีเทาที่ต้องตัดสินใจด้วยตัวเอง",
      en: "Weave hacks and rooftop fights beneath neon lights. Navigate spies, cyber-zombies, and gray-area deals as you decide how far to push the uprising.",
    },
    tone: { th: "ดิสโทเปีย • กดดัน • เทคโนโลยีจัดเต็ม", en: "Dystopian • Tense • Tech-saturated" },
    length: { th: "เซสชัน 15-25 นาที", en: "15-25 minute session" },
    highlights: [
      { th: "เมนเฟรมลับ", en: "Hidden mainframe" },
      { th: "แก๊งสตรีทซามูไร", en: "Street samurai crew" },
      { th: "ดีลเงามืด", en: "Shady deals" },
    ],
  },
  {
    slug: "stellar-frontier",
    title: "Stellar Frontier",
    genre: "Sci-Fi",
    tagline: {
      th: "นำยานสำรวจฝ่ารอยแยกอวกาศสู่ดินแดนที่ไม่ถูกบันทึก",
      en: "Pilot your crew through a space rift into uncharted realms",
    },
    description: {
      th: "เป็นกัปตันยานที่ต้องเลือกเส้นทางท่ามกลางดาราจักร สานสัมพันธ์กับอารยธรรมต่างดาว จัดการเหตุขัดข้องของ AI และแก้พาราดอกซ์เวลาที่คืบคลานเข้ามา",
      en: "Captain a survey ship across the stars, broker with new civilizations, manage AI anomalies, and untangle creeping time paradoxes.",
    },
    tone: { th: "สำรวจ • ตื่นเต้น • วิทยาศาสตร์ล้ำยุค", en: "Exploration • High stakes • Futuristic science" },
    length: { th: "เซสชัน 20 นาที", en: "20 minute session" },
    highlights: [
      { th: "ดาวเคราะห์ไร้ชื่อ", en: "Uncharted planet" },
      { th: "AI ตื่นรู้", en: "Awakened AI" },
      { th: "พิธีแรกพบ", en: "First-contact ritual" },
    ],
  },
  {
    slug: "veil-of-nightmares",
    title: "Veil of Nightmares",
    genre: "Horror",
    tagline: {
      th: "ไขปริศนาหมู่บ้านต้องคำสาปที่ไม่มีใครออกมาได้ทั้งเป็น",
      en: "Unravel a cursed village no one leaves alive",
    },
    description: {
      th: "ทุกมุมมีเงาและทุกเสียงกระซิบอาจเป็นสิ่งสุดท้ายที่คุณได้ยิน เลือกเชื่อในพิธีกรรมหรือวิทยาศาสตร์ สืบเบาะแสความจริงที่บิดเบี้ยวและเอาชีวิตรอดจากสิ่งที่แฝงตัว",
      en: "Shadows linger in every corner and each whisper could be your last. Trust in ritual or science, chase twisted clues, and survive what hunts beneath the curse.",
    },
    tone: { th: "สยอง • จิตวิทยา • ลึกลับซ่อนเงื่อน", en: "Horror • Psychological • Mystery" },
    length: { th: "เซสชัน 10-20 นาที", en: "10-20 minute session" },
    highlights: [
      { th: "คำสาปเลือด", en: "Blood curse" },
      { th: "วิญญาณเฝ้าบ้าน", en: "Guardian spirit" },
      { th: "พิธีผนึก", en: "Sealing ritual" },
    ],
  },
];

export const findGameBySlug = (slug: string) => GAME_STORIES.find((game) => game.slug === slug);

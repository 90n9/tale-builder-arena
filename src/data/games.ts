export type GameStory = {
  slug: string;
  title: string;
  genre: string;
  tagline: string;
  description: string;
  tone: string;
  length: string;
  highlights: string[];
};

export const GAME_STORIES: GameStory[] = [
  {
    slug: "ancient-dungeon",
    title: "Echoes of the Ancient Dungeon",
    genre: "High Fantasy",
    tagline: "สำรวจดันเจี้ยนเรืองรูนที่จารึกคำทำนายจากอดีตกาล",
    description:
      "ผจญภัยในโถงหินเก่าแก่ที่เต็มไปด้วยเวทมนตร์และกลไกโบราณ ค้นหาความจริงของอาณาจักรที่หายสาบสูญและตัดสินใจว่าคุณจะปลดปล่อยหรือผนึกพลังที่หลับใหล",
    tone: "มหากาพย์ • ลี้ลับ • เวทมนตร์หนักแน่น",
    length: "เซสชัน 20-30 นาที",
    highlights: ["รูนเรืองแสง", "อสูรเฝ้าประตู", "ดาบในตำนาน"],
  },
  {
    slug: "neon-rebellion",
    title: "Neon Rebellion",
    genre: "Cyberpunk",
    tagline: "ก่อกบฏกลางมหานครนีออนที่ AI เฝ้าระวังทุกลมหายใจ",
    description:
      "เดินเกมใต้แสงไฟนีออน ร้อยแผนการแฮ็กและต่อสู้บนดาดฟ้า เมืองนี้เต็มไปด้วยสายลับ ซอมบี้ไซเบอร์ และข้อตกลงสีเทาที่ต้องตัดสินใจด้วยตัวเอง",
    tone: "ดิสโทเปีย • กดดัน • เทคโนโลยีจัดเต็ม",
    length: "เซสชัน 15-25 นาที",
    highlights: ["เมนเฟรมลับ", "แก๊งสตรีทซามูไร", "ดีลเงามืด"],
  },
  {
    slug: "stellar-frontier",
    title: "Stellar Frontier",
    genre: "Sci-Fi",
    tagline: "นำยานสำรวจฝ่ารอยแยกอวกาศสู่ดินแดนที่ไม่ถูกบันทึก",
    description:
      "เป็นกัปตันยานที่ต้องเลือกเส้นทางท่ามกลางดาราจักร สานสัมพันธ์กับอารยธรรมต่างดาว จัดการเหตุขัดข้องของ AI และแก้พาราดอกซ์เวลาที่คืบคลานเข้ามา",
    tone: "สำรวจ • ตื่นเต้น • วิทยาศาสตร์ล้ำยุค",
    length: "เซสชัน 20 นาที",
    highlights: ["ดาวเคราะห์ไร้ชื่อ", "AI ตื่นรู้", "พิธีแรกพบ"],
  },
  {
    slug: "veil-of-nightmares",
    title: "Veil of Nightmares",
    genre: "Horror",
    tagline: "ไขปริศนาหมู่บ้านต้องคำสาปที่ไม่มีใครออกมาได้ทั้งเป็น",
    description:
      "ทุกมุมมีเงาและทุกเสียงกระซิบอาจเป็นสิ่งสุดท้ายที่คุณได้ยิน เลือกเชื่อในพิธีกรรมหรือวิทยาศาสตร์ สืบเบาะแสความจริงที่บิดเบี้ยวและเอาชีวิตรอดจากสิ่งที่แฝงตัว",
    tone: "สยอง • จิตวิทยา • ลึกลับซ่อนเงื่อน",
    length: "เซสชัน 10-20 นาที",
    highlights: ["คำสาปเลือด", "วิญญาณเฝ้าบ้าน", "พิธีผนึก"],
  },
];

export const findGameBySlug = (slug: string) => GAME_STORIES.find((game) => game.slug === slug);

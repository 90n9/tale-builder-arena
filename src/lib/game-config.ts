import { type LocalizedText } from "@/lib/i18n";

export type CharacterAttributes = Record<string, number>;

export type CharacterSelection = {
  genre: string;
  race: string;
  class: string;
  raceName?: LocalizedText;
  className?: LocalizedText;
  attributes: CharacterAttributes;
};

export const CHARACTER_STORAGE_KEY = "taleBuilderCharacter";
export const END_SUMMARY_STORAGE_KEY = "taleBuilderEndSummary";

export const getCharacterStorageKey = (slug: string) => `${CHARACTER_STORAGE_KEY}:${slug}`;
export const getEndSummaryStorageKey = (slug: string) => `${END_SUMMARY_STORAGE_KEY}:${slug}`;

export const createDefaultAttributes = (baseAttributes?: Record<string, number>): CharacterAttributes => ({
  ...(baseAttributes ?? {}),
});

export const createEmptyCharacter = (): CharacterSelection => ({
  genre: "",
  race: "",
  class: "",
  attributes: createDefaultAttributes(),
});

export type AdventureStats = {
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  gold: number;
};

export type AdventureSummary = {
  turn: number;
  stats: AdventureStats;
  character: CharacterSelection;
  achievementId?: string | null;
};

export const genres = [
  {
    name: "High Fantasy",
    description: { th: "ผจญภัยยิ่งใหญ่ในดินแดนเวทมนตร์", en: "Grand adventures in worlds of magic" },
  },
  {
    name: "Dark Fantasy",
    description: { th: "แฟนตาซีเข้มข้นผสานสยองขวัญกอธิค", en: "Gothic danger woven into fantasy" },
  },
  {
    name: "Sci-Fi",
    description: { th: "เทคโนโลยีอนาคตและการสำรวจอวกาศ", en: "Futuristic tech and cosmic exploration" },
  },
  {
    name: "Cyberpunk",
    description: { th: "โลกดิสโทเปียเทคโนโลยีสูง ชีวิตต่ำ", en: "High-tech, low-life dystopia" },
  },
  { name: "Horror", description: { th: "เอาชีวิตรอดจากสิ่งลี้ลับน่าสะพรึง", en: "Survive the uncanny and terrifying" } },
  {
    name: "Post-Apocalyptic",
    description: { th: "ดิ้นรนอยู่รอดในดินแดนร้างพินาศ", en: "Struggle to endure a ruined world" },
  },
];

export const INITIAL_NARRATION: LocalizedText = {
  th: `คุณยืนอยู่หน้าดันเจี้ยนโบราณ กำแพงหินเก่าคร่ำคร่าประดับด้วยรูนเรืองแสงลึกลับ อากาศข้นหนืดด้วยพลังบางอย่างและเสียงหยดน้ำแว่วก้องจากเบื้องลึก คบเพลิงในมือสะบัดไหวสร้างเงาเต้นระยับราวกับมีชีวิต 

เบื้องหน้ามีสามเส้นทาง: ทางเดินแคบทางซ้ายที่เรืองแสงสีฟ้าเย็นเฉียบ ทางเดินกว้างตรงหน้าพร้อมลายแกะสลักโบราณบนผนัง และบันไดชันทางขวาที่ทอดลงสู่ความมืดมิด

คุณจะทำอย่างไรต่อไป?`,
  en: `You stand before an ancient dungeon, its stone walls lined with glowing runes. The air is thick with unseen power and the drip of water echoes from the depths. Your torch flickers, casting shadows that move like living things.

Ahead are three paths: a narrow corridor to the left tinted in icy blue light, a broad hallway etched with ancient carvings straight ahead, and a steep staircase descending into darkness on the right.

What will you do next?`,
};

export const INITIAL_CHOICES: LocalizedText[] = [
  { th: "เดินเข้าทางเดินแคบที่มีแสงสีฟ้า", en: "Enter the narrow, blue-lit passage" },
  { th: "เข้าสู่ทางเดินกว้างที่มีลายแกะสลัก", en: "Take the wide hall with carved walls" },
  { th: "ลงบันไดสู่ความมืด", en: "Head down the dark staircase" },
  { th: "ตรวจสอบรูนเรืองแสงให้ละเอียดก่อน", en: "Inspect the glowing runes first" },
];

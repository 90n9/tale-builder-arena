import { type LocalizedText } from "@/lib/i18n";

export type CharacterAttributes = {
  strength: number;
  intelligence: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  charisma: number;
};

export type CharacterSelection = {
  genre: string;
  race: string;
  class: string;
  attributes: CharacterAttributes;
};

export const CHARACTER_STORAGE_KEY = "taleBuilderCharacter";
export const END_SUMMARY_STORAGE_KEY = "taleBuilderEndSummary";
export const ATTRIBUTE_MAX_POINTS = 75;

export const getCharacterStorageKey = (slug: string) => `${CHARACTER_STORAGE_KEY}:${slug}`;
export const getEndSummaryStorageKey = (slug: string) => `${END_SUMMARY_STORAGE_KEY}:${slug}`;

export const createDefaultAttributes = (): CharacterAttributes => ({
  strength: 10,
  intelligence: 10,
  dexterity: 10,
  constitution: 10,
  wisdom: 10,
  charisma: 10,
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

export const races = [
  { name: "Human", description: { th: "ยืดหยุ่นและปรับตัวเก่ง", en: "Adaptable and resourceful" } },
  { name: "Elf", description: { th: "สง่างามและเปี่ยมปัญญา", en: "Graceful and wise" } },
  { name: "Dwarf", description: { th: "แข็งแรงและทรหด", en: "Sturdy and relentless" } },
  { name: "Orc", description: { th: "ทรงพลังและดุร้าย", en: "Powerful and fierce" } },
  { name: "Halfling", description: { th: "ว่องไวและโชคดี", en: "Quick-footed and lucky" } },
  { name: "Dragonborn", description: { th: "ทรงอำนาจจากสายเลือดโบราณ", en: "Ancient bloodline, great power" } },
];

export const classes = [
  { name: "Warrior", description: { th: "เชี่ยวชาญการต่อสู้ประชิดตัว", en: "Excels at close combat" } },
  { name: "Mage", description: { th: "จอมเวทผู้ควบคุมมนตร์", en: "Master of arcane power" } },
  { name: "Rogue", description: { th: "ลอบเร้นและชาญฉลาด", en: "Stealthy and cunning" } },
  { name: "Cleric", description: { th: "ผู้เยียวยาและพิทักษ์ด้วยพลังศักดิ์สิทธิ์", en: "Heals and shields with faith" } },
  { name: "Ranger", description: { th: "ผู้พิทักษ์แห่งธรรมชาติ", en: "Nature's vigilant guardian" } },
  { name: "Paladin", description: { th: "อัศวินศักดิ์สิทธิ์ผู้เที่ยงธรรม", en: "Holy knight of justice" } },
];

export const attributeLabels: Record<keyof CharacterAttributes, LocalizedText> = {
  strength: { th: "พละกำลัง", en: "Strength" },
  intelligence: { th: "สติปัญญา", en: "Intelligence" },
  dexterity: { th: "ความว่องไว", en: "Dexterity" },
  constitution: { th: "ความทนทาน", en: "Constitution" },
  wisdom: { th: "ปรีชาญาณ", en: "Wisdom" },
  charisma: { th: "เสน่ห์", en: "Charisma" },
};

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

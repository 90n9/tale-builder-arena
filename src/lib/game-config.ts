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
  { name: "High Fantasy", description: "ผจญภัยยิ่งใหญ่ในดินแดนเวทมนตร์" },
  { name: "Dark Fantasy", description: "แฟนตาซีเข้มข้นผสานสยองขวัญกอธิค" },
  { name: "Sci-Fi", description: "เทคโนโลยีอนาคตและการสำรวจอวกาศ" },
  { name: "Cyberpunk", description: "โลกดิสโทเปียเทคโนโลยีสูง ชีวิตต่ำ" },
  { name: "Horror", description: "เอาชีวิตรอดจากสิ่งลี้ลับน่าสะพรึง" },
  { name: "Post-Apocalyptic", description: "ดิ้นรนอยู่รอดในดินแดนร้างพินาศ" },
];

export const races = [
  { name: "Human", description: "ยืดหยุ่นและปรับตัวเก่ง" },
  { name: "Elf", description: "สง่างามและเปี่ยมปัญญา" },
  { name: "Dwarf", description: "แข็งแรงและทรหด" },
  { name: "Orc", description: "ทรงพลังและดุร้าย" },
  { name: "Halfling", description: "ว่องไวและโชคดี" },
  { name: "Dragonborn", description: "ทรงอำนาจจากสายเลือดโบราณ" },
];

export const classes = [
  { name: "Warrior", description: "เชี่ยวชาญการต่อสู้ประชิดตัว" },
  { name: "Mage", description: "จอมเวทผู้ควบคุมมนตร์" },
  { name: "Rogue", description: "ลอบเร้นและชาญฉลาด" },
  { name: "Cleric", description: "ผู้เยียวยาและพิทักษ์ด้วยพลังศักดิ์สิทธิ์" },
  { name: "Ranger", description: "ผู้พิทักษ์แห่งธรรมชาติ" },
  { name: "Paladin", description: "อัศวินศักดิ์สิทธิ์ผู้เที่ยงธรรม" },
];

export const attributeLabels: Record<keyof CharacterAttributes, string> = {
  strength: "พละกำลัง",
  intelligence: "สติปัญญา",
  dexterity: "ความว่องไว",
  constitution: "ความทนทาน",
  wisdom: "ปรีชาญาณ",
  charisma: "เสน่ห์",
};

export const INITIAL_NARRATION = `คุณยืนอยู่หน้าดันเจี้ยนโบราณ กำแพงหินเก่าคร่ำคร่าประดับด้วยรูนเรืองแสงลึกลับ อากาศข้นหนืดด้วยพลังบางอย่างและเสียงหยดน้ำแว่วก้องจากเบื้องลึก คบเพลิงในมือสะบัดไหวสร้างเงาเต้นระยับราวกับมีชีวิต 

เบื้องหน้ามีสามเส้นทาง: ทางเดินแคบทางซ้ายที่เรืองแสงสีฟ้าเย็นเฉียบ ทางเดินกว้างตรงหน้าพร้อมลายแกะสลักโบราณบนผนัง และบันไดชันทางขวาที่ทอดลงสู่ความมืดมิด

คุณจะทำอย่างไรต่อไป?`;

export const INITIAL_CHOICES = [
  "เดินเข้าทางเดินแคบที่มีแสงสีฟ้า",
  "เข้าสู่ทางเดินกว้างที่มีลายแกะสลัก",
  "ลงบันไดสู่ความมืด",
  "ตรวจสอบรูนเรืองแสงให้ละเอียดก่อน",
];

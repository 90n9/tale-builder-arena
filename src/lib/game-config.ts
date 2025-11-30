import { type LocalizedText } from '@/lib/i18n';

export type CharacterAttributes = Record<string, number>;

export type CharacterSelection = {
  genre: string;
  race: string;
  class: string;
  background: string;
  raceName?: string;
  className?: string;
  backgroundName?: string;
  attributes: CharacterAttributes;
};

export const CHARACTER_STORAGE_KEY = 'taleBuilderCharacter';
export const END_SUMMARY_STORAGE_KEY = 'taleBuilderEndSummary';

export const getCharacterStorageKey = (slug: string) => `${CHARACTER_STORAGE_KEY}:${slug}`;
export const getEndSummaryStorageKey = (slug: string) => `${END_SUMMARY_STORAGE_KEY}:${slug}`;

export const createDefaultAttributes = (
  baseAttributes?: Record<string, number>
): CharacterAttributes => ({
  ...(baseAttributes ?? {}),
});

export const createEmptyCharacter = (): CharacterSelection => ({
  genre: '',
  race: '',
  class: '',
  background: '',
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
  endingSceneId?: string | null;
  endingNarration?: string | null;
  endingImage?: string | null;
  endingTitle?: string | null;
  endingSummary?: string | null;
  endingResult?: string | null;
};

export const genres = [
  {
    name: 'High Fantasy',
    description: 'ผจญภัยยิ่งใหญ่ในดินแดนเวทมนตร์',
  },
  {
    name: 'Dark Fantasy',
    description: 'แฟนตาซีเข้มข้นผสานสยองขวัญกอธิค',
  },
  {
    name: 'Sci-Fi',
    description: 'เทคโนโลยีอนาคตและการสำรวจอวกาศ',
  },
  {
    name: 'Cyberpunk',
    description: 'โลกดิสโทเปียเทคโนโลยีสูง ชีวิตต่ำ',
  },
  { name: 'Horror', description: 'เอาชีวิตรอดจากสิ่งลี้ลับน่าสะพรึง' },
  {
    name: 'Post-Apocalyptic',
    description: 'ดิ้นรนอยู่รอดในดินแดนร้างพินาศ',
  },
];

export const INITIAL_NARRATION: LocalizedText = `คุณยืนอยู่หน้าดันเจี้ยนโบราณ กำแพงหินเก่าคร่ำคร่าประดับด้วยรูนเรืองแสงลึกลับ อากาศข้นหนืดด้วยพลังบางอย่างและเสียงหยดน้ำแว่วก้องจากเบื้องลึก คบเพลิงในมือสะบัดไหวสร้างเงาเต้นระยับราวกับมีชีวิต 

เบื้องหน้ามีสามเส้นทาง: ทางเดินแคบทางซ้ายที่เรืองแสงสีฟ้าเย็นเฉียบ ทางเดินกว้างตรงหน้าพร้อมลายแกะสลักโบราณบนผนัง และบันไดชันทางขวาที่ทอดลงสู่ความมืดมิด

คุณจะทำอย่างไรต่อไป?`;

export const INITIAL_CHOICES: LocalizedText[] = [
  'เดินเข้าทางเดินแคบที่มีแสงสีฟ้า',
  'เข้าสู่ทางเดินกว้างที่มีลายแกะสลัก',
  'ลงบันไดสู่ความมืด',
  'ตรวจสอบรูนเรืองแสงให้ละเอียดก่อน',
];

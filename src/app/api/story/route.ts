import { NextResponse } from "next/server";
import { randomAchievementForGenre } from "@/data/achievements";
import { type Language } from "@/lib/i18n";

type StoryRequest = {
  choice?: string;
  genre?: string;
  race?: string;
  className?: string;
  turn?: number;
  language?: Language;
};

const CHOICE_BANK: Record<Language, string[]> = {
  th: [
    "สำรวจห้องถัดไปอย่างระมัดระวัง",
    "จุดคบเพลิงเพิ่มเพื่อมองเส้นทาง",
    "หยิบผลึกเรืองแสงขึ้นตรวจสอบ",
    "ฟังเสียงก้องเพื่อหาทางออก",
    "ตั้งค่ายพักชั่วคราวและฟื้นพลัง",
    "โยนหินเพื่อทดสอบกับดัก",
    "ร่ายคาถาปกป้องตัวเอง",
  ],
  en: [
    "Carefully search the next room",
    "Light another torch to see ahead",
    "Examine the glowing crystal",
    "Listen to the echoes for an exit",
    "Make a quick camp to recover",
    "Toss a stone to test for traps",
    "Cast a protective spell",
  ],
};

const clampTurn = (turn: number) => Math.min(Math.max(turn, 1), 6);

function buildChoices(language: Language, currentChoice?: string) {
  const options = new Set<string>();
  if (currentChoice) {
    options.add(
      language === "en"
        ? `Confirm choice "${currentChoice}" and proceed`
        : `ยืนยันการเลือก "${currentChoice}" และดำเนินต่อ`,
    );
  }

  while (options.size < 4) {
    const fromBank = CHOICE_BANK[language] ?? CHOICE_BANK.th;
    const pick = fromBank[Math.floor(Math.random() * fromBank.length)];
    options.add(pick);
  }

  return Array.from(options);
}

export function GET() {
  return NextResponse.json({
    ok: true,
    message: "POST to this endpoint with { choice, genre, race, className, turn } to get a mock story update.",
  });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as StoryRequest;
  const { choice, genre, race, className, turn = 1 } = payload || {};
  const language: Language = payload.language === "en" ? "en" : "th";
  const nextTurn = clampTurn((turn || 1) + 1);

  const protagonist =
    [genre, race, className].filter(Boolean).join(" • ") ||
    (language === "en" ? "Unnamed adventurer" : "นักผจญภัยไร้ชื่อ");
  const pickedChoice = choice ?? (language === "en" ? "Explore the path ahead" : "สำรวจเส้นทางเบื้องหน้า");

  const narrationParts =
    language === "en"
      ? [
          `Your character (${protagonist}) chooses "${pickedChoice}".`,
          "The air trembles as wind carries whispers from deeper chambers.",
          "Your steps echo down the hall while glowing carvings answer the surrounding magic.",
          nextTurn >= 4
            ? "Power in the dungeon peaks, as if something is weighing your fate."
            : "New paths reveal themselves like the dungeon is testing your resolve.",
        ]
      : [
          `ตัวละครของคุณ (${protagonist}) ตัดสินใจ "${pickedChoice}".`,
          "อากาศรอบตัวสั่นไหว เสียงลมพัดพาคำกระซิบจากห้องลึกยิ่งกว่าเดิม.",
          "เสียงก้าวเท้าของคุณสะท้อนในโถงยาวพร้อมรอยสลักที่เรืองแสงตอบรับพลังเวท.",
          nextTurn >= 4
            ? "พลังงานในดันเจี้ยนพุ่งถึงจุดสูงสุด เหมือนบางสิ่งกำลังตัดสินชะตาของคุณ."
            : "เส้นทางใหม่เผยตัวราวกับดันเจี้ยนกำลังทดสอบความกล้าของคุณ.",
        ];

  const narration = narrationParts.join(" ");

  const choices = buildChoices(language, choice);
  const shouldEnd = nextTurn >= 4;
  const achievement = shouldEnd ? randomAchievementForGenre(genre) : null;

  return NextResponse.json({
    turn: nextTurn,
    narration,
    choices,
    shouldEnd,
    achievementId: achievement?.id ?? null,
  });
}

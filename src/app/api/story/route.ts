import { NextResponse } from "next/server";
import { randomAchievementForGenre } from "@/data/achievements";

type StoryRequest = {
  choice?: string;
  genre?: string;
  race?: string;
  className?: string;
  turn?: number;
};

const CHOICE_BANK = [
  "สำรวจห้องถัดไปอย่างระมัดระวัง",
  "จุดคบเพลิงเพิ่มเพื่อมองเส้นทาง",
  "หยิบผลึกเรืองแสงขึ้นตรวจสอบ",
  "ฟังเสียงก้องเพื่อหาทางออก",
  "ตั้งค่ายพักชั่วคราวและฟื้นพลัง",
  "โยนหินเพื่อทดสอบกับดัก",
  "ร่ายคาถาปกป้องตัวเอง",
];

const clampTurn = (turn: number) => Math.min(Math.max(turn, 1), 6);

function buildChoices(currentChoice?: string) {
  const options = new Set<string>();
  if (currentChoice) {
    options.add(`ยืนยันการเลือก "${currentChoice}" และดำเนินต่อ`);
  }

  while (options.size < 4) {
    const pick = CHOICE_BANK[Math.floor(Math.random() * CHOICE_BANK.length)];
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
  const nextTurn = clampTurn((turn || 1) + 1);

  const protagonist = [genre, race, className].filter(Boolean).join(" • ") || "นักผจญภัยไร้ชื่อ";
  const pickedChoice = choice ?? "สำรวจเส้นทางเบื้องหน้า";

  const narration = [
    `ตัวละครของคุณ (${protagonist}) ตัดสินใจ "${pickedChoice}".`,
    "อากาศรอบตัวสั่นไหว เสียงลมพัดพาคำกระซิบจากห้องลึกยิ่งกว่าเดิม.",
    "เสียงก้าวเท้าของคุณสะท้อนในโถงยาวพร้อมรอยสลักที่เรืองแสงตอบรับพลังเวท.",
    nextTurn >= 4
      ? "พลังงานในดันเจี้ยนพุ่งถึงจุดสูงสุด เหมือนบางสิ่งกำลังตัดสินชะตาของคุณ."
      : "เส้นทางใหม่เผยตัวราวกับดันเจี้ยนกำลังทดสอบความกล้าของคุณ.",
  ].join(" ");

  const choices = buildChoices(choice);
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

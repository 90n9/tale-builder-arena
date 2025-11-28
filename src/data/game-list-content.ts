import { type LocalizedText } from "@/lib/i18n";

export const gameListContent = {
  badge: { th: "เลือกสนามผจญภัย", en: "Choose your arena" },
  title: { th: "เลือกเรื่องราวที่อยากเล่น", en: "Pick a story to play" },
  subtitle: {
    th: "แต่ละแคมเปญถูกสร้างขึ้นให้มีโทนและความยากต่างกัน เลือกโลกที่ถูกใจแล้วไปตั้งค่าตัวละครก่อนออกเดินทาง",
    en: "Each campaign has its own tone and challenge. Choose your world, then set your character before heading out.",
  },
  setup: { th: "ดูรายละเอียด", en: "View details" },
  continue: { th: "เล่นต่อจากเดิม", en: "Continue your journey" },
  startOver: { th: "เริ่มใหม่", en: "Start over" },
} satisfies Record<string, LocalizedText>;

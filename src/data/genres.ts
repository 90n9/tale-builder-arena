import { type LocalizedText } from "@/lib/i18n";

const GENRE_LABELS: Record<string, LocalizedText> = {
  fantasy_dungeon: { th: "ดันเจี้ยนแฟนตาซี", en: "Fantasy Dungeon" },
  comedy_fantasy: { th: "แฟนตาซีสายฮา", en: "Comedy Fantasy" },
};

export const getGenreLabel = (genre: string): LocalizedText =>
  GENRE_LABELS[genre] ?? { th: genre, en: genre };

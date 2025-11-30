import { type LocalizedText } from '@/lib/i18n';

const GENRE_LABELS: Record<string, LocalizedText> = {
  fantasy_dungeon: 'ดันเจี้ยนแฟนตาซี',
  comedy_fantasy: 'แฟนตาซีสายฮา',
};

export const getGenreLabel = (genre: string): LocalizedText => GENRE_LABELS[genre] ?? genre;

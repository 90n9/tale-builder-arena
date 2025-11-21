import { type LocalizedText } from "@/lib/i18n";
import { getGenreLabel } from "@/data/genres";
import cryptOfTheShatteredStar from "./game-content/crypt_of_the_shattered_star/crypt_of_the_shattered_star.json";
import yaitongdeeDungeon from "./game-content/yaitongdee_dungeon/yaitongdee_dungeon.json";

type GameContent = {
  game_id: string;
  metadata: {
    title: LocalizedText;
    subtitle: LocalizedText;
    genre: string;
    description: LocalizedText;
    cover_image: string;
    estimated_play_time: string;
  };
};

export type GameStory = {
  slug: string;
  genre: string;
  genreLabel: LocalizedText;
  title: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  tone: LocalizedText;
  length: LocalizedText;
  highlights: LocalizedText[];
  coverImage: string;
};

const GAME_CONTENTS: GameContent[] = [cryptOfTheShatteredStar, yaitongdeeDungeon];

const CUSTOM_GAME_DETAILS: Record<
  string,
  { tone: LocalizedText; highlights: LocalizedText[]; lengthTh?: string }
> = {
  crypt_of_the_shattered_star: {
    tone: {
      th: "ดันเจี้ยนเลือกเส้นทาง • เวทมนตร์เข้มข้น",
      en: "Branching dungeon • Arcane peril",
    },
    highlights: [
      { th: "เช็คค่าสเตตัสและโบนัสระหว่างฉาก", en: "Attribute checks and rewards mid-run" },
      { th: "เส้นทางสำรวจได้หลายทางเลือก", en: "Multiple exploration routes" },
      { th: "ฉากจบ 6 แบบ", en: "Six unique endings" },
    ],
    lengthTh: "15-25 นาที",
  },
  yaitongdee_dungeon: {
    tone: {
      th: "แฟนตาซีสายฮาใต้ร้านชำไทย",
      en: "Comedy fantasy under a Thai corner shop",
    },
    highlights: [
      { th: "กับดักปลากระป๋องและตู้เย็นพูดได้", en: "Canned-fish traps and a talking fridge" },
      { th: "โทนขำขัน ล้อวัฒนธรรมไทย", en: "Humorous Thai neighborhood vibes" },
      { th: "ฉากจบ 6 แบบ", en: "Six playful endings" },
    ],
    lengthTh: "10-20 นาที",
  },
};

const buildLengthText = (playTime: string, thAlt?: string): LocalizedText => ({
  en: playTime,
  th: thAlt ?? playTime,
});

export const GAME_STORIES: GameStory[] = GAME_CONTENTS.map((content) => {
  const extras = CUSTOM_GAME_DETAILS[content.game_id];
  return {
    slug: content.game_id,
    genre: content.metadata.genre,
    genreLabel: getGenreLabel(content.metadata.genre),
    title: content.metadata.title,
    tagline: content.metadata.subtitle,
    description: content.metadata.description,
    tone: extras?.tone ?? getGenreLabel(content.metadata.genre),
    length: buildLengthText(content.metadata.estimated_play_time, extras?.lengthTh),
    highlights: extras?.highlights ?? [],
    coverImage: content.metadata.cover_image,
  };
});

export const findGameBySlug = (slug: string) => GAME_STORIES.find((game) => game.slug === slug);

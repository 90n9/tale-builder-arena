import { type LocalizedText } from "@/lib/i18n";
import { getGenreLabel } from "@/data/genres";
import cryptOfTheShatteredStar from "./game-content/crypt_of_the_shattered_star/crypt_of_the_shattered_star.json";
import yaitongdeeDungeon from "./game-content/yaitongdee_dungeon/yaitongdee_dungeon.json";

type GameContent = {
  game_id: string;
  metadata: {
    title: string;
    subtitle: string;
    genre: string;
    description: string;
    cover_image: string;
    estimated_play_time: string;
  };
};

export type GameStory = {
  slug: string;
  genre: string;
  genreLabel: string;
  title: string;
  tagline: string;
  description: string;
  tone: string;
  length: string;
  highlights: string[];
  coverImage: string;
};

const GAME_CONTENTS: GameContent[] = [cryptOfTheShatteredStar, yaitongdeeDungeon];

const CUSTOM_GAME_DETAILS: Record<
  string,
  { tone: string; highlights: string[]; lengthTh?: string }
> = {
  crypt_of_the_shattered_star: {
    tone: "ดันเจี้ยนเลือกเส้นทาง • เวทมนตร์เข้มข้น",
    highlights: [
      "เช็คค่าสเตตัสและโบนัสระหว่างฉาก",
      "เส้นทางสำรวจได้หลายทางเลือก",
      "ฉากจบ 6 แบบ",
    ],
    lengthTh: "15-25 นาที",
  },
  yaitongdee_dungeon: {
    tone: "แฟนตาซีสายฮาใต้ร้านชำไทย",
    highlights: [
      "กับดักปลากระป๋องและตู้เย็นพูดได้",
      "โทนขำขัน ล้อวัฒนธรรมไทย",
      "ฉากจบ 6 แบบ",
    ],
    lengthTh: "10-20 นาที",
  },
};

const buildLengthText = (playTime: string, thAlt?: string): string => thAlt ?? playTime;

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

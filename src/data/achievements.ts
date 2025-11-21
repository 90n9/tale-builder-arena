import { type LocalizedText } from "@/lib/i18n";
import { getGenreLabel } from "@/data/genres";
import cryptOfTheShatteredStar from "./game-content/crypt_of_the_shattered_star/crypt_of_the_shattered_star.json";
import yaitongdeeDungeon from "./game-content/yaitongdee_dungeon/yaitongdee_dungeon.json";

type GameContent = {
  game_id: string;
  metadata: {
    genre: string;
  };
  endings: Record<
    string,
    {
      ending_id: string;
      title: LocalizedText;
      summary: LocalizedText;
    }
  >;
};
type Ending = GameContent["endings"][string];

export interface Achievement {
  id: string;
  gameId: string;
  name: LocalizedText;
  description: LocalizedText;
  genre: string;
  genreLabel: LocalizedText;
  endSceneType: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const GAME_CONTENTS: GameContent[] = [cryptOfTheShatteredStar, yaitongdeeDungeon];

const rarityByEnding: Record<string, Achievement["rarity"]> = {
  "crypt_of_the_shattered_star:ending_1": "common",
  "crypt_of_the_shattered_star:ending_2": "rare",
  "crypt_of_the_shattered_star:ending_3": "rare",
  "crypt_of_the_shattered_star:ending_4": "legendary",
  "crypt_of_the_shattered_star:ending_5": "epic",
  "crypt_of_the_shattered_star:ending_6": "rare",
  "yaitongdee_dungeon:ending_1": "common",
  "yaitongdee_dungeon:ending_2": "rare",
  "yaitongdee_dungeon:ending_3": "rare",
  "yaitongdee_dungeon:ending_4": "epic",
  "yaitongdee_dungeon:ending_5": "legendary",
  "yaitongdee_dungeon:ending_6": "epic",
};

const buildAchievementId = (gameId: string, endingId: string) => `${gameId}-${endingId}`;

const convertEndingToAchievement = (game: GameContent, ending: Ending): Achievement => {
  const key = `${game.game_id}:${ending.ending_id}`;
  return {
    id: buildAchievementId(game.game_id, ending.ending_id),
    gameId: game.game_id,
    name: ending.title,
    description: ending.summary,
    genre: game.metadata.genre,
    genreLabel: getGenreLabel(game.metadata.genre),
    endSceneType: ending.ending_id,
    rarity: rarityByEnding[key] ?? "rare",
  };
};

export const ALL_ACHIEVEMENTS: Achievement[] = GAME_CONTENTS.flatMap((game) =>
  Object.values(game.endings).map((ending) => convertEndingToAchievement(game, ending)),
);

export function findAchievementById(id: string) {
  return ALL_ACHIEVEMENTS.find((achievement) => achievement.id === id);
}

export function randomAchievementForGenre(genre?: string) {
  const pool = genre ? ALL_ACHIEVEMENTS.filter((achievement) => achievement.genre === genre) : ALL_ACHIEVEMENTS;
  if (!pool.length) {
    return null;
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

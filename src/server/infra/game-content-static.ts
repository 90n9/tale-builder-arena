import cryptOfTheShatteredStar from '@/data/game-content/crypt_of_the_shattered_star/crypt_of_the_shattered_star.json';
import yaitongdeeDungeon from '@/data/game-content/yaitongdee_dungeon/yaitongdee_dungeon.json';
import { findGameSetupById } from '@/data/game-content';
import { type GameContentGateway, type StoryGameContent } from '@/server/ports/game-content';

const STORY_GAMES: Record<string, StoryGameContent> = {
  [cryptOfTheShatteredStar.game_id]: cryptOfTheShatteredStar as StoryGameContent,
  [yaitongdeeDungeon.game_id]: yaitongdeeDungeon as StoryGameContent,
};

const DEFAULT_GAME_ID = cryptOfTheShatteredStar.game_id;

export const staticGameContentGateway: GameContentGateway = {
  findStoryGameById(id: string) {
    return STORY_GAMES[id] ?? null;
  },
  findSetupById(id: string) {
    return findGameSetupById(id) ?? null;
  },
  getDefaultStoryGame() {
    return STORY_GAMES[DEFAULT_GAME_ID];
  },
};

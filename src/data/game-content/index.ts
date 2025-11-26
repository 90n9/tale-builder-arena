import cryptOfTheShatteredStar from "./crypt_of_the_shattered_star/crypt_of_the_shattered_star.json";
import yaitongdeeDungeon from "./yaitongdee_dungeon/yaitongdee_dungeon.json";
import { type LocalizedText } from "@/lib/i18n";

type AttributeBonus = Record<string, number>;

export type GameSetupContent = {
  game_id: string;
  metadata: {
    genre: string;
    cover_image?: string;
  };
  config: {
    starting_attributes: {
      points_to_distribute: number;
      base_values: Record<string, number>;
    };
    asset_paths?: {
      images?: string;
      videos?: string;
    };
  };
  races: Array<{
    id: string;
    name: LocalizedText;
    description: LocalizedText;
    attribute_bonus?: AttributeBonus;
  }>;
  classes: Array<{
    id: string;
    name: LocalizedText;
    description: LocalizedText;
    starting_bonus?: AttributeBonus;
  }>;
  backgrounds: Array<{
    id: string;
    name: LocalizedText;
    description: LocalizedText;
    bonus_attributes?: AttributeBonus;
  }>;
  attributes: Array<{
    id: string;
    name: LocalizedText;
  }>;
};

const GAME_CONTENTS: GameSetupContent[] = [cryptOfTheShatteredStar, yaitongdeeDungeon];

export const findGameSetupById = (id: string) => GAME_CONTENTS.find((game) => game.game_id === id);

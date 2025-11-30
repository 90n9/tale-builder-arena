import cryptOfTheShatteredStar from './crypt_of_the_shattered_star/crypt_of_the_shattered_star.json';
import yaitongdeeDungeon from './yaitongdee_dungeon/yaitongdee_dungeon.json';

type AttributeBonus = Record<string, number>;

export type GameSetupContent = {
  game_id: string;
  version: string;
  metadata: {
    title: string;
    subtitle: string;
    genre: string;
    description: string;
    cover_image: string;
    author: string;
  };
  config: {
    starting_attributes: {
      points_to_distribute: number;
      base_values: Record<string, number>;
    };
    asset_paths: {
      images: string;
      videos: string;
    };
    ui: {
      theme_color: string;
      text_speed: string;
    };
  };
  races: Array<{
    id: string;
    name: string;
    description: string;
    attribute_bonus?: AttributeBonus;
  }>;
  classes: Array<{
    id: string;
    name: string;
    description: string;
    starting_bonus?: AttributeBonus;
  }>;
  backgrounds: Array<{
    id: string;
    name: string;
    description: string;
    bonus_attributes?: AttributeBonus;
  }>;
  attributes: Array<{
    id: string;
    name: string;
  }>;
};

const GAME_CONTENTS: GameSetupContent[] = [cryptOfTheShatteredStar, yaitongdeeDungeon];

export const findGameSetupById = (id: string) => GAME_CONTENTS.find((game) => game.game_id === id);

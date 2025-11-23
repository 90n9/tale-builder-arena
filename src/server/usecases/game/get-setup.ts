import { type GameContentGateway } from "@/server/ports/game-content";
import { type LocalizedText } from "@/lib/i18n";

export type GetSetupRequest = {
  gameId: string;
  raceId?: string | null;
  classId?: string | null;
  backgroundId?: string | null;
};

export type GetSetupResult =
  | { kind: "not_found" }
  | {
      kind: "success";
      body: {
        gameId: string;
        races: Array<{ id: string; name: LocalizedText; description: LocalizedText }>;
        classes: Array<{ id: string; name: LocalizedText; description: LocalizedText }>;
        backgrounds: Array<{ id: string; name: LocalizedText; description: LocalizedText }>;
        attributes: Array<{ id: string; name: LocalizedText }>;
        baseAttributes: Record<string, number>;
        pointsToDistribute: number;
      };
    };

export type GetSetupDeps = {
  gameContent: GameContentGateway;
};

const combineAttributeBonuses = (
  base: Record<string, number>,
  bonuses: Array<Record<string, number> | undefined>,
  attributeIds: string[],
) => {
  const combined = attributeIds.reduce<Record<string, number>>((acc, id) => {
    acc[id] = base[id] ?? 0;
    return acc;
  }, {});

  bonuses.forEach((bonus) => {
    if (!bonus) return;
    Object.entries(bonus).forEach(([key, value]) => {
      if (typeof value !== "number") return;
      combined[key] = (combined[key] ?? 0) + value;
    });
  });

  return combined;
};

export const getGameSetup = (request: GetSetupRequest, deps: GetSetupDeps): GetSetupResult => {
  const game = deps.gameContent.findSetupById(request.gameId);

  if (!game) {
    return { kind: "not_found" };
  }

  const raceBonus = game.races.find((race) => race.id === request.raceId)?.attribute_bonus;
  const classBonus = game.classes.find((cls) => cls.id === request.classId)?.starting_bonus;
  const backgroundBonus = game.backgrounds.find((bg) => bg.id === request.backgroundId)?.bonus_attributes;

  const baseAttributes = combineAttributeBonuses(
    game.config.starting_attributes.base_values,
    [raceBonus, classBonus, backgroundBonus],
    game.attributes.map((attr) => attr.id),
  );

  return {
    kind: "success",
    body: {
      gameId: game.game_id,
      races: game.races.map(({ attribute_bonus, ...rest }) => rest),
      classes: game.classes.map(({ starting_bonus, ...rest }) => rest),
      backgrounds: game.backgrounds.map(({ bonus_attributes, ...rest }) => rest),
      attributes: game.attributes,
      baseAttributes,
      pointsToDistribute: game.config.starting_attributes.points_to_distribute,
    },
  };
};

import { describe, expect, it } from "vitest";

import { type GameContentGateway } from "@/server/ports/game-content";
import { getGameSetup } from "./get-setup";

const game = {
  game_id: "game-1",
  metadata: { genre: "fantasy" },
  config: {
    starting_attributes: {
      points_to_distribute: 5,
      base_values: { str: 1, agi: 1 },
    },
  },
  races: [
    { id: "human", name: { th: "มนุษย์", en: "Human" }, description: { th: "คน", en: "Human" }, attribute_bonus: { str: 1 } },
  ],
  classes: [
    { id: "warrior", name: { th: "นักรบ", en: "Warrior" }, description: { th: "ต่อสู้", en: "Fighter" }, starting_bonus: { agi: 2 } },
  ],
  backgrounds: [
    { id: "noble", name: { th: "ขุนนาง", en: "Noble" }, description: { th: "สูงศักดิ์", en: "Noble" }, bonus_attributes: { str: 1 } },
  ],
  attributes: [
    { id: "str", name: { th: "พลัง", en: "Strength" } },
    { id: "agi", name: { th: "คล่องตัว", en: "Agility" } },
  ],
};

const gateway: GameContentGateway = {
  findSetupById(id: string) {
    return id === game.game_id ? (game as any) : null;
  },
  findStoryGameById() {
    return null;
  },
  getDefaultStoryGame() {
    return game as any;
  },
};

describe("getGameSetup use case", () => {
  it("returns not_found for missing game", () => {
    const result = getGameSetup({ gameId: "missing" }, { gameContent: gateway });
    expect(result.kind).toBe("not_found");
  });

  it("combines bonuses and omits bonus fields from payloads", () => {
    const result = getGameSetup(
      { gameId: "game-1", raceId: "human", classId: "warrior", backgroundId: "noble" },
      { gameContent: gateway },
    );

    expect(result.kind).toBe("success");
    if (result.kind === "success") {
      expect(result.body.baseAttributes).toEqual({ str: 3, agi: 3 });
      expect(result.body.races[0]).not.toHaveProperty("attribute_bonus");
      expect(result.body.classes[0]).not.toHaveProperty("starting_bonus");
      expect(result.body.backgrounds[0]).not.toHaveProperty("bonus_attributes");
    }
  });

  it("handles missing bonus inputs without crashing", () => {
    const result = getGameSetup(
      { gameId: "game-1", raceId: "unknown", classId: null, backgroundId: undefined },
      { gameContent: gateway },
    );

    expect(result.kind).toBe("success");
    if (result.kind === "success") {
      expect(result.body.baseAttributes).toEqual({ str: 1, agi: 1 });
    }
  });
});

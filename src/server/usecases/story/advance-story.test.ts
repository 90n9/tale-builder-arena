import { describe, expect, it } from "vitest";

import { type GameContentGateway } from "@/server/ports/game-content";
import { advanceStory } from "./advance-story";

const mockGameContent = {
  game_id: "mock-game",
  metadata: { genre: "fantasy", cover_image: "/assets/mock/cover.png" },
  config: {
    starting_attributes: { points_to_distribute: 0, base_values: {} },
    asset_paths: { images: "/assets/mock" },
  },
  races: [],
  classes: [],
  backgrounds: [],
  attributes: [],
  scenes: {
    start: {
      scene_id: "start",
      title: "เริ่ม",
      description: "เริ่มเกม",
      image: "start.png",
      choices: [
        { text: "ไป A", next: "scene_a" },
        { text: "ไป จบ", next: "ending_1" },
      ],
    },
    scene_a: {
      scene_id: "scene_a",
      title: "ฉาก เอ",
      description: "ทางเลือก",
      image: "/scene-a.png",
      choices: [
        {
          text: "ต้องเป็นเมจ",
          next: "scene_b",
          requirements: { classes: ["mage"] },
          on_fail_next: "scene_fail",
        },
      ],
    },
    scene_fail: {
      scene_id: "scene_fail",
      title: "ล้มเหลว",
      description: "ไม่ผ่านเงื่อนไข",
      choices: [],
    },
    no_image: {
      scene_id: "no_image",
      title: "ไม่มีรูป",
      description: "ใช้ภาพหน้าปก",
      choices: [],
    },
  },
  endings: {
    ending_1: {
      ending_id: "ending_1",
      title: "จบ",
      summary: "สรุป",
      result: "ผลลัพธ์",
      image: "ending.png",
    },
  },
} as const;

const gameGateway: GameContentGateway = {
  findStoryGameById(id: string) {
    return id === mockGameContent.game_id ? mockGameContent : null;
  },
  getDefaultStoryGame() {
    return mockGameContent;
  },
  findSetupById() {
    return null;
  },
};

describe("advanceStory use case", () => {
  it("returns game_not_found for unknown game", () => {
    const result = advanceStory({ gameId: "missing" }, null as any);
    expect(result.kind).toBe("game_not_found");
  });

  it("returns start scene when no selection is provided", () => {
    const result = advanceStory({ gameId: mockGameContent.game_id }, mockGameContent);
    expect(result.kind).toBe("success");
    expect(result.kind === "success" && result.body.sceneId).toBe("start");
    expect(result.kind === "success" && result.body.shouldEnd).toBe(false);
    expect(result.kind === "success" && result.body.choices).toHaveLength(2);
    expect(result.kind === "success" && result.body.image).toBe("/assets/mock/start.png");
  });

  it("routes to on_fail_next when requirements are not met", () => {
    const result = advanceStory(
      {
        gameId: mockGameContent.game_id,
        currentSceneId: "scene_a",
        selectedChoiceId: "scene_b",
        character: { classId: "warrior" },
      },
      mockGameContent,
    );

    expect(result.kind).toBe("success");
    if (result.kind === "success") {
      expect(result.body.sceneId).toBe("scene_fail");
      expect(result.body.shouldEnd).toBe(false);
    }
  });

  it("returns scene_not_found when no matching scene or fallback exists", () => {
    const emptyGame: (typeof mockGameContent) & { scenes: Record<string, never> } = {
      ...mockGameContent,
      scenes: {},
    };
    const result = advanceStory(
      {
        gameId: emptyGame.game_id,
        currentSceneId: "missing",
        selectedChoiceId: "nowhere",
      },
      emptyGame,
    );

    expect(result.kind).toBe("scene_not_found");
  });

  it("returns an ending payload when reaching an ending", () => {
    const result = advanceStory(
      {
        gameId: mockGameContent.game_id,
        currentSceneId: "start",
        selectedChoiceId: "ending_1",
      },
      mockGameContent,
    );

    expect(result.kind).toBe("success");
    if (result.kind === "success") {
      expect(result.body.sceneId).toBe("ending_1");
      expect(result.body.shouldEnd).toBe(true);
      expect(result.body.achievementId).toBe("mock-game-ending_1");
      expect(result.body.image).toBe("/assets/mock/ending.png");
    }
  });

  it("falls back to cover image when scene image is missing", () => {
    const result = advanceStory(
      {
        gameId: mockGameContent.game_id,
        currentSceneId: "no_image",
      },
      mockGameContent,
    );

    expect(result.kind).toBe("success");
    if (result.kind === "success") {
      expect(result.body.image).toBe("/assets/mock/cover.png");
    }
  });
});

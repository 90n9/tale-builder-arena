import { describe, expect, it, vi } from "vitest";
import { GET as getStory, POST as postStory } from "./route";
import * as advanceStoryUsecase from "@/server/usecases/story/advance-story";

describe("GET /api/story", () => {
  it("returns usage instructions", async () => {
    const response = await getStory();

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.message).toContain("POST to this endpoint");
  });
});

describe("POST /api/story", () => {
  it("returns the start scene when no choice is provided", async () => {
    const request = new Request("http://localhost/api/story", {
      method: "POST",
      body: JSON.stringify({
        gameId: "crypt_of_the_shattered_star",
        language: "en",
      }),
    });

    const response = await postStory(request);

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.sceneId).toBe("start");
    expect(body.narration).toContain("The Forgotten Steps");
    expect(body.choices).toHaveLength(2);
    expect(body.shouldEnd).toBe(false);
    expect(body.image).toBeTruthy();
  });

  it("returns 400 when the game is missing", async () => {
    const request = new Request("http://localhost/api/story", {
      method: "POST",
      body: JSON.stringify({
        gameId: "missing-game",
      }),
    });

    const response = await postStory(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.message).toBe("Game not found");
  });

  it("uses requirements to route to fail scenes", async () => {
    const request = new Request("http://localhost/api/story", {
      method: "POST",
      body: JSON.stringify({
        gameId: "crypt_of_the_shattered_star",
        currentSceneId: "scene_2",
        selectedChoiceId: "scene_5",
        language: "en",
        character: {
          classId: "warrior",
          attributes: { agi: 1 },
        },
      }),
    });

    const response = await postStory(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.sceneId).toBe("scene_6");
    expect(body.shouldEnd).toBe(false);
  });

  it("returns an ending when the chosen path leads to one", async () => {
    const request = new Request("http://localhost/api/story", {
      method: "POST",
      body: JSON.stringify({
        gameId: "crypt_of_the_shattered_star",
        currentSceneId: "start",
        selectedChoiceId: "ending_1",
        language: "en",
      }),
    });

    const response = await postStory(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.sceneId).toBe("ending_1");
    expect(body.shouldEnd).toBe(true);
    expect(body.narration).toContain("The Road Not Taken");
    expect(body.achievementId).toBe("crypt_of_the_shattered_star-ending_1");
    expect(body.image).toBeTruthy();
  });

  it("returns 404 when next scene cannot be resolved", async () => {
    const advanceSpy = vi.spyOn(advanceStoryUsecase, "advanceStory").mockReturnValue({
      kind: "scene_not_found",
    });

    const request = new Request("http://localhost/api/story", {
      method: "POST",
      body: JSON.stringify({
        gameId: "crypt_of_the_shattered_star",
        currentSceneId: "nonexistent_scene",
        selectedChoiceId: "still_missing",
      }),
    });

    const response = await postStory(request);
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.message).toBe("Scene not found");
    advanceSpy.mockRestore();
  });
});

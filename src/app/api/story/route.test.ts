import { afterEach, describe, expect, it, vi } from "vitest";
import { GET as getStory, POST as postStory } from "./route";

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
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("advances the turn and returns unique choices", async () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4)
      .mockReturnValue(0.6);

    const request = new Request("http://localhost/api/story", {
      method: "POST",
      body: JSON.stringify({
        choice: "Examine the mural",
        genre: "fantasy_dungeon",
        race: "elf",
        className: "mage",
        turn: 1,
        language: "en",
      }),
    });

    const response = await postStory(request);

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.turn).toBe(2);
    expect(body.shouldEnd).toBe(false);
    expect(body.narration).toContain("Your character (fantasy_dungeon");
    expect(body.choices).toHaveLength(4);
    expect(new Set(body.choices).size).toBe(4);
    expect(body.choices).toContain('Confirm choice "Examine the mural" and proceed');
    expect(body.achievementId).toBeNull();
  });

  it("caps the run and returns an achievement on the final turn", async () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6)
      .mockReturnValue(0);

    const request = new Request("http://localhost/api/story", {
      method: "POST",
      body: JSON.stringify({
        genre: "fantasy_dungeon",
        turn: 5,
        language: "en",
      }),
    });

    const response = await postStory(request);

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.turn).toBe(6);
    expect(body.shouldEnd).toBe(true);
    expect(body.achievementId).toBe("crypt_of_the_shattered_star-ending_1");
  });
});

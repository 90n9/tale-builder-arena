import { NextResponse } from "next/server";
import { randomAchievementForGenre } from "@/data/achievements";
import cryptOfTheShatteredStar from "@/data/game-content/crypt_of_the_shattered_star/crypt_of_the_shattered_star.json";
import yaitongdeeDungeon from "@/data/game-content/yaitongdee_dungeon/yaitongdee_dungeon.json";
import { getLocalizedText, type Language, type LocalizedText } from "@/lib/i18n";

type StoryRequest = {
  gameId?: string;
  currentSceneId?: string;
  selectedChoiceId?: string;
  turn?: number;
  language?: Language;
  character?: {
    classId?: string;
    raceId?: string;
    attributes?: Record<string, number>;
  };
};

type GameContent = typeof cryptOfTheShatteredStar | typeof yaitongdeeDungeon;

type ChoiceRequirement = {
  classes?: string[];
  min_attributes?: Record<string, number>;
};

type StoryChoice = {
  text: LocalizedText;
  next: string;
  requirements?: ChoiceRequirement;
  on_fail_next?: string;
};

type StoryScene = {
  scene_id: string;
  title: LocalizedText;
  description: LocalizedText;
  choices: StoryChoice[];
};

type StoryEnding = {
  ending_id: string;
  title: LocalizedText;
  summary: LocalizedText;
  result: LocalizedText;
};

const GAME_CONTENTS: Record<string, GameContent> = {
  [cryptOfTheShatteredStar.game_id]: cryptOfTheShatteredStar,
  [yaitongdeeDungeon.game_id]: yaitongdeeDungeon,
};

export function GET() {
  return NextResponse.json({
    ok: true,
    message: "POST to this endpoint with { gameId, currentSceneId, selectedChoiceId, language, character } to get the next scene.",
  });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as StoryRequest;
  const language: Language = payload.language === "en" ? "en" : "th";
  const gameId = payload.gameId ?? cryptOfTheShatteredStar.game_id;
  const game = GAME_CONTENTS[gameId];
  const buildChoiceId = (sceneId: string, index: number, choice: StoryChoice) => `${sceneId}::${index}::${choice.next}`;

  if (!game) {
    return NextResponse.json({ message: "Game not found" }, { status: 400 });
  }

  const turn = typeof payload.turn === "number" && payload.turn > 0 ? payload.turn : 0;
  const nextTurn = payload.selectedChoiceId ? turn + 1 : Math.max(turn, 1);

  const findScene = (sceneId: string | undefined): StoryScene | null => {
    if (!sceneId) return null;
    return (game.scenes as Record<string, StoryScene>)[sceneId] ?? null;
  };

  const findEnding = (endingId: string | undefined): StoryEnding | null => {
    if (!endingId) return null;
    return (game.endings as Record<string, StoryEnding>)[endingId] ?? null;
  };

  const meetsRequirements = (requirements: ChoiceRequirement | undefined) => {
    if (!requirements) return true;

    const { classId, attributes } = payload.character || {};

    if (requirements.classes && requirements.classes.length > 0) {
      if (!classId || !requirements.classes.includes(classId)) {
        return false;
      }
    }

    if (requirements.min_attributes) {
      const entries = Object.entries(requirements.min_attributes);
      for (const [key, minimum] of entries) {
        const current = attributes?.[key] ?? 0;
        if (current < minimum) return false;
      }
    }

    return true;
  };

  const resolveNextTarget = () => {
    const { currentSceneId, selectedChoiceId } = payload;
    if (!selectedChoiceId) {
      return currentSceneId || "start";
    }

    const scene = findScene(currentSceneId);
    if (!scene) return "start";

    const choice = scene.choices
      .map((item, index) => ({
        item,
        id: buildChoiceId(scene.scene_id, index, item),
      }))
      .find(({ item, id }) => item.next === selectedChoiceId || id === selectedChoiceId)?.item ?? scene.choices[0];
    if (!choice) return selectedChoiceId;

    const meets = meetsRequirements(choice.requirements);
    if (!meets && choice.on_fail_next) {
      return choice.on_fail_next;
    }

    return choice.next;
  };

  const targetId = resolveNextTarget();
  const targetScene = findScene(targetId);
  const ending = findEnding(targetId);

  if (ending) {
    const title = getLocalizedText(ending.title, language);
    const summary = getLocalizedText(ending.summary, language);
    const result = getLocalizedText(ending.result, language);

    const achievementId = `${gameId}-${ending.ending_id}`;

    return NextResponse.json({
      turn: nextTurn,
      sceneId: ending.ending_id,
      narration: [title, summary, result].join("\n\n"),
      choices: [],
      shouldEnd: true,
      achievementId,
    });
  }

  const safeScene = targetScene ?? findScene("start");
  if (!safeScene) {
    return NextResponse.json({ message: "Scene not found" }, { status: 404 });
  }

  const narration = [getLocalizedText(safeScene.title, language), getLocalizedText(safeScene.description, language)]
    .filter(Boolean)
    .join("\n\n");

  const choices = safeScene.choices.map((choice, index) => ({
    id: buildChoiceId(safeScene.scene_id, index, choice),
    text: getLocalizedText(choice.text, language),
  }));

  return NextResponse.json({
    turn: nextTurn,
    sceneId: safeScene.scene_id,
    narration,
    choices,
    shouldEnd: false,
    achievementId: null,
  });
}

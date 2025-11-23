import { type Language } from "@/lib/i18n";
import {
  type ChoiceRequirement,
  type GameContentGateway,
  type StoryChoice,
  type StoryEnding,
  type StoryScene,
} from "@/server/ports/game-content";
import { type I18nService } from "@/server/ports/i18n";

export type StoryRequest = {
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

export type AdvanceStoryResult =
  | { kind: "game_not_found" }
  | { kind: "scene_not_found" }
  | {
      kind: "success";
      body: {
        turn: number;
        sceneId: string;
        narration: string;
        choices: Array<{ id: string; text: string }>;
        shouldEnd: boolean;
        achievementId: string | null;
      };
    };

export type AdvanceStoryDeps = {
  gameContent: GameContentGateway;
  i18n: I18nService;
};

const buildChoiceId = (sceneId: string, index: number, choice: StoryChoice) => `${sceneId}::${index}::${choice.next}`;

const meetsRequirements = (requirements: ChoiceRequirement | undefined, character?: StoryRequest["character"]) => {
  if (!requirements) return true;

  const { classId, attributes } = character || {};

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

const findScene = (game: { scenes: Record<string, StoryScene> }, sceneId: string | undefined): StoryScene | null => {
  if (!sceneId) return null;
  return game.scenes[sceneId] ?? null;
};

const findEnding = (game: { endings: Record<string, StoryEnding> }, endingId: string | undefined): StoryEnding | null => {
  if (!endingId) return null;
  return game.endings[endingId] ?? null;
};

export const advanceStory = (request: StoryRequest, deps: AdvanceStoryDeps): AdvanceStoryResult => {
  const language: Language = request.language === "en" ? "en" : "th";
  const defaultGame = deps.gameContent.getDefaultStoryGame();
  const gameId = request.gameId ?? defaultGame.game_id;
  const game = deps.gameContent.findStoryGameById(gameId);

  if (!game) {
    return { kind: "game_not_found" };
  }

  const turn = typeof request.turn === "number" && request.turn > 0 ? request.turn : 0;
  const nextTurn = request.selectedChoiceId ? turn + 1 : Math.max(turn, 1);

  const resolveNextTarget = () => {
    const { currentSceneId, selectedChoiceId } = request;
    if (!selectedChoiceId) {
      return currentSceneId || "start";
    }

    const scene = findScene(game, currentSceneId);
    if (!scene) return "start";

    const choice = scene.choices
      .map((item, index) => ({
        item,
        id: buildChoiceId(scene.scene_id, index, item),
      }))
      .find(({ item, id }) => item.next === selectedChoiceId || id === selectedChoiceId)?.item ?? scene.choices[0];
    if (!choice) return selectedChoiceId;

    const eligible = meetsRequirements(choice.requirements, request.character);
    if (!eligible && choice.on_fail_next) {
      return choice.on_fail_next;
    }

    return choice.next;
  };

  const targetId = resolveNextTarget();
  const targetScene = findScene(game, targetId);
  const ending = findEnding(game, targetId);

  if (ending) {
    const title = deps.i18n.getLocalizedText(ending.title, language);
    const summary = deps.i18n.getLocalizedText(ending.summary, language);
    const result = deps.i18n.getLocalizedText(ending.result, language);

    const achievementId = `${gameId}-${ending.ending_id}`;

    return {
      kind: "success",
      body: {
        turn: nextTurn,
        sceneId: ending.ending_id,
        narration: [title, summary, result].join("\n\n"),
        choices: [],
        shouldEnd: true,
        achievementId,
      },
    };
  }

  const safeScene = targetScene ?? findScene(game, "start");
  if (!safeScene) {
    return { kind: "scene_not_found" };
  }

  const narration = [
    deps.i18n.getLocalizedText(safeScene.title, language),
    deps.i18n.getLocalizedText(safeScene.description, language),
  ]
    .filter(Boolean)
    .join("\n\n");

  const choices = safeScene.choices.map((choice, index) => ({
    id: buildChoiceId(safeScene.scene_id, index, choice),
    text: deps.i18n.getLocalizedText(choice.text, language),
  }));

  return {
    kind: "success",
    body: {
      turn: nextTurn,
      sceneId: safeScene.scene_id,
      narration,
      choices,
      shouldEnd: false,
      achievementId: null,
    },
  };
};

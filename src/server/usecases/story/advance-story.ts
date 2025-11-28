import { type Language } from "@/lib/i18n";
import {
  type ChoiceRequirement,
  type GameContentGateway,
  type StoryChoice,
  type StoryEnding,
  type StoryGameContent,
  type StoryScene,
} from "@/server/ports/game-content";

export type StoryRequest = {
  gameId?: string;
  currentSceneId?: string;
  selectedChoiceId?: string;
  turn?: number;
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
        image: string | null;
        endingTitle: string | null;
        endingSummary: string | null;
        endingResult: string | null;
      };
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

const buildImageUrl = (game: StoryGameContent, imageName?: string) => {
  if (!imageName) return null;
  if (/^https?:\/\//.test(imageName) || imageName.startsWith("/")) return imageName;

  const base = game.config.asset_paths?.images;
  const normalizedBase = base ? (base.endsWith("/") ? base : `${base}/`) : "/";

  return `${normalizedBase}${imageName}`;
};

export const advanceStory = (request: StoryRequest, game: StoryGameContent): AdvanceStoryResult => {
  if (!game) {
    return { kind: "game_not_found" };
  }

  const language: Language = "th";
  // const defaultGame = deps.gameContent.getDefaultStoryGame(); // Removed dependency
  // const gameId = request.gameId ?? defaultGame.game_id;
  // const game = deps.gameContent.findStoryGameById(gameId);
  
  const gameId = game.game_id; // Use game from argument

  const coverImage = buildImageUrl(game, game.metadata?.cover_image);

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
    const title = ending.title;
    const summary = ending.summary;
    const result = ending.result;

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
        image: buildImageUrl(game, ending.image) ?? coverImage,
        endingTitle: title,
        endingSummary: summary,
        endingResult: result,
      },
    };
  }

  const safeScene = targetScene ?? findScene(game, "start");
  if (!safeScene) {
    return { kind: "scene_not_found" };
  }

  const narration = [
    safeScene.title,
    safeScene.description,
  ]
    .filter(Boolean)
    .join("\n\n");

  const choices = safeScene.choices.map((choice, index) => ({
    id: buildChoiceId(safeScene.scene_id, index, choice),
    text: choice.text,
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
      image: buildImageUrl(game, safeScene.image) ?? coverImage,
      endingTitle: null,
      endingSummary: null,
      endingResult: null,
    },
  };
};

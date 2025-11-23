import { type GameSetupContent } from "@/data/game-content";
import { type LocalizedText } from "@/lib/i18n";

export type ChoiceRequirement = {
  classes?: string[];
  min_attributes?: Record<string, number>;
};

export type StoryChoice = {
  text: LocalizedText;
  next: string;
  requirements?: ChoiceRequirement;
  on_fail_next?: string;
};

export type StoryScene = {
  scene_id: string;
  title: LocalizedText;
  description: LocalizedText;
  choices: StoryChoice[];
};

export type StoryEnding = {
  ending_id: string;
  title: LocalizedText;
  summary: LocalizedText;
  result: LocalizedText;
};

export type StoryGameContent = GameSetupContent & {
  scenes: Record<string, StoryScene>;
  endings: Record<string, StoryEnding>;
};

export interface GameContentGateway {
  findStoryGameById(id: string): StoryGameContent | null;
  findSetupById(id: string): GameSetupContent | null;
  getDefaultStoryGame(): StoryGameContent;
}

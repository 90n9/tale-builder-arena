import { type GameSetupContent } from "@/data/game-content";

export type ChoiceRequirement = {
  classes?: string[];
  min_attributes?: Record<string, number>;
};

export type StoryChoice = {
  text: string;
  next: string;
  requirements?: ChoiceRequirement;
  on_fail_next?: string;
};

export type StoryScene = {
  scene_id: string;
  type?: string;
  title: string;
  description: string;
  image?: string;
  choices: StoryChoice[];
};

export type StoryEnding = {
  ending_id: string;
  title: string;
  summary: string;
  result: string;
  image?: string;
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

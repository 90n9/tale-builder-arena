import { NextRequest, NextResponse } from "next/server";
import { findGameSetupById } from "@/data/game-content";
import { type LocalizedText } from "@/lib/i18n";

type SetupResponse = {
  gameId: string;
  races: Array<{ id: string; name: LocalizedText; description: LocalizedText }>;
  classes: Array<{ id: string; name: LocalizedText; description: LocalizedText }>;
  attributes: Array<{ id: string; name: LocalizedText }>;
  baseAttributes: Record<string, number>;
  pointsToDistribute: number;
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

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = findGameSetupById(slug);

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  const searchParams = new URL(request.url).searchParams;
  const raceId = searchParams.get("race");
  const classId = searchParams.get("class");

  const raceBonus = game.races.find((race) => race.id === raceId)?.attribute_bonus;
  const classBonus = game.classes.find((cls) => cls.id === classId)?.starting_bonus;

  const baseAttributes = combineAttributeBonuses(
    game.config.starting_attributes.base_values,
    [raceBonus, classBonus],
    game.attributes.map((attr) => attr.id),
  );

  const response: SetupResponse = {
    gameId: game.game_id,
    races: game.races.map(({ attribute_bonus, ...rest }) => rest),
    classes: game.classes.map(({ starting_bonus, ...rest }) => rest),
    attributes: game.attributes,
    baseAttributes,
    pointsToDistribute: game.config.starting_attributes.points_to_distribute,
  };

  return NextResponse.json(response);
}

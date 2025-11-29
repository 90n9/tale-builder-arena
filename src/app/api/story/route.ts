import { NextResponse } from "next/server";

import { staticGameContentGateway } from "@/server/infra/game-content-static";
import { advanceStory } from "@/server/usecases/story/advance-story";

export function GET() {
  return NextResponse.json({
    ok: true,
    message: "POST to this endpoint with { gameId, currentSceneId, selectedChoiceId, language, character } to get the next scene.",
  });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const game = staticGameContentGateway.findStoryGameById(payload.gameId);

  if (!game) {
    return NextResponse.json({ message: "Game not found" }, { status: 400 });
  }

  const result = advanceStory(payload, game);

  switch (result.kind) {
    case "game_not_found":
      return NextResponse.json({ message: "Game not found" }, { status: 400 });
    case "scene_not_found":
      return NextResponse.json({ message: "Scene not found" }, { status: 404 });
    case "success":
      return NextResponse.json({
        ...result.body,
        image: result.body.image ?? null,
      });
    default:
      return NextResponse.json({ message: "Unable to progress story" }, { status: 500 });
  }
}

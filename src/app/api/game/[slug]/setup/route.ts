import { NextRequest, NextResponse } from "next/server";

import { staticGameContentGateway } from "@/server/infra/game-content-static";
import { getGameSetup } from "@/server/usecases/game/get-setup";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const searchParams = new URL(request.url).searchParams;

  const result = getGameSetup(
    {
      gameId: slug,
      raceId: searchParams.get("race"),
      classId: searchParams.get("class"),
      backgroundId: searchParams.get("background"),
    },
    { gameContent: staticGameContentGateway },
  );

  if (result.kind === "not_found") {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  return NextResponse.json(result.body);
}

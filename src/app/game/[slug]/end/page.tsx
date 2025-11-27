"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Compass, Loader2, RefreshCw, Sparkles, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { findAchievementById, type Achievement } from "@/data/achievements";
import { findGameBySlug } from "@/data/games";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText } from "@/lib/i18n";
import { getCharacterStorageKey, getEndSummaryStorageKey, type AdventureSummary } from "@/lib/game-config";

const EndGamePage = () => {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug ?? "").toString();
  const router = useRouter();
  const game = useMemo(() => findGameBySlug(slug), [slug]);
  const { language } = useLanguage();
  const copy = {
    th: {
      loading: "กำลังดึงข้อมูลสรุปการผจญภัย...",
      completed: (title: string) => `${title} เสร็จสิ้น!`,
      summaryTitle: "สรุปการเดินทาง",
      characterInfo: "ข้อมูลผจญภัย",
      genre: "แนวเรื่อง",
      race: "เผ่าพันธุ์",
      class: "สายอาชีพ",
      background: "ภูมิหลัง",
      turnCount: "จำนวนเทิร์น",
      achievementUnlocked: "ปลดล็อกความสำเร็จ!",
      yourStory: "เรื่องเล่าของคุณ",
      closing: (title: string) =>
        `คุณก้าวผ่านบททดสอบจาก ${title} และกลับออกมาพร้อมประสบการณ์ล้ำค่า พร้อมจะออกผจญภัยอีกครั้งหรือไม่?`,
      viewAchievements: "ดูความสำเร็จ",
      playAgain: "เล่นอีกครั้ง",
      playAnotherGame: "เล่นเกมอื่น",
    },
    en: {
      loading: "Fetching your adventure recap...",
      completed: (title: string) => `${title} completed!`,
      summaryTitle: "Journey recap",
      characterInfo: "Adventure info",
      genre: "Genre",
      race: "Race",
      class: "Class",
      background: "Background",
      turnCount: "Turn count",
      achievementUnlocked: "Achievement unlocked!",
      yourStory: "Your tale",
      closing: (title: string) =>
        `You cleared ${title} and returned with hard-earned experience. Ready to dive back in?`,
      viewAchievements: "View achievements",
      playAgain: "Play again",
      playAnotherGame: "Play another game",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;
  const [summary, setSummary] = useState<AdventureSummary | null>(null);
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const stored = sessionStorage.getItem(getEndSummaryStorageKey(slug));
    if (!stored) {
      router.replace(`/game/${slug}/play`);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as AdventureSummary;
      setSummary(parsed);
      setAchievement(parsed.achievementId ? findAchievementById(parsed.achievementId) ?? null : null);
    } catch (error) {
      console.error("ไม่สามารถโหลดสรุปการผจญภัยได้", error);
      router.replace(`/game/${slug}/play`);
      return;
    } finally {
      setIsLoading(false);
    }
  }, [router, slug]);

  const handleReplay = () => {
    sessionStorage.removeItem(getEndSummaryStorageKey(slug));
    sessionStorage.removeItem(getCharacterStorageKey(slug));
    router.push(`/game/${slug}/play`);
  };

  const handlePlayAnotherGame = () => {
    router.push("/game");
  };

  if (isLoading || !summary || !game) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-8 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
              <CardContent className="p-12 flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 text-accent animate-spin" />
                <p className="text-muted-foreground text-lg text-center">{text.loading}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  const { character, turn } = summary;
  const raceLabel = character.raceName ? getLocalizedText(character.raceName, language) : character.race;
  const classLabel = character.className ? getLocalizedText(character.className, language) : character.class;
  const backgroundLabel = character.backgroundName
    ? getLocalizedText(character.backgroundName, language)
    : character.background || "";
  const endingNarration = summary.endingNarration?.trim() ?? "";
  const endingId = summary.endingSceneId ?? null;
  const endingImage = summary.endingImage ?? game.coverImage ?? "/assets/game-scene-placeholder.jpg";
  const narrationParts = endingNarration ? endingNarration.split(/\n{2,}/).filter(Boolean) : [];
  const endingTitle = summary.endingTitle ?? narrationParts[0] ?? getLocalizedText(game.title, language);
  const endingSummary = summary.endingSummary ?? narrationParts[1] ?? text.closing(getLocalizedText(game.title, language));
  const endingResult = summary.endingResult ?? narrationParts[2] ?? narrationParts[1] ?? "";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="overflow-hidden rounded-3xl border-2 border-border shadow-card bg-muted/20">
            <div className="relative w-full aspect-[16/9]">
              <Image src={endingImage} alt={endingTitle} fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-4 text-center">
            {endingId ? (
              <div className="flex justify-center">
                <Badge className="bg-accent/15 text-accent border border-accent/30 uppercase tracking-wide">
                  {endingId}
                </Badge>
              </div>
            ) : null}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{endingTitle}</h1>
            <p className="text-lg text-secondary leading-relaxed whitespace-pre-line">{endingSummary}</p>
            {endingResult ? (
              <p className="text-foreground leading-relaxed whitespace-pre-line">{endingResult}</p>
            ) : null}
          </div>

          {achievement && (
            <Card className="ornate-corners border-2 border-secondary/50 bg-secondary/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Trophy className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-2">
                      {getLocalizedText(achievement.name, language)}
                    </h4>
                    <p className="text-foreground mb-2">
                      {getLocalizedText(achievement.description, language)}
                    </p>
                    <Badge className="bg-secondary/20 text-secondary border border-secondary/30 capitalize">
                      {achievement.rarity}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Button
              asChild
              variant="outline"
              className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan text-lg px-8 py-6"
            >
              <Link
                href={`/game/${slug}#achievements`}
                data-ga-event="nav-link-click"
                data-ga-category="navigation"
                data-ga-label={`/game/${slug}`}
              >
                <Trophy className="h-5 w-5 mr-2" />
                {text.viewAchievements}
              </Link>
            </Button>
            <Button
              onClick={handleReplay}
              className="bg-gradient-primary hover:shadow-glow-orange text-lg px-8 py-6"
              data-ga-event="restart-run"
              data-ga-category="progress"
              data-ga-label={slug}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              {text.playAgain}
            </Button>
            <Button
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={handlePlayAnotherGame}
              data-ga-event="choose-another-game"
              data-ga-category="navigation"
              data-ga-label="game-list"
            >
              <Compass className="h-5 w-5 mr-2" />
              {text.playAnotherGame}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndGamePage;

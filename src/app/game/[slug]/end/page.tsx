"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, RefreshCw, Sparkles, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { findAchievementById, type Achievement } from "@/data/achievements";
import { findGameBySlug } from "@/data/games";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText } from "@/lib/i18n";
import { getEndSummaryStorageKey, type AdventureSummary } from "@/lib/game-config";

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
      summaryTitle: "สรุปเส้นทาง",
      characterInfo: "ข้อมูลตัวละคร",
      genre: "แนวเรื่อง:",
      race: "เผ่าพันธุ์:",
      class: "สายอาชีพ:",
      background: "ภูมิหลัง:",
      stats: "สถิติการผจญภัย",
      turnCount: "จำนวนเทิร์น:",
      finalHp: "HP สุดท้าย:",
      gold: "ทองที่เก็บได้:",
      achievementUnlocked: "ปลดล็อกความสำเร็จ!",
      yourStory: "เรื่องเล่าของคุณ",
      closing: (title: string) =>
        `คุณก้าวผ่านบททดสอบจาก ${title} และกลับออกมาพร้อมประสบการณ์ล้ำค่า พร้อมจะออกผจญภัยอีกครั้งหรือไม่?`,
      viewAchievements: "ดูความสำเร็จทั้งหมด",
      playAgain: "เล่นอีกครั้ง",
      changeCharacter: "เปลี่ยนตัวละคร",
    },
    en: {
      loading: "Fetching your adventure recap...",
      completed: (title: string) => `${title} completed!`,
      summaryTitle: "Journey summary",
      characterInfo: "Character details",
      genre: "Genre:",
      race: "Race:",
      class: "Class:",
      background: "Background:",
      stats: "Adventure stats",
      turnCount: "Turn count:",
      finalHp: "Final HP:",
      gold: "Gold collected:",
      achievementUnlocked: "Achievement unlocked!",
      yourStory: "Your tale",
      closing: (title: string) =>
        `You cleared ${title} and returned with hard-earned experience. Ready to dive back in?`,
      viewAchievements: "View all achievements",
      playAgain: "Play again",
      changeCharacter: "Change character",
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
    router.push(`/game/${slug}/play`);
  };

  const handleChangeCharacter = () => {
    sessionStorage.removeItem(getEndSummaryStorageKey(slug));
    router.push(`/game/${slug}`);
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

  const { character, stats, turn } = summary;
  const raceLabel = character.raceName ? getLocalizedText(character.raceName, language) : character.race;
  const classLabel = character.className ? getLocalizedText(character.className, language) : character.class;
  const backgroundLabel = character.backgroundName
    ? getLocalizedText(character.backgroundName, language)
    : character.background || "";
  const endingNarration = summary.endingNarration?.trim() ?? "";
  const endingId = summary.endingSceneId ?? null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="mb-8">
              <Sparkles className="h-20 w-20 text-accent mx-auto mb-4 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4">
              {text.completed(getLocalizedText(game.title, language))}
            </h1>
            <p className="text-muted-foreground text-xl">{getLocalizedText(game.tagline, language)}</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-accent/20 text-accent border border-accent/30">{raceLabel}</Badge>
              <Badge className="bg-accent/20 text-accent border border-accent/30">{classLabel}</Badge>
              <Badge className="bg-accent/20 text-accent border border-accent/30">{backgroundLabel}</Badge>
            </div>
          </div>

          <Card className="ornate-corners border-2 border-accent/50 bg-gradient-card shadow-glow-cyan mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">{text.summaryTitle}</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-accent">{text.characterInfo}</h3>
                    <div className="space-y-2 text-foreground">
                      <p>
                        <span className="text-muted-foreground">{text.genre}</span>{" "}
                        {getLocalizedText(game.genreLabel, language)}
                      </p>
                      <p>
                        <span className="text-muted-foreground">{text.race}</span> {raceLabel}
                      </p>
                      <p>
                        <span className="text-muted-foreground">{text.class}</span> {classLabel}
                      </p>
                      <p>
                        <span className="text-muted-foreground">{text.background}</span> {backgroundLabel}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-accent">{text.stats}</h3>
                    <div className="space-y-2 text-foreground">
                      <p>
                        <span className="text-muted-foreground">{text.turnCount}</span> {turn}
                      </p>
                      <p>
                        <span className="text-muted-foreground">{text.finalHp}</span> {stats.hp}/{stats.maxHp}
                      </p>
                      <p>
                        <span className="text-muted-foreground">{text.gold}</span> {stats.gold}
                      </p>
                    </div>
                  </div>
                </div>

                {achievement && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      {text.achievementUnlocked}
                    </h3>
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
                  </div>
                )}

                <div className="pt-6 border-t border-border space-y-3 text-center">
                  <h3 className="text-lg font-semibold text-foreground">{text.yourStory}</h3>
                  {endingId ? (
                    <div className="flex justify-center">
                      <Badge className="bg-secondary/20 text-secondary border border-secondary/40 uppercase tracking-wide">
                        {endingId}
                      </Badge>
                    </div>
                  ) : null}
                  {endingNarration ? (
                    <p className="text-foreground leading-relaxed whitespace-pre-line">{endingNarration}</p>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {text.closing(getLocalizedText(game.title, language))}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan text-lg px-8 py-6"
            >
              <Link href="/achievements">
                <Trophy className="h-5 w-5 mr-2" />
                {text.viewAchievements}
              </Link>
            </Button>
            <Button onClick={handleReplay} className="bg-gradient-primary hover:shadow-glow-orange text-lg px-8 py-6">
              <RefreshCw className="h-5 w-5 mr-2" />
              {text.playAgain}
            </Button>
            <Button
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={handleChangeCharacter}
            >
              {text.changeCharacter}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndGamePage;

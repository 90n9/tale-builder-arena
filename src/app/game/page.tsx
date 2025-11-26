"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Compass, Map, RefreshCw, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GAME_STORIES } from "@/data/games";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText } from "@/lib/i18n";
import { getCharacterStorageKey, getEndSummaryStorageKey } from "@/lib/game-config";

const GameListPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, { hasCharacter: boolean; hasSummary: boolean }>>({});
  const copy = {
    th: {
      badge: "เลือกสนามผจญภัย",
      title: "เลือกเรื่องราวที่อยากเล่น",
      subtitle: "แต่ละแคมเปญถูกสร้างขึ้นให้มีโทนและความยากต่างกัน เลือกโลกที่ถูกใจแล้วไปตั้งค่าตัวละครก่อนออกเดินทาง",
      tone: "โทน:",
      setup: "ตั้งค่าการผจญภัย",
      continue: "เล่นต่อจากเดิม",
      startOver: "เริ่มใหม่",
    },
    en: {
      badge: "Choose your arena",
      title: "Pick a story to play",
      subtitle: "Each campaign has its own tone and challenge. Choose your world, then set your character before heading out.",
      tone: "Tone:",
      setup: "Set up adventure",
      continue: "Continue your journey",
      startOver: "Start over",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;
  const stories = useMemo(() => GAME_STORIES, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const next: Record<string, { hasCharacter: boolean; hasSummary: boolean }> = {};
    stories.forEach((game) => {
      const characterKey = getCharacterStorageKey(game.slug);
      const summaryKey = getEndSummaryStorageKey(game.slug);
      next[game.slug] = {
        hasCharacter: Boolean(sessionStorage.getItem(characterKey)),
        hasSummary: Boolean(sessionStorage.getItem(summaryKey)),
      };
    });

    setProgress(next);
  }, [stories]);

  const handleContinue = (slug: string) => {
    router.push(`/game/${slug}/play`);
  };

  const handleStartOver = (slug: string) => {
    const characterKey = getCharacterStorageKey(slug);
    const summaryKey = getEndSummaryStorageKey(slug);
    sessionStorage.removeItem(characterKey);
    sessionStorage.removeItem(summaryKey);
    setProgress((prev) => ({
      ...prev,
      [slug]: { hasCharacter: false, hasSummary: false },
    }));
    router.push(`/game/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-4">
            <div className="section-divider mb-8" />
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/30 uppercase tracking-wide text-sm">
              <Compass className="h-4 w-4" />
              {text.badge}
            </p>
            <h1 className="text-5xl font-bold text-foreground">{text.title}</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {text.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((game) => {
              const highlights = game.highlights.map((highlight) => getLocalizedText(highlight, language));
              const progressState = progress[game.slug];
              const hasInProgress = Boolean(progressState?.hasCharacter) && !progressState?.hasSummary;
              const coverSrc = game.coverImage || "/assets/game-scene-placeholder.jpg";

              return (
                <Card
                  key={game.slug}
                  className="relative overflow-hidden ornate-corners border-2 border-border bg-card/30 shadow-card backdrop-blur-sm hover:border-accent hover:shadow-glow-cyan transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${coverSrc})` }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60" aria-hidden />
                  <CardContent className="relative z-10 p-8 space-y-6">
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="bg-accent/20 text-accent border border-accent/30">
                        {getLocalizedText(game.genreLabel, language)}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Map className="h-4 w-4 text-secondary" />
                        {getLocalizedText(game.length, language)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">
                        {getLocalizedText(game.title, language)}
                      </h3>
                      <p className="text-secondary font-semibold">{getLocalizedText(game.tagline, language)}</p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{getLocalizedText(game.description, language)}</p>

                    <div className="flex flex-wrap gap-2">
                      {highlights.map((highlight) => (
                        <Badge
                          key={highlight}
                          variant="secondary"
                          className="bg-accent/15 text-accent border border-accent/30"
                        >
                          <Sparkles className="h-3 w-3 mr-1 text-accent" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {text.tone} <span className="text-foreground">{getLocalizedText(game.tone, language)}</span>
                      </p>
                      {hasInProgress ? (
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full">
                          <Button
                            onClick={() => handleContinue(game.slug)}
                            className="w-full sm:w-auto bg-gradient-primary hover:shadow-glow-orange text-primary-foreground border-2 border-secondary/50"
                            data-ga-event="game-continue"
                            data-ga-category="gameplay"
                            data-ga-label={game.slug}
                          >
                            {text.continue}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleStartOver(game.slug)}
                            className="w-full sm:w-auto border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                            data-ga-event="restart-run"
                            data-ga-category="progress"
                            data-ga-label={game.slug}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {text.startOver}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <Button
                            asChild
                            className="w-full sm:w-auto bg-gradient-primary hover:shadow-glow-orange text-primary-foreground border-2 border-secondary/50"
                          >
                            <Link
                              href={`/game/${game.slug}`}
                              data-ga-event="game-card-click"
                              data-ga-category="gameplay"
                              data-ga-label={game.slug}
                            >
                              {text.setup}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameListPage;

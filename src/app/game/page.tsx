'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, RefreshCw, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';


import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GAME_STORIES } from '@/data/games';
import { useLanguage } from '@/contexts/language-context';
import { getLocalizedText, type LocalizedText } from '@/lib/i18n';
import { getCharacterStorageKey, getEndSummaryStorageKey } from '@/lib/game-config';
import { gameListContent } from '@/data/game-list-content';

const GameListPage = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [progress, setProgress] = useState<
    Record<string, { hasCharacter: boolean; hasSummary: boolean }>
  >({});
  const t = (value: LocalizedText) => getLocalizedText(value, language);
  const stories = useMemo(() => GAME_STORIES, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    router.push(`/game/${slug}/init`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 pb-16 pt-20">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm uppercase tracking-wide text-accent">
              <Compass className="h-4 w-4" />
              {t(gameListContent.badge)}
            </div>
            <h1 className="text-5xl font-bold text-foreground">{t(gameListContent.title)}</h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              {t(gameListContent.subtitle)}
            </p>
            <div className="section-divider mb-8" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {stories.map((game) => {
              const highlights = game.highlights.map((highlight) =>
                getLocalizedText(highlight, language)
              );
              const progressState = progress[game.slug];
              const hasInProgress =
                Boolean(progressState?.hasCharacter) && !progressState?.hasSummary;
              const coverSrc = game.coverImage || '/assets/game-scene-placeholder.jpg';

              return (
                <Card
                  key={game.slug}
                  className="ornate-corners relative overflow-hidden border-2 border-border bg-card/30 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-accent hover:shadow-glow-cyan"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${coverSrc})` }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60"
                    aria-hidden
                  />
                  <CardContent className="relative z-10 space-y-6 p-8">
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="border border-accent/30 bg-accent/20 text-accent">
                        {getLocalizedText(game.genreLabel, language)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold uppercase tracking-wide text-foreground">
                        {getLocalizedText(game.title, language)}
                      </h3>
                      <p className="font-semibold text-secondary">
                        {getLocalizedText(game.tagline, language)}
                      </p>
                    </div>

                    <p className="leading-relaxed text-muted-foreground">
                      {getLocalizedText(game.description, language)}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {highlights.map((highlight) => (
                        <Badge
                          key={highlight}
                          variant="secondary"
                          className="border border-accent/30 bg-accent/15 text-accent"
                        >
                          <Sparkles className="mr-1 h-3 w-3 text-accent" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {hasInProgress ? (
                        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
                          <Button
                            onClick={() => handleContinue(game.slug)}
                            className="w-full border-2 border-secondary/50 bg-gradient-primary text-primary-foreground hover:shadow-glow-orange sm:w-auto"
                            data-ga-event="game-continue"
                            data-ga-category="gameplay"
                            data-ga-label={game.slug}
                          >
                            {t(gameListContent.continue)}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleStartOver(game.slug)}
                            className="w-full border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan sm:w-auto"
                            data-ga-event="restart-run"
                            data-ga-category="progress"
                            data-ga-label={game.slug}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {t(gameListContent.startOver)}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex w-full flex-col gap-3 sm:flex-row">
                          <Button
                            asChild
                            className="w-full border-2 border-secondary/50 bg-gradient-primary text-primary-foreground hover:shadow-glow-orange sm:w-auto"
                          >
                            <Link
                              href={`/game/${game.slug}`}
                              data-ga-event="game-card-click"
                              data-ga-category="gameplay"
                              data-ga-label={game.slug}
                            >
                              {t(gameListContent.setup)}
                              <ArrowRight className="ml-2 h-4 w-4" />
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
      <Footer />
    </div>
  );
};

export default GameListPage;

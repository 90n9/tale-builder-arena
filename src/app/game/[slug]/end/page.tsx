'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Compass, Loader2, RefreshCw, Sparkles, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { findAchievementById, type Achievement } from '@/data/achievements';
import { findGameBySlug } from '@/data/games';
import {
  getCharacterStorageKey,
  getEndSummaryStorageKey,
  type AdventureSummary,
} from '@/lib/game-config';

const EndGamePage = () => {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug ?? '').toString();
  const router = useRouter();
  const game = useMemo(() => findGameBySlug(slug), [slug]);
  const copy = {
    loading: 'กำลังดึงข้อมูลสรุปการผจญภัย...',
    completed: (title: string) => `${title} เสร็จสิ้น!`,
    summaryTitle: 'สรุปการเดินทาง',
    characterInfo: 'ข้อมูลผจญภัย',
    genre: 'แนวเรื่อง',
    race: 'เผ่าพันธุ์',
    class: 'สายอาชีพ',
    background: 'ภูมิหลัง',
    turnCount: 'จำนวนเทิร์น',
    achievementUnlocked: 'ปลดล็อกความสำเร็จ!',
    yourStory: 'เรื่องเล่าของคุณ',
    closing: (title: string) =>
      `คุณก้าวผ่านบททดสอบจาก ${title} และกลับออกมาพร้อมประสบการณ์ล้ำค่า พร้อมจะออกผจญภัยอีกครั้งหรือไม่?`,
    viewAchievements: 'ดูความสำเร็จ',
    playAgain: 'เล่นอีกครั้ง',
    playAnotherGame: 'เล่นเกมอื่น',
  };
  const text = copy;
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
      setAchievement(
        parsed.achievementId ? (findAchievementById(parsed.achievementId) ?? null) : null
      );
    } catch (error) {
      console.error('ไม่สามารถโหลดสรุปการผจญภัยได้', error);
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
    router.push('/game');
  };

  if (isLoading || !summary || !game) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background px-4 pb-8 pt-20">
          <div className="container mx-auto max-w-3xl">
            <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
              <CardContent className="flex flex-col items-center gap-4 p-12">
                <Loader2 className="h-10 w-10 animate-spin text-accent" />
                <p className="text-center text-lg text-muted-foreground">{text.loading}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  const { character, turn } = summary;
  const raceLabel = character.raceName ? character.raceName : character.race;
  const classLabel = character.className ? character.className : character.class;
  const backgroundLabel = character.backgroundName
    ? character.backgroundName
    : character.background || '';
  const endingNarration = summary.endingNarration?.trim() ?? '';
  const endingId = summary.endingSceneId ?? null;
  const endingImage =
    summary.endingImage ?? game.coverImage ?? '/assets/game-scene-placeholder.jpg';
  const narrationParts = endingNarration ? endingNarration.split(/\n{2,}/).filter(Boolean) : [];
  const endingTitle = summary.endingTitle ?? narrationParts[0] ?? game.title;
  const endingSummary = summary.endingSummary ?? narrationParts[1] ?? text.closing(game.title);
  const endingResult = summary.endingResult ?? narrationParts[2] ?? narrationParts[1] ?? '';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background px-4 pb-12 pt-24">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="overflow-hidden rounded-3xl border-2 border-border bg-muted/20 shadow-card">
            <div className="relative aspect-[16/9] w-full">
              <Image src={endingImage} alt={endingTitle} fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-4 text-center">
            {endingId ? (
              <div className="flex justify-center">
                <Badge className="border border-accent/30 bg-accent/15 uppercase tracking-wide text-accent">
                  {endingId}
                </Badge>
              </div>
            ) : null}
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">{endingTitle}</h1>
            <p className="whitespace-pre-line text-lg leading-relaxed text-secondary">
              {endingSummary}
            </p>
            {endingResult ? (
              <p className="whitespace-pre-line leading-relaxed text-foreground">{endingResult}</p>
            ) : null}
          </div>

          {achievement && (
            <Card className="ornate-corners border-2 border-secondary/50 bg-secondary/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Trophy className="mt-1 h-8 w-8 flex-shrink-0 text-secondary" />
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-secondary">{achievement.name}</h4>
                    <p className="mb-2 text-foreground">{achievement.description}</p>
                    <Badge className="border border-secondary/30 bg-secondary/20 capitalize text-secondary">
                      {achievement.rarity}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <Button
              asChild
              variant="outline"
              className="border-2 border-accent/50 px-8 py-6 text-lg hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
            >
              <Link
                href={`/game/${slug}#achievements`}
                data-ga-event="nav-link-click"
                data-ga-category="navigation"
                data-ga-label={`/game/${slug}`}
              >
                <Trophy className="mr-2 h-5 w-5" />
                {text.viewAchievements}
              </Link>
            </Button>
            <Button
              onClick={handleReplay}
              className="bg-gradient-primary px-8 py-6 text-lg hover:shadow-glow-orange"
              data-ga-event="restart-run"
              data-ga-category="progress"
              data-ga-label={slug}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              {text.playAgain}
            </Button>
            <Button
              variant="secondary"
              className="px-8 py-6 text-lg"
              onClick={handlePlayAnotherGame}
              data-ga-event="choose-another-game"
              data-ga-category="navigation"
              data-ga-label="game-list"
            >
              <Compass className="mr-2 h-5 w-5" />
              {text.playAnotherGame}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndGamePage;

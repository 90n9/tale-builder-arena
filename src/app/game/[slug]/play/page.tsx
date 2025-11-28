"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RefreshCw, Loader2, Heart, Sparkles, Compass, Map as MapIcon, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { randomAchievementForGenre, findAchievementById } from "@/data/achievements";
import { findGameBySlug } from "@/data/games";
import { findGameSetupById } from "@/data/game-content";
import { getCharacterStorageKey, getEndSummaryStorageKey, type AdventureStats, type AdventureSummary, type CharacterSelection } from "@/lib/game-config";
import { trackInteraction } from "@/lib/analytics";

type StoryResponse = {
  turn: number;
  sceneId: string;
  narration: string;
  choices: { id: string; text: string }[];
  shouldEnd: boolean;
  achievementId?: string | null;
  image?: string | null;
  endingTitle?: string | null;
  endingSummary?: string | null;
  endingResult?: string | null;
};

type ChoiceItem = {
  id: string;
  text: string;
  targetId: string;
};

const DEFAULT_STATS: AdventureStats = {
  hp: 85,
  maxHp: 100,
  mana: 60,
  maxMana: 80,
  gold: 150,
};
const gamePlaceholderSrc = "/assets/game-scene-placeholder.jpg";

const GamePlayPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug ?? "").toString();
  const router = useRouter();
  const game = useMemo(() => findGameBySlug(slug), [slug]);
  const gameSetup = useMemo(() => findGameSetupById(slug), [slug]);
  const copy = {
    loading: "กำลังเตรียมการผจญภัยของคุณ...",
    turn: "เทิร์นที่",
    restart: "เริ่มใหม่",
    startOver: "เริ่มใหม่",
    story: "เรื่องราว",
    whatNext: "คุณจะทำอะไรต่อ?",
    characterStatus: "สถานะตัวละคร",
    resources: "ทรัพยากรการผจญภัย",
    attributesPanel: "ค่าสถานะตัวละคร",
    storyFocus: "ธีมและเดิมพันของเรื่อง",
    buildTitle: "โปรไฟล์ตัวละคร",
    genreLabel: "แนวเรื่อง",
    raceLabel: "เผ่า",
    classLabel: "สายอาชีพ",
    backgroundLabel: "ภูมิหลัง",
    setupWarning: "โปรดตั้งค่าตัวละครก่อนเริ่มเล่น",
    goToSetup: "ไปตั้งค่าการผจญภัย",
    fallbackNotice: "ระบบขอใช้เส้นเรื่องสำรองเนื่องจากเกิดข้อผิดพลาดชั่วคราว",
    youChose: "คุณเลือก",
    currentSceneAlt: "ฉากปัจจุบัน",
    adventureMeta: "ข้อมูลผจญภัย",
    coverAlt: "ภาพบรรยากาศของ",
  };
  const text = copy;
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [turn, setTurn] = useState(1);
  const [character, setCharacter] = useState<CharacterSelection | null>(null);
  const [stats] = useState<AdventureStats>(DEFAULT_STATS);
  const [narration, setNarration] = useState<string>("");
  const [choices, setChoices] = useState<Array<ChoiceItem>>([]);
  const [currentSceneId, setCurrentSceneId] = useState<string | null>(null);
  const [sceneImage, setSceneImage] = useState<string | null>(null);
  const attributeSummaries = useMemo(() => {
    if (!gameSetup || !character) return [];
    const baseValues = gameSetup.config.starting_attributes.base_values ?? {};

    return gameSetup.attributes.map((attribute) => {
      const fallbackValue = baseValues[attribute.id] ?? 0;
      const value = character.attributes?.[attribute.id] ?? fallbackValue;

      return {
        ...attribute,
        value,
      };
    });
  }, [character, gameSetup]);
  const selectedRace = useMemo(
    () => gameSetup?.races.find((race) => race.id === character?.race),
    [character?.race, gameSetup],
  );
  const selectedClass = useMemo(
    () => gameSetup?.classes.find((cls) => cls.id === character?.class),
    [character?.class, gameSetup],
  );
  const selectedBackground = useMemo(
    () => gameSetup?.backgrounds.find((bg) => bg.id === character?.background),
    [character?.background, gameSetup],
  );

  const loadScene = useCallback(
    async (selectedChoice?: { id: string; text: string }, options?: { sceneId?: string | null; turnOverride?: number }) => {
      if (!character || !game) return;

      setIsLoading(true);
      try {
        const response = await fetch("/api/story", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameId: slug,
            currentSceneId: options?.sceneId ?? currentSceneId,
            selectedChoiceId: selectedChoice?.id,
            turn: options?.turnOverride ?? turn,
            character: {
              classId: character.class,
              raceId: character.race,
              attributes: character.attributes,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Unable to process story");
        }

        const data = (await response.json()) as StoryResponse;
        setTurn(data.turn);
        setNarration(data.narration);
        const seenIds = new Map<string, number>();
        const normalizedChoices: ChoiceItem[] = (data.choices ?? []).map((choice) => {
          const count = seenIds.get(choice.id) ?? 0;
          seenIds.set(choice.id, count + 1);
          const suffix = count > 0 ? `-${count}` : "";

          return {
            id: `${choice.id}${suffix}`,
            text: choice.text,
            targetId: choice.id,
          };
        });
        setChoices(normalizedChoices);
        setCurrentSceneId(data.sceneId ?? null);
        setSceneImage(data.image ?? null);

        if (data.shouldEnd) {
          const achievement =
            (data.achievementId && findAchievementById(data.achievementId)) ||
            randomAchievementForGenre(character.genre) ||
            null;

          if (achievement) {
            const savedAchievements = localStorage.getItem("questWeaverAchievements");
            const earnedIds = savedAchievements ? JSON.parse(savedAchievements) : [];
            const isNewUnlock = !earnedIds.includes(achievement.id);
            if (isNewUnlock) {
              earnedIds.push(achievement.id);
              localStorage.setItem("questWeaverAchievements", JSON.stringify(earnedIds));
              trackInteraction({
                action: "achievement-unlocked",
                category: "progress",
                label: achievement.id,
                params: { achievement_id: achievement.id, game_slug: slug, turn: data.turn },
              });
            }
          }

          const summary: AdventureSummary = {
            turn: data.turn,
            stats,
            character,
            achievementId: achievement?.id ?? null,
            endingSceneId: data.sceneId ?? null,
            endingNarration: data.narration ?? null,
            endingImage: data.image ?? null,
            endingTitle: data.endingTitle ?? null,
            endingSummary: data.endingSummary ?? null,
            endingResult: data.endingResult ?? null,
          };

          sessionStorage.setItem(getEndSummaryStorageKey(slug), JSON.stringify(summary));
          trackInteraction({
            action: "scene-end",
            category: "gameplay",
            label: summary.endingSceneId ?? undefined,
            params: {
              game_slug: slug,
              ending_id: summary.endingSceneId,
              achievement_id: summary.achievementId ?? undefined,
              turn: data.turn,
            },
          });
          router.push(`/game/${slug}/end`);
          return;
        }
      } catch (error) {
        console.error(error);
        setNarration((previous) => `${previous}\n\n${text.youChose}: ${selectedChoice?.text ?? "-"}\n(${text.fallbackNotice})`);
      } finally {
        setIsLoading(false);
      }
    },
    [character, currentSceneId, game, router, slug, stats, text.fallbackNotice, text.youChose, turn],
  );

  useEffect(() => {
    if (!slug) return;
    sessionStorage.removeItem(getEndSummaryStorageKey(slug));
  }, [slug]);

  useEffect(() => {
    if (isInitializing || !character || !game || currentSceneId) return;
    void loadScene(undefined, { sceneId: null, turnOverride: 1 });
  }, [character, currentSceneId, game, isInitializing, loadScene]);

  useEffect(() => {
    if (!game) {
      router.replace("/game");
      return;
    }

    const saved = sessionStorage.getItem(getCharacterStorageKey(slug));
    if (!saved) {
      router.replace(`/game/${slug}/init`);
      setIsInitializing(false);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<CharacterSelection>;
      if (!parsed.race || !parsed.class || !parsed.background) {
        router.replace(`/game/${slug}/init`);
        return;
      }

      setCharacter({
        genre: game.genre,
        race: parsed.race,
        class: parsed.class,
        background: parsed.background,
        raceName: parsed.raceName,
        className: parsed.className,
        backgroundName: parsed.backgroundName,
        attributes: parsed.attributes ?? {},
      });
    } catch (error) {
      console.error("Unable to load character", error);
      router.replace(`/game/${slug}/init`);
    } finally {
      setIsInitializing(false);
    }
  }, [game, router, slug]);

  const handleChoice = (choice: ChoiceItem) => {
    trackInteraction({
      action: "scene-choice",
      category: "gameplay",
      label: slug,
      params: {
        game_slug: slug,
        scene_id: currentSceneId ?? undefined,
        choice_id: choice.targetId,
        turn,
      },
    });
    void loadScene({ id: choice.targetId, text: choice.text });
  };

  const handleStartOver = () => {
    trackInteraction({
      action: "restart-run",
      category: "progress",
      label: slug,
      params: { game_slug: slug, method: "reset-character" },
    });
    const characterKey = getCharacterStorageKey(slug);
    const summaryKey = getEndSummaryStorageKey(slug);
    sessionStorage.removeItem(characterKey);
    sessionStorage.removeItem(summaryKey);
    setTurn(1);
    setNarration("");
    setChoices([]);
    setCurrentSceneId(null);
    setSceneImage(null);
    setIsLoading(false);
    setCharacter(null);
    router.push(`/game/${slug}/init`);
  };

  const renderLoadingState = () => (
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
  );

  const renderGame = () => {
    if (!character || !game) return null;

    const raceLabel = character.raceName ? character.raceName : character.race;
    const classLabel = character.className ? character.className : character.class;
    const backgroundLabel = character.backgroundName
      ? character.backgroundName
      : character.background || "";
    const highlights = game.highlights.map((highlight) => highlight);
    const coverSrc = game.coverImage || gamePlaceholderSrc;
    const sceneImageSrc = sceneImage || gamePlaceholderSrc;
    const maxAttributeValue = attributeSummaries.reduce((max, attribute) => {
      return Math.max(max, attribute.value);
    }, 1);
    const profileDetails = [
      {
        key: "genre",
        label: text.genreLabel,
        name: game.genreLabel,
        description: game.description,
      },
      selectedClass
        ? {
            key: "class",
            label: text.classLabel,
            name: classLabel,
            description: selectedClass.description,
          }
        : null,
      selectedBackground
        ? {
            key: "background",
            label: text.backgroundLabel,
            name: backgroundLabel,
            description: selectedBackground.description,
          }
        : null,
    ].filter(Boolean) as {
      key: string;
      label: string;
      name: string;
      description?: string;
    }[];

    return (
      <div className="min-h-screen bg-background">
        <div className="pt-20 pb-10 px-4">
          <div className="container mx-auto max-w-6xl space-y-8">
            <Card className="ornate-corners border-2 border-border bg-card/30 shadow-epic overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-0">
                    <Image
                      src={coverSrc}
                      alt={`${text.coverAlt} ${game.title}`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(min-width: 1024px) 1100px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-hero" />
                    <div className="absolute inset-0 bg-gradient-overlay" />
                  </div>
                  <div className="relative p-6 md:p-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-4 max-w-3xl">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                          {raceLabel}
                        </Badge>
                        <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                          {classLabel}
                        </Badge>
                        <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                          {backgroundLabel}
                        </Badge>
                        <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                          {game.genreLabel}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                          {game.title}
                        </h1>
                        <p className="text-secondary font-semibold">{game.tagline}</p>
                      </div>
                    </div>
                    <div className="w-full lg:w-auto lg:min-w-[280px]">
                      <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 shadow-card space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm uppercase tracking-wide text-muted-foreground">{text.adventureMeta}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <span>
                              {text.turn} {turn}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <MapIcon className="h-5 w-5 text-accent" />
                            <p className="text-sm text-foreground">
                              {game.genreLabel}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleStartOver}
                          className="w-full border-destructive text-destructive hover:border-destructive hover:shadow-glow-orange"
                          data-ga-event="restart-run"
                          data-ga-category="progress"
                          data-ga-label={slug}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {text.startOver}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="ornate-corners overflow-hidden border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <Loader2 className="h-12 w-12 text-accent animate-spin" />
                        </div>
                      ) : (
                        <Image
                          src={sceneImageSrc}
                          alt={text.currentSceneAlt}
                          fill
                          priority
                          className="object-cover"
                          sizes="(min-width: 1024px) 66vw, 100vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-overlay" />
                      <div className="absolute bottom-4 left-4 bg-background/80 border border-border/60 rounded-full px-3 py-1 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                        <Heart className="h-3 w-3 text-destructive" />
                        {text.turn} {turn}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent" />
                        <h2 className="text-xl font-semibold text-foreground">{text.story}</h2>
                      </div>
                      <Badge className="bg-accent/20 text-accent border border-accent/30">
                        {game.genreLabel}
                      </Badge>
                    </div>
                    <p className="text-foreground leading-relaxed whitespace-pre-line">{narration}</p>
                  </CardContent>
                </Card>

                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">{text.whatNext}</h2>
                    <div className="flex flex-col gap-3">
                      {choices.map((choice, index) => (
                        <Button
                          key={choice.id}
                          onClick={() => handleChoice(choice)}
                          disabled={isLoading}
                          className="w-full h-auto py-4 text-left justify-start bg-card hover:bg-muted border-2 border-accent/50 text-foreground hover:border-accent hover:shadow-glow-cyan transition-all whitespace-normal"
                          variant="outline"
                        >
                          <span className="text-accent font-bold mr-3">{index + 1}.</span>
                          {choice.text}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="h-5 w-5 text-secondary" />
                      <h2 className="text-lg font-semibold text-foreground">{text.storyFocus}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {game.description}
                    </p>
                    {highlights.length > 0 && (
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
                    )}
                  </CardContent>
                </Card>

                {(attributeSummaries.length > 0 || profileDetails.length > 0) && (
                  <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                    <CardContent className="p-6 space-y-5">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-secondary" />
                        <h2 className="text-lg font-semibold text-foreground">{text.characterStatus}</h2>
                      </div>

                      {attributeSummaries.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-accent" />
                            <p className="text-sm font-semibold text-foreground">{text.attributesPanel}</p>
                          </div>
                          <div className="grid gap-1">
                            {attributeSummaries.map((attribute) => (
                              <div
                                key={attribute.id}
                                className="flex items-center justify-between rounded-lg bg-background/60 p-2"
                              >
                                <div className="flex flex-col w-full gap-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">
                                      {attribute.name}
                                    </span>
                                    <span className="text-sm font-semibold text-accent">{attribute.value}</span>
                                  </div>
                                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-primary"
                                      style={{ width: `${Math.min(100, (attribute.value / maxAttributeValue) * 100)}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {profileDetails.length > 0 && (
                        <div className="space-y-2 rounded-lg border border-border/60 bg-background/60 p-3">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{text.buildTitle}</p>
                          <div className="space-y-2">
                            {profileDetails.map((detail) => (
                              <p key={detail.key} className="text-sm text-foreground leading-relaxed">
                                <span className="text-muted-foreground uppercase tracking-wide text-[11px] mr-2">
                                  {detail.label}
                                </span>
                                <span className="font-semibold text-foreground">{detail.name}</span>
                                {detail.description ? (
                                  <span className="text-muted-foreground"> — {detail.description}</span>
                                ) : null}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isInitializing) {
    return (
      <>
        <Navbar />
        {renderLoadingState()}
      </>
    );
  }

  if (!character || !game) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-8 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
              <CardContent className="p-12 text-center space-y-4">
                <Sparkles className="h-10 w-10 text-accent mx-auto" />
                <p className="text-lg text-muted-foreground">
                  {text.setupWarning}
                </p>
                <Button onClick={() => router.push(`/game/${slug}/init`)} className="bg-gradient-primary hover:shadow-glow-orange">
                  {text.goToSetup}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {renderGame()}
    </>
  );
};

export default GamePlayPage;

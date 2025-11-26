"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass, Flame, Loader2, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { findGameBySlug } from "@/data/games";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { createEmptyCharacter, getCharacterStorageKey, type CharacterSelection } from "@/lib/game-config";
import { trackInteraction } from "@/lib/analytics";

type CharacterCreationStep = "race" | "class" | "background" | "attributes";

const getNextStep = (current: CharacterSelection): CharacterCreationStep => {
  if (!current.race) return "race";
  if (!current.class) return "class";
  if (!current.background) return "background";
  return "attributes";
};

type SetupRace = { id: string; name: LocalizedText; description: LocalizedText };
type SetupClass = { id: string; name: LocalizedText; description: LocalizedText };
type SetupBackground = { id: string; name: LocalizedText; description: LocalizedText };
type SetupAttribute = { id: string; name: LocalizedText };

type SetupApiResponse = {
  gameId: string;
  races: SetupRace[];
  classes: SetupClass[];
  backgrounds: SetupBackground[];
  attributes: SetupAttribute[];
  baseAttributes: Record<string, number>;
  pointsToDistribute: number;
};

const GameSetupPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug ?? "").toString();
  const router = useRouter();
  const game = useMemo(() => findGameBySlug(slug), [slug]);
  const { language } = useLanguage();
  const copy = {
    th: {
      tone: "โทน:",
      length: "ความยาว:",
      backToStories: "กลับไปเลือกเรื่องอื่น",
      chooseRaceTitle: "เลือกเผ่าพันธุ์",
      chooseRaceSubtitle: "ตั้งรากฐานเชื้อสายให้เข้ากับโทนของเรื่อง",
      backToGameList: "กลับไปเลือกรายการเกม",
      chooseClassTitle: "เลือกสายอาชีพ",
      chooseClassSubtitle: "จับคู่กับทีมของคุณเพื่อรับมือสถานการณ์ของเรื่องนี้",
      backToRace: "กลับไปเลือกเผ่าพันธุ์",
      chooseBackgroundTitle: "เลือกเส้นทางชีวิต",
      chooseBackgroundSubtitle: "เติมสีสันอดีตของตัวละครเพื่อปลดล็อกจุดแข็งเฉพาะ",
      backToClassList: "กลับไปเลือกสายอาชีพ",
      attributesTitle: "ปรับค่าสถานะ",
      attributesSubtitle: "บาลานซ์ความแข็งแกร่งเพื่อเตรียมรับมือเหตุการณ์เฉพาะของเรื่องนี้",
      pointsUsed: "ใช้แต้มแล้ว",
      backToClass: "กลับไปเลือกสายอาชีพ",
      loadingAttributes: "กำลังโหลดค่าสถานะ...",
      loadingOptions: "กำลังโหลดตัวเลือก...",
      pointsLeft: "แต้มที่เหลือ",
      start: "เริ่มการผจญภัย",
    },
    en: {
      tone: "Tone:",
      length: "Length:",
      backToStories: "Back to other stories",
      chooseRaceTitle: "Choose your race",
      chooseRaceSubtitle: "Set your lineage to match the tone of this tale.",
      backToGameList: "Back to game list",
      chooseClassTitle: "Choose your class",
      chooseClassSubtitle: "Pair with your party to tackle this scenario.",
      backToRace: "Back to race selection",
      chooseBackgroundTitle: "Choose a backstory",
      chooseBackgroundSubtitle: "Give your hero a past that unlocks unique strengths.",
      backToClassList: "Back to class selection",
      attributesTitle: "Distribute attributes",
      attributesSubtitle: "Balance your strengths for this story's challenges.",
      pointsUsed: "Points used",
      backToClass: "Back to class selection",
      loadingAttributes: "Loading attributes...",
      loadingOptions: "Loading options...",
      pointsLeft: "Points left",
      start: "Start adventure",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;
  const [step, setStep] = useState<CharacterCreationStep>("race");
  const [setupData, setSetupData] = useState<SetupApiResponse | null>(null);
  const [isLoadingSetup, setIsLoadingSetup] = useState(false);
  const [setupError, setSetupError] = useState<LocalizedText | null>(null);
  const [character, setCharacter] = useState<CharacterSelection>(() => ({
    ...createEmptyCharacter(),
    genre: game?.genre ?? "",
  }));

  const selectedRaceLabel =
    setupData?.races.find((race) => race.id === character.race)?.name ?? character.raceName ?? null;
  const selectedClassLabel =
    setupData?.classes.find((cls) => cls.id === character.class)?.name ?? character.className ?? null;
  const selectedBackgroundLabel =
    setupData?.backgrounds.find((bg) => bg.id === character.background)?.name ??
    character.backgroundName ??
    null;

  const totalAttributePoints = Object.values(character.attributes ?? {}).reduce((a, b) => a + b, 0);
  const baseAttributeTotal = setupData ? Object.values(setupData.baseAttributes).reduce((a, b) => a + b, 0) : 0;
  const maxAttributePoints = baseAttributeTotal + (setupData?.pointsToDistribute ?? 0);
  const pointsRemaining = maxAttributePoints - totalAttributePoints;
  const canStart =
    Boolean(character.race && character.class && character.background) &&
    Boolean(setupData) &&
    totalAttributePoints <= maxAttributePoints &&
    !isLoadingSetup;

  const handleAdjustAttribute = (attributeId: string, delta: number) => {
    if (!setupData) return;

    setCharacter((prev) => {
      const baseValue = setupData.baseAttributes?.[attributeId] ?? 0;
      const currentValue = prev.attributes?.[attributeId] ?? baseValue;
      const attributeCap = baseValue + (setupData.pointsToDistribute ?? 0);
      const proposed = Math.min(attributeCap, Math.max(baseValue, currentValue + delta));

      if (proposed === currentValue) return prev;

      const nextAttributes = { ...prev.attributes, [attributeId]: proposed };
      const nextTotal = Object.values(nextAttributes).reduce((a, b) => a + b, 0);

      if (nextTotal > maxAttributePoints) {
        return prev;
      }

      return { ...prev, attributes: nextAttributes };
    });
  };

  const fetchSetupData = async (options: {
    raceId?: string;
    classId?: string;
    useAttributes?: CharacterSelection["attributes"];
    raceName?: LocalizedText;
    className?: LocalizedText;
    backgroundId?: string;
    backgroundName?: LocalizedText;
  } = {}) => {
    if (!game) return;
    setIsLoadingSetup(true);
    setSetupError(null);

    try {
      const params = new URLSearchParams();
      const raceQuery = options.raceId ?? character.race;
      const classQuery = options.classId ?? character.class;
      const backgroundQuery = options.backgroundId ?? character.background;

      if (raceQuery) params.set("race", raceQuery);
      if (classQuery) params.set("class", classQuery);
      if (backgroundQuery) params.set("background", backgroundQuery);
      const query = params.toString();

      const response = await fetch(`/api/game/${slug}/setup${query ? `?${query}` : ""}`);
      if (!response.ok) {
        throw new Error("Unable to load setup data");
      }

      const data = (await response.json()) as SetupApiResponse;
      setSetupData(data);

      const baseAttributes = data.baseAttributes ?? {};
      const attributes = data.attributes.reduce<Record<string, number>>((acc, attr) => {
        const baseValue = baseAttributes[attr.id] ?? 0;
        const savedValue = options.useAttributes?.[attr.id];
        acc[attr.id] = Math.max(baseValue, savedValue ?? baseValue);
        return acc;
      }, {});

      const raceId = options.raceId ?? character.race ?? "";
      const classId = options.classId ?? character.class ?? "";
      const backgroundId = options.backgroundId ?? character.background ?? "";

      const raceName =
        data.races.find((race) => race.id === raceId)?.name ?? options.raceName ?? character.raceName;
      const className =
        data.classes.find((cls) => cls.id === classId)?.name ?? options.className ?? character.className;
      const backgroundName =
        data.backgrounds.find((bg) => bg.id === backgroundId)?.name ??
        options.backgroundName ??
        character.backgroundName;

      const nextCharacter: CharacterSelection = {
        genre: game.genre,
        race: raceId,
        class: classId,
        background: backgroundId,
        raceName,
        className,
        backgroundName,
        attributes,
      };

      setCharacter(nextCharacter);
      setStep(getNextStep(nextCharacter));
    } catch (error) {
      console.error(error);
      setSetupError({
        th: "ไม่สามารถโหลดการตั้งค่าตัวละครได้",
        en: "Unable to load character setup",
      });
    } finally {
      setIsLoadingSetup(false);
    }
  };

  useEffect(() => {
    if (game && character.genre !== game.genre) {
      setCharacter((prev) => ({ ...prev, genre: game.genre }));
    }
  }, [character.genre, game]);

  useEffect(() => {
    if (!game) {
      router.replace("/game");
      return;
    }

    const saved = sessionStorage.getItem(getCharacterStorageKey(slug));
    let parsed: Partial<CharacterSelection> | null = null;
    if (saved) {
      try {
        parsed = JSON.parse(saved) as Partial<CharacterSelection>;
      } catch (error) {
        console.error("Unable to load saved character", error);
      }
    }

    fetchSetupData({
      raceId: parsed?.race,
      classId: parsed?.class,
      useAttributes: parsed?.attributes,
      raceName: parsed?.raceName,
      className: parsed?.className,
      backgroundId: parsed?.background,
      backgroundName: parsed?.backgroundName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, router, slug]);

  const handleSelectRace = (race: string) => {
    fetchSetupData({
      raceId: race,
      classId: character.class || undefined,
      backgroundId: character.background || undefined,
    });
    setStep("class");
  };

  const handleSelectClass = (className: string) => {
    fetchSetupData({
      raceId: character.race || undefined,
      classId: className,
      backgroundId: character.background || undefined,
    });
    setStep("background");
  };

  const handleSelectBackground = (backgroundId: string) => {
    fetchSetupData({
      raceId: character.race || undefined,
      classId: character.class || undefined,
      backgroundId,
    });
    setStep("attributes");
  };

  const handleStartGame = () => {
    if (!game) return;
    const raceName = setupData?.races.find((race) => race.id === character.race)?.name ?? character.raceName;
    const className =
      setupData?.classes.find((cls) => cls.id === character.class)?.name ?? character.className;
    const backgroundName =
      setupData?.backgrounds.find((bg) => bg.id === character.background)?.name ?? character.backgroundName;
    const payload: CharacterSelection = { ...character, raceName, className, backgroundName };
    sessionStorage.setItem(getCharacterStorageKey(slug), JSON.stringify(payload));
    trackInteraction({
      action: "game-start",
      category: "gameplay",
      label: slug,
      params: {
        game_slug: slug,
        race_id: character.race,
        class_id: character.class,
        background_id: character.background,
        language,
      },
    });
    router.push(`/game/${slug}/play`);
  };

  if (!game) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 pb-10 px-4">
        <div className="container mx-auto max-w-5xl space-y-10">
          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
            <CardContent className="p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <Badge className="bg-accent/20 text-accent border border-accent/30">
                  {getLocalizedText(game.genreLabel, language)}
                </Badge>
                <h1 className="text-4xl font-bold text-foreground uppercase tracking-wide">
                  {getLocalizedText(game.title, language)}
                </h1>
                <p className="text-secondary font-semibold">{getLocalizedText(game.tagline, language)}</p>
                <p className="text-muted-foreground max-w-3xl leading-relaxed">
                  {getLocalizedText(game.description, language)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {game.highlights.map((highlight) => (
                    <Badge
                      key={highlight.th}
                      variant="secondary"
                      className="bg-accent/15 text-accent border border-accent/30"
                    >
                      <Flame className="h-3 w-3 mr-1 text-accent" />
                      {getLocalizedText(highlight, language)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-left md:text-right space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2 md:justify-end">
                  <Compass className="h-4 w-4 text-secondary" />
                  {text.tone} <span className="text-foreground">{getLocalizedText(game.tone, language)}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {text.length} {getLocalizedText(game.length, language)}
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push("/game")}
                  className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                >
                  {text.backToStories}
                </Button>
              </div>
            </CardContent>
          </Card>

          {(step === "race" || !setupData) && (
            <div className="space-y-8">
              {isLoadingSetup && !setupData && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{text.loadingOptions}</span>
                </div>
              )}
              {setupError && !isLoadingSetup && !setupData && (
                <p className="text-destructive text-center">{getLocalizedText(setupError, language)}</p>
              )}
              {step === "race" && setupData && (
                <>
                  <div className="text-center space-y-3">
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      {getLocalizedText(game.genreLabel, language)}
                    </Badge>
                    <h2 className="text-5xl font-bold text-foreground">{text.chooseRaceTitle}</h2>
                    <p className="text-muted-foreground text-lg">{text.chooseRaceSubtitle}</p>
                  </div>

                  {setupError && (
                    <p className="text-destructive text-center">{getLocalizedText(setupError, language)}</p>
                  )}

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {setupData.races.map((race) => (
                      <Card
                        key={race.id}
                        className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
                        onClick={() => handleSelectRace(race.id)}
                      >
                        <CardContent className="p-6 text-center space-y-2">
                          <h3 className="text-2xl font-bold text-foreground">{getLocalizedText(race.name, language)}</h3>
                          <p className="text-muted-foreground">{getLocalizedText(race.description, language)}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/game")}
                      className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {text.backToGameList}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
          {step === "class" && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="flex gap-2 justify-center">
                  <Badge className="bg-accent/20 text-accent border border-accent/30">
                    {getLocalizedText(game.genreLabel, language)}
                  </Badge>
                  {selectedRaceLabel && (
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      {getLocalizedText(selectedRaceLabel, language)}
                    </Badge>
                  )}
                </div>
                <h2 className="text-5xl font-bold text-foreground">{text.chooseClassTitle}</h2>
                <p className="text-muted-foreground text-lg">{text.chooseClassSubtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {setupData?.classes.map((cls) => (
                  <Card
                    key={cls.id}
                    className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
                    onClick={() => handleSelectClass(cls.id)}
                  >
                    <CardContent className="p-6 text-center space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{getLocalizedText(cls.name, language)}</h3>
                      <p className="text-muted-foreground">{getLocalizedText(cls.description, language)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setStep("race")}
                  className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {text.backToRace}
                </Button>
              </div>
            </div>
          )}

          {step === "background" && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="flex gap-2 justify-center">
                  <Badge className="bg-accent/20 text-accent border border-accent/30">
                    {getLocalizedText(game.genreLabel, language)}
                  </Badge>
                  {selectedRaceLabel && (
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      {getLocalizedText(selectedRaceLabel, language)}
                    </Badge>
                  )}
                  {selectedClassLabel && (
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      {getLocalizedText(selectedClassLabel, language)}
                    </Badge>
                  )}
                </div>
                <h2 className="text-5xl font-bold text-foreground">{text.chooseBackgroundTitle}</h2>
                <p className="text-muted-foreground text-lg">{text.chooseBackgroundSubtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {setupData?.backgrounds.map((background) => (
                  <Card
                    key={background.id}
                    className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
                    onClick={() => handleSelectBackground(background.id)}
                  >
                    <CardContent className="p-6 text-center space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">
                        {getLocalizedText(background.name, language)}
                      </h3>
                      <p className="text-muted-foreground">
                        {getLocalizedText(background.description, language)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setStep("class")}
                  className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {text.backToClassList}
                </Button>
              </div>
            </div>
          )}

          {step === "attributes" && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="flex gap-2 justify-center">
                  <Badge className="bg-accent/20 text-accent border border-accent/30">{game.genre}</Badge>
                  {selectedRaceLabel && (
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      {getLocalizedText(selectedRaceLabel, language)}
                    </Badge>
                  )}
                  {selectedClassLabel && (
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      {getLocalizedText(selectedClassLabel, language)}
                    </Badge>
                  )}
                  {selectedBackgroundLabel && (
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      {getLocalizedText(selectedBackgroundLabel, language)}
                    </Badge>
                  )}
                </div>
                <h2 className="text-5xl font-bold text-foreground">{text.attributesTitle}</h2>
                <p className="text-muted-foreground text-lg">{text.attributesSubtitle}</p>
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-background/60 shadow-inner">
                    <div className="h-2 w-2 rounded-full bg-gradient-primary" />
                    <span className="text-sm text-muted-foreground uppercase tracking-wide">
                      {text.pointsLeft}
                    </span>
                    <span className="text-lg font-semibold text-foreground">
                      {Math.max(pointsRemaining, 0)}
                    </span>
                  </div>
                </div>
              </div>

              <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-8">
                  {setupError && (
                    <p className="text-destructive mb-4 text-center">
                      {getLocalizedText(setupError, language)}
                    </p>
                  )}
                  {isLoadingSetup && !setupData ? (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>{text.loadingAttributes}</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {setupData?.attributes.map((attribute) => {
                        const baseValue = setupData.baseAttributes?.[attribute.id] ?? 0;
                        const value = character.attributes?.[attribute.id] ?? baseValue;
                        const attributeMax = baseValue + (setupData?.pointsToDistribute ?? 0);
                        const safeMax = Math.max(attributeMax, 1);
                        const remaining = Math.max(pointsRemaining, 0);
                        const barPercent = Math.min(100, Math.max(0, (value / safeMax) * 100));
                        const baseMarker = Math.min(100, Math.max(0, (baseValue / safeMax) * 100));
                        const additionalPercent = Math.max(0, barPercent - baseMarker);
                        const canDecrement = value > baseValue;
                        const canIncrement = remaining > 0 && value < attributeMax;
                        return (
                          <div
                            key={attribute.id}
                            className="rounded-lg bg-background/40 shadow-inner p-3 space-y-2"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-left min-w-[120px]">
                                <p className="text-sm uppercase text-foreground tracking-wide">
                                  {getLocalizedText(attribute.name, language) ?? attribute.id}
                                </p>
                                <p className="text-xs text-secondary">
                                  {language === "en" ? "Base" : "ฐาน"}: {baseValue}
                                </p>
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="relative h-2.5 rounded-full bg-muted/70 overflow-hidden">
                                  <div
                                    className="absolute inset-y-0 left-0 bg-accent transition-all"
                                    style={{ width: `${baseMarker}%` }}
                                  />
                                  <div
                                    className="absolute inset-y-0"
                                    style={{ left: `${baseMarker}%`, width: `${additionalPercent}%` }}
                                  >
                                    <div className="h-full w-full bg-gradient-primary" />
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {language === "en" ? "Current" : "ปัจจุบัน"}:{" "}
                                  <span className="text-foreground font-semibold">{value}</span>
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  disabled={!canDecrement}
                                  onClick={() => handleAdjustAttribute(attribute.id, -1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  disabled={!canIncrement}
                                  onClick={() => handleAdjustAttribute(attribute.id, 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setStep("class")}
                  className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {text.backToClass}
                </Button>
                <Button
                  onClick={handleStartGame}
                  disabled={!canStart}
                  className="bg-gradient-primary hover:shadow-glow-orange"
                  data-ga-event="game-start"
                  data-ga-category="gameplay"
                  data-ga-label={slug}
                >
                  {text.start}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GameSetupPage;

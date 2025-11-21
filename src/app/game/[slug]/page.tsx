"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { findGameBySlug } from "@/data/games";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText } from "@/lib/i18n";
import {
  ATTRIBUTE_MAX_POINTS,
  attributeLabels,
  classes,
  createDefaultAttributes,
  createEmptyCharacter,
  getCharacterStorageKey,
  races,
  type CharacterSelection,
} from "@/lib/game-config";

type CharacterCreationStep = "race" | "class" | "attributes";

const getNextStep = (current: CharacterSelection): CharacterCreationStep => {
  if (!current.race) return "race";
  if (!current.class) return "class";
  return "attributes";
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
      attributesTitle: "ปรับค่าสถานะ",
      attributesSubtitle: "บาลานซ์ความแข็งแกร่งเพื่อเตรียมรับมือเหตุการณ์เฉพาะของเรื่องนี้",
      pointsUsed: "ใช้แต้มแล้ว",
      backToClass: "กลับไปเลือกสายอาชีพ",
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
      attributesTitle: "Distribute attributes",
      attributesSubtitle: "Balance your strengths for this story's challenges.",
      pointsUsed: "Points used",
      backToClass: "Back to class selection",
      start: "Start adventure",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;
  const [step, setStep] = useState<CharacterCreationStep>("race");
  const [character, setCharacter] = useState<CharacterSelection>(() => ({
    ...createEmptyCharacter(),
    genre: game?.genre ?? "",
  }));

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
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<CharacterSelection>;
      const restored: CharacterSelection = {
        genre: game.genre,
        race: parsed.race ?? "",
        class: parsed.class ?? "",
        attributes: { ...createDefaultAttributes(), ...(parsed.attributes ?? {}) },
      };
      setCharacter(restored);
      setStep(getNextStep(restored));
    } catch (error) {
      console.error("Unable to load saved character", error);
    }
  }, [game, router, slug]);

  const totalAttributePoints = Object.values(character.attributes).reduce((a, b) => a + b, 0);
  const canStart = Boolean(character.race && character.class) && totalAttributePoints <= ATTRIBUTE_MAX_POINTS;

  const handleSelectRace = (race: string) => {
    const updated = { ...character, race };
    setCharacter(updated);
    setStep("class");
  };

  const handleSelectClass = (className: string) => {
    const updated = { ...character, class: className };
    setCharacter(updated);
    setStep("attributes");
  };

  const handleAttributeChange = (attribute: keyof CharacterSelection["attributes"], value: number[]) => {
    setCharacter({
      ...character,
      attributes: { ...character.attributes, [attribute]: value[0] },
    });
  };

  const handleStartGame = () => {
    if (!game) return;
    sessionStorage.setItem(getCharacterStorageKey(slug), JSON.stringify(character));
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
                <Badge className="bg-accent/20 text-accent border border-accent/30">{game.genre}</Badge>
                <h1 className="text-4xl font-bold text-foreground uppercase tracking-wide">{game.title}</h1>
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

          {step === "race" && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <Badge className="bg-accent/20 text-accent border border-accent/30">{game.genre}</Badge>
                <h2 className="text-5xl font-bold text-foreground">{text.chooseRaceTitle}</h2>
                <p className="text-muted-foreground text-lg">{text.chooseRaceSubtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {races.map((race) => (
                  <Card
                    key={race.name}
                    className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
                    onClick={() => handleSelectRace(race.name)}
                  >
                    <CardContent className="p-6 text-center space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{race.name}</h3>
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
            </div>
          )}

          {step === "class" && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="flex gap-2 justify-center">
                  <Badge className="bg-accent/20 text-accent border border-accent/30">{game.genre}</Badge>
                  <Badge className="bg-accent/20 text-accent border border-accent/30">{character.race}</Badge>
                </div>
                <h2 className="text-5xl font-bold text-foreground">{text.chooseClassTitle}</h2>
                <p className="text-muted-foreground text-lg">{text.chooseClassSubtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                  <Card
                    key={cls.name}
                    className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
                    onClick={() => handleSelectClass(cls.name)}
                  >
                    <CardContent className="p-6 text-center space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{cls.name}</h3>
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

          {step === "attributes" && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="flex gap-2 justify-center">
                  <Badge className="bg-accent/20 text-accent border border-accent/30">{game.genre}</Badge>
                  <Badge className="bg-accent/20 text-accent border border-accent/30">{character.race}</Badge>
                  <Badge className="bg-accent/20 text-accent border border-accent/30">{character.class}</Badge>
                </div>
                <h2 className="text-5xl font-bold text-foreground">{text.attributesTitle}</h2>
                <p className="text-muted-foreground text-lg">{text.attributesSubtitle}</p>
                <p className="text-sm text-muted-foreground">
                  {text.pointsUsed}:{" "}
                  <span className={totalAttributePoints > ATTRIBUTE_MAX_POINTS ? "text-destructive" : "text-accent"}>
                    {totalAttributePoints}
                  </span>{" "}
                  / {ATTRIBUTE_MAX_POINTS}
                </p>
              </div>

              <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {Object.entries(character.attributes).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-foreground text-lg">
                            {getLocalizedText(attributeLabels[key as keyof CharacterSelection["attributes"]], language) ?? key}
                          </Label>
                          <span className="text-accent font-bold text-xl">{value}</span>
                        </div>
                        <Slider
                          value={[value]}
                          onValueChange={(val) => handleAttributeChange(key as keyof CharacterSelection["attributes"], val)}
                          min={1}
                          max={20}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
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

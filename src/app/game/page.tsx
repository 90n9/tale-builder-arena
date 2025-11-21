"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  ATTRIBUTE_MAX_POINTS,
  CHARACTER_STORAGE_KEY,
  attributeLabels,
  classes,
  createDefaultAttributes,
  createEmptyCharacter,
  genres,
  races,
  type CharacterSelection,
} from "@/lib/game-config";

type CharacterCreationStep = "genre" | "race" | "class" | "attributes";

const getNextStep = (current: CharacterSelection): CharacterCreationStep => {
  if (!current.genre) return "genre";
  if (!current.race) return "race";
  if (!current.class) return "class";
  return "attributes";
};

const GameSetupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<CharacterCreationStep>("genre");
  const [character, setCharacter] = useState<CharacterSelection>(createEmptyCharacter());

  useEffect(() => {
    const saved = sessionStorage.getItem(CHARACTER_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<CharacterSelection>;
      const restored: CharacterSelection = {
        genre: parsed.genre ?? "",
        race: parsed.race ?? "",
        class: parsed.class ?? "",
        attributes: { ...createDefaultAttributes(), ...(parsed.attributes ?? {}) },
      };
      setCharacter(restored);
      setStep(getNextStep(restored));
    } catch (error) {
      console.error("ไม่สามารถโหลดตัวละครที่บันทึกไว้ได้", error);
    }
  }, []);

  const totalAttributePoints = Object.values(character.attributes).reduce((a, b) => a + b, 0);
  const canStart =
    Boolean(character.genre && character.race && character.class) && totalAttributePoints <= ATTRIBUTE_MAX_POINTS;

  const handleSelectGenre = (genre: string) => {
    const updated = { ...character, genre };
    setCharacter(updated);
    setStep("race");
  };

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
    sessionStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(character));
    router.push("/game/play");
  };

  const renderGenreSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">เลือกแนวเรื่อง</h1>
          <p className="text-muted-foreground text-lg">เลือกโลกที่คุณอยากออกสำรวจ</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <Card
              key={genre.name}
              className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
              onClick={() => handleSelectGenre(genre.name)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">{genre.name}</h3>
                <p className="text-muted-foreground">{genre.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRaceSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/20 text-accent border border-accent/30">
            {character.genre}
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-4">เลือกเผ่าพันธุ์</h1>
          <p className="text-muted-foreground text-lg">เลือกรากฐานเชื้อสายของตัวละครคุณ</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {races.map((race) => (
            <Card
              key={race.name}
              className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
              onClick={() => handleSelectRace(race.name)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">{race.name}</h3>
                <p className="text-muted-foreground">{race.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setStep("genre")}
            className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ย้อนกลับไปเลือกแนว
          </Button>
        </div>
      </div>
    </div>
  );

  const renderClassSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex gap-2 justify-center mb-4">
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.genre}
            </Badge>
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.race}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">เลือกสายอาชีพ</h1>
          <p className="text-muted-foreground text-lg">เลือกบทบาทที่ตัวละครของคุณถนัด</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {classes.map((cls) => (
            <Card
              key={cls.name}
              className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
              onClick={() => handleSelectClass(cls.name)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">{cls.name}</h3>
                <p className="text-muted-foreground">{cls.description}</p>
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
            กลับไปเลือกเผ่าพันธุ์
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAttributeSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex gap-2 justify-center mb-4">
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.genre}
            </Badge>
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.race}
            </Badge>
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.class}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">ปรับค่าสถานะ</h1>
          <p className="text-muted-foreground text-lg mb-2">
            กระจายค่าสถานะให้สมดุลตามสไตล์ที่คุณอยากเล่น
          </p>
          <p className="text-sm text-muted-foreground">
            ใช้แต้มแล้ว:{" "}
            <span className={totalAttributePoints > ATTRIBUTE_MAX_POINTS ? "text-destructive" : "text-accent"}>
              {totalAttributePoints}
            </span>{" "}
            / {ATTRIBUTE_MAX_POINTS}
          </p>
        </div>

        <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card mb-8">
          <CardContent className="p-8">
            <div className="space-y-8">
              {Object.entries(character.attributes).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-foreground text-lg">
                      {attributeLabels[key as keyof CharacterSelection["attributes"]] ?? key}
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
            กลับไปเลือกสายอาชีพ
          </Button>
          <Button
            onClick={handleStartGame}
            disabled={!canStart}
            className="bg-gradient-primary hover:shadow-glow-orange"
          >
            เริ่มการผจญภัย
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      {step === "genre" && renderGenreSelection()}
      {step === "race" && renderRaceSelection()}
      {step === "class" && renderClassSelection()}
      {step === "attributes" && renderAttributeSelection()}
    </>
  );
};

export default GameSetupPage;

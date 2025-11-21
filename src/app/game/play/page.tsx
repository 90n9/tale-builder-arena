"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { RefreshCw, Loader2, Heart, Sparkles, Coins, Package, Trophy } from "lucide-react";
import gamePlaceholder from "@/assets/game-scene-placeholder.jpg";
import { randomAchievementForGenre, findAchievementById, type Achievement } from "@/data/achievements";
import {
  CHARACTER_STORAGE_KEY,
  INITIAL_CHOICES,
  INITIAL_NARRATION,
  createDefaultAttributes,
  type CharacterSelection,
} from "@/lib/game-config";

type StoryResponse = {
  turn: number;
  narration: string;
  choices: string[];
  shouldEnd: boolean;
  achievementId?: string | null;
};

type GameStep = "game" | "endgame";

const GamePlayPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<GameStep>("game");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [turn, setTurn] = useState(1);
  const [earnedAchievement, setEarnedAchievement] = useState<Achievement | null>(null);
  const [character, setCharacter] = useState<CharacterSelection | null>(null);

  const [stats] = useState({
    hp: 85,
    maxHp: 100,
    mana: 60,
    maxMana: 80,
    gold: 150,
  });

  const [inventory] = useState(["ดาบเหล็ก", "ยาฟื้นพลัง", "คบเพลิง", "แผนที่โบราณ"]);

  const [quests] = useState([
    "สำรวจดันเจี้ยนโบราณ",
    "ค้นหาโบราณวัตถุที่หายสาบสูญ",
    "กำจัดอสูรรัตติกาล",
  ]);

  const [narration, setNarration] = useState<string>(INITIAL_NARRATION);
  const [choices, setChoices] = useState<string[]>(INITIAL_CHOICES);

  useEffect(() => {
    const saved = sessionStorage.getItem(CHARACTER_STORAGE_KEY);
    if (!saved) {
      router.replace("/game");
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<CharacterSelection>;
      if (!parsed.genre || !parsed.race || !parsed.class) {
        router.replace("/game");
        return;
      }

      setCharacter({
        genre: parsed.genre,
        race: parsed.race,
        class: parsed.class,
        attributes: { ...createDefaultAttributes(), ...(parsed.attributes ?? {}) },
      });
    } catch (error) {
      console.error("ไม่สามารถโหลดตัวละครได้", error);
      router.replace("/game");
    } finally {
      setIsInitializing(false);
    }
  }, [router]);

  const handleChoice = async (choice: string) => {
    if (!character) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          choice,
          turn,
          genre: character.genre,
          race: character.race,
          className: character.class,
        }),
      });

      if (!response.ok) {
        throw new Error("ไม่สามารถประมวลผลเรื่องราวได้");
      }

      const data = (await response.json()) as StoryResponse;
      setTurn(data.turn);
      setNarration(data.narration);
      setChoices(data.choices);

      if (data.shouldEnd) {
        const achievement =
          (data.achievementId && findAchievementById(data.achievementId)) ||
          randomAchievementForGenre(character.genre) ||
          null;

        if (achievement) {
          const savedAchievements = localStorage.getItem("questWeaverAchievements");
          const earnedIds = savedAchievements ? JSON.parse(savedAchievements) : [];
          if (!earnedIds.includes(achievement.id)) {
            earnedIds.push(achievement.id);
            localStorage.setItem("questWeaverAchievements", JSON.stringify(earnedIds));
          }
          setEarnedAchievement(achievement);
        } else {
          setEarnedAchievement(null);
        }

        setStep("endgame");
      } else {
        setEarnedAchievement(null);
      }
    } catch (error) {
      console.error(error);
      setNarration(
        (previous) =>
          `${previous}\n\nคุณเลือก: ${choice}\n(ระบบขอใช้เส้นเรื่องสำรองเนื่องจากเกิดข้อผิดพลาดชั่วคราว)`,
      );
      setTurn((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestartStory = () => {
    setStep("game");
    setTurn(1);
    setNarration(INITIAL_NARRATION);
    setChoices(INITIAL_CHOICES);
    setIsLoading(false);
    setEarnedAchievement(null);
  };

  const handleChangeCharacter = () => {
    handleRestartStory();
    router.push("/game");
  };

  const renderLoadingState = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
          <CardContent className="p-12 flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-accent animate-spin" />
            <p className="text-muted-foreground text-lg text-center">กำลังเตรียมการผจญภัยของคุณ...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGame = () => {
    if (!character) return null;

    return (
      <div className="min-h-screen bg-background">
        <div className="pt-20 pb-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <div className="flex gap-2 mb-2">
                  <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                    {character.race}
                  </Badge>
                  <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                    {character.class}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-1">การผจญภัยปัจจุบัน</h1>
                <p className="text-muted-foreground">เทิร์นที่ {turn} • บทที่ 1: ดันเจี้ยนโบราณ</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRestartStory}
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  เริ่มใหม่
                </Button>
                <Button variant="secondary" onClick={handleChangeCharacter}>
                  เปลี่ยนตัวละคร
                </Button>
              </div>
            </div>

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
                          src={gamePlaceholder}
                          alt="ฉากปัจจุบัน"
                          fill
                          priority
                          className="object-cover"
                          sizes="(min-width: 1024px) 66vw, 100vw"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      เรื่องราว
                    </h2>
                    <ScrollArea className="h-[300px] pr-4">
                      <p className="text-foreground leading-relaxed whitespace-pre-line">{narration}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">คุณจะทำอะไรต่อ?</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {choices.map((choice, index) => (
                        <Button
                          key={index}
                          onClick={() => handleChoice(choice)}
                          disabled={isLoading}
                          className="h-auto py-4 text-left justify-start bg-card hover:bg-muted border-2 border-accent/50 text-foreground hover:border-accent hover:shadow-glow-cyan transition-all"
                          variant="outline"
                        >
                          <span className="text-accent font-bold mr-3">{index + 1}.</span>
                          {choice}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">สถานะตัวละคร</h2>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-destructive" />
                            <span className="text-sm font-medium text-foreground">HP</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stats.hp}/{stats.maxHp}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-destructive transition-all"
                            style={{ width: `${(stats.hp / stats.maxHp) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-foreground">Mana</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stats.mana}/{stats.maxMana}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{ width: `${(stats.mana / stats.maxMana) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium text-foreground">Gold</span>
                        </div>
                        <span className="text-sm font-semibold text-secondary">{stats.gold}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Package className="h-5 w-5 text-accent" />
                      ช่องเก็บของ
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {inventory.map((item, index) => (
                        <Badge key={index} variant="secondary" className="bg-accent/20 text-accent border border-accent/30">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">ภารกิจที่ทำอยู่</h2>
                    <ul className="space-y-3">
                      {quests.map((quest, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-sm text-foreground">{quest}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEndGame = () => {
    if (!character) return null;

    return (
      <div className="min-h-screen bg-background pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="mb-8">
              <Sparkles className="h-20 w-20 text-accent mx-auto mb-4 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4">การผจญภัยเสร็จสมบูรณ์!</h1>
            <p className="text-muted-foreground text-xl">การเดินทางในดันเจี้ยนโบราณมาถึงบทสรุปแล้ว</p>
          </div>

          <Card className="ornate-corners border-2 border-accent/50 bg-gradient-card shadow-glow-cyan mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">สรุปเส้นทาง</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-accent">ข้อมูลตัวละคร</h3>
                    <div className="space-y-2 text-foreground">
                      <p>
                        <span className="text-muted-foreground">แนวเรื่อง:</span> {character.genre}
                      </p>
                      <p>
                        <span className="text-muted-foreground">เผ่าพันธุ์:</span> {character.race}
                      </p>
                      <p>
                        <span className="text-muted-foreground">สายอาชีพ:</span> {character.class}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-accent">สถิติการผจญภัย</h3>
                    <div className="space-y-2 text-foreground">
                      <p>
                        <span className="text-muted-foreground">จำนวนเทิร์น:</span> {turn}
                      </p>
                      <p>
                        <span className="text-muted-foreground">HP สุดท้าย:</span> {stats.hp}/{stats.maxHp}
                      </p>
                      <p>
                        <span className="text-muted-foreground">ทองที่เก็บได้:</span> {stats.gold}
                      </p>
                    </div>
                  </div>
                </div>

                {earnedAchievement && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      ปลดล็อกความสำเร็จ!
                    </h3>
                    <Card className="ornate-corners border-2 border-secondary/50 bg-secondary/10">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Trophy className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-xl font-bold text-secondary mb-2">{earnedAchievement.name}</h4>
                            <p className="text-foreground mb-2">{earnedAchievement.description}</p>
                            <Badge className="bg-secondary/20 text-secondary border border-secondary/30 capitalize">
                              {earnedAchievement.rarity}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3 text-center">เรื่องเล่าของคุณ</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    คุณกล้าก้าวสู่ความไม่รู้ เผชิญอันตรายมากมาย และกลับออกมาพร้อมชัยชนะ เรื่องราวความกล้าหาญจะถูกเล่าขานในโรงเตี๊ยมทั่วทุกแคว้น พร้อมจะออกผจญภัยอีกครั้งหรือไม่?
                  </p>
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
                ดูความสำเร็จทั้งหมด
              </Link>
            </Button>
            <Button onClick={handleRestartStory} className="bg-gradient-primary hover:shadow-glow-orange text-lg px-8 py-6">
              <RefreshCw className="h-5 w-5 mr-2" />
              เล่นอีกครั้ง
            </Button>
            <Button
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={handleChangeCharacter}
            >
              เปลี่ยนตัวละคร
            </Button>
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

  if (!character) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-20 pb-8 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
              <CardContent className="p-12 text-center space-y-4">
                <Sparkles className="h-10 w-10 text-accent mx-auto" />
                <p className="text-lg text-muted-foreground">
                  โปรดตั้งค่าตัวละครก่อนเริ่มเล่น
                </p>
                <Button onClick={() => router.push("/game")} className="bg-gradient-primary hover:shadow-glow-orange">
                  ไปที่หน้าเลือกเกม
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
      {step === "game" && renderGame()}
      {step === "endgame" && renderEndGame()}
    </>
  );
};

export default GamePlayPage;

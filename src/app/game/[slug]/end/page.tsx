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
import { getEndSummaryStorageKey, type AdventureSummary } from "@/lib/game-config";

const EndGamePage = () => {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug ?? "").toString();
  const router = useRouter();
  const game = useMemo(() => findGameBySlug(slug), [slug]);
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
                <p className="text-muted-foreground text-lg text-center">กำลังดึงข้อมูลสรุปการผจญภัย...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  const { character, stats, turn } = summary;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="mb-8">
              <Sparkles className="h-20 w-20 text-accent mx-auto mb-4 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4">{game.title} เสร็จสิ้น!</h1>
            <p className="text-muted-foreground text-xl">{game.tagline}</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-accent/20 text-accent border border-accent/30">{character.race}</Badge>
              <Badge className="bg-accent/20 text-accent border border-accent/30">{character.class}</Badge>
            </div>
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

                {achievement && (
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
                            <h4 className="text-xl font-bold text-secondary mb-2">{achievement.name}</h4>
                            <p className="text-foreground mb-2">{achievement.description}</p>
                            <Badge className="bg-secondary/20 text-secondary border border-secondary/30 capitalize">
                              {achievement.rarity}
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
                    คุณก้าวผ่านบททดสอบจาก {game.title} และกลับออกมาพร้อมประสบการณ์ล้ำค่า
                    พร้อมจะออกผจญภัยอีกครั้งหรือไม่?
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
            <Button onClick={handleReplay} className="bg-gradient-primary hover:shadow-glow-orange text-lg px-8 py-6">
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
    </>
  );
};

export default EndGamePage;

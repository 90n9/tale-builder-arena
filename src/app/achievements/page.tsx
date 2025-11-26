"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Lock, Star } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ALL_ACHIEVEMENTS, type Achievement } from "@/data/achievements";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText } from "@/lib/i18n";
import { trackInteraction } from "@/lib/analytics";

const AchievementsPage = () => {
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [hasLoaded, setHasLoaded] = useState(false);
  const { language } = useLanguage();
  const copy = {
    th: {
      title: "ความสำเร็จ",
      description: "ปลดล็อกถ้วยรางวัลจากการพิชิตเส้นทางการผจญภัยที่แตกต่างกัน",
      progress: "ความคืบหน้าโดยรวม",
      percentSuffix: "% สำเร็จ",
      filterAll: "ทั้งหมด",
      lockedName: "???",
      lockedDescription: "พิชิตฉากจบนี้เพื่อปลดล็อก",
      emptyTitle: "ยังไม่มีความสำเร็จ",
      emptySubtitle: "เริ่มการผจญภัยแรกของคุณเพื่อปลดล็อกถ้วยรางวัล!",
    },
    en: {
      title: "Achievements",
      description: "Unlock trophies by completing different adventure paths.",
      progress: "Overall progress",
      percentSuffix: "% complete",
      filterAll: "All",
      lockedName: "???",
      lockedDescription: "Finish this ending to unlock",
      emptyTitle: "No achievements yet",
      emptySubtitle: "Start your first adventure to earn a trophy!",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;

  useEffect(() => {
    // Load earned achievements from localStorage
    const saved = localStorage.getItem("questWeaverAchievements");
    if (saved) {
      setEarnedAchievements(JSON.parse(saved));
    }
    setHasLoaded(true);
  }, []);

  const genres = useMemo(() => {
    const options = new Map<string, string>();
    ALL_ACHIEVEMENTS.forEach((achievement) => {
      options.set(achievement.genre, getLocalizedText(achievement.genreLabel, language));
    });
    return [
      { value: "all", label: text.filterAll },
      ...Array.from(options.entries()).map(([value, label]) => ({ value, label })),
    ];
  }, [language, text.filterAll]);

  const filteredAchievements = selectedGenre === "all" 
    ? ALL_ACHIEVEMENTS 
    : ALL_ACHIEVEMENTS.filter(a => a.genre === selectedGenre);

  const earnedCount = earnedAchievements.length;
  const totalCount = ALL_ACHIEVEMENTS.length;
  const progressPercent = Math.round((earnedCount / totalCount) * 100);

  const rarityLabels: Record<Achievement["rarity"], string> =
    language === "en"
      ? { legendary: "Legendary", epic: "Epic", rare: "Rare", common: "Common" }
      : { legendary: "ตำนาน", epic: "มหากาพย์", rare: "หายาก", common: "ทั่วไป" };

  useEffect(() => {
    if (!hasLoaded) return;
    trackInteraction({
      action: "achievements-view",
      category: "progress",
      label: `${earnedCount}/${totalCount}`,
      params: { count_unlocked: earnedCount, total: totalCount, language },
    });
  }, [earnedCount, hasLoaded, language, totalCount]);

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "legendary": return "text-secondary border-secondary/50 bg-secondary/10";
      case "epic": return "text-purple-400 border-purple-400/50 bg-purple-400/10";
      case "rare": return "text-accent border-accent/50 bg-accent/10";
      case "common": return "text-muted-foreground border-muted-foreground/50 bg-muted-foreground/10";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <PageHeader
              title={text.title}
              description={text.description}
              icon={<Trophy className="h-11 w-11" />}
            />

            <Card className="max-w-xl mx-auto ornate-corners border-2 border-accent/50 bg-gradient-card shadow-glow-cyan mt-10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-foreground">{text.progress}</span>
                  <span className="text-2xl font-bold text-accent">{earnedCount}/{totalCount}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{progressPercent}{text.percentSuffix}</p>
              </CardContent>
            </Card>
          </div>

          {/* Genre Tabs */}
          <Tabs value={selectedGenre} onValueChange={setSelectedGenre} className="w-full">
            <TabsList className="w-full grid grid-cols-3 lg:grid-cols-7 gap-2 h-auto p-2 bg-card/50 backdrop-blur-sm border-2 border-border">
              {genres.map((genre) => (
                <TabsTrigger 
                  key={genre.value} 
                  value={genre.value}
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground capitalize"
                >
                  {genre.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedGenre} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => {
                  const isEarned = earnedAchievements.includes(achievement.id);
                  
                  return (
                    <Card
                      key={achievement.id}
                      className={`ornate-corners border-2 transition-all ${
                        isEarned 
                          ? "border-accent/50 bg-gradient-card hover:shadow-glow-cyan" 
                          : "border-border/30 bg-card/30 opacity-60"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${isEarned ? "bg-accent/20" : "bg-muted/50"}`}>
                            {isEarned ? (
                              <Trophy className="h-8 w-8 text-accent" />
                            ) : (
                              <Lock className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                             <h3 className={`font-bold text-lg ${isEarned ? "text-foreground" : "text-muted-foreground"}`}>
                                {isEarned ? getLocalizedText(achievement.name, language) : text.lockedName}
                              </h3>
                              <Star className={`h-4 w-4 flex-shrink-0 ${getRarityColor(achievement.rarity).split(' ')[0]}`} />
                            </div>
                            
                            <Badge className={`mb-3 text-xs ${getRarityColor(achievement.rarity)}`}>
                              {rarityLabels[achievement.rarity]}
                            </Badge>
                            
                            <p className={`text-sm leading-relaxed ${isEarned ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                              {isEarned
                                ? getLocalizedText(achievement.description, language)
                                : text.lockedDescription}
                            </p>
                            
                            <div className="mt-3 pt-3 border-t border-border/30">
                              <p className="text-xs text-muted-foreground">
                                {getLocalizedText(achievement.genreLabel, language)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {earnedCount === 0 && (
            <div className="text-center mt-12">
              <Card className="max-w-md mx-auto ornate-corners border-2 border-border bg-gradient-card">
                <CardContent className="p-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{text.emptyTitle}</h3>
                  <p className="text-muted-foreground">{text.emptySubtitle}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AchievementsPage;

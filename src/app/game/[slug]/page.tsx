"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass, MessageSquare, Star, Trophy, Users, Clock3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ALL_ACHIEVEMENTS, type Achievement } from "@/data/achievements";
import { findGameBySlug } from "@/data/games";
import { useLanguage } from "@/contexts/language-context";
import { getCharacterStorageKey, getEndSummaryStorageKey } from "@/lib/game-config";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";

const gamePlaceholderSrc = "/assets/game-scene-placeholder.jpg";

type MockComment = {
  id: string;
  author: string;
  role: LocalizedText;
  content: LocalizedText;
  rating: number;
  timeAgo: LocalizedText;
};

type MockRatingStat = {
  id: string;
  label: LocalizedText;
  value: number;
};

const mockComments: MockComment[] = [
  {
    id: "c1",
    author: "พลอย",
    role: { th: "DM มือใหม่", en: "New DM" },
    rating: 4.8,
    content: {
      th: "เล่าเนื้อเรื่องลื่นมาก มีจังหวะลุ้นแบบต่อเนื่อง เหมาะให้เพื่อนลองเล่นรอบแรกก่อนเริ่มแคมเปญใหญ่",
      en: "Story beats flow well with constant tension. Great as a first run before a longer campaign.",
    },
    timeAgo: { th: "2 วันที่แล้ว", en: "2 days ago" },
  },
  {
    id: "c2",
    author: "Mark",
    role: { th: "ผู้เล่นสายสำรวจ", en: "Explorer" },
    rating: 4.6,
    content: {
      th: "ชอบที่มีหลายเส้นทางและโบนัสค่าสเตตัสระหว่างฉาก ทำให้รู้สึกว่าการตัดสินใจส่งผลจริงๆ",
      en: "Loved the branching paths and mid-scene stat rewards. Choices actually change the run.",
    },
    timeAgo: { th: "1 สัปดาห์ที่แล้ว", en: "1 week ago" },
  },
  {
    id: "c3",
    author: "อิ่มอุ่น",
    role: { th: "เล่นกับกลุ่มเพื่อน", en: "Party runner" },
    rating: 4.9,
    content: {
      th: "บรรยากาศอาร์ตเวิร์กและโทนเรื่องดีมาก ระบบค่าสถานะไม่ซับซ้อน เล่นกับเพื่อนใหม่ได้เลย",
      en: "Art vibe and tone are great. Attribute setup is simple enough to onboard new friends fast.",
    },
    timeAgo: { th: "เมื่อวาน", en: "yesterday" },
  },
];

const mockRatingStats: MockRatingStat[] = [
  { id: "pacing", label: { th: "จังหวะเล่าเรื่อง", en: "Story pacing" }, value: 4.8 },
  { id: "challenge", label: { th: "ความท้าทาย", en: "Challenge" }, value: 4.4 },
  { id: "mood", label: { th: "บรรยากาศ", en: "Atmosphere" }, value: 4.7 },
];

const GameDetailPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug ?? "").toString();
  const router = useRouter();
  const game = useMemo(() => findGameBySlug(slug), [slug]);
  const { language } = useLanguage();
  const [hasCharacter, setHasCharacter] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);
  const [comments, setComments] = useState(mockComments);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentMessage, setNewCommentMessage] = useState("");
  const [ratingValue, setRatingValue] = useState<number>(4.5);
  const [ratingNote, setRatingNote] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const copy = {
    th: {
      backToList: "กลับไปเลือกเกม",
      setupCta: "ตั้งค่าตัวละคร",
      resumeCta: "เล่นต่อ",
      startAdventure: "เริ่มการผจญภัย",
      achievementsTitle: "ปลดล็อกความสำเร็จของเรื่องนี้",
      achievementsSubtitle: "ดูฉากจบและถ้วยรางวัลที่ปลดล็อกได้ในเส้นเรื่องนี้",
      achievementsEmpty: "ยังไม่มีข้อมูลความสำเร็จสำหรับเกมนี้",
      achievementUnlocked: "ปลดล็อกแล้ว (ข้อมูลจำลอง)",
      achievementLocked: "ยังไม่ปลดล็อก",
      ratingTitle: "คะแนนความพึงพอใจ (จำลอง)",
      ratingSubtitle: "ข้อมูลรีวิวตัวอย่างเพื่อจัดวางหน้ารายละเอียดเกม",
      commentsTitle: "ความคิดเห็นจากผู้เล่น (จำลอง)",
      recommendCopy: "ผู้เล่นเลือกเล่นซ้ำ",
      ratingAverage: "ค่าเฉลี่ย",
      ratingSamples: "เรตติ้งตัวอย่าง",
      commentFormTitle: "เพิ่มความคิดเห็นของคุณ",
      commentNameLabel: "ชื่อเล่น",
      commentMessageLabel: "ข้อความ",
      commentSubmit: "ส่งความคิดเห็น",
      ratingFormTitle: "ให้คะแนนเกมนี้",
      ratingValueLabel: "คะแนน (1-5)",
      ratingNoteLabel: "เพิ่มเติม (ไม่บังคับ)",
      ratingSubmit: "ส่งคะแนนจำลอง",
      ratingSubmitted: "บันทึกคะแนนจำลองแล้ว",
    },
    en: {
      backToList: "Back to games",
      setupCta: "Set up character",
      resumeCta: "Continue",
      startAdventure: "Start adventure",
      achievementsTitle: "Unlock endings for this tale",
      achievementsSubtitle: "Browse the endings and trophies available for this storyline.",
      achievementsEmpty: "No achievements found for this game yet",
      achievementUnlocked: "Unlocked (mock data)",
      achievementLocked: "Locked",
      ratingTitle: "Player sentiment (mock)",
      ratingSubtitle: "Sample review data to shape the detail layout.",
      commentsTitle: "Player comments (mock)",
      recommendCopy: "players replayed this run",
      ratingAverage: "Average",
      ratingSamples: "sample ratings",
      commentFormTitle: "Add your comment",
      commentNameLabel: "Nickname",
      commentMessageLabel: "Message",
      commentSubmit: "Submit comment",
      ratingFormTitle: "Rate this game",
      ratingValueLabel: "Score (1-5)",
      ratingNoteLabel: "Optional note",
      ratingSubmit: "Submit rating (mock)",
      ratingSubmitted: "Mock rating saved",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;
  const rarityLabels: Record<Achievement["rarity"], LocalizedText> = {
    legendary: { th: "ตำนาน", en: "Legendary" },
    epic: { th: "มหากาพย์", en: "Epic" },
    rare: { th: "หายาก", en: "Rare" },
    common: { th: "ทั่วไป", en: "Common" },
  };

  const achievementsForGame = useMemo(
    () => ALL_ACHIEVEMENTS.filter((achievement) => achievement.gameId === slug),
    [slug],
  );

  const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newCommentMessage.trim()) return;
    const id = `new-${Date.now()}`;
    const name = newCommentName.trim() || (language === "en" ? "Guest" : "ผู้มาเยือน");
    const nextComment: MockComment = {
      id,
      author: name,
      role: { th: "ส่งจากฟอร์ม", en: "Submitted via form" },
      content: { th: newCommentMessage, en: newCommentMessage },
      rating: ratingValue || 4.5,
      timeAgo: { th: "เพิ่งส่ง", en: "Just now" },
    };
    setComments((prev) => [nextComment, ...prev]);
    setNewCommentMessage("");
    setNewCommentName("");
  };

  const handleSubmitRating = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRatingSubmitted(true);
    setTimeout(() => setRatingSubmitted(false), 2500);
  };

  useEffect(() => {
    if (!game) {
      router.replace("/game");
      return;
    }

    const characterKey = getCharacterStorageKey(slug);
    const summaryKey = getEndSummaryStorageKey(slug);
    setHasCharacter(Boolean(sessionStorage.getItem(characterKey)));
    setHasSummary(Boolean(sessionStorage.getItem(summaryKey)));
  }, [game, router, slug]);

  if (!game) {
    return null;
  }

  const coverSrc = game.coverImage || gamePlaceholderSrc;
  const hasOngoingRun = hasCharacter && !hasSummary;
  const primaryCtaLabel = hasOngoingRun ? text.resumeCta : text.startAdventure;
  const primaryCtaHref: `/game/${string}` = hasOngoingRun ? `/game/${slug}/play` : `/game/${slug}/init`;

  const unlockedAchievementIds = new Set(
    achievementsForGame.slice(0, 2).map((achievement) => achievement.id),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/game")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {text.backToList}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Compass className="h-4 w-4 text-secondary" />
              <span>{getLocalizedText(game.genreLabel, language)}</span>
            </div>
          </div>

          <Card className="relative overflow-hidden ornate-corners border-2 border-border bg-card/40 shadow-card">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${coverSrc})` }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/60" aria-hidden />
            <CardContent className="relative z-10 p-8 md:p-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-3">
                  <Badge className="bg-accent/20 text-accent border border-accent/30">
                    {getLocalizedText(game.genreLabel, language)}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide">
                    {getLocalizedText(game.title, language)}
                  </h1>
                  <p className="text-secondary font-semibold text-lg">
                    {getLocalizedText(game.tagline, language)}
                  </p>
                  <p className="text-muted-foreground max-w-3xl leading-relaxed">
                    {getLocalizedText(game.description, language)}
                  </p>
                </div>

                <div className="w-full md:w-auto md:min-w-[260px] space-y-4">
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => router.push(primaryCtaHref)}
                      className="w-full bg-gradient-primary hover:shadow-glow-orange"
                    >
                      {primaryCtaLabel}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-10">
            <Card className="border-2 border-accent/40 bg-card/70 shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">{text.ratingTitle}</p>
                    <p className="text-sm text-muted-foreground">{text.ratingSubtitle}</p>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-foreground">4.7</span>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{text.recommendCopy}</p>
                    <div className="flex items-center gap-1 text-sm text-secondary">
                      <Users className="h-4 w-4" />
                      <span>120</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {mockRatingStats.map((stat) => (
                    <div key={stat.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{getLocalizedText(stat.label, language)}</span>
                        <span className="text-foreground font-semibold">{stat.value.toFixed(1)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary"
                          style={{ width: `${(stat.value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div id="achievements" className="space-y-4 scroll-mt-24">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{text.achievementsTitle}</h2>
                <p className="text-muted-foreground">{text.achievementsSubtitle}</p>
              </div>
              {achievementsForGame.length === 0 ? (
                <Card className="border-dashed border-2 border-border/50 bg-card/50">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    {text.achievementsEmpty}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {achievementsForGame.map((achievement) => {
                    const isUnlocked = unlockedAchievementIds.has(achievement.id);
                    return (
                      <Card
                        key={achievement.id}
                        className={`border-2 ${
                          isUnlocked ? "border-accent/50 bg-gradient-card" : "border-border bg-card/40"
                        } shadow-card`}
                      >
                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${isUnlocked ? "bg-accent/20" : "bg-muted/60"}`}>
                              <Trophy className={isUnlocked ? "h-6 w-6 text-accent" : "h-6 w-6 text-muted-foreground"} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-muted-foreground">
                                {getLocalizedText(achievement.genreLabel, language)}
                              </p>
                              <h3 className="text-lg font-semibold text-foreground truncate">
                                {getLocalizedText(achievement.name, language)}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {getLocalizedText(achievement.description, language)}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <Badge
                              variant="outline"
                              className={
                                achievement.rarity === "legendary"
                                  ? "text-secondary border-secondary/60"
                                  : achievement.rarity === "epic"
                                  ? "text-purple-400 border-purple-400/60"
                                  : achievement.rarity === "rare"
                                  ? "text-accent border-accent/50"
                                  : "text-muted-foreground border-muted-foreground/50"
                              }
                            >
                              {getLocalizedText(rarityLabels[achievement.rarity], language)}
                            </Badge>
                            <span className="text-muted-foreground">
                              {isUnlocked ? text.achievementUnlocked : text.achievementLocked}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-6">
              <Card className="ornate-corners border-2 border-border bg-card/70 shadow-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">{text.commentsTitle}</p>
                      <p className="text-sm text-muted-foreground">{text.ratingSubtitle}</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitComment} className="space-y-3 bg-background/80 rounded-lg border border-border/50 p-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm text-muted-foreground" htmlFor="comment-name">
                          {text.commentNameLabel}
                        </label>
                        <Input
                          id="comment-name"
                          value={newCommentName}
                          onChange={(e) => setNewCommentName(e.target.value)}
                          placeholder={language === "en" ? "Your name" : "ชื่อของคุณ"}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-muted-foreground" htmlFor="comment-rating">
                          {text.ratingValueLabel}
                        </label>
                        <Input
                          id="comment-rating"
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={ratingValue}
                          onChange={(e) => setRatingValue(Number(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground" htmlFor="comment-message">
                        {text.commentMessageLabel}
                      </label>
                      <Textarea
                        id="comment-message"
                        value={newCommentMessage}
                        onChange={(e) => setNewCommentMessage(e.target.value)}
                        placeholder={language === "en" ? "Share your quick thoughts" : "เล่าความเห็นของคุณ"}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-gradient-primary hover:shadow-glow-orange">
                        {text.commentSubmit}
                      </Button>
                    </div>
                  </form>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <Card key={comment.id} className="border border-border/60 bg-background/60">
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-foreground font-semibold">{comment.author}</p>
                              <p className="text-sm text-muted-foreground">
                                {getLocalizedText(comment.role, language)} • {getLocalizedText(comment.timeAgo, language)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-accent">
                              <Star className="h-4 w-4 fill-accent" />
                              <span className="text-sm font-semibold">{comment.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {getLocalizedText(comment.content, language)}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/40 bg-gradient-card shadow-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">{text.ratingTitle}</p>
                      <p className="text-sm text-muted-foreground">{text.ratingSubtitle}</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitRating} className="space-y-3 bg-background/60 rounded-lg border border-border/40 p-4">
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground" htmlFor="rating-value">
                        {text.ratingValueLabel}
                      </label>
                      <Input
                        id="rating-value"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={ratingValue}
                        onChange={(e) => setRatingValue(Number(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground" htmlFor="rating-note">
                        {text.ratingNoteLabel}
                      </label>
                      <Textarea
                        id="rating-note"
                        rows={3}
                        value={ratingNote}
                        onChange={(e) => setRatingNote(e.target.value)}
                        placeholder={language === "en" ? "Share a quick note" : "เขียนเพิ่มเติม (ไม่บังคับ)"}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      {ratingSubmitted && (
                        <span className="text-xs text-secondary">{text.ratingSubmitted}</span>
                      )}
                      <Button type="submit" variant="outline" className="border-accent/60">
                        {text.ratingSubmit}
                      </Button>
                    </div>
                  </form>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold text-foreground leading-none">4.7</span>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{text.ratingAverage}</p>
                      <p className="text-sm text-muted-foreground">128 {text.ratingSamples}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars, index) => {
                      const width = Math.max(20, 80 - index * 12);
                      return (
                        <div key={stars} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="w-6 text-right">{stars}★</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-accent" style={{ width: `${width}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;

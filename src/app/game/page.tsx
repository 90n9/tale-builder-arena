import Link from "next/link";
import { ArrowRight, Compass, Map, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GAME_STORIES } from "@/data/games";

const GameListPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-4">
            <div className="section-divider mb-8" />
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/30 uppercase tracking-wide text-sm">
              <Compass className="h-4 w-4" />
              เลือกสนามผจญภัย
            </p>
            <h1 className="text-5xl font-bold text-foreground">เลือกเรื่องราวที่อยากเล่น</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              แต่ละแคมเปญถูกสร้างขึ้นให้มีโทนและความยากต่างกัน เลือกโลกที่ถูกใจแล้วไปตั้งค่าตัวละครก่อนออกเดินทาง
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {GAME_STORIES.map((game) => (
              <Card
                key={game.slug}
                className="ornate-corners border-2 border-border bg-gradient-card shadow-card backdrop-blur-sm hover:border-accent hover:shadow-glow-cyan transition-all duration-300"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="bg-accent/20 text-accent border border-accent/30">{game.genre}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Map className="h-4 w-4 text-secondary" />
                      {game.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">{game.title}</h3>
                    <p className="text-secondary font-semibold">{game.tagline}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{game.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {game.highlights.map((highlight) => (
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

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      โทน: <span className="text-foreground">{game.tone}</span>
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-primary hover:shadow-glow-orange text-primary-foreground border-2 border-secondary/50"
                    >
                      <Link href={`/game/${game.slug}`}>
                        ตั้งค่าการผจญภัย
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameListPage;

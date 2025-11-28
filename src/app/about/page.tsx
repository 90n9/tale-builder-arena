"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Zap, BookOpen, UserPlus, GitBranch } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { aboutContent } from "@/data/about-content";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";

const AboutPage = () => {
  const { language } = useLanguage();
  const t = (value: LocalizedText) => getLocalizedText(value, language);
  const content = aboutContent;

  const uniquePoints = [
    { icon: <Zap className="h-5 w-5 text-primary" />, ...content.values.bullets[0] },
    { icon: <BookOpen className="h-5 w-5 text-secondary" />, ...content.values.bullets[1] },
    { icon: <GitBranch className="h-5 w-5 text-primary" />, ...content.values.bullets[2] },
    { icon: <UserPlus className="h-5 w-5 text-secondary" />, ...content.values.bullets[3] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <PageHeader
              title={t(content.headerTitle)}
              description={t(content.headerDescription)}
            />
          </div>

          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card mb-12">
            <CardContent className="p-8 space-y-6">
              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{t(content.intro.heading)}</h2>
                {content.intro.body.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {t(paragraph)}
                  </p>
                ))}
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{t(content.inspiration.heading)}</h2>
                {content.inspiration.body.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {t(paragraph)}
                  </p>
                ))}
              </section>

              <section className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">{t(content.values.heading)}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t(content.values.lead)}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {uniquePoints.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border-2 border-border/60 bg-background/60 backdrop-blur-sm hover:border-accent/60 transition-all ornate-corners"
                    >
                      <div className="text-accent mt-1">{item.icon}</div>
                      <div className="space-y-1">
                        <p className="text-foreground font-semibold">{t(item.title)}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{t(item.body)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">{t(content.missionVision.heading)}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border-2 border-border/60 bg-background/60 backdrop-blur-sm ornate-corners">
                    <p className="text-foreground font-semibold mb-2">{t(content.missionVision.missionTitle)}</p>
                    <p className="text-muted-foreground leading-relaxed">{t(content.missionVision.missionBody)}</p>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-border/60 bg-background/60 backdrop-blur-sm ornate-corners">
                    <p className="text-foreground font-semibold mb-2">{t(content.missionVision.visionTitle)}</p>
                    <p className="text-muted-foreground leading-relaxed">{t(content.missionVision.visionBody)}</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{t(content.team.heading)}</h2>
                <p className="text-muted-foreground leading-relaxed">{t(content.team.lead)}</p>
                <p className="text-muted-foreground leading-relaxed">{t(content.team.solo)}</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{t(content.invitation.heading)}</h2>
                {content.invitation.body.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {t(paragraph)}
                  </p>
                ))}
              </section>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              {t(content.ctaText)}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary hover:shadow-glow-orange transition-all text-base font-semibold"
            >
              <Link href="/game">{t(content.ctaButton)}</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;

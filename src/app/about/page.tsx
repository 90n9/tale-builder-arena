'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Zap, BookOpen, UserPlus, GitBranch } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { aboutContent } from '@/data/about-content';
import { getLocalizedText, type LocalizedText } from '@/lib/i18n';

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

      <div className="px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <PageHeader title={t(content.headerTitle)} description={t(content.headerDescription)} />
          </div>

          <Card className="ornate-corners mb-12 border-2 border-border bg-gradient-card shadow-card">
            <CardContent className="space-y-6 p-8">
              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{t(content.intro.heading)}</h2>
                {content.intro.body.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-muted-foreground">
                    {t(paragraph)}
                  </p>
                ))}
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {t(content.inspiration.heading)}
                </h2>
                {content.inspiration.body.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-muted-foreground">
                    {t(paragraph)}
                  </p>
                ))}
              </section>

              <section className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {t(content.values.heading)}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">{t(content.values.lead)}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {uniquePoints.map((item, index) => (
                    <div
                      key={index}
                      className="ornate-corners flex items-start gap-3 rounded-lg border-2 border-border/60 bg-background/60 p-4 backdrop-blur-sm transition-all hover:border-accent/60"
                    >
                      <div className="mt-1 text-accent">{item.icon}</div>
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">{t(item.title)}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {t(item.body)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {t(content.missionVision.heading)}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="ornate-corners rounded-lg border-2 border-border/60 bg-background/60 p-4 backdrop-blur-sm">
                    <p className="mb-2 font-semibold text-foreground">
                      {t(content.missionVision.missionTitle)}
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                      {t(content.missionVision.missionBody)}
                    </p>
                  </div>
                  <div className="ornate-corners rounded-lg border-2 border-border/60 bg-background/60 p-4 backdrop-blur-sm">
                    <p className="mb-2 font-semibold text-foreground">
                      {t(content.missionVision.visionTitle)}
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                      {t(content.missionVision.visionBody)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{t(content.team.heading)}</h2>
                <p className="leading-relaxed text-muted-foreground">{t(content.team.lead)}</p>
                <p className="leading-relaxed text-muted-foreground">{t(content.team.solo)}</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {t(content.invitation.heading)}
                </h2>
                {content.invitation.body.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-muted-foreground">
                    {t(paragraph)}
                  </p>
                ))}
              </section>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="mb-6 text-muted-foreground">{t(content.ctaText)}</p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-base font-semibold transition-all hover:shadow-glow-orange"
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

'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { landingContent } from '@/data/landing-content';
import { PrimaryActionButton, SecondaryActionButton } from '@/components/ActionButtons';
import { KO_FI_URL } from '@/lib/external-links';
import { Heart, Coffee, Server, Wrench, PenTool, Timer, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Server,
  Wrench,
  PenTool,
  Timer,
};

export const DonationSection = () => {
  const content = landingContent.donation;

  const donationItems = content.bullets.map((item) => {
    const Icon = iconMap[item.iconName] || Server;
    return {
      ...item,
      text: item.text,
      icon: (
        <Icon
          className={`h-6 w-6 ${['Server', 'PenTool'].includes(item.iconName) ? 'text-primary' : 'text-secondary'}`}
        />
      ),
    };
  });

  return (
    <section className="container mx-auto px-4 pb-28">
      <Card className="ornate-corners relative overflow-hidden border-2 border-border/70 bg-gradient-card shadow-epic">
        <div className="bg-gradient-overlay pointer-events-none absolute inset-0" />
        <CardContent className="relative p-10 md:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-primary/40 bg-primary/15 p-3 text-primary">
                  <Heart className="h-6 w-6 fill-destructive text-destructive" />
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent">{content.eyebrow}</p>
              </div>
              <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl">
                {content.heading}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{content.description}</p>
              <div className="flex flex-wrap gap-3">
                <PrimaryActionButton asChild size="lg" className="font-semibold">
                  <Link href="/donate">{content.primaryCta}</Link>
                </PrimaryActionButton>
                <SecondaryActionButton asChild size="lg">
                  <a
                    href={KO_FI_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-ga-event="ko-fi-click"
                    data-ga-category="donation"
                    data-ga-label="landing-donation"
                  >
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      <span>{content.secondaryCta}</span>
                    </div>
                  </a>
                </SecondaryActionButton>
              </div>
            </div>

            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              {donationItems.map((item) => (
                <div
                  key={item.text}
                  className="ornate-corners flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-4 backdrop-blur-sm transition-all hover:border-accent/60"
                >
                  <div className="mt-1">{item.icon}</div>
                  <p className="leading-relaxed text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

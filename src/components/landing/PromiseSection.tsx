'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { landingContent } from '@/data/landing-content';
import { Zap, Image, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Image,
};

export const PromiseSection = () => {
  const content = landingContent.promise;

  const pillars = content.pillars.map((pillar) => {
    const Icon = iconMap[pillar.iconName] || Zap;
    return {
      ...pillar,
      title: pillar.title,
      description: pillar.description,
      icon: (
        <Icon
          className={`h-7 w-7 ${pillar.iconName === 'Zap' ? 'text-primary' : 'text-secondary'}`}
        />
      ),
    };
  });

  return (
    <section className="relative pb-20 pt-16">
      <div className="absolute inset-0 bg-gradient-card opacity-50" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 space-y-6 text-center">
          <h2 className="text-5xl font-bold text-foreground">{content.heading}</h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm transition-all hover:border-accent/60 hover:shadow-card"
            >
              <CardContent className="space-y-3 p-8">
                <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

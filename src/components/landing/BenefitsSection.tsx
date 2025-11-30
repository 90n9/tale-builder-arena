'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { landingContent } from '@/data/landing-content';
import { Heart, GitBranch, Zap, Sparkles, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  GitBranch,
  Zap,
  Sparkles,
};

export const BenefitsSection = () => {
  const content = landingContent.benefits;

  const benefitItems = content.items.map((item) => {
    const Icon = iconMap[item.iconName] || Heart;
    return {
      ...item,
      title: item.title,
      description: item.description,
      icon: (
        <Icon
          className={`h-7 w-7 ${['Heart', 'Sparkles'].includes(item.iconName) ? 'text-secondary' : 'text-primary'}`}
        />
      ),
    };
  });

  return (
    <section className="relative pb-20 pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 space-y-6 text-center">
          <h2 className="text-5xl font-bold text-foreground">{content.heading}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefitItems.map((benefit) => (
            <Card
              key={benefit.title}
              className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm transition-all hover:border-accent/60 hover:shadow-card"
            >
              <CardContent className="space-y-4 p-8 text-center">
                <div className="flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { landingContent } from '@/data/landing-content';
import { CircleHelp } from 'lucide-react';

export const FaqSection = () => {
  const content = landingContent.faq;

  const faqItems = content.items.map((item) => ({
    ...item,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <section className="relative pb-20 pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 space-y-6 text-center">
          <h2 className="text-5xl font-bold text-foreground">{content.heading}</h2>
        </div>
        <div className="mx-auto max-w-4xl space-y-4">
          {faqItems.map((item) => (
            <Card
              key={item.question}
              className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm transition-all hover:border-accent/60"
            >
              <CardContent className="space-y-2 p-6">
                <p className="flex items-center gap-3 text-lg font-semibold text-foreground">
                  <CircleHelp className="h-5 w-5 text-accent" />
                  {item.question}
                </p>
                <p className="leading-relaxed text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

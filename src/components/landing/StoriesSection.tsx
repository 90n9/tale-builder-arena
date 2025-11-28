"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { landingContent } from "@/data/landing-content";
import { PrimaryActionButton } from "@/components/ActionButtons";
import { Flame } from "lucide-react";

export const StoriesSection = () => {
    const { language } = useLanguage();
    const t = (value: LocalizedText) => getLocalizedText(value, language);
    const content = landingContent.stories;

    const storyItems = content.items.map((story) => ({
        ...story,
        title: t(story.title),
        hook: t(story.hook),
        cta: t(story.cta),
    }));

    return (
        <section id="stories" className="pt-16 pb-20 relative">
            <div className="absolute inset-0 bg-gradient-card opacity-50" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 space-y-6">
                    <h2 className="text-5xl font-bold text-foreground">{t(content.heading)}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {storyItems.map((story) => (
                        <Card
                            key={story.title}
                            className="ornate-corners border-2 border-border/60 bg-gradient-card backdrop-blur-sm hover:border-accent/60 hover:shadow-card transition-all"
                        >
                            <CardContent className="p-8 space-y-4">
                                <div className="flex items-center gap-3 text-accent">
                                    <Flame className="h-6 w-6" />
                                    <p className="font-semibold">{story.title}</p>
                                </div>
                                <p className="text-foreground text-lg leading-relaxed">{story.hook}</p>
                                <PrimaryActionButton asChild>
                                    <Link href="/game">{story.cta}</Link>
                                </PrimaryActionButton>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

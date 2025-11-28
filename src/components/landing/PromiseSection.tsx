
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { landingContent } from "@/data/landing-content";
import { Zap, Image, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Zap,
    Image,
};

export const PromiseSection = () => {
    const { language } = useLanguage();
    const t = (value: LocalizedText) => getLocalizedText(value, language);
    const content = landingContent.promise;

    const pillars = content.pillars.map((pillar) => {
        const Icon = iconMap[pillar.iconName] || Zap;
        return {
            ...pillar,
            title: t(pillar.title),
            description: t(pillar.description),
            icon: <Icon className={`h-7 w-7 ${pillar.iconName === "Zap" ? "text-primary" : "text-secondary"}`} />,
        };
    });

    return (
        <section className="pt-16 pb-20 relative">
            <div className="absolute inset-0 bg-gradient-card opacity-50" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 space-y-6">
                    <h2 className="text-5xl font-bold text-foreground">{t(content.heading)}</h2>
                    <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                        {t(content.description)}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {pillars.map((pillar) => (
                        <Card
                            key={pillar.title}
                            className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-card hover:border-accent/60 transition-all"
                        >
                            <CardContent className="p-8 space-y-3">
                                <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { landingContent } from "@/data/landing-content";
import { Heart, GitBranch, Zap, Sparkles, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Heart,
    GitBranch,
    Zap,
    Sparkles,
};

export const BenefitsSection = () => {
    const { language } = useLanguage();
    const t = (value: LocalizedText) => getLocalizedText(value, language);
    const content = landingContent.benefits;

    const benefitItems = content.items.map((item) => {
        const Icon = iconMap[item.iconName] || Heart;
        return {
            ...item,
            title: t(item.title),
            description: t(item.description),
            icon: <Icon className={`h-7 w-7 ${["Heart", "Sparkles"].includes(item.iconName) ? "text-secondary" : "text-primary"}`} />,
        };
    });

    return (
        <section className="pt-16 pb-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 space-y-6">
                    <h2 className="text-5xl font-bold text-foreground">{t(content.heading)}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefitItems.map((benefit) => (
                        <Card
                            key={benefit.title}
                            className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm hover:border-accent/60 hover:shadow-card transition-all"
                        >
                            <CardContent className="p-8 space-y-4 text-center">
                                <div className="flex justify-center">{benefit.icon}</div>
                                <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

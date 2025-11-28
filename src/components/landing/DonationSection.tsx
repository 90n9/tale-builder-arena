
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { landingContent } from "@/data/landing-content";
import { PrimaryActionButton, SecondaryActionButton } from "@/components/ActionButtons";
import { KO_FI_URL } from "@/lib/external-links";
import { Heart, Coffee, Server, Wrench, PenTool, Timer, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Server,
    Wrench,
    PenTool,
    Timer,
};

export const DonationSection = () => {
    const { language } = useLanguage();
    const t = (value: LocalizedText) => getLocalizedText(value, language);
    const content = landingContent.donation;

    const donationItems = content.bullets.map((item) => {
        const Icon = iconMap[item.iconName] || Server;
        return {
            ...item,
            text: t(item.text),
            icon: <Icon className={`h-6 w-6 ${["Server", "PenTool"].includes(item.iconName) ? "text-primary" : "text-secondary"} `} />,
        };
    });

    return (
        <section className="container mx-auto px-4 pb-28">
            <Card className="relative ornate-corners bg-gradient-card border-2 border-border/70 shadow-epic overflow-hidden">
                <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />
                <CardContent className="relative p-10 md:p-12">
                    <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-primary/15 border border-primary/40 text-primary">
                                    <Heart className="h-6 w-6 fill-destructive text-destructive" />
                                </div>
                                <p className="text-sm uppercase tracking-[0.3em] text-accent">{t(content.eyebrow)}</p>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide">
                                {t(content.heading)}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t(content.description)}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <PrimaryActionButton
                                    asChild
                                    size="lg"
                                    className="font-semibold"
                                >
                                    <Link href="/donate">
                                        {t(content.primaryCta)}
                                    </Link>
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
                                            <span>{t(content.secondaryCta)}</span>
                                        </div>
                                    </a>
                                </SecondaryActionButton>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 flex-1">
                            {donationItems.map((item) => (
                                <div
                                    key={item.text}
                                    className="p-4 rounded-lg border border-border/60 bg-background/60 backdrop-blur-sm hover:border-accent/60 transition-all flex items-start gap-3 ornate-corners"
                                >
                                    <div className="mt-1">{item.icon}</div>
                                    <p className="text-foreground leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

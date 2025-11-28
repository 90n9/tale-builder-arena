"use client";

import React from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Lock, FileText, Database, Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { privacyContent } from "@/data/privacy-content";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();
  const t = (value: LocalizedText) => getLocalizedText(value, language);

  const principles = [
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, ...privacyContent.principles[0] },
    { icon: <Lock className="h-5 w-5 text-primary" />, ...privacyContent.principles[1] },
    { icon: <FileText className="h-5 w-5 text-primary" />, ...privacyContent.principles[2] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="mb-6">
            <PageHeader
              eyebrow={t(privacyContent.eyebrow)}
              title={t(privacyContent.title)}
              description={t(privacyContent.description)}
              icon={<ShieldCheck className="h-11 w-11" />}
            />
          </div>

          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
            <CardContent className="p-8 space-y-10">
              <section className="grid md:grid-cols-3 gap-6">
                {principles.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border/60">
                    <div className="flex items-center gap-2 mb-3">
                      {item.icon}
                      <h2 className="font-semibold text-foreground">{t(item.title)}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(privacyContent.collectedHeading)}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t(privacyContent.collectedBody)}
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(privacyContent.usageHeading)}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {privacyContent.dataUsage.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">{t(privacyContent.storageHeading)}</h2>
                  </div>
                  <ul className="space-y-2 text-muted-foreground leading-relaxed">
                    {privacyContent.dataStorage.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe2 className="h-5 w-5 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">{t(privacyContent.sharingHeading)}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(privacyContent.sharingBody)}
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(privacyContent.rightsHeading)}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {privacyContent.userChoices.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  {t(privacyContent.rightsBody)}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{t(privacyContent.updatesHeading)}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(privacyContent.updatesBody)}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{t(privacyContent.contactHeading)}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(privacyContent.contactBody)}
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

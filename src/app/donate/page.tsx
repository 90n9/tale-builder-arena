"use client";

import Link from "next/link";
import { HeartHandshake, Coffee, ArrowLeft, Server, Wrench, PenTool, Timer } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { PrimaryActionButton, SecondaryActionButton } from "@/components/ActionButtons";
import { KO_FI_URL } from "@/lib/external-links";

const copy = {
  heroEyebrow: { th: "สนับสนุนโปรเจกต์อินดี้", en: "Support the indie project" },
  heroTitle: { th: "สนับสนุน TaleBuilder Arena ❤️", en: "Support TaleBuilder Arena ❤️" },
  heroSubtitle: {
    th: "โปรเจกต์เกมอินดี้ที่พัฒนาโดยคนเดียว — และเปิดให้เล่นฟรีสำหรับทุกคน",
    en: "An indie game project created by a solo developer — and free for everyone to play.",
  },
  heroDescription: {
    th: "ช่วยต่อชีวิตแพลตฟอร์มให้คนเล่นได้ต่อเนื่อง พร้อมเนื้อหาใหม่และการอัปเดต UI/UX ตลอดเวลา",
    en: "Keep the platform alive with steady play, fresh content, and ongoing UI/UX improvements.",
  },
  heroPrimaryCta: { th: "สนับสนุนผ่าน Ko-fi", en: "Support on Ko-fi" },
  heroSecondaryCta: { th: "กลับไปเล่น", en: "Back to the game" },
  whyHeading: { th: "ทำไมต้องบริจาค", en: "Why your support matters" },
  whyBodyOne: {
    th: "TaleBuilder Arena เกิดจากความตั้งใจให้ทุกคนได้สัมผัสกับเรื่องราวและการตัดสินใจที่คุณสร้างได้เอง — โดยไม่ต้องเสียเงิน",
    en: "TaleBuilder Arena was born to let everyone experience stories and choices they craft—without paying to enter.",
  },
  whyBodyTwo: {
    th: "แต่การดูแลเว็บ จัดการโฮสติ้ง อัปเดตเนื้อหา และเวลาการพัฒนาต้องใช้ทรัพยากรจริง การสนับสนุนของคุณคือแรงใจและเชื้อเพลิงให้เราสร้างต่อ",
    en: "But hosting, maintenance, new content, and development time all take real resources. Your support is the fuel and encouragement that lets us keep building.",
  },
  quote: {
    th: "“การสนับสนุนจากคุณ คือแรงใจและทรัพยากรให้เรายังคงพัฒนา และมอบประสบการณ์ให้ทุกคนอย่างต่อเนื่อง”",
    en: "“Your support is the fuel that keeps this world alive—helping us improve, expand, and share more stories with everyone.”",
  },
  donationHeading: { th: "สนับสนุนผ่าน Ko-fi", en: "Support via Ko-fi" },
  donationBody: {
    th: "ถ้าคุณชอบเกมนี้ หรืออยากให้เราทำต่อ บริจาคเล็กน้อยก็ช่วยได้มาก ❤️",
    en: "If you enjoyed the game or believe in this project, donating even a little helps a lot ❤️",
  },
  suggestedLabel: { th: "ข้อแนะนำ", en: "Suggested" },
  suggestedAmounts: {
    th: "บริจาคเท่าที่สะดวก — 30 / 60 / 100 บาท หรือจำนวนที่คุณต้องการ",
    en: "Donate what you can — 30 / 60 / 100 THB, or any amount you prefer",
  },
  suggestedNote: { th: "ไม่มีกดดัน ทุกบาทช่วยได้ ทุกอย่างโปร่งใส", en: "No pressure—every bit helps, with full transparency" },
  soloBadge: { th: "นักพัฒนาเดี่ยว • เล่นฟรี", en: "Solo dev • Free to play" },
  communityBadge: { th: "เติบโตด้วยชุมชน", en: "Community funded" },
  impactHeading: { th: "เงินของคุณช่วยอะไร", en: "What your support helps with" },
  impactDescription: {
    th: "เราเก็บทุกบาทไว้เพื่อพัฒนา ต่ออายุ และเพิ่มประสบการณ์ใหม่ให้ TaleBuilder Arena",
    en: "Every contribution goes back into maintaining, improving, and expanding TaleBuilder Arena.",
  },
  impactHosting: { th: "ค่าโฮสติ้ง / บำรุงระบบ", en: "Server & maintenance costs" },
  impactFeatures: { th: "พัฒนาฟีเจอร์ใหม่ / ปรับปรุง UI/UX", en: "New features & UI/UX polish" },
  impactStories: { th: "สร้างเนื้อเรื่อง / content ใหม่", en: "Story and content creation" },
  impactTime: { th: "เวลาและแรงงานของนักพัฒนา", en: "Developer time & effort" },
  thanksHeading: { th: "ขอบคุณจากใจ", en: "Thank you—truly" },
  thanksBody: {
    th: "ขอบคุณที่สนับสนุนผลงานอินดี้เล็ก ๆ จากคนไทยคนหนึ่ง ทุกการสนับสนุน แม้เล็กน้อย ทำให้เว็บยังอยู่ เกมยังถูกพัฒนา และเรื่องราวใหม่ ๆ เกิดขึ้น",
    en: "Thank you for backing a small indie project from a solo Thai developer. Even the smallest contribution keeps the platform alive, the game improving, and new stories coming to life.",
  },
  backHome: { th: "กลับหน้าแรก", en: "Back to home" },
} satisfies Record<
  | "heroEyebrow"
  | "heroTitle"
  | "heroSubtitle"
  | "heroDescription"
  | "heroPrimaryCta"
  | "heroSecondaryCta"
  | "whyHeading"
  | "whyBodyOne"
  | "whyBodyTwo"
  | "quote"
  | "donationHeading"
  | "donationBody"
  | "suggestedLabel"
  | "suggestedAmounts"
  | "suggestedNote"
  | "soloBadge"
  | "communityBadge"
  | "impactHeading"
  | "impactDescription"
  | "impactHosting"
  | "impactFeatures"
  | "impactStories"
  | "impactTime"
  | "thanksHeading"
  | "thanksBody"
  | "backHome",
  LocalizedText
>;

const DonatePage = () => {
  const { language } = useLanguage();
  const t = <K extends keyof typeof copy>(key: K) => getLocalizedText(copy[key], language);

  const impactItems = [
    { icon: <Server className="h-5 w-5 text-primary" />, label: copy.impactHosting },
    { icon: <Wrench className="h-5 w-5 text-secondary" />, label: copy.impactFeatures },
    { icon: <PenTool className="h-5 w-5 text-primary" />, label: copy.impactStories },
    { icon: <Timer className="h-5 w-5 text-secondary" />, label: copy.impactTime },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-28 pb-20">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="absolute inset-0 bg-gradient-overlay" />
          <div className="absolute -left-12 top-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
              <div className="space-y-6">
                <PageHeader
                  eyebrow={t("heroEyebrow")}
                  title={t("heroTitle")}
                  description={t("heroSubtitle")}
                />
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {t("heroDescription")}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <PrimaryActionButton asChild size="lg" className="text-base">
                    <a
                      href={KO_FI_URL}
                      target="_blank"
                      rel="noreferrer"
                      data-ga-event="ko-fi-click"
                      data-ga-category="donation"
                      data-ga-label="donate-hero"
                    >
                      <div className="flex items-center gap-2">
                        <Coffee className="h-5 w-5" />
                        <span>{t("heroPrimaryCta")}</span>
                      </div>
                    </a>
                  </PrimaryActionButton>
                  <SecondaryActionButton asChild size="lg" className="text-base">
                    <Link href="/game">
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="h-5 w-5" />
                        <span>{t("heroSecondaryCta")}</span>
                      </div>
                    </Link>
                  </SecondaryActionButton>
                </div>
              </div>

              <Card className="ornate-corners bg-gradient-card border-2 border-border/70 shadow-epic backdrop-blur-md">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/15 border border-primary/40 text-primary">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-accent">{t("whyHeading")}</p>
                      <h2 className="text-2xl font-semibold text-foreground mt-1">
                        {t("donationHeading")}
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{t("whyBodyOne")}</p>
                  <p className="text-muted-foreground leading-relaxed">{t("whyBodyTwo")}</p>
                  <blockquote className="border-l-4 border-accent/60 pl-4 italic text-foreground">
                    {t("quote")}
                  </blockquote>
                  <Badge className="bg-background border border-border text-foreground">
                    {t("donationBody")}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="space-y-10 max-w-5xl mx-auto">
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/15 border border-primary/40 text-primary">
                  <Coffee className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-accent">{t("impactHeading")}</p>
                  <h3 className="text-2xl font-bold text-foreground">{t("impactDescription")}</h3>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {impactItems.map((item) => (
                  <div
                    key={item.label.th}
                    className="p-4 rounded-lg border border-border/60 bg-muted/20 hover:border-accent/60 transition-all flex items-start gap-3 ornate-corners"
                  >
                    <div className="mt-1">{item.icon}</div>
                    <p className="text-foreground leading-relaxed">
                      {getLocalizedText(item.label, language)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Card className="relative ornate-corners bg-gradient-card border-2 border-border/70 shadow-epic overflow-hidden">
            <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />
            <CardContent className="relative p-10 md:p-12 text-center space-y-6">
              <h3 className="text-4xl font-bold text-foreground">{t("thanksHeading")}</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("thanksBody")}
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">{t("suggestedAmounts")}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <PrimaryActionButton asChild size="lg" className="font-semibold">
                  <a
                    href={KO_FI_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-ga-event="ko-fi-click"
                    data-ga-category="donation"
                    data-ga-label="donate-footer"
                  >
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      <span>{t("heroPrimaryCta")}</span>
                    </div>
                  </a>
                </PrimaryActionButton>
                <SecondaryActionButton asChild size="lg">
                  <Link href="/">
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="h-5 w-5" />
                      <span>{t("backHome")}</span>
                    </div>
                  </Link>
                </SecondaryActionButton>
              </div>
              <p className="text-sm text-muted-foreground">{t("suggestedNote")}</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DonatePage;

"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, MessageSquare, Image, Zap, BookOpen, Trophy, Heart, Server, Wrench, PenTool, Timer } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { PrimaryActionButton, SecondaryActionButton } from "@/components/ActionButtons";

const Index = () => {
  const { language } = useLanguage();
  const heroImageSrc = "/assets/hero-illustration.jpg";
  const koFiUrl = "https://ko-fi.com/talebuilder";
  const content = {
    hero: {
      tagline: {
        th: "เลือกเรื่องราว สร้างตัวละคร แล้วเริ่มเล่นทันที",
        en: "Pick a story, build a hero, play instantly",
      },
      description: {
        th: "เลือกเรื่องที่เตรียมไว้ล่วงหน้า สร้างตัวละคร แล้วตอบตัวเลือกในแต่ละฉากเพื่อปลดล็อกตอนจบที่ต่างกัน เล่นลื่นไหลไม่สะดุด",
        en: "Choose a prepared storyline, build your character, and drive each scene with your decisions to unlock different endings—fast, smooth play with no slowdowns.",
      },
      primaryCta: {
        th: "เริ่มเล่นทันที",
        en: "Play instantly",
      },
      secondaryCta: {
        th: "ดูวิธีการทำงาน",
        en: "See how it works",
      },
    },
    features: {
      heading: {
        th: "พร้อมเล่นและตอบสนองไว",
        en: "Built for instant play",
      },
      description: {
        th: "ทุกฉากและภาพถูกเตรียมไว้ล่วงหน้า เกมจึงตอบสนองทันทีแม้คุณเปลี่ยนเส้นทาง",
        en: "Scenes and art are prepared ahead of time, so play stays responsive even as you branch the story.",
      },
      cards: [
        {
          icon: <BookOpen className="h-8 w-8 text-primary" />,
          title: {
            th: "เลือกเรื่องที่เตรียมไว้",
            en: "Pick a prepared story",
          },
          description: {
            th: "เลือกเรื่องราวที่ทีมสร้างไว้พร้อมธีม จุดตัดสินใจ และตอนจบหลายแบบ",
            en: "Start from crafted adventures with set themes, decision points, and multiple endings.",
          },
        },
        {
          icon: <Sparkles className="h-8 w-8 text-secondary" />,
          title: {
            th: "ปรับแต่งตัวละคร",
            en: "Shape your character",
          },
          description: {
            th: "ตั้งชื่อ บทบาท และสไตล์ก่อนเริ่มฉากแรกเพื่อให้เรื่องราวเป็นของคุณ",
            en: "Name your hero, choose a role, and set the vibe before the first scene begins.",
          },
        },
        {
          icon: <MessageSquare className="h-8 w-8 text-primary" />,
          title: {
            th: "เลือกแล้วมีผลทันที",
            en: "Choices change every scene",
          },
          description: {
            th: "ตัวเลือกในแต่ละฉากกำหนดฉากถัดไปและทรัพยากรที่คุณใช้",
            en: "Each response guides the next scene and how your resources shift.",
          },
        },
        {
          icon: <Trophy className="h-8 w-8 text-secondary" />,
          title: {
            th: "ตอนจบและถ้วยรางวัล",
            en: "Endings and trophies",
          },
          description: {
            th: "เส้นทางที่เลือกกำหนดตอนจบและรางวัลที่ปลดล็อกได้",
            en: "Your path determines which endings and trophies you unlock.",
          },
        },
        {
          icon: <Zap className="h-8 w-8 text-primary" />,
          title: {
            th: "โหลดไว ไม่ต้องรอ AI",
            en: "Instant load, no AI wait",
          },
          description: {
            th: "เนื้อเรื่องและภาพฉากถูกเตรียมไว้ล่วงหน้าจึงแสดงผลได้ทันทีเมื่อเปลี่ยนทางเลือก",
            en: "Story beats and scene art are prebuilt so new branches load immediately without AI delays.",
          },
        },
      ],
    },
    steps: {
      heading: {
        th: "วิธีเริ่มเล่น",
        en: "How to begin",
      },
      description: {
        th: "ทำตามขั้นตอนสั้นๆ แล้วเริ่มเห็นทางเลือกและตอนจบทันที",
        en: "Follow these quick steps to start seeing branches and endings right away.",
      },
      items: [
        {
          icon: <BookOpen className="h-6 w-6" />,
          title: {
            th: "เลือกเรื่อง",
            en: "Pick a story",
          },
          description: {
            th: "หยิบเรื่องที่เตรียมไว้พร้อมฉากและตอนจบหลากหลาย",
            en: "Grab a prepared adventure with defined scenes and multiple endings.",
          },
        },
        {
          icon: <Sparkles className="h-6 w-6" />,
          title: {
            th: "สร้างตัวละคร",
            en: "Create your character",
          },
          description: {
            th: "ตั้งชื่อ บทบาท และลักษณะเพื่อเป็นตัวเอกของเรื่อง",
            en: "Set the name, role, and flavor that make the hero yours.",
          },
        },
        {
          icon: <MessageSquare className="h-6 w-6" />,
          title: {
            th: "ตัดสินใจในแต่ละฉาก",
            en: "Decide every scene",
          },
          description: {
            th: "อ่านฉากที่เตรียมไว้แล้วเลือกการตอบสนองที่ต้องการ",
            en: "Read the prepared scene and choose the response you want.",
          },
        },
        {
          icon: <Trophy className="h-6 w-6" />,
          title: {
            th: "ดูผลลัพธ์ทันที",
            en: "See instant outcomes",
          },
          description: {
            th: "เห็นฉากถัดไปและตอนจบตามเส้นทางที่คุณเลือกทันทีโดยไม่ต้องรอ",
            en: "Jump straight into the next scene and ending your path unlocks with no waiting.",
          },
        },
      ],
    },
    immersion: {
      heading: {
        th: "ฉากพร้อมเล่นและภาพชัด",
        en: "Ready-to-play scenes & art",
      },
      description: {
        th: "เนื้อเรื่องและภาพทุกฉากสร้างไว้ล่วงหน้าเพื่อให้โหลดไวขณะคุณเลือกเส้นทาง",
        en: "Every scene and illustration is pre-built so the story keeps flowing as you branch.",
      },
      imageTitle: {
        th: "ภาพประกอบฉากที่เตรียมไว้",
        en: "Prebuilt scene art",
      },
      imageDescription: {
        th: "ภาพทุกฉากสร้างไว้ก่อนแล้วด้วย AI เพื่อให้แสดงผลทันทีและยังคุมโทนเรื่อง",
        en: "Each scene illustration is generated ahead of time, keeping tone consistent and loads instant.",
      },
      storySample: {
        th: "\"คุณเลือกเรื่อง 'ตราประทับแห่งทะเลทราย' และตัวละครของคุณยกคบเพลิงเข้าสู่วิหาร ทุกตัวเลือกกำหนดว่าคุณจะปกป้องวัตถุโบราณหรือฝ่าไปต่อ สัญญาณของตอนจบที่ต่างกันเริ่มปรากฏจากแสงวูบไหวของผนังโบราณ...\"",
        en: "\"You pick the story 'Seal of the Dunes' and your hero raises a torch inside the temple. Each choice reveals whether you guard the relic or press forward—hints of different endings flicker across the ancient walls...\"",
      },
      storyTitle: {
        th: "บทพร้อมแตกแขนง",
        en: "Prepared branching chapters",
      },
      storyDescription: {
        th: "บทสนทนาและทางเลือกถูกเขียนไว้ล่วงหน้าเพื่อให้โหลดไว แต่ยังเปิดทางเลือกให้คุณเปลี่ยนตอนจบได้",
        en: "Dialogues and decisions are authored ahead of time for speed while still letting you steer the ending.",
      },
    },
    donation: {
      heading: {
        th: "สนับสนุน TaleBuilder Arena",
        en: "Support TaleBuilder Arena",
      },
      description: {
        th: "โปรเจกต์อินดี้ที่เปิดให้เล่นฟรี รอดได้ด้วยแรงสนับสนุนจากคุณ — ทุกจำนวนช่วยให้เราสร้างเนื้อหาใหม่และดูแลเซิร์ฟเวอร์ต่อเนื่อง",
        en: "This free indie project runs on community support—every bit helps us add new stories and keep the servers running.",
      },
      bullets: [
        { icon: <Server className="h-6 w-6 text-primary" />, text: { th: "ค่าโฮสติ้งและบำรุงระบบ", en: "Hosting and upkeep" } },
        { icon: <Wrench className="h-6 w-6 text-secondary" />, text: { th: "ฟีเจอร์ใหม่และปรับปรุง UI/UX", en: "New features and UI/UX polish" } },
        { icon: <PenTool className="h-6 w-6 text-primary" />, text: { th: "สร้างเนื้อเรื่องและภาพประกอบฉาก", en: "Story content and scene art" } },
        { icon: <Timer className="h-6 w-6 text-secondary" />, text: { th: "เวลาและแรงงานของผู้พัฒนาเดี่ยว", en: "Solo dev time and effort" } },
      ],
      primaryCta: { th: "ไปหน้าสนับสนุน", en: "Go to donate page" },
      secondaryCta: { th: "เปิด Ko-fi", en: "Open Ko-fi" },
    },
    finalCta: {
      heading: {
        th: "พร้อมเลือกเส้นทางของคุณ?",
        en: "Ready to choose your path?",
      },
      description: {
        th: "เลือกเรื่อง สร้างตัวละคร แล้วเริ่มเล่นทันทีด้วยฉากและภาพที่เตรียมไว้ล่วงหน้า",
        en: "Pick a story, create your character, and play instantly with scenes and art prepared in advance.",
      },
      button: {
        th: "เริ่มเล่นเลย",
        en: "Play instantly",
      },
    },
  } satisfies {
    hero: {
      tagline: LocalizedText;
      description: LocalizedText;
      primaryCta: LocalizedText;
      secondaryCta: LocalizedText;
    };
    features: {
      heading: LocalizedText;
      description: LocalizedText;
      cards: Array<{ title: LocalizedText; description: LocalizedText; icon: JSX.Element }>;
    };
    steps: {
      heading: LocalizedText;
      description: LocalizedText;
      items: Array<{ title: LocalizedText; description: LocalizedText; icon: JSX.Element }>;
    };
    immersion: {
      heading: LocalizedText;
      description: LocalizedText;
      imageTitle: LocalizedText;
      imageDescription: LocalizedText;
      storySample: LocalizedText;
      storyTitle: LocalizedText;
      storyDescription: LocalizedText;
    };
    donation: {
      heading: LocalizedText;
      description: LocalizedText;
      bullets: Array<{ text: LocalizedText; icon: JSX.Element }>;
      primaryCta: LocalizedText;
      secondaryCta: LocalizedText;
    };
    finalCta: {
      heading: LocalizedText;
      description: LocalizedText;
      button: LocalizedText;
    };
  };

  const t = (value: LocalizedText) => getLocalizedText(value, language);

  const featureItems = content.features.cards.map((card) => ({
    ...card,
    title: t(card.title),
    description: t(card.description),
  }));

  const stepItems = content.steps.items.map((item) => ({
    ...item,
    title: t(item.title),
    description: t(item.description),
  }));

  const donationItems = content.donation.bullets.map((item) => ({
    ...item,
    text: t(item.text),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageSrc})`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                TaleBuilder Arena
              </span>
            </h1>
            
            <div className="mb-8">
              <div className="inline-block bg-card/80 backdrop-blur-sm border-2 border-accent/30 rounded px-6 py-3">
                <p className="text-xl md:text-2xl text-accent font-semibold uppercase tracking-wider">
                  {t(content.hero.tagline)}
                </p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/90 mb-12 leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
              {t(content.hero.description)}
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <PrimaryActionButton
                asChild
                size="lg"
                className="text-lg font-semibold px-10 py-7"
              >
                <Link
                  href="/game"
                  data-ga-event="hero-cta-click"
                  data-ga-category="cta"
                  data-ga-label="/game"
                >
                  {t(content.hero.primaryCta)}
                </Link>
              </PrimaryActionButton>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              {t(content.features.heading)}
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              {t(content.features.description)}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {featureItems.map((feature) => (
              <Card 
                key={feature.title}
                className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-card hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 group"
              >
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors border border-border/30">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              {t(content.steps.heading)}
            </h2>
            <p className="text-muted-foreground text-xl">
              {t(content.steps.description)}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {stepItems.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow-orange border-2 border-secondary/30">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < stepItems.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              {t(content.immersion.heading)}
            </h2>
            <p className="text-muted-foreground text-xl">
              {t(content.immersion.description)}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm shadow-epic overflow-hidden">
              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border border-border/30 backdrop-blur-sm overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-cyan opacity-10 group-hover:opacity-20 transition-opacity" />
                      <Image className="h-16 w-16 text-accent/50 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">{t(content.immersion.imageTitle)}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {t(content.immersion.imageDescription)}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-64 bg-muted/30 rounded-lg p-6 overflow-auto border border-border/30 backdrop-blur-sm">
                      <p className="text-foreground italic text-lg leading-relaxed">
                        {t(content.immersion.storySample)}
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">{t(content.immersion.storyTitle)}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {t(content.immersion.storyDescription)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="section-divider mb-12" />
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground uppercase tracking-wide">
            {t(content.finalCta.heading)}
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t(content.finalCta.description)}
          </p>
          <PrimaryActionButton
            asChild
            size="lg"
            className="text-xl font-bold px-12 py-8 uppercase tracking-wider"
          >
            <Link
              href="/game"
              data-ga-event="hero-cta-click"
              data-ga-category="cta"
              data-ga-label="/game"
            >
              {t(content.finalCta.button)}
            </Link>
          </PrimaryActionButton>
        </div>
      </section>

      {/* Donation Section */}
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
                  <p className="text-sm uppercase tracking-[0.3em] text-accent">{t(content.donation.heading)}</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide">
                  {t(content.donation.heading)}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t(content.donation.description)}
                </p>
                <div className="flex flex-wrap gap-3">
                  <PrimaryActionButton
                    asChild
                    size="lg"
                    className="font-semibold"
                  >
                    <Link href="/donate">
                      {t(content.donation.primaryCta)}
                    </Link>
                  </PrimaryActionButton>
                  <SecondaryActionButton asChild size="lg">
                    <a href={koFiUrl} target="_blank" rel="noreferrer">
                      {t(content.donation.secondaryCta)}
                    </a>
                  </SecondaryActionButton>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 flex-1">
                {donationItems.map((item) => (
                  <div
                    key={item.text}
                    className="p-4 rounded-lg border-2 border-border/60 bg-background/60 backdrop-blur-sm hover:border-accent/60 transition-all flex items-start gap-3"
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

      <Footer />
    </div>
  );
};

export default Index;

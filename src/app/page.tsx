"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, Image, Zap, BookOpen, Trophy, Heart, Server, Wrench, PenTool, Timer, GitBranch, Flame, Sparkles, Coffee, CircleHelp } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { PrimaryActionButton, SecondaryActionButton } from "@/components/ActionButtons";
import { KO_FI_URL } from "@/lib/external-links";

const Index = () => {
  const { language } = useLanguage();
  const heroImageSrc = "/assets/hero-illustration.jpg";
  const content = {
    hero: {
      headline: {
        th: "เลือกชะตา เขียนเรื่องของคุณ",
        en: "Choose your fate. Shape your story.",
      },
      subhead: {
        th: "ทุกทางเลือกพลิกเรื่องราวได้ทันที ชะตาอยู่ในมือคุณ",
        en: "Every decision shifts the story in the moment. No waiting—your destiny is in your hands.",
      },
      primaryCta: {
        th: "เริ่มเรื่องเลย",
        en: "Start your journey",
      },
      secondaryCta: {
        th: "ดูเรื่องตัวอย่าง",
        en: "See sample stories",
      },
    },
    promise: {
      heading: {
        th: "สิ่งที่รอคุณอยู่",
        en: "What awaits you",
      },
      description: {
        th: "ก้าวเข้าสู่โลกที่คุณกำหนดเอง สวมบทบาท เดินทาง สำรวจ และตัดสินใจ ทุกช็อตคือทางแยกที่พาเรื่องไปสู่ชะตาที่ต่างกัน",
        en: "Step into a world you define—roleplay, wander, choose, and feel every fork in the road pull the story toward a new destiny.",
      },
      pillars: [
        {
          icon: <Zap className="h-7 w-7 text-primary" />,
          title: {
            th: "ทุกทางเลือกมีน้ำหนัก",
            en: "Every choice carries weight",
          },
          description: {
            th: "คุณคือผู้กำหนดจังหวะ อารมณ์ และตอนจบของเรื่อง",
            en: "You set the tone, the pace, and the ending.",
          },
        },
        {
          icon: <Image className="h-7 w-7 text-secondary" />,
          title: {
            th: "เล่นได้ทันที ไม่ต้องรอ",
            en: "Jump in instantly",
          },
          description: {
            th: "เรื่องและภาพพร้อมให้คุณเริ่ม ผจญภัยได้เลยทั้งเว็บและมือถือ",
            en: "Stories and art are ready—dive in on web or mobile, no wait.",
          },
        },
      ],
    },
    stories: {
      heading: {
        th: "เลือกเรื่องแล้วเล่นเลย",
        en: "Pick your story, play now",
      },
      items: [
        {
          title: {
            th: "สุสานแห่งดวงดาวแตกสลาย (Crypt of the Shattered Star)",
            en: "Crypt of the Shattered Star",
          },
          hook: {
            th: "ดันเจี้ยนแฟนตาซีแตกแขนง เผ่าพันธุ์และคลาสของคุณจะกำหนดชะตา คุณจะปกป้องดวงดาวหรือปล่อยให้แหลกสลาย?",
            en: "A branching fantasy crawl where your race and class shape fate—guard the shattered star or let it fall?",
          },
          cta: { th: "เริ่มเล่น", en: "Play now" },
        },
        {
          title: {
            th: "ดันเจี้ยนร้านชำยายทองดี (Yai Thongdee's Dungeon Shop)",
            en: "Yai Thongdee's Dungeon Shop",
          },
          hook: {
            th: "เหรียญทอนตกสู่รูประตูลับใต้ร้านชำไทย งานธรรมดากลายเป็นภารกิจดันเจี้ยนสุดป่วน คุณจะรอดหรือถูกรับเข้าทำงานถาวร?",
            en: "A fallen coin leads to a hidden dungeon under a Thai corner shop—will you escape the chaos or get hired forever?",
          },
          cta: { th: "เริ่มเล่น", en: "Play now" },
        },
      ],
    },
    benefits: {
      heading: {
        th: "ทำไมต้อง TaleBuilder Arena",
        en: "Why play TaleBuilder Arena",
      },
      items: [
        {
          icon: <Heart className="h-7 w-7 text-secondary" />,
          title: { th: "ดื่มด่ำโลกที่สร้างสรรค์", en: "Immerse in crafted worlds" },
          description: {
            th: "ศิลป์และบรรยากาศชวนหลงใหล ให้คุณรู้สึกเหมือนอยู่ในเรื่อง",
            en: "Gorgeous art and mood that pull you right into the tale.",
          },
        },
        {
          icon: <GitBranch className="h-7 w-7 text-primary" />,
          title: { th: "หลายเส้นทาง หลายตอนจบ", en: "Many paths, many endings" },
          description: {
            th: "ทุกการตัดสินใจมีผลจริง กลับมาเล่นใหม่ก็เจอเส้นทางใหม่",
            en: "Choices truly matter—replays reveal new routes and endings.",
          },
        },
        {
          icon: <Zap className="h-7 w-7 text-primary" />,
          title: { th: "เข้าเล่นได้ทันที", en: "Instant access" },
          description: {
            th: "เล่นผ่านเว็บ/มือถือได้เลย ไม่ต้องดาวน์โหลด ไม่ต้องรอโหลด AI",
            en: "Play on web or mobile—no downloads, no AI wait screens.",
          },
        },
        {
          icon: <Sparkles className="h-7 w-7 text-secondary" />,
          title: { th: "สวมบทบาทได้อิสระ", en: "Live countless lives" },
          description: {
            th: "สร้างตัวละครในแบบคุณ เปลี่ยนบทบาทและท่าทีได้ทุกเรื่อง",
            en: "Create the hero you want—switch roles and vibes for each story.",
          },
        },
      ],
    },
    socialProof: {
      heading: {
        th: "เสียงจากผู้เล่น",
        en: "What players say",
      },
      quotes: [
        {
          name: "Mira",
          role: { th: "นักอ่านสายแฟนตาซี", en: "Fantasy reader" },
          quote: {
            th: "รู้สึกเหมือนอ่านนิยายที่มีชีวิต ทุกทางเลือกทำให้ใจเต้นแรง",
            en: "Feels like reading a living novel—every choice made my heart race.",
          },
        },
        {
          name: "Ken",
          role: { th: "เกมเมอร์สายมือถือ", en: "Mobile gamer" },
          quote: {
            th: "เข้าเล่นไวมาก จบหนึ่งเส้นทางก็อยากเริ่มใหม่ทันที",
            en: "Loads insanely fast—I finish one path and instantly want another.",
          },
        },
        {
          name: "Ploy",
          role: { th: "คอนเทนต์ครีเอเตอร์", en: "Content creator" },
          quote: {
            th: "ภาพสวย บรรยากาศชัด ทำคลิปเล่าเรื่องได้สนุก",
            en: "Beautiful art and mood—perfect for sharing story clips.",
          },
        },
      ],
    },
    faq: {
      heading: {
        th: "คำถามที่พบบ่อย",
        en: "FAQ",
      },
      items: [
        {
          question: { th: "เล่นที่ไหนได้บ้าง?", en: "Where can I play?" },
          answer: {
            th: "เล่นผ่านเว็บเบราว์เซอร์ได้ทันที รองรับมือถือและ PC",
            en: "Directly in your browser—works on mobile and PC.",
          },
        },
        {
          question: { th: "ต้องจ่ายไหม?", en: "Do I need to pay?" },
          answer: {
            th: "เล่นฟรี ไม่มีค่าใช้จ่ายเริ่มต้น",
            en: "Free to play with no upfront cost.",
          },
        },
        {
          question: { th: "ต้องติดตั้งหรือดาวน์โหลดหรือไม่?", en: "Do I need to download anything?" },
          answer: {
            th: "ไม่ต้องดาวน์โหลด แค่เลือกเรื่องและสร้างตัวละครก็เริ่มได้เลย",
            en: "No downloads—just pick a story, create your character, and go.",
          },
        },
      ],
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
        th: "พร้อมหรือยัง ที่จะเขียนบทของคุณเอง?",
        en: "Ready to write your own chapter?",
      },
      description: {
        th: "เริ่มผจญภัย สร้างบทบาท และเลือกชะตาในโลกที่พร้อมเปิดรับคุณ",
        en: "Begin the adventure, embody a role, and choose your fate in a world ready for you.",
      },
      button: {
        th: "เริ่มเลย",
        en: "Play now",
      },
    },
  } satisfies {
    hero: {
      headline: LocalizedText;
      subhead: LocalizedText;
      primaryCta: LocalizedText;
      secondaryCta: LocalizedText;
    };
    promise: {
      heading: LocalizedText;
      description: LocalizedText;
      pillars: Array<{ title: LocalizedText; description: LocalizedText; icon: JSX.Element }>;
    };
    stories: {
      heading: LocalizedText;
      items: Array<{ title: LocalizedText; hook: LocalizedText; cta: LocalizedText }>;
    };
    benefits: {
      heading: LocalizedText;
      items: Array<{ title: LocalizedText; description: LocalizedText; icon: JSX.Element }>;
    };
    socialProof: {
      heading: LocalizedText;
      quotes: Array<{ name: string; role: LocalizedText; quote: LocalizedText }>;
    };
    faq: {
      heading: LocalizedText;
      items: Array<{ question: LocalizedText; answer: LocalizedText }>;
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

  const promisePillars = content.promise.pillars.map((pillar) => ({
    ...pillar,
    title: t(pillar.title),
    description: t(pillar.description),
  }));

  const storyItems = content.stories.items.map((story) => ({
    ...story,
    title: t(story.title),
    hook: t(story.hook),
    cta: t(story.cta),
  }));

  const benefitItems = content.benefits.items.map((item) => ({
    ...item,
    title: t(item.title),
    description: t(item.description),
  }));
  const quotes = content.socialProof.quotes.map((quote) => ({
    ...quote,
    role: t(quote.role),
    quote: t(quote.quote),
  }));

  const faqItems = content.faq.items.map((item) => ({
    ...item,
    question: t(item.question),
    answer: t(item.answer),
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImageSrc})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-overlay" />

        <div className="container mx-auto px-4 relative z-10 text-center pt-24">
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-accent text-lg font-semibold tracking-wide">TaleBuilder Arena</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              {t(content.hero.headline)}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
              {t(content.hero.subhead)}
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="pt-16 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-5xl font-bold text-foreground">{t(content.promise.heading)}</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              {t(content.promise.description)}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {promisePillars.map((pillar) => (
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

      {/* Sample Stories Section */}
      <section id="stories" className="pt-16 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-5xl font-bold text-foreground">{t(content.stories.heading)}</h2>
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

      {/* Benefits Section */}
      <section className="pt-16 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-5xl font-bold text-foreground">{t(content.benefits.heading)}</h2>
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

      {/* Social Proof */}
      {/* Social Proof (temporarily hidden) */}
      {/* <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="section-divider my-8" />
            <h2 className="text-5xl font-bold text-foreground">{t(content.socialProof.heading)}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {quotes.map((quote) => (
              <Card
                key={quote.name}
                className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm"
              >
                <CardContent className="p-8 space-y-4">
                  <p className="text-foreground text-lg leading-relaxed">“{quote.quote}”</p>
                  <div className="text-muted-foreground">
                    <p className="font-semibold text-foreground">{quote.name}</p>
                    <p className="text-sm">{quote.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="pt-16 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-5xl font-bold text-foreground">{t(content.faq.heading)}</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <Card
                key={item.question}
                className="border-2 border-border/50 bg-gradient-card backdrop-blur-sm ornate-corners hover:border-accent/60 transition-all"
              >
                <CardContent className="p-6 space-y-2">
                  <p className="text-foreground font-semibold text-lg flex items-center gap-3">
                    <CircleHelp className="h-5 w-5 text-accent" />
                    {item.question}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pt-20 pb-24 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
            {t(content.finalCta.heading)}
          </h2>
          <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
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
                        <span>{t(content.donation.secondaryCta)}</span>
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

      <Footer />
    </div>
  );
};

export default Index;

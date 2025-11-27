"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Image, Zap, GitBranch, Flame, Compass, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";

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
        th: "ทุกทางเลือกพลิกเรื่องราวได้ทันที เรื่องและภาพพร้อมเล่น ไม่ต้องรอดาวน์โหลด ชะตาอยู่ในมือคุณ",
        en: "Every decision shifts the story in the moment. Ready-to-play tales and art mean no downloads, no waiting—your destiny is in your hands.",
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
    showcase: {
      heading: {
        th: "ภาพและอารมณ์ที่กำลังรอคุณ",
        en: "Scenes and moods waiting for you",
      },
      description: {
        th: "ศิลป์และฉากตัวอย่างที่บอกโทนโลก เล่าเรื่องผ่านแสง สี และเงาที่คุณจะได้สัมผัส",
        en: "Art and scene glimpses that set the world’s tone—told through light, color, and shadow you’ll step into.",
      },
      gallery: [
        { title: { th: "ค่ำคืนที่วิหารทราย", en: "Night at the Desert Temple" } },
        { title: { th: "เงาในคฤหาสน์เก่า", en: "Shadows of the Old Manor" } },
        { title: { th: "ลมหายใจแห่งป่าเรืองแสง", en: "Breath of the Luminous Forest" } },
        { title: { th: "หอคอยลับลอยฟ้า", en: "Skyborne Hidden Spire" } },
      ],
    },
    stories: {
      heading: {
        th: "ตัวอย่างเรื่องที่เล่นได้ทันที",
        en: "Sample stories you can play now",
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
      pillars: Array<{ title: LocalizedText; description: LocalizedText }>;
    };
    showcase: {
      heading: LocalizedText;
      description: LocalizedText;
      gallery: Array<{ title: LocalizedText }>;
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

  const showcaseItems = content.showcase.gallery.map((item) => ({
    title: t(item.title),
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
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:shadow-glow-orange transition-all text-lg font-semibold px-10 py-7 text-primary-foreground border-2 border-secondary/50"
              >
                <Link href="/game">{t(content.hero.primaryCta)}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-accent/50 text-accent hover:bg-accent/10 hover:shadow-glow-cyan transition-all text-lg px-10 py-7 backdrop-blur-sm bg-background/30"
              >
                <Link href="#stories">{t(content.hero.secondaryCta)}</Link>
              </Button>
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="section-divider mb-10" />
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

      {/* Showcase Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <div className="section-divider mb-10" />
            <h2 className="text-5xl font-bold text-foreground">{t(content.showcase.heading)}</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              {t(content.showcase.description)}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseItems.map((item, idx) => (
              <div
                key={item.title}
                className="relative h-56 rounded-xl overflow-hidden border-2 border-border/40 bg-gradient-card"
              >
                <div className="absolute inset-0 bg-gradient-cyan opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="h-14 w-14 text-accent/50" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/70 backdrop-blur-sm border-t border-border/40">
                  <p className="text-foreground font-semibold">{item.title}</p>
                  <p className="text-muted-foreground text-sm">#{idx + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Stories Section */}
      <section id="stories" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="section-divider mb-10" />
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
                  <Button
                    asChild
                    className="bg-gradient-primary text-primary-foreground hover:shadow-glow-orange transition-all"
                  >
                    <Link href="/game">{story.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <div className="section-divider mb-10" />
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
            <div className="section-divider mb-10" />
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
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <div className="section-divider mb-10" />
            <h2 className="text-5xl font-bold text-foreground">{t(content.faq.heading)}</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <Card key={item.question} className="border-2 border-border/50 bg-gradient-card backdrop-blur-sm">
                <CardContent className="p-6 space-y-2">
                  <p className="text-foreground font-semibold text-lg flex items-center gap-3">
                    <Compass className="h-5 w-5 text-accent" />
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
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="section-divider mb-12" />
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
            {t(content.finalCta.heading)}
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t(content.finalCta.description)}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-primary hover:shadow-glow-orange transition-all text-xl font-bold px-12 py-8 text-primary-foreground border-2 border-secondary/50"
          >
            <Link
              href="/game"
              data-ga-event="hero-cta-click"
              data-ga-category="cta"
              data-ga-label="/game"
            >
              {t(content.finalCta.button)}
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

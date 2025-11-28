import { type LocalizedText } from "@/lib/i18n";

export const landingContent = {
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
        iconName: "Zap",
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
        iconName: "Image",
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
        iconName: "Heart",
        title: { th: "ดื่มด่ำโลกที่สร้างสรรค์", en: "Immerse in crafted worlds" },
        description: {
          th: "ศิลป์และบรรยากาศชวนหลงใหล ให้คุณรู้สึกเหมือนอยู่ในเรื่อง",
          en: "Gorgeous art and mood that pull you right into the tale.",
        },
      },
      {
        iconName: "GitBranch",
        title: { th: "หลายเส้นทาง หลายตอนจบ", en: "Many paths, many endings" },
        description: {
          th: "ทุกการตัดสินใจมีผลจริง กลับมาเล่นใหม่ก็เจอเส้นทางใหม่",
          en: "Choices truly matter—replays reveal new routes and endings.",
        },
      },
      {
        iconName: "Zap",
        title: { th: "เข้าเล่นได้ทันที", en: "Instant access" },
        description: {
          th: "เล่นผ่านเว็บ/มือถือได้เลย ไม่ต้องดาวน์โหลด ไม่ต้องรอโหลด AI",
          en: "Play on web or mobile—no downloads, no AI wait screens.",
        },
      },
      {
        iconName: "Sparkles",
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
    eyebrow: {
      th: "สนับสนุนโปรเจกต์อินดี้",
      en: "Support the indie project",
    },
    heading: {
      th: "สนับสนุน TaleBuilder Arena",
      en: "Support TaleBuilder Arena",
    },
    description: {
      th: "โปรเจกต์อินดี้ที่เปิดให้เล่นฟรี รอดได้ด้วยแรงสนับสนุนจากคุณ — ทุกจำนวนช่วยให้เราสร้างเนื้อหาใหม่และดูแลเซิร์ฟเวอร์ต่อเนื่อง",
      en: "This free indie project runs on community support—every bit helps us add new stories and keep the servers running.",
    },
    bullets: [
      { iconName: "Server", text: { th: "ค่าโฮสติ้งและบำรุงระบบ", en: "Hosting and upkeep" } },
      { iconName: "Wrench", text: { th: "ฟีเจอร์ใหม่และปรับปรุง UI/UX", en: "New features and UI/UX polish" } },
      { iconName: "PenTool", text: { th: "สร้างเนื้อเรื่องและภาพประกอบฉาก", en: "Story content and scene art" } },
      { iconName: "Timer", text: { th: "เวลาและแรงงานของผู้พัฒนาเดี่ยว", en: "Solo dev time and effort" } },
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
    pillars: Array<{ title: LocalizedText; description: LocalizedText; iconName: string }>;
  };
  stories: {
    heading: LocalizedText;
    items: Array<{ title: LocalizedText; hook: LocalizedText; cta: LocalizedText }>;
  };
  benefits: {
    heading: LocalizedText;
    items: Array<{ title: LocalizedText; description: LocalizedText; iconName: string }>;
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
    eyebrow: LocalizedText;
    heading: LocalizedText;
    description: LocalizedText;
    bullets: Array<{ text: LocalizedText; iconName: string }>;
    primaryCta: LocalizedText;
    secondaryCta: LocalizedText;
  };
  finalCta: {
    heading: LocalizedText;
    description: LocalizedText;
    button: LocalizedText;
  };
};

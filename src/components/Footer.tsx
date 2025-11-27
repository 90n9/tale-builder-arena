"use client";

import Link from "next/link";
import { Heart, Scroll } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";

const Footer = () => {
  const { language } = useLanguage();
  const copy = {
    description: {
      th: "เลือกเรื่องราว สร้างตัวละคร แล้วเริ่มเล่นทันที เกมไหลลื่นพร้อมเนื้อหาและภาพที่เตรียมไว้แล้ว",
      en: "Pick a story, build a hero, and play instantly with smooth, ready-to-go content and visuals.",
    },
    quickLinks: { th: "ลิงก์ด่วน", en: "Quick Links" },
    play: { th: "เกม", en: "Games" },
    donate: { th: "สนับสนุน", en: "Donate" },
    about: { th: "เกี่ยวกับเรา", en: "About" },
    contact: { th: "ติดต่อเรา", en: "Contact" },
    legal: { th: "ข้อมูลทางกฎหมาย", en: "Legal" },
    privacy: { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" },
    terms: { th: "เงื่อนไขการให้บริการ", en: "Terms of Use" },
    copyright: { th: "© 2025 TaleBuilder Arena. สงวนลิขสิทธิ์", en: "© 2025 TaleBuilder Arena. All rights reserved." },
  } satisfies Record<
    | "description"
    | "quickLinks"
    | "play"
    | "donate"
    | "about"
    | "contact"
    | "legal"
    | "privacy"
    | "terms"
    | "copyright",
    LocalizedText
  >;
  const t = (value: LocalizedText) => getLocalizedText(value, language);

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scroll className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">TaleBuilder Arena</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t(copy.description)}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t(copy.quickLinks)}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/game"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ga-event="footer-link-click"
                  data-ga-label="/game"
                >
                  {t(copy.play)}
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ga-event="footer-link-click"
                  data-ga-label="/donate"
                >
                  {t(copy.donate)}
                  <Heart className="h-4 w-4 text-destructive fill-destructive" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ga-event="footer-link-click"
                  data-ga-label="/about"
                >
                  {t(copy.about)}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ga-event="footer-link-click"
                  data-ga-label="/contact"
                >
                  {t(copy.contact)}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t(copy.legal)}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ga-event="footer-link-click"
                  data-ga-label="/privacy-policy"
                >
                  {t(copy.privacy)}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ga-event="footer-link-click"
                  data-ga-label="/terms-of-use"
                >
                  {t(copy.terms)}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {t(copy.copyright)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

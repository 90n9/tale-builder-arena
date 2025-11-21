"use client";

import Link from "next/link";
import { Scroll } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const Footer = () => {
  const { language } = useLanguage();
  const copy = {
    th: {
      description: "เกมเล่าเรื่องด้วยพลัง AI ที่ปล่อยให้ทุกการตัดสินใจของคุณกำหนดชะตาเรื่องราว",
      quickLinks: "ลิงก์ด่วน",
      home: "หน้าหลัก",
      play: "เล่นเกม",
      achievements: "ความสำเร็จ",
      about: "เกี่ยวกับเรา",
      contact: "ติดต่อเรา",
      legal: "ข้อมูลทางกฎหมาย",
      privacy: "นโยบายความเป็นส่วนตัว",
      terms: "เงื่อนไขการให้บริการ",
      copyright: "© 2025 TaleBuilder Arena. สงวนลิขสิทธิ์",
    },
    en: {
      description: "An AI-powered storytelling game where every choice reshapes the journey.",
      quickLinks: "Quick Links",
      home: "Home",
      play: "Play",
      achievements: "Achievements",
      about: "About",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      copyright: "© 2025 TaleBuilder Arena. All rights reserved.",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;

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
              {text.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{text.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {text.home}
                </Link>
              </li>
              <li>
                <Link href="/game" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {text.play}
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {text.achievements}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {text.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {text.contact}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{text.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {text.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {text.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {text.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

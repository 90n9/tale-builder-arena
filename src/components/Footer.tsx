'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Scroll } from 'lucide-react';

const Footer = () => {
  const copy = {
    description:
      'เลือกเรื่องราว สร้างตัวละคร แล้วเริ่มเล่นทันที เกมไหลลื่นพร้อมเนื้อหาและภาพที่เตรียมไว้แล้ว',
    quickLinks: 'ลิงก์ด่วน',
    play: 'เกม',
    donate: 'สนับสนุน',
    about: 'เกี่ยวกับเรา',
    contact: 'ติดต่อเรา',
    legal: 'ข้อมูลทางกฎหมาย',
    privacy: 'นโยบายความเป็นส่วนตัว',
    terms: 'เงื่อนไขการให้บริการ',
    copyright: '© 2025 TaleBuilder Arena. สงวนลิขสิทธิ์',
  };

  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Scroll className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">TaleBuilder Arena</span>
            </Link>
            <p className="text-sm text-muted-foreground">{copy.description}</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">{copy.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/game"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  data-ga-event="footer-link-click"
                  data-ga-label="/game"
                >
                  {copy.play}
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  data-ga-event="footer-link-click"
                  data-ga-label="/donate"
                >
                  {copy.donate}
                  <Heart className="h-4 w-4 fill-destructive text-destructive" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  data-ga-event="footer-link-click"
                  data-ga-label="/about"
                >
                  {copy.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  data-ga-event="footer-link-click"
                  data-ga-label="/contact"
                >
                  {copy.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">{copy.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  data-ga-event="footer-link-click"
                  data-ga-label="/privacy-policy"
                >
                  {copy.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  data-ga-event="footer-link-click"
                  data-ga-label="/terms-of-use"
                >
                  {copy.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">{copy.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

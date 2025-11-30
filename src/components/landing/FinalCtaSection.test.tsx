import React from 'react';
import { render, screen } from '@testing-library/react';
import { FinalCtaSection } from './FinalCtaSection';
import { LanguageProvider } from '@/contexts/language-context';
import { describe, it, expect, vi } from 'vitest';

// Mock next/link
vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>;
    },
  };
});

describe('FinalCtaSection', () => {
  it('renders correctly in Thai (default)', () => {
    render(
      <LanguageProvider>
        <FinalCtaSection />
      </LanguageProvider>
    );

    expect(screen.getByText('พร้อมหรือยัง ที่จะเขียนบทของคุณเอง?')).toBeInTheDocument();
    expect(screen.getByText('เริ่มเลย')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './page';
import { vi, describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/language-context';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  return {
    ...actual,
    // Mock only the icons that need custom behavior if any
  };
});

describe('HomePage', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <LanguageProvider>
        <HomePage />
      </LanguageProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it('should render the navbar', () => {
    render(
      <LanguageProvider>
        <HomePage />
      </LanguageProvider>
    );
    const navbarElements = screen.getAllByText(/TaleBuilder Arena/i);
    expect(navbarElements.length).toBeGreaterThan(0);
  });

  it('should render the footer', () => {
    render(
      <LanguageProvider>
        <HomePage />
      </LanguageProvider>
    );
    expect(screen.getAllByText(/นโยบายความเป็นส่วนตัว/i).length).toBeGreaterThan(0);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { termsContent } from '@/data/terms-content';
import TermsOfUsePage from './page';
import { vi, describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/language-context';

vi.mock('next/navigation', () => ({
  usePathname: () => '/terms-of-use',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

vi.mock('lucide-react', () => ({
  Scale: () => <div data-testid="scale-icon" />,
  ScrollText: () => <div data-testid="scroll-text-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  Trophy: () => <div data-testid="trophy-icon" />,
  Ban: () => <div data-testid="ban-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  Heart: () => <div data-testid="heart-icon" />,
  Languages: () => <div data-testid="languages-icon" />,
  Scroll: () => <div data-testid="scroll-icon" />,
}));

describe('TermsOfUsePage', () => {
  it('should render the page header correctly', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    expect(screen.getAllByText(termsContent.eyebrow)[0]).toBeInTheDocument();
    expect(screen.getByText(termsContent.title)).toBeInTheDocument();
    expect(screen.getByText(termsContent.description)).toBeInTheDocument();
  });

  it('should render the commitments section', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    termsContent.commitments.forEach((commitment) => {
      expect(screen.getByText(commitment.title)).toBeInTheDocument();
      expect(screen.getByText(commitment.description)).toBeInTheDocument();
    });
  });

  it('should render the account section', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    expect(screen.getByText(termsContent.accountHeading)).toBeInTheDocument();
    expect(screen.getByText(termsContent.accountBody)).toBeInTheDocument();
  });

  it('should render the conduct section', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    expect(screen.getByText(termsContent.conductHeading)).toBeInTheDocument();
    termsContent.conductRules.forEach((rule) => {
      expect(screen.getByText(rule)).toBeInTheDocument();
    });
  });

  it('should render the ownership section', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    expect(screen.getByText(termsContent.ownershipHeading)).toBeInTheDocument();
    termsContent.ownershipPoints.forEach((point) => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
  });

  it('should render the liability section', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    expect(screen.getByText(termsContent.liabilityHeading)).toBeInTheDocument();
    expect(screen.getByText(termsContent.liabilityBody)).toBeInTheDocument();
  });

  it('should render the termination section', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    expect(screen.getByText(termsContent.terminationHeading)).toBeInTheDocument();
    termsContent.terminationTerms.forEach((term) => {
      expect(screen.getByText(term)).toBeInTheDocument();
    });
  });

  it('should render the law and contact sections', () => {
    render(
      <LanguageProvider>
        <TermsOfUsePage />
      </LanguageProvider>
    );
    expect(screen.getByText(termsContent.lawHeading)).toBeInTheDocument();
    expect(screen.getByText(termsContent.lawBody)).toBeInTheDocument();
    expect(screen.getByText(termsContent.contactHeading)).toBeInTheDocument();
    expect(screen.getByText(termsContent.contactBody)).toBeInTheDocument();
  });
});

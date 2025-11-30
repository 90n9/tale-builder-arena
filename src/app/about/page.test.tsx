import React from 'react';
import { render, screen } from '@testing-library/react';
import { aboutContent } from '@/data/about-content';
import AboutPage from './page';
import { LanguageProvider } from '@/contexts/language-context';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react');
  return {
    ...(actual as object),
    Zap: () => <div data-testid="zap-icon" />,
    BookOpen: () => <div data-testid="bookopen-icon" />,
    UserPlus: () => <div data-testid="userplus-icon" />,
    GitBranch: () => <div data-testid="gitbranch-icon" />,
    Heart: () => <div data-testid="heart-icon" />,
    Scroll: () => <div data-testid="scroll-icon" />,
    Languages: () => <div data-testid="languages-icon" />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
  };
});

describe('AboutPage', () => {
  beforeEach(() => {
    render(
      <LanguageProvider>
        <AboutPage />
      </LanguageProvider>
    );
  });

  it('should render the main title and description', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.headerTitle, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(aboutContent.headerDescription)).toBeInTheDocument();
  });

  it('should render intro section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.intro.heading, level: 2 })
    ).toBeInTheDocument();
    aboutContent.intro.body.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('should render inspiration section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.inspiration.heading, level: 2 })
    ).toBeInTheDocument();
    aboutContent.inspiration.body.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('should render values section and its icons', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.values.heading, level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(aboutContent.values.lead)).toBeInTheDocument();
    aboutContent.values.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet.title)).toBeInTheDocument();
      expect(screen.getByText(bullet.body)).toBeInTheDocument();
    });
    expect(screen.getByTestId('zap-icon')).toBeInTheDocument();
    expect(screen.getByTestId('bookopen-icon')).toBeInTheDocument();
    expect(screen.getByTestId('userplus-icon')).toBeInTheDocument();
    expect(screen.getByTestId('gitbranch-icon')).toBeInTheDocument();
  });

  it('should render mission and vision section', () => {
    expect(
      screen.getByRole('heading', {
        name: aboutContent.missionVision.heading,
        level: 2,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(aboutContent.missionVision.missionTitle)).toBeInTheDocument();
    expect(screen.getByText(aboutContent.missionVision.missionBody)).toBeInTheDocument();
    expect(screen.getByText(aboutContent.missionVision.visionTitle)).toBeInTheDocument();
    expect(screen.getByText(aboutContent.missionVision.visionBody)).toBeInTheDocument();
  });

  it('should render team section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.team.heading, level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(aboutContent.team.lead)).toBeInTheDocument();
    expect(screen.getByText(aboutContent.team.solo)).toBeInTheDocument();
  });

  it('should render invitation section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.invitation.heading, level: 2 })
    ).toBeInTheDocument();
    aboutContent.invitation.body.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('should render CTA section', () => {
    expect(screen.getByText(aboutContent.ctaText)).toBeInTheDocument();
    const ctaButton = screen.getByRole('link', {
      name: aboutContent.ctaButton,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/game');
  });
});

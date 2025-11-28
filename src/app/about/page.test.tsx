import React from 'react'
import { render, screen } from '@testing-library/react'
import { aboutContent } from '@/data/about-content'
import AboutPage from './page'

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('@/contexts/language-context', () => ({
  useLanguage: () => ({
    language: 'en',
    toggleLanguage: vi.fn(),
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react')
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
  }
})

describe('AboutPage', () => {
  beforeEach(() => {
    render(<AboutPage />)
  })

  it('should render the main title and description', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.headerTitle.en, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText(aboutContent.headerDescription.en)).toBeInTheDocument()
  })

  it('should render intro section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.intro.heading.en, level: 2 }),
    ).toBeInTheDocument()
    aboutContent.intro.body.forEach((paragraph) => {
      expect(screen.getByText(paragraph.en)).toBeInTheDocument()
    })
  })

  it('should render inspiration section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.inspiration.heading.en, level: 2 }),
    ).toBeInTheDocument()
    aboutContent.inspiration.body.forEach((paragraph) => {
      expect(screen.getByText(paragraph.en)).toBeInTheDocument()
    })
  })

  it('should render values section and its icons', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.values.heading.en, level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByText(aboutContent.values.lead.en)).toBeInTheDocument()
    aboutContent.values.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet.title.en)).toBeInTheDocument()
      expect(screen.getByText(bullet.body.en)).toBeInTheDocument()
    })
    expect(screen.getByTestId('zap-icon')).toBeInTheDocument()
    expect(screen.getByTestId('bookopen-icon')).toBeInTheDocument()
    expect(screen.getByTestId('userplus-icon')).toBeInTheDocument()
    expect(screen.getByTestId('gitbranch-icon')).toBeInTheDocument()
  })

  it('should render mission and vision section', () => {
    expect(
      screen.getByRole('heading', {
        name: aboutContent.missionVision.heading.en, level: 2
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(aboutContent.missionVision.missionTitle.en),
    ).toBeInTheDocument()
    expect(
      screen.getByText(aboutContent.missionVision.missionBody.en),
    ).toBeInTheDocument()
    expect(
      screen.getByText(aboutContent.missionVision.visionTitle.en),
    ).toBeInTheDocument()
    expect(
      screen.getByText(aboutContent.missionVision.visionBody.en),
    ).toBeInTheDocument()
  })

  it('should render team section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.team.heading.en, level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByText(aboutContent.team.lead.en)).toBeInTheDocument()
    expect(screen.getByText(aboutContent.team.solo.en)).toBeInTheDocument()
  })

  it('should render invitation section', () => {
    expect(
      screen.getByRole('heading', { name: aboutContent.invitation.heading.en, level: 2 }),
    ).toBeInTheDocument()
    aboutContent.invitation.body.forEach((paragraph) => {
      expect(screen.getByText(paragraph.en)).toBeInTheDocument()
    })
  })

  it('should render CTA section', () => {
    expect(screen.getByText(aboutContent.ctaText.en)).toBeInTheDocument()
    const ctaButton = screen.getByRole('link', {
      name: aboutContent.ctaButton.en,
    })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/game')
  })
})


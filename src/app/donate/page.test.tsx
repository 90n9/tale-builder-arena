import React from 'react'
import { render, screen } from '@testing-library/react'
import { donateContent } from '@/data/donate-content'
import DonatePage from './page'
import { KO_FI_URL } from '@/lib/external-links'

vi.mock('next/navigation', () => ({
  usePathname: () => '/donate',
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
    HeartHandshake: () => <div data-testid="hearthandshake-icon" />,
    Coffee: () => <div data-testid="coffee-icon" />,
    ArrowLeft: () => <div data-testid="arrowleft-icon" />,
    Server: () => <div data-testid="server-icon" />,
    Wrench: () => <div data-testid="wrench-icon" />,
    PenTool: () => <div data-testid="pentool-icon" />,
    Timer: () => <div data-testid="timer-icon" />,
    Heart: () => <div data-testid="heart-icon" />,
    Scroll: () => <div data-testid="scroll-icon" />,
    Languages: () => <div data-testid="languages-icon" />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
  }
})

describe('DonatePage', () => {
  beforeEach(() => {
    render(<DonatePage />)
  })

  it('should render hero section', () => {
    expect(screen.getByText(donateContent.heroEyebrow.en)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: donateContent.heroTitle.en, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.heroSubtitle.en)).toBeInTheDocument()
    expect(
      screen.getByText(donateContent.heroDescription.en),
    ).toBeInTheDocument()
    const primaryCta = screen.getAllByRole('link', {
      name: donateContent.heroPrimaryCta.en,
    })[0]
    expect(primaryCta).toBeInTheDocument()
    expect(primaryCta).toHaveAttribute('href', KO_FI_URL)
    const secondaryCta = screen.getByRole('link', {
      name: donateContent.heroSecondaryCta.en,
    })
    expect(secondaryCta).toBeInTheDocument()
    expect(secondaryCta).toHaveAttribute('href', '/game')
  })

  it('should render why support section', () => {
    expect(screen.getByText(donateContent.whyHeading.en)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: donateContent.donationHeading.en, level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.whyBodyOne.en)).toBeInTheDocument()
    expect(screen.getByText(donateContent.whyBodyTwo.en)).toBeInTheDocument()
    expect(screen.getByText(donateContent.quote.en)).toBeInTheDocument()
  })

  it('should render impact section', () => {
    expect(screen.getByText(donateContent.impactHeading.en)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: donateContent.impactDescription.en,
        level: 3,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactHosting.en)).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactFeatures.en)).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactStories.en)).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactTime.en)).toBeInTheDocument()
  })

  it('should render thanks section', () => {
    expect(
      screen.getByRole('heading', { name: donateContent.thanksHeading.en, level: 3 }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.thanksBody.en)).toBeInTheDocument()
    expect(
      screen.getByText(donateContent.suggestedAmounts.en),
    ).toBeInTheDocument()
    expect(
      screen.getByText(donateContent.suggestedNote.en),
    ).toBeInTheDocument()
    const backHomeLink = screen.getByRole('link', {
      name: donateContent.backHome.en,
    })
    expect(backHomeLink).toBeInTheDocument()
    expect(backHomeLink).toHaveAttribute('href', '/')
  })
})

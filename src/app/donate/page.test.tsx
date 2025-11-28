import React from 'react'
import { render, screen } from '@testing-library/react'
import { donateContent } from '@/data/donate-content'
import DonatePage from './page'
import { KO_FI_URL } from '@/lib/external-links'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { LanguageProvider } from '@/contexts/language-context'

vi.mock('next/navigation', () => ({
  usePathname: () => '/donate',
  useRouter: () => ({
    push: vi.fn(),
  }),
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
    render(
      <LanguageProvider>
        <DonatePage />
      </LanguageProvider>
    )
  })

  it('should render hero section', () => {
    expect(screen.getByText(donateContent.heroEyebrow)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: donateContent.heroTitle, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.heroSubtitle)).toBeInTheDocument()
    expect(
      screen.getByText(donateContent.heroDescription),
    ).toBeInTheDocument()
    const primaryCta = screen.getAllByRole('link', {
      name: donateContent.heroPrimaryCta,
    })[0]
    expect(primaryCta).toBeInTheDocument()
    expect(primaryCta).toHaveAttribute('href', KO_FI_URL)
    const secondaryCta = screen.getByRole('link', {
      name: donateContent.heroSecondaryCta,
    })
    expect(secondaryCta).toBeInTheDocument()
    expect(secondaryCta).toHaveAttribute('href', '/game')
  })

  it('should render why support section', () => {
    expect(screen.getByText(donateContent.whyHeading)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: donateContent.donationHeading, level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.whyBodyOne)).toBeInTheDocument()
    expect(screen.getByText(donateContent.whyBodyTwo)).toBeInTheDocument()
    expect(screen.getByText(donateContent.quote)).toBeInTheDocument()
  })

  it('should render impact section', () => {
    expect(screen.getByText(donateContent.impactHeading)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: donateContent.impactDescription,
        level: 3,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactHosting)).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactFeatures)).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactStories)).toBeInTheDocument()
    expect(screen.getByText(donateContent.impactTime)).toBeInTheDocument()
  })

  it('should render thanks section', () => {
    expect(
      screen.getByRole('heading', { name: donateContent.thanksHeading, level: 3 }),
    ).toBeInTheDocument()
    expect(screen.getByText(donateContent.thanksBody)).toBeInTheDocument()
    expect(
      screen.getByText(donateContent.suggestedAmounts),
    ).toBeInTheDocument()
    expect(
      screen.getByText(donateContent.suggestedNote),
    ).toBeInTheDocument()
    const backHomeLink = screen.getByRole('link', {
      name: donateContent.backHome,
    })
    expect(backHomeLink).toBeInTheDocument()
    expect(backHomeLink).toHaveAttribute('href', '/')
  })
})

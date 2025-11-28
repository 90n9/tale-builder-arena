import React from 'react'
import { render, screen } from '@testing-library/react'
import { termsContent } from '@/data/terms-content'
import TermsOfUsePage from './page'
import { vi, describe, it, expect } from 'vitest'

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
}))

vi.mock('@/contexts/language-context', () => ({
    useLanguage: () => ({
        language: 'en',
        setLanguage: vi.fn(),
    }),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

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
}))

describe('TermsOfUsePage', () => {
    it('should render the page header correctly', () => {
        render(<TermsOfUsePage />)
        expect(screen.getAllByText(termsContent.eyebrow.en)[0]).toBeInTheDocument()
        expect(screen.getByText(termsContent.title.en)).toBeInTheDocument()
        expect(screen.getByText(termsContent.description.en)).toBeInTheDocument()
    })

    it('should render the commitments section', () => {
        render(<TermsOfUsePage />)
        termsContent.commitments.forEach((commitment) => {
            expect(screen.getByText(commitment.title.en)).toBeInTheDocument()
            expect(screen.getByText(commitment.description.en)).toBeInTheDocument()
        })
    })

    it('should render the account section', () => {
        render(<TermsOfUsePage />)
        expect(screen.getByText(termsContent.accountHeading.en)).toBeInTheDocument()
        expect(screen.getByText(termsContent.accountBody.en)).toBeInTheDocument()
    })

    it('should render the conduct section', () => {
        render(<TermsOfUsePage />)
        expect(screen.getByText(termsContent.conductHeading.en)).toBeInTheDocument()
        termsContent.conductRules.forEach((rule) => {
            expect(screen.getByText(rule.en)).toBeInTheDocument()
        })
    })

    it('should render the ownership section', () => {
        render(<TermsOfUsePage />)
        expect(screen.getByText(termsContent.ownershipHeading.en)).toBeInTheDocument()
        termsContent.ownershipPoints.forEach((point) => {
            expect(screen.getByText(point.en)).toBeInTheDocument()
        })
    })

    it('should render the liability section', () => {
        render(<TermsOfUsePage />)
        expect(screen.getByText(termsContent.liabilityHeading.en)).toBeInTheDocument()
        expect(screen.getByText(termsContent.liabilityBody.en)).toBeInTheDocument()
    })

    it('should render the termination section', () => {
        render(<TermsOfUsePage />)
        expect(screen.getByText(termsContent.terminationHeading.en)).toBeInTheDocument()
        termsContent.terminationTerms.forEach((term) => {
            expect(screen.getByText(term.en)).toBeInTheDocument()
        })
    })

    it('should render the law and contact sections', () => {
        render(<TermsOfUsePage />)
        expect(screen.getByText(termsContent.lawHeading.en)).toBeInTheDocument()
        expect(screen.getByText(termsContent.lawBody.en)).toBeInTheDocument()
        expect(screen.getByText(termsContent.contactHeading.en)).toBeInTheDocument()
        expect(screen.getByText(termsContent.contactBody.en)).toBeInTheDocument()
    })
})

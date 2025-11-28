import React from 'react'
import { render, screen } from '@testing-library/react'
import { privacyContent } from '@/data/privacy-content'
import PrivacyPolicyPage from './page'
import { vi, describe, it, expect } from 'vitest'
import { LanguageProvider } from '@/contexts/language-context'

vi.mock('next/navigation', () => ({
    usePathname: () => '/privacy-policy',
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    useSearchParams: () => ({
        get: vi.fn(),
    }),
}))

vi.mock('lucide-react', () => ({
    ShieldCheck: () => <div data-testid="shield-check-icon" />,
    Lock: () => <div data-testid="lock-icon" />,
    FileText: () => <div data-testid="file-text-icon" />,
    Database: () => <div data-testid="database-icon" />,
    Globe2: () => <div data-testid="globe-icon" />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
    ChevronDown: () => <div data-testid="chevron-down-icon" />,
    Heart: () => <div data-testid="heart-icon" />,
    Languages: () => <div data-testid="languages-icon" />,
    Scroll: () => <div data-testid="scroll-icon" />,
}))

describe('PrivacyPolicyPage', () => {
    it('should render the page header correctly', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        expect(screen.getAllByText(privacyContent.eyebrow)[0]).toBeInTheDocument()
        expect(screen.getByText(privacyContent.title)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.description)).toBeInTheDocument()
    })

    it('should render the principles section', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        privacyContent.principles.forEach((principle) => {
            expect(screen.getByText(principle.title)).toBeInTheDocument()
            expect(screen.getByText(principle.description)).toBeInTheDocument()
        })
    })

    it('should render the collected data section', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        expect(screen.getByText(privacyContent.collectedHeading)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.collectedBody)).toBeInTheDocument()
    })

    it('should render the usage section', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        expect(screen.getByText(privacyContent.usageHeading)).toBeInTheDocument()
        privacyContent.dataUsage.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })
    })

    it('should render the storage and security section', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        expect(screen.getByText(privacyContent.storageHeading)).toBeInTheDocument()
        privacyContent.dataStorage.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })
    })

    it('should render the sharing section', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        expect(screen.getByText(privacyContent.sharingHeading)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.sharingBody)).toBeInTheDocument()
    })

    it('should render the rights section', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        expect(screen.getByText(privacyContent.rightsHeading)).toBeInTheDocument()
        privacyContent.userChoices.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })
        expect(screen.getByText(privacyContent.rightsBody)).toBeInTheDocument()
    })

    it('should render the updates and contact sections', () => {
        render(<LanguageProvider><PrivacyPolicyPage /></LanguageProvider>)
        expect(screen.getByText(privacyContent.updatesHeading)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.updatesBody)).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: privacyContent.contactHeading, level: 2 })).toBeInTheDocument()
        expect(screen.getByText(privacyContent.contactBody)).toBeInTheDocument()
    })
})

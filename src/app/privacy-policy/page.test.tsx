import React from 'react'
import { render, screen } from '@testing-library/react'
import { privacyContent } from '@/data/privacy-content'
import PrivacyPolicyPage from './page'
import { vi, describe, it, expect } from 'vitest'

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

vi.mock('@/contexts/language-context', () => ({
    useLanguage: () => ({
        language: 'en',
        setLanguage: vi.fn(),
    }),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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
        render(<PrivacyPolicyPage />)
        expect(screen.getAllByText(privacyContent.eyebrow.en)[0]).toBeInTheDocument()
        expect(screen.getByText(privacyContent.title.en)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.description.en)).toBeInTheDocument()
    })

    it('should render the principles section', () => {
        render(<PrivacyPolicyPage />)
        privacyContent.principles.forEach((principle) => {
            expect(screen.getByText(principle.title.en)).toBeInTheDocument()
            expect(screen.getByText(principle.description.en)).toBeInTheDocument()
        })
    })

    it('should render the collected data section', () => {
        render(<PrivacyPolicyPage />)
        expect(screen.getByText(privacyContent.collectedHeading.en)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.collectedBody.en)).toBeInTheDocument()
    })

    it('should render the usage section', () => {
        render(<PrivacyPolicyPage />)
        expect(screen.getByText(privacyContent.usageHeading.en)).toBeInTheDocument()
        privacyContent.dataUsage.forEach((item) => {
            expect(screen.getByText(item.en)).toBeInTheDocument()
        })
    })

    it('should render the storage and security section', () => {
        render(<PrivacyPolicyPage />)
        expect(screen.getByText(privacyContent.storageHeading.en)).toBeInTheDocument()
        privacyContent.dataStorage.forEach((item) => {
            expect(screen.getByText(item.en)).toBeInTheDocument()
        })
    })

    it('should render the sharing section', () => {
        render(<PrivacyPolicyPage />)
        expect(screen.getByText(privacyContent.sharingHeading.en)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.sharingBody.en)).toBeInTheDocument()
    })

    it('should render the rights section', () => {
        render(<PrivacyPolicyPage />)
        expect(screen.getByText(privacyContent.rightsHeading.en)).toBeInTheDocument()
        privacyContent.userChoices.forEach((item) => {
            expect(screen.getByText(item.en)).toBeInTheDocument()
        })
        expect(screen.getByText(privacyContent.rightsBody.en)).toBeInTheDocument()
    })

    it('should render the updates and contact sections', () => {
        render(<PrivacyPolicyPage />)
        expect(screen.getByText(privacyContent.updatesHeading.en)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.updatesBody.en)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.contactHeading.en)).toBeInTheDocument()
        expect(screen.getByText(privacyContent.contactBody.en)).toBeInTheDocument()
    })
})

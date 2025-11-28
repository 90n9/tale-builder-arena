import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from './page'
import { vi, describe, it, expect } from 'vitest'

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
}))

vi.mock('@/contexts/language-context', () => ({
    useLanguage: () => ({
        language: 'en',
        setLanguage: vi.fn(),
    }),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('lucide-react', async (importOriginal) => {
    const actual = await importOriginal<typeof import('lucide-react')>()
    return {
        ...actual,
        // Mock only the icons that need custom behavior if any
    }
})


describe('HomePage', () => {
    it('should render without crashing', () => {
        const { container } = render(<HomePage />)
        expect(container).toBeInTheDocument()
    })

    it('should render the navbar', () => {
        render(<HomePage />)
        const navbarElements = screen.getAllByText(/TaleBuilder Arena/i)
        expect(navbarElements.length).toBeGreaterThan(0)
    })

    it('should render the footer', () => {
        render(<HomePage />)
        expect(screen.getAllByText(/Privacy Policy/i).length).toBeGreaterThan(0)
    })
})

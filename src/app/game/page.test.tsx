import React from 'react'
import { render, screen } from '@testing-library/react'
import { gameListContent } from '@/data/game-list-content'
import GameListPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { LanguageProvider } from '@/contexts/language-context'

const mockPush = vi.fn()
const mockRouter = {
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
}

vi.mock('next/navigation', () => ({
    usePathname: () => '/game',
    useRouter: () => mockRouter,
    useSearchParams: () => ({
        get: vi.fn(),
    }),
}))

vi.mock('lucide-react', () => ({
    ArrowRight: () => <div data-testid="arrow-right-icon" />,
    Compass: () => <div data-testid="compass-icon" />,
    RefreshCw: () => <div data-testid="refresh-icon" />,
    Sparkles: () => <div data-testid="sparkles-icon" />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
    ChevronDown: () => <div data-testid="chevron-down-icon" />,
    Heart: () => <div data-testid="heart-icon" />,
    Languages: () => <div data-testid="languages-icon" />,
    Scroll: () => <div data-testid="scroll-icon" />,
}))

// Mock sessionStorage
const sessionStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value
        },
        removeItem: (key: string) => {
            delete store[key]
        },
        clear: () => {
            store = {}
        },
    }
})()

Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
})

describe('GameListPage', () => {
    beforeEach(() => {
        sessionStorageMock.clear()
        mockPush.mockClear()
    })

    it('should render the page header correctly', () => {
        render(<LanguageProvider><GameListPage /></LanguageProvider>)
        expect(screen.getByText(gameListContent.badge)).toBeInTheDocument()
        expect(screen.getByText(gameListContent.title)).toBeInTheDocument()
        expect(screen.getByText(gameListContent.subtitle)).toBeInTheDocument()
    })

    it('should render game cards', () => {
        render(<LanguageProvider><GameListPage /></LanguageProvider>)
        // Check for genre badges
        const badges = screen.getAllByText(/แฟนตาซี/i)
        expect(badges.length).toBeGreaterThan(0)
    })
})

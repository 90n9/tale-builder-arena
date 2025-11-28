import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { contactContent } from '@/data/contact-content'
import ContactPage from './page'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { toast } from 'sonner'
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/contact',
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

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}))

global.fetch = vi.fn()

vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react')
  return {
    ...(actual as object),
    Mail: () => <div data-testid="mail-icon" />,
    Heart: () => <div data-testid="heart-icon" />,
    Scroll: () => <div data-testid="scroll-icon" />,
    Languages: () => <div data-testid="languages-icon" />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
  }
})

describe('ContactPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
        <ContactPage />
      </NextThemesProvider>,
    )
  })

  it('should render the contact form with all fields', () => {
    expect(
      screen.getByRole('heading', { name: contactContent.title.en, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText(contactContent.description.en)).toBeInTheDocument()

    expect(screen.getByLabelText(contactContent.name.en)).toBeInTheDocument()
    expect(screen.getByLabelText(contactContent.email.en)).toBeInTheDocument()
    expect(screen.getByLabelText(contactContent.subject.en)).toBeInTheDocument()
    expect(screen.getByLabelText(contactContent.details.en)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: contactContent.submit.en }),
    ).toBeInTheDocument()
  })

  it('should not submit if required fields are empty', async () => {
    const user = userEvent.setup()
    await user.click(
      screen.getByRole('button', { name: contactContent.submit.en }),
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  it('should call the api and show success toast on successful submission', async () => {
    ; (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(contactContent.name.en), 'John Doe')
    await user.type(
      screen.getByLabelText(contactContent.email.en),
      'john.doe@example.com',
    )
    await user.type(
      screen.getByLabelText(contactContent.subject.en),
      'Test subject',
    )
    await user.type(
      screen.getByLabelText(contactContent.details.en),
      'This is a test message',
    )
    await user.click(
      screen.getByRole('button', { name: contactContent.submit.en }),
    )

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      })
    })

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        contactContent.successTitle.en,
        { description: contactContent.successDescription.en },
      )
    })
  })

  it('should show error toast on failed submission', async () => {
    ; (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'API Error' }),
    })

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(contactContent.name.en), 'John Doe')
    await user.type(
      screen.getByLabelText(contactContent.email.en),
      'john.doe@example.com',
    )
    await user.type(
      screen.getByLabelText(contactContent.subject.en),
      'Test subject',
    )
    await user.type(
      screen.getByLabelText(contactContent.details.en),
      'This is a test message',
    )
    await user.click(
      screen.getByRole('button', { name: contactContent.submit.en }),
    )

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        contactContent.errorTitle.en,
        { description: contactContent.errorDescription.en },
      )
    })
  })
})

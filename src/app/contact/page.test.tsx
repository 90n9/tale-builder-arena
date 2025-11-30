import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { contactContent } from '@/data/contact-content';
import ContactPage from './page';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { toast } from 'sonner';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { LanguageProvider } from '@/contexts/language-context';

vi.mock('next/navigation', () => ({
  usePathname: () => '/contact',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

global.fetch = vi.fn();

vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react');
  return {
    ...(actual as object),
    Mail: () => <div data-testid="mail-icon" />,
    Heart: () => <div data-testid="heart-icon" />,
    Scroll: () => <div data-testid="scroll-icon" />,
    Languages: () => <div data-testid="languages-icon" />,
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
  };
});

describe('ContactPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock fetch for UserMenu component
    (fetch as Mock).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });
    render(
      <LanguageProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <ContactPage />
        </NextThemesProvider>
      </LanguageProvider>
    );
  });

  it('should render the contact form with all fields', () => {
    expect(
      screen.getByRole('heading', { name: contactContent.title, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(contactContent.description)).toBeInTheDocument();

    expect(screen.getByLabelText(contactContent.name)).toBeInTheDocument();
    expect(screen.getByLabelText(contactContent.email)).toBeInTheDocument();
    expect(screen.getByLabelText(contactContent.subject)).toBeInTheDocument();
    expect(screen.getByLabelText(contactContent.details)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: contactContent.submit })).toBeInTheDocument();
  });

  it('should not submit if required fields are empty', async () => {
    const user = userEvent.setup();
    const fetchCallsBefore = (fetch as Mock).mock.calls.length;
    await user.click(screen.getByRole('button', { name: contactContent.submit }));
    // Should not have made any additional fetch calls beyond UserMenu's initial call
    expect((fetch as Mock).mock.calls.length).toBe(fetchCallsBefore);
  });

  it('should call the api and show success toast on successful submission', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(contactContent.name), 'John Doe');
    await user.type(screen.getByLabelText(contactContent.email), 'john.doe@example.com');
    await user.type(screen.getByLabelText(contactContent.subject), 'Test subject');
    await user.type(screen.getByLabelText(contactContent.details), 'This is a test message');
    await user.click(screen.getByRole('button', { name: contactContent.submit }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(contactContent.successTitle, {
        description: contactContent.successDescription,
      });
    });
  });

  it('should show error toast on failed submission', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'API Error' }),
    });

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(contactContent.name), 'John Doe');
    await user.type(screen.getByLabelText(contactContent.email), 'john.doe@example.com');
    await user.type(screen.getByLabelText(contactContent.subject), 'Test subject');
    await user.type(screen.getByLabelText(contactContent.details), 'This is a test message');
    await user.click(screen.getByRole('button', { name: contactContent.submit }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(contactContent.errorTitle, {
        description: contactContent.errorDescription,
      });
    });
  });
});

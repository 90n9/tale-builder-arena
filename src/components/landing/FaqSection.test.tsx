import React from 'react';
import { render, screen } from '@testing-library/react';
import { FaqSection } from './FaqSection';
import { LanguageProvider } from '@/contexts/language-context';
import { describe, it, expect } from 'vitest';

describe('FaqSection', () => {
  it('renders correctly in Thai (default)', () => {
    render(
      <LanguageProvider>
        <FaqSection />
      </LanguageProvider>
    );

    expect(screen.getByText('คำถามที่พบบ่อย')).toBeInTheDocument();
    expect(screen.getByText('เล่นที่ไหนได้บ้าง?')).toBeInTheDocument();
    expect(screen.getByText('ต้องจ่ายไหม?')).toBeInTheDocument();
  });
});

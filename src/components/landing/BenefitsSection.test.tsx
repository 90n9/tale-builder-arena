import React from 'react';
import { render, screen } from '@testing-library/react';
import { BenefitsSection } from './BenefitsSection';
import { LanguageProvider } from '@/contexts/language-context';
import { describe, it, expect } from 'vitest';

describe('BenefitsSection', () => {
  it('renders correctly in Thai (default)', () => {
    render(
      <LanguageProvider>
        <BenefitsSection />
      </LanguageProvider>
    );

    expect(screen.getByText('ทำไมต้อง TaleBuilder Arena')).toBeInTheDocument();
    expect(screen.getByText('ดื่มด่ำโลกที่สร้างสรรค์')).toBeInTheDocument();
    expect(screen.getByText('หลายเส้นทาง หลายตอนจบ')).toBeInTheDocument();
  });
});

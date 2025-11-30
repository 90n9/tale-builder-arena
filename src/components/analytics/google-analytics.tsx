'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { gaMeasurementId, trackInteraction, trackPageview } from '@/lib/analytics';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString();

  useEffect(() => {
    if (!gaMeasurementId) return;

    const url = search ? `${pathname}?${search}` : pathname || '/';

    trackPageview(url);
  }, [pathname, search]);

  useEffect(() => {
    if (!gaMeasurementId) return;

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        '[data-ga-event]'
      ) as HTMLElement | null;

      if (!target) return;

      const action = target.getAttribute('data-ga-event') ?? 'interaction';
      const category = target.getAttribute('data-ga-category') ?? 'interaction';
      const label = target.getAttribute('data-ga-label') ?? target.textContent?.trim() ?? undefined;

      trackInteraction({ action, category, label });
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!gaMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-inline-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

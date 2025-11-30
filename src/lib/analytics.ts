declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const isBrowser = typeof window !== 'undefined';

const isGtagReady = () => isBrowser && typeof window.gtag === 'function' && !!gaMeasurementId;

export function trackPageview(url: string) {
  if (!isGtagReady()) return;

  window.gtag?.('config', gaMeasurementId as string, {
    page_path: url,
  });
}

type InteractionEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
};

export function trackInteraction({
  action,
  category = 'interaction',
  label,
  value,
  params,
}: InteractionEvent) {
  if (!isGtagReady()) return;

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  });
}

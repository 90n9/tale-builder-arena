import React, { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  icon?: ReactNode;
};

/**
 * Standardized page header for secondary screens. Keeps spacing and color aligned with the design system.
 */
export function PageHeader({ title, description, eyebrow, icon }: PageHeaderProps) {
  return (
    <div className="space-y-4 text-center">
      {eyebrow ? <p className="text-xs tracking-[0.35em] text-accent">{eyebrow}</p> : null}

      <div className="flex flex-col items-center gap-3">
        {icon ? (
          <div className="rounded-full border border-accent/30 bg-accent/15 p-3 text-accent">
            {icon}
          </div>
        ) : null}
        <h1 className="text-5xl font-bold tracking-wide text-foreground md:text-6xl">{title}</h1>
      </div>

      {description ? (
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}

      <div className="section-divider mt-6" />
    </div>
  );
}

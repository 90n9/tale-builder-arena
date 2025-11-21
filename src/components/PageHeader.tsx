import { ReactNode } from "react";

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
    <div className="text-center space-y-4">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
      ) : null}

      <div className="flex flex-col items-center gap-3">
        {icon ? (
          <div className="p-3 rounded-full bg-accent/15 border border-accent/30 text-accent">
            {icon}
          </div>
        ) : null}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground uppercase tracking-wide">{title}</h1>
      </div>

      {description ? (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{description}</p>
      ) : null}

      <div className="section-divider mt-6" />
    </div>
  );
}

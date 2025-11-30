import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';

type ActionButtonProps = ButtonProps;

export const PrimaryActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="default"
      className={cn('transition-epic transform-gpu font-semibold hover:scale-[1.02]', className)}
      {...props}
    />
  )
);
PrimaryActionButton.displayName = 'PrimaryActionButton';

export const SecondaryActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        'border-accent/60 font-semibold text-foreground transition-all hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan',
        className
      )}
      {...props}
    />
  )
);
SecondaryActionButton.displayName = 'SecondaryActionButton';

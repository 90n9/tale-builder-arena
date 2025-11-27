import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type ActionButtonProps = ButtonProps;

export const PrimaryActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="default"
      className={cn(
        "font-semibold transition-epic transform-gpu hover:scale-[1.02]",
        className,
      )}
      {...props}
    />
  ),
);
PrimaryActionButton.displayName = "PrimaryActionButton";

export const SecondaryActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        "font-semibold",
        className,
      )}
      {...props}
    />
  ),
);
SecondaryActionButton.displayName = "SecondaryActionButton";

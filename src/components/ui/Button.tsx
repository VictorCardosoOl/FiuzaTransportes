import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Suporte ao padrão "polymorphic component": Button pode ser renderizado como <button> ou <a>
type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
    target?: never;
    rel?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const BASE_STYLES =
  "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

const VARIANTS: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary: "bg-fiuza-blue text-white hover:bg-fiuza-dark hover:shadow-lg hover:shadow-fiuza-blue/20",
  secondary: "bg-fiuza-cream text-fiuza-dark hover:bg-white",
  outline: "border-2 border-fiuza-blue text-fiuza-blue hover:bg-fiuza-blue/10",
  ghost: "text-fiuza-dark hover:bg-fiuza-cream/50",
};

const SIZES: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-8 text-base",
  lg: "h-14 px-10 text-lg",
};

/**
 * Componente Button polimórfico.
 * Por padrão renderiza um <button>. Passe `as="a"` + `href` para renderizar como <a>.
 */
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", as: Tag = "button", ...props }, ref) => {
    const classes = cn(BASE_STYLES, VARIANTS[variant], SIZES[size], className);

    if (Tag === "a") {
      const { as: _as, ...anchorProps } = props as ButtonAsAnchor;
      return (
        <a
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...anchorProps}
        />
      );
    }

    const { as: _as, ...buttonProps } = props as ButtonAsButton;
    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
    
    const variants = {
      primary: "bg-fiuza-blue text-white hover:bg-fiuza-dark hover:shadow-lg hover:shadow-fiuza-blue/20",
      secondary: "bg-fiuza-cream text-fiuza-dark hover:bg-white",
      outline: "border-2 border-fiuza-blue text-fiuza-blue hover:bg-fiuza-blue/10",
      ghost: "text-fiuza-dark hover:bg-fiuza-cream/50",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

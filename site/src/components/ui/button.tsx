import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-orange-500 text-white shadow-glow-orange hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-[0_0_32px_rgba(255,103,0,0.35)] active:translate-y-0 active:bg-orange-600",
        secondary:
          "border border-gray-100/20 bg-transparent text-gray-100 hover:border-gray-100/40 hover:bg-gray-100/5 active:bg-gray-100/10",
        "secondary-light":
          "border border-navy-800/15 bg-transparent text-navy-800 hover:border-navy-800/30 hover:bg-navy-800/[0.03] active:bg-navy-800/[0.06]",
        ghost:
          "bg-transparent text-orange-400 hover:bg-orange-500/10 active:bg-orange-500/15",
        "ghost-light":
          "bg-transparent text-orange-600 hover:bg-orange-500/[0.06] active:bg-orange-500/10",
        link: "text-orange-400 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-[52px] px-8 text-[17px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

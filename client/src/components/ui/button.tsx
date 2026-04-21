import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-display uppercase tracking-[0.12em] transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-texas-500 text-white hover:bg-texas-600 hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_rgba(224,90,26,0.6)]",
        outline:
          "border border-white/15 bg-transparent text-white hover:border-white hover:bg-white/5",
        ghost: "bg-transparent text-white hover:bg-white/5",
        secondary:
          "bg-white text-ink-950 hover:bg-ink-100 hover:-translate-y-0.5",
        link: "text-texas-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7 text-base",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-10 text-lg",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

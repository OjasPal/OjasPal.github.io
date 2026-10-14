import React from "react";
import { motion } from "motion/react";
import { tactileSpring } from "../../lib/motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs min-h-[36px]",
      md: "px-5 py-2.5 text-sm min-h-[44px]",
      lg: "px-6 py-3 text-base min-h-[48px]",
    }[size];

    const variantClasses = {
      primary:
        "bg-[#38BDF8] text-[#0B0C10] font-semibold hover:bg-[#38BDF8]/90 shadow-[0_0_20px_rgba(56,189,248,0.25)] border border-[#38BDF8]",
      secondary:
        "bg-[#12141C] text-[#F2F4F8] hover:bg-[#1A1E29] hover:border-[#38BDF8]/40 border border-[#1E2430]",
      outline:
        "bg-transparent text-[#F2F4F8] hover:text-[#0B0C10] hover:bg-[#38BDF8] border border-[#38BDF8]/60 hover:border-[#38BDF8]",
      ghost:
        "bg-transparent text-[#8A90A0] hover:text-[#F2F4F8] hover:bg-[#12141C] border border-transparent",
    }[variant];

    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : { scale: 1.015 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={tactileSpring}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
        {...(props as any)}
      >
        {icon && iconPosition === "left" && (
          <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

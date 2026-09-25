"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "light";
type Size = "md" | "lg" | "sm";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
  arrow?: boolean;
  type?: "button" | "submit";
  label?: string;
}

const variantClass: Record<Variant, string> = {
  primary: "btn--primary",
  dark: "btn--dark",
  ghost: "btn--ghost",
  light: "btn--light",
};

const sizeClass: Record<Size, string> = {
  md: "",
  lg: "btn--lg",
  sm: "btn--sm",
};

const spring = { type: "spring" as const, stiffness: 440, damping: 26 };
const MotionLink = motion(Link);

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  children,
  arrow = false,
  type = "button",
  label,
}: ButtonProps) {
  const reduce = useReducedMotion();
  const cls = `btn ${variantClass[variant]} ${sizeClass[size]} ${className}`;
  const inner = (
    <>
      {children ?? label}
      {arrow && <ArrowRight className="arrow" size={18} strokeWidth={2.5} aria-hidden="true" />}
    </>
  );
  const motionProps = reduce
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.965 },
        transition: spring,
      };

  if (href) {
    return (
      <MotionLink href={href} className={cls} onClick={onClick} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }
  return (
    <motion.button type={type} className={cls} onClick={onClick} {...motionProps}>
      {inner}
    </motion.button>
  );
}
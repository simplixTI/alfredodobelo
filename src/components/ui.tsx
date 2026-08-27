"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as Lucide from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof typeof motion;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) return <Comp className={className}>{children}</Comp>;

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={revealVariants}
      custom={delay}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  index: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-baseline gap-4",
            align === "center" && "justify-center",
          )}
        >
          <span className="num-1001 text-xl text-brand-orange">{index}</span>
          <span className="rule" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="num-1001 text-4xl uppercase leading-[0.95] text-brand-navy md:text-6xl text-balance">
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={2}>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

type IconName = keyof typeof Lucide;

export function Icon({
  name,
  className,
  ...rest
}: { name: string; className?: string } & Omit<ComponentProps<typeof Lucide.Circle>, "ref">) {
  const Comp = (Lucide[name as IconName] ?? Lucide.Sparkles) as typeof Lucide.Circle;
  return <Comp className={cn("h-5 w-5", className)} strokeWidth={1.8} {...rest} />;
}

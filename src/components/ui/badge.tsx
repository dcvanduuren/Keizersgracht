import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  /** Category tag on sand (Project 01). */
  /* Bordered pills: Figma strokes are inside the 4/10 padding, CSS borders are not → 3/9 + 1px border. */
  tagSand: "border border-border-subtle bg-sand px-[9px] py-[3px] text-badge text-terracotta",
  /** Category tag on canvas with aqua outline (Project 02). */
  tagAqua: "border border-aqua-muted bg-canvas px-[9px] py-[3px] text-badge text-terracotta",
  /** Category tag on canvas with coral outline (Project 03). */
  tagCoral: "border border-coral/33 bg-canvas px-[9px] py-[3px] text-badge text-terracotta",
  /** Filled status badges inside the diagrams. */
  solidCoral: "bg-coral px-2.5 py-1 text-label text-canvas opacity-90",
  solidAqua: "bg-aqua px-2.5 py-1 text-label text-espresso opacity-90",
  /** Pills with an icon (rating pill / chip). */
  chipAqua: "gap-2 bg-aqua px-2.5 py-1.5 text-label text-terracotta",
  chipCanvas: "gap-2 bg-canvas px-2.5 py-1.5 text-label text-terracotta",
  /** Aqua pill with icon (LinkedIn). */
  link: "gap-1.5 bg-aqua px-2.5 py-1 text-micro uppercase tracking-chip-caps text-terracotta transition-colors hover:bg-aqua/80",
} as const;

export type BadgeVariant = keyof typeof variants;

export function Badge({
  variant,
  children,
  className,
}: {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-[2px] font-body font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

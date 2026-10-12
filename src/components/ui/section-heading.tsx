import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 38px Sintony section heading (scales down on small screens). */
export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display text-[30px] leading-h1 font-bold tracking-tight-h1 text-espresso sm:text-h1",
        className,
      )}
    >
      {children}
    </h2>
  );
}

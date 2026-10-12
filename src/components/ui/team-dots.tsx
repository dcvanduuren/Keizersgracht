import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Coral + aqua dot pair followed by a short note ("Two people…", "Amsterdam · Global"). */
export function TeamDots({
  children,
  tight = false,
  className,
}: {
  children: ReactNode;
  /** Hero spacing: 4px between dots, 10px before the text. About: 8px / 8px. */
  tight?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center", tight ? "gap-2.5" : "gap-2", className)}>
      <span aria-hidden className={cn("flex", tight ? "gap-1" : "gap-2")}>
        <span className="size-2 rounded-pill bg-coral opacity-80" />
        <span className="size-2 rounded-pill bg-aqua opacity-80" />
      </span>
      <span className="font-body text-body-sm tracking-note text-terracotta">{children}</span>
    </div>
  );
}

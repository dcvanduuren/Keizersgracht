import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase overline above headings. */
export function Eyebrow({
  children,
  tone = "terracotta",
  wide = false,
  className,
}: {
  children: ReactNode;
  tone?: "coral" | "terracotta";
  /** Hero variant: wider tracking (0.1818em). */
  wide?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-body text-label font-semibold uppercase",
        wide ? "tracking-wide-caps" : "tracking-eyebrow",
        tone === "coral" ? "text-coral" : "text-terracotta",
        className,
      )}
    >
      {children}
    </p>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Absolutely positioned box in design-canvas pixels (server component). */
export function Abs({
  x,
  y,
  w,
  h,
  className,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("absolute", className)} style={{ left: x, top: y, width: w, height: h }}>
      {children}
    </div>
  );
}

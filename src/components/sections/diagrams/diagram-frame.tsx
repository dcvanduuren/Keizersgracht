import type { ReactNode } from "react";
import { ScaledCanvas } from "@/components/ui/scaled-canvas";

export const CANVAS_W = 960;
export const CANVAS_H = 480;

/**
 * md+: the pixel-exact Figma canvas (960×480), scaled down to fit.
 * <md: a stacked layout built from the same step pieces.
 */
export function DiagramFrame({
  label,
  desktop,
  mobile,
}: {
  label: string;
  desktop: ReactNode;
  mobile: ReactNode;
}) {
  return (
    <div role="group" aria-label={label}>
      <div className="hidden md:block">
        <ScaledCanvas width={CANVAS_W} height={CANVAS_H}>
          {desktop}
        </ScaledCanvas>
      </div>
      <div className="px-5 pt-2 pb-12 md:hidden">{mobile}</div>
    </div>
  );
}

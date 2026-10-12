import { cn } from "@/lib/cn";
import { Asset } from "@/components/ui/asset";

/** Decorative skeleton line used in the mock cards (Figma "Rectangle" 4–6px high). */
export function Bar({
  w,
  h,
  tone,
  className,
}: {
  w: number;
  h: number;
  tone: "espresso" | "subtle" | "aqua" | "terracotta";
  className?: string;
}) {
  const tones = {
    espresso: "bg-espresso",
    subtle: "bg-border-subtle",
    aqua: "bg-aqua",
    terracotta: "bg-terracotta",
  } as const;
  return (
    <span
      aria-hidden
      className={cn("block shrink-0 rounded-[1px]", tones[tone], className)}
      style={{ width: w, height: h }}
    />
  );
}

/** Fixed-size box for a diagram step; its children are positioned with <Abs>. */
export function Box({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
  return (
    <div className="relative shrink-0" style={{ width: w, height: h }}>
      {children}
    </div>
  );
}

/** Arrow between steps in the stacked (mobile) layouts: points down. */
export function DownArrow() {
  return (
    <div className="flex h-10 items-center justify-center">
      <Asset name="workflow-connector-1" width={24} height={24} className="rotate-90" />
    </div>
  );
}

/** Typography used by the step captions inside the diagrams. */
export const stepTitle =
  "font-display text-h4 leading-normal font-bold text-center text-espresso";
export const stepNote = "font-body text-body-sm leading-normal text-center";

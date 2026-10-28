import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

export function ProjectSection({
  eyebrow,
  eyebrowTone,
  title,
  description,
  descriptionClassName,
  tags,
  gradientClassName,
  children,
}: {
  eyebrow: string;
  eyebrowTone: "coral" | "terracotta";
  title: string;
  description: string;
  descriptionClassName: string;
  tags: ReactNode;
  gradientClassName: string;
  /** The diagram. */
  children: ReactNode;
}) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[3px] border border-border-hairline shadow-card",
        gradientClassName,
      )}
    >
      <div className="grid xl:grid-cols-[1fr_2fr]">
        <div className="flex flex-col justify-between gap-10 px-5 pt-10 pb-8 md:px-10 md:pt-12 xl:min-h-[480px] xl:py-14 xl:pr-10 xl:pl-12">
          <header className="flex flex-col gap-3">
            <Eyebrow tone={eyebrowTone} className="tracking-eyebrow">
              {eyebrow}
            </Eyebrow>
            <h2 className="font-display text-[28px] leading-h2 font-bold tracking-tight-h2 text-espresso sm:text-h2">
              {title}
            </h2>
          </header>
          <div className="flex flex-col gap-4">
            <p className={cn("font-body text-body-sm leading-[1.65]", descriptionClassName)}>{description}</p>
            <div className="flex gap-2">{tags}</div>
          </div>
        </div>
        <div className="min-w-0 xl:flex xl:items-center">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </article>
  );
}

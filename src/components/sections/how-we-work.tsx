import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles, type Principle } from "@/data/principles";

const badgeStyles: Record<Principle["badge"], string> = {
  coral: "bg-coral text-canvas",
  aqua: "bg-aqua text-espresso",
  terracotta: "bg-terracotta text-canvas",
};

export function HowWeWork() {
  return (
    <section className="bg-gradient-coral">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[minmax(0,480px)_1fr] xl:px-16">
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">Why we started</Eyebrow>
          <SectionHeading>Software built around your team, not the other way around.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            Traditional consultancies sell long slide decks and six-month discovery phases. We started this studio
            to build practical software and data tools directly with the people using them — fast, focused, and
            without the corporate overhead.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Eyebrow>How we work</Eyebrow>
          <ol className="flex flex-col gap-5">
            {principles.map((principle) => (
              <li key={principle.number} className="flex gap-4">
                <span
                  aria-hidden
                  className={`flex size-7 shrink-0 items-center justify-center rounded-pill font-body text-label font-bold ${badgeStyles[principle.badge]}`}
                >
                  {principle.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-body leading-tight font-bold tracking-principle text-espresso">
                    {principle.title}
                  </h3>
                  <p className="font-body text-body-sm leading-[1.65] text-terracotta">{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

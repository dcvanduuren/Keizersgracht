import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/data/principles";

export function HowWeWork() {
  return (
    <section className="bg-gradient-coral">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[minmax(0,400px)_1fr] xl:gap-16 xl:px-16">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">Why we started</Eyebrow>
          <SectionHeading>Software built around your team, not the other way around.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            Traditional consultancies sell long slide decks and six-month discovery phases. We build practical
            software and data tools directly with the people using them — fast, focused, and without the corporate
            overhead.
          </p>
        </div>

        {/* Right Column: 2-column Studio Cards (No bubbles, clean typography) */}
        <div className="flex flex-col gap-6">
          <Eyebrow>How we work</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="group relative flex flex-col justify-between gap-3.5 rounded-card border border-sand bg-canvas/75 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-coral/40 hover:bg-canvas hover:shadow-card"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[13px] font-bold tracking-brand text-coral uppercase">
                      {principle.number}
                    </span>
                    <span className="rounded-pill bg-sand/70 px-2 py-0.5 font-body text-micro font-semibold uppercase tracking-wider text-terracotta transition-colors group-hover:bg-sand group-hover:text-espresso">
                      {principle.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-[17px] font-bold leading-snug tracking-principle text-espresso">
                    {principle.title}
                  </h3>
                </div>
                <p className="font-body text-body-sm leading-[1.6] text-terracotta">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

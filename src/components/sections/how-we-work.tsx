"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/data/principles";
import { cn } from "@/lib/cn";

export function HowWeWork() {
  const [activeStep, setActiveStep] = useState<string>("01");
  const activeIndex = principles.findIndex((p) => p.number === activeStep);

  return (
    <section className="bg-gradient-how-we-work">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[minmax(0,420px)_1fr] xl:gap-20 xl:px-16">
        {/* Left Column: Sticky on desktop */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow tone="coral">Why we started</Eyebrow>
          <SectionHeading>Software built around your team, not the other way around.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            Traditional consultancies sell long slide decks and six-month discovery phases. We build practical
            software and data tools directly with the people using them — fast, focused, and without the corporate
            overhead.
          </p>
        </div>

        {/* Right Column: Cadence Timeline without background bubble */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Eyebrow>How we work</Eyebrow>
            <span className="font-body text-label font-semibold tracking-wide text-terracotta uppercase">
              Phase {activeStep} of 06
            </span>
          </div>

          <div className="relative flex flex-col">
            {/* Continuous timeline track line */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[6px] top-4 bottom-4 w-[1.5px] bg-espresso/15"
            />

            {/* Active progress line fill */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[6px] top-4 w-[1.5px] bg-coral transition-all duration-500 ease-in-out"
              style={{
                height: `${(Math.max(0, activeIndex) / (principles.length - 1)) * 100}%`,
              }}
            />

            {principles.map((principle, index) => {
              const isActive = activeStep === principle.number;
              const isPast = index < activeIndex;
              const nextPrinciple = principles[index + 1];

              return (
                <div
                  key={principle.number}
                  className="group relative border-b border-border-hairline/50 py-4 pl-7 transition-colors duration-200 last:border-b-0"
                >
                  {/* Timeline node marker on the line (clean, no bubble) */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-[6.75px] top-[24px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                      isActive
                        ? "size-2.5 bg-coral"
                        : isPast
                        ? "size-2 bg-coral/80"
                        : "size-2 bg-espresso/25 group-hover:bg-terracotta"
                    )}
                  />

                  {/* Step Header */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(principle.number)}
                    aria-expanded={isActive}
                    className="flex w-full items-start justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                  >
                    <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3.5">
                      {/* Typographic numeral */}
                      <span
                        className={cn(
                          "font-display text-[15px] font-bold tracking-brand transition-colors duration-200",
                          isActive
                            ? "text-coral"
                            : isPast
                            ? "text-terracotta"
                            : "text-terracotta/60 group-hover:text-espresso"
                        )}
                      >
                        {principle.number}
                      </span>
                      <h3
                        className={cn(
                          "font-display text-[17px] font-bold tracking-principle transition-colors duration-200",
                          isActive ? "text-espresso" : "text-espresso/85 group-hover:text-espresso"
                        )}
                      >
                        {principle.title}
                      </h3>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      <span
                        className={cn(
                          "rounded-pill px-2.5 py-0.5 font-body text-micro font-semibold uppercase tracking-wider transition-colors",
                          isActive
                            ? "bg-sand font-bold text-espresso"
                            : "bg-sand/60 text-terracotta group-hover:bg-sand group-hover:text-espresso"
                        )}
                      >
                        {principle.tag}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "inline-block font-mono text-base font-light leading-none transition-transform duration-200",
                          isActive ? "rotate-45 text-coral" : "text-terracotta/40 group-hover:text-espresso"
                        )}
                      >
                        +
                      </span>
                    </div>
                  </button>

                  {/* Collapsible Content: Expands naturally without any box/bubble */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isActive ? "grid-rows-[1fr] opacity-100 pt-2.5" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden pl-7 sm:pl-8">
                      <p className="max-w-[640px] font-body text-body-sm leading-[1.7] text-terracotta">
                        {principle.body}
                      </p>

                      {/* Cadence progression button */}
                      {nextPrinciple && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveStep(nextPrinciple.number);
                          }}
                          className="mt-3.5 inline-flex items-center gap-1.5 font-body text-label font-bold tracking-button text-coral uppercase transition-all hover:translate-y-0.5 hover:text-espresso"
                        >
                          Continue to Step {nextPrinciple.number}: {nextPrinciple.title}
                          <span aria-hidden>↓</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

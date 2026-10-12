import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-talk">
      {/* Ambient warm glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-coral/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 xl:px-16">
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">Start the talk</Eyebrow>
          <SectionHeading>Tell us what you&apos;re looking to build.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            Whether you have an initial spec ready or just a manual bottleneck you want automated, let us know
            where you&apos;re starting from. We&apos;ll read through your note and reply within one business day.
          </p>

          <div className="flex flex-col gap-4 pt-2">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-pill border border-border-subtle/80 bg-canvas/80 px-4 py-2 shadow-xs backdrop-blur-sm">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-body text-label font-semibold tracking-badge-caps text-espresso uppercase">
                Available for new projects · Amsterdam
              </span>
            </div>

            <ul className="flex flex-col gap-2.5 pt-2">
              <li className="flex items-start gap-2.5 font-body text-body-sm text-terracotta">
                <span aria-hidden className="pt-0.5 text-coral font-bold">✓</span>
                <span>
                  <strong className="font-semibold text-espresso">Direct founder contact</strong> — Kilan and Cheremy lead every project personally.
                </span>
              </li>
              <li className="flex items-start gap-2.5 font-body text-body-sm text-terracotta">
                <span aria-hidden className="pt-0.5 text-coral font-bold">✓</span>
                <span>
                  <strong className="font-semibold text-espresso">Working software in weeks</strong> — Rapid prototypes built with your actual data.
                </span>
              </li>
              <li className="flex items-start gap-2.5 font-body text-body-sm text-terracotta">
                <span aria-hidden className="pt-0.5 text-coral font-bold">✓</span>
                <span>
                  <strong className="font-semibold text-espresso">Clear, fixed scopes</strong> — No surprise billing or bloated consultant fees.
                </span>
              </li>
            </ul>

            <p className="pt-2 font-body text-body-sm text-terracotta">
              Prefer your own email client? Write us directly at{" "}
              <a
                href="mailto:hello@studio.amsterdam"
                className="font-semibold text-espresso underline decoration-border-subtle underline-offset-4 transition-colors hover:text-coral hover:decoration-coral"
              >
                hello@studio.amsterdam
              </a>
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

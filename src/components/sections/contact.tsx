import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="bg-gradient-talk">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-12 md:px-10 md:py-16 lg:min-h-[520px] lg:grid-cols-[minmax(0,480px)_1fr] lg:gap-16 xl:gap-24 xl:px-16">
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">Start the talk</Eyebrow>
          <SectionHeading>Tell us what you&apos;re looking to build.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            Whether you have an initial spec ready or just a manual bottleneck you want automated, let us know
            where you&apos;re starting from. We&apos;ll read through your note and reply within one business day.
          </p>
          <p className="font-body text-body-sm leading-[1.7] text-terracotta">
            You&apos;ll speak directly to us — no sales reps, account managers, or discovery fees.
          </p>
        </div>
        <div className="w-full lg:max-w-[560px] lg:justify-self-end">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

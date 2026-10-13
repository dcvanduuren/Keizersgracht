import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TeamDots } from "@/components/ui/team-dots";
import { LogoBanner } from "./logo-banner";

export function Hero() {
  return (
    <section id="top" className="relative">
      {/* Figma paints the glow layers behind the nav as well, so extend them up by the nav height. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[72px] bottom-0 bg-hero-glows" />

      {/* Hero Viewport: takes up the full initial screen so logos are completely below the fold on load */}
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] flex-col justify-center py-6 lg:py-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-x-10 px-5 md:px-10 lg:grid-cols-[734fr_528fr] lg:gap-x-12 min-[1440px]:grid-cols-[734px_528px] xl:px-16">
          {/* Left Column: Copy + Actions */}
          <div className="flex flex-col justify-between gap-8 pt-4 lg:col-start-1 lg:pt-0">
            <div className="flex flex-col gap-6 lg:pr-8">
              <Eyebrow wide>Data · Development · AI</Eyebrow>
              <h1 className="font-display text-[44px] leading-hero font-bold tracking-tight-hero text-espresso sm:text-[60px] lg:text-[clamp(52px,5.56vw,80px)]">
                We like to make your work feel like light work.
              </h1>
              <p className="font-body text-[19px] leading-[1.55] text-terracotta sm:text-[20px]">
                AI, software and data, built around how your team already operates.
              </p>
            </div>

            {/* Actions (TeamDots + CTA button) */}
            <div className="flex flex-col items-start gap-4 pt-2 pb-2 lg:items-end lg:pr-1">
              <TeamDots tight>A team of two people means direct communication and real flexibility.</TeamDots>
              <div className="flex h-[52px] items-center">
                <Button href="#contact">Grab a coffee with us</Button>
              </div>
            </div>
          </div>

          {/* Right Column: Photo + Supporting Note directly underneath */}
          <div className="flex flex-col justify-between gap-3 pt-6 lg:col-start-2 lg:pt-0">
            <div className="relative aspect-[479/490] w-full max-w-[480px] overflow-hidden rounded-[3px] shadow-card">
              <Image
                src="/assets/hero-photo.png"
                alt="Two people laughing over iced coffee at a café terrace"
                fill
                preload
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 70vw, 100vw"
                className="object-cover opacity-[0.92]"
              />
              <div aria-hidden className="absolute inset-0 bg-coral/3" />
              <div aria-hidden className="absolute inset-0 rounded-[3px] border border-border-hairline" />
            </div>

            {/* Supporting Note directly underneath photo, aligned with CTA button */}
            <div className="flex h-[52px] items-center pb-2">
              <p className="flex items-center gap-2 font-body text-terracotta">
                <span aria-hidden className="text-body-lg leading-none">
                  <span className="lg:hidden">↑</span>
                  <span className="hidden lg:inline">←</span>
                </span>
                <span className="text-body-sm leading-[1.6]">
                  Coffee&apos;s on us. Let&apos;s grab a coffee in town, or jump on a quick call.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* First thing seen when scrolling down from the hero */}
      <LogoBanner />
    </section>
  );
}

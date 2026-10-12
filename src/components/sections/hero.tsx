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
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] flex-col justify-center py-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-x-10 px-5 md:px-10 lg:grid-cols-[734fr_528fr] lg:gap-x-12 min-[1440px]:grid-cols-[734px_528px] xl:px-16">
          {/* Row 1 / Left: Copy */}
          <div className="flex flex-col gap-8 pt-4 lg:col-start-1 lg:row-start-1 lg:pt-0 lg:pr-[29px]">
            <Eyebrow wide>Data · Development · AI</Eyebrow>
            <h1 className="font-display text-[44px] leading-hero font-bold tracking-tight-hero text-espresso sm:text-[60px] lg:text-[clamp(52px,5.56vw,80px)]">
              We like to make your work feel like light work.
            </h1>
            <p className="font-body text-body-lg leading-body text-terracotta">
              AI, software and data, built around how your team already operates.
            </p>
          </div>

          {/* Row 2 / Left: Actions (TeamDots + CTA button) */}
          <div className="flex flex-col items-start gap-4 pt-6 pb-8 lg:col-start-1 lg:row-start-2 lg:items-end lg:justify-end lg:pt-4 lg:pb-0 lg:pr-[29px]">
            <TeamDots tight>A team of two people means direct communication and real flexibility.</TeamDots>
            <div className="flex h-[52px] items-center">
              <Button href="#contact">Grab a coffee with us</Button>
            </div>
          </div>

          {/* Row 1 / Right: Photo */}
          <div className="lg:col-start-2 lg:row-start-1">
            <div className="relative aspect-[479/530] w-full overflow-hidden rounded-[3px] shadow-card lg:w-[90.72%]">
              <Image
                src="/assets/hero-photo.png"
                alt="Two people laughing over iced coffee at a café terrace"
                fill
                preload
                sizes="(min-width: 1024px) 479px, (min-width: 768px) 70vw, 100vw"
                className="object-cover opacity-[0.92]"
              />
              <div aria-hidden className="absolute inset-0 bg-coral/3" />
              <div aria-hidden className="absolute inset-0 rounded-[3px] border border-border-hairline" />
            </div>
          </div>

          {/* Row 2 / Right: Supporting Note with Arrow pointing at CTA button */}
          <div className="pb-10 lg:col-start-2 lg:row-start-2 lg:flex lg:items-end lg:pb-0">
            <p className="flex h-[52px] items-center gap-2 font-body text-terracotta">
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

      {/* First thing seen when scrolling down from the hero */}
      <LogoBanner />
    </section>
  );
}

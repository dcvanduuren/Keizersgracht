import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoSlider, type Photo } from "@/components/ui/photo-slider";
import { TeamDots } from "@/components/ui/team-dots";
import { LogoBanner } from "./logo-banner";

const heroPhotos: Photo[] = [
  { src: "/assets/hero-group-3340-muted.jpg", alt: "Kilan and Cheremy at a café table" },
];

export function Hero() {
  return (
    <section id="top" className="relative">
      {/* Figma paints the glow layers behind the nav as well, so extend them up by the nav height. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[72px] bottom-0 bg-hero-glows" />

      {/* Hero Viewport: takes up the full initial screen so logos are completely below the fold on load */}
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] flex-col justify-center pt-4 pb-8 lg:py-12">
        <div className="intro-reveal mx-auto grid w-full max-w-[1440px] gap-x-10 px-5 md:px-10 lg:grid-cols-[734fr_528fr] lg:gap-x-12 min-[1440px]:grid-cols-[734px_528px] xl:px-16">
          {/* Row 1 / Left: Copy. Below lg its children join the grid so the photo can sit between title and intro. */}
          <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:gap-8 lg:pr-[29px]">
            <Eyebrow wide className="hidden lg:block">
              AI · Automations · Software
            </Eyebrow>
            <h1 className="order-2 lg:order-none font-display text-[length:min(44px,calc((100vw_-_40px)*0.111))] leading-hero font-bold tracking-tight-hero text-espresso sm:text-[60px] lg:text-[clamp(52px,5.56vw,80px)]">
              The tech company built for small businesses.
            </h1>
            <p className="order-6 mt-8 lg:order-none lg:mt-0 font-body text-[19px] leading-[1.55] text-terracotta sm:text-[20px]">
              Custom software, automations, and AI, built around how your team already operates.
            </p>
          </div>

          {/* Row 2 / Left: Actions (TeamDots + CTA button). Below lg the button moves up under the photo. */}
          <div className="contents lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col lg:items-end lg:justify-end lg:gap-3 lg:pr-1 lg:-mt-[22px]">
            <TeamDots tight className="hidden lg:flex">
              A team of two people means direct communication and real flexibility.
            </TeamDots>
            <div className="order-4 mt-6 flex h-[52px] items-center lg:order-none lg:mt-0">
              <Button href="#contact">Grab a coffee with us</Button>
            </div>
          </div>

          {/* Row 1 / Right: Photo */}
          <div className="order-3 mt-8 lg:col-start-2 lg:row-start-1 lg:mt-0">
            {/* Below lg the photo starts at the window frame: its top 78 of 1106 px are cropped off. */}
            <div className="relative aspect-[1000/1028] w-full overflow-hidden rounded-[3px] shadow-card lg:aspect-[479/530]">
              <div className="absolute inset-x-0 top-[-7.59%] bottom-0 lg:top-0">
                <PhotoSlider
                  photos={heroPhotos}
                  preload
                  sizes="(min-width: 1024px) 479px, (min-width: 768px) 70vw, 100vw"
                />
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[3px] border border-border-hairline" />
            </div>
          </div>

          {/* Row 2 / Right: Supporting Note with Arrow pointing at CTA button (desktop only) */}
          <div className="hidden pt-3.5 lg:col-start-2 lg:row-start-2 lg:flex lg:items-start">
            <p className="flex h-[52px] items-center gap-2 font-body text-terracotta">
              <span aria-hidden className="text-body-lg leading-none">
                ←
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

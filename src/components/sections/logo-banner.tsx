import Image from "next/image";

/**
 * Client and partner logos.
 * Uses a continuous right-to-left flowing marquee with gradient masks at the edges,
 * making logos fade out seamlessly into an invisible line on the left and return from the right.
 */
const logos = [
  { name: "De Betonboorder", href: "https://debetonboorder.nl", file: "logo-debetonboorder", w: 206, h: 34, cls: "w-[134px] md:w-[169px] xl:w-[206px]" },
  { name: "LooLa Adventure Resort", href: "https://www.loola.net", file: "logo-loola", w: 132, h: 46, cls: "w-[86px] md:w-[108px] xl:w-[132px]" },
  { name: "Tellet", href: "https://tellet.ai", file: "logo-telet", w: 97, h: 38, cls: "w-[63px] md:w-[80px] xl:w-[97px]" },
  { name: "Safe Water Gardens", href: "https://safewatergardens.org", file: "logo-safewatergardens", w: 174, h: 60, cls: "w-[113px] md:w-[143px] xl:w-[174px]" },
  { name: "Just Ride On Amsterdam", href: "https://justrideon.nl", file: "logo-justrideon", w: 49, h: 52, cls: "w-8 md:w-10 xl:w-[49px]" },
  { name: "Vandebron", href: "https://vandebron.nl", file: "logo-vandebron", w: 172, h: 26, cls: "w-[112px] md:w-[141px] xl:w-[172px]" },
  { name: "The Swim Academy", href: "https://theswimacademy.nl", file: "logo-theswimacademy", w: 122, h: 64, cls: "w-[79px] md:w-[100px] xl:w-[122px]" },
];

// Double the sequence so wide viewports always have a full, unbroken train of logos
const sequence = [...logos, ...logos];

function Track({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      aria-label={clone ? undefined : "Clients and partners"}
      aria-hidden={clone || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16 xl:gap-20 xl:pr-20"
    >
      {sequence.map((logo, idx) => (
        <li key={`${logo.file}-${idx}`} className={`shrink-0 ${logo.cls}`}>
          <a
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={clone || idx >= logos.length ? -1 : undefined}
            aria-hidden={!clone && idx >= logos.length ? true : undefined}
            className="relative block opacity-55 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100"
            style={{ aspectRatio: `${logo.w} / ${logo.h}` }}
          >
            <Image
              src={`/assets/${logo.file}.png`}
              alt={clone || idx >= logos.length ? "" : logo.name}
              fill
              sizes="218px"
              className="object-contain"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function LogoBanner() {
  return (
    <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 pt-6 pb-12 md:px-8 lg:pt-11 lg:pb-[43px]">
      {/* Edge gradient mask: fades out into an invisible line on left and in from right */}
      <div className="mask-marquee w-full overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          <Track />
          <Track clone />
        </div>
      </div>
    </div>
  );
}

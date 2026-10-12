import Image from "next/image";

/**
 * Client and partner logos.
 * Uses a continuous right-to-left flowing marquee with gradient masks at the edges,
 * making logos fade out seamlessly into an invisible line on the left and return from the right.
 */
const logos = [
  { name: "Xomnia", file: "logo-xomnia", w: 182, h: 38, cls: "w-[118px] md:w-[149px] xl:w-[182px]" },
  { name: "Migrato", file: "logo-migrato", w: 218, h: 34, cls: "w-[142px] md:w-[179px] xl:w-[218px]" },
  { name: "De Betonboorder", file: "logo-debetonboorder", w: 206, h: 34, cls: "w-[134px] md:w-[169px] xl:w-[206px]" },
  { name: "Tellet", file: "logo-telet", w: 97, h: 38, cls: "w-[63px] md:w-[80px] xl:w-[97px]" },
  { name: "Just Ride On Amsterdam", file: "logo-justrideon", w: 49, h: 52, cls: "w-8 md:w-10 xl:w-[49px]" },
];

// Double the sequence so wide viewports always have a full, unbroken train of logos
const sequence = [...logos, ...logos];

export function LogoBanner() {
  return (
    <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 pt-6 pb-12 md:px-8 lg:pt-11 lg:pb-[43px]">
      {/* Edge gradient mask: fades out into an invisible line on left and in from right */}
      <div className="mask-marquee w-full overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {/* Primary Track */}
          <ul
            aria-label="Clients and partners"
            className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16 xl:gap-20 xl:pr-20"
          >
            {sequence.map((logo, idx) => (
              <li
                key={`${logo.file}-1-${idx}`}
                className={`relative shrink-0 opacity-55 transition-opacity duration-300 hover:opacity-100 ${logo.cls}`}
                style={{ aspectRatio: `${logo.w} / ${logo.h}` }}
              >
                <Image
                  src={`/assets/${logo.file}.png`}
                  alt={logo.name}
                  fill
                  sizes="218px"
                  className="object-contain"
                />
              </li>
            ))}
          </ul>

          {/* Secondary Track (Cloned for seamless infinite looping) */}
          <ul
            aria-hidden="true"
            className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16 xl:gap-20 xl:pr-20"
          >
            {sequence.map((logo, idx) => (
              <li
                key={`${logo.file}-2-${idx}`}
                className={`relative shrink-0 opacity-55 transition-opacity duration-300 hover:opacity-100 ${logo.cls}`}
                style={{ aspectRatio: `${logo.w} / ${logo.h}` }}
              >
                <Image
                  src={`/assets/${logo.file}.png`}
                  alt=""
                  fill
                  sizes="218px"
                  className="object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

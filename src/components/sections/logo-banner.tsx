import Image from "next/image";

/**
 * `size` is the Figma box in px. Rendered widths step down on small screens
 * (≈65% on mobile, ≈82% on tablet, 100% from xl) and keep the Figma aspect ratio.
 */
const logos = [
  { name: "Xomnia", file: "logo-xomnia", w: 182, h: 38, cls: "w-[118px] md:w-[149px] xl:w-[182px]" },
  { name: "Migrato", file: "logo-migrato", w: 218, h: 34, cls: "w-[142px] md:w-[179px] xl:w-[218px]" },
  { name: "De Betonboorder", file: "logo-debetonboorder", w: 206, h: 34, cls: "w-[134px] md:w-[169px] xl:w-[206px]" },
  { name: "Tellet", file: "logo-telet", w: 97, h: 38, cls: "w-[63px] md:w-[80px] xl:w-[97px]" },
  { name: "Just Ride On Amsterdam", file: "logo-justrideon", w: 49, h: 52, cls: "w-8 md:w-10 xl:w-[49px]" },
];

export function LogoBanner() {
  return (
    <div className="relative mx-auto max-w-[1440px] px-5 pt-4 pb-12 md:px-10 lg:pt-11 lg:pb-[43px] xl:px-20">
      <ul
        aria-label="Clients and partners"
        className="flex flex-wrap items-end justify-center gap-x-10 gap-y-6 lg:h-[101px] xl:justify-between"
      >
        {logos.map((logo) => (
          <li
            key={logo.file}
            className={`relative opacity-55 ${logo.cls}`}
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
    </div>
  );
}

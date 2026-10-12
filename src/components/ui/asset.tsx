import Image from "next/image";

type AssetProps = {
  /** File name in /public/assets without extension, e.g. "icon-star". */
  name: string;
  width: number;
  height: number;
  className?: string;
};

/** Decorative SVG from /public/assets (exported from Figma). */
export function Asset({ name, width, height, className }: AssetProps) {
  return (
    <Image
      src={`/assets/${name}.svg`}
      alt=""
      aria-hidden
      width={width}
      height={height}
      className={className}
    />
  );
}

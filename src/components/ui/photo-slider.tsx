"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type Photo = { src: string; alt: string };

type PhotoSliderProps = {
  photos: Photo[];
  sizes: string;
  preload?: boolean;
  /** Positions the arrows and dots inside the photo, e.g. to keep them clear of an overlay. */
  controlsClassName?: string;
};

const arrowClass =
  "pointer-events-auto flex size-9 items-center justify-center rounded-full bg-frosted-white text-espresso shadow-card backdrop-blur-sm transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso";

/** Click-through photo stack; controls appear only on hover or keyboard focus. */
export function PhotoSlider({ photos, sizes, preload, controlsClassName }: PhotoSliderProps) {
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  return (
    <div className="group/slider absolute inset-0">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            preload={preload && i === 0}
            sizes={sizes}
            className="object-cover"
          />
        </div>
      ))}

      {count > 1 && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3 opacity-0 transition-opacity duration-200 group-hover/slider:opacity-100 group-has-focus-visible/slider:opacity-100",
            controlsClassName,
          )}
        >
          <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={arrowClass}>
            <span aria-hidden className="text-body-lg leading-none">←</span>
          </button>
          <div className="absolute top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-espresso/35 px-2 py-1.5 backdrop-blur-sm">
            {photos.map((photo, i) => (
              <span
                key={photo.src}
                aria-hidden
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-3.5 bg-canvas" : "w-1.5 bg-canvas/50",
                )}
              />
            ))}
          </div>
          <button type="button" aria-label="Next photo" onClick={() => go(1)} className={arrowClass}>
            <span aria-hidden className="text-body-lg leading-none">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

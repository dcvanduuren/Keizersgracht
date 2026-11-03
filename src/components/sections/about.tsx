"use client";

import { useId, useState } from "react";
import { Asset } from "@/components/ui/asset";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoSlider } from "@/components/ui/photo-slider";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamDots } from "@/components/ui/team-dots";
import { team, type TeamMember } from "@/data/team";
import { cn } from "@/lib/cn";

function TeamCard({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const bioId = useId();

  return (
    <article className="group relative flex h-[460px] flex-col justify-end overflow-hidden rounded-[3px] bg-sand shadow-card transition-transform duration-300 [@media(hover:hover)]:hover:-translate-y-0.5 has-focus-visible:-translate-y-0.5">
      {/* Fills the area above the collapsed text sheet so the photo's centre (the eyes) stays visible */}
      <div className="absolute inset-x-0 top-0 bottom-24 overflow-hidden bg-sand">
        <PhotoSlider
          photos={member.photos}
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
          controlsClassName="bottom-28"
        />
      </div>

      {/* Floating text sheet at bottom: moves up on hover */}
      <div className="relative z-10 flex flex-col justify-between bg-sand p-5 shadow-[0_-4px_16px_rgba(53,30,28,0.04)]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-[19px] font-bold tracking-name text-espresso">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={bioId}
                className="flex min-h-[44px] w-full items-center justify-between gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
              >
                <span>{member.name}</span>
                <span
                  aria-hidden
                  className={cn(
                    "inline-block font-body text-[14px] leading-none text-terracotta transition-transform duration-300",
                    open && "rotate-180"
                  )}
                >
                  ↓
                </span>
              </button>
            </h3>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Badge variant="link">
                <Asset name="icon-linkedin" width={10} height={10} />
                LinkedIn
              </Badge>
            </a>
          </div>
          <p
            className={`font-body text-badge font-semibold tracking-badge-caps uppercase ${
              member.disciplineTone === "coral" ? "text-coral-deep" : "text-terracotta"
            }`}
          >
            {member.discipline}
          </p>

          {/* Bio expands on tap (toggle); hover reveal kept for hover-capable pointers only */}
          <div
            id={bioId}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
              open
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100"
            )}
          >
            <div className="overflow-hidden">
              <p className="pt-2 font-body text-body-sm leading-[1.65] text-terracotta">{member.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function About() {
  return (
    <section id="about" className="bg-gradient-aqua">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 md:py-16 xl:grid-cols-[380px_1fr] xl:gap-16 xl:px-16">
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">About us</Eyebrow>
          <SectionHeading>Based in Amsterdam. Working everywhere.</SectionHeading>
          <p className="font-body text-body leading-body text-pretty text-terracotta">
            We are engineers and researchers based in Amsterdam. No account managers, no layers, and no junior
            handoffs — you collaborate directly with the two people designing the system and writing the code.
          </p>
          <TeamDots>Amsterdam · Global</TeamDots>
        </div>
        {/* Right-aligned, equal-sized wider card grid */}
        <div className="grid w-full max-w-[660px] items-stretch gap-6 sm:grid-cols-2 lg:ml-auto">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
